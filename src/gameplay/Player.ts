import { spr_, transparent, Xy, xy_ } from "@framework";
import { type CollisionCircle } from "../Collisions.ts";
import { s_imgBytes, s_imgType, s_imgW } from "../Game.ts";
import { f, g, p8c } from "../globals.ts";

export class Player {
  readonly #r = 3;
  readonly #speed = 2;

  #xy: Xy = g.gameAreaSize.div(2);

  // Let's start right (but it's effectively unused, because we
  //   let the user to choose the direction at the game's start).
  #direction: "l" | "r" | "u" | "d" = "r";
  #dxy = xy_(this.#speed, 0);

  readonly #spriteForDirection = {
    u: spr_(xy_(7, 2).mul(g.spriteSheetCellSize), g.spriteSheetCellSize),
    r: spr_(xy_(8, 2).mul(g.spriteSheetCellSize), g.spriteSheetCellSize),
    d: spr_(xy_(9, 2).mul(g.spriteSheetCellSize), g.spriteSheetCellSize),
    l: spr_(xy_(10, 2).mul(g.spriteSheetCellSize), g.spriteSheetCellSize),
  };

  // TODO: migrate from Lua
  /*
    function p.x1()
        return x - r
    end
    function p.xc()
        return x
    end
    function p.x2()
        return x + r
    end
    function p.y1()
        return y - r
    end
    function p.yc()
        return y
    end
    function p.y2()
        return y + r
    end
    function p.r()
        return r
    end
    function p.direction()
        return direction
    end
   */

  collisionCircle(): CollisionCircle {
    return {
      // TODO: migrate from Lua
      // x = x, y = y, r = r
    };
  }

  directLeft(): void {
    this.#dxy = xy_(-this.#speed, 0);
    this.#direction = "l";
  }

  directRight(): void {
    this.#dxy = xy_(this.#speed, 0);
    this.#direction = "r";
  }

  directUp(): void {
    this.#dxy = xy_(0, -this.#speed);
    this.#direction = "u";
  }

  directDown(): void {
    this.#dxy = xy_(0, this.#speed);
    this.#direction = "d";
  }

  move(): void {
    this.#xy = this.#xy.add(this.#dxy);
    this.#xy = this.#xy.clamp(
      xy_(this.#r, this.#r),
      g.gameAreaSize.sub(this.#r + 1)
    );
  }

  draw() {
    // TODO: still needed to disable black -> transparent mapping the way it was in Lua version?
    f.drawApi.mapSpriteColor(p8c.Black, p8c.Black);
    f.drawApi.mapSpriteColor(p8c.DarkBlue, transparent);

    // TODO: REWORK THIS
    if (s_imgBytes) {
      f.drawApi.drawSprite(
        s_imgBytes,
        s_imgW,
        s_imgType,
        this.#spriteForDirection[this.#direction],
        this.#xy.sub(this.#r)
      );
    }

    // TODO: API to reset all mappings?
    // TODO: in Lua version it was a reset of all to-transparency mapping (and probably set black as transparent again?)
    f.drawApi.mapSpriteColor(p8c.DarkBlue, p8c.DarkBlue);

    // TODO: migrate from Lua
    //     if __debug__ then
    //         circfill(x, y, r, u.colors.red)
    //     end
  }
}
