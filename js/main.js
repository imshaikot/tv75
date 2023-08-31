const hlsLinks = [
  "https://ythls.onrender.com/channel/UCXuHIkEezOy_b1pnkN0-TIg.m3u8", // gazi tv
  "https://live.tsports.com/live/tsports_live_720/index.m3u8", // t-sports
  "https://103.factore.cyou:8088/stream/lizata1/playlist.m3u8?id=43662&pk=750eac8c07cc3973332d9218e7c54e0b24597149049c692685daa23ae45343bb",
  // "http://103.81.104.118/hls/stream10.m3u8", // Sony six
];

let currentIndex = 0;

const startPlay = (cb) => {
  if (webapis.avplay.getState() === "PLAYING") {
    webapis.avplay.close();
  }
  webapis.avplay.open(hlsLinks[currentIndex]);
  webapis.avplay.prepare();
  setTimeout(() => {
    webapis.avplay.play();
    if (currentIndex === hlsLinks.length - 1) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }
    window.playing = true;
    cb();
  }, 2000);
};

window.onload = () => {
  startPlay(() => {
    registerKeyHandler();
    webapis.avplay.setDisplayRect(0, 0, screen.availWidth, screen.availHeight);
    document.body.addEventListener("unload", () => {
      webapis.avplay.stop();
    });
  });
};

function registerKeyHandler() {
  document.addEventListener("keydown", function (e) {
    switch (e.keyCode) {
      case 10009:
        console.log("RETURN");
        tizen.application.getCurrentApplication().exit();
        break;
      case 13:
        if (window.playing) {
          webapis.avplay.pause();
          window.playing = false;
        } else {
          webapis.avplay.play();
          window.playing = true;
        }
        break;
      case 37:
        window.playing = false;
        startPlay();
        break;
      case 38:
        window.playing = false;
        startPlay();
        break;
      default:
        console.log("Unhandled key: " + e.keyCode);
        break;
    }
  });
}
