import { readFileSync, writeFileSync, appendFileSync, openSync } from 'fs'
import { sync } from 'mkdirp'

export default class NoDBFileOps {
    public filepath:string;
    private JSONDataArray: Array<any>;
    constructor(filepath: string){

        if(typeof filepath !== "undefined")
            this.filepath = filepath;
        else
            throw new Error("FilePath Undefined");
        let data;
        try {
            data = readFileSync(this.filepath);
        } catch (error) {
            openSync(this.filepath,"w+");
            writeFileSync(this.filepath,"[]");
            data = readFileSync(this.filepath);
        }

        try {
            this.JSONDataArray = JSON.parse(data.toString())
        } catch (error) {
            console.error(error)
        }
    }

    public get(queryObject: any): any | Array<any> | null{
        let bufferOfSearchedObjects: Array<any> = [];
        this.JSONDataArray.forEach((object) => {
            let temp = this.findKeyValuePairedObjects(object, queryObject);
            if( temp !== null)
            bufferOfSearchedObjects.push(temp);
        })

        if(bufferOfSearchedObjects.length === 0)
            return null;
        else if (bufferOfSearchedObjects.length === 1)
            return bufferOfSearchedObjects[0];
        else
            return bufferOfSearchedObjects;
    }

    public update(queryObject:any, newValue:any): number{
        let bufferOfSearchedObjects: Array<any> = [];
        this.JSONDataArray.forEach((object) => {
            let temp = this.findKeyValuePairedObjects(object, queryObject);
            if( temp !== null)
            bufferOfSearchedObjects.push(temp);
        })

        this.JSONDataArray =  this.JSONDataArray.map((jObj)=>{
                let temp = jObj;
                bufferOfSearchedObjects.forEach((object) => {
                    if(temp === object ){
                        temp = {...object, ...newValue }
                    }
            })
            return temp;
        })

        try {
            writeFileSync(this.filepath,JSON.stringify(this.JSONDataArray))
        } catch (error) {
            console.error(error)
            return 0;
        }
        
        return bufferOfSearchedObjects.length;
    }


    public put(queryObject: any): boolean{
        let bufferOfSearchedObjects = [];
        this.JSONDataArray.push(queryObject);
        try {
            writeFileSync(this.filepath,JSON.stringify(this.JSONDataArray))
        } catch (error) {
            console.error(error)
            return false;
        }
        return true;
    }

    public delete(queryObject: any): number | boolean{
        let bufferOfSearchedObjects = [];
        let prevLength = this.JSONDataArray.length;
        this.JSONDataArray.forEach((object) => {
            let temp = this.findKeyValuePairedObjects(object, queryObject);
            if( temp !== null )
            this.JSONDataArray =  this.JSONDataArray.filter((object)=>{
                return object !== temp
            });
                
        })
        try {
            writeFileSync(this.filepath,JSON.stringify(this.JSONDataArray))
        } catch (error) {
            console.error(error)
            return false;
        }
        return prevLength - this.JSONDataArray.length;
    }

    private findKeyValuePairedObjects(object: any,queryObject: any): any{
        let keys = Object.keys(queryObject);
        let flag = true;
        keys.every((key)=>{
            flag = object[key] === queryObject[key]
            return flag;
        })
        if(flag){
            return object
        }else{
            return null
        }
    }

}