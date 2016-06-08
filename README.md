# average

> A Vue.js project

## Final version

Install muzi.apk located in apk/

(minimum android version : "5.1.1")

## Build Setup

For testing in localhost

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```

=> go to localhost:88


For building to android application, there is currently too many errors about assets (except if you take actual content of build directory), but i you want to try
``` bash
# build for production with minification
npm run build
```

Install cordova and create a new project (https://cordova.apache.org/#getstarted)
Copy all the fils in build directory to cordova www directory, then

``` bash
# add android platform
cordova platform add android

# build the apk
cordova build android
```

The generated apk will be located in platforms\android\build\outputs\apk

# average

