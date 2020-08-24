
# Electron 学习笔记

## 简介

## Demo

1. 状态栏显示信息
1. markdown 编辑
1. 便签
1. 图片
1. IM

## 安装

## 文件结构

1. main.js
1. preload.js
1. renderer.js

## 打包

1. electron-builder
```bash
npm install electron-builder --save-dev
```
2. electron-packager
```bash
npm install electron-packager --save-dev
```
## 基础

### 进程, 主进程, 渲染进程

### BrowserWindow

1. 参数
1. setMenu
1. loadURL
1. loadFile

### IPC(ipcRenderer, ipcMain): 进程之间通信

1. ipcMain
  - on
1. ipcRenderer
  - send
  - on

## 参考文档

1. [Electron入门教程一（electron的基础安装等）](https://blog.csdn.net/hhy1006894859/article/details/89400803)
1. []()