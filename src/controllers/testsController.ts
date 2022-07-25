import {Request, Response} from "express"
import {getByDiscipline, getByTeacher, insertTest} from "../services/testsService.js"

export async function postTest(req:Request, res: Response) {
    const { data } = req.body
    
    await insertTest( data )
    res.sendStatus(201)
}

export async function getTests(req:Request, res: Response){
    const {groupBy} = req.query
    let data;
    if(groupBy === "teachers"){
        data = await getByTeacher()
    }else{
        data = await getByDiscipline()
    }
    

	res.status(200).send(data)
}