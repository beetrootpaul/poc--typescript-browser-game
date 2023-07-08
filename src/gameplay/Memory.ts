import { spr_, transparent, Xy, xy_ } from "@framework";
import { s_imgBytes, s_imgType, s_imgW } from "../Game.ts";
import { f, g, p8c } from "../globals.ts";
import { Direction } from "./Direction.ts";
import { Origin } from "./Origin.ts";

type MemoryParams = {
  origin: Origin;
};

export class Memory implements Origin {
  readonly #origin: Origin;
  readonly #xy: Xy;
  readonly #r: number;
  readonly #direction: Direction;

  readonly #spriteForDirection = {
    u: spr_(xy_(7, 3).mul(g.spriteSheetCellSize), g.spriteSheetCellSize),
    r: spr_(xy_(8, 3).mul(g.spriteSheetCellSize), g.spriteSheetCellSize),
    d: spr_(xy_(9, 3).mul(g.spriteSheetCellSize), g.spriteSheetCellSize),
    l: spr_(xy_(10, 3).mul(g.spriteSheetCellSize), g.spriteSheetCellSize),
  };

  constructor(params: MemoryParams) {
    this.#origin = params.origin;
    this.#xy = this.#origin.center();
    this.#r = this.#origin.r();
    this.#direction = this.#origin.direction();
  }

  // TODO: migrate from Lua
  /*
    local origin_state_delay = 40
    local origin_state_buffer = {}
    local origin_state_buffer_index = 1
   */

  // TODO: migrate from Lua
  /*
    local function is_active()
        return #origin_state_buffer > origin_state_delay
    end
   */

  center(): Xy {
    return this.#xy;
  }

  r(): number {
    return this.#r;
  }

  direction(): Direction {
    return this.#direction;
  }

  // TODO: migrate from Lua
  /*
    function m.collision_circle()
        return { x = x, y = y, r = r }
    end
   */

  // TODO: migrate from Lua
  /*
    function m.is_active()
        return is_active()
    end
   */

  // TODO: migrate from Lua
  /*
    function m.follow_origin()
        origin_state_buffer[origin_state_buffer_index] = {
            x = origin.xc(),
            y = origin.yc(),
            r = origin.r(),
            direction = origin.direction(),
        }

        local offset_for_1_indexed_table = 1
        local delayed_state_index = (origin_state_buffer_index - origin_state_delay - offset_for_1_indexed_table) %
            (origin_state_delay + 1) +
            offset_for_1_indexed_table
        local delayed_state = origin_state_buffer[delayed_state_index]
        if delayed_state then
            x = delayed_state.x
            y = delayed_state.y
            r = delayed_state.r
            direction = delayed_state.direction
        end
        origin_state_buffer_index = (origin_state_buffer_index + 1 - offset_for_1_indexed_table)
            % (origin_state_delay + 1)
            + offset_for_1_indexed_table
    end
   */

  // TODO: migrate from Lua
  /*
    function m.draw()
        palt(u.colors.black, false)
        palt(u.colors.dark_blue, true)
        if is_active() then
            spr(
                sprite_for_direction[direction],
                x - r,
                y - r
            )
        end
        palt()
        if __debug__ then
            circfill(x, y, r, is_active() and u.colors.salmon or u.colors.violet_grey)
        end
    end
   */

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
    // if __debug__ then
    //      circfill(x, y, r, is_active() and u.colors.salmon or u.colors.violet_grey)
    // end
  }
}
