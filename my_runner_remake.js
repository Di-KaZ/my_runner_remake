// Player

class Player {
    constructor(texture) {
        this.spr = new PIXI.Sprite(texture);
        this.spr.anchor.x = 0.5;
        this.spr.anchor.y = 1;
        this.speedY = 0;
    }
    addToApp(app) {
        app.stage.addChild(this.spr);
    }
    update() {
        if (this.speedY > 5)
            this.speedY = 3;
        this.speedY += 0.1;
        if (this.spr.position.y <= 216)
            this.spr.position.y += this.speedY;
    }
}

// Parallax manager
class Plx_layer {
    constructor(texture, speed) {
        this.texture = texture;
        this.speed = speed;
        this.spr1 = new PIXI.Sprite(texture);
        this.spr2 = new PIXI.Sprite(texture);
    }
    addToApp(app) {
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

class Parallax {
    constructor(textures, initialspeed) {
        this.layers = [];
        for (i = 0; i < textures.length; i++) {
            this.layers[i] = new Plx_layer(textures[i], initialspeed);
            initialspeed -= 0.5;
        }
    }
    addToApp(app) {
        for (i = 0; i < this.layers.length; i++)
            this.layers[i].addToApp(app);
    }
    update() {
        for (i = 0; i < this.layers.length; i++)
            this.layers[i].update();
    }
}

//////////////////////


// Main Part //

// initialize pixi.js

let bump = new Bump(PIXI);
let app = new PIXI.Application({width: 384, height: 216});
PIXI.settings.SPRITE_MAX_TEXTURES = Math.min(PIXI.settings.SPRITE_MAX_TEXTURES , 16);
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
document.body.appendChild(app.view);
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";


// Texture loading

let plx_textures = [];

for (i = 1; i < 6; i ++)
    plx_textures[i] = PIXI.Texture.from("ressources/Parallax/plx-" + i + ".png");

let player_text = PIXI.Texture.from("ressources/Character/landing.png");


let plx = new Parallax(plx_textures, 0.5);

let player = new Player(player_text);


let current_state = playState;

plx.addToApp(app);
player.addToApp(app);

app.ticker.add(delta => gameLoop(delta));


function gameLoop(delta) {
    current_state(delta);
}

function playState(delta) {
    plx.update();
    player.update();
}

function keyboard(value) {
    let key = {};
    key.value = value;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = event => {
      if (event.key === key.value) {
        if (key.isUp && key.press) key.press();
        key.isDown = true;
        key.isUp = false;
        event.preventDefault();
      }
    };
  
    //The `upHandler`
    key.upHandler = event => {
      if (event.key === key.value) {
        if (key.isDown && key.release) key.release();
        key.isDown = false;
        key.isUp = true;
        event.preventDefault();
      }
    };
  
    //Attach event listeners
    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);
    
    window.addEventListener(
      "keydown", downListener, false
    );
    window.addEventListener(
      "keyup", upListener, false
    );
    
    // Detach event listeners
    key.unsubscribe = () => {
      window.removeEventListener("keydown", downListener);
      window.removeEventListener("keyup", upListener);
    };
    
    return key;
  }