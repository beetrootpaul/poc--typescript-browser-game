import { Level } from "../gameplay/Level.ts";
import { Memories } from "../gameplay/Memories.ts";
import { Mode } from "../gameplay/Mode.ts";
import { Player } from "../gameplay/Player.ts";
import { Score } from "../gameplay/Score.ts";
import { Trail } from "../gameplay/Trail.ts";
import { f, p8c } from "../globals.ts";
import { Topbar } from "../gui/Topbar.ts";
import { GameState } from "./GameState.ts";
import { GameStateOver } from "./GameStateOver.ts";

type GameStateGameplayParams = {
  mode: Mode;
  topbar: Topbar;
  score: Score;
  level: Level;
  player: Player;
};

// TODO: make it not needed to pass <StorageApiValueConstraint> by maybe decoupling what goes into `update`
export class GameStateGameplay implements GameState {
  readonly #mode: Mode;
  readonly #topbar: Topbar;
  readonly #score: Score;
  readonly #level: Level;
  readonly #player: Player;
  readonly #memories: Memories;
  readonly #playerTrail: Trail;

  constructor(params: GameStateGameplayParams) {
    this.#mode = params.mode;
    this.#topbar = params.topbar;
    this.#score = params.score;
    this.#level = params.level;
    this.#player = params.player;
    this.#memories = new Memories({
      player: this.#player,
    });
    this.#playerTrail = new Trail({
      origin: this.#player,
      color: p8c.DarkGreen,
    });
  }

  // TODO: migrate from Lua
  // local function on_back_to_regular_mode()
  // audio.enable_music_layers { true, false, false }
  // end

  #onCoinCollision(): void {
    if (this.#mode.isNoCoins()) {
      return;
    }

    // TODO: migrate from Lua
    // audio.play_sfx(a.sfx_coin)

    this.#score.add(10);

    if (!this.#mode.isNoMemories()) {
      this.#memories.addMemory();
    }

    this.#level.removeCoin();
    // level.spawn_items()
  }

  #onDropletNoCoinsCollision(): void {
    // TODO: migrate from Lua
    // audio.enable_music_layers { true, false, true }
    // score.add(3)
    // mode.start_no_coins()
    // level.remove_droplet_no_coins()
  }

  #onDropletNoMemoriesCollision(): void {
    // TODO: migrate from Lua
    // audio.enable_music_layers { true, true, false }
    // score.add(1)
    // mode.start_no_memories()
    // level.remove_droplet_no_memories()
  }

  // TODO: migrate from Lua
  // audio.enable_music_layers { true, false, false }

  update(): GameState {
    if (f.gameInputEvents.has("left")) {
      this.#player.directLeft();
    } else if (f.gameInputEvents.has("right")) {
      this.#player.directRight();
    } else if (f.gameInputEvents.has("up")) {
      this.#player.directUp();
    } else if (f.gameInputEvents.has("down")) {
      this.#player.directDown();
    }

    // TODO: migrate from Lua
    /*
        mode.update {
            on_back_to_regular_mode = on_back_to_regular_mode
        }
        */

    this.#level.checkCollisions({
      onCoin: this.#onCoinCollision.bind(this),
      onDropletNoCoins: this.#onDropletNoCoinsCollision.bind(this),
      onDropletNoMemories: this.#onDropletNoMemoriesCollision.bind(this),
    });

    this.#level.animate();

    // TODO: migrate from Lua
    // player_trail.update()
    this.#player.move();

    this.#memories.move();

    if (!this.#mode.isNoMemories()) {
      if (this.#memories.hasPlayerCollidedWithMemory()) {
        return new GameStateOver({
          score: this.#score,
          level: this.#level,
          player: this.#player,
        });
      }
    }

    return this;
  }

  draw(): void {
    this.#level.drawBg();

    this.#level.drawItems();

    this.#playerTrail.draw();
    this.#player.draw();

    if (!this.#mode.isNoMemories()) {
      this.#memories.draw();
    }

    this.#topbar.draw();
  }
}
