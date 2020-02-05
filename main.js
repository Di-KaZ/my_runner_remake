var game_config = {
    type: Phaser.AUTO,
    width: 384,
    height: 216,
    backgroundColor: 0x000000,
    scene: [MenuScene, GameLoopScene, DeadScene],
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        antialias: false
    },
    autoRound: false,
    pixelArt: true
}

var game = new Phaser.Game(game_config);


