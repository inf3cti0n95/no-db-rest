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
    console.log("Data Fetched from "+fileOps.filepath+" and served response")
}

function postRequest(fileOps: NoDbFileOps, request: Request, response: Response){
    let resp = fileOps.put(request.query);
    if(resp)
        console.log("Data inserted to "+fileOps.filepath+" and served response")
    else
        console.log("Data not inserted to "+fileOps.filepath)

    response.send(JSON.stringify(resp))

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

    let resp = fileOps.update(queryObject,updateObject);
    
    response.send(JSON.stringify(resp))
    console.log("Data updated at "+resp+" places in "+fileOps.filepath+" and served response")

}

function deleteRequest(fileOps: NoDbFileOps, request: Request, response: Response){
    let resp = fileOps.delete(request.query);
    response.send(JSON.stringify(resp))

    console.log("Data deleted at "+resp+" places in "+fileOps.filepath+" and served response")

}
