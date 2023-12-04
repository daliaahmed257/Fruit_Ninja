/*----- constants -----*/

const fruitEls = document.querySelectorAll('.fruit');
const bombEls = document.querySelectorAll('.bomb');
const itemsContainer = document.querySelectorAll('.item-container')
const board = document.getElementById('board')

const startBtn = document.getElementById('start-btn')
const scoreNum = document.getElementById('score-num');

const heartFill3 = document.getElementById('heartfill-3');
const heartFill2 = document.getElementById('heartfill-2');
const heartFill1 = document.getElementById('heartfill-1');

const heartOutline3 = document.getElementById('heart-outline-3');
const heartOutline2 = document.getElementById('heart-outline-2');
const heartOutline1 = document.getElementById('heart-outline-1');

const playAgain = document.querySelector('button');
const finalScore = document.getElementById('final-score')

const fruitAudio = document.getElementById('fruit-audio')
const bombAudio = document.getElementById('bomb-audio')

const fruits = ['apple', 'strawberry', 'banana', 'grape']

const boardHeight = board.clientHeight;
const boardWidth = board.clientWidth;



/*----- state variables -----*/

let position;
let lives = 3;
let score = 0;
let fruitNum = 0;
let bombNum = 0;
let gameActive = true;
/*----- event listeners -----*/


let counter = 0;
/*----- functions -----*/

// Creates random number between a minimum and max
const randomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

// set initial position of fruits and bomb
const setInitialPosition = (items) => {
    items.forEach((item) => {
        setTimeout(() => {
            item.style.visibility = 'visible'
            const itemWidth = item.clientWidth
            item.style.position = "absolute";
            item.style.top = "0px";
            item.style.left = randomNum(0, boardWidth - itemWidth) + "px";
        }, 3000);
    })
}

setInitialPosition(itemsContainer);

//updates position during the animation
updatePosition = (items) => {
    if (gameActive) {
        items.forEach((item) => {
            const currentTop = parseInt(item.style.top);
            const newTop = currentTop + randomNum(5, 15);
            item.style.top = newTop + "px";
    
            const itemHeight = item.clientHeight;
            const itemWidth = item.clientWidth;
    
            const itemsChild = item.querySelector('.item')
            if (newTop > board.clientHeight - itemHeight) {
                if (itemsChild.src.endsWith('explosion.svg')) {
                  itemsChild.src = '../images/fruits/bomb.svg'
                }
                itemsChild.style.visibility = 'visible'
                item.style.top = "0px";
                item.style.left = randomNum(0, boardWidth - itemWidth) + "px";
            }
        })
    }
}

//repeats the function to set interval every 50 milliseconds to similate 'falling'
      setInterval(() => {
        updatePosition(itemsContainer);
    }, 80)



// delay(itemsContainer);


//mouse down on fruit scores point
const scorePoint = (event) => {

    score += 10;
    scoreNum.innerText = score;
    event.target.style.visibility = 'hidden';
}

//event listener to score point when hitting fruit
fruitEls.forEach(fruit => {
    fruit.addEventListener('mouseover', scorePoint)
    if (document.body.animate) {
        fruit.addEventListener('mouseenter', pop);
      }
    fruit.addEventListener('mouseenter', function() {
      fruitAudio.play()
    })
});

 const loseLife = (event) => {
    if (lives === 3) {
        heartFill1.style.display = 'none';
        heartOutline1.style.display = 'inline';
        event.target.src = '../images/fruits/explosion.svg'
        setTimeout(() => {
          event.target.style.visibility = 'hidden'
        }, 500)
        lives = lives - 1
    } else if (lives === 2) {
            heartFill2.style.display = 'none';
            heartOutline2.style.display = 'inline';
            event.target.src = '../images/fruits/explosion.svg'
            setTimeout(() => {
              event.target.style.visibility = 'hidden'
            }, 500)
            lives = lives -1
    } else if (lives === 1) {
            heartFill3.style.display = 'none';
            heartOutline3.style.display = 'inline';
            event.target.src = '../images/fruits/explosion.svg'
            setTimeout(() => {
              event.target.style.visibility = 'hidden'
            }, 500)
            lives = lives - 1
    } if (lives < 1) {
        gameOver()
    }
}



//event listener to lose life if hit bomb
 bombEls.forEach(bomb => {
     bomb.addEventListener('mouseenter', loseLife)
     if (document.body.animate) {
        bomb.addEventListener('mouseenter', pop)
     }
     bomb.addEventListener('mouseenter', function() {
      bombAudio.play();
     })
 });

 const gameOver = () => {
    gameActive = false;
    modal.style.display = 'block';
    finalScore.innerText = score;
 }

 //resets position after playagin click
 const resetPosition = () => {
    itemsContainer.forEach((item) => {
      item.style.visibility = 'visible'
      const itemWidth = item.clientWidth
      item.style.position = "absolute";
      item.style.top = "0px";
     item.style.left = randomNum(0, boardWidth - itemWidth) + "px";
    })
 }

 // game restarts
 const gameInit = () => {
    gameActive = true;
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
    resetPosition();
 }



 //event listener to start game again
playAgain.addEventListener('click', gameInit);











/*----- Fruit Slice Animation -----*/

  function pop (e) {
    let popColor;
    if (e.target.id === 'apple') {
      popColor = `hsl(${Math.random() * 90 + 80}, 70%, 60%)`
    } else if (e.target.id === 'strawberry') {
      popColor = `hsl(${Math.random() * 10}, 70%, 60%)`
    } else if (e.target.id === 'banana') {
      popColor = `hsl(${Math.random() * 30 + 45}, 90%, 60%)`
    } else if (e.target.id === 'mango') {
      popColor = `hsl(${Math.random() * 30}, 80%, 70%)`
     } else if (e.target.classList.contains('bomb')) {
       popColor = `hsl(0, 0%, ${Math.random() * 10}%)`
     }
    // Quick check if user clicked the button using a keyboard
    if (e.clientX === 0 && e.clientY === 0) {
      const bbox = document.querySelector('#button').getBoundingClientRect();
      const x = bbox.left + bbox.width / 2;
      const y = bbox.top + bbox.height / 2;
      for (let i = 0; i < 30; i++) {
        // We call the function createParticle 30 times
        // We pass the coordinates of the button for x & y values
        createParticle(x, y);
      }
    } else {
      for (let i = 0; i < 30; i++) {
        // We call the function createParticle 30 times
        // As we need the coordinates of the mouse, we pass them as arguments
        createParticle(e.clientX, e.clientY, popColor);
      }
    }
  }
  
  function createParticle (x, y, popColor) {
    const particle = document.createElement('div');
    particle.classList.add('particle')
    document.body.appendChild(particle);
    
    // Calculate a random size from 5px to 25px
    const size = Math.floor(Math.random() * 20 + 5);
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    // Generate a random color
    particle.style.background = popColor;


    
    // Generate a random x & y destination within a distance of 75px from the mouse
    const destinationX = x + (Math.random() - 0.5) * 2 * 75;
    const destinationY = y + (Math.random() - 0.5) * 2 * 75;
  
    // Store the animation in a variable as we will need it later
    const animation = particle.animate([
      {
        // Set the origin position of the particle
        // We offset the particle with half its size to center it around the mouse
        transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
        opacity: 1
      },
      {
        // We define the final coordinates as the second keyframe
        transform: `translate(${destinationX}px, ${destinationY}px)`,
        opacity: 0
      }
    ], {
      // Set a random duration from 500 to 1500ms
      duration: Math.random() * 1000 + 500,
      easing: 'cubic-bezier(0, .9, .57, 1)',
      // Delay every particle with a random value of 200ms
      delay: Math.random() * 200
    });
    
    // When the animation is complete, remove the element from the DOM
    animation.onfinish = () => {
      particle.remove();
    };
  }