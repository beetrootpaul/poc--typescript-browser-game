// Red, green, and blue, each one as value between 0 and 255.
export class Color {
  readonly r: number;
  readonly g: number;
  readonly b: number;

  constructor(r: number, g: number, b: number) {
    if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
      throw Error(
        `One of color components is outside 0-255 range: r=${r}, g=${g}, b=${b}.`
      );
    }
    this.r = r;
    this.g = g;
    this.b = b;
  }

  // TODO: tests
  asCssHex(): string {
    return (
      "#" +
      this.r.toString(16).padStart(2, "0") +
      this.g.toString(16).padStart(2, "0") +
      this.b.toString(16).padStart(2, "0")
    );
  }

  static fromCssHex(cssHex: string): Color {
    if (!/^#[0-9a-fA-F]{6}$/.test(cssHex)) {
      throw Error(
        "Hexadecimal representation of the color doesn't contain exactly 6 hexadecimal digits, preceded by a single '#'"
      );
    }
    return new Color(
      parseInt(cssHex.slice(1, 3), 16),
      parseInt(cssHex.slice(3, 5), 16),
      parseInt(cssHex.slice(5, 7), 16)
    );
  }
}

if (import.meta.vitest) {
  const { describe, test, expect } = import.meta.vitest;

  describe("constructor", () => {
    test("successful construction", () => {
      const color = new Color(1, 2, 3);

      expect(color.r).toEqual(1);
      expect(color.g).toEqual(2);
      expect(color.b).toEqual(3);
    });

    test("validation", () => {
      expect(() => new Color(0, -1, 0)).toThrow(
        "One of color components is outside 0-255 range"
      );
      expect(() => new Color(0, 256, 0)).toThrow(
        "One of color components is outside 0-255 range"
      );
    });
  });

  describe("#fromCssHex", () => {
    test("successful conversions", () => {
      expect(Color.fromCssHex("#000000")).toEqual(new Color(0, 0, 0));
      expect(Color.fromCssHex("#010203")).toEqual(new Color(1, 2, 3));
      expect(Color.fromCssHex("#f1f2f3")).toEqual(new Color(241, 242, 243));
      expect(Color.fromCssHex("#ffffff")).toEqual(new Color(255, 255, 255));
    });

    test("normalization", () => {
      expect(Color.fromCssHex("#ABCDEF").asCssHex()).toEqual("#abcdef");
    });

    test("validation", () => {
      expect(() => Color.fromCssHex("#1234567")).toThrow(
        "Hexadecimal representation of the color doesn't contain exactly 6 hexadecimal digits, preceded by a single '#'"
      );
      expect(() => Color.fromCssHex("#12345")).toThrow(
        "Hexadecimal representation of the color doesn't contain exactly 6 hexadecimal digits, preceded by a single '#'"
      );
      expect(() => Color.fromCssHex("#00000g")).toThrow(
        "Hexadecimal representation of the color doesn't contain exactly 6 hexadecimal digits, preceded by a single '#'"
      );
      expect(() => Color.fromCssHex("#00#0000")).toThrow(
        "Hexadecimal representation of the color doesn't contain exactly 6 hexadecimal digits, preceded by a single '#'"
      );
      expect(() => Color.fromCssHex("# 000000")).toThrow(
        "Hexadecimal representation of the color doesn't contain exactly 6 hexadecimal digits, preceded by a single '#'"
      );
    });
  });

  describe("#asCssHex", () => {
    test("successful conversions", () => {
      expect(new Color(0, 0, 0).asCssHex()).toEqual("#000000");
      expect(new Color(1, 2, 3).asCssHex()).toEqual("#010203");
      expect(new Color(241, 242, 243).asCssHex()).toEqual("#f1f2f3");
      expect(new Color(255, 255, 255).asCssHex()).toEqual("#ffffff");
    });
  });
}
