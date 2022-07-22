import prisma from "../database.js";

export interface User {
    id: number,
    email: string,
    password: string
}
export type UserInfo = Omit<User, "id">

export async function insertUser(userData: UserInfo){
    const {email, password} = userData;

    await prisma.users.create({
        data: {
            email,
            password
        }
    })
}

export async function getUserByEmail(email: string){
    const user = await prisma.users.findMany({where: {email}})

    return user
}