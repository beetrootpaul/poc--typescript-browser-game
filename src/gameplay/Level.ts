import { GameDrawContext, Xy } from "@framework";
import { g } from "../globals.ts";
import { Pico8Colors } from "../Pico8Color.ts";
import { Mode } from "./Mode.ts";
import { Player } from "./Player.ts";

type LevelParams = {
  mode: Mode;
  player: Player;
};

export class Level {
  readonly #mode: Mode;
  readonly #player: Player;

  constructor(params: LevelParams) {
    this.#mode = params.mode;
    this.#player = params.player;
  }

  // TODO: migrate from Lua
  /*
    local coin
    local droplet_no_coins
    local droplet_no_memories

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
  // TODO: migrate from Lua
  /*
      function l.spawn_items()
        local tiles_close_to_player = get_tiles_close_to_player()
        local available_tiles = {}
        local margin_tiles = 1
        for tile_x = 1 + margin_tiles, a.game_area_w_tiles - margin_tiles do
            for tile_y = 1 + margin_tiles, a.game_area_h_tiles - margin_tiles do
                if not tiles_close_to_player[tile_x .. "_" .. tile_y] then
                    add(available_tiles, { tile_x = tile_x, tile_y = tile_y })
                end
            end
        end

        local coin_tile = rnd(available_tiles)
        if coin_tile then
            coin = new_item {
                tile_x = coin_tile.tile_x,
                tile_y = coin_tile.tile_y,
                collision_circle_r = 2.5,
                animated_sprite = new_animated_sprite {
                    first_sprite = 16,
                    number_of_sprites = 16,
                    frames_per_sprite = 2,
                }
            }
        end

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
    end

   */
  // TODO: migrate from Lua
  /*

    function l.remove_coin()
        coin = nil
    end
   */
  // TODO: migrate from Lua
  /*
      function l.remove_droplet_no_coins()
        droplet_no_coins = nil
    end
    function l.remove_droplet_no_memories()
        droplet_no_memories = nil
    end
   */
  // TODO: migrate from Lua
  /*
      function l.check_collisions(callbacks)
        if coin then
            if collisions.have_circles_collided(
                player.collision_circle(),
                coin.collision_circle()
            ) then
                callbacks.on_coin()
            end
        end
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
  // TODO: migrate from Lua
  /*
      function l.animate()
        if coin then
            coin.animate()
        end
        if droplet_no_coins then
            droplet_no_coins.animate()
        end
        if droplet_no_memories then
            droplet_no_memories.animate()
        end
    end

   */

  // TODO: move API access to some globals, so it will be as easy as in PICO-8 to just draw stuff, play music, etc.
  drawBg({ drawApi }: GameDrawContext): void {
    // TODO: migrate from Lua
    // fillp(mode.bg_pattern())
    // TODO: mode.bg_color()
    drawApi.drawRectFilled(Xy.zero, g.gameAreaSize, Pico8Colors.DarkBlue);
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

  // TODO: migrate from Lua
  /*
      function l.draw_items()
        if not mode.is_no_coins() then
            coin.draw()
        end
        if droplet_no_coins then
            droplet_no_coins.draw()
        end
        if droplet_no_memories then
            droplet_no_memories.draw()
        end
    end

   */
}
