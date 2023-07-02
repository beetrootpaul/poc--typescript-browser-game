import { Game } from "./game.ts";
import "./style.css";

setTimeout(() => {
  new Game({
    htmlDisplaySelector: "#display",
    htmlCanvasSelector: "#canvas",
    htmlOffscreenCanvasFallbackSelector: "#fallback_offscreen_canvas",
    htmlControlsFullscreenSelector: ".controls_fullscreen",
  }).start();
}, 3000);
