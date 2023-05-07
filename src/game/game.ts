import {
  Framework,
  GameDrawContext,
  GameUpdateContext,
} from "../framework/framework.ts";
import { Xy } from "../framework/xy.ts";
import { Pico8Color } from "./pico8Color.ts";
import { Color } from "../framework/color.ts";

type GameStoredState = {
  pos: number;
};

type GameOptions = {
  htmlDisplaySelector: string;
  htmlCanvasSelector: string;
  htmlOffscreenCanvasFallbackSelector: string;
  htmlControlsFullscreenSelector: string;
};

export class Game {
  readonly #desiredFps: number = 15;
  readonly #gameCanvasSize: Xy = new Xy(16, 16);

  readonly #framework: Framework<GameStoredState>;

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
    this.#framework = new Framework<GameStoredState>({
      htmlDisplaySelector: options.htmlDisplaySelector,
      htmlCanvasSelector: options.htmlCanvasSelector,
      htmlOffscreenCanvasFallbackSelector:
        options.htmlOffscreenCanvasFallbackSelector,
      htmlControlsFullscreenSelector: options.htmlControlsFullscreenSelector,
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

    this.#framework.startGame(({ storageApi }) => {
      let restoredPosition: number = 0;
      try {
        restoredPosition = storageApi.load()?.pos ?? 0;
      } catch (err) {
        // TODO: use zod and validate value's shape in the framework itself, instead on the game side here
        console.warn(`Stored game state doesn't seem to match expected shape.`);
        storageApi.clear();
      }
      this.#position = restoredPosition;
      if (this.#position < 0) {
        this.#position = 0;
      }
      if (this.#position > 221) {
        this.#position = 221;
      }
    });
  }

  #update({
    gameInputEvents,
    storageApi,
  }: GameUpdateContext<GameStoredState>): void {
    this.#color =
      this.#colorSequence[
        (this.#colorSequence.indexOf(this.#color) + 1) %
          this.#colorSequence.length
      ];
    let hasPositionChanged = false;
    if (gameInputEvents.has("right")) {
      this.#position++;
      hasPositionChanged = true;
    }
    if (gameInputEvents.has("left")) {
      this.#position--;
      hasPositionChanged = true;
    }
    if (gameInputEvents.has("down")) {
      this.#position += this.#gameCanvasSize.x;
      hasPositionChanged = true;
    }
    if (gameInputEvents.has("up")) {
      this.#position -= this.#gameCanvasSize.x;
      hasPositionChanged = true;
    }
    if (hasPositionChanged) {
      storageApi.store({ pos: this.#position });
    }
  }

  #draw({ drawApi }: GameDrawContext): void {
    drawApi.clear(Pico8Color.DarkBlue);
    drawApi.drawSomething(this.#position, this.#color);
  }
}
