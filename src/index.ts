import { Game } from "./Game.ts";
import "./style.css";

new Game({
  htmlDisplaySelector: "#display",
  htmlCanvasSelector: "#canvas",
  htmlControlsFullscreenSelector: ".controls_fullscreen_toggle",
}).start();

// TODO: polished "loading…" screen

// TODO: use storage, eg. for a high score

// TODO: rename framework and use some form of its name as prefix to its exported types

// TODO: pause state

// TODO: debug pause to run the game frame by frame

// TODO: a script for checkout main, merge dev, push, checkout dev, reset to main, push

// TODO: pause menu

// TODO: review personal tasks BEFORE re-publishing the framework under a desired name
