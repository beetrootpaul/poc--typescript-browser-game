import { GameUpdateContext, StorageApiValueConstraint } from "@framework";

export interface GameState<StorageApiValue extends StorageApiValueConstraint> {
  update(
    context: GameUpdateContext<StorageApiValue>
  ): GameState<StorageApiValue>;

  draw(): void;
}
