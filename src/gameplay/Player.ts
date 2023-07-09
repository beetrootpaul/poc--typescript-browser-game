import { spr_, transparent, Xy, xy_ } from "@framework";
import { type CollisionCircle } from "../Collisions.ts";
import { f, g, p8c } from "../globals.ts";
import { Direction } from "./Direction.ts";
import { Origin } from "./Origin.ts";

export class Player extends Origin {
  readonly #r = 3;
  readonly #speed = 2;

  #xy: Xy = g.gameAreaSize.div(2);

  // Let's start right (but it's effectively unused, because we
  //   let the user to choose the direction at the game's start).
  #direction: Direction = "r";
  #dXy = xy_(this.#speed, 0);

  readonly #spriteForDirection = {
    u: spr_(xy_(7, 2).mul(g.spriteSheetCellSize), g.spriteSheetCellSize),
    r: spr_(xy_(8, 2).mul(g.spriteSheetCellSize), g.spriteSheetCellSize),
    d: spr_(xy_(9, 2).mul(g.spriteSheetCellSize), g.spriteSheetCellSize),
    l: spr_(xy_(10, 2).mul(g.spriteSheetCellSize), g.spriteSheetCellSize),
  };

  center(): Xy {
    return this.#xy;
  }

  r(): number {
    return this.#r;
  }

  direction(): Direction {
    return this.#direction;
  }

  xy1(): Xy {
    return this.#xy.sub(this.#r);
  }

  xy2(): Xy {
    return this.#xy.add(this.#r);
  }

  collisionCircle(): CollisionCircle {
    return {
      center: this.#xy,
      r: this.#r,
    };
  }

  // TODO: replace all these 4 methods with a single one which takes Direction as a param
  directLeft(): void {
    this.#dXy = xy_(-this.#speed, 0);
    this.#direction = "l";
  }

  directRight(): void {
    this.#dXy = xy_(this.#speed, 0);
    this.#direction = "r";
  }

  directUp(): void {
    this.#dXy = xy_(0, -this.#speed);
    this.#direction = "u";
  }

  directDown(): void {
    this.#dXy = xy_(0, this.#speed);
    this.#direction = "d";
  }

  move(): void {
    this.#xy = this.#xy.add(this.#dXy);
    this.#xy = this.#xy.clamp(
      xy_(this.#r, this.#r),
      g.gameAreaSize.sub(this.#r + 1)
    );
  }

  draw() {
    // TODO: still needed to disable black -> transparent mapping the way it was in Lua version?
    f.drawApi.mapSpriteColor(p8c.Black, p8c.Black);
    f.drawApi.mapSpriteColor(p8c.DarkBlue, transparent);

    f.drawApi.sprite(
      g.assets.spritesheet,
      this.#spriteForDirection[this.#direction],
      this.#xy.sub(this.#r)
    );

    // TODO: API to reset all mappings?
    // TODO: in Lua version it was a reset of all to-transparency mapping (and probably set black as transparent again?)
    f.drawApi.mapSpriteColor(p8c.DarkBlue, p8c.DarkBlue);

    // TODO: migrate from Lua
    //     if __debug__ then
    //         circfill(x, y, r, u.colors.red)
    //     end
  }
}
