import { Card } from '../data/models/card';
import { List } from '../data/models/list';

const toDo = new List("To Do");
toDo.cards = [
  new Card(
    "Implement renaming lists",
    "Expected result - possibility to change the name of the list"
  ),
  new Card(
    "Implement adding cards",
    "Expected result - possibility to create new cards"
  ),
  new Card(
    "Implement removing cards",
    "Expected result - possibility to delete the card when button is clicked"
  ),
  new Card(
    "Implement card title renaming",
    "Expected result - possibility to change the card title"
  ),
  new Card(
    "Implement card description renaming",
    "Expected result - possibility to change the card description"
  ),
  new Card(
    "Implement card copying",
    'Expected result - possibility to copy card. Should be implemented using Prototype pattern. Id should be new for a new card. The name of the card should have "copy" suffix'
  ),
  new Card(
    "Implement logging on server side",
    "Expected result - implemented logging with 3 levels: info, warn, error. Should be implemented using Observer pattern. There should be 2 loggers: first will write only errors into console, second will write all logs into file"
  ),
  new Card(
    "Implement logging of reorder action",
    "Expected result - implemented logging for the ReorderService (logging proxy). Should be implemented using Proxy pattern. Should be logged for each card/list with the info when it was moved"
  ),
];

const inProgress = new List("In Progress");
inProgress.cards = [
  new Card(
    "Implement adding lists",
    "Expected result - possibility to create a new list"
  ),
];

export const lists = [toDo, inProgress];
