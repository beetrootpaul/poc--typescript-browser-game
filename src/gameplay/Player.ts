import { Color, GameDrawContext, Xy } from "@framework";
import { g } from "../globals.ts";
import { Pico8Colors } from "../Pico8Color.ts";

export class Player {
  readonly #xy: Xy = g.gameAreaSize.div(2);
  readonly #r: number = 3;

  // TODO: migrate from Lua
  /*
   local speed = 2
    local dx = speed
    local dy = 0
   */

  // TODO: migrate from Lua
  /*
    local direction = "r"
    local sprite_for_direction = {
        u = 39,
        r = 40,
        d = 41,
        l = 42,
    }
   */

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

  // TODO: migrate from Lua
  /*
    function p.collision_circle()
        return { x = x, y = y, r = r }
    end
   */
  // TODO: migrate from Lua
  /*
  function p.direct_left()
        dx, dy = -speed, 0
        direction = "l"
    end
    function p.direct_right()
        dx, dy = speed, 0
        direction = "r"
    end
    function p.direct_up()
        dx, dy = 0, -speed
        direction = "u"
    end
    function p.direct_down()
        dx, dy = 0, speed
        direction = "d"
    end
   */

  // TODO: migrate from Lua
  /*
    function p.move()
        x = x + dx
        y = y + dy
        x = mid(r, x, a.game_area_w - r - 1)
        y = mid(r, y, a.game_area_h - r - 1)
    end
   */

  draw({ drawApi }: GameDrawContext) {
    // TODO: REMOVE this temporary logic and migrate from Lua the proper code below
    drawApi.mapSpriteColor(Pico8Colors.Black, Pico8Colors.Lavender);
    // palt(u.colors.black, false)
    // palt(u.colors.dark_blue, true)

    // TODO: REMOVE this temporary rect migrate from Lua the proper code below
    drawApi.drawRectFilled(
      this.#xy.sub(this.#r),
      this.#xy.add(this.#r),
      Pico8Colors.Green
    );
    /*
        spr(
            sprite_for_direction[direction],
            x - r,
            y - r
        )
        */

    // TODO: migrate from Lua
    //     palt()
    //     if __debug__ then
    //         circfill(x, y, r, u.colors.red)
    //     end
  }
}
