//WIP

let opening : number [] = [1, 3]
let ball: number [] = [5, 5]

function newBall () {
    ball[0] = randint(0,4)
    ball[1] = 0
    led.plot(ball[0], ball[1])
}

function fallingBall () {
    if (ball[1] > 4) {
        newBall()
    } else {
        ball[1]++
        led.plot(ball[0], ball[1])
    }
}

input.onButtonPressed(Button.A, function () {
    if (opening[0] > -1) {
        opening[0]--
        opening[1]--
    }
})

input.onButtonPressed(Button.B, function () {
    if (opening[1] < 5) {
        opening[0]++
        opening[1]++
    }
})

basic.forever(function () {
	led.plot(opening[0], 4)
    led.plot(opening[1], 4)
    fallingBall()
    basic.pause(100)
    basic.clearScreen()
})
