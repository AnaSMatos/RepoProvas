import  jwt  from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config()

export function decodeToken (receivedToken){
    const token = receivedToken.split('Bearer ').join('');
    let infoToken;
    jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
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
