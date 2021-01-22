let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let WIDTH = 700;
let MIDWIDTH = WIDTH / 2;
let HEIGHT = 600;
let starArr = [];
let lazerArr = [];
let alienArr = [];
let Shooter = new SpaceShip(WIDTH / 2);
let timeInteval;
let can_play = true;
let can_shoot = true;
let shooter_Delay = 6;
let killCount = 0
let spaceDown = false;
let selectRegular = false;
let selectSurvival = false;
let survival_Delay = 21;
let survivalSpeed = 1;
let START = true;

function survival() {
    alienArr = [];
    inGameBg();
    Shooter.draw();
    draw();
    fireLazerSurvival();

    addEventListener("keydown", function () {
        moveShooterSurvival(event.keyCode);
        if (event.keyCode == 32) {
            spaceDown = true;
        }
    })

    addEventListener("keyup", function () {
        if (event.keyCode == 32) {
            spaceDown = false;
        }
    })
}

function fireLazerSurvival() {

    if (can_play && can_shoot) {
        if (can_shoot) {
            timeInteval = setInterval(function () {
                shooting();
                lazerInterval();
                alienSurvival();
                lazerCollisionSurvival();
                drawSurvival();
                shooter_Delay++;
                survival_Delay++;
                survivalSpeed += 0.05;
            }, 100);
            can_shoot = false;
        }
    }
}

function lazerCollisionSurvival() {
    for (let k = 0; k < lazerArr.length; k++) {
        for (let i = 0; i < alienArr.length; i++) {
            if (alienArr[i].inAlien(lazerArr[k].x, lazerArr[k].y)) {
                lazerArr.splice(k, 1);
                alienArr.splice(i, 1);
                i--;
                k--;
                document.getElementById("KillCount").innerHTML = " Kill Count is " + ++killCount;
                break;
            }
        }
    }
}

function drawSurvival() {
    inGameBg();
    Shooter.draw();
    for (let i = 0; i < alienArr.length; i++) {
        alienArr[i].draw();
    }
    for (let i = 0; i < lazerArr.length; i++) {
        lazerArr[i].draw();
    }
}

function alienSurvival() {
    let randomX = (Math.random() * (WIDTH - 95)) - 5;
    let newAlien = new Alien(randomX, 0);
    if (survival_Delay > 15) {
        alienArr.push(newAlien);
        survival_Delay = 0;
    }

    for (let i = 0; i < alienArr.length; i++) {
        if (alienArr[i].y >= HEIGHT - 45) {
            alert(killCount + " kills before the Aliens got through");
            alienArr.splice(0, alienArr.length);
            lazerArr.splice(0, lazerArr.length);
            clearInterval(timeInteval);
            can_play = false;
            break;
        } else {
            alienArr[i].y += alienArr[i].speed;
        }
    }
}

function regular() {
    alienArr = [];
    inGameBg();
    Shooter.draw();
    generateAliens();
    draw();
    fireLazer();

    addEventListener("keydown", function () {
        moveShooter(event.keyCode);
        if (event.keyCode == 32) {
            spaceDown = true;
        }
    })

    addEventListener("keyup", function () {
        if (event.keyCode == 32) {
            spaceDown = false;
        }
    })
}

function fireLazer() {
    if (can_play && can_shoot) {
        timeInteval = setInterval(function () {
            winner();
            shooting();
            lazerInterval();
            alienInterval();
            lazerCollision();
            draw();
            shooter_Delay += 0.75;
        }, 100);
        can_shoot = false;
    }
}

function shooting() {
    if (shooter_Delay > 4 && spaceDown) {
        let newLazer = new Lazer(Shooter.x);
        newLazer.draw();
        lazerArr.push(newLazer);
        shooter_Delay = 0;
    }
}

function draw() {
    inGameBg();
    Shooter.draw();
    for (let i = 0; i < alienArr.length; i++) {
        for (let j = 0; j < alienArr[i].length; j++) {
            alienArr[i][j].draw();
        }
    }
    for (let i = 0; i < lazerArr.length; i++) {
        lazerArr[i].draw();
    }
}

function moveShooterSurvival(x) {
    if (can_play) {
        switch (x) {
            case 37:
                if (Shooter.x < 15) {
                    Shooter.x = WIDTH - 25;
                } else {
                    Shooter.x -= 25;
                }
                break;
            case 39:
                if (Shooter.x > WIDTH - 15) {
                    Shooter.x = 25;
                } else {
                    Shooter.x += 25;
                }
                break;
        }
        drawSurvival();
    }
}

function moveShooter(x) {
    if (can_play) {
        switch (x) {
            case 37:
                if (Shooter.x < 15) {
                    Shooter.x = WIDTH - 25;
                } else {
                    Shooter.x -= 25;
                }
                break;
            case 39:
                if (Shooter.x > WIDTH - 15) {
                    Shooter.x = 25;
                } else {
                    Shooter.x += 25;
                }
                break;
        }
        draw();
    }
}

function lazerCollision() {
    for (let k = 0; k < lazerArr.length; k++) {
        for (let i = 0; i < alienArr.length; i++) {
            if (lazerArr.length < 1) {
                break;
            }
            for (let j = 0; j < alienArr[i].length; j++) {
                if (lazerArr.length < 1) {
                    break;
                }
                if (alienArr[i][j].inAlien(lazerArr[k].x, lazerArr[k].y)) {
                    lazerArr.splice(k, 1);
                    alienArr[i].splice(j, 1);

                    if (k > 0) {
                        k--
                    }

                    document.getElementById("KillCount").innerHTML = " Kill Count is " + ++killCount;
                }

            }
            if (alienArr[i].length == 0) {
                alienArr.splice(i, 1);
            }
        }
    }
}

function winner() {
    if (alienArr.length == 0) {
        alert("Winner Winner");
        lazerArr.splice(0, lazerArr.length);
        clearInterval(timeInteval);
        can_play = false;

    }
}

function lazerInterval() {
    for (let i = 0; i < lazerArr.length; i++) {
        if (lazerArr[i].y < 0) {
            lazerArr.splice(i, 1);
        } else {
            lazerArr[i].y -= 25;
        }
    }
}

function alienInterval() {
    for (let i = 0; i < alienArr.length; i++) {
        for (let j = 0; j < alienArr[i].length; j++) {
            if (alienArr[i][j].y >= HEIGHT - 45) {
                alert("Game Over")
                alienArr.splice(0, alienArr.length);
                lazerArr.splice(0, lazerArr.length);
                clearInterval(timeInteval);
                can_play = false;
                break;
            } else {
                alienArr[i][j].y += 3;
            }
        }
    }
}

function Lazer(x) {
    this.x = x;
    this.y = HEIGHT - 35;

    this.draw = function () {
        ctx.fillStyle = "white"
        ctx.beginPath();
        ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    }
}

function distance(x1, x2, y1, y2) {
    return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2))
}

function generateAliens() {
    for (let i = 0; i < 6; i++) {
        alienArr.push([]);
        for (let j = 0; j < 5; j++) {
            let newAlien = new Alien(i * WIDTH / 6, j * -100);
            alienArr[i].push(newAlien);
        }
    }
}

function Alien(x, y) {
    this.x = x + 50;
    this.y = y + 45;
    this.speed = survivalSpeed;

    this.draw = function () {
        ctx.fillStyle = "darkgreen";
        ctx.beginPath();
        ctx.arc(this.x, this.y, 45, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    }

    this.inAlien = function (x, y) {
        return distance(x, this.x, y, this.y) < 45
    }
}

function SpaceShip(x) {
    this.x = x;

    this.draw = function () {
        ctx.fillStyle = "lightgreen";
        ctx.beginPath();
        ctx.arc(this.x, HEIGHT - 35, 35, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    }
}

function inGameBg() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

function restart() {
    alert("Refresh the page to restart");
}

function regularChoice() {
    selectRegular = true;
    selectSurvival = false;
}

function survivalChoice() {
    selectRegular = false;
    selectSurvival = true;
}

function start() {
    if (START) {
        if (selectRegular) {
            regular();
        } else if (selectSurvival) {
            survival();
        }
    }
    START = false;
}