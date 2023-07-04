import type { GameDrawContext, GameUpdateContext } from "@framework";
import { StorageApiValueConstraint } from "@framework";
import { Level } from "../gameplay/Level.ts";
import { g } from "../globals.ts";
import { Sash } from "../gui/Sash.ts";
import { GameState } from "./GameState.ts";
import { GameStateStart } from "./GameStateStart.ts";

type GameStateOverParams = {
  level: Level;
};

export class GameStateOver<StorageApiValue extends StorageApiValueConstraint>
  implements GameState<StorageApiValue>
{
  // TODO: migrate from Lua
  readonly #level = new Level();

  readonly #sash: Sash = new Sash({
    duration: 10 * g.musicBeatFrames,
  });
  // TODO: migrate from Lua
  /*
    local sash = new_sash({
        expand = true,
        draw_text = function(sash_center_x, sash_center_y)
            local heading = "your score"
            local heading_w = u.measure_text_width(heading)
            local final_score = tostr(score.value())
            local final_score_w = u.measure_text_width(final_score)
            print(
                heading,
                sash_center_x - heading_w / 2,
                sash_center_y - u.text_height_px - 3,
                u.colors.white
            )
            u.print_with_outline(
                final_score,
                sash_center_x - final_score_w / 2,
                sash_center_y + 2,
                u.colors.pink,
                u.colors.black
            )
        end,
    })
   */

  // TODO: migrate from Lua
  // audio.enable_music_layers { false, false, false }

  constructor(params: GameStateOverParams) {
    // TODO: migrate from Lua
    // local score = params.score
    this.#level = params.level;
    // TODO: migrate from Lua
    // local player = params.player
  }

  update({
    gameInputEvents,
  }: GameUpdateContext<StorageApiValue>): GameState<StorageApiValue> {
    if (this.#sash.has_collapsed()) {
      return new GameStateStart();
    }

    // TODO: migrate from Lua
    /*
        if sash.has_expanded() then
            if btnp(u.buttons.l) or btnp(u.buttons.r) or btnp(u.buttons.u) or btnp(u.buttons.d) then
                sash.collapse()
            end
        end
     */

    this.#sash.advance1Frame();

    return this;
  }

  draw({ drawApi }: GameDrawContext): void {
    this.#level.drawBg({ drawApi });

    // TODO: migrate from Lua
    // level.draw_items()
    // player.draw()

    this.#sash.draw({ drawApi });
  }
}
