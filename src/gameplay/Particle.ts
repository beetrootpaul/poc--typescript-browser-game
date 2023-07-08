export class Particle {
  // TODO: migrate from Lua
  /*
    local x = params.x
    local y = params.y
    local color = params.color
   */

  // TODO: migrate from Lua
  /*
    local r_max = 2
    local ttl_max = 28
    local ttl = ttl_max
   */

  age(): void {
    // TODO: migrate from Lua
    /*
          ttl = max(0, ttl - 1)
     */
  }

  // TODO: migrate from Lua
  /*
    function p.should_disappear()
        return ttl <= 0
    end

   */

  draw() {
    // TODO: migrate from Lua
    //   local r = flr((ttl / ttl_max) * (r_max + 0.9))
    //   circfill(x, y, r, color)
  }
}
