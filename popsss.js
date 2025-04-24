// ================================= HTML VARIABLES 
const wordLink = document.querySelectorAll(".word-link");
const clearStorage = document.querySelector(".clear");
const learnedWords = document.querySelector('.completed-words');
const growingBar = document.querySelector('.growing-bar');
const wordListSection = document.querySelector('.word-section')
const starPulse = document.querySelector('.star');
const goalTrackerContainer = document.querySelector('.tracker-box');
const wordGoal = document.querySelector('.word-goal');
const popUpFooter = document.querySelector('.popup-footer');
// const setGoal = document.querySelector('.set-goal');
// const inputGoal = document.querySelector('#input-goal');
// const saveGoal = document.querySelector('.save-goal');


// Parsing the local storage
let viewedWords = JSON.parse(localStorage.getItem('viewedWords')) || [];

// const setDailyGoal = localStorage.getItem('setDailyGoal');
// Set daily goal

let dailyGoal = 5;


// Call goalTrackerContent on page load to initialize the display
goalTrackerContent();

// goalSetter();

// On click event for each word
wordLink.forEach(a => {
    a.addEventListener('click', function (e) {
        e.preventDefault();

        const word = this.textContent;
        checkWord(word); // Check the clicked word
        a.classList.add('viewed-word'); // Highlight viewed word
    });
});

// function goalSetter() {
//     saveGoal.addEventListener('click', () => {
//         let goal = inputGoal.value;

//         wordGoal.textContent = `Today's Goal : ${dailyGoal} Words`;

//         goalTrackerContainer.style.display = 'flex';
//         popUpFooter.style.display = 'flex';
//         wordListSection.style.display = 'flex';
            
//         setGoal.style.display = 'none';

        
//         console.log(dailyGoal);
//         console.log(typeof dailyGoal);
//         console.log(goal);
//     });

// }
     
        // return dailyGoal;


// function display() {
//    
// }

// Checks if clicked word is or is not in localStorage

function checkWord(word){
    if (viewedWords.includes(word)) {
        alert('Word already in your list');
    } else {
        viewedWords.push(word); // Add word to the array
        localStorage.setItem('viewedWords', JSON.stringify(viewedWords)); // Update localStorage

        // Recalculate after adding
        const completedWords = viewedWords.length;
        const remainingWords = dailyGoal - completedWords;
        const growingBarCalc = `(completedWords / dailyGoal) * 100`;
        const growingBarPercent = `${growingBarCalc}%`;

        // Update UI
        goalTrackerContent(completedWords, remainingWords, growingBarCalc, growingBarPercent);
    }
}


// After reloading the page, highlight saved words
wordLink.forEach(a => {
    const word = a.textContent;

    if (viewedWords.includes(word)) {
        a.classList.add('viewed-word');
    }
});

// Initializes goal tracker on page load
function goalTrackerContent()  {

    wordGoal.textContent = `Daily Goal : ${dailyGoal} words`

    /* ------------------------------------------------------ BLOCK TO UPDATAE PROGRESS BAR */
    completedWords = viewedWords.length
    growingBarCalc = (viewedWords.length / dailyGoal) * 100
    remainingWords = dailyGoal - viewedWords.length
    growingBarPercent = `${(viewedWords.length / dailyGoal) * 100}%`

    growingBar.style.width = growingBarPercent;
    /* END OF PROGRESS BAR BLOCK ----------------------------------------------------------- */

    /* -------------------------------------------- BLOCK TO UPDATAE NUMBER OF WORDS LEARNED */
    if (completedWords === 0){
        learnedWords.textContent = `You've learned ${completedWords}/${dailyGoal}`;
    } else if (completedWords > 0 && completedWords < dailyGoal) {
        learnedWords.textContent = `You've learned ${completedWords}/${dailyGoal}`;
    } else if (dailyGoal === completedWords) {
        learnedWords.textContent = `You've learned ${completedWords}/${dailyGoal}`;
    } else if (completedWords > dailyGoal) {
        learnedWords.textContent = `You've learned ${completedWords}/${dailyGoal}`;
        starPulse.classList.add('star-pulse');
    }
    /* -------------------------------------------- END OF BLOCK FOR  NUMBER OF WORDS LEARNED */
}


// ------------------------------------------------ Clear LocalStorage 
clearStorage.addEventListener('click', function(e) {
    e.preventDefault();

    localStorage.clear();
    alert('Local storage cleared!');

    // Optionally, reload page or reset UI manually
    location.reload(); // Refresh to fully reset state
});