import { Framework, Xy } from "@framework";
import { GameState } from "./game_states/GameState.ts";
import { GameStateSplash } from "./game_states/GameStateSplash.ts";
import { Pico8Colors } from "./Pico8Color.ts";

type GameOptions = {
  htmlDisplaySelector: string;
  htmlCanvasSelector: string;
  htmlOffscreenCanvasFallbackSelector: string;
  htmlControlsFullscreenSelector: string;
};

type GameStoredState = {};

export class Game {
  readonly #desiredFps: number = 30;
  readonly #gameCanvasSize: Xy = new Xy(128, 128);

  readonly #framework: Framework<GameStoredState>;

  #gameState: GameState;

  constructor(options: GameOptions) {
    this.#framework = new Framework<GameStoredState>({
      htmlDisplaySelector: options.htmlDisplaySelector,
      htmlCanvasSelector: options.htmlCanvasSelector,
      htmlOffscreenCanvasFallbackSelector:
        options.htmlOffscreenCanvasFallbackSelector,
      htmlControlsFullscreenSelector: options.htmlControlsFullscreenSelector,
      htmlCanvasBackground: Pico8Colors.Black,
      gameCanvasSize: this.#gameCanvasSize,
      desiredFps: this.#desiredFps,
      // TODO: consider disabling these logs in the production build
      logActualFps: true,
      // TODO: make it disabled for prod and toggleable for dev
      debug: true,
    });

    this.#gameState = new GameStateSplash();
  }

  start(): void {
    this.#framework.setOnUpdate(() => {
      this.#gameState = this.#gameState.update();
    });

    this.#framework.setOnDraw(({ drawApi }) => {
      drawApi.clear(Pico8Colors.Black);

      // TODO: migrate from Lua
      // camera(a.camera_x, a.camera_y)

      this.#gameState.draw({ drawApi });
    });

    this.#framework.startGame(({}) => {});
  }
}
