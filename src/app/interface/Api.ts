export interface Api{
    name:string;
    method:string;
    description:string;
    url:string;
    header:Array<string>;
    body:string;
    bodyType:string;
    active:boolean;
}