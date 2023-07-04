import { xy_ } from "@framework";

export const g = {
  // TODO: set it back to 30 and re-implement the game loop in a way that its adjusts to really do ~30 FPS
  fps: 40, // this value results with 30 FPS on my machine
  screenSize: xy_(128, 128),
  cameraOffset: xy_(0, -16),
  musicBeatFrames: 16,
};
