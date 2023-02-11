# Frontend Mentor - Connect Four game

## Table of contents

- [Overview](#overview)
  - [Expected behavior](#expected-behavior)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [Built with](#built-with)

## Overview

Your challenge is to build out this Connect Four game and get it looking as close to the design as possible.

You can use any tools you like to help you complete the challenge. So if you've got something you'd like to practice, feel free to give it a go.

Your users should be able to:

- View the game rules
- Play a game of Connect Four against another human player (alternating turns on the same computer)
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- **Bonus**: See the discs animate into their position when a move is made
- **Bonus**: Play against the computer

### Expected behavior

- The initial screen should be the Main Menu. Note that if you want your solution screenshot to match the design, we recommend first submitting the solution showing the game in a clean state. Then editing your solution so that the Main Menu shows on the first load. Otherwise, the design comparison slider will show the Main Menu instead of the game board.
  - If you're not doing the bonus with the vs CPU option, simply remove that item from the Main Menu.
- Player 1 goes first in the first game. The first turn then alternates in subsequent games.
- When a player wins a round, the win state is shown, and the winning player's score is incremented by 1.
- Each player has 30 seconds to take their turn. The counter counts down in real time. If it reaches zero, the win state is shown for the other player and their score is incremented by 1.
- Clicking the Menu button on the game board opens up the Ingame Menu.
  - Clicking Quit Game from the Ingame Menu navigates to the Main Menu.
- Clicking the Restart button on the game board resets both players' scores to zero.

### Screenshot

Solution screenshot
![](solution/screenshots.png)

### Links

- Live Site URL: [frontend-mentor-connect-four.vercel.app](https://frontend-mentor-connect-four.vercel.app/)

## Built with

- [React](https://reactjs.org/)
- React Router
- SASS/SCSS
- CSS3
