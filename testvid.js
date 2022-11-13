const { FFScene, FFText, FFVideo, FFAlbum, FFImage, FFCreator } = require("ffcreator");

const creator = new FFCreator({
  cacheDir,
  outputDir,
  width: 800,
  height: 450
});

const scene = new FFScene();
scene.setBgColor("#ffcc22");
scene.setDuration(6);
scene.setTransition("GridFlip", 2);
creator.addChild(scene);

// Create Text
const text = new FFText({ text: "hello", x: 400, y: 300 });
text.setColor("#ffffff");
text.setBackgroundColor("#000000");
text.addEffect("fadeIn", 1, 1);
scene.addChild(text);
