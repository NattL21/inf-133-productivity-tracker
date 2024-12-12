to_do_list = document.getElementById("todolist");
pomodoro = document.getElementById("pomodoro");
calendar = document.getElementById("calendar");
quotes = document.getElementById("quotes");

// DISPLAY FUNCTIONS
to_do_list.style.display = "none";

function openToDo() {
    if (to_do_list.style.display == "block") {
        to_do_list.style.display = "none";
    } else {
        to_do_list.style.display = "block";
    }
}

pomodoro.style.display = "none";

function openPomodoro() {
    if (pomodoro.style.display == "block") {
        pomodoro.style.display = "none";
    } else {
        pomodoro.style.display = "block";
    }
}

calendar.style.display = "none";

function openCalendar() {
    if (calendar.style.display == "block") {
        calendar.style.display = "none";
    } else {
        calendar.style.display = "block";
    }
}

quotes.style.display = "none";

function openQuotes() {
    if (quotes.style.display == "block") {
        quotes.style.display = "none";
        console.log("hello?")
    } else {
        quotes.style.display = "block";
    }
}

// Functions insert each div containing the productivity element into the innerHTML
// TO DO LIST CODE
document.getElementById("userInput").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) { // User presses enter key
        document.getElementById("addButton").click();
    }
});

function addItem() {
    let list = document.createElement("li");
    list.style.listStyleType = "none";

    let inputValue = document.getElementById("userInput").value;
    let dateValue = document.getElementById("userDate").value;

    let text = document.createTextNode(inputValue);
    list.appendChild(text);
    if (inputValue == "") {
        alert("Please enter an item.");
    } else {
        document.getElementById("todoList").appendChild(list);
    }

    let date = document.createTextNode(`- Due: ${dateValue || "No date set"}`);
    list.appendChild(date);

    document.getElementById("userInput").value = "";

    let span = document.createElement("span");
    let node = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(node);
    list.appendChild(span);

    for (let i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            var div = this.parentElement;
            div.style.display = "none";
        };
    }
}

let nodeList = document.getElementsByTagName("li");
for (let i = 0; i < nodeList.length; i++) {
    let span = document.createElement("span");
    let text = document.createTextNode('\u00D7');
    span.className = "close";
    span.appendChild(text);
    nodeList[i].appendChild(span);
}

let close = document.getElementsByClassName("close");
for (let i = 0; i < close.length; i++) {
    close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
    };
}

let itemsList = document.getElementById("todoList");
itemsList.addEventListener("click", function(event) {
    if (event.target.tagName === "li") {
        event.target.classList.toggle("checked");
    }
}, false);

// POMODORO CODE
document.getElementById("timeDisplay").innerHTML = "00m00s";
function changeInput(minutes) {
    document.getElementById("timeInput").value = minutes;
    document.getElementById("timeDisplay").innerHTML = minutes + "m00s";

    if (minutes >= 60) {
        console.log("hello")
        let hours = Math.round(minutes / 60);
        let remainingMinutes = minutes % 60;

        if (remainingMinutes < 10) {
            document.getElementById("timeDisplay").innerHTML = hours + "h" + remainingMinutes + "0m00s";
        } else {
            document.getElementById("timeDisplay").innerHTML = hours + "h" + remainingMinutes + "m00s";
        }
    }
}
let pause_button = document.getElementById("pauseButton");
let go_button = document.getElementById("goButton");
let reset_button = document.getElementById("resetButton");

let sound;
let secondsLeft;
let seconds;
let interval;

pause_button.style.display = "none";
reset_button.style.display = "none";

function start() {
    // if the timer has finished running
    if (!secondsLeft) {
        const timeInMinutes = document.getElementById("timeInput").value;
        secondsLeft = timeInMinutes * 60;
    }

    // Hide pause button and show go button
    pause_button.style.display = "block";
    go_button.style.display = "none";

    // set timer interval
    interval = setInterval(function() {
        secondsLeft -= 1;

        let minutes = Math.floor(secondsLeft / 60);
        let seconds = secondsLeft - minutes * 60;

        document.getElementById("timeDisplay").innerHTML = minutes + "m" + seconds + "s";

        if (secondsLeft <= 0) {
            clearInterval(interval);
            secondsLeft = undefined;
            document.getElementById("timeDisplay").innerHTML = "TIME IS UP!";
            pause_button.style.display = "none";
            go_button.style.display = "block";
            sound = new Audio("assets/alarm_sound.mp3");
            sound.play(5);
        }
    }, 1000);
}

function pause() {
    clearInterval(interval);

    go_button.style.display = "block";
    pause_button.style.display = "none";
    reset_button.style.display = "block";
    sound.pause();
    sound = new Audio("assets/alarm_sound.mp3");
}

function reset() {
    secondsLeft = undefined;
    reset_button.style.display = "none";
    go_button.style.display = "block";
    document.getElementById("timeDisplay").innerHTML = "00m00s";
    sound.pause();
    sound = new Audio("assets/alarm_sound.mp3");
}

// CALENDAR CODE

const days = document.getElementById('days');
const monthYear = document.getElementById('month-year');
const events = document.getElementById('events');
const eventText = document.getElementById('eventText');
const saveEventButton = document.getElementById('saveEvent');
const closeEventButton = document.getElementById('closeEvent');

let currentDate = new Date();
let selectedDate = null;
let eventsStorage = JSON.parse(localStorage.getItem('events')) || {};

//change month
function changeMonth(increment) {
    currentDate.setMonth(currentDate.getMonth() + increment);
    renderCalendar();
}

//render calendar
function renderCalendar() {
    // Get the current month and year
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();


    // Set the month/year
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    monthYear.textContent = `${monthNames[month]} ${year}`;

    // Clear previous days
    days.innerHTML = '';

    const firstDay = new Date(year, month, 1).getDay();
    const numDays = new Date(year, month + 1, 0).getDate();

    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDate = today.getDate();

    // Add empty boxes for days from the previous month
    for (let i = 0; i < firstDay; i++) {
        const emptyBox = document.createElement('div');
        emptyBox.classList.add('day-box', 'empty');
        days.appendChild(emptyBox);
    }

    // Add the days of the current month
    for (let i = 1; i <= numDays; i++) {
        const dayBox = document.createElement('div');
        dayBox.classList.add('day-box');
        dayBox.textContent = i;

        // Show event if any
        const eventKey = `${year}-${month + 1}-${i}`;
        if (eventsStorage[eventKey]) {
            const event = document.createElement('div');
            event.classList.add('event');
            event.textContent = eventsStorage[eventKey];
            dayBox.appendChild(event);
        }

        if(todayYear == year && todayMonth == month && todayDate == i){
            dayBox.classList.add('today');
        }
        
        // Click on a day to add/remove events
        dayBox.addEventListener('click', () => {
            selectedDate = { year, month, day: i };
            openModal();
        });

        days.appendChild(dayBox);
    }
}


function openModal() {
    events.style.display = 'flex';
    eventText.value = eventsStorage[`${selectedDate.year}-${selectedDate.month + 1}-${selectedDate.day}`] || '';
}

closeEventButton.addEventListener('click', () => {
    events.style.display = 'none';
});

// Save event
saveEventButton.addEventListener('click', () => {
    const eventKey = `${selectedDate.year}-${selectedDate.month + 1}-${selectedDate.day}`;
    eventsStorage[eventKey] = eventText.value;

    // Save events to localStorage
    localStorage.setItem('events', JSON.stringify(eventsStorage));

    events.style.display = 'none';
    renderCalendar();
});

// Initial render
renderCalendar();

// QUOTE CODE
//quote api url
api_url = 'https://quoteslate.vercel.app/api/quotes/random';

const quoteElement = document.getElementById('quote');
const quoteButton = document.getElementById('newQuote');

async function getQuote(){
     try{
        const response = await fetch(api_url);
        const data = await response.json();

        quoteElement.innerHTML = `${data.quote} <br> <em>- ${data.author}</em>`;
     }
     catch(error){
        console.error("Error fetching quote:", error);
        quoteElement.innerHTML = "Sorry, couldn't fetch a quote. Please try again.";
     }
}

quoteButton.addEventListener('click', getQuote);
window.onload = getQuote;
