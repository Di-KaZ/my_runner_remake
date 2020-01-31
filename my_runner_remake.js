// setup the app

class Plx_layer {
    constructor(texture, speed) {
        this.texture = texture;
        this.speed = speed;
        this.spr1 = new PIXI.Sprite(texture);
        this.spr2 = new PIXI.Sprite(texture);
    }
    addToStage(app) {
        app.stage.addChild(this.spr1);
        app.stage.addChild(this.spr2);
    }
    update() {
        this.spr1.position.x += this.speed;
        this.spr2.position.x = this.spr1.position.x + this.spr1.width;
        if (this.spr2.position.x < 0) {
            let temp = this.spr2;
            this.spr2 = this.spr1;
            this.spr1 = temp;
        }
    }
}
let app = new PIXI.Application({width: window.innerWidth, height: window.innerHeight});

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
document.body.appendChild(app.view);

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

let player_text = PIXI.Texture.from("ressources/Character/idle.png");
let p_layer_1 = PIXI.Texture.from("ressources/Parallax/plx-1.png");
let p_layer_2 = PIXI.Texture.from("ressources/Parallax/plx-2.png");

let player_sprite = new PIXI.Sprite(player_text);
let p_layer_1_sprite = new PIXI.Sprite(p_layer_1);
player_sprite.scale.x = 4;
player_sprite.scale.y = 4;
p_layer_1_sprite.scale.x = 4;
p_layer_1_sprite.scale.y = 4;

app.stage.addChild(p_layer_1_sprite);
app.stage.addChild(player_sprite);