;(function () {
    class CtrlFrame extends createjs.Container {
        constructor(entity) {
            super();
            this._entity = entity;  //对象实体
            let ctrl     = this._ctrl = new createjs.Shape(); //控制框

            this._circleSize = 5;

            let bounds = entity.getBounds();

            this.setBounds(bounds.x, bounds.y, bounds.width, bounds.height);

            this.addChild(entity);
            this.addChild(ctrl);
            console.log(entity);
            this.drawCtrl();

            let self = this;
            this.on('mousedown', function (event) {
                self.checkState(event.stageX, event.stageY);
            })
        }

        drawCtrl() {
            let circleSize = this._circleSize;
            let row, col, halfW, halfH;
            let circles    = [];
            let entity     = this._entity;
            let bounds     = entity.getBounds();

            // halfW = (bounds.width >> 1) * entity.scaleX;
            // halfH = (bounds.height >> 1) * entity.scaleY;

            halfW = bounds.width / 2;
            halfH = bounds.height / 2;

            for (let i = 0; i < 9; i++) {
                row        = Math.floor(i / 3);
                col        = Math.floor(i % 3);
                circles[i] = new createjs.Point(col * (bounds.x + halfW), row * (bounds.y + halfH));
                console.log(circles[i]);
            }
            if (this.circles) {
                this.circles.splice(0);
            }
            this.circles = circles;

            let graphics = this._ctrl.graphics;
            graphics.clear();

            graphics.setStrokeStyle(0.5).beginStroke("#0af");//beginStroke("#444");

            graphics.drawRect(circles[0].x, circles[0].y, bounds.width, bounds.height);
            let circle = null;
            for (let i = 0; i < this.circles.length; i++) {
                circle = circles[i];
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
                this.dx = x - this.x;
                this.dy = y - this.y;
                if (this.state == 'scale') {
                    this.scale();
                } else {
                    this.rotate();
                }
            }
            this.updateSelf();
        };

        updateSelf() {
            // this.scaleX = this.sx;
            // this.scaleY = this.sy;
        }

        checkState(x, y) {
            let circleSize = this._circleSize;
            let bounds     = this._entity.getBounds();

            this.dx = x - this.x;
            this.dy = y - this.y;

            console.log(this.dx, this.dy);

            let circles = this.circles;

            let theta = this.rotation * Math.PI / 180;

            let dx = this.dx * Math.cos(-theta) - this.dy * Math.sin(-theta);
            let dy = this.dx * Math.sin(-theta) + this.dy * Math.cos(-theta);

            this.activeIndex = 4;
            for (let i = 0; i < 9; i++) {
                if (i == 4) {
                    continue;
                }
                if (Math.abs(dx - circles[i].x) < circleSize && Math.abs(dy - circles[i].y) < circleSize) {
                    this.activeIndex = i;
                    break;
                }
            }

            switch (this.activeIndex) {

                case 4:
                    this.state = "translate";
                    break;
                case 0:
                case 1:
                case 2:
                case 6:
                case 8:
                case 5:
                case 7:
                    this.state = "scale";
                    break;
                case 3:
                    this.state = "rotate";
                    break;
                default:
                    this.state = "still";

            }

            console.log(this.state);

            return this.state;

        }

    }
    createjs.CtrlFrame = CtrlFrame;
})();