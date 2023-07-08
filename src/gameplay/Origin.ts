import { Xy } from "@framework";
import { Direction } from "./Direction.ts";

export abstract class Origin {
  abstract center(): Xy;

  abstract r(): number;

  abstract direction(): Direction;

  snapshot(): OriginSnapshot {
    return {
      center: this.center(),
      r: this.r(),
      direction: this.direction(),
    };
  }
}

export type OriginSnapshot = {
  center: Xy;
  r: number;
  direction: Direction;
};
