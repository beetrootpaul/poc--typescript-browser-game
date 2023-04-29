export class DrawApi {
  private _w: number;
  private _h: number;
  private _rgbaBytes: Uint8ClampedArray;

  // TODO: clean screen once at game start to make it pure black instead of transparent

  constructor(w: number, h: number, rgbaBytes: Uint8ClampedArray) {
    this._w = w;
    this._h = h;
    this._rgbaBytes = rgbaBytes;
  }

  drawSomething(pos = 0) {
    const pxLen = this._rgbaBytes.length / 4;
    for (let i = 0; i < pxLen; ++i) {
      const t = i * 4;
      this._rgbaBytes[t] = 0;
      this._rgbaBytes[t + 1] = 0;
      this._rgbaBytes[t + 2] = 0;
      this._rgbaBytes[t + 3] = 255;
    }

    this._rgbaBytes[0] = 0;
    this._rgbaBytes[1] = 0;
    this._rgbaBytes[2] = 255;
    this._rgbaBytes[3] = 255;

    this._rgbaBytes[(pxLen - 1) * 4] = 0;
    this._rgbaBytes[(pxLen - 1) * 4 + 1] = 255;
    this._rgbaBytes[(pxLen - 1) * 4 + 2] = 0;
    this._rgbaBytes[(pxLen - 1) * 4 + 3] = 255;

    const ii = [
      pos,
      pos + 1,
      pos + 2,
      pos + this._w,
      pos + this._w + 2,
      pos + 2 * this._w,
      pos + 2 * this._w + 1,
      pos + 2 * this._w + 2,
    ].map((i) => i * 4);
    ii.forEach((i) => {
      this._rgbaBytes[i] = 255;
      this._rgbaBytes[i + 1] = 0;
      this._rgbaBytes[i + 2] = 0;
      this._rgbaBytes[i + 3] = 255;
    });
  }
}
