import { RentalRepository } from "../repository/RentalRepository";
import { BookRepository } from "../repository/BookRepository";
import { UserRepository } from "../repository/UserRepository";
import { CreateRentalDTO, RentalFiltersDTO, RentalResponseDTO, RentalStatsDTO, RenewRentalDTO } from "../dtos/RentalDTO";
import { Rental, PaymentMethod } from "../models/Rental";
import {
    RentalNotFoundError,
    InvalidRentalDataError,
    RentalAlreadyReturnedError,
    InvalidRentalPeriodError,
    RentalNotActiveError,
    CannotRenewRentalError,
    InvalidPaymentMethodError,
    BookNotFoundError,
    UserNotFoundError
} from "../errors/AppError";

const VALID_PAYMENT_METHODS: PaymentMethod[] = ["credit_card", "debit_card", "pix", "boleto"];
const MIN_RENTAL_DAYS = 1;
const MAX_RENTAL_DAYS = 30;

export class RentalService {
    private rentalRepository: RentalRepository;
    private bookRepository: BookRepository;
    private userRepository: UserRepository;

    constructor() {
        this.rentalRepository = new RentalRepository();
        this.bookRepository = new BookRepository();
        this.userRepository = new UserRepository();
    }

    // Converter modelo para DTO de resposta
    private toResponseDTO(rental: Rental): RentalResponseDTO {
        const now = new Date();
        const dueDate = new Date(rental.dueDate);
        const diffTime = dueDate.getTime() - now.getTime();
        const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const isOverdue = rental.rentalStatus === "active" && daysRemaining < 0;

        const response: RentalResponseDTO = {
            id: rental.id,
            userId: rental.userId,
            bookId: rental.bookId,
            rentalPrice: Number(rental.rentalPrice),
            paymentMethod: rental.paymentMethod,
            paymentStatus: rental.paymentStatus,
            rentalStatus: rental.rentalStatus,
            rentalDate: rental.rentalDate,
            dueDate: rental.dueDate,
            returnDate: rental.returnDate,
            daysRemaining: rental.rentalStatus === "active" ? Math.max(0, daysRemaining) : undefined,
            isOverdue: rental.rentalStatus === "active" ? isOverdue : undefined
        };

        if (rental.user) {
            response.user = {
                id: rental.user.id,
                name: rental.user.name,
                email: rental.user.email
            };
        }

        if (rental.book) {
            response.book = {
                id: rental.book.id,
                title: rental.book.title,
                author: rental.book.author,
                isbn: rental.book.isbn,
                publishedYear: rental.book.publishedYear,
                genre: rental.book.genre,
                price: Number(rental.book.price),
                rentalPrice: Number(rental.book.rentalPrice),
                available: rental.book.available,
                description: rental.book.description
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

    // Calcular data de devolução
    private calculateDueDate(days: number): Date {
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + days);
        return dueDate;
    }

    // Validar dados de criação
    private validateCreateData(data: CreateRentalDTO): void {
        if (!data.userId) {
            throw new InvalidRentalDataError("O ID do usuário é obrigatório");
        }

        if (!data.bookId) {
            throw new InvalidRentalDataError("O ID do livro é obrigatório");
        }

        if (!data.paymentMethod) {
            throw new InvalidRentalDataError("O método de pagamento é obrigatório");
        }

        this.validatePaymentMethod(data.paymentMethod);

        if (!data.rentalDays || data.rentalDays < MIN_RENTAL_DAYS || data.rentalDays > MAX_RENTAL_DAYS) {
            throw new InvalidRentalPeriodError(MIN_RENTAL_DAYS, MAX_RENTAL_DAYS);
        }
    }

    // Criar novo aluguel
    async createRental(data: CreateRentalDTO): Promise<RentalResponseDTO> {
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

        // Calcular data de devolução
        const dueDate = this.calculateDueDate(data.rentalDays);

        // Criar aluguel com o preço de aluguel do livro
        const rental = await this.rentalRepository.create({
            userId: data.userId,
            bookId: data.bookId,
            rentalPrice: Number(book.rentalPrice),
            paymentMethod: data.paymentMethod,
            dueDate
        });

        // Buscar com relações
        const rentalWithRelations = await this.rentalRepository.findById(rental.id);
        return this.toResponseDTO(rentalWithRelations!);
    }

    // Listar todos os aluguéis
    async getAllRentals(): Promise<RentalResponseDTO[]> {
        const rentals = await this.rentalRepository.findAll();
        return rentals.map(rental => this.toResponseDTO(rental));
    }

    // Buscar aluguel por ID
    async getRentalById(id: number): Promise<RentalResponseDTO> {
        const rental = await this.rentalRepository.findById(id);

        if (!rental) {
            throw new RentalNotFoundError(id);
        }

        return this.toResponseDTO(rental);
    }

    // Buscar aluguéis por usuário
    async getRentalsByUser(userId: number): Promise<RentalResponseDTO[]> {
        // Verificar se usuário existe
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new UserNotFoundError(userId);
        }

        const rentals = await this.rentalRepository.findByUserId(userId);
        return rentals.map(rental => this.toResponseDTO(rental));
    }

    // Buscar aluguéis por livro
    async getRentalsByBook(bookId: number): Promise<RentalResponseDTO[]> {
        // Verificar se livro existe
        const book = await this.bookRepository.findById(bookId);
        if (!book) {
            throw new BookNotFoundError(bookId);
        }

        const rentals = await this.rentalRepository.findByBookId(bookId);
        return rentals.map(rental => this.toResponseDTO(rental));
    }

    // Buscar aluguéis ativos
    async getActiveRentals(): Promise<RentalResponseDTO[]> {
        const rentals = await this.rentalRepository.findActive();
        return rentals.map(rental => this.toResponseDTO(rental));
    }

    // Buscar aluguéis atrasados
    async getOverdueRentals(): Promise<RentalResponseDTO[]> {
        const rentals = await this.rentalRepository.findOverdue();
        return rentals.map(rental => this.toResponseDTO(rental));
    }

    // Buscar aluguéis com filtros
    async getRentalsByFilters(filters: RentalFiltersDTO): Promise<RentalResponseDTO[]> {
        const rentals = await this.rentalRepository.findWithFilters(filters);
        return rentals.map(rental => this.toResponseDTO(rental));
    }

    // Devolver livro (finalizar aluguel)
    async returnRental(id: number): Promise<RentalResponseDTO> {
        const rental = await this.rentalRepository.findById(id);

        if (!rental) {
            throw new RentalNotFoundError(id);
        }

        if (rental.rentalStatus === "returned") {
            throw new RentalAlreadyReturnedError(id);
        }

        await this.rentalRepository.markAsReturned(id);

        const updatedRental = await this.rentalRepository.findById(id);
        return this.toResponseDTO(updatedRental!);
    }

    // Confirmar pagamento
    async confirmPayment(id: number): Promise<RentalResponseDTO> {
        const rental = await this.rentalRepository.findById(id);

        if (!rental) {
            throw new RentalNotFoundError(id);
        }

        if (rental.paymentStatus === "completed") {
            throw new InvalidRentalDataError("O pagamento deste aluguel já foi confirmado");
        }

        await this.rentalRepository.update(id, { paymentStatus: "completed" });

        const updatedRental = await this.rentalRepository.findById(id);
        return this.toResponseDTO(updatedRental!);
    }

    // Renovar aluguel
    async renewRental(data: RenewRentalDTO): Promise<RentalResponseDTO> {
        const rental = await this.rentalRepository.findById(data.rentalId);

        if (!rental) {
            throw new RentalNotFoundError(data.rentalId);
        }

        if (rental.rentalStatus !== "active") {
            throw new RentalNotActiveError(data.rentalId);
        }

        if (data.additionalDays < MIN_RENTAL_DAYS || data.additionalDays > MAX_RENTAL_DAYS) {
            throw new InvalidRentalPeriodError(MIN_RENTAL_DAYS, MAX_RENTAL_DAYS);
        }

        this.validatePaymentMethod(data.paymentMethod);

        // Calcular nova data de devolução a partir da data atual de devolução
        const currentDueDate = new Date(rental.dueDate);
        const newDueDate = new Date(currentDueDate);
        newDueDate.setDate(newDueDate.getDate() + data.additionalDays);

        await this.rentalRepository.extendDueDate(data.rentalId, newDueDate);

        const updatedRental = await this.rentalRepository.findById(data.rentalId);
        return this.toResponseDTO(updatedRental!);
    }

    // Buscar aluguéis ativos de um usuário
    async getActiveRentalsByUser(userId: number): Promise<RentalResponseDTO[]> {
        // Verificar se usuário existe
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new UserNotFoundError(userId);
        }

        const rentals = await this.rentalRepository.findActiveByUserId(userId);
        return rentals.map(rental => this.toResponseDTO(rental));
    }

    // Deletar aluguel
    async deleteRental(id: number): Promise<RentalResponseDTO> {
        const rental = await this.rentalRepository.findById(id);

        if (!rental) {
            throw new RentalNotFoundError(id);
        }

        const rentalData = this.toResponseDTO(rental);
        await this.rentalRepository.delete(id);

        return rentalData;
    }

    // Obter estatísticas de aluguéis
    async getRentalStats(): Promise<RentalStatsDTO> {
        // Atualizar status de aluguéis atrasados antes de calcular estatísticas
        const overdueRentals = await this.rentalRepository.findOverdue();
        for (const rental of overdueRentals) {
            await this.rentalRepository.markAsOverdue(rental.id);
        }

        const [total, active, returned, overdue, pendingPayment, completedPayment, totalRevenue] = await Promise.all([
            this.rentalRepository.count(),
            this.rentalRepository.countByRentalStatus("active"),
            this.rentalRepository.countByRentalStatus("returned"),
            this.rentalRepository.countByRentalStatus("overdue"),
            this.rentalRepository.countByPaymentStatus("pending"),
            this.rentalRepository.countByPaymentStatus("completed"),
            this.rentalRepository.calculateTotalRevenue()
        ]);

        return {
            total,
            active,
            returned,
            overdue,
            pendingPayment,
            completedPayment,
            totalRevenue: Number(totalRevenue)
        };
    }
}
