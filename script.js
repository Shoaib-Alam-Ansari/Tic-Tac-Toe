// Selecting all elements with the class "box" and storing them in the variable 'boxes'
let boxes = document.querySelectorAll(".box");

// Storing the element with the ID "tic_toc_game" in the variable 'game'
let game = document.getElementById("tic_toc_game");

// Storing the element with the class "reset" in the variable 'resetbtn'
let resetbtn = document.querySelector(".reset");

// Storing the element with the class "winner_container" in the variable 'winner_container'
let winner_container = document.querySelector(".winner_container");

// Storing the element with the class "msg" in the variable 'msg'
let msg = document.querySelector(".msg");

// Storing the element with the class "newGame" in the variable 'newGame'
let newGame = document.querySelector(".newGame");

// Storing the element with the class "indicator_o" in the variable 'indicator_o'
let indicator_o = document.querySelector(".indicator_o");

// Storing the element with the class "indicator_x" in the variable 'indicator_x'
let indicator_x = document.querySelector(".indicator_x");

// Initializing a variable 'turn0' to true, indicating it's player O's turn
let turn0 = true;

// Array defining the winning patterns in tic-tac-toe
let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Variable to keep track of the number of moves made
let count = "";

// Adding click event listeners to each box
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // Incrementing the count of moves
    count ++;

    // Checking whose turn it is and updating the box accordingly
    if (turn0) {
      box.innerText = "O";
      indicator_x.style.display = "block";
      indicator_o.style.display = "none";
      box.style.color = "#000";
      turn0 = false;
    } else {
      box.innerText = "X";
      box.style.backgroundColor = "#ff0088";
      box.style.color = "#000";
      indicator_o.style.display = "block";
      indicator_x.style.display = "none";
      turn0 = true;
    }

    // Disabling the clicked box to prevent further clicks
    box.disabled = true;

    // Checking if the game has resulted in a draw
    if(count == 9){
      drawGame();
    }

    // Checking if there's a winner after each move
    cheakWinner();

    // Playing audio on each move
    playAudio();
  });
});

// Function to check if there's a winner based on the winning patterns
let cheakWinner = () => {
  for (let pattern of winningPattern) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
      }
    }
  }
};

// Function to display the winner and disable further moves
let showWinner = (winner) => {
  disabledBoxes();
  msg.innerText = `Congratulation Winner is  ${winner}`;
  winner_container.classList.remove("hide");
};

// Function to declare a draw and end the game
const drawGame = () => {
  msg.innerText = `Game Has Been Draw`;
  winner_container.classList.remove("hide");
};

// Function to disable all boxes after the game ends
let disabledBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

// Function to enable all boxes and reset the game
let enabledBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.style.backgroundColor = "#dddbeb";
  }
};

// Function to reset the entire game
const resetGame = () => {
  indicator_x.style.display = "none";
  indicator_o.style.display = "block";
  game.style.display = "block";
  turn0 = true;
  winner_container.classList.add("hide");
  enabledBoxes();
  count = 0;
};

// Adding click event listeners to reset button and new game button
resetbtn.addEventListener("click", resetGame);
newGame.addEventListener("click", resetGame);

// Function to play audio on each move
function playAudio (){
  let audio = new Audio("mixkit-opening-software-interface-2578.wav");
  audio.play()
}
