/**
 * Created by gantrylau on 2016/12/22.
 */
const state = {
    stage: null,
    children: [],
    lastPoint: {
        x: null,
        y: null
    },
    currentItem: null,
    draging: false
};

const mutations = {
    createStage: function (state, id) {
        state.stage = new createjs.Stage(id);
        state.stage._width = state.stage.canvas.width;
        state.stage._height = state.stage.canvas.height;
        return state.stage;
    },
    startDrag: function (state) {
        state.draging = true;
    },
    stopDrag: function (state) {
        state.draging = false;
    },
    updateLastPoint: function (state, point) {
        state.lastPoint.x = point.x;
        state.lastPoint.y = point.y;
    },
    updateCurrentItem: function (state, item) {
        state.currentItem = item;
    }
};

export default {
    state,
    mutations
}