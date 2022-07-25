import { insert,
        getCategoryIdByName,
        getDisciplineIdByName, 
        getTeacherDiscipline, 
        getTeacherIdByName, 
        getTestsByDiscipline, 
        getTestsbyTeacher} from "../repositories/testsRepository.js";

import dotenv from "dotenv";
dotenv.config();

export interface testInfo {
    name: string,
    pdfUrl: string,
    category: string,
    teacher: string,
    discipline: string
}


export async function insertTest(data: testInfo){
    const teacherId = await getTeacherIdByName(data.name)
    if(!teacherId){
        throw {
			type: "notFound",
			message: "Teacher not found",
		}
    }

    const disciplineId = await getDisciplineIdByName(data.discipline)
    if(!disciplineId){
        throw {
			type: "notFound",
			message: "Discipline not found",
		}
    }

    const categoryId = await getCategoryIdByName(data.category)
    if(!categoryId){
        throw {
			type: "notFound",
			message: "Category not found",
		}
    }

    const teacherDisciplineId = await getTeacherDiscipline(teacherId, disciplineId)
    if(!teacherDisciplineId){
        throw{
            type: "notFound",
            message: "This discipline is not ministered by this teacher"
        }
    }

    const finalData = {
        name: data.name,
        pdfUrl: data.pdfUrl,
        categoryId,
        teacherDisciplineId
    }

    await insert(finalData)
}

export async function getByTeacher(){
    const data = await getTestsbyTeacher()
    if(!data){
        throw {
			type: "notFound",
			message: "Tests not found",
		}
    }

    return data
}

export async function getByDiscipline(){
    const data = await getTestsByDiscipline()
    if(!data){
        throw {
			type: "notFound",
			message: "Tests not found",
		}
    }

    return data
}