import prisma from "../database.js";

export interface Test {
    id: number,
    name: string,
    pdfUrl: string,
    categoryId: number,
    teacherDisciplineId: number
}

export type TestInfo = Omit<Test, "id">

export async function insert(data: TestInfo){
    await prisma.tests.create({
        data: data
    })
}

export async function getCategoryIdByName(name: string) {
    const id = await prisma.categories.findUnique({
        where: {name}
    }) 
    if(id){
        return id.id;
    }
}

export async function getTeacherIdByName(name: string) {
    const id = await prisma.teachers.findUnique({
        where: {name}
    })
    if(id){
        return id.id;
    }
}

export async function getDisciplineIdByName(name: string) {
    const id = await prisma.disciplines.findUnique({
        where: {name}
    })
    if(id){
        return id.id;
    }
}

export async function getTeacherDiscipline(teacherId: number, disciplineId: number) {
    const id = await prisma.teachersDisciplines.findMany({
        where: {teacherId, disciplineId}
    })

    return id[0].id;
}

export async function getTestsByDiscipline(){
    const data = await prisma.terms.findMany({
        orderBy: {number: 'asc'},
        include: {
            disciplines:{
                include: {
                    teachersDisciplines: {
                        include: {
                            disciplines: {},
                            teachers: {},
                            tests: {
                                include: {
                                    categories: {}
                                }
                            }
                        }
                    }
                }
            }
        }
    })

    return data;
}

export async function getTestsbyTeacher(){
    const data = await prisma.teachersDisciplines.findMany({
        include:{
            teachers: {},
            disciplines: {
                include:{
                    terms: {}
                }
            },
            tests: {
                include: {
                    categories: {}
                }
            }
        }
    })

    return data;
}