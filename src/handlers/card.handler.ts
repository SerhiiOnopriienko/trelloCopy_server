import type { Socket } from "socket.io";
import { randomUUID } from "crypto";

import { CardEvent } from "../common/enums/enums";
import { Card } from "../data/models/card";
import { SocketHandler } from "./socket.handler";
import { List } from "../data/models/list";

class CardHandler extends SocketHandler {
  public handleConnection(socket: Socket): void {
    socket.on(CardEvent.CREATE, this.createCard.bind(this));
    socket.on(CardEvent.REORDER, this.reorderCards.bind(this));
    socket.on(CardEvent.RENAME, this.renameCard.bind(this));
    socket.on(CardEvent.DELETE, this.deleteCard.bind(this));
    socket.on(CardEvent.CHANGE_DESCRIPTION, this.changeDescription.bind(this));
    socket.on(CardEvent.DUPLICATE, this.duplicateCard.bind(this));
  }

  public createCard(listId: string, cardName: string): void {
    const newCard = new Card(cardName, "");
    const lists = this.db.getData();

    const updatedLists = lists.map((list) =>
      list.id === listId ? list.setCards(list.cards.concat(newCard)) : list
    );

    this.db.setData(updatedLists);
    this.updateLists();
  }

  private reorderCards({
    sourceIndex,
    destinationIndex,
    sourceListId,
    destinationListId,
  }: {
    sourceIndex: number;
    destinationIndex: number;
    sourceListId: string;
    destinationListId: string;
  }): void {
    const lists = this.db.getData();
    const reordered = this.reorderService.reorderCards({
      lists,
      sourceIndex,
      destinationIndex,
      sourceListId,
      destinationListId,
    });
    this.db.setData(reordered);
    this.updateLists();
  }

  private renameCard({
    listId,
    cardId,
    newName,
  }: {
    listId: string;
    cardId: string;
    newName: string;
  }) {
    const lists = this.db.getData();
    const updatedLists = lists.map((list) => {
      if (list.id === listId) {
        const updatedCard = list.cards.map((card) =>
          card.id === cardId ? { ...card, name: newName } : card
        );
        return new List(list.name).setCards(updatedCard);
      }
      return list;
    });
    this.db.setData(updatedLists);
    this.updateLists();
  }

  public deleteCard({ listId, cardId }: { listId: string; cardId: string }) {
    const lists = this.db.getData();
    const updateLists = lists.map((list) => {
      if (list.id === listId) {
        const updatedCards = list.cards.filter((card) => card.id !== cardId);
        return new List(list.name).setCards(updatedCards);
      }
      return list;
    });
    this.db.setData(updateLists);
    this.updateLists();
  }

  public changeDescription({
    listId,
    cardId,
    newDescription,
  }: {
    listId: string;
    cardId: string;
    newDescription: string;
  }) {
    const lists = this.db.getData();
    const updatedLists = lists.map((list) => {
      if (list.id === listId) {
        const updatedCard = list.cards.filter((card) =>
          card.id === cardId ? { ...card, description: newDescription } : card
        );
        return new List(list.name).setCards(updatedCard);
      }
      return list;
    });
    this.db.setData(updatedLists);
    this.updateLists();
  }

  private duplicateCard({
    listId,
    cardId,
  }: {
    listId: string;
    cardId: string;
  }) {
    const lists = this.db.getData();
    const updatedLists = lists.map((list) => {
      if (list.id === listId) {
        const cardToDuplicate = list.cards.find((card) => card.id === cardId);
        if (cardToDuplicate) {
          const newCard = {
            ...cardToDuplicate,
            id: randomUUID(),
            createdAt: new Date(),
          };
          const cardIndex = list.cards.findIndex((card) => card.id === cardId);
          const updatedCards = [
            ...list.cards.slice(0, cardIndex + 1),
            newCard,
            ...list.cards.slice(cardIndex + 1),
          ];
          return new List(list.name).setCards(updatedCards);
        }
      }
      return list;
    });
    this.db.setData(updatedLists);
    this.updateLists();
  }
}

export { CardHandler };
