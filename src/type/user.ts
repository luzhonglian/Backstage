export interface IUser {
  id: number;
  nickname: string;
  role: IRole[];
  username: string;
}
export interface IRole {
  roleId: number;
  roleName: string;
}
interface IActive{
  id: number;
  nickname: string;
  roleId: number[];
  username: string;
}
export interface IQueryData {
  nickname: string;
  roleId: number;
}
export interface IRoleList {
  roleId: number;
  roleName: string;
  authority: number[];
}
export class UserData {
  queryData: IQueryData = {
    nickname: "",
    roleId:0
  };
  userList: IUser[] = [];
  roleList: IRoleList[] = [];
  isShow=false
  // active:被选中编辑的项目
  active:IActive=
    {
      id: 0,
      nickname: '',
      roleId: [],
      username: 'string',
    }
  
}
