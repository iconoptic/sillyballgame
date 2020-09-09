//Further testing required to achieve maximum fall-balliness

let opening : number []
let ball: number []
let ded: number
let lastTime : number = input.runningTime()

function reset () {
    opening = [1, 3]
    ball = [5, 5]
    ded = 0
}

function newBall () {
    ball[0] = randint(0,4)
    ball[1] = 0
    led.plot(ball[0], ball[1])
}

function fallingBall () {
    if (ball[1] > 4) {
        newBall()
    } else {
        led.unplot(ball[0], ball[1])
        ball[1]++
        led.plot(ball[0], ball[1])
    }
}

function animate () {
    let coord : number[] = [(ball[0] == opening[0] ? opening[0] : opening[1]), 3]
    let angle : number = (coord[0] > 1 ? -1 : 1)
    while (coord[1] > -1) {
        led.plot(coord[0], coord[1])
        basic.pause(20)
        if (coord[1] != 4) led.unplot(coord[0], coord[1])
        basic.pause(5)
        coord[0] += angle
        coord[1]--
    }
    if (ded == 3) game.gameOver()
}

function collision () {
    if (ball[1] == 4 && (ball[0] == opening[0] || ball[0] == opening[1])) {
        ded++
        animate()
    } else if (ball[1] == 4 && ball[0] == opening[0]+1) {
        game.addScore(1)
    }
}

input.onButtonPressed(Button.A, function () {
    if (opening[0] > -1) {
        led.unplot(opening[0], 4)
        led.unplot(opening[1], 4)
        opening[0]--
        opening[1]--
    }
})

input.onButtonPressed(Button.B, function () {
    if (opening[1] < 5) {
        led.unplot(opening[0], 4)
        led.unplot(opening[1], 4)
        opening[0]++
        opening[1]++
    }
})

input.onButtonPressed(Button.AB, function () {
    if (game.isGameOver()) reset()
})

reset()

basic.forever(function () {
	led.plot(opening[0], 4)
    led.plot(opening[1], 4)
    if (input.runningTime() - lastTime >= 200) {
            fallingBall()
            collision()
            lastTime = input.runningTime()
    }
})
