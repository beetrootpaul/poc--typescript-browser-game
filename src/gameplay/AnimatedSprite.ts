import { spr_, Sprite, xy_ } from "@framework";
import { g } from "../globals.ts";

type AnimatedSpriteParams = {
  firstSpriteSheetCell: number;
  numberOfSprites: number;
  framesPerSprite: number;
};

// TODO: sounds like something to be moved to the framework
export class AnimatedSprite {
  readonly #firstSpriteSheetCell: number;
  readonly #numberOfSprites: number;
  readonly #framesPerSprite: number;

  readonly #loopLengthFrames;
  #frameCounter;

  constructor(params: AnimatedSpriteParams) {
    this.#firstSpriteSheetCell = params.firstSpriteSheetCell;
    this.#numberOfSprites = params.numberOfSprites;
    this.#framesPerSprite = params.framesPerSprite;

    this.#loopLengthFrames = this.#framesPerSprite * this.#numberOfSprites;
    this.#frameCounter = 0;
  }

  advance1Frame(): void {
    this.#frameCounter = (this.#frameCounter + 1) % this.#loopLengthFrames;
  }

  currentSprite(): Sprite {
    let spriteIndex =
      this.#firstSpriteSheetCell +
      Math.floor(this.#frameCounter / this.#framesPerSprite);
    return spr_(
      xy_(
        spriteIndex % g.spriteSheetCells.x,
        Math.floor(spriteIndex / g.spriteSheetCells.x)
      ).mul(g.spriteSheetCellSize),
      g.spriteSheetCellSize
    );
  }
}
