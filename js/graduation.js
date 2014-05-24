// prevent scrolling
document.body.addEventListener('touchmove', function(event) {
  event.preventDefault();
}, false);
var canvas  = document.getElementById('canvas'),
    context = canvas.getContext('2d');

context.font = '38pt Arial';
context.fillStyle = 'cornflowerblue';
context.strokeStyle = 'blue';

(function(window, undefined){

    var ball = function(id, opt){

        var me = this;
        me.data = {
            obj: document.getElementById(id.replace(/^#/,'')) || null,
            support: window.DeviceOrientationEvent || null,
            left: document.getElementById(id.replace(/^#/,'')).offsetLeft || 0,
            top: document.getElementById(id.replace(/^#/,'')).offsetTop || 0,
            initX: 0,
            initY: 0,
            isAnimate: true,
            speed: 1,
            xAcc: 0.5,
            yAcc: 0.5,
            gAcc: 10, //重力加速度
            time: 0,
            dpi: 5,
            alpha: 0,
            gamma: 0,
            beta: 0
        };

        me.init();
        me.start();

    };
    ball.prototype = {


        constructor: ball,


        init: function() {
            var me = this,
                 o = me.data;

            if(o.support){
                console.log('your browser is pefer to suppot DeviceOrientationEvent');
            }else{
                alert('you need to update your browser');
            }

            o.obj.style.left = o.initX + 'px';
            o.obj.style.top = o.initY + 'px';
        },


        start: function() {

            var me = this,
                o  = me.data;

            o.isAnimate = setInterval(function(e){
                me._animate(me, e)
            }, o.dpi);

                /*
            o.isAnimate = setTimeout(function(e){
                me._animate(me, e)
            }, o.dpi);
            */

            window.addEventListener('deviceorientation', function(e){
                //me._updateData(me, e);
            }, false);

        },


        _updateData: function(me, e){

            var o = me.data;
            o.alpha = e.alpha;
            o.beta = e.beta;
            o.gamma = e.gamma;
            o.xAcc = o.gAcc * Math.sin(e.gamma);
            o.yAcc = o.gAcc * Math.sin(e.beta);
            //console.log('o.xAcc=' + o.xAcc + '  o.yAcc= ' + o.yAcc)

            me._showData();

        },


        _animate: function(me ,e){

            var o = me.data;
            var RADIUS = 10;

            //console.log(o.top)
            //console.log(o.yAcc)
            if(parseInt(o.top) <= 100 && parseInt(o.left) <= 300 && parseInt(o.top) >= 0 && parseInt(o.left) >= 0){
                o.top =  parseInt(o.top) + 0.5 * o.yAcc * o.time * o.time;
                o.left = parseInt(o.left) + 0.5 * o.xAcc * o.time * o.time;
                o.obj.style.top = o.top + 'px';
                o.obj.style.left = o.left + 'px';
                //context.fillText('hello', canvas.width/2 -150, canvas.height/2 + 150);
                context.clearRect(0, 0, canvas.width, canvas.height)
                //context.fillText('hello', o.left, o.top);
                context.beginPath();
                context.arc(o.left, o.top,
                           RADIUS, 0, Math.PI*2, true);
                context.stroke();
                //console.log(o.left, o.top)
                o.time += 0.005;
            }else{
                o.obj.style.top = '0px'
                o.obj.style.left = '0px'
                o.top = 0;
                o.left = 0;
                o.time = 0;
            }
        },
        _IsCrach: function(obj1, obj2){

        },
        _showData: function(){
            var me = this,
                 o = me.data;
            document.getElementById('alpha').innerHTML = parseInt(o.alpha);
            document.getElementById('beta').innerHTML = parseInt(o.beta);
            document.getElementById('gamma').innerHTML = parseInt(o.gamma);
        }
    }
    window.Ball = ball;

}(window));

var ball = new Ball('#guide');
