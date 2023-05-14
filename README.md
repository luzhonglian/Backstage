# 后台管理系统

## 目录

- [关于](#about)
- [项目运行准备](#getting_started)
- [项目运行](#usage)
- [开发中遇到的 bug 以及解决方案](#bug)
- [感想](#opinion)

## 关于 <a name = "about"></a>

Vue-cli+Element Plus+Vue3.2+ts+setup 语法糖编写 <br>
该项目为前端页面，后台数据在 fastmock 上布置，可在 src/mock 中查看<br>
项目分为以下模块：<br>
**登录**：账号匹配lzl:123即可登录<br>
**商品列表**：请求商品数据，分页展示，可通过标题和详情进行查询<br>
**用户列表**：分为管理员和普通用户，可通过姓名和角色进行查询，对已有用户进行编辑操作<br>
**角色列表**:可添加除普通用户和管理员之外的其他角色，并对普通用户和管理员的权限进行修改<br>
**权限管理**：通过点击角色列表的修改权限进入选定角色的权限管理，所有权限通过树形展示，点击确认修改会提示更新后的权限

## 项目运行准备 <a name = "getting_started"></a>

### 安装 node 和 npm

### 安装以下依赖

```
 "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^5.4.0",
    "@typescript-eslint/parser": "^5.4.0",
    "@vue/cli-plugin-babel": "~5.0.0",
    "@vue/cli-plugin-eslint": "~5.0.0",
    "@vue/cli-plugin-router": "~5.0.0",
    "@vue/cli-plugin-typescript": "~5.0.0",
    "@vue/cli-service": "~5.0.0",
    "@vue/eslint-config-typescript": "^9.1.0",
    "eslint": "^7.32.0",
    "eslint-plugin-vue": "^8.0.3",
    "sass": "^1.32.7",
    "sass-loader": "^12.0.0",
    "typescript": "~4.5.5",
    "unplugin-auto-import": "^0.13.0",
    "unplugin-vue-components": "^0.23.0"
  }
```
### 在vue.config.js中加入如下配置
```
configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    
    ],
  }
```

## 项目运行 <a name = "usage"></a>

```
npm run serve
```

## 开发中遇到的 bug 以及解决方案 <a name = "bug"></a>

**通过 name+params 方式传参时提示：Discarded invalid param(s) “id“, “auths“ when navigating.** <br><br>
BUG 原因：这种传参方式因为页面刷新后会被丢失而被移除了，详情：https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22

解决方案：通过在路由中设置带参数的动态路由匹配变可在传参后通过route拿到params

```
 {
        path: "authority/:id/:auths",
        name: "authority",
        component: () => import("../views/AuthorityView.vue"),
      },
```
**从Element-plus 导入ElMessage, ElMessageBox并调用prompt时会出现样式丢失问题** <br><br>
```
import { ElMessage, ElMessageBox } from 'element-plus'
```
解决方案：手动引入样式
```
import 'element-plus/es/components/message-box/style/css';
import 'element-plus/es/components/message/style/css'; 
```
## 感想 <a name = "opinion"></a>
vue-cli比vite慢好多