import { Xy } from "@framework";
import { Direction } from "./Direction.ts";

export interface Origin {
  center(): Xy;

  r(): number;

  direction(): Direction;
}
