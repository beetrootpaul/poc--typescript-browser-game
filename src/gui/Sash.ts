import { GameDrawContext, xy_ } from "@framework";
import { g } from "../globals.ts";
import { Pico8Colors } from "../Pico8Color.ts";

type SashOptions = {
  duration: number;
};

export class Sash {
  readonly #ttlMax: number;
  // TODO: migrate from Lua
  /*
    local should_expand = params.expand
    local draw_text = params.draw_text

    local ttl_expansion_start = should_expand and (ttl_max - a.music_beat_frames) or ttl_max
    local ttl_expansion_end = should_expand and (ttl_expansion_start - a.music_beat_frames / 4) or ttl_max
   */
  readonly #ttlCollapseStart: number = g.musicBeatFrames / 4;
  #ttl: number;

  readonly #center = g.cameraOffset.add(g.screenSize.div(2));

  readonly #hMax = 30;

  constructor(options: SashOptions) {
    this.#ttlMax = options.duration;
    this.#ttl = this.#ttlMax;
  }

  has_collapsed(): boolean {
    return this.#ttl <= 0;
  }

  // TODO: migrate from Lua
  /*
    function s.has_expanded()
        return ttl <= ttl_expansion_end
    end
   */

  collapse(): void {
    this.#ttl = this.#ttlCollapseStart;
  }

  advance1Frame(): void {
    this.#ttl -= 1;
  }

  draw({ drawApi }: GameDrawContext): void {
    // TODO: migrate from Lua
    let h: number;
    /*
          if ttl > ttl_expansion_start then
              h = 0
          elseif ttl > ttl_expansion_end then
              h = h_max * (ttl_expansion_start - ttl) / (ttl_expansion_start - ttl_expansion_end)
          */
    if (this.#ttl > this.#ttlCollapseStart) {
      h = this.#hMax;
    } else {
      h = (this.#hMax * this.#ttl) / this.#ttlCollapseStart;
    }

    if (h > 0) {
      drawApi.drawRectFilled(
        xy_(0, this.#center.y - h / 2),
        xy_(g.screenSize.x, this.#center.y + h / 2),
        Pico8Colors.DarkGreen
      );
    }

    // TODO: migrate from Lua
    /*
          if h >= h_max then
              draw_text(center_x, center_y)
          end
      end
     */
  }
}
