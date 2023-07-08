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

  // TODO: migrate from Lua
  /*
    local function get_tiles_close_to_player()
        local left_tile_x = flr(player.x1() / u.tile_px) + 1
        local right_tile_x = flr(player.x2() / u.tile_px) + 1
        local top_tile_y = flr(player.y1() / u.tile_px) + 1
        local bottom_tile_y = flr(player.y2() / u.tile_px) + 1

        local close_tiles = {}
        local margin_tiles = 3
        for tile_x = left_tile_x - margin_tiles, right_tile_x + margin_tiles do
            for tile_y = top_tile_y - margin_tiles, bottom_tile_y + margin_tiles do
                close_tiles[tile_x .. "_" .. tile_y] = true
            end
        end
        return close_tiles
    end

    local l = {}
   */

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
    // TODO: mode.bg_color()
    f.drawApi.drawRectFilled(Xy.zero, g.gameAreaSize, p8c.DarkBlue);
    // TODO: migrate from Lua
    /*
          fillp()
  
          if __debug__ then
              local tiles_close_to_player = get_tiles_close_to_player()
              for tile_x = 1, a.game_area_w_tiles do
                  for tile_y = 1, a.game_area_h_tiles do
                      line(
                          (tile_x - 1) * u.tile_px, (tile_y - 1) * u.tile_px,
                          (tile_x - 1) * u.tile_px, (tile_y - 1) * u.tile_px,
                          u.colors.violet_grey
                      )
                      if tiles_close_to_player[tile_x .. "_" .. tile_y] then
                          rectfill(
                              (tile_x - 1) * u.tile_px, (tile_y - 1) * u.tile_px,
                              tile_x * u.tile_px - 1, tile_y * u.tile_px - 1,
                              u.colors.purple
                          )
                      end
                  end
              end
          end
     */
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
