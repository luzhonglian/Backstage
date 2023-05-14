//api文件用于封装对于后端的请求
import service from ".";
interface ILoginData {
  password: string;
  username: string;
}
export function login(data: ILoginData) {
  return service({
    url: "/login",
    method: "post",
    data,
  });
}

export function getGoodsList() {
  return service({
    url: "/getGoodsList",
    method: "get",
  });
}

export function getUserList() {
  return service({
    url: "/getUserList",
    method: "get",
  });
}

export function getRoleList() {
  return service({
    url: "/getRoleList",
    method: "get",
  });
}

export function getAuthorityList() {
  return service({
    url: "/getAuthorityList",
    method: "get",
  });
}
