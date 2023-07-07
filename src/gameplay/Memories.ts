import { GameDrawContext } from "@framework";
import { Memory } from "./Memory.ts";
import { Player } from "./Player.ts";

type MemoriesParams = {
  player: Player;
};

export class Memories {
  readonly #player: Player;

  readonly #memoriesFromFirstToLast: Memory[] = [];

  // TODO: migrate from Lua
  // local trails = {}

  constructor(params: MemoriesParams) {
    this.#player = params.player;
  }

  // TODO: migrate from Lua
  /*
    function mm.add_memory()
        local memory = new_memory {
            origin = memories_from_first_to_last[#memories_from_first_to_last] or player
        }
        memories_from_first_to_last[#memories_from_first_to_last + 1] = memory
        add(trails, new_trail {
            origin = memory,
            color = u.colors.purple,
        })
    end
   */

  // TODO: migrate from Lua
  /*
    function mm.move()
        for trail in all(trails) do
            trail.update()
        end
        for memory in all(memories_from_first_to_last) do
            memory.follow_origin()
        end
    end
   */

  // TODO: migrate from Lua
  /*
    function mm.has_player_collided_with_memory()
        for memory in all(memories_from_first_to_last) do
            if memory.is_active() and collisions.have_circles_collided(
                player.collision_circle(),
                memory.collision_circle()
            ) then
                return true
            end
        end
        return false
    end
   */

  draw({ drawApi }: GameDrawContext) {
    // TODO: migrate from Lua
    // for trail in all(trails) do
    //   trail.draw()
    //   end
    // TODO: migrate from Lua
    this.#memoriesFromFirstToLast.forEach((memory) => {
      memory.draw({ drawApi });
    });
  }
}
