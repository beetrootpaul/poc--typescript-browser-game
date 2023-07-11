export class Mode {
  #current: "regular" | "no_coins" | "no_memories" = "regular";

  // TODO: migrate from Lua
  /*
    local ttl = 0
    local ttl_max_no_coins = 90
    local ttl_max_no_memories = 150
   */

  isNoCoins(): boolean {
    return this.#current === "no_coins";
  }

  isNoMemories(): boolean {
    return this.#current === "no_memories";
  }

  startNoCoins(): void {
    this.#current = "no_coins";
    // TODO: migrate from Lua
    // ttl = ttl_max_no_coins
  }

  startNoMemories(): void {
    this.#current = "no_memories";
    // TODO: migrate from Lua
    // ttl = ttl_max_no_memories
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

  // TODO: migrate from Lua
  /*
    function m.label()
        if current == "no_coins" then
            return "cannot collect coins"
        elseif current == "no_memories" then
            return "invulnerable"
        else
            return nil
        end
    end
   */

  // TODO: migrate from Lua
  /*
    function m.progress_color()
        if current == "no_coins" then
            return a.bg_color_mode_no_coins
        elseif current == "no_memories" then
            return a.bg_color_mode_no_memories
        else
            return a.bg_color_mode_normal
        end
    end
   */

  // TODO: migrate from Lua
  /*
    function m.bg_color()
        if current == "no_coins" then
            return a.bg_color_mode_no_coins + 16 * a.bg_color_mode_normal
        elseif current == "no_memories" then
            return a.bg_color_mode_no_memories + 16 * a.bg_color_mode_normal
        else
            return a.bg_color_mode_normal
        end
    end
   */

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

  // TODO: migrate from Lua
  /*
    function m.percentage_left()
        if current == "no_coins" then
            return 100 * ttl / ttl_max_no_coins
        elseif current == "no_memories" then
            return 100 * ttl / ttl_max_no_memories
        else
            return 0
        end
    end
   */

  // TODO: migrate from Lua
  /*
    function m.update(callbacks)
        if current ~= "regular" and ttl <= 0 then
            current = "regular"
            callbacks.on_back_to_regular_mode()
        end
        if ttl > 0 then
            ttl = ttl - 1
        end
    end
   */
}