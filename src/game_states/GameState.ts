import type { GameDrawContext } from "@framework";
import { GameUpdateContext, StorageApiValueConstraint } from "@framework";

export interface GameState<StorageApiValue extends StorageApiValueConstraint> {
  update(
    context: GameUpdateContext<StorageApiValue>
  ): GameState<StorageApiValue>;

  draw(context: GameDrawContext): void;
}
