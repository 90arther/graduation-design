function getGravity(e) {
    var gamma = e.gamma || 0,
        beta = e.beta || 0,
        alpha = e.alpha || 0,
        xGravity,
        yGravity,
        GRAVITY = 9.81;

    if (parseInt(gamma) >= -90 && parseInt(gamma) <= 90) {
        xGravity = GRAVITY * Math.sin(gamma);
    }else{
        xGravity = 0;
    }

    if (parseInt(beta) >= -90 && parseInt(beta) <=90) {
        yGravity = GRAVITY * Math.sin(beta);
    }else{
        yGravity = 0;
    }

    return {
        'xGravity': xGravity,
        'yGravity': yGravity
    }
}
