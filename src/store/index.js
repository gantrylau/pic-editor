import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'
import * as mutations from './mutations'

import myCanvas from './modules/my-canvas'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        menus: []
    },
    modules: {
        myCanvas
    },
    actions,
    mutations
});