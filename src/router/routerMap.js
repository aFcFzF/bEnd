/**
 * @desc router
 * @author bEnd
 * @file routerMap
*/
import NotFound from '@/components/NotFound';

export default {
    mode: window.historyDisable ? undefined : 'history',
    base: '/',
    routes: [{
        path: '/',
        name: 'home',
        meta: {auth: 'bEnd'},
        component: () => import('../views/Home')
    },
    {
        path: '/setting',
        name: 'setting',
        meta: {auth: 'bEnd'},
        component: () => import('../views/Setting')
    },
    {
        path: '/pluginlist',
        name: 'pluginlist',
        meta: {auth: 'bEnd'},
        component: () => import('../views/Pluginlist')
    },
    {
        path: '/pluginlist/detail',
        name: 'plugindetail',
        meta: {auth: 'bEnd'},
        component: () => import('../views/PluginDetail')
    },
    {
        path: '*',
        component: NotFound,
        meta: {auth: 'bEnd'},
        name: 'NotFound'
    }
]};
