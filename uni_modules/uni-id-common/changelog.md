## 1.0.9（2022-07-01）
- checkToken兼容token内未缓存角色权限的情况，此时将查库获取角色权限
## 1.0.8（2022-07-01）
- 修复clientDB默认依赖时部分情况下获取不到uni-id配置的Bug
## 1.0.7（2022-06-30）
- 修复config文件不合法时未抛出具体错误的Bug
## 1.0.6（2022-06-28）
- 移除插件内的数据表schema
## 1.0.5（2022-06-27）
- 修复使用多应用配置时报`Cannot read property 'appId' of undefined`的Bug
## 1.0.4（2022-06-27）
- 修复使用自定义token内容功能报错的Bug [详情](https://ask.dcloud.net.cn/question/147945)
## 1.0.2（2022-06-23）
- 对齐旧版本uni-id默认配置
## 1.0.1（2022-06-22）
- 补充对uni-config-center的依赖
## 1.0.0（2022-06-21）
- 提供uni-id token创建、校验、刷新接口，简化旧版uni-id公共模块
