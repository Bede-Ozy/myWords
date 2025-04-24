// ================================= HTML VARIABLES 
const wordLink = document.querySelectorAll(".word-link");
const clearStorage = document.querySelector(".clear");
const learnedWords = document.querySelector('.completed-words');
const growingBar = document.querySelector('.growing-bar');
const starPulse = document.querySelector('.star');
const wordGoal = document.querySelector('.word-goal');

// parsing the local storage
let viewedWords = JSON.parse(localStorage.getItem('viewedWords')) || [];

// Set daily goal
let dailyGoal = 10;
// collect the total words added to local storage
let completedWords = viewedWords.length;
// remaining words to complete a daily goal
let remainingWords = dailyGoal - completedWords;
 // growing bar percentage
let growingBarCalc = (completedWords/dailyGoal) * 100;
 // calculates how many percent the progress bar grows with
let growingBarPercent = `${growingBarCalc}%`; 

//Display daily goal in goal tracker
wordGoal.textContent = `Today's Goal : ${dailyGoal} Words`;
//Maintains the updated progress bar even after reload
updateProgressBar (growingBar, growingBarPercent);
// Maintains goal tracker content after reload
goalTrackerContent();

console.log(viewedWords);

// on click event for each word
wordLink.forEach(a => {
    a.addEventListener('click', function (e) {
        e.preventDefault();

        word = this.textContent;

        checkWord(word); // calls function to check the clicked word
        
        a.classList.add('viewed-word'); // adds a predefined class that gives a different background


        growingBar.style.width = growingBarPercent;
         
        // if (viewedWords.includes(a.textContent)){
           
        // }
        
    });
});

//checks if clicked word is or is not in localStorage
function checkWord(word){
    if (viewedWords.includes(word)) {
        alert('word already in your list')
        // return viewedWords
    } else if (!viewedWords.includes(word)) {
        viewedWords.push(word);// adds word to the localstorage

        localStorage.setItem('viewedWords', JSON.stringify(viewedWords)); // updates the local storage

        // collect the total words added to local storage
        let completedWords = viewedWords.length;
        // remaining words to complete a daily goal
        let remainingWords = dailyGoal - completedWords;
        // growing bar percentage
        let growingBarCalc = (completedWords/dailyGoal) * 100;
        // calculates how many percent the progress bar grows with
        let growingBarPercent = `${growingBarCalc}%`; 

        goalTrackerContent();

        console.log(viewedWords);
    }

}

//function to update the progress bar for number of words clicked/saved in local storage
function updateProgressBar (growingBar, growingBarPercent) {
    growingBar.style.width = growingBarPercent;
}

// after reloading the page, checks the local storage and maintains styling for words in storage
wordLink.forEach(a => {
    const word = a.textContent;

    if (viewedWords.includes(a.textContent)){
        a.classList.add('viewed-word');
        updateProgressBar (growingBar, growingBarCalc, growingBarPercent);
    }
});

function goalTrackerContent() {
    updateProgressBar (growingBar, growingBarPercent);
    if (completedWords === 0){
        learnedWords.textContent = `You've learned ${completedWords}/${dailyGoal}`;
    }else if (completedWords > 0 && completedWords < dailyGoal) {
    // alert(`You still get work to do ohh. E remain ${remainingWords} more make your daily goal for complete`);
        learnedWords.textContent = `You've learned ${completedWords}/${dailyGoal}`;
        // updateProgressBar (growingBar, growingBarCalc, growingBarPercent);
        growingBar.style.width = growingBarPercent;
    } else if (dailyGoal === completedWords){
    // alert(`Hooorayyy!! You just complete your daily goal of ${dailyGoal} words today. ahn ahn, you use style smart ohh. carry on!!`);
        learnedWords.textContent = `You've learned ${completedWords}/${dailyGoal}`;
        // updateProgressBar (growingBar, growingBarCalc, growingBarPercent);
        growingBar.style.width = growingBarPercent;
    } else if (completedWords > dailyGoal) {
    // alert(`You have just surpassed your daily goal of ${dailyGoal} words per day. Your vocabulary is getting richer`);
        learnedWords.textContent = `You've learned ${completedWords}/${dailyGoal}`;
        growingBar.style.width = growingBarPercent;
        starPulse.classList.add('star-pulse');
    }
    updateProgressBar(growingBar, growingBarPercent);
}

//clear LocalStorage
clearStorage.addEventListener('click', function(e) {
    e.preventDefault();

    localStorage.clear();
    console.log(localStorage);
    alert('library has been cleared');
});