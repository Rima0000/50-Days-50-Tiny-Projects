const result = document.querySelector(".result");
const output1 = document.querySelector("#output-1");
const output2 = document.querySelector("#output-2");
const playBtn = document.querySelector(".play-btn");
const reset = document.querySelector(".reset-btn");

let winCount1 = 0;
let winCount2 = 0;

playBtn.addEventListener("click", function () {
  function getRandomInt(min, max) {
    let randomNum1 = Math.floor(Math.random() * (max - min + 1)) + min;
    let randomNum2 = Math.floor(Math.random() * (max - min + 1)) + min;
    output1.innerHTML = randomNum1;
    output2.innerHTML = randomNum2;

    showResult(randomNum1, randomNum2);
  }

  function showResult(randomNum1, randomNum2) {
    if (randomNum1 > randomNum2) {
      ++winCount1;
      result.innerHTML = `Player-1 Wins ! ${winCount1} times`;
    } else if (randomNum1 < randomNum2) {
      ++winCount2;
      result.innerHTML = `Player-2 Wins ! ${winCount2} times`;
    } else {
      result.innerHTML = "Draw!";
    }
  }

  getRandomInt(1, 6);
});

reset.addEventListener("click", function () {
  output1.innerHTML = "-";
  output2.innerHTML = "-";
  result.innerHTML = "Start Game";
  winCount1 = 0;
  winCount2 = 0;
});
