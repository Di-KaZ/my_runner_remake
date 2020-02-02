class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "player");
        this.play("player_run_anim");
        this.setOrigin(0.5, 0);
        this.jump_sound = scene.jump_sound;
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.body.setCollideWorldBounds(true);
        this.body.setBoundsRectangle(new Phaser.Geom.Rectangle(0, 0, 384, 190));
        scene.player_grp.add(this);
        this.body.setVelocityY(100);
        this.spacebar = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.cursorKeys = scene.input.keyboard.createCursorKeys();
    }
    update(time, delta) {
        if (this.body.velocity.y < 0)
            this.setTexture("player_jump");
        if (this.body.velocity.y > 0 && !this.body.onFloor())
            this.setTexture("player_land");
        if (this.body.onFloor() && this.anims.currentAnim.key != "player_run_anim")
            this.play("player_run_anim");
        this.body.velocity.y += 10;
        this.movePlayerManager();
    }
    movePlayerManager() {
        if ((Phaser.Input.Keyboard.JustDown(this.spacebar) || this.cursorKeys.up.isDown) && this.body.onFloor()) {
            this.body.setVelocityY(-200);
            this.jump_sound.play();
        }
    }
}