/**
 * @file store
 * @author bEnd
 */
'use strict';
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const config = {
    state: {
        layout: {
            header: true,
            footer: true,
            sidebar: true
        },
        loading: true
    },
    mutations: {
        layout(state, option) {
            /* eslint-disable fecs-use-for-of,guard-for-in */
            for (let k in option) {
                state.layout[k] = option[k];
            }
            /* eslint-enable fecs-use-for-of,guard-for-in */
        },

        setLoading(state, status) {
            state.loading = status;
        }
    }
};

export default {
    init(modules) {
        config.modules = modules || [];
        return new Vuex.Store(config);
    }
};
