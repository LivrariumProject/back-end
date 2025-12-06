// Arquivo para definir as associações entre os modelos
import { User } from "./User";
import { Book } from "./Book";
import { Payment } from "./Payment";
import { Purchase } from "./Purchase";
import { Rental } from "./Rental";

export function setupAssociations(): void {
    // ==================== ASSOCIAÇÕES DE PAYMENT ====================

    // Payment pertence a User
    Payment.belongsTo(User, {
        foreignKey: "userId",
        as: "user"
    });

    // User tem muitos Payments
    User.hasMany(Payment, {
        foreignKey: "userId",
        as: "payments"
    });

    // ==================== ASSOCIAÇÕES DE PURCHASE ====================

    // Purchase pertence a User
    Purchase.belongsTo(User, {
        foreignKey: "userId",
        as: "user"
    });

    // Purchase pertence a Book
    Purchase.belongsTo(Book, {
        foreignKey: "bookId",
        as: "book"
    });

    // Purchase pertence a Payment
    Purchase.belongsTo(Payment, {
        foreignKey: "paymentId",
        as: "payment"
    });

    // User tem muitas Purchases
    User.hasMany(Purchase, {
        foreignKey: "userId",
        as: "purchases"
    });

    // Book tem muitas Purchases
    Book.hasMany(Purchase, {
        foreignKey: "bookId",
        as: "purchases"
    });

    // Payment tem uma Purchase (opcional)
    Payment.hasOne(Purchase, {
        foreignKey: "paymentId",
        as: "purchase"
    });

    // ==================== ASSOCIAÇÕES DE RENTAL ====================

    // Rental pertence a User
    Rental.belongsTo(User, {
        foreignKey: "userId",
        as: "user"
    });

    // Rental pertence a Book
    Rental.belongsTo(Book, {
        foreignKey: "bookId",
        as: "book"
    });

    // Rental pertence a Payment
    Rental.belongsTo(Payment, {
        foreignKey: "paymentId",
        as: "payment"
    });

    // User tem muitos Rentals
    User.hasMany(Rental, {
        foreignKey: "userId",
        as: "rentals"
    });

    // Book tem muitos Rentals
    Book.hasMany(Rental, {
        foreignKey: "bookId",
        as: "rentals"
    });

    // Payment tem um Rental (opcional)
    Payment.hasOne(Rental, {
        foreignKey: "paymentId",
        as: "rental"
    });
}
