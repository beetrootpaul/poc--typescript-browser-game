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

// TODO: REWORK THIS
export let s2_imgW = 0;
export let s2_imgH = 0;
export let s2_imgType: "rgba" | "rgb" = "rgba";
export let s2_imgBytes: Uint8ClampedArray | undefined;

export class Game {
  #gameState: GameState;

  constructor(options: GameOptions) {
    f.init({
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
        enabledOnInit: true,
        toggleKey: ";",
      },
    });

    this.#gameState = new GameStateSplash();
  }

  start(): void {
    // TODO: REWORK THIS
    const spriteSheetImage = new Image();
    spriteSheetImage.src = "spritesheet.png";
    spriteSheetImage.decode().then(() => {
      console.log("DECODED");
      const canvas = document.createElement("canvas");
      canvas.width = spriteSheetImage.naturalWidth;
      canvas.height = spriteSheetImage.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw Error(`Failed to process the image: ${spriteSheetImage.src}`);
      }
      ctx.drawImage(spriteSheetImage, 0, 0);
      const imageData: ImageData = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );
      // getImageData(event.offsetX, event.offsetY, 1, 1).data;

      s2_imgW = imageData.width;
      s2_imgH = imageData.height;
      s2_imgType = "rgba";
      s2_imgBytes = imageData.data;
    });

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

    f.startGame(() => {
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
  }
}
