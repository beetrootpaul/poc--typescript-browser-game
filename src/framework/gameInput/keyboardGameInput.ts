import { GameInputEvent, gameInputEventBehavior } from "./gameInput.ts";

export class KeyboardGameInput {
  readonly #keyMapping: Map<string, GameInputEvent> = new Map<
    string,
    GameInputEvent
  >([
    ["ArrowLeft", "left"],
    ["ArrowRight", "right"],
    ["ArrowUp", "up"],
    ["ArrowDown", "down"],
    ["a", "left"],
    ["d", "right"],
    ["w", "up"],
    ["s", "down"],
    ["A", "left"],
    ["D", "right"],
    ["W", "up"],
    ["S", "down"],
    ["f", "full_screen"],
    ["F", "full_screen"],
  ]);

  #currentContinuousEvents: Set<GameInputEvent> = new Set<GameInputEvent>();
  #recentFireOnceEvents: Set<GameInputEvent> = new Set<GameInputEvent>();

  startListening() {
    document.addEventListener("keydown", (keyboardEvent) => {
      const gameInputEvent = this.#keyMapping.get(keyboardEvent.key);
      if (gameInputEvent) {
        keyboardEvent.preventDefault();
        console.log(gameInputEvent);
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!gameInputEventBehavior[gameInputEvent]?.fireOnce) {
          this.#currentContinuousEvents.add(gameInputEvent);
        }
      }
    });
    document.addEventListener("keyup", (keyboardEvent) => {
      const gameInputEvent = this.#keyMapping.get(keyboardEvent.key);
      if (gameInputEvent) {
        keyboardEvent.preventDefault();
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (gameInputEventBehavior[gameInputEvent]?.fireOnce) {
          this.#recentFireOnceEvents.add(gameInputEvent);
        } else {
          this.#currentContinuousEvents.delete(gameInputEvent);
        }
      }
    });
  }

  getCurrentContinuousEvents(): Set<GameInputEvent> {
    return this.#currentContinuousEvents;
  }

  consumeFireOnceEvents(): Set<GameInputEvent> {
    const events = new Set(this.#recentFireOnceEvents);
    this.#recentFireOnceEvents.clear();
    return events;
  }
}
