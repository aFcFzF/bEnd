/**
 * @file ajax.js
 * @author bEnd
 */
import Vue from 'vue';
import axios from 'axios/dist/axios.min.js';

// 直接挂载到vue使用
Vue.prototype.$http = axios;

// 直接使用
export default axios;
