import { GameDrawContext, transparent, Xy, xy_ } from "@framework";
import { s_imgBytes, s_imgType, s_imgW } from "../Game.ts";
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
    // TODO: still needed to disable black -> transparent mapping the way it was in Lua version?
    drawApi.mapSpriteColor(Pico8Colors.Black, Pico8Colors.Black);
    drawApi.mapSpriteColor(Pico8Colors.DarkBlue, transparent);

    // TODO: REWORK THIS
    if (s_imgBytes) {
      // TODO: migrate from Lua
      // sprite_for_direction[direction]
      drawApi.drawSomething(
        s_imgBytes,
        s_imgW,
        s_imgType,
        xy_(7 * 8, 2 * 8),
        xy_(7 * 8 + 8, 2 * 8 + 8),
        this.#xy.sub(this.#r)
      );
      // TODO: API to reset all mappings?
      drawApi.mapSpriteColor(Pico8Colors.DarkBlue, Pico8Colors.DarkBlue);
    }

    // TODO: in Lua version it was a reset of all to-transparency mapping (and probably set black as transparent again?)
    drawApi.mapSpriteColor(Pico8Colors.DarkBlue, Pico8Colors.DarkBlue);

    // TODO: migrate from Lua
    //     if __debug__ then
    //         circfill(x, y, r, u.colors.red)
    //     end
  }
}
