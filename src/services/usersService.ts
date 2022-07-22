import { insertUser, getUserByEmail, UserInfo } from "../repositories/usersRepository.js";
import { generateToken } from "../utils/token.js";
import bcrypt from "bcrypt"
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();


async function createUser(data:UserInfo){
    const {email, password} = data;

    const emailExists = await getUserByEmail(email);
    console.log(emailExists)
    if(emailExists.length > 0){
        throw{
            type: "conflict",
            message: "The email is already registered"
        }
    }

    const encryptedPassword = bcrypt.hashSync(password, +process.env.HASH)

    await insertUser({email, password: encryptedPassword})
}

async function logUser(data: UserInfo){
    const {email, password} = data
    const user = await getUserByEmail(email)
    if(user.length === 0){
        throw{
            type: "notFound",
            message: "The email is not registered"
        }
    }

    const checkPassword = bcrypt.compareSync(password, user[0].password)
    if(!checkPassword){
        throw{
            type: "unauthorized",
            message: "Wrong password"
        }
    }

    const token = generateToken(user[0].id)
    return token;
}

const userServices = {
    createUser,
    logUser
}

export default userServices;