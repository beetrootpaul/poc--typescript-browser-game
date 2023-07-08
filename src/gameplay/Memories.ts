import { p8c } from "../globals.ts";
import { Memory } from "./Memory.ts";
import { Player } from "./Player.ts";
import { Trail } from "./Trail.ts";

type MemoriesParams = {
  player: Player;
};

export class Memories {
  readonly #player: Player;

  readonly #memoriesFromFirstToLast: Memory[] = [];
  readonly #trails: Trail[] = [];

  // TODO: migrate from Lua
  // local trails = {}

  constructor(params: MemoriesParams) {
    this.#player = params.player;
  }

  addMemory(): void {
    const memory = new Memory({
      origin:
        this.#memoriesFromFirstToLast.length > 0
          ? this.#memoriesFromFirstToLast[
              this.#memoriesFromFirstToLast.length - 1
            ]
          : this.#player,
    });

    this.#memoriesFromFirstToLast.push(memory);

    this.#trails.push(
      new Trail({
        origin: memory,
        color: p8c.DarkPurple,
      })
    );
  }

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

  hasPlayerCollidedWithMemory(): boolean {
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

     */
    return false;
    // TODO: migrate from Lua
    /*
end
*/
  }

  draw() {
    this.#trails.forEach((trail) => {
      trail.draw();
    });
    this.#memoriesFromFirstToLast.forEach((memory) => {
      memory.draw();
    });
  }
}
