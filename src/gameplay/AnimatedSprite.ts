type AnimatedSpriteParams = {
  framesPerSprite: number;
};

// TODO: sounds like something to be moved to the framework
export class AnimatedSprite {
  readonly #framesPerSprite: number;

  constructor(params: AnimatedSpriteParams) {
    // TODO: migrate from Lua
    //   local first_sprite = params.first_sprite
    //   local number_of_sprites = params.number_of_sprites
    this.#framesPerSprite = params.framesPerSprite;
  }

  // TODO: migrate from Lua
  /*
    local frame_counter = 0
    local loop_length_frames = frames_per_sprite * number_of_sprites
   */

  // TODO: migrate from Lua
  /*
    function as.advance_1_frame()
        frame_counter = (frame_counter + 1) % loop_length_frames
    end
   */

  // TODO: migrate from Lua
  /*
    function as.current_sprite()
        local sprite_index = flr(frame_counter / frames_per_sprite)
        return first_sprite + sprite_index
    end
   */
}
