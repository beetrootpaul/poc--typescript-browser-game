import type { GameDrawContext } from "@framework";

export interface GameState {
  update(): GameState;

  draw(context: GameDrawContext): void;
}
