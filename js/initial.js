var game = new Game('gravity', 'canvas'),
    gravity = new GravityEngine(),
    shapes = [],
    polygonPoints = [
        [new Point(100, 0), new Point(100, 400),
        new Point(120, 400), new Point(120, 0)],

        [new Point(200, 200), new Point(200, 600),
        new Point(220, 600), new Point(220, 200)]
    ],

    polygonStrokeStyles = ['yellow'],
    polygonFillStyles = ['rgba(255, 255, 255, 0.7)'],
    ball = new Circle(30, 30, 10);

    ball.physics = {
        xSpeed : 0,
        ySpeed : 0
    };

// Loading....................................................

loading = false,  // not yet, see the end of this file
menu = document.getElementById('menu'),
btnStart = document.getElementById('btnStart'),
progressDiv = document.getElementById('progressDiv'),
progressbar = new COREHTML5.Progressbar(150, 25, 'rgba(0,0,0,0.5)', 100, 130, 250),

// use for test...............................................

ok = function (text){
    game.context.save();
    game.context.fillStyle = 'rgba(0, 0, 0, 1)';
    if (text) {
        game.context.fillText(text, 120, 40)
    }
    game.context.restore();
};

// game success
gameSuccess = function () {

    //if (ball.x >= (game.context.canvas.width - ball.radius) && ball.y == ball.radius){
    if (ball.x >= 300 && ball.y <= 15 ){
        game.togglePaused();
        ok('you win!');
    }

};

// detectCollisions
detectCollisions = function (){
    for (var i = 0; i < (shapes.length - 1); ++i) {
        shape = shapes[i];
        if(ball.collidesWith(shape)){
            ball.physics.xSpeed = -ball.physics.xSpeed;
            game.playSound('pop');
        }
    }
};

// calculate ball.............................................
calculateBall = function (ball) {

    var x = 0,
        y = 0,
        g = gravity.getGravity();

    //update speed
    ball.physics.xSpeed = ball.physics.xSpeed + g.xGravity / game.fps;
    ball.physics.ySpeed = ball.physics.ySpeed + g.yGravity / game.fps;

    x = ball.x + (ball.physics.xSpeed / game.fps) * 100;
    y = ball.y + (ball.physics.ySpeed / game.fps) * 100;

    if( y <= (game.context.canvas.height - ball.radius) && y >= ball.radius){
        ball.y = y;
    } else {
        ball.physics.ySpeed = -ball.physics.ySpeed / 2;
    }
    if( x <= (game.context.canvas.width -ball.radius)&& x >= ball.radius){
        ball.x = x;
    } else {
        ball.physics.xSpeed = -ball.physics.xSpeed / 2;
    }

};

// Paint Methods..............................................

paintBackground = function (context, x, y) {
    context.save();
    if (game.getImage('/resource/bg.jpg')) {
        context.drawImage(game.getImage('/resource/bg.jpg'), x, y)
    }
    //context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    context.restore();
};

paintHole = function (context, x, y){
    game.context.save();
    game.context.fillStyle = 'rgba(0, 255, 0, 1)'
    game.context.arc(310, ball.radius, 10, 0, Math.PI*2, false);
    game.context.fill();
    game.context.restore();
}
// Game over..................................................

over = function () {
    var highScore;
    highScores = game.getHighScores();

    if (highScores.length == 0 || score > highScores[0].score) {
        showHighScores();
    }
    else {
        gameOverToast.style.display = 'inline';
    }

    gameOver = true;
    lastScore = score;
    score = 0;
};


// Pause and Auto-pause.......................................

togglePaused = function () {
    game.togglePaused();
    pausedToast.style.display = game.paused ? 'inline' : 'none';
};

// Game Paint Methods.........................................

game.paintOverSprites = function () {
    calculateBall(ball);
    detectCollisions();
    shapes.forEach( function (shape) {
        shape.stroke(game.context);
        shape.fill(game.context);
    });
    paintHole();

    //if game success
    gameSuccess();
};

game.paintUnderSprites = function () { // Draw things other than sprites
    paintBackground(game.context, 0, 0);
};

// Initialization.............................................
for (var i=0; i < polygonPoints.length; ++i) {
    var polygon = new Polygon(),
        points = polygonPoints[i];

    polygon.strokeStyle = polygonStrokeStyles[i];
    Polygon.fillStyle = polygonFillStyles[i];

    points.forEach( function (point) {
        polygon.addPoint(point.x, point.y);
    });

    shapes.push(polygon);
}

shapes.push(ball);
// Load game..................................................

loading = true;

btnStart.onclick = function (e) {
    var interval,
         loadingPercentComplete = 0;

    e.preventDefault();

    btnStart.style.display = 'none';
    btnFork.style.display = 'none';

    //loadingMessage.style.display = 'block';
    progressDiv.style.display = 'block';

    progressDiv.appendChild(progressbar.domElement);

    game.queueImage('/images/image1.png');
    //game.queueImage('/resource/bg.jpg');

    interval = setInterval( function (e) {
        loadingPercentComplete = game.loadImages();

        if (loadingPercentComplete === 100) {
            clearInterval(interval);

            setTimeout( function (e) {
                //loadingMessage.style.display = 'none';
                progressDiv.style.display = 'none';
                menu.style.display = 'none';

                setTimeout( function (e) {
                    //loadingToastBlurb.style.display = 'none';
                    //loadingToastTitle.style.display = 'none';

                    setTimeout( function (e) {
                        //loadingToast.style.display = 'none';
                        //loseLifeToast.style.display = 'block';
                        game.playSound('pop');

                        setTimeout( function (e) {
                            loading = false;
                            score = 10;
                            //scoreToast.innerText = '10'; // won't get set till later, otherwise
                            //scoreToast.style.display = 'inline';
                            game.playSound('pop');
                            //loseLifeButton.focus();
                        }, 1000);
                    }, 500);
                }, 500);
            }, 500);
        }
        progressbar.draw(loadingPercentComplete);
        game.start();
    }, 16);
};

// Start game.................................................

