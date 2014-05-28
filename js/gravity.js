/*
 * GravityEngine
 * author: 90arther
 * last-modifyed: 2014-05-28
 */
(function(window,undefined) {

    var gravityEngine = function(){

        var self = this;

        self.init();
        self.start();

    };


    gravityEngine.prototype = {

        constructor: gravityEngine,

        init: function() {

            var self = this;
            self.data = {
                gamma: 0,   // gamma is the left-to-right tilt in degrees, where right is positive
                beta: 0,    // beta is the front-to-back tilt in degrees, where front is positive
                alpha: 0,   // alpha is the compass direction the device is facing in degrees
                GRAVITY: 9.81,
                xGravity: 0,
                yGravity: 0
            };

        },

        start: function() {

            var self = this,
                o = self.data;

            if (window.DeviceOrientationEvent) {
                // Listen for the deviceorientation event and handle the raw data
                window.addEventListener('deviceorientation', function(eventData) {
                    self.updateGravity(self, eventData.gamma, eventData.beta, eventData.alpha);
                }, false);
            } else {
                console.log("Not supported.");
            }
        },

        updateGravity: function(self, gamma, beta, alpha) {

            o = self.data;
            // gamma is the left-to-right tilt in degrees, where right is positive
            o.gamma = gamma;

            // beta is the front-to-back tilt in degrees, where front is positive
            o.beta = beta;

            // alpha is the compass direction the device is facing in degrees
            o.alpha = alpha

        },

        getGravity: function() {

            var self = this,
                o = self.data;

            o.xGravity = o.GRAVITY * Math.sin(o.gamma);
            o.yGravity = o.GRAVITY * Math.sin(o.beta);

            return o.gamma;

            return {
                xGravity: o.xGravity,
                yGravity: o.yGravity
            }
        }
    };
    window.GravityEngine = gravityEngine;

}(window));
