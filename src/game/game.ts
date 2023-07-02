import * as UPNG from "upng-js";
import { Color } from "../../../poc--typescript-web-game-framework/src/color.ts";
import {
  Framework,
  GameDrawContext,
  GameUpdateContext,
} from "../framework/framework.ts";
import { Xy } from "../framework/xy.ts";
import { Pico8Color } from "./pico8Color.ts";

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
  #imgW = 0;
  #imgH = 0;
  #imgBytes: Uint8Array = new Uint8Array(0);

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

    // TODO: refactor
    fetch("test-image.png")
      .then((response) => response.blob())
      .then((blob) => blob.arrayBuffer())
      // docs: https://github.com/photopea/UPNG.js/#upngdecodebuffer
      .then((rawArrayBuffer) => UPNG.decode(rawArrayBuffer))
      .then(({ width, height, depth, ctype, frames, tabs, data }) => {
        this.#imgW = width;
        this.#imgH = height;
        if (depth != 8) {
          throw Error(`Unexpected img depth of ${depth}. Expected: 8`);
        }
        if (ctype != 6) {
          throw Error(
            `Unexpected img ctype of ${depth}. Expected: 6 (RGB + alpha)`
          );
        }
        if (frames.length > 0) {
          throw Error(
            `Unexpected img frames in length of ${frames.length}. Expected length: 0`
          );
        }
        if (tabs.sRGB != 0) {
          throw Error(`Unexpected img tabs.sRGB value other than 0`);
        }
        if (
          tabs.acTL ||
          tabs.bKGD ||
          tabs.cHRM ||
          tabs.gAMA ||
          tabs.hIST ||
          tabs.iTXt ||
          tabs.PLTE ||
          tabs.pHYs ||
          tabs.tEXt ||
          tabs.tRNS
        ) {
          throw Error(`Unexpected img tabs other than sRGB`);
        }
        return new Uint8Array(data);
      })
      .then((uint8Array) => {
        this.#imgBytes = uint8Array.slice(0, this.#imgW * this.#imgH * 4);
      })
      .catch((e) => {
        console.error("FETCH:", e);
      });

    this.#framework.startGame(({ storageApi }) => {
      const a: Color = Color.fromCssHex("#112233");
      console.log(a);
      console.log(Color.abc());
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
    // TODO: refactor
    drawApi.drawSomething(
      this.#position,
      this.#color,
      this.#imgBytes,
      this.#imgW
    );
  }
}
