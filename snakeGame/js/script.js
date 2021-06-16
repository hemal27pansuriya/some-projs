let inputDir = {x:0, y:0};
const foodSound = new Audio('../assets/food.wav');
const gameOverSound = new Audio('../assets/gameOver.wav');
const moveSound = new Audio('../assets/move.wav');
const bgSound = new Audio('../assets/bg.mp3');
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x:13, y:15}
];
food = {x:2, y:4}

function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();  
}

function isCollide(snake) {
    // If snake khud se takrae
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    // If diwaar se takrae
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
}

function gameEngine() {
    // part 1: updating snack array and food
    if(isCollide(snakeArr)) {
        gameOverSound.play();
        bgSound.pause();
        inputDir = {x:0, y:0};
        alert('Game Over!! Press "OK" to play again!');
        snakeArr = [{x:13, y:15}];
        bgSound.play();
        score = 0;
    }

    // incrementing score, regenerating food after successful eaten
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        if(score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "Highscore : "+ hiscoreval;
        }
        scoreBox.innerHTML = "Score : "+ score;
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x, y:snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 17;
        food = {x:Math.round(a + (b - a)*Math.random()), y:Math.round(a + (b - a)*Math.random())};
    }

    // Moving the snake
    for (let i = snakeArr.length-2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};        
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // part 2: display snake and food
    // display snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart =e.x;
        if(index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snakeBody');
        }
        board.appendChild(snakeElement);
    });
    //display food
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food')
        board.appendChild(foodElement);
}

// Main logic
let hiscore = localStorage.getItem('hiscore');
if(hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem('hiscore', JSON.stringify(hiscoreval));
}
else {
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "Highscore : "+ hiscoreval;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    bgSound.play();
    inputDir = {x:0, y:1}   // start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});