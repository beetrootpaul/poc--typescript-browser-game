import { GameState } from "./game_states/GameState.ts";
import { GameStateSplash } from "./game_states/GameStateSplash.ts";
import { f, g, p8c } from "./globals.ts";

type GameOptions = {
  htmlDisplaySelector: string;
  htmlCanvasSelector: string;
  htmlControlsFullscreenSelector: string;
};

type GameStoredState = {
  // TODO: Is it possible to enforce optionality of every field in the framework itself?
  // TODO: This field is used only to drive a proper framework implementation,
  //       but it's not really used in the game itself.
  //       Update it to something meaningful in a context of the game.
  mostRecentFameNumber?: number;
};

export class Game {
  #gameState: GameState = new GameStateSplash();

  start(options: GameOptions): void {
    f.init(
      {
        htmlDisplaySelector: options.htmlDisplaySelector,
        htmlCanvasSelector: options.htmlCanvasSelector,
        htmlControlsFullscreenSelector: options.htmlControlsFullscreenSelector,
        htmlCanvasBackground: p8c.Black,
        gameCanvasSize: g.screenSize,
        desiredFps: g.fps,
        // TODO: consider disabling these logs in the production build
        logActualFps: true,
        // TODO: make it disabled for prod and toggleable for dev
        debug: {
          enabledOnInit: g.__debug,
          toggleKey: ";",
        },
      },
      {
        images: Object.values(g.assets)
          .filter((url) => url.endsWith(".png"))
          .map((url) => ({ url })),
      }
    ).then(({ startGame }) => {
      f.setOnUpdate(() => {
        f.storageApi.store<GameStoredState>({
          mostRecentFameNumber: f.frameNumber,
        });
        this.#gameState = this.#gameState.update();
      });

      f.setOnDraw(() => {
        f.drawApi.clear(p8c.Black);
        f.drawApi.setCameraOffset(g.cameraOffset);
        this.#gameState.draw();
      });

      startGame(() => {
        let restoredState: GameStoredState | null = null;
        try {
          restoredState = f.storageApi.load<GameStoredState>();
        } catch (err) {
          // TODO: move this error to the framework itself, because there we can explicitly tell it's about `JSON.parse(…)` error
          console.warn("Failed to stored state.");
          f.storageApi.clear();
        }
        restoredState = restoredState ?? {
          mostRecentFameNumber: 0,
        };
        console.info(
          `Restored most recent frame number: ${restoredState.mostRecentFameNumber}`
        );
      });
    });
  }
}
