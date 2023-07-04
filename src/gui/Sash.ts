import { GameDrawContext, xy_ } from "@framework";
import { g } from "../globals.ts";
import { Pico8Colors } from "../Pico8Color.ts";

export class Sash {
  // TODO: migrate from Lua
  /*
  function new_sash(params)
    local ttl_max = params.duration
    local should_expand = params.expand
    local draw_text = params.draw_text

    local ttl_expansion_start = should_expand and (ttl_max - a.music_beat_frames) or ttl_max
    local ttl_expansion_end = should_expand and (ttl_expansion_start - a.music_beat_frames / 4) or ttl_max
    local ttl_collapse_start = a.music_beat_frames / 4
    local ttl = ttl_max
   */

  readonly #center = g.cameraOffset.add(g.screenSize.div(2));

  readonly #hMax = 30;

  // TODO: migrate from Lua
  /*
      function s.has_collapsed()
        return ttl <= 0
    end
   */
  // TODO: migrate from Lua
  /*
    function s.has_expanded()
        return ttl <= ttl_expansion_end
    end
   */
  // TODO: migrate from Lua
  /*
    function s.collapse()
        ttl = ttl_collapse_start
    end
   */
  // TODO: migrate from Lua
  /*
    function s.advance_1_frame()
        ttl = ttl - 1
    end
   */

  draw({ drawApi }: GameDrawContext): void {
    // TODO: migrate from Lua
    const h = this.#hMax;
    /*
      function s.draw()
          local h
          if ttl > ttl_expansion_start then
              h = 0
          elseif ttl > ttl_expansion_end then
              h = h_max * (ttl_expansion_start - ttl) / (ttl_expansion_start - ttl_expansion_end)
          elseif ttl > ttl_collapse_start then
              h = h_max
          else
              h = h_max * ttl / ttl_collapse_start
          end

          if h > 0 then
          */
    drawApi.drawRectFilled(
      xy_(0, this.#center.y - h / 2),
      xy_(g.screenSize.x, this.#center.y + h / 2),
      Pico8Colors.DarkGreen
    );
    // TODO: migrate from Lua
    /*
          end

          if h >= h_max then
              draw_text(center_x, center_y)
          end
      end
     */
  }
}
