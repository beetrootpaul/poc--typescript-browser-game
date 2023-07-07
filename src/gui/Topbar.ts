import { Mode } from "../gameplay/Mode.ts";
import { Score } from "../gameplay/Score.ts";
import { f, g } from "../globals.ts";
import { Pico8Colors } from "../Pico8Color.ts";

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
    f.drawApi.drawRectFilled(
      g.cameraOffset,
      g.cameraOffset.add(g.topbarSize),
      Pico8Colors.Black
    );

    const modeLabel = this.#mode.label();
    if (modeLabel) {
      // TODO: migrate from Lua
      /*
              local text_y = a.camera_y + 4
              local progress_w = u.measure_text_width(mode_label)
              local progress_remaining_w = (mode.percentage_left() / 100) * progress_w
              local progress_x = a.camera_x + u.screen_px - progress_w - 1
              local progress_y = text_y + u.text_height_px + 2
              local progress_h = 1
              */

      // TODO: remove tmp implementation and migrate from Lua
      console.log(modeLabel);
      // print(
      //     mode_label,
      //     progress_x,
      //     text_y,
      //     u.colors.light_grey
      // )

      // TODO: migrate from Lua
      /*
              if progress_remaining_w > 0 then
                  line(
                      progress_x + progress_w - progress_remaining_w,
                      progress_y,
                      progress_x + progress_w - 1,
                      progress_y + progress_h - 1,
                      mode.progress_color()
                  )
              end
       */
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
