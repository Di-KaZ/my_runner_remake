class OptionsScene extends Phaser.Scene {
    constructor() {
        super("OptionsScene");
    }
    create() {
        this.background = this.add.image(0, 0, "background");
        this.background.setOrigin(0, 0);
        this.fullscreen_button = new Button(0, 216 - 60, "menu_button", "menu_off", "menu_on", () => this.scale.toggleFullscreen(), this);
        this.menu_button = new Button(0, 216 - 30, "menu_button", "menu_off", "menu_on", () => this.scene.start("MenuScene"), this);
        this.fullscreen_text = this.add.bitmapText(40, 216 - 55, "pixelFont", "TOGGLE FULLSCREEN", 30);
        this.menu_text = this.add.bitmapText(40, 216 - 25, "pixelFont", "RETURN", 30);
        this.fullscreen_text.tint = 0x000000;
        this.menu_text.tint = 0x000000;

    }
}
