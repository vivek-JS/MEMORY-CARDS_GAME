const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let playerName = "";
let counter = 0;
function flipCard() {
  document.getElementById("flipAudio").play();
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add("flip");
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.fruit === secondCard.dataset.fruit;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  document.getElementById("correctAudio").play();
  counter++;
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
  if (counter == 6) {
    document.getElementById("startAudio").pause();
    document.getElementById("gamewinAudio").play();
    var time = document.getElementById("timer").innerText;
    alert(
      `CONGRATULATIONS ${playerName}...You have completed task in  ${time}`
    );
    location.reload();
  }
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));

function getNamne() {
  console.log("hii");

  document.getElementById("startAudio").play();
  playerName = document.getElementById("exampleFormControlInput1").value;
  console.log(playerName);

  startTimer();
}
const timer = document.getElementById("timer");
var hr = 0;
var min = 0;
var sec = 0;
var stoptime = true;
function startTimer() {
  timerCycle();
}

function timerCycle() {
  sec = parseInt(sec);
  min = parseInt(min);
  hr = parseInt(hr);
  sec = sec + 1;
  if (sec == 60) {
    min = min + 1;
    sec = 0;
  }
  if (min == 60) {
    hr = hr + 1;
    min = 0;
    sec = 0;
  }
  if (sec < 10 || sec == 0) {
    sec = "0" + sec;
  }
  if (min < 10 || min == 0) {
    min = "0" + min;
  }
  if (hr < 10 || hr == 0) {
    hr = "0" + hr;
  }
  timer.innerHTML = hr + ":" + min + ":" + sec;
  setTimeout("timerCycle()", 1000);
}
