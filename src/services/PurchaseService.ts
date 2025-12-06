import { PurchaseRepository } from "../repository/PurchaseRepository";
import { BookRepository } from "../repository/BookRepository";
import { UserRepository } from "../repository/UserRepository";
import { CreatePurchaseDTO, PurchaseFiltersDTO, PurchaseResponseDTO, PurchaseStatsDTO } from "../dtos/PurchaseDTO";
import { Purchase, PaymentStatus, PaymentMethod } from "../models/Purchase";
import {
    PurchaseNotFoundError,
    InvalidPurchaseDataError,
    PurchaseAlreadyCompletedError,
    PurchaseAlreadyRefundedError,
    InvalidPaymentMethodError,
    BookNotFoundError,
    UserNotFoundError
} from "../errors/AppError";

const VALID_PAYMENT_METHODS: PaymentMethod[] = ["credit_card", "debit_card", "pix", "boleto"];

export class PurchaseService {
    private purchaseRepository: PurchaseRepository;
    private bookRepository: BookRepository;
    private userRepository: UserRepository;

    constructor() {
        this.purchaseRepository = new PurchaseRepository();
        this.bookRepository = new BookRepository();
        this.userRepository = new UserRepository();
    }

    // Converter modelo para DTO de resposta
    private toResponseDTO(purchase: Purchase): PurchaseResponseDTO {
        const response: PurchaseResponseDTO = {
            id: purchase.id,
            userId: purchase.userId,
            bookId: purchase.bookId,
            price: Number(purchase.price),
            paymentMethod: purchase.paymentMethod,
            paymentStatus: purchase.paymentStatus,
            purchaseDate: purchase.purchaseDate
        };

        if (purchase.user) {
            response.user = {
                id: purchase.user.id,
                name: purchase.user.name,
                email: purchase.user.email
            };
        }

        if (purchase.book) {
            response.book = {
                id: purchase.book.id,
                title: purchase.book.title,
                author: purchase.book.author,
                isbn: purchase.book.isbn,
                publishedYear: purchase.book.publishedYear,
                genre: purchase.book.genre,
                price: Number(purchase.book.price),
                rentalPrice: Number(purchase.book.rentalPrice),
                available: purchase.book.available,
                description: purchase.book.description
            };
        }

        return response;
    }

    // Validar método de pagamento
    private validatePaymentMethod(method: string): void {
        if (!VALID_PAYMENT_METHODS.includes(method as PaymentMethod)) {
            throw new InvalidPaymentMethodError(method);
        }
    }

    // Validar dados de criação
    private validateCreateData(data: CreatePurchaseDTO): void {
        if (!data.userId) {
            throw new InvalidPurchaseDataError("O ID do usuário é obrigatório");
        }

        if (!data.bookId) {
            throw new InvalidPurchaseDataError("O ID do livro é obrigatório");
        }

        if (!data.paymentMethod) {
            throw new InvalidPurchaseDataError("O método de pagamento é obrigatório");
        }

        this.validatePaymentMethod(data.paymentMethod);
    }

    // Criar nova compra
    async createPurchase(data: CreatePurchaseDTO): Promise<PurchaseResponseDTO> {
        // Validar dados
        this.validateCreateData(data);

        // Verificar se usuário existe
        const user = await this.userRepository.findById(data.userId);
        if (!user) {
            throw new UserNotFoundError(data.userId);
        }

        // Verificar se livro existe
        const book = await this.bookRepository.findById(data.bookId);
        if (!book) {
            throw new BookNotFoundError(data.bookId);
        }

        // Criar compra com o preço do livro
        const purchase = await this.purchaseRepository.create({
            userId: data.userId,
            bookId: data.bookId,
            price: Number(book.price),
            paymentMethod: data.paymentMethod
        });

        // Buscar com relações
        const purchaseWithRelations = await this.purchaseRepository.findById(purchase.id);
        return this.toResponseDTO(purchaseWithRelations!);
    }

    // Listar todas as compras
    async getAllPurchases(): Promise<PurchaseResponseDTO[]> {
        const purchases = await this.purchaseRepository.findAll();
        return purchases.map(purchase => this.toResponseDTO(purchase));
    }

    // Buscar compra por ID
    async getPurchaseById(id: number): Promise<PurchaseResponseDTO> {
        const purchase = await this.purchaseRepository.findById(id);

        if (!purchase) {
            throw new PurchaseNotFoundError(id);
        }

        return this.toResponseDTO(purchase);
    }

    // Buscar compras por usuário
    async getPurchasesByUser(userId: number): Promise<PurchaseResponseDTO[]> {
        // Verificar se usuário existe
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new UserNotFoundError(userId);
        }

        const purchases = await this.purchaseRepository.findByUserId(userId);
        return purchases.map(purchase => this.toResponseDTO(purchase));
    }

    // Buscar compras por livro
    async getPurchasesByBook(bookId: number): Promise<PurchaseResponseDTO[]> {
        // Verificar se livro existe
        const book = await this.bookRepository.findById(bookId);
        if (!book) {
            throw new BookNotFoundError(bookId);
        }

        const purchases = await this.purchaseRepository.findByBookId(bookId);
        return purchases.map(purchase => this.toResponseDTO(purchase));
    }

    // Buscar compras com filtros
    async getPurchasesByFilters(filters: PurchaseFiltersDTO): Promise<PurchaseResponseDTO[]> {
        const purchases = await this.purchaseRepository.findWithFilters(filters);
        return purchases.map(purchase => this.toResponseDTO(purchase));
    }

    // Confirmar pagamento (completar)
    async confirmPayment(id: number): Promise<PurchaseResponseDTO> {
        const purchase = await this.purchaseRepository.findById(id);

        if (!purchase) {
            throw new PurchaseNotFoundError(id);
        }

        if (purchase.paymentStatus === "completed") {
            throw new PurchaseAlreadyCompletedError(id);
        }

        if (purchase.paymentStatus === "refunded") {
            throw new PurchaseAlreadyRefundedError(id);
        }

        await this.purchaseRepository.updatePaymentStatus(id, "completed");

        const updatedPurchase = await this.purchaseRepository.findById(id);
        return this.toResponseDTO(updatedPurchase!);
    }

    // Marcar pagamento como falho
    async failPayment(id: number): Promise<PurchaseResponseDTO> {
        const purchase = await this.purchaseRepository.findById(id);

        if (!purchase) {
            throw new PurchaseNotFoundError(id);
        }

        if (purchase.paymentStatus === "completed") {
            throw new PurchaseAlreadyCompletedError(id);
        }

        await this.purchaseRepository.updatePaymentStatus(id, "failed");

        const updatedPurchase = await this.purchaseRepository.findById(id);
        return this.toResponseDTO(updatedPurchase!);
    }

    // Reembolsar compra
    async refundPurchase(id: number): Promise<PurchaseResponseDTO> {
        const purchase = await this.purchaseRepository.findById(id);

        if (!purchase) {
            throw new PurchaseNotFoundError(id);
        }

        if (purchase.paymentStatus === "refunded") {
            throw new PurchaseAlreadyRefundedError(id);
        }

        if (purchase.paymentStatus !== "completed") {
            throw new InvalidPurchaseDataError("Só é possível reembolsar compras com pagamento completado");
        }

        await this.purchaseRepository.updatePaymentStatus(id, "refunded");

        const updatedPurchase = await this.purchaseRepository.findById(id);
        return this.toResponseDTO(updatedPurchase!);
    }

    // Deletar compra
    async deletePurchase(id: number): Promise<PurchaseResponseDTO> {
        const purchase = await this.purchaseRepository.findById(id);

        if (!purchase) {
            throw new PurchaseNotFoundError(id);
        }

        const purchaseData = this.toResponseDTO(purchase);
        await this.purchaseRepository.delete(id);

        return purchaseData;
    }

    // Verificar se usuário já comprou um livro
    async userHasPurchased(userId: number, bookId: number): Promise<boolean> {
        return await this.purchaseRepository.userHasPurchasedBook(userId, bookId);
    }

    // Obter estatísticas de compras
    async getPurchaseStats(): Promise<PurchaseStatsDTO> {
        const [total, pending, completed, failed, refunded, totalRevenue] = await Promise.all([
            this.purchaseRepository.count(),
            this.purchaseRepository.countByStatus("pending"),
            this.purchaseRepository.countByStatus("completed"),
            this.purchaseRepository.countByStatus("failed"),
            this.purchaseRepository.countByStatus("refunded"),
            this.purchaseRepository.calculateTotalRevenue()
        ]);

        return {
            total,
            pending,
            completed,
            failed,
            refunded,
            totalRevenue: Number(totalRevenue)
        };
    }
}
