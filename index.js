const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}
//creating class constructors
class Player {
  constructor (playerInventory, playerStatus){
    this.playerInventory = playerInventory
    this.playerStatus = playerStatus
  }
}
class Room {
  constructor (roomDescription, roomConnection, roomInventory) {
    this.roomDescription = roomDescription
    this.roomConnection = roomConnection
    this.roomInventory = roomInventory
  }
}
//creating constructors
let mainCharacter = new Player (
  [],
  'living room'
)
let livingRoom = new Room(
  "livingRoom",
  "you are at the livingRoom, from here you can go to any of the other rooms",
  []
);
let kitchen = new Room(
  "kitchen",
  "you are at the kitchen, from here you can go to any of the other rooms",
  []
);
let bedroom = new Room(
  "bedroom",
  "you are at the bedroom, from here you can go to any of the other rooms",
  []
);
let bathroom = new Room(
  "bathroom",
  "you are at the bathroom, from here you can go to any of the other rooms",
  []
);
// class OtherRooms {
  //   constructor (roomDescription, roomConnection, roomInventory) {
    //     this.roomDescription = roomDescription
    //     this.roomConnection = roomConnection
    //     this.roomInventory = roomInventory
//   }
// }

let roomStates = {
  livingRoom: ['kitchen', 'bedroom', 'bathroom'],
  kitchen: ['livingRoom'],
  bedroom: ['livingRoom'],
  bathroom: ['livingRoom']
}
//lookup table
roomLookup = {
  livingRoom: livingRoom,
  kitchen: kitchen,
  bedroom: bedroom,
  bathroom: bathroom
}

let currentPlayerRoom = 'livingRoom';
start();

async function start() {

  const welcomeMessage = `182 Main St.
You are standing on Main Street between Church and South Winooski.
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign.`;
console.log(welcomeMessage)
while (currentPlayerRoom !== 'exit') {
  let response = await ask(`Where do you want to go? `);
  if (response === 'look') {
lookAround()
  } else {
moveRooms(response) 
}
}
//} else {
  //process.exit();
//}

}
//creating the objects, new keyword hooks into the constructor 

//set first area player is in

//function that changes where player is located
const moveRooms = (room) => {
const possibleMovement = roomStates[currentPlayerRoom];
 if (!possibleMovement.includes(room)){
   console.log("Idk how to do that")
  }
  else {
  currentPlayerRoom = room
  this.playerStatus = room
  console.log(`You are now in the ${currentPlayerRoom}`)
}
}

const lookAround = () => {
  console.log(roomLookup[currentPlayerRoom].roomConnection)
}

console.log(currentPlayerRoom)
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