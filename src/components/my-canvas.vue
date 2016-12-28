<template>
    <div>
        <canvas id="myCanvas" height="800" width="800"></canvas>
        <button @click="toPic()">to</button>
        <a :src="testSrc">ssss</a>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    import {mapMutations} from 'vuex'
    import './ctrl-shape'

    export default {
        data() {
            return {
                lastPoint: {
                    x: null,
                    y: null
                },
                testSrc:null,
                mouseDowned: false
            }
        },
        mounted: function () {

            this.createStage('myCanvas');

            let preload = new createjs.LoadQueue(true, null, true);

            preload.on('complete', this.loadCompleted);
//            preload.loadFile({id: 'test', src: 'http://cdn-img.easyicon.net/png/5342/534223.gif'});
            preload.loadFile({
                id: 'test',
                src: 'https://img.alicdn.com/imgextra/i4/92779311/TB2acZqXHplpuFjSspiXXcdfFXa-92779311.png'
            });

//            let item = new createjs.LoadItem().set({src: "http://cdn-img.easyicon.net/png/5342/534223.gif", crossOrigin: true});

//            preload.load(item);
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
            stage: state => state.myCanvas.stage,
            children: state => state.myCanvas.children,
            currentItem: state => state.myCanvas.currentItem
        }),
        methods: {
            ...mapMutations([
                'createStage', 'startDrag', 'stopDrag', 'updateLastPoint', 'updateCurrentItem'
            ]),
            toPic:function() {
                let u = document.getElementById('myCanvas').toDataURL();
                let self = this;
                function base64Img2Blob(code){
                    var parts = code.split(';base64,');
                    var contentType = parts[0].split(':')[1];
                    var raw = window.atob(parts[1]);
                    var rawLength = raw.length;

                    var uInt8Array = new Uint8Array(rawLength);

                    for (var i = 0; i < rawLength; ++i) {
                        uInt8Array[i] = raw.charCodeAt(i);
                    }

                    return new Blob([uInt8Array], {type: contentType});
                }
                function downloadFile(fileName, content){

                    var aLink = document.createElement('a');
                    var blob = base64Img2Blob(content); //new Blob([content]);

                    var evt = document.createEvent("HTMLEvents");
                    evt.initEvent("click", false, false);//initEvent 不加后两个参数在FF下会报错
                    aLink.download = fileName;
                    aLink.href = URL.createObjectURL(blob)+'.png';

                    aLink.dispatchEvent(evt);

                    self.testSrc = URL.createObjectURL(blob);
                }
                downloadFile('test.png', u);
            },
            loadCompleted: function (event) {
                let img = event.target.getResult('test');
                let imgShape = new createjs.CtrlShape();
                let w = img.naturalWidth;
                let h = img.naturalHeight;
                imgShape.graphics.beginBitmapFill(img).drawRect(0, 0, w, h).endFill();
                imgShape.width = w;
                imgShape.height = h;
                imgShape.x = 200;
                imgShape.y = 200;
                this.initEventListener(imgShape);
                imgShape.showCtrl();
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