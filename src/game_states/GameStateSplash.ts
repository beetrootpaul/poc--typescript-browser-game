import type { GameDrawContext } from "@framework";
import { g } from "../globals.ts";
import { Sash } from "../gui/Sash.ts";
import { Pico8Colors } from "../Pico8Color.ts";
import { GameState } from "./GameState.ts";

export class GameStateSplash implements GameState {
  // TODO: migrate from Lua
  readonly #sash: Sash = new Sash();
  /*
      local sash = new_sash({
        duration = 10 * a.music_beat_frames,
        expand = false,
        draw_text = function(sash_center_x, sash_center_y)
            local title = "avoid your past"
            local title_w = u.measure_text_width(title)
            local author = "by @beetrootpaul"
            local author_w = u.measure_text_width(author)
            u.print_with_outline(
                title,
                sash_center_x - title_w / 2,
                sash_center_y - u.text_height_px - 3,
                u.colors.pink,
                u.colors.black
            )
            print(
                author,
                sash_center_x - author_w / 2,
                sash_center_y + 2,
                u.colors.white
            )
        end,
    })
    audio.play_music()
    audio.enable_music_layers { false, false, false }
   */

  update(): GameState {
    // TODO: migrate from Lua
    /*
        if sash.has_collapsed() then
            return new_game_state_start()
        end

        if btnp(u.buttons.l) or btnp(u.buttons.r) or btnp(u.buttons.u) or btnp(u.buttons.d) then
            sash.collapse()
        end

        sash.advance_1_frame()
     */

    return this;
  }

  draw({ drawApi }: GameDrawContext): void {
    drawApi.drawRectFilled(
      g.cameraOffset,
      g.cameraOffset.add(g.screenSize),
      // TODO: migrate from Lua: a.bg_color_mode_normal
      Pico8Colors.DarkBlue
    );

    // TODO: move API access to some globals, so it will be as easy as in PICO-8 to just draw stuff, play music, etc.
    this.#sash.draw({ drawApi });
  }
}
