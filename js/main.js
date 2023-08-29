window.onload = () => {
  webapis.avplay.open(
    "https://ythls.onrender.com/channel/UCXuHIkEezOy_b1pnkN0-TIg.m3u8"
  );
  webapis.avplay.prepare();
  setTimeout(() => {
    registerKeyHandler();
    webapis.avplay.setDisplayRect(0, 0, screen.availWidth, screen.availHeight);
    webapis.avplay.play();
    document.body.addEventListener("unload", () => {
      webapis.avplay.stop();
    });
  }, 2000);
};

function registerKeyHandler() {
  document.addEventListener("keydown", function (e) {
    switch (e.keyCode) {
      case 10009:
        console.log("RETURN");
        tizen.application.getCurrentApplication().exit();
        break;
      case 13:
        webapis.avplay.play();
        webapis.avplay.pause();
        break;

      default:
        console.log("Unhandled key: " + e.keyCode);
        break;
    }
  });
}
