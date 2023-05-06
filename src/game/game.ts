import {
  Framework,
  GameDrawContext,
  GameUpdateContext,
} from "../framework/framework.ts";
import { Xy } from "../framework/xy.ts";
import { Pico8Color } from "./pico8Color.ts";
import { Color } from "../framework/color.ts";

type GameOptions = {
  htmlCanvasSelector: string;
};

export class Game {
  readonly #desiredFps: number = 15;
  readonly #gameCanvasSize: Xy = new Xy(16, 16);

  readonly #framework: Framework;

  #position: number = 0;

  readonly #colorSequence: Color[] = [
    Pico8Color.Red,
    Pico8Color.Orange,
    Pico8Color.Yellow,
    Pico8Color.White,
    Pico8Color.LightPeach,
    Pico8Color.LightGrey,
    Pico8Color.Lavender,
    Pico8Color.DarkGrey,
    Pico8Color.DarkPurple,
  ];
  #color: Color = Pico8Color.Red;

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
    this.#color =
      this.#colorSequence[
        (this.#colorSequence.indexOf(this.#color) + 1) %
          this.#colorSequence.length
      ];
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
    drawApi.drawSomething(this.#position, this.#color);
  }
}
