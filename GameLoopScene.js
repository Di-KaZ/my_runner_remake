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
        this.load.image("player_land", "ressources/Character/landing.png");
        this.load.image("player_jump", "ressources/Character/jump.png");
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
        this.anims.create({
            key: "player_run_anim",
            frames: this.anims.generateFrameNumbers("player"),
            framerate: 10,
            repeat: -1
        });
        this.player_grp = this.add.group("player_grp");
        this.map_grp = this.add.group("map_group");
        this.player = new Player(this, 384 / 2, 215);
    }
    update() {
        // move parallax
        this.layer_1.tilePositionX += 0.5;
        this.layer_2.tilePositionX += 1;
        this.layer_3.tilePositionX += 1.5;
        this.layer_4.tilePositionX += 2;
        
        // Manage player
        this.player_grp.getChildren().forEach(elem => elem.update());

        // Manage map
        this.map_grp.getChildren().forEach(elem => elem.update());
    }
}