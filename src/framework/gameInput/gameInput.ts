import { KeyboardGameInput } from "./keyboardGameInput.ts";
import { GamepadGameInput } from "./gamepadGameInput.ts";

export type GameInputEvent = null | "right" | "left" | "down" | "up";

export class GameInput {
  readonly #keyboardGameInput = new KeyboardGameInput();
  readonly #gamepadGameInput = new GamepadGameInput();

  startListening() {
    this.#keyboardGameInput.startListening();
  }

  getCurrentEvents(): Set<GameInputEvent> {
    const detectedEvents = this.#keyboardGameInput.getCurrentEvents();
    for (const event of this.#gamepadGameInput.getCurrentEvents()) {
      detectedEvents.add(event);
    }
    return detectedEvents;
  }
}
