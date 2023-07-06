import type { GameDrawContext, GameUpdateContext } from "@framework";
import { StorageApiValueConstraint } from "@framework";
import { g } from "../globals.ts";
import { Sash } from "../gui/Sash.ts";
import { Pico8Colors } from "../Pico8Color.ts";
import { GameState } from "./GameState.ts";
import { GameStateStart } from "./GameStateStart.ts";

export class GameStateSplash<StorageApiValue extends StorageApiValueConstraint>
  implements GameState<StorageApiValue>
{
  // TODO: migrate from Lua
  readonly #sash: Sash = new Sash({
    duration: 10 * g.musicBeatFrames,
    expand: false,
  });

  /*
      local sash = new_sash({
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

  update({
    gameInputEvents,
  }: GameUpdateContext<StorageApiValue>): GameState<StorageApiValue> {
    if (this.#sash.has_collapsed()) {
      return new GameStateStart();
    }

    if (
      gameInputEvents.has("left") ||
      gameInputEvents.has("right") ||
      gameInputEvents.has("up") ||
      gameInputEvents.has("down")
    ) {
      this.#sash.collapse();
    }

    this.#sash.advance1Frame();

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
