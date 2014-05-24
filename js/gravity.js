function getGravity(e) {
    var gamma = 0,
        beta = 0,
        alpha = 0,
        xGravity,
        yGravity,
        GRAVITY = 9.81;

    gamma = e.gamma;
    beta = e.beta;

    if (gamma >= -90 && gamma <= 90) {
        xGravity = GRAVITY * Math.sin(gamma);
    }else{
        xGravity = 0;
    }

    if (beta >= -90 && beta <=90) {
        yGravity = GRAVITY * Math.sin(beta);
    }else{
        yGravity = 0;
    }

    return {
        'xGravity': xGravity,
        'yGravity': yGravity
    }
}
