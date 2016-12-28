;(function () {
    const circleR = 5;

    class CtrlShape extends createjs.Shape {
        constructor() {
            super();
            this.sx = this.scaleX;
            this.sy = this.scaleY;

            let self = this;
            this.on('mousedown', function (event) {
                self.checkState(event.stageX, event.stageY);
                console.log(self.state);
            });
            this.on('pressmove', function (event) {
                self.update(event.stageX, event.stageY);
            })
        }

        showCtrl() {
            this._graphics = this.graphics.clone();
            this.updateCircles();
            this.drawCircles();
        }

        hideCtrl() {
            this.graphics = this._graphics;
        }

        update(x, y) {
            if (x == undefined || this.state == 'still') {
                // this.updateSelf();
                return;
            }

            if (this.state == 'translate') {
                this.x = x - this.dx;
                this.y = y - this.dy;
            } else {
                this.dx = x - this.x;
                this.dy = y - this.y;
                console.log(this.dx, this.dy);
                if (this.state == 'scale') {
                    this.scale();
                } else {
                    this.rotate();
                }
            }
            this.updateSelf();
        };

        updateSelf() {
            this.scaleX = this.sx;
            this.scaleY = this.sy;
        }

        updateCircles() {
            let row, col, halfW, halfH;
            let circles = [];
            // let bounds = this.getBounds();

            halfW = (this.width >> 1) * this.sx;
            halfH = (this.height >> 1) * this.sy;

            for (let i = 0; i < 9; i++) {
                row = Math.floor(i / 3);
                col = Math.floor(i % 3);
                circles[i] = new createjs.Point(col * halfW, row * halfH);
                console.log(circles[i])
            }

            if (this.circles) {
                this.circles.splice(0);
            }
            this.circles = circles;
        }

        drawCircles() {
            let circle = null;
            let circles = this.circles;

            this.graphics.clear();
            this.graphics = this._graphics.clone();

            let graphics = this.graphics;

            graphics.setStrokeStyle(0.5).beginStroke("#0af");//beginStroke("#444");

            graphics.drawRect(circles[0].x, circles[0].y, this.width * this.sx, this.height * this.sy);
            //
            for (let i = 0; i < this.circles.length; i++) {
                circle = circles[i];
                graphics.beginFill('white').drawCircle(circle.x, circle.y, circleR).endFill();

            }
            graphics.endStroke();
        }

        decideActiveIndex() {

            let circles = this.circles;

            let theta = this.rotation * Math.PI / 180;

            let dx = this.dx * Math.cos(-theta) - this.dy * Math.sin(-theta);
            let dy = this.dx * Math.sin(-theta) + this.dy * Math.cos(-theta);

            if (Math.abs(dx) > (this.width >> 1) * Math.abs(this.sx) + circleR || Math.abs(dy) > (this.height >> 1) * Math.abs(this.sy) + circleR) {
                this.activeIndex = -1;
            } else {
                this.activeIndex = 4;
                for (let i = 0; i < 9; i++) {
                    if (i == 4) {
                        continue;
                    }
                    if (Math.abs(dx - circles[i].x) < circleR && Math.abs(dy - circles[i].y) < circleR) {
                        this.activeIndex = i;
                        break;
                    }
                }
            }
        }

        checkState(x, y) {

            this.dx = x - this.x;
            this.dy = y - this.y;

            let circles = this.circles;

            let theta = this.rotation * Math.PI / 180;

            let dx = this.dx * Math.cos(-theta) - this.dy * Math.sin(-theta);
            let dy = this.dx * Math.sin(-theta) + this.dy * Math.cos(-theta);

            // if (Math.abs(dx) > (this.width >> 1) * Math.abs(this.sx) + circleR || Math.abs(dy) > (this.height >> 1) * Math.abs(this.sy) + circleR) {
            //     this.activeIndex = -1;
            // } else {
            //     this.activeIndex = 4;
            //     for (let i = 0; i < 9; i++) {
            //         console.log(circles[i]);
            //         if (i == 4) {
            //             continue;
            //         }
            //         if (Math.abs(dx - circles[i].x) < circleR && Math.abs(dy - circles[i].y) < circleR) {
            //             this.activeIndex = i;
            //             break;
            //         }
            //     }
            // }
            this.activeIndex = 4;
            for (let i = 0; i < 9; i++) {
                if (Math.abs(dx - circles[i].x) < circleR && Math.abs(dy - circles[i].y) < circleR) {
                    console.log(circles[i]);
                    this.activeIndex = i;
                    break;
                }
            }
            console.log(this.dx, this.dy, this.activeIndex);

            switch (this.activeIndex) {

                case 4://cyan
                    this.state = "translate";
                    break;
                case 0://red
                case 2://yellow
                case 6://purple
                case 8://lime
                case 5://blue 横向
                case 7://pink 纵向
                    this.state = "scale";
                    break;

                case 1://orange
                case 3://green
                    this.state = "rotate";
                    break;

                default:
                    this.state = "still";

            }

            return this.state;

        }

        scale() {

            let row = Math.floor(this.activeIndex / 3);
            let col = Math.floor(this.activeIndex % 3);

            let theta = this.rotation * Math.PI / 180;
            let cos = Math.cos(-theta);
            let sin = Math.sin(-theta);
            let dx = this.dx * cos - this.dy * sin;
            let dy = this.dx * sin + this.dy * cos;

            // if (col != 1) {
            //     this.sx = (dx * (col - 1) / (this.width >> 1));
            // }
            //
            // if (row != 1) {
            //     this.sy = dy * (row - 1) / (this.height >> 1);
            // }

            this.sx = dx / this.width;
            console.log(this);
            this.updateCircles();
            this.drawCircles();

        }

        rotate() {
            let delta = 0;
            if (this.activeIndex == 1) {
                delta = Math.PI * 0.5 * (this.sy < 0 ? -1 : 1);
            } else {
                delta = Math.PI * (this.sx < 0 ? 0 : 1);
            }
            let theta = Math.atan2(this.dy, this.dx) + delta;
            this.rotation = theta * 180 / Math.PI;
        };

    }

    createjs.CtrlShape = CtrlShape;
})();