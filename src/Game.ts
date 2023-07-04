import { Framework } from "@framework";
import { GameState } from "./game_states/GameState.ts";
import { GameStateSplash } from "./game_states/GameStateSplash.ts";
import { g } from "./globals.ts";
import { Pico8Colors } from "./Pico8Color.ts";

type GameOptions = {
  htmlDisplaySelector: string;
  htmlCanvasSelector: string;
  htmlOffscreenCanvasFallbackSelector: string;
  htmlControlsFullscreenSelector: string;
};

type GameStoredState = {};

export class Game {
  readonly #framework: Framework<GameStoredState>;

  #gameState: GameState<GameStoredState>;

  constructor(options: GameOptions) {
    this.#framework = new Framework<GameStoredState>({
      htmlDisplaySelector: options.htmlDisplaySelector,
      htmlCanvasSelector: options.htmlCanvasSelector,
      htmlOffscreenCanvasFallbackSelector:
        options.htmlOffscreenCanvasFallbackSelector,
      htmlControlsFullscreenSelector: options.htmlControlsFullscreenSelector,
      htmlCanvasBackground: Pico8Colors.Black,
      gameCanvasSize: g.screenSize,
      desiredFps: g.fps,
      // TODO: consider disabling these logs in the production build
      logActualFps: true,
      // TODO: make it disabled for prod and toggleable for dev
      debug: true,
    });

    this.#gameState = new GameStateSplash();
  }

  start(): void {
    this.#framework.setOnUpdate((context) => {
      this.#gameState = this.#gameState.update(context);
    });

    this.#framework.setOnDraw((context) => {
      context.drawApi.clear(Pico8Colors.Black);
      context.drawApi.setCameraOffset(g.cameraOffset);
      this.#gameState.draw(context);
    });

    this.#framework.startGame(({}) => {});
  }
}
