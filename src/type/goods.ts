export interface IList{
    id:number,
    userId:number,
    title:string,
    introduce:string
}
export interface IQueryData{
    title:string,
    introduce:string,
    page:number,    //第几页
    count:number,   //总条数
    pagesize:number //一页的条数
}
export class InitData{
    list:IList[]=[]
    //下面的对象针对搜索表单
    /* 通过查询的内容对list进行改造，并分页得到sliceList，最终展示sliceList */
    queryData:IQueryData={
        title:'',
        introduce:'',
        page:1,    //第几页
        count:0,   //总条数
        pagesize:10
    }
}

