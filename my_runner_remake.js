let app = new PIXI.Application({width: window.innerWidth, height: window.innerHeight});

document.body.appendChild(app.view);

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

let player_text = PIXI.Texture.from("ressources/player_n.png");

let player_sprite = new PIXI.Sprite(player_text);

app.stage.addChild(player_sprite);