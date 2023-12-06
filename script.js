/*----- constants -----*/

const fruitEls = document.querySelectorAll('.fruit');
const bombEls = document.querySelectorAll('.bomb');
const itemsContainer = document.querySelectorAll('.item-container')

const startBtn = document.getElementById('start-btn')

const scoreNum = document.getElementById('score-num');

const heartFill3 = document.getElementById('heartfill-3');
const heartFill2 = document.getElementById('heartfill-2');
const heartFill1 = document.getElementById('heartfill-1');

const heartOutline3 = document.getElementById('heart-outline-3');
const heartOutline2 = document.getElementById('heart-outline-2');
const heartOutline1 = document.getElementById('heart-outline-1');

const fruitAudio = document.getElementById('fruit-audio')
const bombAudio = document.getElementById('bomb-audio')

const board = document.getElementById('board')
const boardHeight = board.clientHeight;
const boardWidth = board.clientWidth;

const modalContainer = document.getElementById('modal-container')
const playAgain = document.querySelector('button');
const scoreTitle = document.getElementById('score-title')
const highScoreTitle = document.getElementById('high-score')


/*----- state variables -----*/

let lives = 3;
let score = 0;
let gameActive = true;
let highScore = 0;

/*----- functions -----*/

// Creates random number between min max
const randomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

// set initial position of fruits and bomb
const setInitialPosition = (items) => {
    items.forEach((item) => {

      //Gives a random start time for each item
         setTimeout(() => {
          const itemsChild = item.querySelector('.item');
            const itemWidth = item.clientWidth;
            const boardWidth = board.clientWidth;
            
            item.style.position = "absolute";
            item.style.top = "0px";
            itemsChild.style.visibility = 'visible';
            item.style.left = randomNum(0, boardWidth - itemWidth) + "px";

      //moves item down 3 - 7 px continuously til bottom of board   
        const updatePosition = () => {
          const currentPosition = parseInt(item.style.top);
          const newPosition = currentPosition + 4
          const itemHeight = item.clientHeight;
          const boardHeight = board.clientHeight;

          //hides items once they reach the bottom and bring item back to the top
          if (newPosition >= boardHeight - itemHeight) {
            itemsChild.style.visibility = 'hidden';
            item.style.top = "0px";
         }

         //moves item down until the end of the board by recursively calling animation
          if (newPosition < boardHeight - itemHeight) {
            item.style.top = newPosition + 'px';

            //changes explosion img back to bomb img after half a second if user hits bomb
             if (itemsChild.src.endsWith('explosion.svg')) {
              setTimeout(() => {
                itemsChild.src = '../images/fruits/bomb.svg'
              }, 500)
             }
              requestAnimationFrame(updatePosition)
          }
        }
        //initiates animation loop
        updatePosition()
      }, randomNum(1000, 5000));
    })
}

//restarts animation every 5 seconds
  const restartAnimation = () => {
    setInitialPosition(itemsContainer)
    setTimeout(() => {
      restartAnimation()
    }, 5000)
  }

  restartAnimation();

//counter for points
const scorePoint = (event) => {

    score += 10;
    scoreNum.innerText = score;
    event.target.style.visibility = 'hidden';
}

//event listener for fruit elements
fruitEls.forEach(fruit => {
    fruit.addEventListener('mouseenter', scorePoint)
    if (document.body.animate) {
        fruit.addEventListener('mouseenter', pop);
      }
    fruit.addEventListener('mouseenter', function() {
      fruitAudio.play()
    })
});


//counter for losing a life
 const loseLife = (event) => {
    if (lives === 3) {
        heartFill1.style.display = 'none';
        heartOutline1.style.display = 'inline';
        event.target.src = '../images/fruits/explosion.svg'
        setTimeout(() => {
          event.target.style.visibility = 'hidden'
        }, 300)
        lives = lives - 1
    } else if (lives === 2) {
            heartFill2.style.display = 'none';
            heartOutline2.style.display = 'inline';
            event.target.src = '../images/fruits/explosion.svg'
            setTimeout(() => {
              event.target.style.visibility = 'hidden'
            }, 300)
            lives = lives -1
    } else if (lives === 1) {
            heartFill3.style.display = 'none';
            heartOutline3.style.display = 'inline';
            event.target.src = '../images/fruits/explosion.svg'
            setTimeout(() => {
              event.target.style.visibility = 'hidden'
            }, 300)
            lives = lives - 1
    } if (lives < 1) {
        gameOver()
    }
}


//event listener for bomb elemnents
 bombEls.forEach(bomb => {
     bomb.addEventListener('mouseenter', loseLife)
     if (document.body.animate) {
        bomb.addEventListener('mouseenter', pop)
     }
     bomb.addEventListener('mouseenter', function() {
      bombAudio.play();
     })
 });


 //display game over
 const gameOver = () => {
    gameActive = false;
    modal.style.display = 'block';
    modalContainer.style.display = 'block';
    getHighScore();
 }

 //storing and displaying highscore
 const getHighScore = () => {
  let finalScore = score;

  if (finalScore > highScore) {
    highScore = finalScore
    scoreTitle.innerText = 'NEW HIGH SCORE: ' + highScore
  } else if (finalScore < highScore) {
    scoreTitle.innerText = 'FINAL SCORE: ' + score;
    highScoreTitle.innerText = 'HIGHEST SCORE ' + highScore
  }
 }

 //resets items position after play again click
 const resetPosition = () => {
    itemsContainer.forEach((item) => {
      item.style.visibility = 'visible'
      const itemWidth = item.clientWidth
      item.style.position = "absolute";
      item.style.top = "0px";
     item.style.left = randomNum(0, boardWidth - itemWidth) + "px";
    })
 }

 // resets conditions for new game
 const gameReset = () => {
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
    modalContainer.style.display = 'none';
    resetPosition();
 }


 //event listener to start game again
playAgain.addEventListener('click', gameReset);



/*----- animation when hitting item -----*/

  function pop (e) {
    let popColor;
    if (e.target.id === 'apple') {
      popColor = `hsl(${Math.random() * 90 + 80}, 70%, 60%)`
    } else if (e.target.id === 'strawberry') {
      popColor = `hsl(${Math.random() * 10}, 70%, 60%)`
    } else if (e.target.id === 'banana') {
      popColor = `hsl(${Math.random() * 30 + 45}, 90%, 60%)`
    } else if (e.target.id === 'orange') {
      popColor = `hsl(${Math.random() * 30}, 80%, 70%)`
     } else if (e.target.id === 'watermelon') {
      popColor = `hsl(${Math.random() * 10}, 70%, 60%)`
     }  else if (e.target.id === 'coconut') {
      popColor = `hsl(${30 + Math.random() * 40}, 70%, 60%)`
    }else if (e.target.classList.contains('bomb')) {
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