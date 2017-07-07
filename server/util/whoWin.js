function battle (p1, p2) {
    var total,
        metrica,
        porcA, porcB,
        randomNumber,
        winner,
        loser;

    function between(x, min, max) {
        return x >= min && x <= max;
    }

    total = p1.nivel + p2.nivel;
    metrica = 100/total;

    porcA = metrica * p1.nivel;
    porcB = metrica * p2.nivel;

    randomNumber = Math.floor(Math.random() * 100) + 1;

    if (porcA > porcB) {
        if (between(randomNumber, 0, porcB)) {
            winner = p2;
            loser = p1;
        } else {
            winner = p1;
            loser = p2;
        }

    } else {
        if (between(randomNumber, 0, porcA)) {
            winner = p1;
            loser = p2;
        } else {
            winner = p2;
            loser = p1;
        }
    }

    return {
        winner : winner,
        loser : loser
    };
}
module.exports = battle;