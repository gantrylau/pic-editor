import Vue from 'vue'
import VueResource from 'vue-resource'
import layout from './components/layout'
import store from './store/index';

Vue.use(VueResource);

const app = new Vue({
    store,
    // router: router,
    render: h => h(layout)
}).$mount('#app');