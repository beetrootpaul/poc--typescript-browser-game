import { Color } from "../../../poc--typescript-web-game-framework/src/color.ts";

export class Pico8Color {
  // hex values taken from https://pico-8.fandom.com/wiki/Palette#The_system_palette
  static Black = Color.fromCssHex("#000000");
  static DarkBlue = Color.fromCssHex("#1d2b53");
  static DarkPurple = Color.fromCssHex("#7e2553");
  static DarkGreen = Color.fromCssHex("#008751");
  static Brown = Color.fromCssHex("#ab5236");
  static DarkGrey = Color.fromCssHex("#5f574f");
  static LightGrey = Color.fromCssHex("#c2c3c7");
  static White = Color.fromCssHex("#fff1e8");
  static Red = Color.fromCssHex("#ff004d");
  static Orange = Color.fromCssHex("#ffa300");
  static Yellow = Color.fromCssHex("#ffec27");
  static Green = Color.fromCssHex("#00e436");
  static Blue = Color.fromCssHex("#29adff");
  static Lavender = Color.fromCssHex("#83769c");
  static Pink = Color.fromCssHex("#ff77a8");
  static LightPeach = Color.fromCssHex("#ffccaa");
}
