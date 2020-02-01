class MenuScene extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }
    preload() {
        this.load.image("background", "ressources/bg_base.png");
    }
    create() {
        this.background = this.add.image(0, 0, "background");
        this.background.setOrigin(0, 0);
        this.scene.start("GameLoopScene");
    }
}