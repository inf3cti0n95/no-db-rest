import { Request, Response, NextFunction } from 'express'
import NoDbFileOps from './NoDBFileOps'

export function NoDBRest (filepath: string){

    return function (request: Request, response:Response, next: NextFunction){
        const fileOps = new NoDbFileOps(filepath);
        switch(request.method){
            case "GET":
                getRequest(fileOps,request,response);
                break;

            case "POST":
                postRequest(fileOps,request,response);
                break;

            case "DELETE":
                deleteRequest(fileOps,request,response);
                break;

            case "PUT":
                putRequest(fileOps,request,response);
                break;
        }

        next();
    }

}

function getRequest(fileOps: NoDbFileOps, request: Request, response: Response){
    response.send(JSON.stringify(fileOps.get(request.query)))
}

function postRequest(fileOps: NoDbFileOps, request: Request, response: Response){
    response.send(JSON.stringify(fileOps.put(request.query)))
}

function putRequest(fileOps: NoDbFileOps, request: Request, response: Response){

    
    let query:string = request.query.search
    let searchParams = query.split(",");
    let queryObject:any = new Object();
    searchParams.forEach((p)=>{
        let key= p.split("=")[0]
        let val = p.split("=")[1]
        if(/^\d+$/.test(val) || val === "true" || val === "false")
            val = eval(val)
        queryObject[key] = val;
    })

    let update:string = request.query.update
    let updateParams = update.split(",");
    let updateObject:any = new Object();
    updateParams.forEach((p)=>{
        let key= p.split("=")[0]
        let val = p.split("=")[1]
        if(/^\d+$/.test(val) || val === "true" || val === "false")
            val = eval(val)
        updateObject[key] = val;
    })

    response.send(JSON.stringify(fileOps.update(queryObject,updateObject)))
}

function deleteRequest(fileOps: NoDbFileOps, request: Request, response: Response){
    response.send(JSON.stringify(fileOps.delete(request.query)))
}
