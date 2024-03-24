#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.bold.bgCyan.white(" Colorful Number Guessing Game "));
console.log(chalk.yellow("=============================================="));
console.log(chalk.cyan("Guess the correct number between 1 and 50."));

// Function for random number
function generateRandomNumber(): number {
  return Math.floor(Math.random() * 50 + 1);
}

let randomNumber: number = generateRandomNumber();

//  number attempts
const attempts: number = 5;
console.log(`You have ${attempts} attempts to guess it.`);

// Function to calculate factorial
function factorial(n: number): number {
  if (n === 0 || n === 1) {
    return 1;
  } else {
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  }
}

// Function to restart the game
const restartGame = async () => {
  const restartAnswer = await inquirer.prompt([
    {
      message: "Do you want to play again? (yes/no):",
      type: "input",
      name: "restart",
    },
  ]);

  if (restartAnswer.restart.toLowerCase() === "yes") {
    console.log(chalk.yellow("Restarting the game..."));
    randomNumber = generateRandomNumber(); // new random number
    mainGameLoop(); // Restart the game
  } else {
    console.log(chalk.blue("Thanks for playing! Goodbye!"));
  }
};

// Main game loop
const mainGameLoop = async () => {
  for (let index = 1; index <= attempts; index++) {
    // Get input from the user using inquirer
    const answerUser = await inquirer.prompt([
      {
        message: "Guess the number:",
        type: "number",
        name: "guessedNumber",
      },
    ]);

    // Check if the guess is correct
    if (answerUser.guessedNumber === randomNumber) {
      console.log(
        chalk.green("Congratulations! You've guessed the correct number!")
      );
      restartGame(); // Ask if the user wants to play again
      break;
    }

    // Provide hints
    if (answerUser.guessedNumber > randomNumber) {
      console.log(chalk.red("Too high! Try again."));
    } else {
      console.log(chalk.red("Too low! Try again."));
    }

    // Show remaining attempts
    if (answerUser.guessedNumber !== randomNumber && index < attempts) {
      console.log(chalk.yellow(`You have ${attempts - index} attempts left.`));
    }

    // Game over if all attempts are used
    if (attempts === index) {
      console.log(chalk.red("Game over! You've run out of attempts."));
      console.log(
        chalk.blue(
          `The correct number was ${randomNumber}. Better luck next time!`
        )
      );
      restartGame(); // Ask if the user wants to play again
    }
  }
};

// Start the game
mainGameLoop();
