class Button extends Phaser.GameObjects.Sprite {
    constructor(x, y, spritesheet, sound_in, sound_out, callback, scene) {
        super(scene, x, y, spritesheet);
        this.setOrigin(0, 0);
        this.sound_on = scene.sound.add(sound_in);
        this.sound_out = scene.sound.add(sound_out);
        this.spritesheet = spritesheet;
        scene.add.existing(this);
        this.setInteractive();
        this.scene = scene;
        this.on('pointerover', () => {
            this.setFrame(1);
            this.sound_out.play();
        });
        this.on('pointerout', () => {
            this.setFrame(0);
            this.sound_on.play();
        });
        this.on('pointerdown', () => {
            callback();
        });
    }
}