let tab_align = [ 60, 90, 120, 140, 170 ];

class MapHandler {
    constructor(scene, map) {
        this.scene = scene;
        this.map = map;
        this.map_y = 0;
        this.addColumn();
        this.last = null;
    }
    getType(char) {
        if (char === "1")
            return "grass";
        if (char === "2")
            return "lava";
    }
    addColumn() {
        if (this.map_y > this.map[0].length)
            return;
        console.log(this.map_y);
        for (var i = 0; i < tab_align.length; i ++) {
            this.last = new MapTile(this.scene, 384, tab_align[i], this.getType(this.map[i][this.map_y]));
            this.scene.map_grp.add(this.last);
        }
        console.log(this.last);
        this.map_y += 1;
    }
    update() {
        if (!this.last)
        return;
        if (this.last.x + this.last.width < 384)
            this.addColumn();
    }
}