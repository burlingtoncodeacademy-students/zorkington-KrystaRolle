//readline interface
const readline = require("readline");
const { inspect } = require("util");
const readlineInterface = readline.createInterface(
  process.stdin,
  process.stdout
);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

//functions

const help = () => {
  return `
    Command Options
    help or h       - Display these instructions
    move go or enter- to move locations
    inspect or i    - look around room character is in or at item
    grab or g       - Grab specified object from the room
    drop or d       - Drop specified object from the bag
    bag or b        - Shows how much money your character has
    play or start   - start puzzle in room that player is in
    hint or h       - Gives you a hint when trying to solve a puzzle
    `;
};

//need function to filter words
let wordFilter = (prompt) => {
  let filteredWordsArr = prompt.toLowerCase().toString().trim().split(" ");
  //console.log(filteredWordsArr);
  return filteredWordsArr;
};

let movePlayer = (movementArr) => {
  const possibleMovement = roomStates[currentPlayerRoom];
  if (!possibleMovement.includes(movementArr[1])) {
    console.log(`I can't get there from here`)
  }
  else if (roomLookup[movementArr[1]].roomLocked) {
    console.log(
      `The door is locked. I need to figure out a way to open it...I'm stuck in the ${currentPlayerRoom} for now.`
    );
  } else if (possibleMovement.includes(movementArr[1])) {
    currentPlayerRoom = movementArr[1];
    console.log(
      `Status: You are now in the ${currentPlayerRoom}. ${roomLookup[currentPlayerRoom].roomDescription}`
    );
  } else {
    console.log(`I don't think that is right...`);
  }
};

let grabItem = (itemArr) => {
  if (roomLookup[currentPlayerRoom].roomInventory.includes(itemArr[1])) {
    let item = roomLookup[currentPlayerRoom].roomInventory[0];
    console.log(roomLookup[currentPlayerRoom].roomInventory[0]);
    console.log(item);
    mainCharacter.playerInventory.push(item);
    console.log(`You have picked up ${item}!`);
  }
};

let dropItem = (itemArr) => {
  if (mainCharacter.playerInventory.includes(itemArr[1])) {
    if (itemArr[1] === "paperclip") {
        console.log(`I don't want to drop my lucky paperclip!`)
    } else {
    roomLookup[currentPlayerRoom].roomInventory.push(itemArr[1]);
    console.log(`You have dropped the ${itemArr[1]}`);
  }} else {
    console.log(`I'm not sure of what item you are trying to drop`);
  }
};

let inspectElement = (inspectArr) => {
  if (currentPlayerRoom === inspectArr[1]) {
    console.log(
      `${roomLookup[currentPlayerRoom].roomDescription} and ${roomLookup[currentPlayerRoom].roomInventory}`
    );
  } else if ("bag" === inspectArr[1]) {
    if (mainCharacter.playerInventory.length === 0) {
      console.log(`You have nothing in your bag`);
    } else if (mainCharacter.playerInventory.length === 1) {
      console.log(`You only have a ${mainCharacter.playerInventory[0]}`);
    } else if (mainCharacter.playerInventory.length === 2) {
      console.log(`You have ${mainCharacter.playerInventory[0]} and ${mainCharacter.playerInventory[1]}`);
    }
  } else if ("wallet" === inspectArr[1]) {
    if (!mainCharacter.playerWallet) {
      console.log(`You are broke! You have no coins`);
    } else {
      console.log(`You have ${mainCharacter.playerWallet} coins.`);
    }
  } else {
    console.log(`I'm not sure what you are trying to inspect`);
  }
};

class Player {
  constructor(playerInventory, playerStatus, playerWallet) {
    this.playerInventory = playerInventory;
    this.playerStatus = playerStatus;
    this.playerWallet = playerWallet;
    // this.totalValue = this.playerInventory.filter((playerInventory) =>playerInventory)
    //                         .map((playerInventory) => +playerInventory)
    //                         .reduce((sum, current) => sum + current);
    //                         console.log(this.totalValue)
    //                       }
  }
}
class Room {
  constructor(roomName, roomDescription, roomInventory, roomLocked) {
    this.roomName = roomName;
    this.roomDescription = roomDescription;
    // this.roomConnection = roomConnection;
    this.roomInventory = roomInventory;
    this.roomLocked = roomLocked;
  }
}

class Item {
  constructor(name, stat, type) {
    this.name = name;
    this.state = stat;
    this.type = type;
  }
}
class Puzzle {
  constructor(
    puzzleDescription,
    puzzleHint,
    puzzleSolution,
    puzzleMachine,
    puzzleRoom,
    puzzleSolved,
    puzzlePrize
  ) {
    this.puzzleDescription = puzzleDescription;
    this.puzzleHint = puzzleHint;
    this.puzzleSolution = puzzleSolution;
    this.puzzleMachine = puzzleMachine;
    this.puzzleRoom = puzzleRoom;
    this.puzzleSolved = puzzleSolved;
    this.puzzlePrize = puzzlePrize;
    //   signPuzzle: () => {
    //     return this.puzzle
    //   }
  }
}

async function guessMyNumber() {
  let totalGuesses = 0;
  let guessesLeft = 7;
  let solution = Math.floor(Math.random() * 101) + 1;
  console.log(
    `I'm going to choose a number between 1 and 100. Guess my number in less then 7 tries to win a prize.`
  );
  while (totalGuesses < 7) {
    numbers.puzzleSolved = false;
    totalGuesses++;
    guessesLeft--;
    let answer = await ask("Guess?");
    if (solution === parseInt(answer)) {
      console.log("Lucky guess, here is your prize!");
      mainCharacter.playerWallet += 10;
      numbers.puzzleSolved = true;
      employees.roomLocked = false;
      return "You got 10 coins!";
    } else if (solution < parseInt(answer)) {
      console.log(
        `No, that number is too high, guess lower. You have ${guessesLeft} guesses left`
      );
    } else if (solution > parseInt(answer)) {
      console.log(
        `No no, that number is too low, guess higher. You have ${guessesLeft} guesses left`
      );
    } else if (answer === "hint") {
      console.log(numbers.puzzleHint);
    }
  }
  return "That was your last guess. I win.";
}
//maybe include timer?

async function riddles() {
  let totalGuesses = 0;
  let guessesLeft = 3;
  console.log(
    "Welcome to Red's Riddles. If you win you get a prize, if not you lose try again later. You only get 3 guesses. The answer can only be one word"
  );
  while (totalGuesses < 3) {
    totalGuesses++;
    guessesLeft--;
    let answer = await ask(riddle.puzzleDescription);
    if (answer === riddle.puzzleSolution[0]) {
      mainCharacter.playerWallet += mainCharacter.playerWallet + 10;
      bathroom.roomLocked = false;
      riddle.puzzleSolved = true;
      return `You win ${riddle.puzzlePrize} coins! I wonder what I can do with this...You hear a loud noise coming from the arcade.`;
    } else if (answer !== riddle.puzzleSolution[0]) {
      console.log(
        `No thats not it. Try again. You have ${guessesLeft} guesses left`
      );
    }
  }
  return "Your out of guesses. You lose :P. You back away from the machine";
}

async function code() {
  let totalGuesses = 0;
  console.log(coded.puzzleDescription);
  console.log("What is the combination?");
  coded.puzzleSolved = false;
  while (totalGuesses < 20) {
    totalGuesses++;
    let answer = await ask(`?`);
    if (parseInt(answer) === coded.puzzleSolution) {
      employees.roomInventory.push(statue.name);
      console.log(employees.roomInventory);
      bowling.roomLocked = false;
      employees.roomLocked = true;
      coded.puzzleSolved = true;
      return `The machine drops a shiny ${statue.name}. I should grab the statue before I move to the bowling.`;
    } else if (answer === "hint" && totalGuesses <= 2) {
      console.log(coded.puzzleHint[0]);
    } else if (answer === "hint" && totalGuesses <= 5) {
      console.log(coded.puzzleHint[1]);
    } else if (answer === "hint" && totalGuesses < 6) {
      console.log(coded.puzzleHint[2]);
    } else {
      console.log(`That is not the right combination`);
    }
  }
  console.log("Maybe I should take a break...You step away from the machine");
}

async function bowlingTask() {
  console.log("bowling alley task");
  while (currentPlayerRoom !== "exit") {
    let answer = await ask(`?`);
    let filteredResponseArr = wordFilter(answer);
    if (
      commandTable.drop.includes(filteredResponseArr[0]) &&
      filteredResponseArr[1] === statue.name
    ) {
      dropItem(filteredResponseArr);
      currentPlayerRoom = "exit";
      console.log(exit.roomDescription);
      return "You are now able to exit. You escaped";
    } else if (answer === "hint"){
      console.log("I guess I need to drop something on this scale.")  
    }else console.log("I don't think that's right...");
  }
}

let numbers = new Puzzle(
  `The machine lights up and says, I'm going to choose a number between 1 and 100. Guess my number in less then 7 tries to win a prize.`,
  "Try to guess a number between the minimum and maxiumum of possible guesses.",
  false,
  "big blue machine",
  "bathroom",
  false,
  10
);

let riddle = new Puzzle(
  ["What color can you eat?"],
  ["Start thinking of fruits"],
  ["orange"],
  [
    "big red machine thats says Riddles on the side. Maybe I should play riddles when I have the time...",
  ],
  "kitchen",
  false,
  10
);
let coded = new Puzzle(
  ["You see a 3 digit combination lock in front of you. Solve the combination"],
  ["Hint: Address", "I'll give you another hint in a couple more turns", "182"],
  182,
  ["claw machine with 3 code side by side inside"],
  "employees",
  false,
  10
);

//creating the objects
let mainCharacter = new Player(["paperclip"], "broke", 0);
let statue = new Item("statue", true, "exit");

let arcade = new Room(
  "arcade",
  "you now notice that you are in an abandoned arcade area. From here, you can see 3 doors with 3 signs over them. One says bathroom, another says kitchen, the last one says employees",
  [],
  false
);
let kitchen = new Room(
  "kitchen",
  `You see piles of old pizza trays and dirty pots. In the corner you see a ${riddle.puzzleMachine}. ***Remember, from here you can go back to the arcade.`,
  [],
  false
);
let employees = new Room(
  "employees",
  "You enter into a room full or dust and filth. You see a big statue behind a glass case. The glass case has a combination on it that says coded. Behind the glass case, a sign says bowling by the door. Maybe I should play coded when I have time. from here you can go back to the arcade",
  [],
  true
);
let bathroom = new Room(
  "bathroom",
  `you see multiple stalls. you start to open each of them and see ${numbers.puzzleMachine} that says numbers where a toilet should be. Maybe I should play numbers when I get the chance... ***Remember, from here you can go back to the arcade`,
  [],
  true
);

let bowling = new Room(
  "bowling",
  "You step into a bright bowling. You see a scale sitting with a weight on one side of the unbalanced scale. You feel like you should drop something on it. The doors of the bowling close behind you. Looks like I'm stuck here until I figure this out. I guess I should play this scale puzzle.",
  [],
  true
);

let exit = new Room(
  "exit",
  "You see a door open beside the last lane of the bowling. You walk towards it and leave. You are now outside the house. You win!",
  [],
  true
);

let roomStates = {
  arcade: ["kitchen", "employees", "bathroom"],
  kitchen: ["arcade"],
  employees: ["arcade", "bowling"],
  bathroom: ["arcade"],
  bowling: ["bowling", "exit"],
};

//lookup table
roomLookup = {
  arcade: arcade,
  kitchen: kitchen,
  employees: employees,
  bathroom: bathroom,
  bowling: bowling,
  exit: exit,
};

commandTable = {
  move: ["go", "move", "enter"],
  grab: ["grab", "g"],
  drop: ["drop", "d"],
  inspect: ["inspect", "i"],
  bag: ["bag", "b"],
  play: ["play", "start"],
};

itemTable = {
  statue: ["statue"],
};

let currentPlayerRoom = "arcade";

//start

start();
//async function
async function start() {
  const welcomeMessage = `Welcome to Escape The Abandoned Puzzle Arcade on 182 Main St. 
  You play by typing in an action followed by a location or item.(for example: move kitchen or grab paperclip).
  You can type help at any time if you need to see these commands again. Or you can type hint during any puzzle to get help with a game.
  ${help()}
  There is a door here. You enter inside. ${arcade.roomDescription} `;
  console.log(welcomeMessage);
  while (currentPlayerRoom !== "exit") {
    let response = await ask(`What do you want to do now? `);
    let filteredResponseArr = wordFilter(response);
    if (commandTable.move.includes(filteredResponseArr[0])) {
      movePlayer(filteredResponseArr);
    } else if (commandTable.grab.includes(filteredResponseArr[0])) {
      grabItem(filteredResponseArr);
    } else if (commandTable.drop.includes(filteredResponseArr[0])) {
      dropItem(filteredResponseArr);
    } else if (commandTable.inspect.includes(filteredResponseArr[0])) {
      inspectElement(filteredResponseArr);
    } else if (
      filteredResponseArr.includes("help") ||
      filteredResponseArr.includes("h")
    ) {
      help();
    } else if (commandTable.play.includes(filteredResponseArr[0])) {
      if (filteredResponseArr[1] === "numbers" && !numbers.puzzleSolved) {
        let response = await guessMyNumber();
        console.log(response);
      } else if (filteredResponseArr[1] === "riddles" && !riddle.puzzleSolved) {
        let response = await riddles();
        console.log(response);
      } else if (filteredResponseArr[1] === "coded" && !coded.puzzleSolved) {
        let response = await code();
        console.log(response);
      } else if (filteredResponseArr[1] === "scale") {
        let response = await bowlingTask();
        console.log(response);
        process.exit();
      } else {
        console.log(`I don't want to play that right now`);
      }
    } else {
      console.log(`Not sure how to do that...`);
    }
  }
}

//blackjack
//puzzle return key
//guess my number
//points system for collecting random treasure for replay value
//room of riddles
//escape the puzzle house
//cards room
//blackjack room
//certain amount of coins to unlock each puzzle
//sign in arcade that says you need _ amount of coins to exit mystery house
//if coins available in the game go below a certain amount then player loses
//can't drop paperclip
//rename all rooms
//finish story
//check for bugs
//optional
//color code
