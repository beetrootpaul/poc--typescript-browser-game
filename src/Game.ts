import { xy_ } from "@framework";
import { GameState } from "./game_states/GameState.ts";
import { GameStateSplash } from "./game_states/GameStateSplash.ts";
import { f, g, p8c } from "./globals.ts";
import { Pico8Font } from "./Pico8Font.ts";

export const tmpAudio: {
  audioCtx?: AudioContext;
  playMusic?: () => void;
  unmuteMelody?: () => void;
  unmuteModeNoMemories?: () => void;
  muteModeNoMemories?: () => void;
  unmuteModeNoCoins?: () => void;
  muteModeNoCoins?: () => void;
  playCoinSfx?: () => void;
  toggleMute?: () => void;
} = {};

type GameOptions = {
  htmlDisplaySelector: string;
  htmlCanvasSelector: string;
  htmlControlsFullscreenSelector: string;
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
      });

    f.init(
      {
        htmlDisplaySelector: options.htmlDisplaySelector,
        htmlCanvasSelector: options.htmlCanvasSelector,
        htmlControlsFullscreenSelector: options.htmlControlsFullscreenSelector,
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
        if (tmpAudio.audioCtx) {
          f.drawApi.print(
            tmpAudio.audioCtx.state,
            xy_(1, 1).add(g.cameraOffset).add(xy_(0, g.topbarSize.y)),
            p8c.red
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

async function audio(): Promise<void> {
  const audioCtx: AudioContext = new AudioContext();
  tmpAudio.audioCtx = audioCtx;

  const musicBaseAudioBuffer: AudioBuffer = await audioCtx.decodeAudioData(
    await loadAudio("music_base.wav")
  );
  const musicMelodyAudioBuffer: AudioBuffer = await audioCtx.decodeAudioData(
    await loadAudio("music_melody.ogg")
  );
  const musicNoCoinsAudioBuffer: AudioBuffer = await audioCtx.decodeAudioData(
    await loadAudio("mode_no_coins.wav")
  );
  const musicNoMemoriesAudioBuffer: AudioBuffer =
    await audioCtx.decodeAudioData(await loadAudio("mode_no_memories.wav"));

  const coinSfxAudioBuffer: AudioBuffer = await audioCtx.decodeAudioData(
    await loadAudio("sfx_coin_collected.ogg")
  );

  const mainGainNode = audioCtx.createGain();
  mainGainNode.gain.value = 1;
  mainGainNode.connect(audioCtx.destination);
  tmpAudio.toggleMute = () => {
    if (mainGainNode.gain.value > 0) {
      console.log("mute");
      mainGainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    } else {
      console.log("unmute");
      mainGainNode.gain.setValueAtTime(1, audioCtx.currentTime);
    }
  };

  const melodyGainNode = audioCtx.createGain();
  melodyGainNode.gain.value = 0;
  melodyGainNode.connect(mainGainNode);
  const noCoinsGainNode = audioCtx.createGain();
  noCoinsGainNode.gain.value = 0;
  noCoinsGainNode.connect(mainGainNode);
  const noMemoriesGainNode = audioCtx.createGain();
  noMemoriesGainNode.gain.value = 0;
  noMemoriesGainNode.connect(mainGainNode);

  tmpAudio.playMusic = () => {
    const baseSource: AudioBufferSourceNode = audioCtx.createBufferSource();
    baseSource.buffer = musicBaseAudioBuffer;
    baseSource.loop = true;
    baseSource.connect(mainGainNode);
    baseSource.start();

    const melodySource: AudioBufferSourceNode = audioCtx.createBufferSource();
    melodySource.buffer = musicMelodyAudioBuffer;
    melodySource.loop = true;
    melodySource.connect(melodyGainNode);
    melodySource.start();

    const noCoinsSource: AudioBufferSourceNode = audioCtx.createBufferSource();
    noCoinsSource.buffer = musicNoCoinsAudioBuffer;
    noCoinsSource.loop = true;
    noCoinsSource.connect(noCoinsGainNode);
    noCoinsSource.start();

    const noMemoriesSource: AudioBufferSourceNode =
      audioCtx.createBufferSource();
    noMemoriesSource.buffer = musicNoMemoriesAudioBuffer;
    noMemoriesSource.loop = true;
    noMemoriesSource.connect(noMemoriesGainNode);
    noMemoriesSource.start();
  };

  const timeConstant = 0.1;

  tmpAudio.unmuteMelody = () => {
    melodyGainNode.gain.setTargetAtTime(
      1.0,
      audioCtx.currentTime,
      timeConstant
    );
  };

  tmpAudio.unmuteModeNoMemories = () => {
    noMemoriesGainNode.gain.setTargetAtTime(
      1.0,
      audioCtx.currentTime,
      timeConstant
    );
  };

  tmpAudio.muteModeNoMemories = () => {
    noMemoriesGainNode.gain.setTargetAtTime(
      0,
      audioCtx.currentTime,
      timeConstant
    );
  };

  tmpAudio.unmuteModeNoCoins = () => {
    noCoinsGainNode.gain.setTargetAtTime(
      1.0,
      audioCtx.currentTime,
      timeConstant
    );
  };

  tmpAudio.muteModeNoCoins = () => {
    noCoinsGainNode.gain.setTargetAtTime(0, audioCtx.currentTime, timeConstant);
  };

  tmpAudio.playCoinSfx = () => {
    const source: AudioBufferSourceNode = audioCtx.createBufferSource();
    source.buffer = coinSfxAudioBuffer;
    source.connect(mainGainNode);
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
