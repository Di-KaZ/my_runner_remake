class MapTile extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type) {
        super(scene, x, y, type);
        this.setOrigin(0, 0);
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        scene.map_grp.add(this);
        this.body.setVelocityX(-100);
        this.body.checkCollision.down = false;
        this.body.checkCollision.left = false;
        this.body.checkCollision.right = false;
        this.body.immovable = true;
        if (type === "void") {
            this.body.checkCollision.up = false;
            this.body.checkCollision.left = false;
            this.body.checkCollision.right = false;
            this.body.checkCollision.down = false;
            this.setVisible(false);
        }
    }
    update(time, delta) {
        if (this.x + this.width < 0)
            this.destroy();
    }
}