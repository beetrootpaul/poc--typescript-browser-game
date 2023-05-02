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

  describe("#asCssHex", () => {
    test("successful conversions", () => {
      expect(new Color(0, 0, 0).asCssHex()).toEqual("#000000");
      expect(new Color(1, 2, 3).asCssHex()).toEqual("#010203");
      expect(new Color(241, 242, 243).asCssHex()).toEqual("#f1f2f3");
      expect(new Color(255, 255, 255).asCssHex()).toEqual("#ffffff");
    });
  });
}
