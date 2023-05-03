export type GameInputEvent = null | "right" | "left" | "down" | "up";

export class KeyboardGameInput {
  readonly #keyMapping: Map<string, GameInputEvent> = new Map<
    string,
    GameInputEvent
  >([
    ["ArrowLeft", "left"],
    ["ArrowRight", "right"],
    ["ArrowUp", "up"],
    ["ArrowDown", "down"],
  ]);

  #currentEvents: Set<GameInputEvent> = new Set<GameInputEvent>();

  startListening() {
    document.addEventListener("keydown", (keyboardEvent) => {
      const gameInputEvent = this.#keyMapping.get(keyboardEvent.key);
      if (gameInputEvent) {
        keyboardEvent.preventDefault();
        this.#currentEvents.add(gameInputEvent);
      }
    });
    document.addEventListener("keyup", (keyboardEvent) => {
      const gameInputEvent = this.#keyMapping.get(keyboardEvent.key);
      if (gameInputEvent) {
        keyboardEvent.preventDefault();
        this.#currentEvents.delete(gameInputEvent);
      }
    });
  }

  getCurrentEvents(): Set<GameInputEvent> {
    return this.#currentEvents;
  }
}
