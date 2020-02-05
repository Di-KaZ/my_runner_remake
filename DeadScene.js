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
    }
    update(time, delta) {
    }
}