import Vue from 'vue';
import store from './store';
import router from './router';
import App from './App';
import '@/plugins';
import './element-variables.scss';

import echarts from 'echarts';
import Message from './utils/Message';
import RequestControl from './utils/RequestControl';
import Utiles from './utils/Utiles';
import Auth from './utils/Auth';

Vue.config.productionTip = false;
// // 添加实例方法
Vue.prototype.$Message = Message;
Vue.prototype.$RequestControl = RequestControl;
Vue.prototype.$Router = router;
Vue.prototype.$Utils = Utiles;
Vue.prototype.$Auth = Auth;
Vue.prototype.$echarts = echarts;
new Vue({
    el: '#app',
    store,
    router: router,
    render: h => h(App)
});
