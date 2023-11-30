/*----- constants -----*/

const fruitEls = document.querySelectorAll('.fruit');
const bombEls = document.querySelectorAll('.bomb');

const board = document.getElementById('board')

const scoreNum = document.getElementById('score-num');

const heartFill3 = document.getElementById('heartfill-3');
const heartFill2 = document.getElementById('heartfill-2');
const heartFill1 = document.getElementById('heartfill-1');

const heartOutline3 = document.getElementById('heart-outline-3');
const heartOutline2 = document.getElementById('heart-outline-2');
const heartOutline1 = document.getElementById('heart-outline-1');

const playAgain = document.querySelector('button');
const finalScore = document.getElementById('final-score')

const fruits = ['apple', 'strawberry', 'banana']

/*----- state variables -----*/

let position;
let lives = 3;
let score = 0;
let fruitNum = 0;
let bombNum = 0;
/*----- event listeners -----*/




/*----- functions -----*/

// Creates random number between a minimum and max
const randomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

// adds random position to the items
const randomPosition = (items) => {
    items.forEach((item) => {
        item.style.position = "absolute";
        item.style.top = randomNum(0, 500) + "px";
        item.style.left = randomNum(0, 500) + "px";
    })
}

randomPosition(fruitEls)
randomPosition(bombEls)


//FRUIT FUNCTIONALITY

//shows fruit
const fruitShow = () => {
    fruitEls.forEach((fruit) => {
        fruit.style.display = 'block';
        fruit.style.backgroundColor = '#7DE674'
    })
    fruitNum = 0;
}

//hides fruit
const fruitHide = () => {
    fruitEls.forEach((fruit) => {
        fruit.style.display = 'none';
    })
    randomPosition(fruitEls)
    fruitNum = 1;
}

//randomize time each fruit appears

//sequence for fruit hide and show
const fruitSequence = () => {
    if (fruitNum === 0) {
        setTimeout(fruitHide, 5000)
    } if (fruitNum === 1) {
        fruitShow()
    }
} 

//initial call to start sequence
fruitSequence();

//repeat sequence
setInterval(fruitSequence, 5000);

//mouse down on fruit scores point
const scorePoint = (event) => {
    if (event.target.style.backgroundColor === 'green') {
        return;
    }
    score += 10;
    scoreNum.innerText = score;
    event.target.style.backgroundColor = 'green'

}

//event listener to score point when hitting fruit
fruitEls.forEach(fruit => {
    fruit.addEventListener('mouseover', scorePoint)
});


// //BOMB FUNCTIONALITY

// //shows bomb
const bombShow = () => {
    bombEls.forEach((bomb) => {
        bomb.style.display = 'block';
        bomb.style.backgroundColor = '#F44D61'
    })
    bombNum = 0;
}

//hides bomb
const bombHide = () => {
    bombEls.forEach((bomb) => {
        bomb.style.display = 'none';
    })
    randomPosition(bombEls)
    bombNum = 1;
}

//sequence for bomb hide and show
const bombSequence = () => {
    if (bombNum === 0) {
        setTimeout(bombHide, 2000)
    } if (bombNum === 1) {
        bombShow()
    }
} 

//initial call to start sequence
bombSequence();

//repeat sequence
setInterval(bombSequence, 2000);

let isLosingLife = false;
//mouse down on bomb lose life
 const loseLife = (event) => {
    if (event.target.style.backgroundColor === 'red') {
        return;
    }

    if (lives === 3) {
        heartFill1.style.display = 'none';
        heartOutline1.style.display = 'inline';
        event.target.style.backgroundColor = 'red';
        lives = lives - 1
    } else if (lives === 2) {
            heartFill2.style.display = 'none';
            heartOutline2.style.display = 'inline';
            event.target.style.backgroundColor = 'red';
            lives = lives -1
    } else if (lives === 1) {
            heartFill3.style.display = 'none';
            heartOutline3.style.display = 'inline';
            event.target.style.backgroundColor = 'red';
            lives = lives - 1
    } if (lives < 1) {
        gameOver()
    }
}

//event listener to lose life if hit bomb
 bombEls.forEach(bomb => {
     bomb.addEventListener('mouseenter', loseLife)
 });

 const gameOver = () => {
    modal.style.display = 'block'
    finalScore.innerText = score
 }

 // game restarts
 const gameInit = () => {
    lives = 3;
    heartFill1.style.display = 'inline';
    heartOutline1.style.display = 'none';
    heartFill2.style.display = 'inline';
    heartOutline2.style.display = 'none';
    heartFill3.style.display = 'inline';
    heartOutline3.style.display = 'none';
    score = 0;
    scoreNum.innerText = 0;
    modal.style.display = 'none';
 }

 //event listener to start game again
playAgain.addEventListener('click', gameInit);