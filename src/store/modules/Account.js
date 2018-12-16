/**
 * @file Account.js
 * @desc 用户账号信息
 * @author bEnd
 */
'use strict';
let pageData = window._pageData || {};

export default {
    namespaced: true,
    state: {
        userInfo: pageData.userInfo || {}
    },
    mutations: {

        /**
         * 设置帐号信息
         *
         * @param {Object} state 状态树
         * @param {Object} option userInfo  用户信息
         */
        userInfo(state, option) {
            /* eslint-disable fecs-use-for-of,guard-for-in */
            for (let k in option) {
            /* eslint-enable fecs-use-for-of,guard-for-in */
                state.userInfo[k] = option[k];
            }
        }
    }
};
