<template>
    <canvas id="myCanvas" height="800" width="800"></canvas>
</template>
<script>
    import {mapState} from 'vuex'
    import {mapMutations} from 'vuex'

    export default {
        data: {
            canvasState: null
        },
        mounted: function () {
            this.canvasState = new createjs.Stage("myCanvas");

            let circle = new createjs.Shape();
            circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
            circle.x = 100;
            circle.y = 100;
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
            children: state => state.myCanvas.children,
            lastPoint: state => state.myCanvas.lastPoint,
            draging: state => state.myCanvas.draging
        }),
        methods: {
            ...mapMutations([
                'startDrag', 'stopDrag', 'updateLastPoint'
            ]),
            initEventListener: function (obj) {
                let self = this;
                obj.addEventListener('mousedown', function (event) {
                    self.updateLastPoint({x: event.screenX, y: event.screenY});
                    obj._dragIn = true;
                    console.log(obj._dragIn);
                });
                obj.addEventListener('mousemove', function (event) {
                    console.log(111);
                    if (obj._dragIn) {
                        let x = event.screenX;
                        let y = event.screenY;
                        let offsetX = x - this.lastPoint.x;
                        let offsetY = y - this.lastPoint.y;
                        self.updateLastPoint({x: x, y: y});
                        obj.x += offsetX;
                        obj.y += offsetY;
                        self.canvasState.update();
                    }
                })
            },
            canvasMouseUp: function (event) {
                this.stopDrag();
            },
            canvasMouseDown: function (event) {
                this.lastPoint.x = event.screenX;
                this.lastPoint.y = event.screenY;

                this.startDrag();
            },
            canvasMouseMove: function (event) {
                if (this.draging) {
                    let x = event.screenX;
                    let y = event.screenY;
                    let offsetX = x - this.lastPoint.x;
                    let offsetY = y - this.lastPoint.y;
                    this.updateLastPoint({x: x, y: y});
                    let obj = this.children[0];
                    obj.x += offsetX;
                    obj.y += offsetY;
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