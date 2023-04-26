export class DrawApi {
  private _w: number;
  private _h: number;
  private _rgbaBytes: Uint8ClampedArray;

  constructor(w: number, h: number, rgbaBytes: Uint8ClampedArray) {
    this._w = w;
    this._h = h;
    this._rgbaBytes = rgbaBytes;
  }

  drawSomething() {
    const ii = [
      0,
      1,
      2,
      this._w,
      this._w + 2,
      2 * this._w,
      2 * this._w + 1,
      2 * this._w + 2,
    ].map((i) => i * 4);
    ii.forEach((i) => {
      this._rgbaBytes[i] = 255;
      this._rgbaBytes[i + 1] = 0;
      this._rgbaBytes[i + 2] = 0;
      this._rgbaBytes[i + 3] = 255;
    });
  }
}
