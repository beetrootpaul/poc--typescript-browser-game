export abstract class FullScreen {
  static newFor(element: Element): FullScreen {
    // TODO: implement for Safari 16.4 as well, but only after testing everything else on the older Safari 16.3,
    //       because Safari downgrade might be difficult to achieve (it updates together with macOS update).
    return document.fullscreenEnabled
      ? new FullScreenSupported(element)
      : new FullScreenNoop();
  }

  abstract toggle(): void;
}

class FullScreenNoop implements FullScreen {
  toggle(): void {}
}

class FullScreenSupported implements FullScreen {
  readonly #element: Element;

  constructor(element: Element) {
    this.#element = element;
  }

  toggle(): void {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => {
        console.error(err);
      });
    } else {
      this.#element.requestFullscreen().catch((err) => {
        console.error(err);
      });
    }
  }
}
