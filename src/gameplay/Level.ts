import { Xy, xy_ } from "@framework";
import { Collisions } from "../Collisions.ts";
import { f, g, p8c } from "../globals.ts";
import { AnimatedSprite } from "./AnimatedSprite.ts";
import { Item } from "./Item.ts";
import { Mode } from "./Mode.ts";
import { Player } from "./Player.ts";

type LevelParams = {
  mode: Mode;
  player: Player;
};

export class Level {
  readonly #mode: Mode;
  readonly #player: Player;

  #coin: Item | null = null;
  // TODO: migrate from Lua
  // local droplet_no_coins
  // local droplet_no_memories

  constructor(params: LevelParams) {
    this.#mode = params.mode;
    this.#player = params.player;
  }

  #getTilesCloseToPlayer(): Record<string, boolean> {
    // TODO: migrate from Lua
    const leftTopTile = this.#player.xy1().div(g.tileSize).floor().add(1);
    const rightBottomTile = this.#player.xy2().div(g.tileSize).floor().add(1);

    const closeTiles: Record<string, boolean> = {};
    const marginTiles = 3;
    for (
      let tileX = leftTopTile.x - marginTiles;
      tileX <= rightBottomTile.x + marginTiles;
      tileX += 1
    ) {
      for (
        let tileY = leftTopTile.y - marginTiles;
        tileY <= rightBottomTile.y + marginTiles;
        tileY += 1
      ) {
        closeTiles[`${tileX}_${tileY}`] = true;
      }
    }
    return closeTiles;
  }

  spawnItems(): void {
    // TODO: migrate from Lua
    // local tiles_close_to_player = get_tiles_close_to_player()

    const availableTiles: Xy[] = [];
    const marginTiles = 1;
    for (
      let tileX = 1 + marginTiles;
      tileX <= g.gameAreaSize.div(g.tileSize).x - marginTiles;
      tileX += 1
    ) {
      for (
        let tileY = 1 + marginTiles;
        tileY <= g.gameAreaSize.div(g.tileSize).y - marginTiles;
        tileY += 1
      ) {
        // TODO: migrate from Lua
        // if not tiles_close_to_player[tile_x .. "_" .. tile_y] then
        availableTiles.push(xy_(tileX, tileY));
        // TODO: migrate from Lua
        // end
      }
    }

    if (availableTiles.length > 0) {
      // TODO: create an util for random array pick + cover it with tests
      const coinTile =
        availableTiles[Math.floor(Math.random() * availableTiles.length)];
      this.#coin = new Item({
        tile: coinTile,
        collisionCircleR: 2.5,
        animatedSprite: new AnimatedSprite({
          firstSpriteSheetCell: 16,
          numberOfSprites: 16,
          framesPerSprite: 2,
        }),
      });
    }

    // TODO: migrate from Lua
    /*
              if not droplet_no_coins and not droplet_no_memories and not mode.is_no_coins() and not mode.is_no_memories() then
                  del(available_tiles, coin_tile)
                  local droplet_tile = rnd(available_tiles)
                  if droplet_tile then
                      local probability = rnd(1)
                      if __debug__ then
                          printh(probability)
                      end
                      if probability < 0.3 then
                          droplet_no_coins = new_item {
                              tile_x = droplet_tile.tile_x,
                              tile_y = droplet_tile.tile_y,
                              collision_circle_r = 3.5,
                              animated_sprite = new_animated_sprite {
                                  first_sprite = 32,
                                  number_of_sprites = 1,
                                  frames_per_sprite = 1,
                              }
                          }
                      elseif probability > 0.7 then
                          droplet_no_memories = new_item {
                              tile_x = droplet_tile.tile_x,
                              tile_y = droplet_tile.tile_y,
                              collision_circle_r = 3.5,
                              animated_sprite = new_animated_sprite {
                                  first_sprite = 48,
                                  number_of_sprites = 1,
                                  frames_per_sprite = 1,
                              }
                          }
                      end
                  end
              end
         */
  }

  removeCoin(): void {
    this.#coin = null;
  }

  // TODO: migrate from Lua
  /*
      function l.remove_droplet_no_coins()
        droplet_no_coins = nil
    end
    function l.remove_droplet_no_memories()
        droplet_no_memories = nil
    end
   */

  // TODO: migrate from Lua `callbacks` param
  checkCollisions(callbacks: {
    onCoin: () => void;
    onDropletNoCoins: () => void;
    onDropletNoMemories: () => void;
  }): void {
    if (this.#coin) {
      if (
        Collisions.haveCirclesCollided(
          this.#player.collisionCircle(),
          this.#coin.collisionCircle()
        )
      ) {
        callbacks.onCoin();
      }
    }

    // TODO: migrate from Lua
    /*
          if droplet_no_coins then
              if collisions.have_circles_collided(
                  player.collision_circle(),
                  droplet_no_coins.collision_circle()
              ) then
                  callbacks.on_droplet_no_coins()
              end
          end
          if droplet_no_memories then
              if collisions.have_circles_collided(
                  player.collision_circle(),
                  droplet_no_memories.collision_circle()
              ) then
                  callbacks.on_droplet_no_memories()
              end
          end
      end
  
     */
  }

  animate(): void {
    this.#coin?.animate();
    // TODO: migrate from Lua
    /*
          if droplet_no_coins then
              droplet_no_coins.animate()
          end
          if droplet_no_memories then
              droplet_no_memories.animate()
          end
     */
  }

  drawBg(): void {
    // TODO: migrate from Lua
    // fillp(mode.bg_pattern())
    f.drawApi.rectFilled(Xy.zero, g.gameAreaSize, p8c.DarkBlue);
    // TODO: migrate from Lua
    // fillp()

    if (f.debug) {
      const tilesCloseToPlayer = this.#getTilesCloseToPlayer();
      for (
        let tileX = 1;
        tileX <= g.gameAreaSize.div(g.tileSize).x;
        tileX += 1
      ) {
        for (
          let tileY = 1;
          tileY <= g.gameAreaSize.div(g.tileSize).y;
          tileY += 1
        ) {
          f.drawApi.pixel(
            xy_(tileX, tileY).sub(1).mul(g.tileSize),
            p8c.Lavender
          );
          if (tilesCloseToPlayer[`${tileX}_${tileY}`]) {
            f.drawApi.rectFilled(
              xy_(tileX - 1, tileY - 1)
                .mul(g.tileSize)
                .add(1),
              xy_(tileX, tileY).mul(g.tileSize),
              p8c.DarkPurple
            );
          }
        }
      }
    }
  }

  drawItems(): void {
    if (!this.#mode.isNoCoins()) {
      this.#coin?.draw();
    }
    // TODO: migrate from Lua
    /*
          if droplet_no_coins then
              droplet_no_coins.draw()
          end
          if droplet_no_memories then
              droplet_no_memories.draw()
          end
     */
  }
}
