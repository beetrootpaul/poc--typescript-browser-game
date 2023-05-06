import "./style.css";
import { Game } from "./game/game.ts";

setTimeout(() => {
  new Game({
    htmlDisplaySelector: "#display",
    htmlCanvasSelector: "#canvas",
    htmlOffscreenCanvasFallbackSelector: "#fallback_offscreen_canvas",
    htmlControlsFullscreenSelector: ".controls_fullscreen",
  }).start();
}, 3000);
