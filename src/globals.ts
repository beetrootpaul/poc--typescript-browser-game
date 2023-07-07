import { PocTsBGFramework, xy_ } from "@framework";

export const f = PocTsBGFramework;

export const g = {
  fps: 30,
  screenSize: xy_(128, 128),
  cameraOffset: xy_(0, -16),
  gameAreaSize: xy_(128, 112),
  topbarSize: xy_(128, 16),
  musicBeatFrames: 16,

  // TODO: migrate from Lua
  /*
      bg_color_mode_normal = u.colors.dark_blue,
    bg_color_mode_no_coins = u.colors.orange,
    bg_color_mode_no_memories = u.colors.pink,

    music = 1,

    sfx_looped_empty_1 = 4,
    sfx_looped_empty_2 = 5,
    sfx_looped_empty_3 = 6,
    sfx_coin = 0,

    game_area_w_tiles = 16,
    game_area_h_tiles = 14,
   */

  // TODO: migrate from Lua
  /*
      buttons = {
        -- left, right, up, down
        l = 0,
        r = 1,
        u = 2,
        d = 3,
        -- button O (Z), button X
        o = 4,
        x = 5,
    },

    colors = {
        black = 0,
        dark_blue = 1,
        purple = 2,
        dark_green = 3,
        brown = 4,
        dark_grey = 5,
        light_grey = 6,
        white = 7,
        red = 8,
        orange = 9,
        yellow = 10,
        lime = 11,
        blue = 12,
        violet_grey = 13,
        pink = 14,
        salmon = 15,
    },

    screen_tiles = 16,

    text_height_px = 5,

    tile_px = 8,
   */
};
