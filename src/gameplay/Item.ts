import { type CollisionCircle } from "../Collisions.ts";
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

  // TODO: migrate from Lua
  /*
    function it.animate()
        animated_sprite.advance_1_frame()
    end
   */
  // TODO: migrate from Lua
  /*
    function it.draw()
        palt(u.colors.black, false)
        palt(u.colors.dark_blue, true)
        spr(
            animated_sprite.current_sprite(),
            (tile_x - 1) * u.tile_px,
            (tile_y - 1) * u.tile_px
        )
        palt()
    end
   */
}
