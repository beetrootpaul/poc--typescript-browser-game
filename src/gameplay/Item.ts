import { transparent, Xy } from "@framework";
import { type CollisionCircle } from "../Collisions.ts";
import { s_imgBytes, s_imgType, s_imgW } from "../Game.ts";
import { f, p8c } from "../globals.ts";
import { AnimatedSprite } from "./AnimatedSprite.ts";

type ItemParams = {
  animatedSprite: AnimatedSprite;
};

export class Item {
  readonly #animatedSprite: AnimatedSprite;

  constructor(params: ItemParams) {
    // TODO: migrate from Lua
    //   local tile_x = params.tile_x
    //   local tile_y = params.tile_y
    //   local collision_circle_r = params.collision_circle_r
    this.#animatedSprite = params.animatedSprite;
  }

  collisionCircle(): CollisionCircle {
    return {
      // TODO: migrate from Lua
      // x = (tile_x - 1) * u.tile_px + u.tile_px / 2 - 0.5,
      // y = (tile_y - 1) * u.tile_px + u.tile_px / 2 - 0.5,
      // r = collision_circle_r,
    };
  }

  animate(): void {
    this.#animatedSprite.advance1Frame();
  }

  draw(): void {
    // TODO: still needed to disable black -> transparent mapping the way it was in Lua version?
    f.drawApi.mapSpriteColor(p8c.Black, p8c.Black);
    f.drawApi.mapSpriteColor(p8c.DarkBlue, transparent);

    // TODO: REWORK THIS
    if (s_imgBytes) {
      f.drawApi.drawSprite(
        s_imgBytes,
        s_imgW,
        s_imgType,
        this.#animatedSprite.currentSprite(),
        // TODO: migrate from Lua
        Xy.zero
        // (tile_x - 1) * u.tile_px, (tile_y - 1) * u.tile_px
      );
    }

    // TODO: API to reset all mappings?
    // TODO: in Lua version it was a reset of all to-transparency mapping (and probably set black as transparent again?)
    f.drawApi.mapSpriteColor(p8c.DarkBlue, p8c.DarkBlue);
  }
}
