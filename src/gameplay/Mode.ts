import { SolidColor } from "@framework";
import { g } from "../globals.ts";

export class Mode {
  #current: "regular" | "no_coins" | "no_memories" = "regular";

  #ttl = 0;
  #ttlMaxNoCoins = 90;
  #ttlMaxNoMemories = 150;

  isNoCoins(): boolean {
    return this.#current === "no_coins";
  }

  isNoMemories(): boolean {
    return this.#current === "no_memories";
  }

  startNoCoins(): void {
    this.#current = "no_coins";
    this.#ttl = this.#ttlMaxNoCoins;
  }

  startNoMemories(): void {
    this.#current = "no_memories";
    this.#ttl = this.#ttlMaxNoMemories;
  }

  label(): string | null {
    switch (this.#current) {
      case "no_coins":
        return "cannot collect coins";
      case "no_memories":
        return "invulnerable";
      default:
        return null;
    }
  }

  progressColor(): SolidColor {
    switch (this.#current) {
      case "no_coins":
        return g.colors.bgColorModeNoCoins;
      case "no_memories":
        return g.colors.bgColorModeNoMemories;
      default:
        return g.colors.bgColorModeNormal;
    }
  }

  bgColor(): SolidColor {
    switch (this.#current) {
      case "no_coins":
        // TODO: migrate from Lua
        // return a.bg_color_mode_no_coins + 16 * a.bg_color_mode_normal
        return g.colors.bgColorModeNoCoins;
      case "no_memories":
        // TODO: migrate from Lua
        // return a.bg_color_mode_no_memories + 16 * a.bg_color_mode_normal
        return g.colors.bgColorModeNoMemories;
      default:
        return g.colors.bgColorModeNormal;
    }
  }

  // TODO: migrate from Lua
  /*
    function m.bg_pattern()
        if current == "regular" then
            return nil
        end

        local ttl_max
        if current == "no_coins" then
            ttl_max = ttl_max_no_coins
        elseif current == "no_memories" then
            ttl_max = ttl_max_no_memories
        else
            assert(false, "unexpected " .. current .. " mode")
        end

        local ttl_distance_from_start_end = min(ttl, ttl_max - ttl)
        if ttl_distance_from_start_end < 1 then
            return 1 + 2 + 4 + 8 + 16 + 32 + 128 + 256 + 512 + 1024 + 2048 + 4096 + 8192 + 16384 + 32768
        elseif ttl_distance_from_start_end < 2 then
            return 1 + 2 + 4 + 8 + 32 + 128 + 256 + 512 + 1024 + 2048 + 8192 + 32768
        elseif ttl_distance_from_start_end < 3 then
            return 1 + 4 + 32 + 128 + 256 + 1024 + 8192 + 32768
        elseif ttl_distance_from_start_end < 4 then
            return 1 + 4 + 256 + 1024
        elseif ttl_distance_from_start_end < 5 then
            return 1
        else
            return nil
        end
    end
   */

  percentageLeft(): number {
    switch (this.#current) {
      case "no_coins":
        return (100 * this.#ttl) / this.#ttlMaxNoCoins;
      case "no_memories":
        return (100 * this.#ttl) / this.#ttlMaxNoMemories;
      default:
        return 0;
    }
  }

  update(callbacks: { onBackToRegularMode: () => void }): void {
    if (this.#current != "regular" && this.#ttl <= 0) {
      this.#current = "regular";
      callbacks.onBackToRegularMode();
    }
    if (this.#ttl > 0) {
      this.#ttl -= 1;
    }
  }
}
