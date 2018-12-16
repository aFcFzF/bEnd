/**
 * @file router index
 * @author bEnd
 */
import Vue from 'vue';
import Router from 'vue-router';
import Dui from '@baidu/cambrian-dui';
import routerMap from './routerMap';

Vue.use(Router);

const instanceAfter = (router, store) => {
    router.beforeEach((to, from, next) => {
        Dui.LoadingBar.start();
        let plugins = store.state.Menu.plugins;
        // 路由&权限merge
        if (plugins && !plugins[to.meta.auth] && to.name !== 'NotFound') {
            next({path: '/'});
        }
        next();
    });

    router.afterEach((route, from) => {
        if (store.state.loading === true) {
            Dui.LoadingBar.finish();
        }
    });

};

export default {
    init(store) {
        const router = new Router(routerMap);
        instanceAfter(router, store);
        return router;
    }
};
