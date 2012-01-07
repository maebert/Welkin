/** 
 * @namespace Holds functions for drawing on the screen
 */
var graphics = {};

/** Draws a tile from the current game's tileset to a canvas
* 
* @param {Canvas} canvas A canvas element, such as graphics.layers.floor
* @param {Number} column Column of the target tile
* @param {Number} row Row of the target tile
* @param {Number} tileIndex Tile index in the tileset.
* 
* @cat Graphics
* @name graphics.draw
* @function
* @version 0.1
*/
graphics.draw = function(canvas, column, row, tileIndex) {
    var context = canvas.getContext("2d");
    // convert coordinates to pixels
    var dest = helpers.coords_to_px(column, row)
    var source = graphics.get_tile_position(tileIndex);

    context.drawImage(
        game.theme.tileset,     // source image
        source.x, source.y,     // position in source image
        game.theme.tile_width,  // width of cropping area in source image
        game.theme.tile_height, 
        dest.x, dest.y,         // position on target canvas
        game.theme.tile_width,  // width of projection on target canvas
        game.theme.tile_height  // (no scaling: same as width of cropping area)
    );
}

/** Calculates the position of a tile in game.theme's tileset
* 
* @param {Number} tileIndex Tile index in the tileset.
* @return {Object} Object with the x and y coordinates in px
* 
* @cat Graphics
* @name graphics.get_tile_position
* @function
* @version 0.1
*/
graphics.get_tile_position = function(tileIndex) {
    var tiles_h = game.theme.tileset.width / game.theme.tile_width;
    var x = (tileIndex % tiles_h);
    var y = (tileIndex - x) / tiles_h;
    // got the position, now get the actual pixel coordinates
    x *= game.theme.tile_width;
    y *= game.theme.tile_height;
    return {x:x, y:y}
}

/** Draws all floor tiles in game.tiles using the draw_tile
* 
* @see draw_tile
* 
* @cat Graphics
* @name graphics.draw_base
* @function
* @version 0.1
*/
graphics.draw_base = function() {
    // Get all tile indices
    var st = []
    for (tileIndex in game.level.tiles) {
        if (game.level.tiles.hasOwnProperty(tileIndex)) {
            st.push(parseInt(tileIndex));
        }
    }
    // Sort according to row!
    st.sort(function(a,b){
        c1 = helpers.tile_index_to_coords(a);
        c2 = helpers.tile_index_to_coords(b);
        return c1.row - c2.row;
    });

    var context = graphics.layers.floor.getContext("2d");

    for (i in st) {
        tileIndex = st[i];
        r = helpers.tile_index_to_coords(tileIndex);
        graphics.draw(graphics.layers.floor, r.column, r.row, game.level.tiles[tileIndex].tile);
    }
}

/** Draws objects as static elements to the objects canvases
* 
* @param {GameObjects[]} objects Array of objects (e.g. as defined by level.objects
* @see theme#draw_element
* 
* @cat Graphics
* @name graphics.draw_objects
* @function
* @version 0.1.1
*/
graphics.draw_objects = function(objects) {
    for (obj in objects) {
    
        var defaults = {
            sprite: 0,
            tile: 0,
            z: 0,
            x: 0,
            y: 0
        }
        var object = $.extend({}, defaults, objects[obj]);
        if (!objects[obj].hasOwnProperty('tile')) {
            object.tile = game.theme.objects[object.sprite].tile;
        }
        // Pick the right z layer!
        layer = graphics.layers.object_layers[object.y + object.z];
        graphics.draw(layer, object.x, object.y, object.tile);       
    }
}




/** Draws a wall to the proper object canvas
* 
* @param {Number} wall_index Index of the wall as saved in level.walls
* 
* @see wall_index_to_coords Compute Coordinates from a wall index
* @cat Graphics
* @name graphics.draw_wall
* @function
* @version 0.1
*/
graphics.draw_wall = function (wall_index) {
    tile = helpers.wall_index_to_coords(wall_index);
    // Pick the right z layer!
    layer = graphics.layers.object_layers[tile.row];
    graphics.draw(layer, tile.column, tile.row, game.theme.walls[tile.side]);
}


/** Plays an animation
* Should be called before drawing the corresponding wall.
* 
* @param {Number} column
* @param {Number} row
* @param {String} name Handle of the animation in theme.anim
* @return {Object} Animation object 
*
* @cat Graphics
* @name graphics.anim
* @function
* @version 0.2
*/
graphics.anim = function (column, row, name) {
    // An animation is just an object:
    var tmp = $.extend({x: column, y: row}, game.theme.anim[name])
    var anim = new game.Object(tmp);

    if (anim.hasOwnProperty('class')) $(anim.div).addClass(anim.class);
    //if (anim.steps > 1) 
    $(anim.div).sprite({fps: anim.fps, no_of_frames: anim.steps});

    setTimeout(function() {
        if (anim.steps > 1) $(anim.div).destroy(); 
        $(anim.div).remove();
        delete anim;
    }, anim.duration);
    
    return anim;

}

/** Draws a pole (corner of a wall) to the proper object canvas.
* Should be called before drawing the corresponding wall.
* 
* @param {Number} column
* @param {Number} row
* @param {Number} side
* 
* @see wall_index_to_coords Compute Coordinates from a wall index
* @cat Graphics
* @name graphics.draw_pole
* @function
* @version 0.1
*/
graphics.draw_pole = function (column, row, side) {
    layer = graphics.layers.object_layers[row];
    graphics.draw(layer, column, row, game.theme.wall_corners[side]);
}

/** Draws all walls of a level. 
* In a first loop, all poles will be drawn, afterwards the walls will be drawn atop
* 
* @param {WallIndices[]} walls
* 
* @see draw_pole
* @see draw_wall
* @cat Graphics
* @name graphics.draw_walls
* @function
* @version 0.1
*/
graphics.draw_walls = function(walls){
    // first: draw all the poles
    for (i in walls) {
        tile = helpers.wall_index_to_coords(walls[i]);
        if (tile.side == 0) {
            graphics.draw_pole(tile.column, tile.row, 0);
            graphics.draw_pole(tile.column-1, tile.row+1, 1);
        } else if (tile.side == 1) {
            graphics.draw_pole(tile.column, tile.row, 0);
            graphics.draw_pole(tile.column, tile.row, 1);
        } else if (tile.side == 2) {
            graphics.draw_pole(tile.column, tile.row, 1);
            graphics.draw_pole(tile.column+1, tile.row+1, 0);
        }        
        
    }        
    // then: draw all walls        
    for (i in walls) {
        graphics.draw_wall(walls[i]);
    }
}

graphics.clear = function(layer) {
    context = layer.getContext("2d");
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0,0,graphics.layer_width, graphics.layer_height);        
}

graphics.redraw = function() {
    // clear all our objects
    for (z in graphics.layers.object_layers) {
        layer = graphics.layers.object_layers[z];
        graphics.clear(layer);
    }
    graphics.draw_walls(game.level.walls);
    graphics.draw_objects(game.level.objects)
}

/** Draws all elements of a level (floor, walls, objects)
* 
* @cat Graphics
* @name graphics.init
* @function
* @version 0.1
*/
graphics.draw_level = function() {

    // draw ground
    graphics.draw_base();        
    graphics.draw_walls(game.level.walls);
    graphics.draw_objects(game.level.objects);
    game.player = new game.Object(game.level.player);
    game.monsters = []

    for (i in game.level.monsters) {
        var monster = new game.Object(game.level.monsters[i]);
        game.monsters.push(monster);
    }
    
    graphics.debug_clear = [0,0,0,0];        
}


/** Clears the highlight layer
* 
* @see highlight_field
* 
* @cat Graphics
* @name graphics.clear_highlight
* @function
* @version 0.1
*/
graphics.clear_highlight = function() {
    context = graphics.layers.highlight.getContext("2d");
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0,0,graphics.layer_width, graphics.layer_height);        
}

/** Highlights a certain field
* 
* @param options Options object
* @param {Number} options.column Column of the field
* @param {Number} options.row Row of the field
* @param {String} [options.fillStyle="rgba(255,255,255,.2)"] Fill properties
* @param {String} [options.StrokeStyle="rgba(255,96,96,.5)"] Stroke properties
* @param {Number} [options.lineWidth=4] Width of the stroke
* @param {String} [options.clear="rect"] Clear highlights first. "rect" clears the last highlight, "none" doesn't/
* 
* @see clear_highlight
* 
* @cat Graphics
* @name graphics.highlight_field
* @function
* @version 0.1
*/
graphics.highlight_field = function (options) {

    var defaults = {
        column: 0,
        row: 0,
        fillStyle: "rgba(255,255,255,.2)",
        strokeStyle: "rgba(255,96,96,.5)",
        lineWidth: 4,
        clear: "rect"
    }
    
    var options = $.extend({}, defaults, options);

    context = graphics.layers.highlight.getContext("2d");
    
    var x = options.column * .75 * game.theme.floor_width;
    var dx = game.theme.floor_width * .25;
    var y =  options.row * game.theme.floor_height / 2 -2;
    var dy = game.theme.floor_height * .5;

    if (options.clear == "rect") {
        var cl = graphics.debug_clear;
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(cl[0], cl[1], cl[2], cl[3]);        
    }
    
    context.beginPath();
    context.moveTo(x,      y+dy);
    context.lineTo(x+dx,   y);
    context.lineTo(x+3*dx, y);
    context.lineTo(x+4*dx, y+dy);
    context.lineTo(x+3*dx, y+2*dy);
    context.lineTo(x+dx,   y+2*dy);
    context.closePath();
    
    context.fillStyle = options.fillStyle;
    context.fill();
    context.lineWidth = options.lineWidth;
    context.strokeStyle = options.strokeStyle;
    context.lineCap = "round";
    context.stroke();
          
    graphics.debug_clear = [x-options.lineWidth, y-options.lineWidth, 4*dx+2*options.lineWidth, 2*dy+2*options.lineWidth];
}


/** Highlights all possible moves for the player.
* 
* @see highlight_field
* 
* @cat Graphics
* @name graphics.highlight_moves
* @function
* @version 0.1
*/    
graphics.highlight_moves = function() {   
    // step 1: calculate all adjacent tiles
    var adjacent = helpers.get_adjacent(game.player.x, game.player.y);
    
    // step 4: highlight all remaining tiles
    for (ind in adjacent) {
        loc = adjacent[ind];
        if (game.is_valid_move(loc.column, loc.row)) {
            graphics.highlight_field({column: loc.column, row: loc.row, clear: "none", lineWidth: 4, strokeStyle: "rgba(0,0,255,.2)", fillStyle: "rgba(255,255,255,.4)"});
        }            
    }        
}

/** Creates a canvas
* 
* @param options
* @param {Number} [options.zIndex=0] zIndex of the layer. -2 is floor, -1 floor deco, 0-n are the isometric objects, 99 is interaction layer
* @param {String} options.id Id of the DOM element
* 
* @cat Graphics
* @name graphics.create_layer
* @function
* @version 0.1
*/         
graphics.create_layer = function (options) {    
    var defaults = {
        zIndex: 0,
        id: ""        
    }        
    var options = $.extend({}, defaults, options)

    layer = document.createElement('canvas');
    layer.id = options.id;
    layer.style.zIndex = options.zIndex;
    layer.width = graphics.layer_width;
    layer.height = graphics.layer_height;
    document.getElementById("container").appendChild(layer);
    return layer;
}

/** Highlights an edge
* 
* @param {Number} x Column of the tile 
* @param {Number} y Row of the tile 
* @param {Number} side Side of the edge [0,1,2]
* 
* @cat Graphics
* @name graphics.debug_draw_edge
* @function
* @version 0.1
*/  
graphics.debug_draw_edge = function(x, y, side) {
    context = game.iPane.getContext("2d");
    
    points_x = [
        x * .75 * game.theme.floor_width,
        x * .75 * game.theme.floor_width + game.theme.floor_width * .25,
        x * .75 * game.theme.floor_width + game.theme.floor_width * .75,
        x * .75 * game.theme.floor_width + game.theme.floor_width,
        x * .75 * game.theme.floor_width + game.theme.floor_width * .75,
        x * .75 * game.theme.floor_width + game.theme.floor_width * .25
    ];
    
    points_y = [
        y * game.theme.floor_height / 2 + game.theme.floor_height * .5,
        y * game.theme.floor_height / 2,
        y * game.theme.floor_height / 2,
        y * game.theme.floor_height / 2 + game.theme.floor_height * .5,
        y * game.theme.floor_height / 2 + game.theme.floor_height,
        y * game.theme.floor_height / 2 + game.theme.floor_height
    ];
    
    var x1 = points_x[side];
    var y1 = points_y[side];
    var x2 = points_x[(side+1)%6];
    var y2 = points_y[(side+1)%6];

    var cl = graphics.debug_clear;
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(cl[0], cl[1], cl[2], cl[3]);

    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineWidth = 4;
    context.strokeStyle = "rgba(128,190,255,.5)";
    context.lineCap = "round";
    context.stroke();
    
    // set clear area
    if (x1 < x2) {
        cx = x1-10; cw = x2 - x1+20;
    } else {
        cx = x2-10; cw = x1 - x2+20;
    }
    if (y1 < y2) {
        cy = y1-10; ch = y2 - y1+20;
    } else {
        cy = y2-10; ch = y1 - y2+20;
    }        
    graphics.debug_clear = [cx, cy, cw, ch];
}


/** Creates a bunch of canvases for each required z index
* 
* @return {Canvas[]} Array of canvases, ordered by their z index
* 
* @see create_layer
* @cat Graphics
* @name graphics.create_object_layers
* @function
* @version 0.1
*/     
graphics.create_object_layers = function() {
    object_layers = [];
    for (var index = 0; index <= game.level.height + 1; index++) {
        layer = graphics.create_layer({zIndex: index + 1})
        object_layers.push(layer);
    }
    return object_layers;        
}

