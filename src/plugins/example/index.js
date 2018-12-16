/**
* @file bEnd组件入口文件
* @author bEnd
* @desc 假设开发的组件名称为example，请按照以下要求创建“index.js”文件放到组件根目录
*/

// 有第三方接入的采用sdk形式，Fork地址https://github.com/BearFE/bend-sdk
// import Plguin from 'bend-sdk';

// 未有第三方接入的可以采用直接引入的方式
import Plguin from '@/interface';
// 如果有权限控制的话，这里可以引入SDK的getAccount判断权限是否可以调用本插件

const routes = [{
    // 一级path要求与提交的插件名称同名
    path: '/example',

    // 要求与提交的插件名称同名，插件唯一命名空间
    name: 'example',

    // 组件权限控制，二级path唯一权限标识
    meta: {auth: 'example'},

    // vue组件入口
    component: () => import('./views/index')
},
{
    // more path
    path: '/example/detail',

    // 二级name，保持与path相同，以免重名
    name: 'example/detail',

    // 组件权限控制，依赖一级路由auth
    meta: {auth: 'example'},

    // vue组件入口
    component: () => import('./components/detail')
}];


// 有第三方接入的采用sdk形式，Fork地址https://github.com/BearFE/bend-sdk
// export default class example extends bEndSDk.Plugin
export default class example extends Plguin {

    /**
    * 安装前钩子，如果有特殊的权限要求，可以在这里返回信息，没有的话可以省略
    *
    * @return {Object} plguinInfo 根据业务需要返回相应的信息
    */
    beforeInstall() {
        return {
            plguinInfo: 'plguinInfo'
            // ... code
        };
    }

    /**
    * 安装钩子，动态添加当前组件router
    *
    * @param {Object} router 当前app router，也可以直接使用this.$app.router
    */
    onInstall(router) {
        Array.prototype.push.apply(router.options.routes, routes);
        router.addRoutes(routes);
    }
}
