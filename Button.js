class Button extends Phaser.GameObjects.Sprite {
    constructor(x, y, spritesheet, sound_in, sound_out, callback, scene) {
        super(scene, x, y, spritesheet);
        this.sound_in = sound_in;
        this.sound_out = sound_out;
        this.spritesheet = spritesheet;
        this.scene = scene;
        this.on('pointerover', () => {
            this.setFrame(1);
            this.sound_in.play();
        });
        this.on('pointerout', () => {
            this.setFrame(0);
            this.sound_out.play();
        });
        this.on('pointerdown', () => {
            callback();
        });
    }
}