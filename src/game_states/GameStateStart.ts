import { xy_ } from "@framework";
import { Level } from "../gameplay/Level.ts";
import { Mode } from "../gameplay/Mode.ts";
import { Player } from "../gameplay/Player.ts";
import { Score } from "../gameplay/Score.ts";
import { f, p8c, u } from "../globals.ts";
import { Topbar } from "../gui/Topbar.ts";
import { GameState } from "./GameState.ts";
import { GameStateGameplay } from "./GameStateGameplay.ts";

export class GameStateStart implements GameState {
  readonly #score = new Score();
  readonly #mode = new Mode();
  readonly #topbar = new Topbar({
    score: this.#score,
    mode: this.#mode,
  });
  readonly #player = new Player();
  readonly #level = new Level({
    mode: this.#mode,
    player: this.#player,
  });

  constructor() {
    // TODO: migrate from Lua
    // audio.enable_music_layers { false, false, false }

    this.#level.spawnItems();
  }

  update(): GameState {
    let hasStarted = false;
    // TODO: make one directional input clear another, like left+right = nothing
    if (f.gameInputEvents.has("left")) {
      this.#player.directLeft();
      hasStarted = true;
    } else if (f.gameInputEvents.has("right")) {
      this.#player.directRight();
      hasStarted = true;
    } else if (f.gameInputEvents.has("up")) {
      this.#player.directUp();
      hasStarted = true;
    } else if (f.gameInputEvents.has("down")) {
      this.#player.directDown();
      hasStarted = true;
    }

    this.#level.animate();

    if (hasStarted) {
      return new GameStateGameplay({
        mode: this.#mode,
        topbar: this.#topbar,
        score: this.#score,
        level: this.#level,
        player: this.#player,
      });
    }

    return this;
  }

  draw(): void {
    this.#level.drawBg();

    this.#level.drawItems();

    this.#player.draw();

    this.#topbar.draw();

    const margin = 6;
    const prompt1 = "press an arrow";
    const prompt2 = "to choose direction";
    const prompt1Size = u.measureTextSize(prompt1);
    const prompt2Size = u.measureTextSize(prompt2);
    u.printWithOutline(
      prompt1,
      xy_(
        this.#player.center().x - prompt1Size.x / 2,
        this.#player.xy1().y - margin - 26
      ),
      p8c.Lavender,
      p8c.DarkBlue
    );
    u.printWithOutline(
      prompt2,
      xy_(
        this.#player.center().x - prompt2Size.x / 2,
        this.#player.xy1().y - margin - 17
      ),
      p8c.Lavender,
      p8c.DarkBlue
    );
    // TODO: migrate from Lua
    /*
        local time_dependent_boolean = u.boolean_changing_every_nth_second(a.music_beat_frames / a.fps)
        local glyph_color = time_dependent_boolean and u.colors.violet_grey or u.colors.blue
        u.print_with_outline("⬅️", player.x1() - margin - 8, player.yc() - 2, glyph_color, u.colors.dark_blue)
        u.print_with_outline("➡️", player.x2() + margin + 2, player.yc() - 2, glyph_color, u.colors.dark_blue)
        u.print_with_outline("⬆️", player.xc() - 3, player.y1() - margin - 6, glyph_color, u.colors.dark_blue)
        u.print_with_outline("⬇️", player.xc() - 3, player.y2() + margin + 2, glyph_color, u.colors.dark_blue)
     */
  }
}
