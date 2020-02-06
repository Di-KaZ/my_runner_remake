class DeadScene extends Phaser.Scene {
    constructor() {
        super("DeadScene");
    }
    preload() {
    }
    create() {
        this.dead_player = this.add.sprite(384 / 2, 216 / 2, "dead");
        this.heart = this.add.sprite(384 / 2, 216 / 3, "heart");
        this.heart.setScale(0.6);
        this.dead_sound = this.sound.add("dead_sound");
        this.dead_sound.play();
        this.dead_player_tween = this.tweens.add({
            targets: this.dead_player,
            duration: 2000,
            ease: 'Circular',
            y: this.dead_player.y + 10,
            callbackScope: this,
            repeat: -1,
            yoyo: true
        });
        this.heart_tween = this.tweens.add({
            targets: this.heart,
            duration: 2000,
            ease: 'Circular',
            y: this.heart.y + 20,
            scaleX: -0.6,
            callbackScope: this,
            repeat: -1,
            yoyo: true
        });
        this.button_retry = new Button(384 / 2, 216 / 1.3, "button_dead", "menu_off", "menu_on", () => this.scene.start("GameLoopScene"), this);
        this.button_retry.setOrigin(0.5, 0.5);
        this.button_retry.setScale(0.8, 0.8);
        this.button_menu = new Button(384 / 2, 216 / 1.3 + 35, "button_dead", "menu_off", "menu_on", () => this.scene.start("MenuScene"), this);
        this.button_menu.setScale(0.7, 0.7);
        this.retry_text = this.add.bitmapText(384 / 2, 216 / 1.3, "pixelFont", "Retry", 25);
        this.menu_text = this.add.bitmapText(384 / 2 - 5, 216 / 1.3 + 35, "pixelFont", "Menu", 20);
        this.button_menu.setOrigin(0.5, 0.5);
        this.menu_text.setScale(0.8, 0.8);
        this.menu_text.setScale(0.7, 0.7);
        this.menu_text.setOrigin(0.5, 0.5);
        this.retry_text.setOrigin(0.5, 0.5);
        this.blank = this.add.sprite(0, 0, "blank");
        this.blank.setOrigin(0, 0);
        this.blank_tween = this.tweens.add({
            targets: this.blank,
            ease: 'Power1',
            duration: 2000,
            reapeat: 0,
            alpha: {
                getStart: () => 1,
                getEnd: () => 0
            },
            callbackScope: this
        });
    }
    update(time, delta) {
    }
}