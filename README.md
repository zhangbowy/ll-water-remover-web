# 琳琳去水印

小红书无水印图片提取工具，粘贴链接即可一键保存高清图片。

## 功能

- 粘贴小红书链接，自动提取笔记中的所有图片
- 支持直接链接、分享链接、短链接、分享文本等多种格式
- 图片预览、单张保存、批量保存
- H5 / 小程序 / App 多端适配

## 技术栈

- 前端：uni-app + Vue 2 + uView UI
- 后端：ThinkJS（图片提取接口 + 图片代理）

## 后端接口

| 接口 | 方法 | 说明 |
|------|------|------|
| `/xhs/images?url=链接` | GET | 提取小红书图片列表 |
| `/xhs/proxy?url=图片地址` | GET | 代理图片请求（解决 403） |

## 支持的链接格式

```
https://www.xiaohongshu.com/explore/xxx?xsec_token=xxx
https://www.xiaohongshu.com/discovery/item/xxx?xsec_token=xxx
http://xhslink.com/xxx
分享文本（自动识别其中的链接）
```

## 项目结构

```
├── pages/
│   ├── watermark/     # 图片提取页面（主功能）
│   ├── index/         # 头像挂件
│   ├── frame/         # 相框
│   └── mine/          # 个人中心、关于、使用说明
├── xhs.js             # ThinkJS 后端 Controller
├── 2.js               # 图片提取脚本（独立运行）
├── server.js           # 独立 Node.js 服务（备用）
└── config/config.js   # 前端配置
```
