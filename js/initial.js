var game = new Game('gravity', 'gameCanvas');

var physics = {
    t : 0,
    GRAVITY: 9.81,
    speed : 0,
    x : 0,
    y : 0
}
var lastTime = 0;

function calculateFps() {
    var now = (+new Date),
        fps = 1000 / (now -lastTime);

    lastTime = now;

    return fps;
}
game.startAnimate = function () {
    var self = this;
    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', function (eventDate){
            game.gravityDate = getGravity(eventDate);
        });
    }
};
game.paintUnderSprites = function () {

    var image = new Image();
    image.src = 'https://raw.githubusercontent.com/90arther/graduation-design/feature-gravity/resource/bg1.jpg';
    this.context.drawImage(image, 0, 0)
    this.context.lineWidth = 20;
    this.context.fillStyle = "#f9e6ab";
    //this.context.fillRect(0, 0, 320, 480);
    this.context.strokeStyle = "#e4a251";
    //this.context.strokeRect(0, 0, 320, 480);

};
game.paintOverSprites = function () {
    //var gravity = window.getGravity;
    if (physics.y > (this.context.canvas.height - 50)) {
        physics.y = 0;
        physics.t = 0;
    }else{
        physics.y = physics.y + physics.t * physics.GRAVITY;
        physics.t = physics.t + 0.1;
    }
    this.context.beginPath();
    this.context.arc(20, physics.y,
               5, 0, Math.PI*2, true);
    this.context.stroke();
    this.context.fillStyle = 'cornflowerblue';
    if (this.debug === true) {
        this.context.fillText(calculateFps().toFixed()  + 'fps', 280, 20);
    }
    this.context.fillText('gamma='+this.gamma, 40, 60);
    this.context.fillText('beta='+this.beta, 40, 80);
    this.context.fillText('alpha='+this.alpha, 40, 100);
    //this.context.fillText('xGravity=' + this.gravityDate.xGravity, 40, 120);
    //this.context.fillText('yGravity=' + this.gravityDate.yGravity, 40, 140);
    //this.context.fillText('xGravity=' + physics.GRAVITY * Math.sin(game.gamma), 40, 120);
    //this.context.fillText('yGravity=' + physics.GRAVITY * Math.sin(game.beta), 40, 140);
};
game.endAnimate = function () {};
game.start();
