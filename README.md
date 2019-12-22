Taro 多端开发实现原理与项目实战 - cnode框架搭建

1.安装

npm install

2.运行

npm run dev:weapp       // 微信小程序

npm run dev:swan        // 百度小程序

npm run dev:alipay      // 支付宝小程序

npm run dev:tt          // 头条小程序

npm run dev:h5          // 网页

npm run dev:rn          // react-native APP

npm run dev:qq          // QQ小程序

npm run dev:quickapp    // 快应用

3.编译

npm run build:weapp       // 微信小程序

npm run build:swan        // 百度小程序

npm run build:alipay      // 支付宝小程序

npm run build:tt          // 头条小程序

npm run build:h5          // 网页

npm run build:rn          // react-native APP

npm run build:qq          // QQ小程序

npm run build:quickapp    // 快应用

4.目录结构
|

├── config                 配置目录

|   ├── dev.js             开发时配置

|   ├── index.js           默认配置

|   └── prod.js            打包时配置

├── src                    源码目录

|   ├── actions            页面操作管理目录

|   ├── assets             静态资源目录

|   ├── components         公共组件目录

|   ├── constants          常量设置目录

|   ├── pages              页面文件目录

|   |   ├── index          index 页面目录

|   |   |   ├── banner     页面 index 私有组件

|   |   |   ├── index.js   index 页面逻辑

|   |   |   └── index.css  index 页面样式

|   ├── reducers           页面执行动作管理目录

|   ├── store              页面状态管理目录

|   ├── utils              公共方法库

|   ├── app.scss           项目总通用样式

|   ├── app.jsx            项目入口文件

|   └── index.html         项目h5入口文件

├── package.json           资源包配置文件

└── README.md              项目说明


