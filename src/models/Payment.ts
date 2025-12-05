import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";
import { User } from "./User";

// Tipos de pagamento
export type PaymentMethod = "credit_card" | "debit_card" | "pix" | "boleto";
export type PaymentStatus = "pending" | "completed" | "failed" | "refunded";
export type PaymentType = "purchase" | "rental";

// 1. Atributos que existem na tabela
export interface PaymentAttributes {
    id: number;
    userId: number;
    amount: number;
    paymentMethod: PaymentMethod;
    status: PaymentStatus;
    type: PaymentType;
    transactionId?: string;
    paymentDate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

// 2. Atributos necessários para criar
export interface PaymentCreationAttributes
    extends Optional<PaymentAttributes, "id" | "status" | "transactionId" | "paymentDate" | "createdAt" | "updatedAt"> { }

// 3. Classe do modelo
export class Payment
    extends Model<PaymentAttributes, PaymentCreationAttributes>
    implements PaymentAttributes {
    public id!: number;
    public userId!: number;
    public amount!: number;
    public paymentMethod!: PaymentMethod;
    public status!: PaymentStatus;
    public type!: PaymentType;
    public transactionId?: string;
    public paymentDate?: Date;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // Associação
    public readonly user?: User;
}

// 4. Inicialização do modelo
Payment.init(
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
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        paymentMethod: {
            type: DataTypes.ENUM("credit_card", "debit_card", "pix", "boleto"),
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM("pending", "completed", "failed", "refunded"),
            defaultValue: "pending",
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM("purchase", "rental"),
            allowNull: false
        },
        transactionId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        paymentDate: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: "payments",
        timestamps: true
    }
);
