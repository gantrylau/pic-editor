<template>
    <canvas id="myCanvas" height="800" width="800"></canvas>
</template>
<script>
    import {mapState} from 'vuex'
    import {mapMutations} from 'vuex'
    import './ctrl-shape'

    export default {
        data() {
            return {
                lastPoint  : {
                    x: null,
                    y: null
                },
                mouseDowned: false
            }
        },
        mounted : function () {

            this.createStage('myCanvas');

            let preload = new createjs.LoadQueue(true, null, true);

//            preload.addEventListener("complete", this.loadCompleted);
//            preload.loadFile({id: 'test', src: 'http://cdn-img.easyicon.net/png/5342/534223.gif'});

            let loadItem = new createjs.LoadItem().set({src: "http://cdn-img.easyicon.net/png/5342/534223.gif", crossOrigin: true});
//            let circle = new createjs.CtrlShape();
//            circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 100).endFill();
//            circle.width = circle.height = 200;
//            circle.x = 200;
//            circle.y = 200;
//            circle.showCtrl();
//            this.initEventListener(circle);
//            this.stage.addChild(circle);

            this.stage.update();
        },
        computed: mapState({
            stage      : state => state.myCanvas.stage,
            children   : state => state.myCanvas.children,
            currentItem: state => state.myCanvas.currentItem
        }),
        methods : {
            ...mapMutations([
                'createStage', 'startDrag', 'stopDrag', 'updateLastPoint', 'updateCurrentItem'
            ]),
            loadCompleted    : function (event) {
                let img      = event.target.getResult('test');
                let imgShape = new createjs.CtrlShape();
                imgShape.graphics.beginBitmapFill(img).drawRect(0, 0, 100, 100);
                this.stage.addChild(imgShape);
                this.stage.update();
            },
            initEventListener: function (obj) {
                let self = this;
                obj.addEventListener('mousedown', function (event) {
                    self.lastPoint.x = event.stageX;
                    self.lastPoint.y = event.stageY;
                    self.updateCurrentItem(obj);

//                    obj.hideCtrl();
//                    self.stage.update();
                });
                obj.addEventListener('pressmove', function (event) {
                    let x = event.stageX;
                    let y = event.stageY;
                    obj.update && obj.update(x, y);

//                    let offsetX = x - self.lastPoint.x;
//                    let offsetY = y - self.lastPoint.y;
//                    self.lastPoint.x = x;
//                    self.lastPoint.y = y;
//                    obj.x += offsetX;
//                    obj.y += offsetY;
                    self.stage.update();
                });
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="sass" scope>
    #myCanvas {
        border: 1px solid black;
        display: inline-block;
    }
</style>