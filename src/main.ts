import "./style.css";
import { Game } from "./game/game.ts";

new Game({
  htmlDisplaySelector: "#display",
  htmlCanvasSelector: "#canvas",
  htmlOffscreenCanvasFallbackSelector: "#fallback_offscreen_canvas",
  htmlControlsFullscreenSelector: ".controls_fullscreen",
}).start();
