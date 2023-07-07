import { GameDrawContext } from "@framework";

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

  // TODO: migrate from Lua
  /*
    function p.age()
        ttl = max(0, ttl - 1)
    end
   */

  // TODO: migrate from Lua
  /*
    function p.should_disappear()
        return ttl <= 0
    end

   */

  draw({ drawApi }: GameDrawContext) {
    // TODO: migrate from Lua
    //   local r = flr((ttl / ttl_max) * (r_max + 0.9))
    //   circfill(x, y, r, color)
  }
}
