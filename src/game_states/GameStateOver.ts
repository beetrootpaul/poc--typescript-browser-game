import type { GameUpdateContext } from "@framework";
import { StorageApiValueConstraint } from "@framework";
import { Level } from "../gameplay/Level.ts";
import { Player } from "../gameplay/Player.ts";
import { Score } from "../gameplay/Score.ts";
import { f, g } from "../globals.ts";
import { Sash } from "../gui/Sash.ts";
import { GameState } from "./GameState.ts";
import { GameStateStart } from "./GameStateStart.ts";

type GameStateOverParams = {
  score: Score;
  level: Level;
  player: Player;
};

export class GameStateOver<StorageApiValue extends StorageApiValueConstraint>
  implements GameState<StorageApiValue>
{
  readonly #score: Score;
  readonly #level: Level;
  readonly #player: Player;

  readonly #sash: Sash = new Sash({
    duration: 10 * g.musicBeatFrames,
    expand: true,
  });
  // TODO: migrate from Lua
  /*
    local sash = new_sash({
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
    this.#score = params.score;
    this.#level = params.level;
    this.#player = params.player;
  }

  update(): GameState<StorageApiValue> {
    if (this.#sash.has_collapsed()) {
      return new GameStateStart();
    }

    if (this.#sash.hasExpanded()) {
      if (
        f.gameInputEvents.has("left") ||
        f.gameInputEvents.has("right") ||
        f.gameInputEvents.has("up") ||
        f.gameInputEvents.has("down")
      ) {
        this.#sash.collapse();
      }
    }

    this.#sash.advance1Frame();

    return this;
  }

  draw(): void {
    this.#level.drawBg();

    // TODO: migrate from Lua
    // level.draw_items()
    // player.draw()

    this.#sash.draw();
  }
}
