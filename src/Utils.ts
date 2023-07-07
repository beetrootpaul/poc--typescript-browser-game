export class Utils {
  // TODO: migrate from Lua
  /*
  function u.boolean_changing_every_nth_second(n)
    return ceil(sin(time() * 0.5 / n) / 2) == 1
end
*/

  static measureTextWidth(text: string): number {
    // TODO: remove tmp impl and migrate from Lua
    return 123;
    // local y_to_print_outside_screen = a.camera_y - u.text_height_px
    // return print(text, 0, y_to_print_outside_screen) - 1
  }

  // TODO: migrate from Lua
  /*
  function u.print_with_outline(text, x, y, text_color, outline_color)
    -- Docs on Control Codes: https://www.lexaloffle.com/dl/docs/pico-8_manual.html#Control_Codes
    for control_code in all(split "\-f,\-h,\|f,\|h,\+ff,\+hh,\+fh,\+hf") do
        print(control_code .. text, x, y, outline_color)
    end
    print(text, x, y, text_color)
end
*/
  // TODO: migrate from Lua
  /*
  function u.trim(text)
    local result = text
    while sub(result, 1, 1) == ' ' do
        result = sub(result, 2)
    end
    while sub(result, #result, #result) == ' ' do
        result = sub(result, 0, #result - 1)
    end
    return result
end
*/
}
