class CtrlFrame extends createjs.Shape {

    constructor(bindObject) {
        super();
        createjs.Shape.call(this);

        // this.bindObject = bindObject;

        let bounds = bindObject.getBounds();

        console.log(this);

        this.setBounds(bounds.x, bounds.y, bounds.width, bounds.height);

        this.x=bindObject.x;
        this.y=bindObject.y;
        this.sx=bindObject.scaleX;
        this.sy=bindObject.scaleY;
        this.rotation=bindObject.rotation;

        // console.log(bindObject.graphics);

        // bindObject.graphics.beginStroke('gray').drawRect(0, 0, 100, 100);
        // createjs.Shape.call(this);
        this.updateCircles();
        this.drawCircles();
    }

    updateCircles() {
        let row, col, halfW, halfH;
        let circles = [];
        let bounds = this.getBounds();

        halfW = (bounds.width >> 1) * this.sx;
        halfH = (bounds.height >> 1) * this.sy;

        console.log(halfH, halfW);

        for (let i = 0; i < 9; i++) {
            row = Math.floor(i / 3);
            col = Math.floor(i % 3);
            circles[i] = new createjs.Point((col - 1) * halfW, (row - 1) * halfH);
        }

        if (this.circles) {
            this.circles.splice(0);
        }
        this.circles = circles;
    }

    drawCircles() {
        let circle = null;
        let circles = this.circles;
        // let colors = ["red", "orange", "yellow", "green", "cyan", "blue", "purple", "pink", "lime"];

        let graphics = this.graphics;

        graphics.clear().setStrokeStyle(0.5).beginStroke("#0af");//beginStroke("#444");

        /*graphics.moveTo(circles[0].x,circles[0].y);
         graphics.lineTo(circles[2].x,circles[2].y);
         graphics.lineTo(circles[8].x,circles[8].y);
         graphics.lineTo(circles[6].x,circles[6].y);
         graphics.lineTo(circles[0].x,circles[0].y);*/
        graphics.drawRect(circles[0].x, circles[0].y, circles[8].x << 1, circles[8].y << 1);

        for (let i = 0; i < this.circles.length; i++) {
            /*if(i==4){
             continue;
             }*/
            circle = circles[i];
            console.log(circle);
            graphics.beginFill('white').drawCircle(circle.x, circle.y, 5).endFill();

        }

        graphics.endStroke();
    }
}
// createjs.extend(CtrlFrame, createjs.DisplayObject);

createjs.CtrlFrame = CtrlFrame;