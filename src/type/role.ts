export interface IRole {
  authority: number[];
  roleId: number;
  roleName: string;
}
export class RoleData{
    list:IRole[]=[]
}
