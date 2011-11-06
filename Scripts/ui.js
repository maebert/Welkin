/** 
 * @namespace Holds functions in the raw processing of user input and relating pixels to coordinates
 */
var ui = {}


/** Detects the tile and side closest to some pixel coordinates (ie. of the mouse)
* 
* @example 
* result = game.detect_edge(624, 231);
* console.log(result.column, result.row, result.side);
* 
* @param {Number} x X coordinate of the main canvas in pixels
* @param {Number} y Y coordinate of the main canvas in pixels
* @returns {Object} Result will have a column, row and side attribute
* 
* @see detect_field
* @see detect_direction
* 
* @cat UI
* @name ui.detect_edge
* @function
* @version 0.1
*/
ui.detect_edge = function (x, y) {
    r = ui.detect_field(x, y);
    r = ui.detect_direction(r.column, r.row, x, y, {make_wall_index: true});

    // get the wall index for convenience
    var wx = helpers.coords_to_wall_index(r.column, r.row, r.direction);
    return {column:r.column, row:r.row, side:r.direction, wall:wx};
}
/** Detects the direction of a point in pixels from the center of a certain tile.
* Directions are indexed clockwise by a number between 0 and 5, with 0 being up-left, 1 being up and so on.
* 
* @param {Number} column Column of the reference tile
* @param {Number} row Row of the reference tile
* @param {Number} x X coordinate of the main canvas in pixels
* @param {Number} y Y coordinate of the main canvas in pixels
* @param {Object} options (Optional) May have the following attrubtes:
* * make_wall_index: if true, the direction will be between 0 and 2 and the column and row shifted accordingly (default: false) 
* @returns {Object} Result will have a column, row and direction attribute.
* 
* @cat UI
* @cat Helpers
* @name ui.detect_direction
* @function
* @version 0.1
*/
ui.detect_direction = function(column, row, x, y, options) {
    var defaults = {make_wall_index: false}
    var options = $.extend({}, defaults, options)

    var center_x = column * game.theme.floor_width * 0.75 + game.theme.floor_width / 2;
    var center_y = row * game.theme.floor_height * 0.5 + game.theme.floor_height * 0.5;
  
    var direction = Math.floor((Math.atan2(x-center_x, center_y-y) / Math.PI * 180 + 30) / 60 + 1);
    if (direction < 0) direction += 6;
    
    if (options.make_wall_index) {
        if (direction == 3) {
            direction = 0;
            column += 1;
            row += 1;
        } else if (direction == 5) {
            direction = 2;
            column -= 1;
            row += 1;
        } else if (direction == 4) {
            direction = 1;
            row += 2;
        }
    }
    return {column:column, row:row, direction:direction};
}

/** Detects the coordinates of the closest field to some pixel coordinates
* 
* @example 
* result = game.detect_field(624, 231);
* console.log(result.column, result.row);
* 
* @param {Number} x X coordinate of the main canvas in pixels
* @param {Number} y Y coordinate of the main canvas in pixels
* @returns {Object} Result will have a column and a row attribute
* 
* @see detect_edge
* @see detect_direction
* 
* @cat UI
* @name ui.detect_field
* @function
* @version 0.1
*/
ui.detect_field = function (x, y) {
    var column = Math.floor((x - game.theme.floor_width * .125) / (game.theme.floor_width * .75))
    if (column % 2 == 0) {
        var row = Math.floor(y / game.theme.floor_height) * 2;
    } else {
        var row = Math.floor((y - game.theme.floor_height / 2) / game.theme.floor_height) * 2 + 1;        
    }
    
    tileIndex = helpers.coords_to_tile_index(column, row);
    
    return {column:column, row:row, tileIndex: tileIndex};                
}