import type { GameDrawContext, GameUpdateContext } from "@framework";
import { StorageApiValueConstraint } from "@framework";
import { Level } from "../gameplay/Level.ts";
import { GameState } from "./GameState.ts";
import { GameStateOver } from "./GameStateOver.ts";

type GameStateGameplayParams = {
  level: Level;
};

export class GameStateGameplay<
  StorageApiValue extends StorageApiValueConstraint
> implements GameState<StorageApiValue>
{
  readonly #level: Level;

  // TODO: migrate from Lua
  // local memories = new_memories {
  // player = player,
  // }
  // local player_trail = new_trail {
  //   origin = player,
  //     color = u.colors.dark_green,
  // }

  constructor(params: GameStateGameplayParams) {
    // TODO: migrate from Lua
    // local mode = params.mode
    // local topbar = params.topbar
    // local score = params.score
    this.#level = params.level;
    // TODO: migrate from Lua
    // local player = params.player
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

        level.check_collisions {
            on_coin = on_coin_collision,
            on_droplet_no_coins = on_droplet_no_coins_collision,
            on_droplet_no_memories = on_droplet_no_memories_collision,
        }

        level.animate()

        player_trail.update()
        player.move()

        memories.move()

        if not mode.is_no_memories() then
            if memories.has_player_collided_with_memory() then
            */
    return new GameStateOver({
      // TODO: migrate from Lua
      // score = score,
      level: this.#level,
      // TODO: migrate from Lua
      // player = player,
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
    /*
        level.draw_items()

        player_trail.draw()
        player.draw()

        if not mode.is_no_memories() then
            memories.draw()
        end

        topbar.draw()
     */
  }
}
