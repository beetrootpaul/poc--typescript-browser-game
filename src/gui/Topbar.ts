import { xy_ } from "@framework";
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
      // TODO: migrate from Lua
      const progressW = 60;
      //  local progress_w = u.measure_text_width(mode_label)
      const progressRemainingW = Math.floor(
        (this.#mode.percentageLeft() / 100) * progressW
      );
      console.log(progressRemainingW);
      const progressX = g.cameraOffset.x + g.screenSize.x - progressW - 1;
      // TODO: migrate from Lua
      const progressY = textY + 8 + 2;
      //  local progress_y = text_y + u.text_height_px + 2

      // TODO: remove tmp implementation and migrate from Lua
      console.log(modeLabel);
      // print(
      //     mode_label,
      //     progress_x,
      //     text_y,
      //     u.colors.light_grey
      // )

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

    // TODO: remove the tmp implementation and migrate from Lua
    console.log(`score ${this.#score.value()}`);
    /*
        print(
            "score " .. tostr(score.value()),
            a.camera_x + 1,
            a.camera_y + 4,
            u.colors.light_grey
        )
     */
  }
}
