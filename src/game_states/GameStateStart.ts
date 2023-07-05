import type { GameDrawContext, GameUpdateContext } from "@framework";
import { StorageApiValueConstraint } from "@framework";
import { Level } from "../gameplay/Level.ts";
import { Topbar } from "../gui/Topbar.ts";
import { GameState } from "./GameState.ts";
import { GameStateGameplay } from "./GameStateGameplay.ts";

export class GameStateStart<StorageApiValue extends StorageApiValueConstraint>
  implements GameState<StorageApiValue>
{
  // TODO: migrate from Lua
  //     local score = new_score()
  //   local mode = new_mode()
  // TODO: migrate from Lua
  readonly #topbar = new Topbar();
  // score = score,
  // mode = mode,
  // TODO: migrate from Lua
  //   local player = new_player()

  // TODO: migrate from Lua
  readonly #level = new Level();

  /*
    local level = new_level {
        mode = mode,
        player = player,
    }

    audio.enable_music_layers { false, false, false }

    level.spawn_items()
   */

  update({
    gameInputEvents,
  }: GameUpdateContext<StorageApiValue>): GameState<StorageApiValue> {
    let hasStarted = false;
    // TODO: implement one directional input clear another, like left+right = nothing
    if (gameInputEvents.has("left")) {
      // TODO: migrate from Lua
      // player.direct_left()
      hasStarted = true;
    } else if (gameInputEvents.has("right")) {
      // TODO: migrate from Lua
      // player.direct_right()
      hasStarted = true;
    } else if (gameInputEvents.has("up")) {
      // TODO: migrate from Lua
      // player.direct_up()
      hasStarted = true;
    } else if (gameInputEvents.has("down")) {
      // TODO: migrate from Lua
      // player.direct_down()
      hasStarted = true;
    }

    if (hasStarted) {
      return new GameStateGameplay({
        // TODO: migrate from Lua
        // mode = mode,
        topbar: this.#topbar,
        // TODO: migrate from Lua
        // score = score,
        level: this.#level,
        // TODO: migrate from Lua
        // player = player,
      });
    }

    return this;
  }

  draw({ drawApi }: GameDrawContext): void {
    this.#level.drawBg({ drawApi });

    // TODO: migrate from Lua
    //     level.draw_items()
    //     player.draw()

    this.#topbar.draw({ drawApi });

    // TODO: migrate from Lua
    /*
        local margin = 6
        local prompt1 = "press an arrow"
        local prompt2 = "to choose direction"
        local prompt1_w = u.measure_text_width(prompt1)
        local prompt2_w = u.measure_text_width(prompt2)
        u.print_with_outline(prompt1, player.xc() - prompt1_w / 2, player.y1() - margin - 26, u.colors.violet_grey, u.colors.dark_blue)
        u.print_with_outline(prompt2, player.xc() - prompt2_w / 2, player.y1() - margin - 17, u.colors.violet_grey, u.colors.dark_blue)
        local time_dependent_boolean = u.boolean_changing_every_nth_second(a.music_beat_frames / a.fps)
        local glyph_color = time_dependent_boolean and u.colors.violet_grey or u.colors.blue
        u.print_with_outline("⬅️", player.x1() - margin - 8, player.yc() - 2, glyph_color, u.colors.dark_blue)
        u.print_with_outline("➡️", player.x2() + margin + 2, player.yc() - 2, glyph_color, u.colors.dark_blue)
        u.print_with_outline("⬆️", player.xc() - 3, player.y1() - margin - 6, glyph_color, u.colors.dark_blue)
        u.print_with_outline("⬇️", player.xc() - 3, player.y2() + margin + 2, glyph_color, u.colors.dark_blue)
     */
  }
}
