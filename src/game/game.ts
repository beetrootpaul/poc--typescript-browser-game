import {
  Framework,
  GameDrawContext,
  GameUpdateContext,
} from "../framework/framework.ts";
import { Xy } from "../framework/xy.ts";
import { Pico8Color } from "./pico8Color.ts";

type GameOptions = {
  htmlCanvasSelector: string;
};

export class Game {
  readonly #desiredFps: number = 30;
  readonly #gameCanvasSize: Xy = new Xy(16, 16);

  readonly #framework: Framework;

  #position: number = 0;

  constructor(options: GameOptions) {
    this.#framework = new Framework({
      htmlCanvasSelector: options.htmlCanvasSelector,
      htmlCanvasBackground: Pico8Color.Black,
      gameCanvasSize: this.#gameCanvasSize,
      desiredFps: this.#desiredFps,
      // TODO: consider disabling these logs in production build
      logActualFps: true,
    });
  }

  start(): void {
    this.#framework.setOnUpdate(this.#update.bind(this));
    this.#framework.setOnDraw(this.#draw.bind(this));

    this.#framework.startGame();
  }

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
    drawApi.clear(Pico8Color.DarkBlue);
    drawApi.drawSomething(this.#position);
  }
}
