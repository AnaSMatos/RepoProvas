import { NextFunction, Request, Response } from "express";
import { decodeToken } from "../utils/token.js";

export async function validateToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if(!authorization){
        throw{
            type: "unauthorized",
            message: "Invalid token"
        }
    }

    const infoToken= decodeToken(authorization)
    res.locals.token = infoToken

    next();
};