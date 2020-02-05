class MenuScene extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }
    preload() {
        var loadingText = this.add.text(379, 211, "Loading (0%)", 15);
        loadingText.setOrigin(1, 1);
        this.load.on('progress', function (value) {
            loadingText.setText("Loading (" + Math.floor(value) * 100 + "%)");
            console.log(value);
        });
        
        this.load.on('fileprogress', function (file) {
            console.log(file.src);
        });
        this.load.on('complete', function () {
            loadingText.destroy();
            console.log('complete');
        });
        this.load.on('progress', function (value) {
            console.log("yay" + value);
        });
        this.load.bitmapFont("pixelFont", "ressources/Font/font.png", "ressources/Font/font.xml");
        this.load.image("heart", "ressources/heart.png");
        this.load.image("dead", "ressources/Character/dead.png");
        this.load.audio("menu_on", "ressources/menu_on.wav");
        this.load.audio("menu_off", "ressources/menu_off.wav");
        this.load.audio("dead_sound", "ressources/dead.ogg");
        this.load.image("layer-0", "ressources/Parallax/plx-1.png");
        this.load.image("layer-1", "ressources/Parallax/plx-2.png");
        this.load.image("layer-2", "ressources/Parallax/plx-3.png");
        this.load.image("layer-3", "ressources/Parallax/plx-4.png");
        this.load.image("layer-4", "ressources/Parallax/plx-5.png");
        this.load.image("layer-5", "ressources/Parallax/plx-6.png");
        this.load.spritesheet("player", "ressources/Character/run.png", {frameWidth: 21, frameHeight: 33});
        this.load.spritesheet("player_idle", "ressources/Character/idle.png", {frameWidth: 19, frameHeight: 34});
        this.load.image("player_land", "ressources/Character/landing.png");
        this.load.image("player_jump", "ressources/Character/jump.png");
        this.load.image("jumper", "ressources/jumper.png");
        this.load.image("grass", "ressources/plateforme1.png");
        this.load.image("void", "ressources/plateforme1.png");
        this.load.image("lava", "ressources/lava.png");
        this.load.audio("jump", "ressources/jump.ogg");
        this.load.audio("hurt", "ressources/damage.ogg");
        this.load.audio("jumper_sound", "ressources/jumper.ogg");
        this.load.image("background", "ressources/bg_base.jpg");
        this.load.image("bg_on", "ressources/bg_on.png");
        this.load.image("bg_off", "ressources/bg_off.png");
        this.load.image("logo", "ressources/logo.png");
        this.load.audio("music", "ressources/soundtrack.ogg", {volume: 0.5});
    }
    create() {
        this.anims.create({
            key: "player_idle_anim",
            frames: this.anims.generateFrameNumbers("player_idle"),
            frameRate: 8,
            repeat: -1
        });
        this.music = this.sound.add("music");
        this.menu_on = this.sound.add("menu_on");
        this.menu_off = this.sound.add("menu_off");
        // this.music.play();
        this.background = this.add.image(0, 0, "background");
        this.background.setOrigin(0, 0);
        this.idle_player = this.add.sprite(300, 216 / 2, "player_idle");
        this.idle_player.setScale(6);
        this.idle_player.play("player_idle_anim");
        this.play_bg = this.add.sprite(0, 190, "bg_off");
        this.play_bg.setOrigin(0, 0);
        this.play_bg.setInteractive();
        this.logo_scale_factor = 1;
        this.logo_scale_mul = -0.01;
        this.logo = this.add.image(130, 70, "logo");
        this.play_bg.on('pointerover', () => {
            this.play_bg.setTexture("bg_on");
            this.menu_on.play();
            this.play_text.tint = 0x000000;
        });
        this.play_bg.on('pointerout', () => {
            this.play_bg.setTexture("bg_off");
            this.menu_off.play();
            this.play_text.tint = 0xD3D3D3;
        });
        this.play_bg.on('pointerdown', () => {
            this.scene.start("GameLoopScene");
        });
        this.play_text = this.add.bitmapText(45, 195, "pixelFont", "PLAY", 30);
        this.play_text.tint = 0xD3D3D3;
        this.logo_tween = this.tweens.add({
            targets: this.logo,
            y: this.logo.y,
            x: this.logo.x,
            ease: 'Power1',
            duration: 3000,
            reapeat: 0,
            alpha: {
                getStart: () => 0,
                getEnd: () => 1
            },
            rotation: {
                getStart: () => 0,
                getEnd: () => 18.5
            },
            callbackScope: this
        });
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