import { Utils, xy_ } from "@framework";
import { Mode } from "../gameplay/Mode.ts";
import { Score } from "../gameplay/Score.ts";
import { f, g, p8c } from "../globals.ts";

type TopbarParams = {
  score: Score;
  mode: Mode;
};

export class Topbar {
  readonly #score: Score;
  readonly #mode: Mode;

  constructor(params: TopbarParams) {
    this.#score = params.score;
    this.#mode = params.mode;
  }

  draw() {
    f.drawApi.rectFilled(
      g.cameraOffset,
      g.cameraOffset.add(g.topbarSize),
      p8c.Black
    );

    const modeLabel = this.#mode.label();
    if (modeLabel) {
      const textY = g.cameraOffset.y + 4;
      const modeLabelSize = Utils.measureTextSize(modeLabel);
      const progressW = modeLabelSize.x;
      const progressRemainingW = Math.floor(
        (this.#mode.percentageLeft() / 100) * progressW
      );
      const progressX = g.cameraOffset.x + g.screenSize.x - progressW - 1;
      const progressY = textY + modeLabelSize.y + 2;

      f.drawApi.print(modeLabel, xy_(progressX, textY), p8c.LightGrey);

      if (progressRemainingW > 0) {
        // TODO: replace with line drawing, once implemented in DrawApi
        for (
          let x = progressX + progressW - progressRemainingW;
          x <= progressX + progressW - 1;
          x += 1
        ) {
          f.drawApi.pixel(xy_(x, progressY), this.#mode.progressColor());
        }
        // line(
        //   progress_x + progress_w - progress_remaining_w,
        //   progress_y,
        //   progress_x + progress_w - 1,
        //   progress_y + progress_h - 1,
        //   mode.progress_color()
        // )
      }
    }

    f.drawApi.print(
      `score ${this.#score.value()}`,
      g.cameraOffset.add(xy_(1, 4)),
      p8c.LightGrey
    );
  }
}
