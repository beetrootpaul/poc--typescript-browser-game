import { GameDrawContext, xy_ } from "@framework";
import { g } from "../globals.ts";
import { Pico8Colors } from "../Pico8Color.ts";

type SashOptions = {
  duration: number;
  expand: boolean;
};

export class Sash {
  readonly #ttlMax: number;

  readonly #shouldExpand: boolean;

  // TODO: migrate from Lua
  // local draw_text = params.draw_text

  readonly #ttlExpansionStart: number;
  readonly #ttlExpansionEnd: number;
  readonly #ttlCollapseStart: number = g.musicBeatFrames / 4;
  #ttl: number;

  readonly #center = g.cameraOffset.add(g.screenSize.div(2));

  readonly #hMax = 30;

  constructor(options: SashOptions) {
    this.#ttlMax = options.duration;
    this.#ttl = this.#ttlMax;

    this.#shouldExpand = options.expand;

    this.#ttlExpansionStart = this.#shouldExpand
      ? this.#ttlMax - g.musicBeatFrames
      : this.#ttlMax;
    this.#ttlExpansionEnd = this.#shouldExpand
      ? this.#ttlExpansionStart - g.musicBeatFrames / 4
      : this.#ttlMax;
  }

  has_collapsed(): boolean {
    return this.#ttl <= 0;
  }

  hasExpanded(): boolean {
    return this.#ttl <= this.#ttlExpansionEnd;
  }

  collapse(): void {
    this.#ttl = this.#ttlCollapseStart;
  }

  advance1Frame(): void {
    this.#ttl -= 1;
  }

  draw({ drawApi }: GameDrawContext): void {
    let h: number;
    if (this.#ttl > this.#ttlExpansionStart) {
      h = 0;
    } else if (this.#ttl > this.#ttlExpansionEnd) {
      h =
        (this.#hMax * (this.#ttlExpansionStart - this.#ttl)) /
        (this.#ttlExpansionStart - this.#ttlExpansionEnd);
    } else if (this.#ttl > this.#ttlCollapseStart) {
      h = this.#hMax;
    } else {
      h = (this.#hMax * this.#ttl) / this.#ttlCollapseStart;
    }

    if (h > 0) {
      drawApi.drawRectFilled(
        xy_(0, this.#center.y - h / 2),
        xy_(g.screenSize.x, this.#center.y + h / 2),
        Pico8Colors.DarkGreen
      );
    }

    // TODO: migrate from Lua
    /*
          if h >= h_max then
              draw_text(center_x, center_y)
          end
      end
     */
  }
}
