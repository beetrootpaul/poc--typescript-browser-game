export abstract class FullScreen {
  static newFor(
    fullScreenSubjectSelector: string,
    buttonsSelector: string
  ): FullScreen {
    // TODO: implement for Safari 16.4 as well, but only after testing everything else on the older Safari 16.3,
    //       because Safari downgrade might be difficult to achieve (it updates together with macOS update).
    return document.fullscreenEnabled
      ? new FullScreenSupported(fullScreenSubjectSelector, buttonsSelector)
      : new FullScreenNoop(buttonsSelector);
  }

  abstract toggle(): void;
}

class FullScreenNoop implements FullScreen {
  constructor(buttonsSelector: string) {
    document
      .querySelectorAll<HTMLElement>(buttonsSelector)
      .forEach((button) => {
        button.style.display = "none";
      });
  }

  toggle(): void {}
}

class FullScreenSupported implements FullScreen {
  readonly #fullScreenSubject: Element;

  constructor(fullScreenSubjectSelector: string, buttonsSelector: string) {
    const fullScreenSubject = document.querySelector(fullScreenSubjectSelector);
    if (!fullScreenSubject) {
      throw Error(
        `Was unable to find a full screen subject by selector '${fullScreenSubjectSelector}'`
      );
    }
    this.#fullScreenSubject = fullScreenSubject;

    document
      .querySelectorAll<HTMLElement>(buttonsSelector)
      .forEach((button) => {
        button.addEventListener("click", () => {
          this.toggle();
        });
      });
  }

  toggle(): void {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => {
        console.error(err);
      });
    } else {
      this.#fullScreenSubject.requestFullscreen().catch((err) => {
        console.error(err);
      });
    }
  }
}
