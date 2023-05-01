import "./style.css";
import { GameInputEvent, startGameLoop } from "./game-loop.ts";
import { DrawApi } from "./draw-api.ts";

const W = 16;
const H = 16;

const canvasEl: HTMLCanvasElement | null =
  document.querySelector<HTMLCanvasElement>(
    "#poc--typescript-web-game--canvas"
  );
if (canvasEl) {
  canvasEl.width = canvasEl.getBoundingClientRect().width;
  canvasEl.height = canvasEl.getBoundingClientRect().height;

  const offscreenCanvas: OffscreenCanvas = new OffscreenCanvas(W, H);

  const ctx: CanvasRenderingContext2D | null = canvasEl.getContext("2d");
  if (ctx) {
    // ctx.scale(4, 4);
    ctx.imageSmoothingEnabled = false;
    // ctx.mozImageSmoothingEnabled = false;
    // ctx.webkitImageSmoothingEnabled = false;
    // ctx.msImageSmoothingEnabled = false;

    const offCtx: OffscreenCanvasRenderingContext2D | null =
      offscreenCanvas.getContext("2d");
    if (offCtx) {
      offCtx.imageSmoothingEnabled = false;

      startGameLoop({
        ctx,
        offCtx,
        offscreenCanvas,
        update,
        render,
      });
    }
  }
}

let pos = 0;

function update(_frameNumber: number, gameInputEvent: GameInputEvent) {
  // console.error("UPDATE", performance.now());
  // if (tick % 2 == 0) {
  //   pos++;
  //   if (pos > W * H) {
  //     pos = 0;
  //   }
  // }
  switch (gameInputEvent) {
    case "right": {
      pos++;
      break;
    }
    case "left": {
      pos--;
      break;
    }
    case "down": {
      pos += W;
      break;
    }
    case "up": {
      pos -= W;
      break;
    }
  }
}

function render(drawApi: DrawApi) {
  // console.warn("RENDER", performance.now());
  drawApi.drawSomething(pos);
}
