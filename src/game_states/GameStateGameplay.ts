import type { GameDrawContext, GameUpdateContext } from "@framework";
import { StorageApiValueConstraint } from "@framework";
import { Level } from "../gameplay/Level.ts";
import { Memories } from "../gameplay/Memories.ts";
import { Mode } from "../gameplay/Mode.ts";
import { Player } from "../gameplay/Player.ts";
import { Score } from "../gameplay/Score.ts";
import { Trail } from "../gameplay/Trail.ts";
import { Topbar } from "../gui/Topbar.ts";
import { Pico8Colors } from "../Pico8Color.ts";
import { GameState } from "./GameState.ts";
import { GameStateOver } from "./GameStateOver.ts";

type GameStateGameplayParams = {
  mode: Mode;
  topbar: Topbar;
  score: Score;
  level: Level;
  player: Player;
};

// TODO: make it not needed to pass <StorageApiValueConstraint> by maybe decoupling what goes into `update`
export class GameStateGameplay<
  StorageApiValue extends StorageApiValueConstraint
> implements GameState<StorageApiValue>
{
  readonly #mode: Mode;
  readonly #topbar: Topbar;
  readonly #score: Score;
  readonly #level: Level;
  readonly #player: Player;
  readonly #memories: Memories;
  readonly #playerTrail: Trail;

  constructor(params: GameStateGameplayParams) {
    this.#mode = params.mode;
    this.#topbar = params.topbar;
    this.#score = params.score;
    this.#level = params.level;
    this.#player = params.player;
    this.#memories = new Memories({
      player: this.#player,
    });
    this.#playerTrail = new Trail({
      origin: this.#player,
      color: Pico8Colors.DarkGreen,
    });
  }

  // TODO: migrate from Lua
  // local function on_back_to_regular_mode()
  // audio.enable_music_layers { true, false, false }
  // end

  // TODO: migrate from Lua
  // local function on_coin_collision()
  // if mode.is_no_coins() then
  // return
  // end
  //
  // audio.play_sfx(a.sfx_coin)
  // score.add(10)
  // if not mode.is_no_memories() then
  // memories.add_memory()
  // end
  // level.remove_coin()
  // level.spawn_items()
  // end

  // TODO: migrate from Lua
  // local function on_droplet_no_coins_collision()
  // audio.enable_music_layers { true, false, true }
  // score.add(3)
  // mode.start_no_coins()
  // level.remove_droplet_no_coins()
  // end

  // TODO: migrate from Lua
  // local function on_droplet_no_memories_collision()
  // audio.enable_music_layers { true, true, false }
  // score.add(1)
  // mode.start_no_memories()
  // level.remove_droplet_no_memories()
  // end

  // TODO: migrate from Lua
  // audio.enable_music_layers { true, false, false }

  update({}: GameUpdateContext<StorageApiValue>): GameState<StorageApiValue> {
    // TODO: migrate from Lua
    /*
           if btnp(u.buttons.l) then
            player.direct_left()
        elseif btnp(u.buttons.r) then
            player.direct_right()
        elseif btnp(u.buttons.u) then
            player.direct_up()
        elseif btnp(u.buttons.d) then
            player.direct_down()
        end

        mode.update {
            on_back_to_regular_mode = on_back_to_regular_mode
        }
        */

    this.#level.checkCollisions();
    // TODO: migrate from Lua these params to checkCollisions()
    // {
    //         on_coin = on_coin_collision,
    //         on_droplet_no_coins = on_droplet_no_coins_collision,
    //         on_droplet_no_memories = on_droplet_no_memories_collision,
    //     }

    // TODO: migrate from Lua
    /*
    level.animate()

    player_trail.update()
    player.move()

    memories.move()

    if not mode.is_no_memories() then
        if memories.has_player_collided_with_memory() then
        */
    return new GameStateOver({
      score: this.#score,
      level: this.#level,
      player: this.#player,
    });
    // TODO: migrate from Lua
    /*
end
end
*/

    return this;
  }

  draw({ drawApi }: GameDrawContext): void {
    this.#level.drawBg({ drawApi });

    // TODO: migrate from Lua
    //     level.draw_items()

    this.#playerTrail.draw({ drawApi });
    this.#player.draw({ drawApi });

    if (!this.#mode.isNoMemories()) {
      this.#memories.draw({ drawApi });
    }

    this.#topbar.draw({ drawApi });
  }
}
