class MenuScene extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }
    preload() {
        this.load.bitmapFont("pixelFont", "ressources/Font/font.png", "ressources/Font/font.xml");
        this.load.image("background", "ressources/bg_base.png");
        this.load.image("bg_on", "ressources/bg_on.png");
        this.load.image("bg_off", "ressources/bg_off.png");
        this.load.image("logo", "ressources/logo.png");
        this.load.audio("music", "ressources/soundtrack.ogg", {volume: 0.5});
    }
    create() {
        this.music = this.sound.add("music");
        this.music.play();
        this.background = this.add.image(0, 0, "background");
        this.background.setOrigin(0, 0);
        this.play_bg = this.add.sprite(0, 190, "bg_off");
        this.play_bg.setOrigin(0, 0);
        this.play_bg.setInteractive();
        this.logo_scale_factor = 1;
        this.logo_scale_mul = -0.01;
        this.logo = this.add.image(130, 70, "logo");
        this.play_bg.on('pointerover', () => {
            this.play_bg.setTexture("bg_on");
            this.play_text.tint = 0x000000;
        });
        this.play_bg.on('pointerout', () => {
            this.play_bg.setTexture("bg_off");
            this.play_text.tint = 0xD3D3D3;
        });
        this.play_bg.on('pointerdown', () => {
            this.scene.start("GameLoopScene");
        });
        this.play_text = this.add.bitmapText(45, 195, "pixelFont", "PLAY", 30);
        this.play_text.tint = 0xD3D3D3;
    }
    update(time, delta) {
        this.logo_scale_factor += this.logo_scale_mul;
        if (this.logo_scale_factor > 1.1)
            this.logo_scale_mul = -0.005;
        if (this.logo_scale_factor < 0.9)
            this.logo_scale_mul = 0.005;
        this.logo.setScale(this.logo_scale_factor);
    }
}