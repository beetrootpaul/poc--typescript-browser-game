import { Collisions } from "../Collisions.ts";
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

  constructor(params: MemoriesParams) {
    this.#player = params.player;
  }

  addMemory(): void {
    const memory = new Memory({
      origin:
        this.#memoriesFromFirstToLast.length > 0
          ? this.#memoriesFromFirstToLast[
              this.#memoriesFromFirstToLast.length - 1
            ]!
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

  move(): void {
    this.#trails.forEach((trail) => {
      trail.update();
    });
    this.#memoriesFromFirstToLast.forEach((memory) => {
      memory.followOrigin();
    });
  }

  hasPlayerCollidedWithMemory(): boolean {
    return this.#memoriesFromFirstToLast.some(
      (memory) =>
        memory.isActive() &&
        Collisions.haveCirclesCollided(
          this.#player.collisionCircle(),
          memory.collisionCircle()
        )
    );
  }

  draw(): void {
    this.#trails.forEach((trail) => {
      trail.draw();
    });
    this.#memoriesFromFirstToLast.forEach((memory) => {
      memory.draw();
    });
  }
}
