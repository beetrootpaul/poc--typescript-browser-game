import { GlobalApi, transparent, Xy, xy_ } from "@framework";
import { type CollisionCircle } from "../Collisions.ts";
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

  readonly #direction: "l" | "r" | "u" | "d" = "r";
  readonly #spriteForDirection = {
    u: { spriteSheetCell: xy_(7, 2) },
    r: { spriteSheetCell: xy_(8, 2) },
    d: { spriteSheetCell: xy_(9, 2) },
    l: { spriteSheetCell: xy_(10, 2) },
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

  draw() {
    // TODO: still needed to disable black -> transparent mapping the way it was in Lua version?
    GlobalApi.drawApi.mapSpriteColor(Pico8Colors.Black, Pico8Colors.Black);
    GlobalApi.drawApi.mapSpriteColor(Pico8Colors.DarkBlue, transparent);

    // TODO: REWORK THIS
    if (s_imgBytes) {
      GlobalApi.drawApi.drawSomething(
        s_imgBytes,
        s_imgW,
        s_imgType,
        this.#spriteForDirection[this.#direction].spriteSheetCell.mul(8),
        this.#spriteForDirection[this.#direction].spriteSheetCell.mul(8).add(8),
        this.#xy.sub(this.#r)
      );
    }

    // TODO: API to reset all mappings?
    // TODO: in Lua version it was a reset of all to-transparency mapping (and probably set black as transparent again?)
    GlobalApi.drawApi.mapSpriteColor(
      Pico8Colors.DarkBlue,
      Pico8Colors.DarkBlue
    );

    // TODO: migrate from Lua
    //     if __debug__ then
    //         circfill(x, y, r, u.colors.red)
    //     end
  }
}
