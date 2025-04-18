// ================================= HTML VARIABLES 
const wordLink = document.querySelectorAll(".word-link");
const clearStorage = document.querySelector(".clear");
const learnedWords = document.querySelector('.completed-words');
const growingBar = document.querySelector('.growing-bar');
const starPulse = document.querySelector('.star');
const wordGoal = document.querySelector('.word-goal');


// let count = JSON.parse(localStorage.getItem('count'));

// ================================= getting local storage value for saved/viewed/completed words 
let viewedWords = JSON.parse(localStorage.getItem('viewedWords')) || [];


// ================================= STREAK TRACKER 

// Set daily goal
let dailyGoal = 10;
// collect the total words added to local storage
completedWords = viewedWords.length;
// remaining words to complete a daily goal
remainingWords = dailyGoal - completedWords;
// growing bar percentage
growingBarCalc = (completedWords/dailyGoal) * 100;
// calculates how many percent the progress bar grows with
growingBarPercent = `${growingBarCalc}%`; 

// console.log(`bar: ${growingBarPercent}%`);


console.log(wordLink);

//Display daily goal in goal tracker
wordGoal.textContent = `Today's Goal : ${dailyGoal} Words`;




// ================================= function to add viewed words to localStorage
function addViewedWord(word) {
    if (!viewedWords.includes(word)){
        viewedWords.push(word); // pushes new word into local storage if it has not (!) already been saved before

        localStorage.setItem('viewedWords', JSON.stringify(viewedWords)); // updates the local storage
    }
}

// ================================= add event listener. 
// Onclick let the clicked word be collected and parsed to the addViewedWord function which then saves it to localStorage 
wordLink.forEach(a => {
    a.addEventListener('click', function(e) {
        
        e.preventDefault();
        const word = this.textContent;

        //  To check if the clicked word has already been saved in local storage
        if (viewedWords.includes(word)){
            console.log('You have saved this word already');
            a.classList.add('');
        }

        // sends new word to addViewedWord function
        addViewedWord(word); 
        

        a.classList.add('viewed-word'); // adds the predefined css style to the clicked link

        growingBar.style.width = growingBarPercent; // to increase the progress bar 
        console.log(viewedWords);

        // count += 1;
        // console.log(`word clicked: ${word}`); //displays the collected content
        // console.log(`Clicked Words: ${count}`)

        // localStorage.setItem('count', JSON.stringify(count));

    });
});

// To check if a particular has been previously clicked and viewed. if so, then retain its background color
wordLink.forEach(a => {
    const word = a.textContent;

    if (viewedWords.includes(a.textContent)){
        a.classList.add('viewed-word');
    }
});

// Update the goal tracker UI from localStorage and words onclick
if (completedWords === 0){
    learnedWords.textContent = `You've learned ${completedWords}/${dailyGoal}`;
}else if (completedWords > 0 && completedWords < dailyGoal) {
// alert(`You still get work to do ohh. E remain ${remainingWords} more make your daily goal for complete`);
    learnedWords.textContent = `You've learned ${completedWords}/${dailyGoal}`;
    growingBar.style.width = growingBarPercent;
} else if (dailyGoal === completedWords){
// alert(`Hooorayyy!! You just complete your daily goal of ${dailyGoal} words today. ahn ahn, you use style smart ohh. carry on!!`);
    learnedWords.textContent = `You've learned ${completedWords}/${dailyGoal}`;
    growingBar.style.width = growingBarPercent;
} else if (completedWords > dailyGoal) {
// alert(`You have just surpassed your daily goal of ${dailyGoal} words per day. Your vocabulary is getting richer`);
    learnedWords.textContent = `You've learned ${completedWords}/${dailyGoal}`;
    growingBar.style.width = growingBarPercent;
    starPulse.classList.add('star-pulse');
}

//clear LocalStorage
clearStorage.addEventListener('click', () => {
    localStorage.clear();
    // console.log(count);

    console.log('cleared')
});









