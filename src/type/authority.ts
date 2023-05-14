interface IAuthTree{
    name:string,
    authList:IAuthContent[]
}

interface IAuthContent{
    name:string,
    authId:number
}

export class Auth{
    id:number
    auths:number[]
    constructor(id:number,auths:number[]){
        this.id=id
        this.auths=auths
    }
    treeList:IAuthTree[]=[]
    treeRef:any
}