import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import {setupCounter} from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)


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
    console.log("tick", curr)
    let delta = curr - prev;
    prev = curr;
    accumulatedDelay += Math.min(delta, safetyMaxDelay);
    while (accumulatedDelay >= expectedDelay) {
        update();
        accumulatedDelay -= expectedDelay;
    }
    render();
    requestAnimationFrame(gameLoopTick);
}

requestAnimationFrame(gameLoopTick);

function update() {
    console.error("UPDATE", performance.now());
}

function render() {
    console.warn("RENDER", performance.now());
}