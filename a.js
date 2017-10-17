var cicleLineCanvas = function(obj) {
    this.InitObj = obj || {};
    let f = [],
        speedX = [],
        speedY = [],
        circle = [],
        lineArr = [];
    let n = this.InitObj.n || 10;
    let id = this.InitObj.id || "cicleLineCanva";
    let color = this.InitObj.color || "#696969";
    let lineLength = 300;
    let canvasWidth = document.body.clientWidth,
        canvasHeight = document.body.clientHeight;
    initCanvas = function(argument) {
        var myCanvas = document.createElement("canvas");
        myCanvas.setAttribute("width", canvasWidth);
        myCanvas.setAttribute("height", canvasHeight);
        myCanvas.setAttribute("id", argument);
        document.body.appendChild(myCanvas);
    };
    Init = function(argument) {
        let i, j, line;
        for (i = 0; i < n; i++) {
            let cir = new createjs.Shape();
            cir.graphics.beginFill("#e3e3e3").drawCircle(0, 0, Math.random() * 15); //半径颜色设置
            cir.x = Math.random() * canvasWidth;
            cir.y = Math.random() * canvasHeight; //设置位置
            speedX.push(Math.random() );
            speedY.push(Math.random() );
            stage.addChild(cir);
            circle.push(cir);
            if (Math.random() > 0.5)
                f.push(true);
            else
                f.push(false);

            for (j = 0; j < i; j++) {
                let cToLX = circle[i].x - circle[j].x;
                let cToLY = circle[i].y - circle[j].y;
                let opa = 1 - (Math.sqrt(cToLX*cToLX + cToLY*cToLY)/lineLength).toFixed(2);
                if (Math.sqrt(cToLX*cToLX + cToLY*cToLY) < lineLength) {
                    line = new createjs.Shape();
                    line.graphics.s("rgba(180,180,180,"+opa+")").ss(0.5).mt(circle[i].x, circle[i].y).lt(circle[j].x, circle[j].y).es();
                    stage.addChild(line);
                    lineArr.push(line);
                }
            }
        }
        stage.update();

    };
    handleTick = function(argument) {
        let i, j, k = 0, line;
        for (j = 0; j < lineArr.length; j++) {
            stage.removeChild(lineArr[j]);
        }
        lineArr=[];
        for (i = 0; i < n; i++) {
            if ((circle[i].x - stage.canvas.width < 2 && circle[i].x - stage.canvas.width > 0) ||
                (circle[i].y - stage.canvas.height < 2 && circle[i].y - stage.canvas.height > 0)) { f[i] = false; }
            if (circle[i].x - 0 < 2 || circle[i].y - 0 < 2) { f[i] = true; }
            if (f[i]) {
                circle[i].x += speedX[i];
                circle[i].y += speedY[i];
            } else {
                circle[i].x -= speedX[i];
                circle[i].y -= speedY[i];
            }
            for (j = 0; j < i; j++) {
                let cToLX = circle[i].x - circle[j].x;
                let cToLY = circle[i].y - circle[j].y;
                let opa = 1 - (Math.sqrt(cToLX*cToLX + cToLY*cToLY)/lineLength).toFixed(2);
                if (Math.sqrt(cToLX*cToLX + cToLY*cToLY) < lineLength) {
                    line = new createjs.Shape();
                    line.graphics.s("rgba(180,180,180,"+opa+")").ss(0.5).mt(circle[i].x, circle[i].y).lt(circle[j].x, circle[j].y).es();
                    stage.addChild(line);
                    lineArr.push(line);
                }
            }
        }
        stage.update();
    };
    initCanvas(id); //通过js写入canvas
    stage = new createjs.Stage(id);
    Init(50);
    createjs.Ticker.addEventListener("tick", handleTick);
};