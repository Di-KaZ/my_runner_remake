var game_config = {
    width: 384,
    height: 216,
    backgroundColor: 0x000000,
    scene: [MenuScene, GameLoopScene],
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    }
}

var game = new Phaser.Game(game_config);

