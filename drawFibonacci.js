var rs = new Array();
rs[0] = 0;
rs[1] = 1;
rs[2] = 2;
var Step = 10;
var beginX = 120;
var BeginY = 100;

function GetAllRadius(num) {
    for (i = 3; i < num; i++) {
        rs[i] = rs[i - 1] + rs[i - 2]
    }
}

function GetDirection(dSetting) {

}

function Draw(num, direction, Counterclockwise) {
    var drawCanvas = document.getElementById('drawCanvas');
    var drawCanvas2D = drawCanvas.getContext("2d");
    drawCanvas2D.lineWidth = 1;
    //Drawtest(drawCanvas2D);
    GetAllRadius(num);
    var bx = beginX;
    var by = BeginY;
    var ex = 0;
    var ey = 0;
    var direction = 0;
    var br = 0;
    var Reverse = -1;
    //var oldLen = 0;
    var newLen = 0;
    for (i = 1; i < num; i++) {
        newLen = rs[i] * Step;
        console.trace("rs[i]:" + rs[i] + "  len:" + newLen + "  direction:" + direction);
        br = direction % 4;
        switch (br) {
            case 0:
                ex = bx + newLen * Reverse;
                ey = by;
                DrawLine(drawCanvas2D, bx, by, ex, ey, "blue");
                DrawArc(drawCanvas2D, ex, ey, newLen, br, Reverse, "blue")
                bx = ex;
                by = ey - newLen;
                break;
            case 1:
                ey = by + newLen;
                ex = bx;
                DrawLine(drawCanvas2D, bx, by, ex, ey, "red");
                DrawArc(drawCanvas2D, ex, ey, newLen, br, Reverse, "red")
                by = ey;
                bx = ex + newLen * Reverse;
                break;
            case 2:
                ex = bx - newLen * Reverse;
                ey = by;
                DrawLine(drawCanvas2D, bx, by, ex, ey, "green");
                DrawArc(drawCanvas2D, ex, ey, newLen, br, Reverse, "green")
                bx = ex;
                by = ey + newLen;
                break;
            case 3:
                ey = by - newLen;
                ex = bx;
                DrawLine(drawCanvas2D, bx, by, ex, ey, "yellow");
                DrawArc(drawCanvas2D, ex, ey, newLen, br, Reverse, "yellow")
                by = ey;
                bx = ex - newLen * Reverse;
                break;
        }
        direction++;

    }
    drawCanvas2D.closePath();
}

function DrawLine(ctx, x0, y0, x1, y1, color) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke(); // 进行绘制
}

function DrawArc(ctx, x, y, r, br, reverse, color) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    //ctx.arc(x, y, r, (br / 2.0 - 0.5) * Math.PI, (br / 2.0 + 1) * Math.PI, reverse);
    //ctx.arc(x, y, r, (br / 2.0 + 1) * Math.PI, (br / 2.0 + 1 + 0.5) * Math.PI, (reverse != 1));
    if (reverse != 1) {
        ctx.arc(x, y, r, (1 - (br + 2.0) / 2.0) * Math.PI, (1 - (br + 2.0) / 2.0 - 0.5) * Math.PI, (reverse != 1));
    } else {
        ctx.arc(x, y, r, (br / 2.0 + 1) * Math.PI, (br / 2.0 + 1 + 0.5) * Math.PI, (reverse != 1));
    }


    //console.trace("start:" + (br / 2.0 - 0.5) + "  end:" + (br / 2.0 + 1) + "  reverse:" + reverse);
    ctx.stroke(); // 进行绘制
}

function Drawtest(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = "pink";
    ctx.arc(50, 50, 50, 0, Math.PI, true);
    ctx.stroke();
}
Draw(8, 0, false);