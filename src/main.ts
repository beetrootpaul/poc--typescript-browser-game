import "./style.css";
import { startGameLoop } from "./game-loop.ts";
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

// TODO: move tick to update's params
let tick = 0;

let pos = 0;

function update() {
  // console.error("UPDATE", performance.now());
  tick++;
  if (tick % 2 == 0) {
    pos++;
    if (pos > W * H) {
      pos = 0;
    }
  }
}

function render(drawApi: DrawApi) {
  // console.warn("RENDER", performance.now());
  drawApi.drawSomething(pos);
}
