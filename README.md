## Inclint
inclint 是用来对每次 **改动的文件** 执行 eslint，提高 eslint 执行的速度。

## 依赖
- git 
- eslint

## 安装
`npm install inclint --save`

## 命令及参数
```
inclint -c path/to/eslintrc --targetDir dir[,dir2,...,dirn]

options:   
-c path 必须，指定 eslint 配置文件的路径
--targetDir 必须，提供一个或多个需要检查的目录，注意多个目录用,分割
```

## 例子
```
// package.json
{
  "inclint": "inclint -c ./.eslintrc --targetDir ./src",
}
```

## 协议
本工具遵循 [ISC](https://opensource.org/licenses/ISC) 协议

## 联系我
有问题欢迎联系 liuw809@163.com