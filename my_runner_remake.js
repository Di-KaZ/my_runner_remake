const logicalWidth = 384;
const logicalHeight = 216;

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

// Player

class Player {
    constructor(texture) {
        this.spr = new PIXI.AnimatedSprite(texture);
        this.spr.animationSpeed = 15;
        this.spr.anchor.x = 0.5;
        this.spr.anchor.y = 1;
        this.spr.position.x = logicalWidth / 2;
        this.speedY = 0;
        this.isJumping = true;
    }
    addToApp(app) {
        app.addChild(this.spr);
    }
    update() {
        this.speedY += 0.3;
        this.spr.position.y += this.speedY;
        this.speedY *= 0.9;
        if (this.spr.position.y > logicalHeight) {
            this.spr.position.y = logicalHeight;
            this.isJumping = false;
            this.speedY = 0;
        }
    }
    jump() {
        if (this.isJumping == false) {
            this.speedY = -10;
            this.isJumping = true;
        }
    }
}

const resizeHandler = () => {
    const scaleFactor = Math.min(
      window.innerWidth / logicalWidth,
      window.innerHeight / logicalHeight
    );
    const newWidth = Math.ceil(logicalWidth * scaleFactor);
    const newHeight = Math.ceil(logicalHeight * scaleFactor);
    
    app.renderer.view.style.width = `${newWidth}px`;
    app.renderer.view.style.height = `${newHeight}px`;
  
    app.renderer.resize(newWidth, newHeight);
    mainContainer.scale.set(scaleFactor); 
  };

// Parallax manager
class Plx_layer {
    constructor(texture, speed) {
        this.texture = texture;
        this.speed = speed;
        this.spr1 = new PIXI.Sprite(texture);
        this.spr2 = new PIXI.Sprite(texture);
    }
    addToApp(app) {
        app.addChild(this.spr1);
        app.addChild(this.spr2);
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

let mainContainer = new PIXI.Container();
PIXI.settings.SPRITE_MAX_TEXTURES = Math.min(PIXI.settings.SPRITE_MAX_TEXTURES , 16);
let bump = new Bump(PIXI);
let app = new PIXI.Application({width: logicalWidth, height: logicalHeight});
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
app.renderer.view.id = "pixi-canvas";
document.body.appendChild(app.view);

window.addEventListener('resize', resizeHandler, false);

resizeHandler();
// Texture loading

let plx_textures = [];

for (i = 1; i < 6; i ++)
    plx_textures[i] = PIXI.Texture.from("ressources/Parallax/plx-" + i + ".png");

let player_text = PIXI.BaseTexture.from("ressources/Character/run.png");

let jump_button_text = PIXI.Texture.from("ressources/jump.png");

let player_text_anim =
[
    new PIXI.Texture(player_text, new PIXI.Rectangle(1 * 21, 0, 21, 33)),
    new PIXI.Texture(player_text, new PIXI.Rectangle(2 * 21, 0, 21, 33)),
    new PIXI.Texture(player_text, new PIXI.Rectangle(3 * 21, 0, 21, 33)),
    new PIXI.Texture(player_text, new PIXI.Rectangle(4 * 21, 0, 21, 33)),
    new PIXI.Texture(player_text, new PIXI.Rectangle(5 * 21, 0, 21, 33)),
    new PIXI.Texture(player_text, new PIXI.Rectangle(6 * 21, 0, 21, 33)),
    new PIXI.Texture(player_text, new PIXI.Rectangle(7 * 21, 0, 21, 33)),
];

console.log(player_text_anim.length);
let plx = new Parallax(plx_textures, 0.5);

let player = new Player(player_text_anim);

let jump_button = new PIXI.Sprite(jump_button_text);
jump_button.interactive = true;

jump_button.position.x = 353;
jump_button.position.y = 185;

let current_state = playState;

let space_key = keyboard("ArrowUp");

jump_button.on('pointerdown', function(e) {
    player.jump();
});

space_key.press = ()  => {
    player.jump();
}

plx.addToApp(mainContainer);
player.addToApp(mainContainer);
app.stage.addChild(mainContainer);
mainContainer.addChild(jump_button);
app.ticker.add(delta => gameLoop(delta));


function gameLoop(delta) {
    current_state(delta);
}

function playState(delta) {
    plx.update();
    player.update();
}