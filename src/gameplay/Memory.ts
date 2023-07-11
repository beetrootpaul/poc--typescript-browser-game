import { spr_, transparent, Xy, xy_ } from "@framework";
import { CollisionCircle } from "../Collisions.ts";
import { f, g, p8c } from "../globals.ts";
import { Direction } from "./Direction.ts";
import { Origin, OriginSnapshot } from "./Origin.ts";

type MemoryParams = {
  origin: Origin;
};

export class Memory extends Origin {
  readonly #originStateDelay = 40;
  readonly #originStateBuffer: OriginSnapshot[] = [];
  #originStateBufferIndex: number = 0;

  readonly #origin: Origin;
  #xy: Xy;
  #r: number;
  #direction: Direction;

  readonly #spriteForDirection = {
    u: spr_(xy_(7, 3).mul(g.spriteSheetCellSize), g.spriteSheetCellSize),
    r: spr_(xy_(8, 3).mul(g.spriteSheetCellSize), g.spriteSheetCellSize),
    d: spr_(xy_(9, 3).mul(g.spriteSheetCellSize), g.spriteSheetCellSize),
    l: spr_(xy_(10, 3).mul(g.spriteSheetCellSize), g.spriteSheetCellSize),
  };

  constructor(params: MemoryParams) {
    super();
    this.#origin = params.origin;
    this.#xy = this.#origin.center();
    this.#r = this.#origin.r();
    this.#direction = this.#origin.direction();
  }

  center(): Xy {
    return this.#xy;
  }

  r(): number {
    return this.#r;
  }

  direction(): Direction {
    return this.#direction;
  }

  collisionCircle(): CollisionCircle {
    return {
      center: this.#xy,
      r: this.#r,
    };
  }

  isActive(): boolean {
    return this.#originStateBuffer.length > this.#originStateDelay;
  }

  // TODO: cover the ring-moving index logic with tests
  followOrigin(): void {
    this.#originStateBuffer[this.#originStateBufferIndex] =
      this.#origin.snapshot();

    const bufferSize = this.#originStateDelay + 1;
    const delayedStateIndex = (this.#originStateBufferIndex + 1) % bufferSize;
    const delayedState = this.#originStateBuffer[delayedStateIndex];
    if (delayedState) {
      this.#xy = delayedState.center;
      this.#r = delayedState.r;
      this.#direction = delayedState.direction;
    }

    this.#originStateBufferIndex =
      (this.#originStateBufferIndex + 1) % bufferSize;
  }

  draw() {
    // TODO: still needed to disable black -> transparent mapping the way it was in Lua version?
    f.drawApi.mapSpriteColor(p8c.Black, p8c.Black);
    f.drawApi.mapSpriteColor(p8c.DarkBlue, transparent);

    if (this.isActive()) {
      f.drawApi.sprite(
        g.assets.spritesheet,
        this.#spriteForDirection[this.#direction],
        this.#xy.sub(this.#r)
      );
    }

    // TODO: API to reset all mappings?
    // TODO: in Lua version it was a reset of all to-transparency mapping (and probably set black as transparent again?)
    f.drawApi.mapSpriteColor(p8c.DarkBlue, p8c.DarkBlue);

    if (f.debug) {
      const cc = this.collisionCircle();
      f.drawApi.ellipse(
        cc.center.sub(cc.r),
        cc.center.add(cc.r),
        this.isActive() ? p8c.Red : p8c.DarkGrey
      );
    }
  }
}
