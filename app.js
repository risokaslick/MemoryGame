// puts all images in an array with keys
const cardsArray = [{
    'name': '1',
    'img': 'images/1.jpeg',
},
{
    'name': '2',
    'img': 'images/2.jpeg',
},
{
    'name': '3',
    'img': 'images/3.jpeg',
},
{
    'name': '4',
    'img': 'images/4.jpeg',
},
{
    'name': '5',
    'img': 'images/5.jpeg',
},
{
    'name': '6',
    'img': 'images/6.jpeg',
},


];


//autoplays audio
var music = document.getElementById("myAudio");
//starts music
//function to toggle instructions





function showInfo() {
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}




// create function to start timer

function startTimer() {

    countdown();

}
//when the start button is clicked, begin 1 minute timer
function countdown() {

    timeLeft--;
    document.getElementById("timeLeft").innerHTML = String(timeLeft);
    if (timeLeft > 0) {
        setTimeout(countdown, 1000);

    } else if (timeLeft === 0) {
        document.getElementById('memory--end-game-message').textContent = "YOU LOOSE!!!";
        document.getElementById("memory--end-game-modal").classList.toggle('show');
    }
}


const gameGrid = cardsArray  //arranges all the cards in randomly in a grid
    .concat(cardsArray)
    .sort(() => 0.5 - Math.random());

let firstGuess = ''; // variable to hold for the first gues to be used in match comparison
let secondGuess = '';
let count = 0; // counts clicks on cards to determine first and second guess for matching
let previousTarget = null;
let delay = 1200;
let matches = 0;
let timeLeft = 0;
let time =0;
const game = document.getElementById('game');// div that contains the cards
const grid = document.createElement('section'); // section that holds the cards in the game div
grid.setAttribute('class', 'grid'); 
game.appendChild(grid); // display all the cards on page

//the foreach loop below display all the cards randomly in a grid format with both the front and back pictures
gameGrid.forEach(item => {
    const { name, img } = item;

    const card = document.createElement('div'); // create a div that contains cards
    card.classList.add('card'); //adds cards to div created above
    card.dataset.name = name; 

    //creates a div to hold the front image
    const front = document.createElement('div'); 
    front.classList.add('front');

    const back = document.createElement('div'); // creates a div to hold the back image
    back.classList.add('back'); 
    back.style.backgroundImage = `url(${img})`;

    grid.appendChild(card); // add card to the grid 
    card.appendChild(front); // append front image to the cards
    card.appendChild(back); // appends back image to the cards
});

//function that check for matches in the game 
const match = () => {
    const selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
        card.classList.add('match');
    });

};

//resets guess when they dont match
const resetGuesses = () => {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;

    var selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
        card.classList.remove('selected');
    });
};

//starts the game
function startGame() {
    music.play();
    startTimer();


// listens for any click event on the cards
    grid.addEventListener('click', event => {

        const clicked = event.target; // gets the value of the card clicked

        if (
            clicked.nodeName === 'SECTION' ||  
            clicked === previousTarget || 
            clicked.parentNode.classList.contains('selected') ||
            clicked.parentNode.classList.contains('match')
        ) {
            return;
        }

        if (count < 2) { //checks for card clicks to determine first and second guess
            count++;
            if (count === 1) { // sets as the first guess
                firstGuess = clicked.parentNode.dataset.name;
                // console.log(firstGuess);
                clicked.parentNode.classList.add('selected'); // 
            } else {
                //sets as the second guess
                secondGuess = clicked.parentNode.dataset.name;
                // console.log(secondGuess);
                clicked.parentNode.classList.add('selected');
            }

            //checks if we have the value of the two guess so that we can check if they match
            if (firstGuess && secondGuess) {
                if (firstGuess === secondGuess) { // check for a match in the value of firstguess and secondguess
                    setTimeout(match, delay);
                    //tracks matches to determine win 
                    matches++  // increments the matchs to determine if the user has matched all cards
                    if (matches === 6) {
                        document.getElementById('memory--end-game-message').textContent = "YOU WIN!!!"; // sets winning message
                        document.getElementById("memory--end-game-modal").classList.toggle('show'); // displays  message modal to the user
                    }

                }
                setTimeout(resetGuesses, delay); // if there is no match this line flips back the cards
            }
            previousTarget = clicked;
        }


    });
}


// hide message and setting modals
function hideMessageModal() {
    timeLeft = time;
     document.getElementById("timeLeft").innerHTML =time;
    document.getElementById('memory--end-game-modal').classList.remove('show');
   
}



//handles submissions from seetings modal
// Handle settings form submission
var reset = document.getElementById('memory--settings-reset');
var handleSettingsSubmission = function (event) {
    event.preventDefault(); // prevent default function in the html form
    music.play(); 
    document.getElementById('player-name').innerHTML = "Name:" + document.getElementById("name").value; //get value of player name to display it in the game
    var userSelection = document.getElementById("memory--settings-grid").valueOf(); // get value of the selected mode in the difficulty dropdown
    time = userSelection.options[userSelection.selectedIndex].value; // get the value of the mode selection to determine time in the game
    document.getElementById("timeLeft").innerHTML =time; // set time left in the timer
    timeLeft = time; // set time left in the timer
    document.getElementById('memory--settings-modal').classList.remove('show'); // hides the settings modal
}
reset.addEventListener('click', handleSettingsSubmission); // listens for a click in the modal to handle user submissions on the form


// shows settings modal
function showSettings(){
    document.getElementById('memory--settings-modal').classList.add('show');
}