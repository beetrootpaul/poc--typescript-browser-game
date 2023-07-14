import { xy_ } from "@framework";
import { GameState } from "./game_states/GameState.ts";
import { GameStateSplash } from "./game_states/GameStateSplash.ts";
import { f, g, p8c, u } from "./globals.ts";
import { Pico8Font } from "./Pico8Font.ts";

export const tmpAudio: {
  playMusic?: () => void;
  unmuteMelody?: () => void;
  unmuteModeNoMemories?: () => void;
  muteModeNoMemories?: () => void;
  unmuteModeNoCoins?: () => void;
  muteModeNoCoins?: () => void;
  playCoinSfx?: () => void;
  toggleMute?: () => void;
  hasLoadingError: boolean;
} = {
  hasLoadingError: false,
};

type GameOptions = {
  htmlDisplaySelector: string;
  htmlCanvasSelector: string;
  htmlControlsFullscreenSelector: string;
  htmlControlsMuteSelector: string;
};

type GameStoredState = {
  // TODO: Is it possible to enforce optionality of every field in the framework itself?
  // TODO: This field is used only to drive a proper framework implementation,
  //       but it's not really used in the game itself.
  //       Update it to something meaningful in a context of the game.
  mostRecentFameNumber?: number;
};

export class Game {
  #gameState: GameState = new GameStateSplash();

  start(options: GameOptions): void {
    f.init(
      {
        htmlDisplaySelector: options.htmlDisplaySelector,
        htmlCanvasSelector: options.htmlCanvasSelector,
        htmlControlsFullscreenSelector: options.htmlControlsFullscreenSelector,
        htmlControlsMuteSelector: options.htmlControlsMuteSelector,
        htmlCanvasBackground: p8c.black,
        gameCanvasSize: g.screenSize,
        desiredFps: g.fps,
        // TODO: consider disabling these logs in the production build
        logActualFps: true,
        // TODO: make it disabled for prod and toggleable for dev
        debug: {
          enabledOnInit: g.__debug,
          toggleKey: ";",
        },
      },
      {
        images: [{ url: g.assets.spritesheet }],
        fonts: [
          {
            font: new Pico8Font(),
            url: g.assets.pico8Font,
            imageTextColor: p8c.white,
            imageBgColor: p8c.black,
          },
        ],
      }
    ).then(({ startGame }) => {
      console.log("....");
      console.log("INIT");
      console.log("....");
      audio()
        .then(() => {
          console.log("====");
          console.log("DONE");
          console.log("====");

          tmpAudio.playMusic?.();
        })
        .catch((err) => {
          console.log("~~~");
          console.log("ERR");
          console.log("~~~");
          console.error(err);
          tmpAudio.hasLoadingError = true;
        });

      f.drawApi.setFont(g.assets.pico8Font);

      f.setOnUpdate(() => {
        f.storageApi.store<GameStoredState>({
          mostRecentFameNumber: f.frameNumber,
        });
        if (f.fireOnceInputEvents.has("debug_toggle")) {
          console.log("debug toggle");
          tmpAudio.toggleMute?.();
        }
        this.#gameState = this.#gameState.update();
      });

      f.setOnDraw(() => {
        f.drawApi.clear(p8c.black);
        f.drawApi.setCameraOffset(g.cameraOffset);
        this.#gameState.draw();

        if (f.debug) {
          if (tmpAudio.hasLoadingError) {
            // TODO: consider a global handler for any error that would resut with this print
            f.drawApi.print("err", xy_(1, 1), p8c.red);
          }
          const fps = f.averageFps.toFixed(0);
          f.drawApi.print(
            fps,
            g.cameraOffset.add(
              xy_(
                g.screenSize.x - u.measureTextSize(fps).x - 1,
                g.screenSize.y - 6
              )
            ),
            p8c.darkGrey
          );
          f.drawApi.print(
            `♪ ${f.audio.audioCtx.state}`,
            g.cameraOffset.add(xy_(0, g.screenSize.y - 6)),
            p8c.darkPurple
          );
        }
      });

      startGame(() => {
        let restoredState: GameStoredState | null = null;
        try {
          restoredState = f.storageApi.load<GameStoredState>();
        } catch (err) {
          // TODO: move this error to the framework itself, because there we can explicitly tell it's about `JSON.parse(…)` error
          console.warn("Failed to stored state.");
          f.storageApi.clear();
        }
        restoredState = restoredState ?? {
          mostRecentFameNumber: 0,
        };
        console.info(
          `Restored most recent frame number: ${restoredState.mostRecentFameNumber}`
        );
      });
    });
  }
}

// TODO: enforce WAV, because of Safari decoding issues for OGG
async function audio(): Promise<void> {
  const musicBaseAudioBuffer: AudioBuffer =
    await f.audio.audioCtx.decodeAudioData(await loadAudio("music_base.wav"));
  const musicMelodyAudioBuffer: AudioBuffer =
    await f.audio.audioCtx.decodeAudioData(await loadAudio("music_melody.wav"));
  const musicNoCoinsAudioBuffer: AudioBuffer =
    await f.audio.audioCtx.decodeAudioData(
      await loadAudio("mode_no_coins.wav")
    );
  const musicNoMemoriesAudioBuffer: AudioBuffer =
    await f.audio.audioCtx.decodeAudioData(
      await loadAudio("mode_no_memories.wav")
    );

  const coinSfxAudioBuffer: AudioBuffer =
    await f.audio.audioCtx.decodeAudioData(
      await loadAudio("sfx_coin_collected.wav")
    );

  const melodyGainNode = f.audio.audioCtx.createGain();
  melodyGainNode.gain.value = 0;
  melodyGainNode.connect(f.audio.mainGainNode);
  const noCoinsGainNode = f.audio.audioCtx.createGain();
  noCoinsGainNode.gain.value = 0;
  noCoinsGainNode.connect(f.audio.mainGainNode);
  const noMemoriesGainNode = f.audio.audioCtx.createGain();
  noMemoriesGainNode.gain.value = 0;
  noMemoriesGainNode.connect(f.audio.mainGainNode);

  tmpAudio.playMusic = () => {
    const baseSource: AudioBufferSourceNode =
      f.audio.audioCtx.createBufferSource();
    baseSource.buffer = musicBaseAudioBuffer;
    baseSource.loop = true;
    baseSource.connect(f.audio.mainGainNode);
    baseSource.start();

    const melodySource: AudioBufferSourceNode =
      f.audio.audioCtx.createBufferSource();
    melodySource.buffer = musicMelodyAudioBuffer;
    melodySource.loop = true;
    melodySource.connect(melodyGainNode);
    melodySource.start();

    const noCoinsSource: AudioBufferSourceNode =
      f.audio.audioCtx.createBufferSource();
    noCoinsSource.buffer = musicNoCoinsAudioBuffer;
    noCoinsSource.loop = true;
    noCoinsSource.connect(noCoinsGainNode);
    noCoinsSource.start();

    const noMemoriesSource: AudioBufferSourceNode =
      f.audio.audioCtx.createBufferSource();
    noMemoriesSource.buffer = musicNoMemoriesAudioBuffer;
    noMemoriesSource.loop = true;
    noMemoriesSource.connect(noMemoriesGainNode);
    noMemoriesSource.start();
  };

  const timeConstant = 0.1;

  tmpAudio.unmuteMelody = () => {
    melodyGainNode.gain.setTargetAtTime(
      1.0,
      f.audio.audioCtx.currentTime,
      timeConstant
    );
  };

  tmpAudio.unmuteModeNoMemories = () => {
    noMemoriesGainNode.gain.setTargetAtTime(
      1.0,
      f.audio.audioCtx.currentTime,
      timeConstant
    );
  };

  tmpAudio.muteModeNoMemories = () => {
    noMemoriesGainNode.gain.setTargetAtTime(
      0,
      f.audio.audioCtx.currentTime,
      timeConstant
    );
  };

  tmpAudio.unmuteModeNoCoins = () => {
    noCoinsGainNode.gain.setTargetAtTime(
      1.0,
      f.audio.audioCtx.currentTime,
      timeConstant
    );
  };

  tmpAudio.muteModeNoCoins = () => {
    noCoinsGainNode.gain.setTargetAtTime(
      0,
      f.audio.audioCtx.currentTime,
      timeConstant
    );
  };

  tmpAudio.playCoinSfx = () => {
    const source: AudioBufferSourceNode = f.audio.audioCtx.createBufferSource();
    source.buffer = coinSfxAudioBuffer;
    source.connect(f.audio.mainGainNode);
    source.start();
  };

  // let offset = 0;
  // if (offset === 0) {
  //   console.log("start from 0");
  //   coinSfx.start();
  //   offset = audioCtx.currentTime;
  // } else {
  //   coinSfx.start(0, audioCtx.currentTime - offset);
  // }
}

async function loadAudio(file: string): Promise<ArrayBuffer> {
  const response: Response = await fetch(file);
  return await response.arrayBuffer();
}
