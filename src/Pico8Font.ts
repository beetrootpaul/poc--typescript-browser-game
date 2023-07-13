import { type Font, Sprite, Xy, xy_ } from "@framework";

export class Pico8Font implements Font {
  static charSize = xy_(3, 5);

  static spriteSheetCells: Record<string, Xy> = {
    ["0"]: xy_(0, 3),
    ["1"]: xy_(1, 3),
    ["2"]: xy_(2, 3),
    ["3"]: xy_(3, 3),
    ["4"]: xy_(4, 3),
    ["5"]: xy_(5, 3),
    ["6"]: xy_(6, 3),
    ["7"]: xy_(7, 3),
    ["8"]: xy_(8, 3),
    ["9"]: xy_(9, 3),
    //
    ["@"]: xy_(0, 4),
    //
    ["a"]: xy_(1, 6),
    ["b"]: xy_(2, 6),
    ["c"]: xy_(3, 6),
    ["d"]: xy_(4, 6),
    ["e"]: xy_(5, 6),
    ["f"]: xy_(6, 6),
    ["g"]: xy_(7, 6),
    ["h"]: xy_(8, 6),
    ["i"]: xy_(9, 6),
    ["j"]: xy_(10, 6),
    ["k"]: xy_(11, 6),
    ["l"]: xy_(12, 6),
    ["m"]: xy_(13, 6),
    ["n"]: xy_(14, 6),
    ["o"]: xy_(15, 6),
    ["p"]: xy_(0, 7),
    ["q"]: xy_(1, 7),
    ["r"]: xy_(2, 7),
    ["s"]: xy_(3, 7),
    ["t"]: xy_(4, 7),
    ["u"]: xy_(5, 7),
    ["v"]: xy_(6, 7),
    ["w"]: xy_(7, 7),
    ["x"]: xy_(8, 7),
    ["y"]: xy_(9, 7),
    ["z"]: xy_(10, 7),
  };

  get letterSpacingW(): number {
    return 1;
  }

  get spaceCharW(): number {
    return Pico8Font.charSize.x;
  }

  spriteFor(char: string): Sprite | null {
    char = char.toLowerCase();
    const cell = Pico8Font.spriteSheetCells[char];
    if (!cell) return null;
    return new Sprite(cell.mul(8), cell.mul(8).add(Pico8Font.charSize));
  }

  sizeOf(text: string): Xy {
    return xy_(
      text.length * Pico8Font.charSize.x +
        (text.length - 1) * this.letterSpacingW,
      Pico8Font.charSize.y
    );
  }
}
