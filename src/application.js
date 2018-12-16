/**
 * @file application core
 * @author bEnd
 * @update 2018.08.24
 */
'use strict';

import Vue from 'vue';
import store from './store/modules/StoreList';
import Events from 'events';

// 继承events，方便使用监听器，插件与app之间通信
class Application extends Events {
    constructor() {
        super();
        // app router
        this.router = null;

        // app store
        this.store = store;

        // 插件集
        this.plugins = {};

        // 通用通信消息存储，如通用权限、基础信息等
        this.info = {};
    }

    /**
     * 插件异步注册（插件入口文件，router未调用），插件实例化及插件store初始化
     *
     * @param {Object} plugins 插件list
     * @return {Promise} promise 对象
     */
    register(plugins) {
        const keys = Object.keys(plugins);
        return Promise.all(keys).then(items => {
            items.forEach(item => {
                // 插件实例化，挂载到application.plugins
                this.plugins[item] = new plugins[item](this);

                // 读取插件store
                const pluginStore = this.plugins[item].store();

                // 插件store挂载到application.store
                if (pluginStore && Object.prototype.toString.call(pluginStore) === '[object Object]') {
                    Object.assign(this.store, pluginStore);
                }
            });
            return this;
        });
    }

    /**
     * 插件导航，插件安装前钩子
     *
     * @param {string} plugin 插件名称
     * @return {Promise} promise 对象
     */
    beforeInstall(plugin) {
        // 判断是否一站式内部组件，如登录、注册等非插件页面；主要是已经安装插件，会提前安装路由
        if (!this.plugins[plugin]) {
            return false;
        }
        return Promise.resolve(this.plugins[plugin].beforeInstall(this.router));
    }

    /**
     * 插件导航，插件安装钩子
     *
     * @param {string} plugin 插件名称
     * @return {Promise} promise 对象
     */
    onInstall(plugin) {
        // 判断是否一站式内部组件，如登录、注册等非插件页面；主要是已经安装插件，会提前安装路由
        if (!this.plugins[plugin]) {
            return false;
        }
        return Promise.resolve(this.plugins[plugin].onInstall(this.router));
        // 事件预留，用于日志、统计等
        // this.emit('getUserInfo', {plugin: 'abc'});
        // return res;
    }
    // 插件导航，插件安装完钩子
    afterInstall(plugin) {
        return Promise.resolve(this.plugins[plugin].afterInstall());
    }

    // 插件导航，插件卸载前钩子
    beforeUnInstall(plugin) {
        return Promise.resolve(this.plugins[plugin].beforeUnInstall());
    }

    // 插件导航，插件卸载钩子
    unInstall(plugin) {
        return Promise.resolve(this.plugins[plugin].beforeUnInstall());
    }

    // 插件导航，插件卸载后钩子
    afterUnInstall(plugin) {
        return Promise.resolve(this.plugins[plugin].afterUnInstall());
    }

    // 创建vue实例
    run(vueConfig) {
        new Vue(vueConfig);
    }
}

export default new Application();
