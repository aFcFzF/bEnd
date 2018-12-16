/**
 * @file main.js
 * @author bEnd
 */
'use strict';

// import 'babel-polyfill';
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';

import Dui from '@baidu/cambrian-dui';
import '@baidu/cambrian-dui/dist/styles/du.css';
import './assets/css/style.styl';
import './utils/ajax';
import store from './store';
import router from './router';
import config from './config';
import application from './application';
import './assets/img/favicon.ico';

// 将当前环境透传给sdk
window._isProduction = process.env.NODE_ENV === 'production';
Vue.config.productionTip = false;
Vue.use(Dui);

(async () => {
    const app = await application.register(config);
    const appStore = store.init(app.store);
    const appRouter = router.init(appStore); // 路由list
    app.router = appRouter;
    appStore.dispatch('Menu/init', app);
    Vue.prototype.bEnd = app;
    application.run({
        el: '#app',
        router: appRouter,
        store: appStore,
        template: '<App/>',
        components: {
            App
        }
    });
})();
