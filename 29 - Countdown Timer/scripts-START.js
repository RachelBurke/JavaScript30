let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");

/*
    function timer(seconds) {
        set interval(function() {
            seconds--;
        }, 1000);
    }
*/

function timer(seconds) {
  // clear any existing timers
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000; //convert seconds to miliseconds
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000); // converting to seconds
    // check if we should stop it!
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    // display it
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const hours = Math.floor(seconds / 3600);
  let remainderSeconds = seconds % 3600;
  const minutes = Math.floor(remainderSeconds / 60);
  remainderSeconds = remainderSeconds % 60;
  const display = `${hours < 10 ? "0" : ""}${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}:${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}`; //pad with 0
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour; //adjust the hour not 24-h time
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back At ${adjustedHour}:${
    minutes < 10 ? "0" : ""
  }${minutes} ${hour > 12 ? "PM" : "AM"}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener("click", startTimer));
document.customForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  console.log(mins);
  timer(mins * 60);
  this.reset();
});
