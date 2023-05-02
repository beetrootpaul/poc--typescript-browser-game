import {
  Framework,
  GameDrawContext,
  GameUpdateContext,
} from "../framework/framework.ts";
import { Xy } from "../framework/xy.ts";
import { Color } from "../framework/color.ts";

type GameOptions = {
  htmlCanvasSelector: string;
};

export class Game {
  readonly #desiredFps: number = 30;
  readonly #gameCanvasSize: Xy = new Xy(16, 16);

  readonly #framework: Framework;

  // TODO: remove this temporary variable
  #position: number = 0;

  constructor(options: GameOptions) {
    this.#framework = new Framework({
      htmlCanvasSelector: options.htmlCanvasSelector,
      htmlCanvasBackground: new Color(0, 0, 0),
      gameCanvasSize: this.#gameCanvasSize,
      desiredFps: this.#desiredFps,
    });
  }

  start(): void {
    this.#framework.setOnUpdate(this.#update.bind(this));
    this.#framework.setOnDraw(this.#draw.bind(this));

    this.#framework.startGame();
  }

  // TODO: rewrite this temporary implementation
  #update({ gameInputEvents }: GameUpdateContext): void {
    if (gameInputEvents.has("right")) {
      this.#position++;
    }
    if (gameInputEvents.has("left")) {
      this.#position--;
    }
    if (gameInputEvents.has("down")) {
      this.#position += this.#gameCanvasSize.x;
    }
    if (gameInputEvents.has("up")) {
      this.#position -= this.#gameCanvasSize.x;
    }
  }

  #draw({ drawApi }: GameDrawContext): void {
    // TODO: define PICO-8 colors and extract to a separate file
    drawApi.clear(new Color(34, 45, 100));
    drawApi.drawSomething(this.#position);
  }
}
