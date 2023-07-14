import { PocTsBGFramework, Utils, xy_ } from "@framework";
import { Pico8Colors } from "./Pico8Color.ts";
import { Pico8Font } from "./Pico8Font.ts";

export const f = PocTsBGFramework;

export const p8c = Pico8Colors;

export const u = Utils;

export const g = {
  // TODO: make it always false for prod build
  __debug: false,
  __quickStart: false,
  //
  fps: 30,
  //
  screenSize: xy_(128, 128),
  cameraOffset: xy_(0, -16),
  topbarSize: xy_(128, 16),
  gameAreaSize: xy_(128, 112),
  tileSize: xy_(8, 8),
  //
  spriteSheetCells: xy_(16, 16),
  spriteSheetCellSize: xy_(8, 8),
  //
  musicBeatFrames: 16,
  //
  colors: {
    bgColorModeNormal: p8c.darkBlue,
    bgColorModeNoCoins: p8c.orange,
    bgColorModeNoMemories: p8c.pink,
  },
  //
  assets: {
    spritesheet: "spritesheet.png",
    pico8Font: "pico-8-font.png",
  } as const,
  //

  // TODO: migrate from Lua
  /*
    music = 1,

    sfx_looped_empty_1 = 4,
    sfx_looped_empty_2 = 5,
    sfx_looped_empty_3 = 6,
    sfx_coin = 0,
   */

  // TODO: migrate from Lua
  /*
    colors = {
        black = 0,
        dark_blue = 1,
        purple = 2, --> DarkPurple
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
        violet_grey = 13, --> Lavender
        pink = 14,
        salmon = 15,
    },
   */
};
