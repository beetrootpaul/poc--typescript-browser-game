export type GameInputEvent = null | "right" | "left" | "down" | "up";

export class GameInput {
  readonly #keyboardKeyToGameInputEvent: Map<string, GameInputEvent> = new Map<
    string,
    GameInputEvent
  >([
    ["ArrowLeft", "left"],
    ["ArrowRight", "right"],
    ["ArrowUp", "up"],
    ["ArrowDown", "down"],
  ]);

  readonly #gamepadButtonToGameInputEvent: Map<number, GameInputEvent> =
    new Map<number, GameInputEvent>([
      [14, "left"],
      [15, "right"],
      [12, "up"],
      [13, "down"],
    ]);

  readonly #gamepadAxisThreshold: number = 0.6;

  readonly #gamepadAxisToGameInputEvent: Map<number, GameInputEvent> = new Map<
    number,
    GameInputEvent
  >([
    // keys here are: 100 * axis index + sign(axis value)
    [-1, "left"],
    [1, "right"],
    [99, "up"],
    [101, "down"],
    [199, "left"],
    [201, "right"],
    [299, "up"],
    [301, "down"],
  ]);

  #cachedKeyboardEvents: Set<GameInputEvent> = new Set<GameInputEvent>();

  startListening() {
    this.#startCollectingKeyboardEvents();
  }

  detectRecentEvent(): Set<GameInputEvent> {
    const detectedEvents = new Set<GameInputEvent>(this.#cachedKeyboardEvents);
    this.#cachedKeyboardEvents.clear();

    const gamepadEvents = this.#retrieveCurrentGamepadEvents();
    for (const ge of gamepadEvents) {
      detectedEvents.add(ge);
    }

    return detectedEvents;
  }

  #startCollectingKeyboardEvents() {
    // TODO: is it possible to remove initial press delay before repeat?
    // TODO: make keyboard input work same as gamepad one: make object move for the entire time maybe?
    document.addEventListener("keydown", (keyboardEvent) => {
      const gameInputEvent = this.#keyboardKeyToGameInputEvent.get(
        keyboardEvent.key
      );
      if (gameInputEvent) {
        this.#cachedKeyboardEvents.add(gameInputEvent);
        keyboardEvent.preventDefault();
      }
    });
  }

  #retrieveCurrentGamepadEvents(): Set<GameInputEvent> {
    const events = new Set<GameInputEvent>();

    navigator.getGamepads().forEach((gamepad) => {
      if (gamepad) {
        gamepad.buttons.forEach((button, buttonIndex) => {
          if (button.pressed || button.touched) {
            const gameInputEvent =
              this.#gamepadButtonToGameInputEvent.get(buttonIndex);
            if (gameInputEvent) {
              events.add(gameInputEvent);
            }
          }
        });
        gamepad.axes.forEach((axis, axisIndex) => {
          if (Math.abs(axis) > this.#gamepadAxisThreshold) {
            const gameInputEvent = this.#gamepadAxisToGameInputEvent.get(
              100 * axisIndex + Math.sign(axis)
            );
            if (gameInputEvent) {
              events.add(gameInputEvent);
            }
          }
        });
      }
    });

    return events;
  }
}
