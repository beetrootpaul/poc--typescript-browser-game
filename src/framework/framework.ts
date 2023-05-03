import { DrawApi } from "./drawApi.ts";
import { Xy } from "./xy.ts";
import { GameLoop } from "./gameLoop.ts";
import { GameInput, GameInputEvent } from "./gameInput/gameInput.ts";
import { Color } from "./color.ts";

export type GameUpdateContext = {
  frameNumber: number;
  gameInputEvents: Set<GameInputEvent>;
};
export type GameDrawContext = {
  drawApi: DrawApi;
};

type GameOnUpdate = (updateContext: GameUpdateContext) => void;
type GameOnDraw = (drawContext: GameDrawContext) => void;

type FrameworkOptions = {
  htmlCanvasSelector: string;
  htmlCanvasBackground: Color;
  gameCanvasSize: Xy;
  desiredFps: number;
};

export class Framework {
  readonly #gameCanvasSize: Xy;
  readonly #htmlCanvasBackground: Color;

  readonly #htmlCanvasContext: CanvasRenderingContext2D;
  readonly #offscreenContext: OffscreenCanvasRenderingContext2D;
  readonly #offscreenImageData: ImageData;

  readonly #drawApi: DrawApi;
  readonly #gameInput: GameInput;
  readonly #gameLoop: GameLoop;

  #onUpdate?: GameOnUpdate;
  #onDraw?: GameOnDraw;

  constructor(options: FrameworkOptions) {
    this.#gameCanvasSize = options.gameCanvasSize.floor();
    this.#htmlCanvasBackground = options.htmlCanvasBackground;

    const htmlCanvas = document.querySelector<HTMLCanvasElement>(
      options.htmlCanvasSelector
    );
    if (!htmlCanvas) {
      throw Error(
        `Was unable to find <canvas> by selector '${options.htmlCanvasSelector}'`
      );
    }
    const htmlCanvasContext = htmlCanvas.getContext("2d", {
      // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas#turn_off_transparency
      alpha: false,
    });
    if (!htmlCanvasContext) {
      throw Error("Was unable to obtain <canvas>' 2D context");
    }
    this.#htmlCanvasContext = htmlCanvasContext;

    const offscreenCanvas = new OffscreenCanvas(
      options.gameCanvasSize.x,
      options.gameCanvasSize.y
    );
    const offscreenContext = offscreenCanvas.getContext("2d", {
      // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas#turn_off_transparency
      alpha: false,
    });
    if (!offscreenContext) {
      throw Error("Was unable to obtain OffscreenCanvas' 2D context");
    }
    this.#offscreenContext = offscreenContext;

    this.#offscreenImageData = this.#offscreenContext.createImageData(
      this.#offscreenContext.canvas.width,
      this.#offscreenContext.canvas.height
    );
    this.#drawApi = new DrawApi(
      this.#gameCanvasSize,
      this.#offscreenImageData.data
    );

    this.#gameInput = new GameInput();

    this.#gameLoop = new GameLoop(options.desiredFps);
  }

  setOnUpdate(onUpdate: GameOnUpdate) {
    this.#onUpdate = onUpdate;
  }

  setOnDraw(onDraw: GameOnDraw) {
    this.#onDraw = onDraw;
  }

  startGame(): void {
    this.#setupHtmlCanvas();
    window.addEventListener("resize", (_event) => {
      this.#setupHtmlCanvas();
    });

    this.#gameInput.startListening();

    this.#gameLoop.start({
      updateFn: (frameNumber) => {
        this.#onUpdate?.({
          frameNumber,
          gameInputEvents: this.#gameInput.getCurrentEvents(),
        });
      },
      renderFn: () => {
        this.#onDraw?.({
          drawApi: this.#drawApi,
        });
        this.#render();
      },
    });
  }

  // This function assumes that <canvas> has width and height set to 100% by CSS.
  #setupHtmlCanvas(): void {
    // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas#scaling_for_high_resolution_displays
    this.#htmlCanvasContext.canvas.width =
      this.#htmlCanvasContext.canvas.getBoundingClientRect().width *
      window.devicePixelRatio;
    this.#htmlCanvasContext.canvas.height =
      this.#htmlCanvasContext.canvas.getBoundingClientRect().height *
      window.devicePixelRatio;

    this.#htmlCanvasContext.imageSmoothingEnabled = false;

    this.#htmlCanvasContext.fillStyle = this.#htmlCanvasBackground.asCssHex();
    this.#htmlCanvasContext.fillRect(
      0,
      0,
      this.#htmlCanvasContext.canvas.width,
      this.#htmlCanvasContext.canvas.height
    );
  }

  #render(): void {
    this.#offscreenContext.putImageData(this.#offscreenImageData, 0, 0);

    const htmlCanvasSize = new Xy(
      this.#htmlCanvasContext.canvas.width,
      this.#htmlCanvasContext.canvas.height
    );
    const scaleToFill = htmlCanvasSize.div(this.#gameCanvasSize).floor().min();
    const centeringOffset = htmlCanvasSize
      .sub(this.#gameCanvasSize.mul(scaleToFill))
      .div(2)
      .floor();

    this.#htmlCanvasContext.drawImage(
      this.#offscreenContext.canvas,
      0,
      0,
      this.#offscreenContext.canvas.width,
      this.#offscreenContext.canvas.height,
      centeringOffset.x,
      centeringOffset.y,
      scaleToFill * this.#gameCanvasSize.x,
      scaleToFill * this.#gameCanvasSize.y
    );
  }
}
