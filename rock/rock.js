const readline = require("readline");

let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function getHumanChoice() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question("Rock, Paper, Scissors: ", (answer) => {
      rl.close();
      resolve(answer.toLowerCase());
    });
  });
}

function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    return "tie";
  } else if (
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper")
  ) {
    humanScore++;
    return "human";
  } else {
    computerScore++;
    return "computer";
  }
}

async function playGame() {
  for (let rounds = 0; rounds < 5; rounds++) {
    const humanSelection = await getHumanChoice();
    const computerSelection = getComputerChoice();
    const winner = playRound(humanSelection, computerSelection);
    console.log(`Round ${rounds + 1}: `);
    console.log(`Human: ${humanSelection}`);
    console.log(`Computer: ${computerSelection}`);
    console.log(`Winner: ${winner}`);
  }

  if (humanScore > computerScore) {
    console.log("Human wins!");
  } else if (humanScore < computerScore) {
    console.log("Computer wins!");
  } else {
    console.log("It's a tie!");
  }
}

// Start the game
playGame();
