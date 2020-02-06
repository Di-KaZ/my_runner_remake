let test_map =
[
    "111111111111111211111111111111111011111111111111111111111111111111111111111111111111111111112111111111111111111111111121111111111111111111111111111111",
    "111111111112111111111111111111112111111111111111111111111111111111111111111111111112111111111111111111111111111111111121111111111111111111111111111111",
    "223333333311111111111111111111111111011111111111211111111111111111111111111111111111111111111111111111111111111111111112111111111111111111111111111111"
];

let tab_align = [ 30, 90, 150];

let last = null;

class GameLoopScene extends Phaser.Scene {
    constructor() {
        super("GameLoopScene");
    }
    preload() {
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
        this.hurt_sound = this.sound.add("hurt");
        this.jumper_sound = this.sound.add("jumper_sound");
        this.help_text = this.add.bitmapText(384 / 2, 216 / 1.5, "pixelFont", "PRESS UP/DOWN OR TOUCH CONTROL", 16);
        this.help_text.setOrigin(0.5, 0.5);
        this.physics.world.checkCollision.up = false;
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
            if (!player.body.onFloor())
                player.body.x -= map_tile.body.x - map_tile.body.prev.x;
            if (map_tile.texture.key === "lava") {
                map_tile.body.checkCollision.none = true;
                this.player_tween.play();
                this.hurt_sound.play();
                this.score -= 300;
                if (this.score < 0)
                    this.score = 0;
                this.scene.start("DeadScene");            
            }
            if (map_tile.texture.key === "jumper" && player.body.touching.down) {
                this.jumper_sound.play();
                player.body.setVelocityY(-350);
            }
        }, null, this);
        this.player = new Player(this, 384 / 3, 215);
        // Map Handler
        this.map_y = 0;
        this.addColumnMap();
        // Score
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
        if (last.x + last.width - 3 <= 384)
        this.addColumnMap();
        this.map_grp.getChildren().forEach(elem => elem.update());
        
        //Update score
        this.score += 1;
        this.score_display.text = "SCORE " + this.paddScore(this.score, 6);
    }
    paddScore(number, size) {
        let string_num = String(number);
        while(string_num.length < (size || 2))
            string_num = "0" + string_num;
        return string_num;
    }
    addColumnMap() {
        if (this.map_y > test_map[0].length)
            return;
        for (var i = 0; i < tab_align.length; i ++) {
            last = new MapTile(this, 384, tab_align[i], this.getTileType(test_map[i][this.map_y]));
            this.map_grp.add(last);
        }
        this.map_y += 1;
    }
    getTileType(char) {
        if (char === "0")
            return "void";
        if (char === "1")
            return "grass";
        if (char === "2")
            return "lava";
        if (char === "3")
            return "jumper";
    }
}