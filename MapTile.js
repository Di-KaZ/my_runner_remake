class MapTile extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type) {
        super(scene, x, y, type);
        this.setOrigin(0, 0);
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        scene.map_grp.add(this);
        this.body.setVelocityX(-100);
    }
    update(time, delta) {
        // if (this.x < 0)
            // this.destroy();
    }
}