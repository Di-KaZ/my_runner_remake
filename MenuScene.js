class MenuScene extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }
    preload() {
        var loadingText = this.add.text(379, 211, "Loading (0%)", 15);
        loadingText.setOrigin(1, 1);
        this.load.on('progress', function (value) {
            loadingText.setText("Loading (" + Math.ceil(value * 100) + "%)");
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
        this.load.spritesheet("menu_button", "ressources/button_menu.png", {frameWidth: 384, frameHeight: 30});
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
        this.music = this.sound.add("music");
        // this.music.play();
        this.background = this.add.image(0, 0, "background");
        this.background.setOrigin(0, 0);
        this.idle_player = this.add.sprite(400, 216 / 2, "player_idle");
        this.idle_player.setScale(6);
        this.logo_scale_factor = 1;
        this.logo_scale_mul = -0.01;
        this.logo = this.add.image(130, 60, "logo");
        
        // MENU BUTTONS
        this.play_button = new Button(-30, 126, "menu_button", "menu_off", "menu_on", () => this.scene.start("GameLoopScene"), this);
        this.options_button = new Button(-20, 156, "menu_button", "menu_off", "menu_on", () => this.scene.start("OptionsScene"), this);
        this.credits_button = new Button(0, 186, "menu_button", "menu_off", "menu_on", () => this.scene.start("CreditScene"), this);
        this.play_button.alpha = 0;
        this.options_button.alpha = 0;
        this.credits_button.alpha = 0;
        this.play_text = this.add.bitmapText(45, 130, "pixelFont", "PLAY", 30);
        this.play_text.tint = 0x000000;
        this.options_text = this.add.bitmapText(65, 160, "pixelFont", "OPTIONS", 30);
        this.options_text.tint = 0x000000;
        this.credits_text = this.add.bitmapText(95, 190, "pixelFont", "CREDITS", 30);
        this.credits_text.tint = 0x000000;
        this.play_text.alpha = 0;
        this.options_text.alpha = 0;
        this.credits_text.alpha = 0;

        // ANIMATION
        this.anims.create({
            key: "player_idle_anim",
            frames: this.anims.generateFrameNumbers("player_idle"),
            frameRate: 8,
            repeat: -1
        });
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
        this.idle_depl = this.tweens.add({
            targets: this.idle_player,
            x: this.idle_player.x - 100,
            ease: 'Power1',
            duration: 3000,
            reapeat: 0,
            alpha: {
                getStart: () => 0,
                getEnd: () => 1
            },
            callbackScope: this
        });
        this.play_depl = this.tweens.add({
            targets: this.play_button,
            delay: 400,
            x: this.play_button.x + 30,
            ease: 'Power1',
            duration: 3000,
            reapeat: 0,
            alpha: {
                getStart: () => 0,
                getEnd: () => 1
            },
            callbackScope: this
        });
        this.options_depl = this.tweens.add({
            targets: this.options_button,
            delay: 800,
            x: this.options_button.x + 30,
            ease: 'Power1',
            duration: 3000,
            reapeat: 0,
            alpha: {
                getStart: () => 0,
                getEnd: () => 1
            },
            callbackScope: this
        });
        this.credits_depl = this.tweens.add({
            targets: this.credits_button,
            delay: 1200,
            x: this.credits_button.x + 30,
            ease: 'Power1',
            duration: 3000,
            reapeat: 0,
            alpha: {
                getStart: () => 0,
                getEnd: () => 1
            },
            callbackScope: this
        });
        this.play_text_depl = this.tweens.add({
            targets: this.play_text,
            delay: 400,
            ease: 'Power1',
            duration: 3000,
            reapeat: 0,
            alpha: {
                getStart: () => 0,
                getEnd: () => 1
            },
            callbackScope: this
        });
        this.options_text_depl = this.tweens.add({
            targets: this.options_text,
            delay: 800,
            ease: 'Power1',
            duration: 3000,
            reapeat: 0,
            alpha: {
                getStart: () => 0,
                getEnd: () => 1
            },
            callbackScope: this
        });
        this.credits_text_depl = this.tweens.add({
            targets: this.credits_text,
            delay: 1200,
            ease: 'Power1',
            duration: 3000,
            reapeat: 0,
            alpha: {
                getStart: () => 0,
                getEnd: () => 1
            },
            callbackScope: this
        });
        this.idle_player.play("player_idle_anim");
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