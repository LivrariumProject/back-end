import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

// Middleware de tratamento de erros
export const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    // Se for um erro operacional (AppError), retorna o status e mensagem apropriados
    if (error instanceof AppError) {
        res.status(error.statusCode).json({
            success: false,
            message: error.message,
            statusCode: error.statusCode
        });
        return;
    }

    // Erros do Sequelize
    if (error.name === "SequelizeValidationError") {
        res.status(400).json({
            success: false,
            message: "Erro de validação",
            errors: (error as any).errors?.map((e: any) => e.message)
        });
        return;
    }

    if (error.name === "SequelizeUniqueConstraintError") {
        res.status(409).json({
            success: false,
            message: "Registro duplicado",
            errors: (error as any).errors?.map((e: any) => e.message)
        });
        return;
    }

    // Log do erro não esperado
    console.error("Erro não tratado:", error);

    // Erro genérico para erros não operacionais
    res.status(500).json({
        success: false,
        message: "Erro interno do servidor",
        ...(process.env.NODE_ENV === "development" && { stack: error.stack })
    });
};
