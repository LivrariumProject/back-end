import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

// 1. Atributos que existem na tabela
export interface BookAttributes {
    id: number;
    title: string;
    author: string;
    isbn: string;
    publishedYear: number;
    genre: string;
    price: number;
    rentalPrice: number;
    available: boolean;
    description?: string;
}

// 2. Atributos necessários para criar (id é auto incremento, available tem default)
export interface BookCreationAttributes
    extends Optional<BookAttributes, "id" | "available"> { }

// 3. Classe do modelo
export class Book
    extends Model<BookAttributes, BookCreationAttributes>
    implements BookAttributes {
    public id!: number;
    public title!: string;
    public author!: string;
    public isbn!: string;
    public publishedYear!: number;
    public genre!: string;
    public price!: number;
    public rentalPrice!: number;
    public available!: boolean;
    public description?: string;
}

// 4. Inicialização do modelo (mapeia pra tabela)
Book.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isbn: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        publishedYear: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        rentalPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        available: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: "books",
        timestamps: false
    }
);
