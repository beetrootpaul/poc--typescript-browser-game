import { DrawApi } from "./draw-api.ts";

export type GameInputEvent = null | "right" | "left" | "down" | "up";

let lastGameInputEvent: GameInputEvent = null;

export function startGameLoop(params: {
  ctx: CanvasRenderingContext2D;
  offCtx: OffscreenCanvasRenderingContext2D;
  offscreenCanvas: OffscreenCanvas;
  update: (gameInputEvent: GameInputEvent) => void;
  render: (drawApi: DrawApi) => void;
}) {
  // TODO: encapsulate
  // TODO: google and read whether this approach is recommended or flawed. Also: is it cross-browser OK?
  document.addEventListener("keydown", (event) => {
    console.log(event.key);
    console.log(event.repeat);
    let handled = false;
    switch (event.key) {
      case "ArrowRight": {
        lastGameInputEvent = "right";
        handled = true;
        break;
      }
      case "ArrowLeft": {
        lastGameInputEvent = "left";
        handled = true;
        break;
      }
      case "ArrowDown": {
        lastGameInputEvent = "down";
        handled = true;
        break;
      }
      case "ArrowUp": {
        lastGameInputEvent = "up";
        handled = true;
        break;
      }
    }
    if (handled) {
      event.preventDefault();
    }
  });

  // Based on https://gist.github.com/HipHopHuman/3e9b4a94b30ac9387d9a99ef2d29eb1a

  const expectedDelay = 1000 / 60;
  let accumulatedDelay = expectedDelay;

  // let _x = window.speechSynthesis;

  let prev: number | null = null;

  // a safety net in case of a long time spent on another tab, letting delta accumulate a lot in this one
  const safetyMaxDelay = expectedDelay * 5;

  function gameLoopTick(curr: number) {
    if (prev == null) {
      prev = curr;
    }
    // console.log("tick", curr);
    const delta = curr - prev;
    prev = curr;
    accumulatedDelay += Math.min(delta, safetyMaxDelay);
    while (accumulatedDelay >= expectedDelay) {
      // TODO: won't this input approach miss some events?
      params.update(lastGameInputEvent);
      lastGameInputEvent = null;
      accumulatedDelay -= expectedDelay;
    }

    const imageData = params.offCtx.getImageData(
      0,
      0,
      params.offscreenCanvas.width,
      params.offscreenCanvas.height
    );
    params.render(
      new DrawApi(
        params.offscreenCanvas.width,
        params.offscreenCanvas.height,
        imageData.data
      )
    );
    params.offCtx.putImageData(imageData, 0, 0);

    params.ctx.drawImage(
      params.offscreenCanvas,
      0,
      0,
      params.offscreenCanvas.width,
      params.offscreenCanvas.height,
      0,
      0,
      30 * params.offscreenCanvas.width,
      30 * params.offscreenCanvas.height
    );

    requestAnimationFrame(gameLoopTick);
  }

  requestAnimationFrame(gameLoopTick);
}
