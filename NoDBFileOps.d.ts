export default class NoDBFileOps {
    filepath: string;
    private JSONDataArray;
    constructor(filepath: string);
    get(queryObject: any): any | Array<any> | null;
    update(queryObject: any, newValue: any): number;
    put(queryObject: any): boolean;
    delete(queryObject: any): number | boolean;
    private findKeyValuePairedObjects(object, queryObject);
}
