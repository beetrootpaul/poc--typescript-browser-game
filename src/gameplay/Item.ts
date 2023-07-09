import { transparent, Xy } from "@framework";
import { type CollisionCircle } from "../Collisions.ts";
import { f, g, p8c } from "../globals.ts";
import { AnimatedSprite } from "./AnimatedSprite.ts";

type ItemParams = {
  tile: Xy;
  collisionCircleR: number;
  animatedSprite: AnimatedSprite;
};

export class Item {
  readonly #tile: Xy;
  readonly #collisionCircleR: number;
  readonly #animatedSprite: AnimatedSprite;

  constructor(params: ItemParams) {
    this.#tile = params.tile;
    this.#collisionCircleR = params.collisionCircleR;
    this.#animatedSprite = params.animatedSprite;
  }

  collisionCircle(): CollisionCircle {
    return {
      center: this.#tile.sub(1).mul(g.tileSize).add(g.tileSize.div(2)).sub(0.5),
      r: this.#collisionCircleR,
    };
  }

  animate(): void {
    this.#animatedSprite.advance1Frame();
  }

  draw(): void {
    // TODO: still needed to disable black -> transparent mapping the way it was in Lua version?
    f.drawApi.mapSpriteColor(p8c.Black, p8c.Black);
    f.drawApi.mapSpriteColor(p8c.DarkBlue, transparent);

    f.drawApi.sprite(
      g.assets.spritesheet,
      this.#animatedSprite.currentSprite(),
      this.#tile.sub(1).mul(g.tileSize)
    );

    // TODO: API to reset all mappings?
    // TODO: in Lua version it was a reset of all to-transparency mapping (and probably set black as transparent again?)
    f.drawApi.mapSpriteColor(p8c.DarkBlue, p8c.DarkBlue);
  }
}
