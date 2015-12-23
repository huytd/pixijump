var Game = function() {
    var mario_run = null;
    var mario_jump = null;
    var mario_look = null;
    var bg = null;
}

Game.prototype.init = function() {
    function loadBackground() {
        var deferred = Q.defer();
        PIXI.loader.add('background', 'res/background.jpg').load(function(loader, res) {
            bg = new PIXI.Sprite(res.background.texture);
            bg.position.x = 0;
            bg.position.y = 0;
            stage.addChild(bg);
            deferred.resolve();
        });
        return deferred;
    }

    function loadMario() {
        var deferred = Q.defer();
        PIXI.loader.add('mario', 'res/main.png').load(function(loader, res) {
            mario_run = new PIXI.extras.MovieClip(getFramesFromSpriteSheet(res.mario.texture, 57.5, 58, 9));
            mario_run.animationSpeed = 0.4;
            mario_run.gotoAndPlay(0);
            mario_run.position.x = 100;
            mario_run.position.y = 100;
            stage.addChild(mario_run);

            var text_1 = new PIXI.Text("Run Animation", {font:"12px Monaco", fill:"red"});
            text_1.position.x = 100;
            text_1.position.y = 160;
            stage.addChild(text_1);

            mario_jump = new PIXI.extras.MovieClip(getFramesFromSpriteSheet(res.mario.texture, 57.5, 58, 7, 5, 1))
            mario_jump.animationSpeed = 0.3;
            mario_jump.gotoAndPlay(0);
            mario_jump.position.x = 300;
            mario_jump.position.y = 100;
            stage.addChild(mario_jump);

            var text_2 = new PIXI.Text("Crawl Animation", {font:"12px Monaco", fill:"red"});
            text_2.position.x = 300;
            text_2.position.y = 160;
            stage.addChild(text_2);

            mario_look = new PIXI.extras.MovieClip(
                    mixFrames(
                        getFramesFromSpriteSheet(res.mario.texture, 57.5, 57, 7, 0, 8), // look up anim
                        getFramesFromFrame(res.mario.texture, 57.5, 57, 10, 0, 8) // add 10 more frames of first frame
                    )
                )
            mario_look.animationSpeed = 0.2;
            mario_look.gotoAndPlay(0);
            mario_look.position.x = 500;
            mario_look.position.y = 100;
            stage.addChild(mario_look);

            var text_3 = new PIXI.Text("Look Animation", {font:"12px Monaco", fill:"red"});
            text_3.position.x = 500;
            text_3.position.y = 160;
            stage.addChild(text_3);

            deferred.resolve();
        });
        return deferred;
    }

    Q.all([
        loadBackground(),
        loadMario()
    ]).then(function(){
        start();
    });
}


Game.prototype.loop = function() {
}
