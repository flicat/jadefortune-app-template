### cordova app 模板
-------------
#### 模板使用
```
vue create --preset flicat/jadefortune-app-template my-app-project
```

#### 打包部署
##### 开发模式
```
npm run dev-dev    #开发环境
npm run dev-test   #测试环境
```
##### 打包
```
npm run build-dev    #开发环境
npm run build-test   #测试环境
npm run build-uat    #uat环境
npm run build-prod   #生产环境
```

##### 部署
- 打包的`app.apk`文件位于`www/app/`目录下
- 打包的热更新配置文件`chcp.json`和`chcp.manifest`位于`www`目录下
- www目录必须部署到线上可访问，作为APP热更新的请求地址

#### 使用 Docker 打包 APP
在用docker打包之前，先完成以下步骤
```
# 安装npm依赖
npm install

# 构建 HTML
npm run build-prod

# 初始化 Android APP 构建环境
docker-compose up app-init
```
完成以上步骤后，后续就可以使用 docker-compose 构建APP了：
```
docker-compose up app-build
```

#### 关于热更新
- 热更新地址配置
> ```
> # config.xml
> <chcp>
>   <config-file url="http://192.168.0.123:5001/chcp.json" />  <!-- chcp.json 文件地址 -->
> </chcp>
> ```
> ```
> # cordova-hcp.json
> {
> "android_identifier": "http://192.168.0.123:5001/app/app.apk", // apk 文件地址
> "content_url": "http://192.168.0.123:5001/"   // www 目录地址
> }
> ```
- 热更新规则
- - 修改版本号之后，客户端提示下载更新
- **注意：H5页面文件采用静默更新模式，不需要修改版本号，更新时没有提示**
> ```
> # config.xml
> <chcp>
>   <native-interface version="2" />
> </chcp>
> ```
> ```
> # cordova-hcp.json
> {
> "min_native_interface": 2,
> }
> ```
- **注意：`<native-interface>`和`min_native_interface`版本号必须一致**
- **注意：config.xml和cordova-hcp.json文件是自动生成的，如需修改，请修改cordovaConfig.js文件**

#### 附：cordova app 相关环境配置
##### 环境依赖：
- `Java_jdk@1.8.0`
- `Nodejs@12.22.7`
- `android-sdk`
- - `Build-tools 28`
- - `API 28`
- `apache-ant-1.10.12`
- 环境配置
- - *在系统变量中添加 JAVA_HOME `D:\DevTools\Java\jdk1.8.0_131`*
- - *在系统变量中添加 ANDROID_HOME  `D:\DevTools\Android\android-sdk`*
- - *在Path中添加 `%ANDROID_HOME%\tools;%ANDROID_HOME%\platform-tools;`*
- - *在系统变量中添加 ANT_HOME  `D:\DevTools\Android\apache-ant-1.10.12`*
- 安装cordova与热更新组件
- - `npm install -g cordova@11.0.0 cordova-hot-code-push-cli@1.1.1`


##### APP依赖：
- `cordova@11.0.0`
- cordova所用到的插件：
- - `cordova-plugin-android-permissions@1.1.2`
- - `cordova-plugin-splashscreen@6.0.0`
- - `cordova-plugin-whitelist@1.3.5`
- - `cordova-hot-code-push-plugin@1.5.3`
- 进入项目文件夹安装依赖
- - `npm install`
- 添加环境
- `cordova platform add android@8.1.0`
- 添加插件
- - `cordova plugin add cordova-plugin-android-permissions@1.1.2`
- - `cordova plugin add cordova-plugin-splashscreen@6.0.0`
- - `cordova plugin add cordova-plugin-whitelist@1.3.5`
- - `cordova plugin add cordova-hot-code-push-plugin@1.5.3`
- - `cordova plugin add ./GzgaCallScanface`
