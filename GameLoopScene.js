class GameLoopScene extends Phaser.Scene {
    constructor() {
        super("GameLoopScene");
    }
    preload() {
        this.load.image("layer-0", "ressources/Parallax/plx-1.png");
        this.load.image("layer-1", "ressources/Parallax/plx-2.png");
        this.load.image("layer-2", "ressources/Parallax/plx-3.png");
        this.load.image("layer-3", "ressources/Parallax/plx-4.png");
        this.load.image("layer-4", "ressources/Parallax/plx-5.png");
        this.load.spritesheet("player", "ressources/Character/run.png", {frameWidth: 21, frameHeight: 33});
    }
    create() {
        // Parallax
        this.layer_0 = this.add.tileSprite(0, 0, 384, 216, "layer-0");
        this.layer_0.setOrigin(0, 0);
        this.layer_1 = this.add.tileSprite(0, 0, 384, 216, "layer-1");
        this.layer_1.setOrigin(0, 0);
        this.layer_2 = this.add.tileSprite(0, 0, 384, 216, "layer-2");
        this.layer_2.setOrigin(0, 0);
        this.layer_3 = this.add.tileSprite(0, 0, 384, 216, "layer-3");
        this.layer_3.setOrigin(0, 0);
        this.layer_4 = this.add.tileSprite(0, 0, 384, 216, "layer-4");
        this.layer_4.setOrigin(0, 0);
        // Player
        this.player = this.physics.add.sprite(192, 0, "player");
        this.player.setOrigin(0.5, 0);
        this.anims.create({
            key: "player_run",
            frames: this.anims.generateFrameNumbers("player"),
            framerate: 10,
            repeat: -1
        });
        this.player.play("player_run");
        this.player.setVelocity(0, 100);
        this.player.setCollideWorldBounds(true);
        this.cursorKeys = this.input.keyboard.createCursorKeys();
    }
    movePlayerManager() {
        if (this.cursorKeys.up.isDown && this.player.body.onFloor()) {
            this.player.setVelocityY(-200);
        }
    }
    update() {
        // move parallax
        this.layer_1.tilePositionX += 0.5;
        this.layer_2.tilePositionX += 1;
        this.layer_3.tilePositionX += 1.5;
        this.layer_4.tilePositionX += 2;
        // player gravity
        this.player.body.velocity.y += 10;
        this.movePlayerManager();
    }
}