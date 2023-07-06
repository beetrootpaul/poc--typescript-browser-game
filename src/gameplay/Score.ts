export class Score {
  readonly #value = 0;

  value(): number {
    return this.#value;
  }

  // TODO: migrate from Lua
  /*
    function s.add(points)
        value = value + points
    end
   */
}
