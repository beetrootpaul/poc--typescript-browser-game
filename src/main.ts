import "./style.css";
import { Game } from "./game/game.ts";

new Game({
  htmlCanvasSelector: "#poc--typescript-web-game--canvas",
  htmlOffscreenCanvasFallbackSelector:
    "#poc--typescript-web-game--offscreen-canvas-fallback",
}).start();
