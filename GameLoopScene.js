let test_map =
[
    "1111121111",
    "1111111111",
    "2111111111",
    "1111121111",
    "1111111111",
];

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
        this.load.image("layer-5", "ressources/Parallax/plx-6.png");
        this.load.spritesheet("player", "ressources/Character/run.png", {frameWidth: 21, frameHeight: 33});
        this.load.image("player_land", "ressources/Character/landing.png");
        this.load.image("player_jump", "ressources/Character/jump.png");
        this.load.image("grass", "ressources/plateforme1.png");
        this.load.image("lava", "ressources/lava.png");
        this.load.audio("jump", ["ressources/jump.ogg"]);
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
        this.layer_5 = this.add.tileSprite(0, 0, 384, 216, "layer-5");
        this.layer_5.setOrigin(0, 0);
        this.jump_sound = this.sound.add("jump");
        this.help_text = this.add.bitmapText(384 / 2, 216 / 1.5, "pixelFont", "PRESS UP/SPACE OR CLICK ANYWHERE TO JUMP", 16);
        this.help_text.setOrigin(0.5, 0.5);
        // Player
        this.anims.create({
            key: "player_run_anim",
            frames: this.anims.generateFrameNumbers("player"),
            frameRate: 13,
            repeat: -1
        });
        this.player_grp = this.add.group("player_grp");
        this.map_grp = this.add.group("map_group");
        this.physics.add.collider(this.player_grp, this.map_grp, function(player, map_tile) {
            
        });
        this.player = new Player(this, 384 / 3, 215);
        // Score
        this.map_handler = new MapHandler(this, test_map);
        this.score = 0;
        this.score_display = this.add.bitmapText(10, 5, "pixelFont", "SCORE", 16);
    }
    update(time, delta) {
        // move parallax
        this.layer_1.tilePositionX += 0.2;
        this.layer_2.tilePositionX += 0.5;
        this.layer_3.tilePositionX += 0.8;
        this.layer_4.tilePositionX += 1.2;
        this.layer_5.tilePositionX += 1.5;
        
        // Manage player
        this.player_grp.getChildren().forEach(elem => elem.update());

        // Manage map
        this.map_grp.getChildren().forEach(elem => elem.update());

        //Update score
        this.score_display.text = "SCORE " + this.paddScore(this.score, 6);
        this.map_handler.update();
    }
    paddScore(number, size) {
        let string_num = String(number);
        while(string_num.length < (size || 2))
            string_num = "0" + string_num;
        return string_num;
    }
}