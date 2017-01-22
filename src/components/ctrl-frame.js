;(function () {
    /**
     * point(dx,dy)：鼠标点击的相对位置
     */
    class CtrlFrame extends createjs.Container {
        constructor(entity) {
            super();
            this.initFrame(entity);

            let ctrl = this._ctrl = new createjs.Shape(); //控制框

            this._circleSize = 5;


            this.addChild(entity);
            this.addChild(ctrl);
            // console.log(entity);
            this.drawCtrl();

            // console.log(this._sx, this._sy);

            // this.rotation = 90;

            let self = this;
            this.on('mousedown', function (event) {
                self.checkState(event.stageX, event.stageY);
            })
        }

        initFrame(entity) {
            this._entity = entity;  //对象实体
            let bounds   = entity.getBounds();
            this.setBounds(bounds.x, bounds.y, bounds.width, bounds.height);
            this._sx     = entity.scaleX || 1;
            this._sy     = entity.scaleY || 1;
            this._width  = bounds.width;
            this._height = bounds.height;
            //初始旋转角
            // this.rotation = 90 || 0;
            this.regX = this._width * this._sx / 2;
            this.regY = this._height * this._sy / 2;
        }

        getWidth() {
            return this._width * this._sx;
        }

        getHeight() {
            return this._height * this._sy;
        }

        drawCtrl() {
            let circleSize = this._circleSize;
            let row, col, halfW, halfH;
            let circles    = [];
            let entity     = this._entity;
            let bounds     = entity.getBounds();

            let width  = this.getWidth();
            let height = this.getHeight();

            halfW = width / 2;
            halfH = height / 2;

            // this._ctrl.regX = halfW;
            // this._ctrl.regY = halfH;

            for (let i = 0; i < 9; i++) {
                row        = Math.floor(i / 3);
                col        = Math.floor(i % 3);
                circles[i] = new createjs.Point(col * halfW, row * halfH);

            }
            if (this.circles) {
                this.circles.splice(0);
            }
            this.circles = circles;

            let graphics = this._ctrl.graphics;
            graphics.clear();

            graphics.setStrokeStyle(0.5).beginStroke('#0af');

            graphics.drawRect(circles[0].x, circles[0].y, width, height);
            let circle = null;
            for (let i = 0; i < this.circles.length; i++) {
                circle = circles[i];
                console.log(circle);
                graphics.beginFill('white').drawCircle(circle.x, circle.y, circleSize).endFill();
            }
            graphics.endStroke();
        }

        update(x, y) {
            if (x == undefined || this.state == 'still') {
                this.updateSelf();
                return;
            }

            if (this.state == 'translate') {
                this.x = x - this.dx;
                this.y = y - this.dy;
            } else {
                this.offsetX = x - this.x;
                this.offsetY = y - this.y;

                if (this.state == 'scale') {
                    this.scale();
                } else {
                    this.rotate();
                }
            }
            this.updateSelf();
        };

        updateSelf() {
            let entity      = this._entity;
            entity.scaleX   = this._sx || 1;
            entity.scaleY   = this._sy || 1;
            entity.rotation = this._rotation;


            this.regX = this.getWidth() >> 1;
            this.regY = this.getHeight() >> 1;

            this.drawCtrl();
        }

        scale() {
            // switch (this.activeIndex) {
            //     case 0 :
            //         break;
            //     case 1:
            //
            //         break;
            //     case 2:
            //         break;
            //     case 3:
            //         break;
            //     case 4:
            //         break;
            //     case 5:
            //         break;
            //     case 6:
            //         break;
            //     case 7:
            //         break;
            //     case 8:
            //         break;
            //     default:
            //         break;
            // }
            // let bounds = this.getBounds();
            //
            // let row = Math.floor(this.activeIndex / 3);
            // let col = Math.floor(this.activeIndex % 3);
            let theta = this.rotation * Math.PI / 180;

            let cos = Math.cos(-theta);
            let sin = Math.sin(-theta);

            let offsetX = Math.round(this.offsetX * cos - this.offsetY * sin);
            let offsetY = Math.round(this.offsetX * sin + this.offsetY * cos);

            if (this.activeIndex == 1 || this.activeIndex == 7) {
                this._sy = Math.abs(offsetY) / (this._height / 2);
            }

            if (this.activeIndex == 3 || this.activeIndex == 5) {
                this._sx = Math.abs(offsetX) / (this._width / 2);
            }

            if (this.activeIndex == 0 || this.activeIndex == 2 || this.activeIndex == 6 || this.activeIndex == 8) {
                // this._sx = Math.abs(offsetX) / (this._width / 2);
                // this._sy = Math.abs(offsetY) / (this._height / 2);

                let theta     = Math.atan2(this.offsetY, this.offsetX);
                this.rotation = (theta * 180 / Math.PI) - this.offsetRotation;
            }
        };

        rotate() {
            let delta = 0;

            if (this.activeIndex == 1) {
                delta = Math.PI * 0.5 * (this.sy < 0 ? -1 : 1);
            } else {
                delta = Math.PI * (this.sx < 0 ? 0 : 1);
            }
            let theta     = Math.atan2(this.dy, this.dx) + delta;
            this.rotation = theta * 180 / Math.PI;
        }

        checkState(x, y) {
            let circleSize = this._circleSize;
            this.dx        = x - this.x;
            this.dy        = y - this.y;

            let theta = this.rotation * Math.PI / 180;
            let dx    = Math.round(this.dx * Math.cos(-theta) - this.dy * Math.sin(-theta));
            let dy    = Math.round(this.dx * Math.sin(-theta) + this.dy * Math.cos(-theta));


            let offSetTheta     = Math.atan2(this.dy, this.dx);   //角度偏移量
            this.offsetRotation = offSetTheta * 180 / Math.PI - this.rotation;

            let circles = this.circles;

            let halfW = this.getWidth() >> 1;
            let halfH = this.getHeight() >> 1;

            this.activeIndex = 4;
            for (let i = 0; i < 9; i++) {
                if (i == 4) {
                    continue;
                }
                if (Math.abs(dx - circles[i].x + halfW) <= circleSize && Math.abs(dy - circles[i].y + halfH) <= circleSize) {
                    this.activeIndex = i;
                    break;
                }
            }

            switch (this.activeIndex) {

                case 4:
                    this.state = 'translate';
                    break;
                case 0:
                case 1:
                case 2:
                case 3:
                case 6:
                case 8:
                case 5:
                case 7:
                    this.state = 'scale';
                    break;
                default:
                    this.state = 'still';

            }
            console.log(dx, dy, this.activeIndex, this.state, this.offsetRotation);
            return this.state;

        }

    }
    createjs.CtrlFrame = CtrlFrame;
})();