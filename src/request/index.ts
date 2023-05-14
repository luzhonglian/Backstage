import axios from "axios";
// 这个作用是封装axios，加入baseurl和拦截器
const service = axios.create({
  baseURL:
    "https://www.fastmock.site/mock/4929e2f696f872ae5f895dc9e9cc01b8/api",
  timeout: 5000,
});
/* 请求拦截器，用于改造axios的请求配置 */
service.interceptors.request.use((config) => {
  //config--->请求的配置
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.token = token;
  }
  return config;
});
/* 响应拦截器，用于对返回的数据进行处理 */
service.interceptors.response.use(
  (res) => {
    const code: number = res.status;
    //
    if (code != 200 && code != 201) {
      return Promise.reject(res.data);
    }
    return res.data;
  },
  (err) => {
    console.log(err);
  }
);

export default service;
