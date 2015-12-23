var renderer = new PIXI.autoDetectRenderer(800, 600);
renderer.backgroundColor = 0xFAFAFA;
document.body.appendChild(renderer.view);

var stage = new PIXI.Container();
var game = new Game() || null;

if (game != null) {
    game.init();
}

function start() {
    requestAnimationFrame(start);

    if (game != null) game.loop();

    renderer.render(stage);
}

function mixFrames(a, b) {
    return a.concat(b);
}

function getFramesFromSpriteSheet(texture, frameWidth, frameHeight, numFrames, startX, startY) {
    var frames = [];
    startX = startX || 0;
    startY = startY || 0;

    for(var i = 0; i < (numFrames * frameWidth); i += frameWidth) {
        frames.push(new PIXI.Texture(texture.baseTexture, new PIXI.Rectangle(i + (startX * frameWidth), startY * frameHeight, frameWidth, frameHeight)));
    }

    return frames;
}

function getFramesFromFrame(texture, frameWidth, frameHeight, numFrames, startX, startY) {
    var frames = [];
    startX = startX || 0;
    startY = startY || 0;

    for(var i = 0; i < (numFrames * frameWidth); i += frameWidth) {
        frames.push(new PIXI.Texture(texture.baseTexture, new PIXI.Rectangle(startX * frameWidth, startY * frameHeight, frameWidth, frameHeight)));
    }

    return frames;
}
