var rs = new Array();
rs[0] = 0;
rs[1] = 1;
rs[2] = 2;
var Step = 10;
var beginX = 100;
var BeginY = 100;

function GetAllRadius(num) {
    for (i = 3; i < num; i++) {
        rs[i] = rs[i - 1] + rs[i - 2]
    }
}

function GatDirection(dSetting) {

}

function Draw(num) {
    var cvs = document.getElementById('drawCanvas');
    var cvs2d = cvs.getContext("2d");
    cvs2d.lineWidth = 1;
    GetAllRadius(num);
    var bx = beginX;
    var by = BeginY;
    var ex = 0;
    var ey = 0;
    var direction = 0;
    var br = 0;
    //var oldLen = 0;
    var newLen = 0;
    for (i = 1; i < num; i++) {
        newLen = rs[i] * Step;
        console.trace("rs[i]:" + rs[i] + "  len:" + newLen + "  direction:" + direction);
        br = direction % 4;
        switch (br) {
            case 0:
                ex = bx + newLen;
                ey = by;
                DrawLine(cvs2d, bx, by, ex, ey, "blue");
                DrawArc(cvs2d, ex, ey, newLen, br, "blue")
                bx = ex;
                by = ey - newLen;
                break;
            case 1:
                ey = by + newLen;
                ex = bx;
                DrawLine(cvs2d, bx, by, ex, ey, "red");
                DrawArc(cvs2d, ex, ey, newLen, br, "red")
                by = ey;
                bx = ex + newLen;
                break;
            case 2:
                ex = bx - newLen;
                ey = by;
                DrawLine(cvs2d, bx, by, ex, ey, "green");
                DrawArc(cvs2d, ex, ey, newLen, br, "green")
                bx = ex;
                by = ey + newLen;
                break;
            case 3:
                ey = by - newLen;
                ex = bx;
                DrawLine(cvs2d, bx, by, ex, ey, "yellow");
                DrawArc(cvs2d, ex, ey, newLen, br, "yellow")
                by = ey;
                bx = ex - newLen;
                break;
        }
        direction++;

    }
    cvs2d.closePath();
}

function DrawLine(ctx, x0, y0, x1, y1, color) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke(); // 进行绘制
}

function DrawArc(ctx, x, y, r, br, color) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.arc(x, y, r, (br / 2.0 - 0.5) * Math.PI, (br / 2.0 + 1) * Math.PI, true);
    ctx.stroke(); // 进行绘制
}
Draw(8);