export type GameInputEvent = null | "right" | "left" | "down" | "up";

export class GameInput {
  readonly #keyMapping: Map<string, GameInputEvent> = new Map<
    string,
    GameInputEvent
  >([
    ["ArrowLeft", "left"],
    ["ArrowRight", "right"],
    ["ArrowUp", "up"],
    ["ArrowDown", "down"],
  ]);

  // TODO: is there a chance we are losing events due to lack of a buffer?
  #collectedEvent: GameInputEvent = null;

  startListening() {
    // TODO: is it possible to remove initial press delay before repeat?
    document.addEventListener("keydown", (keyboardEvent) => {
      console.log(keyboardEvent);
      const gameInputEvent = this.#keyMapping.get(keyboardEvent.key);
      if (gameInputEvent) {
        this.#collectedEvent = gameInputEvent;
        keyboardEvent.preventDefault();
      } else {
        this.#collectedEvent = null;
      }
    });
  }

  consumeEvent(): GameInputEvent {
    const event = this.#collectedEvent;
    this.#collectedEvent = null;
    return event;
  }
}
