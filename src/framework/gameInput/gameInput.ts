import { KeyboardGameInput } from "./keyboardGameInput.ts";
import { GamepadGameInput } from "./gamepadGameInput.ts";

export type GameInputEvent =
  | null
  | "left"
  | "right"
  | "up"
  | "down"
  | "full_screen";

export const gameInputEventBehavior: {
  [event: string]: { fireOnce?: boolean };
} = {
  full_screen: { fireOnce: true },
};

export class GameInput {
  readonly #keyboardGameInput = new KeyboardGameInput();
  readonly #gamepadGameInput = new GamepadGameInput();

  startListening() {
    this.#keyboardGameInput.startListening();
  }

  getCurrentContinuousEvents(): Set<GameInputEvent> {
    const detectedEvents = this.#keyboardGameInput.getCurrentContinuousEvents();
    for (const event of this.#gamepadGameInput.getCurrentContinuousEvents()) {
      detectedEvents.add(event);
    }
    return detectedEvents;
  }

  consumeFireOnceEvents(): Set<GameInputEvent> {
    return this.#keyboardGameInput.consumeFireOnceEvents();
  }
}
