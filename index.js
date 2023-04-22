const readline = require("readline");
const readlineInterface = readline.createInterface(
  process.stdin,
  process.stdout
);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}
//creating class constructors
class Player {
  constructor(playerInventory, playerStatus) {
    this.playerInventory = playerInventory;
    this.playerStatus = playerStatus;
  }
}
class Room {
  constructor(roomDescription, roomConnection, roomInventory, roomLocked) {
    this.roomDescription = roomDescription;
    this.roomConnection = roomConnection;
    this.roomInventory = roomInventory;
    this.roomLocked = roomLocked;
  }
}
class Item {
  constructor(nam, stat) {
    this.name = nam;
    this.state = stat;
  }
}
//creating constructors
let mainCharacter = new Player([3, 7], "living room");
let livingRoom = new Room(
  "livingRoom",
  "you are at the livingRoom, from here you can go to any of the other rooms",
  [2],
  false
);
let kitchen = new Room(
  "kitchen",
  "you are at the kitchen, from here you can go to any of the other rooms",
  [5],
  true
);
let bedroom = new Room(
  "bedroom",
  "you are at the bedroom, from here you can go to any of the other rooms",
  [7],
  true
);
let bathroom = new Room(
  "bathroom",
  "you are at the bathroom, from here you can go to any of the other rooms",
  [4],
  true
);
// class OtherRooms {
//   constructor (roomDescription, roomConnection, roomInventory) {
//     this.roomDescription = roomDescription
//     this.roomConnection = roomConnection
//     this.roomInventory = roomInventory
//   }
// }

let roomStates = {
  livingRoom: ["kitchen", "bedroom", "bathroom"],
  kitchen: ["livingRoom"],
  bedroom: ["livingRoom"],
  bathroom: ["livingRoom"],
};
//lookup table
roomLookup = {
  livingRoom: livingRoom,
  kitchen: kitchen,
  bedroom: bedroom,
  bathroom: bathroom,
};

const help = () => {
  return `
  Command Options
  
  help            - Display these instructions
  look            - Look around room character is in
  go direction    - Go in the specified direction. Read room description to understand where you can go.
  grab or g       - Grab specified object from the room
  drop or d       - Drop specified object from the bag
  inventory or i  - Shows how much money your character has
  `
  }

let currentPlayerRoom = "livingRoom";
start();

async function start() {
  const welcomeMessage = `Welcome to Escape 182 Main St. ${help()}
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign.`;
  console.log(welcomeMessage);
  while (currentPlayerRoom !== "exit") {
    let response = await ask(`Where do you want to go? `);
    if (response === "look") {
      lookAround();
    } else if (response === "inventory" || response === "i") {
      inventory();
    } else if (response === "g" || response === "grab") {
      grab();
    } else if (response === "d" || response === "drop") {
      drop();
    } else {
      let roomIsLocked = moveRooms(response);
      if (roomIsLocked) {
        let result = await puzzle(response);
        console.log(result);
      }
    }
  }
  //} else {
  //process.exit();
  //}
}
async function puzzle(room) {
  if (room === "kitchen") {
    let solution = 366;
    let answer = "";
    console.log(
      "I see a 3 number combination lock on the kitchen door. Above it is a sign that reads..."
    );
    while (answer !== 366 || answer !== "quit") {
      answer = await ask(`How many days are in a leap year?`);
      if (solution === parseInt(answer)) {
        roomLookup[room].roomIsLocked === false;
        console.log(`The ${room} door is unlocked`);
        currentPlayerRoom = room;
        return `Puzzle solved. You are now in the ${currentPlayerRoom}`;
      } else if (answer === "quit") {
        return `You give up on the puzzle for now`;
      } else {
        console.log(`wrong answer. Type quit or try again.`);
      }
    }
  }
}
//creating the objects, new keyword hooks into the constructor

//set first area player is in

//function that changes where player is located


const moveRooms = (room) => {
  const possibleMovement = roomStates[currentPlayerRoom];
  if (!possibleMovement.includes(room)) {
    console.log("Idk how to do that");
  } else if (roomLookup[room].roomLocked) {
    console.log(`This door is locked...I need to figure out how to open it`);
    return true;
  } else {
    currentPlayerRoom = room;
    this.playerStatus = room;
    console.log(`You are now in the ${currentPlayerRoom}`);
  }
};

const lookAround = () => {
  console.log(
    `${roomLookup[currentPlayerRoom].roomConnection}. You also see ${roomLookup[currentPlayerRoom].roomInventory} dollars`
  );
};

const count = () => {
  let sum = 0;
  for (const wallet of mainCharacter.playerInventory) {
    sum += wallet;
  }
  return sum;
};

const inventory = () => {
  let sum = count();
  console.log(`You now have ${sum} dollars`);
};

const grab = () => {
  let item = roomLookup[currentPlayerRoom].roomInventory.pop();
  mainCharacter.playerInventory.push(item);
  inventory();
};

const drop = () => {
  let item = roomLookup[currentPlayerRoom].roomInventory.pop();
  mainCharacter.playerInventory.pop(item);
  inventory();
};

console.log(`You are currently located in the ${currentPlayerRoom}`);
//Required Object Classes
//Current Room
//-room description immutable
//room connection immuntable (what rooms it can access)
//room inventory mutable
//Vacant Rooms
//Current Room
//-room description immutable
//room connection immuntable (what rooms it can access)
//room inventory mutable
//Player
//player inventory mutable
//player status mutable (current location?)

//Each room has
//limited number of other rooms to connect with
//unique description
//seperate inventory, it can be empty
//optional to add puzzles, locked doors, and interactive
//items

//Object classes for items
// let sign = {
//   description: "Welcome to the classroom! Come on up to the third floor.\nIf the door is locked, use the code 12345."
//   read: () => {
//     return this.description
//   }
// }
//items list possibilities:

//create state machine to represent room transitions
//make a lookup table for all transitions

//Develop story
//3 rooms

//Algorithm
//Loop for all main character answers

//additional
//add color text in console
//have a status line at the bottom of the
// screen showing room name
//final puzzle that determines win or lose game
//word wrapping function

//conditional for if bag is empty or has items
//bag limit on items

//function to grab item
//function to drop item
