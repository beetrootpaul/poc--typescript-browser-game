type GameLoopCallbacks = {
  updateFn: (frameNumber: number) => void;
  renderFn: () => void;
};

export class GameLoop {
  readonly #desiredFps: number;

  #previousTime?: DOMHighResTimeStamp;
  readonly #expectedTimeStep: number;
  readonly #safetyMaxTimeStep: number;
  #accumulatedTimeStep: number;

  #frameNumber: number;

  #callbacks: GameLoopCallbacks;

  constructor(desiredFps: number) {
    this.#desiredFps = desiredFps;

    this.#expectedTimeStep = 1000 / this.#desiredFps;
    this.#safetyMaxTimeStep = 5 * this.#expectedTimeStep;
    this.#accumulatedTimeStep = this.#expectedTimeStep;

    this.#frameNumber = 0;

    this.#callbacks = {
      updateFn: () => {},
      renderFn: () => {},
    };
  }

  start(callbacks: GameLoopCallbacks): void {
    this.#callbacks = callbacks;
    window.requestAnimationFrame(this.#tick);
  }

  // Keep this function as an arrow one in order to avoid issues with `this`.
  #tick = (currentTime: DOMHighResTimeStamp): void => {
    const deltaTime = currentTime - (this.#previousTime ?? currentTime);
    this.#previousTime = currentTime;
    this.#accumulatedTimeStep += deltaTime;
    // A safety net in case of a long time spent on another tab, letting delta accumulate a lot in this one:
    this.#accumulatedTimeStep = Math.min(
      this.#accumulatedTimeStep,
      this.#safetyMaxTimeStep
    );

    while (this.#accumulatedTimeStep >= this.#expectedTimeStep) {
      this.#callbacks.updateFn(this.#frameNumber);

      this.#frameNumber =
        this.#frameNumber == Number.MAX_SAFE_INTEGER
          ? 0
          : this.#frameNumber + 1;

      this.#accumulatedTimeStep -= this.#expectedTimeStep;
    }

    this.#callbacks.renderFn();

    window.requestAnimationFrame(this.#tick);
  };
}
