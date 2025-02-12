# Tic Tac Toe Game

## Overview
This is a simple implementation of the classic Tic Tac Toe game, where two players take turns marking spaces in a 3x3 grid with either "X" or "O". The game ends when one player wins, or when the grid is full (a draw).

This repository contains both the game logic and automated tests to validate the functionality of the Tic Tac Toe game. The automated tests ensure that the game runs correctly and that all edge cases are handled, including player moves, win conditions, and game state.

## Features
- *2-Player Mode:* Two players take turns.
- *Win Condition:* The game checks for winning conditions (horizontal, vertical, diagonal).
- *Draw Condition:* The game detects a draw when no moves are left.
- *Reset:* The game can be reset after it ends (win or draw).
- *Game History:* The game is showing game history
- *Move back:* The game allows to go back to previous move
- *Automated Tests:* Automated tests verify game logic, player moves, history, move back and victory conditions.

## Setup and Installation

1. *Clone the Repository:*

    bash
    git clone https://github.com/ansn05/tic-tac-main.git
    cd tic-tac-toe
    

2. *Install Dependencies:*

    ## Depending on your programming language and testing framework, install the necessary dependencies:

    Go to directory with qa-task-main:
    Install dependencies:
    ```sh
    npm install
    ```

    Go to directory with tic-tac-tests:
    Install dependencies:
    npm install
    npm init
    npx playwright@latest install

3. *Run the Game:*

    To start the game, run the following command in qa-task-main pwsh:

    npm run dev

    
## Automated Testing

The Tic Tac Toe game includes automated tests for various game scenarios. The tests validate key aspects of the game, such as:
- *Player Moves:* Ensures that each player alternates turns and that invalid moves (e.g., making a move on an already occupied square) are prevented.
- *Win Conditions:* Ensures that the game correctly detects horizontal, vertical, and diagonal wins.
- *Draw Condition:* Verifies that a draw is correctly identified when no moves are left and no player has won.
- *Edge Case Handling:* Tests edge cases such as invalid input, full board detection, and restarting the game.

To run the automated tests:

1. *Playwright tests:*

    pwsh
    npx playwright test
    
## Game Logic

### Main Classes and Functions:
- Game: The main game logic class, responsible for handling the board state, player turns, and win/draw conditions.
- Player: A class that represents a player in the game, storing their name and symbol ("X" or "O").
- Board: The class that represents the 3x3 board and checks for the win or draw conditions.

### Key Methods:
- make_move(player, position): Makes a move for the current player on the given position.
- check_win(): Checks the current state of the board for a win.
- check_draw(): Checks if the game is a draw.
- reset(): Resets the board for a new game.

- verifyAllSquaresEmpty()
- playAndVerifyMoves(): Makes a move for the current player on the given position and check move status and turn status.
- playAndVerifyHistoryMoves()
- async goBackToPreviousTurn()
  
