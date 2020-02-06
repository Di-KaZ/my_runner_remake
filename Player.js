class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "player");
        this.scene = scene;
        this.play("player_run_anim");
        this.setOrigin(0.5, 0);
        this.jump_sound = scene.jump_sound;
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.body.setCollideWorldBounds(true);
        this.body.setBoundsRectangle(new Phaser.Geom.Rectangle(0, 0, 384, 190));
        scene.player_grp.add(this);
        this.body.setGravityY(500);
        this.spacebar = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.cursorKeys = scene.input.keyboard.createCursorKeys();
        this.pointer = scene.input.activePointer;
        this.help_text = scene.help_text;
        this.body.checkCollision.up = false;
        this.body.checkCollision.left = false;
        this.body.checkCollision.right = false;
        this.jump_button = scene.add.sprite(384 - 44, 216 - 20, "jump_button");
        this.fall_button = scene.add.sprite(384 - 84, 216 - 20, "fall_button");
        this.fall_button.setInteractive();
        this.jump_button.setInteractive();
        this.fall_button.on('pointerdown', () => {
            this.fall_button.tint = 0x808080;
            this.fall_trigger = true;
        });
        this.fall_button.on('pointerup', () => {
            this.fall_button.clearTint();
            this.fall_trigger = false;
        });
        this.jump_button.on('pointerdown', () => {
            this.jump_button.tint = 0x808080;
            this.jump_trigger = true;
        });
        this.jump_button.on('pointerup', () => {
            this.jump_button.clearTint();
            this.jump_trigger = false;
        });
        this.jump_button.setScale(1.2, 1.2);
        this.fall_button.setScale(1.2, 1.2);
        this.jump_trigger = false;
        this.fall_trigger = false;

        scene.player_tween = scene.tweens.add({
            targets: this,
            alpha: 0,
            ease: 'cubic.easeOut',
            duration: 100,
            repeat: 2,
            yoyo: true
        });
    }
    update(time, delta) {
        if (this.body.velocity.y < 0)
            this.setTexture("player_jump");
        if (this.body.velocity.y > 0 && !this.body.onFloor())
            this.setTexture("player_land");
        if ((this.body.onFloor() || this.body.touching.down) && this.anims.currentAnim.key != "player_run_anim")
            this.play("player_run_anim");
        this.movePlayerManager();
    }
    movePlayerManager() {
        if ((Phaser.Input.Keyboard.JustDown(this.spacebar) || this.cursorKeys.up.isDown || this.jump_trigger) && (this.body.touching.down || this.body.onFloor())) {
            this.jump_sound.play();
            this.body.setVelocityY(-250);
            this.help_text.visible = false;
        }
        if ((this.cursorKeys.down.isDown || this.fall_trigger) && !this.body.onFloor()) {
            this.jump_sound.play();
            this.body.checkCollision.none = true;
            this.drop_timer = this.scene.time.delayedCall(
                    150,
                    () => { this.body.checkCollision.none = false; },
                    [],
                    this
            );
        }
    }
}