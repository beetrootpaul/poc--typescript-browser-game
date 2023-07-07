export class Memory {
  // TODO: migrate from Lua
  /*
    local origin = params.origin
   */

  // TODO: migrate from Lua
  /*
    local x = origin.xc()
    local y = origin.yc()
    local r = origin.r()
   */

  // TODO: migrate from Lua
  /*
    local direction = origin.direction
    local sprite_for_direction = {
        u = 55,
        r = 56,
        d = 57,
        l = 58,
    }
   */

  // TODO: migrate from Lua
  /*
    local origin_state_delay = 40
    local origin_state_buffer = {}
    local origin_state_buffer_index = 1
   */

  // TODO: migrate from Lua
  /*
    local function is_active()
        return #origin_state_buffer > origin_state_delay
    end
   */

  // TODO: migrate from Lua
  /*
    function m.xc()
        return x
    end
    function m.yc()
        return y
    end
    function m.r()
        return r
    end
    function m.direction()
        return direction
    end
   */

  // TODO: migrate from Lua
  /*
    function m.collision_circle()
        return { x = x, y = y, r = r }
    end
   */

  // TODO: migrate from Lua
  /*
    function m.is_active()
        return is_active()
    end
   */

  // TODO: migrate from Lua
  /*
    function m.follow_origin()
        origin_state_buffer[origin_state_buffer_index] = {
            x = origin.xc(),
            y = origin.yc(),
            r = origin.r(),
            direction = origin.direction(),
        }

        local offset_for_1_indexed_table = 1
        local delayed_state_index = (origin_state_buffer_index - origin_state_delay - offset_for_1_indexed_table) %
            (origin_state_delay + 1) +
            offset_for_1_indexed_table
        local delayed_state = origin_state_buffer[delayed_state_index]
        if delayed_state then
            x = delayed_state.x
            y = delayed_state.y
            r = delayed_state.r
            direction = delayed_state.direction
        end
        origin_state_buffer_index = (origin_state_buffer_index + 1 - offset_for_1_indexed_table)
            % (origin_state_delay + 1)
            + offset_for_1_indexed_table
    end
   */

  // TODO: migrate from Lua
  /*
    function m.draw()
        palt(u.colors.black, false)
        palt(u.colors.dark_blue, true)
        if is_active() then
            spr(
                sprite_for_direction[direction],
                x - r,
                y - r
            )
        end
        palt()
        if __debug__ then
            circfill(x, y, r, is_active() and u.colors.salmon or u.colors.violet_grey)
        end
    end
   */

  draw() {
    // TODO: migrate from Lua
    // palt(u.colors.black, false)
    // palt(u.colors.dark_blue, true)
    // TODO: migrate from Lua
    // if is_active() then
    //     spr(
    //       sprite_for_direction[direction],
    //       x - r,
    //       y - r
    //     )
    // end
    // TODO: migrate from Lua
    // palt()
    // TODO: migrate from Lua
    // if __debug__ then
    //      circfill(x, y, r, is_active() and u.colors.salmon or u.colors.violet_grey)
    // end
  }
}
