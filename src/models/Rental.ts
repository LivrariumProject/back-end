import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";
import { User } from "./User";
import { Book } from "./Book";

// Tipos de pagamento aceitos
export type PaymentMethod = "credit_card" | "debit_card" | "pix" | "boleto";

// Status do pagamento
export type PaymentStatus = "pending" | "completed" | "failed" | "refunded";

// Status do aluguel
export type RentalStatus = "active" | "returned" | "overdue";

// 1. Atributos que existem na tabela
export interface RentalAttributes {
    id: number;
    userId: number;
    bookId: number;
    rentalPrice: number;
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
    rentalStatus: RentalStatus;
    rentalDate: Date;
    dueDate: Date;
    returnDate?: Date;
}

// 2. Atributos necessários para criar
export interface RentalCreationAttributes
    extends Optional<RentalAttributes, "id" | "rentalDate" | "paymentStatus" | "rentalStatus" | "returnDate"> { }

// 3. Classe do modelo
export class Rental
    extends Model<RentalAttributes, RentalCreationAttributes>
    implements RentalAttributes {
    public id!: number;
    public userId!: number;
    public bookId!: number;
    public rentalPrice!: number;
    public paymentMethod!: PaymentMethod;
    public paymentStatus!: PaymentStatus;
    public rentalStatus!: RentalStatus;
    public rentalDate!: Date;
    public dueDate!: Date;
    public returnDate?: Date;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // Associações
    public readonly user?: User;
    public readonly book?: Book;
}

// 4. Inicialização do modelo
Rental.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id"
            }
        },
        bookId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "books",
                key: "id"
            }
        },
        rentalPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        paymentMethod: {
            type: DataTypes.ENUM("credit_card", "debit_card", "pix", "boleto"),
            allowNull: false
        },
        paymentStatus: {
            type: DataTypes.ENUM("pending", "completed", "failed", "refunded"),
            defaultValue: "pending",
            allowNull: false
        },
        rentalStatus: {
            type: DataTypes.ENUM("active", "returned", "overdue"),
            defaultValue: "active",
            allowNull: false
        },
        rentalDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        dueDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        returnDate: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: "rentals",
        timestamps: true
    }
);

// Associações
Rental.belongsTo(User, { foreignKey: "userId", as: "user" });
Rental.belongsTo(Book, { foreignKey: "bookId", as: "book" });
