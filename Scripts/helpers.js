/** 
 * @namespace Holds mainly functions dealing with coordinates and other simple arithmetics
 */
var helpers = {}

/** Converts coordinates and a side to a wall index. 
* 
* @example 
* tileIndex = game.coords_to_wall_index(2,4,1);
* 
* @requires Game must be initialised with a level (ie. game.width must be set)
* 
* @param {Number} column
* @param {Number} row
* @param {Number} side
* @returns {Number} wallIndex as a number
* 
* @see wall_index_to_coords Reverse process
* @cat Helpers
* @name helpers.coords_to_wall_index
* @function
* @version 0.1
*/
helpers.coords_to_wall_index = function(column, row, side) {
    x = Math.floor(column / 2) * 3 + side;
    y = row;
    return x + game.level.width * y * 3;
}


/** Returns the distance between two tiles (shortest path ignoring walls and unpassable tiles)
* 
* @param {Number} sx Source column
* @param {Number} sy Source row
* @param {Number} tx Target column
* @param {Number} ty Target row
* @returns {Number} Distance in tiles
* 
* @cat Helpers
* @name helpers.distance
* @function
* @version 0.1
*/
helpers.distance = function(sx, sy, tx, ty) {
    var dx = Math.abs(sx - tx);
    var dy = Math.abs(sy - ty);
    if (dy > dx) dy = dx + (dy - dx) / 2
        
    var d = Math.max(dx, dy);
    return d;
}

/** Returns an array of adjacent tiles
* 
* @param {Number} column
* @param {Number} row
* @returns {Coordinates[]} 
* 
* @cat Helpers
* @name helpers.get_adjacent
* @function
* @version 0.1
*/
helpers.get_adjacent = function(column, row) {
    var adjacent = [
        {column: column-1, row: row-1},
        {column: column,   row: row-2},
        {column: column+1, row: row-1},
        {column: column+1, row: row+1},
        {column: column,   row: row+2},
        {column: column-1, row: row+1}
    ];
    
    return adjacent;
}
/** Converts coordinates to pixels
* 
* @example 
* tileIndex = game.coords_to_wall_index(2,4,1);
* 
* @requires Game must be initialised with a theme (ie. game.theme.tile_height must be set)
* @param {Number} column
* @param {Number} row
* @returns {object} Object containing x and y coordinates
* 
* @cat Helpers
* @name helpers.coords_to_px
* @function
* @version 0.1
*/
helpers.coords_to_px = function(column, row) {
    var dest_x = column * .75 * game.theme.floor_width;
    var dest_y = row * game.theme.floor_height * .5  - (game.theme.tile_height - game.theme.floor_height);
    return {x: dest_x, y: dest_y};
}


/** Will translate tile coordinates along a certain direction and yield new coordinates
* 
* @param {Number} column Column of origin
* @param {Number} row Row of origin
* @param {Number} direction Direction to move to between 0 and 5, clockwise from 0 = top left.
* 
* @cat Helpers
* @name helpers.translate
* @function
* @version 0.1
*/
helpers.translate = function(column, row, direction) {
    var multi_x = [1, 0, -1, -1, 0, 1];
    var multi_y = [1, 2, 1, -1, -2, -1];      
    return {column: column - multi_x[direction], row: row - multi_y[direction]}
}


/** Converts a tile index to coordinates. 
* 
* @example 
* result = game.tile_index_to_coords(17);
* console.log(result.column, result.row);
* 
* @requires Game must be initialised with a level (ie. game.level.height must be set)
* 
* @param {Number} tileIndex Index of a tile, as used e.g. in level.tiles
* @returns {Object} Result will have a column and a row attribute
* 
* @see coords_to_tile_index Reverse process
* @cat Helpers
* @name helpers.wall_index_to_coords
* @function
* @version 0.1
*/
helpers.wall_index_to_coords = function(wall_index) {
    var x = wall_index % (game.level.width * 3);
    var row = (wall_index - x) / (game.level.width * 3);
    var column = Math.floor(x / 3) * 2;
    if (row % 2 == 1) column++;
    var side = x % 3;

    return {column: column, row: row, side: side}
}

/** Converts coordinates to a tile index. 
* 
* @example 
* tileIndex = game.coords_to_tile_index(2,4);
* 
* @requires Game must be initialised with a level (ie. game.height must be set)
* 
* @param {Number} column
* @param {Number} row
* @returns {Number} tileIndex as a number
* 
* @see coords_to_tile_index Reverse process
* @cat Helpers
* @name helpers.coords_to_tile_index
* @function
* @version 0.1
*/
helpers.coords_to_tile_index = function(column, row) {
    return (column+1) * (game.level.height+2) + row;
}



/** Converts a tile index to coordinates. 
* 
* @example 
* result = game.tile_index_to_coords(17);
* console.log(result.column, result.row);
* 
* @requires Game must be initialised with a level (ie. game.height must be set)
* 
* @param {Number} tileIndex Index of a tile, as used e.g. in level.tiles
* @returns {Object} Result will have a column and a row attribute
* 
* @see coords_to_tile_index Reverse process
* @cat Helpers
* @name helpers.tile_index_to_coords
* @function
* @version 0.1
*/
helpers.tile_index_to_coords = function(tileIndex) {
    var row = tileIndex % (game.level.height+2);
    var column = (tileIndex - row) / (game.level.height+2) - 1;
    return {column: column, row: row};
}

