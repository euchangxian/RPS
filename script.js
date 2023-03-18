// Constant global variables.
const rock = "Rock";
const paper = "Paper";
const scissors = "Scissors";
const draw = "Draw"

// Initializes state of the game.
const player = {
  name: "Player",
  score: 0
};

const computer = {
  name: "Computer",
  score: 0
};

// Adds event listeners to buttons selection buttons.
const selections = document.querySelectorAll("#selections button");
selections.forEach(button => {
  button.addEventListener("click", () => {
    playRound(button.id, getComputerChoice());
  });
});

const restartButton = document.querySelector("#modal #restart");
restartButton.addEventListener("click", () => {
  restartGame();
});

// Avoid repeated query selects.
const announcerMessage = document.querySelector("#announcerMessage");

const playerChoiceImage = document.querySelector("#playerChoiceImage");
const computerChoiceImage = document.querySelector("#computerChoiceImage");
const playerChoice = document.querySelector("#playerChoice");
const computerChoice = document.querySelector("#computerChoice");

const playerScore = document.querySelector("#playerScore");
const computerScore = document.querySelector("#computerScore");
const modal = document.querySelector("#modal");
const message = document.querySelector("#modal #message");

// Functions
function playRound(playerSelection, computerSelection) {
  updateSelections(playerSelection,computerSelection);
  const winner = determineWinner(playerSelection, computerSelection);
  const resultString = formatResultString(winner, playerSelection, computerSelection);

  // updates html
  announceWinner(resultString);
  updateScore(winner);
  if (isGameOver()) {
    endGame(winner);
  }
}

function updateSelections(playerSelection, computerSelection) {
  playerChoice.textContent = playerSelection;
  computerChoice.textContent = computerSelection;
  updateChoiceImage(playerSelection, computerSelection);
}

function updateChoiceImage(playerSelection, computerSelection) {
  if (playerSelection === rock) {
    playerChoiceImage.src = "./assets/rock_paw.jpg";
  } else if (playerSelection === paper) {
    playerChoiceImage.src = "./assets/paper_paw.jpg";
  } else {
    playerChoiceImage.src = "./assets/scissors_paw.jpg";
  }
  
  if (computerSelection === rock) {
    computerChoiceImage.src = "./assets/rock_paw.jpg";
  } else if (computerSelection === paper) {
    computerChoiceImage.src = "./assets/paper_paw.jpg";
  } else {
    computerChoiceImage.src = "./assets/scissors_paw.jpg";
  }
}

function isGameOver() {
  return player.score === 5 || computer.score === 5;
}

function formatResultString(winner, playerSelection, computerSelection) {
  if (winner === draw) {
    return "Draw!";
  }
  if (winner === player) {
    return "You win! " + playerSelection + " beats " + computerSelection + "! :)";
  }
  return "You Lose! " + computerSelection + " beats " + playerSelection + "! :(";
}

function announceWinner(result) {
  announcerMessage.textContent = result;
}

function updateScore(winner) {
  if (winner === player) {
    player.score++;
    playerScore.textContent = player.score;
  } else if (winner === computer) {
    computer.score++;
    computerScore.textContent = computer.score
  } else {
    // if draw, do nothing.
  }
}

function determineWinner(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    return draw;
  }
  if (playerSelection === rock) {
    return computerSelection === scissors
      ? player
      : computer;
  }
  if (playerSelection === paper) {
    return computerSelection === rock
      ? player
      : computer;
  }
  if (playerSelection === scissors) {
    return computerSelection === paper
      ? player
      : computer;
  }
}

function getComputerChoice() {
  const randomSelection = [rock, paper, scissors]; 
  const random = Math.floor(Math.random() * randomSelection.length);
  return randomSelection[random];
}

function endGame(winner) {
  modal.style.display = "flex";
  if (winner === player) {
    message.textContent = "You win! :>";
  } else {
    message.textContent = "You lose... :<"
  }
}

function restartGame() {
  location.reload();
}