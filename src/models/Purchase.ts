import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";
import { User } from "./User";
import { Book } from "./Book";

// Tipos de pagamento aceitos
export type PaymentMethod = "credit_card" | "debit_card" | "pix" | "boleto";

// Status do pagamento
export type PaymentStatus = "pending" | "completed" | "failed" | "refunded";

// 1. Atributos que existem na tabela
export interface PurchaseAttributes {
    id: number;
    userId: number;
    bookId: number;
    price: number;
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
    purchaseDate: Date;
}

// 2. Atributos necessários para criar
export interface PurchaseCreationAttributes
    extends Optional<PurchaseAttributes, "id" | "purchaseDate" | "paymentStatus"> { }

// 3. Classe do modelo
export class Purchase
    extends Model<PurchaseAttributes, PurchaseCreationAttributes>
    implements PurchaseAttributes {
    public id!: number;
    public userId!: number;
    public bookId!: number;
    public price!: number;
    public paymentMethod!: PaymentMethod;
    public paymentStatus!: PaymentStatus;
    public purchaseDate!: Date;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // Associações (serão preenchidas quando incluídas nas queries)
    public readonly user?: User;
    public readonly book?: Book;
}

// 4. Inicialização do modelo
Purchase.init(
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
        price: {
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
        purchaseDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "purchases",
        timestamps: true
    }
);

// Associações
Purchase.belongsTo(User, { foreignKey: "userId", as: "user" });
Purchase.belongsTo(Book, { foreignKey: "bookId", as: "book" });
