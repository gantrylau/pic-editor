/**
 * Created by gantrylau on 2016/12/22.
 */
const state = {
    children: [],
    lastPoint: {
        x: null,
        y: null
    },
    draging: false
};

const mutations = {
    startDrag: function (state) {
        state.draging = true;
    },
    stopDrag: function (state) {
        state.draging = false;
    },
    updateLastPoint: function (state, point) {
        state.lastPoint.x = point.x;
        state.lastPoint.y = point.y;
    }
};

export default {
    state,
    mutations
}