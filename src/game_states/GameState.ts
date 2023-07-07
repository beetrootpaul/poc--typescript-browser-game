import { GameUpdateContext } from "@framework";

export interface GameState {
  update(context: GameUpdateContext): GameState;

  draw(): void;
}
