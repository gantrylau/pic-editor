<template>
    <canvas id="myCanvas" height="800" width="800"></canvas>
</template>
<script>
    import {mapState} from 'vuex'
    import {mapMutations} from 'vuex'
    import './ctrl-frame'

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

            preload.addEventListener("complete", this.loadCompleted);
            preload.loadFile({id: 'car', src: 'https://img.alicdn.com/imgextra/i4/92779311/TB2acZqXHplpuFjSspiXXcdfFXa-92779311.png'});

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
                let img      = event.target.getResult('car');
                let w        = img.naturalWidth;
                let h        = img.naturalHeight;
                let imgShape = new createjs.Shape();
                imgShape.graphics.beginBitmapFill(img).drawRect(0, 0, w, h).endFill();
                imgShape.setBounds(0, 0, w, h);
                let container = new createjs.CtrlFrame(imgShape);
                container.x = 300;
                container.y = 300;
                let self = this;
                container.addEventListener('pressmove', function (event) {
                    let x = event.stageX;
                    let y = event.stageY;
                    container.update && container.update(x, y);
                    self.stage.update();
                });
                this.stage.addChild(container);
                this.stage.update();
            },
            initEventListener: function (obj) {
                let self = this;
                obj.addEventListener('mousedown', function (event) {
//                    self.lastPoint.x = event.stageX;
//                    self.lastPoint.y = event.stageY;
//                    self.updateCurrentItem(obj);

//                    obj.hideCtrl();
//                    self.stage.update();
                });
                obj.addEventListener('pressmove', function (event) {
                    let x = event.stageX;
                    let y = event.stageY;
                    obj.update && obj.update(x, y);
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