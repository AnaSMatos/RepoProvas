import  jwt  from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config()

export function decodeToken (receivedToken){
    const token = receivedToken.split('Bearer ').join('');
    let infoToken;
    jwt.verify(token, 'secret', (err: any, decoded: any) => {
        if (err) {
            throw { 
                type: "unauthorized",
                message: "Invalid token"
            }
        }

        else infoToken = decoded;
    });

    return infoToken;
}

export function generateToken(userId:number) {
    return jwt.sign( { userId }, process.env.JWT_TOKEN);
}

export function getUserIdbyToken(authorization) {
    const checkToken = decodeToken(authorization)
        if(!checkToken){
            throw{
                type: "unauthorized",
                message: "Invalid token"
            }
        }
        return checkToken
}