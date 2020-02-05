class DeadScene extends Phaser.Scene {
    constructor() {
        super("DeadScene");
    }
    preload() {
        this.load.image("dead", "ressources/Character/dead.png");
    }
    create() {
        this.player_dead = this.add.sprite("heart");
        this.player_dead.setOrigin(0, 0);
        this.player_dead.x = 384 / 2;
        this.player_dead.y = 216 / 2;
        this.player_dead.setScale(300);
        console.log(this.player_dead);

        // this.player_ead_tween = this.tweens.add({
        //     target: this.player_dead,
        //     y: {from: 216 / 2, to: 216 / 3},
        //     duration: 1000,
        //     repeat: -1
        // });
    }
    update(time, delta) {

    }
}
