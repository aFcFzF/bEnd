/**
 * @file Menu 左侧菜单 store
 * @author bEnd
 */
'use strict';
import $http from '../../utils/ajax';

let authConfig = {
    // 给首页、设置、添加插件默认添加权限，标识为'bEnd'
    bEnd: true
};

export default {
    namespaced: true,
    state: {
        // 读取同步数据
        menuList: window._pageData.menu && window._pageData.menu.pluginList || [],
        // true 有权限， false 无权限
        plugins: Object.assign({}, authConfig)
    },
    mutations: {

        /**
         * 存储菜单数据
         *
         * @param {Object} state 状态树
         * @param {Object} menuList 菜单list
         */
        setMenuList(state, menuList) {
            if (menuList && menuList.pluginList) {
                state.menuList = menuList.pluginList;
            }
        },

        // 路由权限控制，递归处理子路由
        isUse(state, params) {
            let plugins = {};
            const useHash = obj => {
                for (let item of obj) {
                    if (!item.routerName && item.list) {
                        useHash(item.list);
                    }
                    else {
                        plugins[item.routerName] = true;
                        params.app && params.app.onInstall(item.routerName);
                    }
                }
                return plugins;
            };
            if (params && params.pluginList && params.pluginList.length > 0) {
                state.plugins = Object.assign({}, authConfig, useHash(params.pluginList));
            }
        }
    },
    actions: {
        // 更新菜单
        updateMenu({commit, state, dispatch}, params) {
            let par = params || {};
            return $http.post('/plugin/menu?type=' + params.type || '', par).then(response => {
                commit('setMenuList', response.data.data);
                commit('isUse', response.data.data);
                return response.data;
            });
        },

        // 初始化菜单
        init({commit, state, dispatch}, app) {
            commit('isUse', {
                pluginList: state.menuList,
                app
            });
        }
    }
};
