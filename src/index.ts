import { Game } from "./Game.ts";
import "./style.css";

setTimeout(() => {
  new Game({
    htmlDisplaySelector: "#display",
    htmlCanvasSelector: "#canvas",
    htmlOffscreenCanvasFallbackSelector: "#fallback_offscreen_canvas",
    htmlControlsFullscreenSelector: ".controls_fullscreen",
  }).start();
}, 3000);

// TODO: polished "loading…" screen

// TODO: use storage, eg. for a high score

// TODO: rename framework and use some form of its name as prefix to its exported types
