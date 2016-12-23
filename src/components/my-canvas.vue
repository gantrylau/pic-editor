<template>
    <canvas id="myCanvas" height="800" width="800"></canvas>
</template>
<script>
    import {mapState} from 'vuex'
    import {mapMutations} from 'vuex'

    export default {
        data    : {
            mouseDowned: false,
            canvasState: null
        },
        mounted : function () {
            let self = this;

            this.canvasState = new createjs.Stage("myCanvas");

            this.canvasState.addEventListener('stagemouseup', function () {
                self.mouseDowned = false;
            });

            this.canvasState.addEventListener('stagemousemove', function(event) {
                if (self.currentItem && self.mouseDowned) {
                    let x       = event.stageX;
                    let y       = event.stageY;
                    let offsetX = x - self.lastPoint.x;
                    let offsetY = y - self.lastPoint.y;
                    console.log(offsetX, offsetY);
                    self.updateLastPoint({x: x, y: y});
                    self.currentItem.x += offsetX;
                    self.currentItem.y += offsetY;
                    self.canvasState.update();
                }
            });

            let circle = new createjs.Shape();
            circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
            circle.x = 100;
            circle.y = 100;
            this.initEventListener(circle);
            this.canvasState.addChild(circle);
            this.children.push(circle);

            let circle2 = new createjs.Shape();
            circle2.graphics.beginFill("red").drawCircle(0, 0, 50);
            circle2.x = 200;
            circle2.y = 200;
            this.initEventListener(circle2);

            this.canvasState.addChild(circle2);
            this.children.push(circle2);

            this.canvasState.update();
        },
        computed: mapState({
            children   : state => state.myCanvas.children,
            lastPoint  : state => state.myCanvas.lastPoint,
            draging    : state => state.myCanvas.draging,
            currentItem: state => state.myCanvas.currentItem
        }),
        methods : {
            ...mapMutations([
                'startDrag', 'stopDrag', 'updateLastPoint', 'updateCurrentItem'
            ]),
            initEventListener: function (obj) {
                let self = this;
                obj.addEventListener('mousedown', function (event) {
                    self.updateLastPoint({x: event.stageX, y: event.stageY});
                    self.updateCurrentItem(obj);
                    self.mouseDowned = true;
                });
            },
            canvasMouseUp    : function (event) {
                this.stopDrag();
            },
            canvasMouseDown  : function (event) {
                this.updateLastPoint({x: event.screenX, y: event.screenY});
//                this.startDrag();
            },
            canvasMouseMove  : function (event) {
                console.log(this.currentItem);
                if (this.currentItem && this.mouseDowned) {
                    let x       = event.screenX;
                    let y       = event.screenY;
                    let offsetX = x - this.lastPoint.x;
                    let offsetY = y - this.lastPoint.y;
                    this.updateLastPoint({x: x, y: y});
                    this.currentItem.x += offsetX;
                    this.currentItem.y += offsetY;
                    this.canvasState.update();
                }
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