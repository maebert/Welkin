/* The map is organised into columns and rows. 
   Each tile can be addressed by x and y coordinate.
   The x-coordinate is the column, the y coordinate the row.
   Even y-coordinates are for even columns, odd y-coordinates for odd rows.
   Hence not all x/y coordinates exist!
   
   Rules: Going down increases y by 2, going right down both coordinates by 1.
        
    ____        ____
   /    \      /    \
  / 0/0  \____/ 2/0  \
  \      /    \      /
   \____/ 1/1  \____/
   /    \      /    \
  / 0/2  \____/ 2/2  \
  \      /    \      /
   \____/ 1/3  \____/
        \      /
         \____/
 
*/

var story = {}
story.current = 0;

story.next = function() {
    if (story.current < dialogue[game.level.story].length -1) {
        story.current++;
        $("#story_holder").html(dialogue[game.level.story][story.current]['text'])
    } else {
        menu.hide(game.start_turn);
    }
}


/**
 * @namespace Holds the core game mechanics.
 */
var game = {}

/** Resets the game
*  
* @cat Mechanics
* @name game.reset
* @function
* @version 0.1
*/
game.reset = function() {
    game.player.reset();
    for (m in game.monsters) {
        game.monsters[m].reset();
    }
}

/** Creates a dynamic object.
* 
* @param {Object} template A level.objects template, must contain a sprite string that points to the theme object.
* 
* @cat Core
* @name game.Object
* @class
* @version 0.1
*/
game.Object = function(template) {
    var defaults = {
        x: 0,
        y: 0
    }
    // create a new object by first copying everything from the theme template,
    // then copy/overwrite with level template, then with options passed to constructor
    $.extend(this, game.theme.objects[template.sprite], template);

    this.origin = {x: this.x, y: this.y};

    // create div
    var obj = document.createElement('div');
    var bgpos = graphics.get_tile_position(this.tile);
    var dest = helpers.coords_to_px(this.x, this.y)
    obj.style.backgroundImage = "url("+game.theme.tileset.src+")";
    $(obj).addClass("object");
    obj.style.width = game.theme.tile_width+"px";
    obj.style.height = game.theme.tile_height+"px";
    obj.style.zIndex = this.y + 1;
    obj.style.left = dest.x + "px";
    obj.style.top = dest.y + "px";
    obj.style.backgroundPosition = -bgpos.x + "px -"+bgpos.y+"px";
    document.getElementById("container").appendChild(obj);

    this.div = obj;    

    /** Moves the object back to it's starting position
    * 
    * @cat Mechanics
    * @name game.Object.reset
    * @function
    * @version 0.1.1
    */   
    this.reset = function() {
        this.move_to(this.origin.x, this.origin.y);
    }

    /** Moves the object one tile to a given direction
    * 
    * @param {Number} direction Direction between 0 and 5
    * @param {Function} callback Function to be called after animation ends
    * 
    * @cat Mechanics
    * @name game.Object.move
    * @function
    * @version 0.1.1
    */    
    this.move = function(direction, callback) {

        var dest = helpers.translate(this.x, this.y, direction);
        this.move_to(dest.column, dest.row, callback);
    }

    /** Moves the object one to a given position
    * 
    * @param {Number} column Column to move to
    * @param {Number} row Row to move to
    * @param {Function} callback Function to be called after animation ends
    * 
    * @cat Mechanics
    * @name game.Object.move_to
    * @function
    * @version 0.1.1
    */
    this.move_to = function(column, row, callback) {
        
        // if moving down, bring us already forward one z layer!
        var downwards = (row > this.y);
        if (downwards) this.div.style.zIndex = row + 1;
        var dest = helpers.coords_to_px(column, row)
        this.x = column;
        this.y = row;
        var that = this;
        $(this.div).animate({
            top: dest.y,
            left: dest.x,
            }, 1000, function() {
                if (that.move_anim_steps > 0) $(that.div).destroy(); 
                // if moving up, change z layer now
                if (!downwards) that.div.style.zIndex = row + 1;

                if (callback) callback();        
        });
        
        // Animate the move?
        if (this.move_anim_steps > 0) $(this.div).sprite({fps: 8, no_of_frames: this.move_anim_steps});   
    
    }
    
    /** Teleports the object
    * 
    * @param {Number} column Column to move to
    * @param {Number} row Row to move to
    * 
    * @cat Mechanics
    * @name game.Object.teleport
    * @function
    * @version 0.2
    */
    this.teleport = function(column, row) {
        var dest = helpers.coords_to_px(column, row)
        this.x = column;
        this.y = row;
        this.div.style.zIndex = row + 1;
        this.div.style.top = dest.y + "px";
        this.div.style.left = dest.x + "px";
    }


    
}

/** Ends the level and loads the next one.
* 
* @cat Mechanics
* @name game.start_turn
* @function
* @version 0.1
*/
game.finish_level = function() {
    menu.show_level()
}

game.next_level = function() {
    if (game.level.hasOwnProperty("nextLevel")) {
        game.destroy();
        loaders.init(levels[game.level.nextLevel], game.start_level);
    } else {
        game.reset()
        game.start_level();
    }
}

/** You got killed. Way to go.
* 
* @cat Mechanics
* @name game.die
* @function
* @version 0.1
*/
game.die = function() {
    menu.show_dead()
}


/** Check's if there's any cinematics, otherwise start turn right away
* 
* @cat Mechanics
* @name game.start_level
* @function
* @version 0.2
*/
game.start_level = function() {
    if (game.level.hasOwnProperty('story')) {
        story.current = 0;
        $("#story_holder").html(dialogue[game.level.story][story.current]['text'])
        menu.show_dialogue()
    } else {
        game.start_turn();
    }
}

/** Starts the player's turn by checking if he won or otherwise highlighting moves
* 
* @cat Mechanics
* @name game.start_turn
* @function
* @version 0.1
*/
game.start_turn = function() {
    $(game.iPane).unbind();
    // Check if we win?
    
    var playerTile = helpers.coords_to_tile_index(game.player.x, game.player.y);
    if (game.level.tiles[playerTile].function == 2) { // we win!
        game.finish_level();
    }    
    graphics.clear_highlight();
    graphics.highlight_moves();
    $(game.iPane).bind('click', function(event, info){
        // where does he want to go?
        var field = ui.detect_field(event.layerX, event.layerY);
        if (field.column == game.player.x && field.row == game.player.y) { // skip turn
            // Stop the clicking!
            $(game.iPane).unbind();
            graphics.clear_highlight()
            game.end_move();
        } else {
            var r = ui.detect_direction(game.player.x, game.player.y, event.layerX, event.layerY);
            var target = helpers.translate(game.player.x, game.player.y, r.direction)
            // check whether this is valid
            if (game.is_valid_move(target.column, target.row)) {
                // Stop the clicking!
                $(game.iPane).unbind();
                graphics.clear_highlight()
                game.player.move(r.direction, game.end_move);
            }

        }
    }); 

}

/** Called when the move animation finishes. It's the baddies turn now!
* 
* @cat Mechanics
* @name game.end_move
* @function
* @version 0.1
*/
game.end_move = function () {

    // First, check if the player should be teleported
    var tileIndex = helpers.coords_to_tile_index(game.player.x, game.player.y);
    if (game.level.tiles[tileIndex].function == 3) {
        game.teleport_object(game.player, game.start_monster_turn)
    } else {
        game.start_monster_turn();
    }

      
}

game.start_monster_turn = function() {
    for (m in game.monsters) {
        if (!game.monsters[m].disabled) {
            game.monsters[m].moves_left = game.monsters[m].moves;
        } else {
            game.monsters[m].moves_left = 0;
        }
    }
    game.move_monster(0, game.start_turn); 
}

game.teleport_object = function(object, callback) {
    var target = {}
    // figure out where to teleport to
    for (tileIndex in game.level.tiles) {
        if (game.level.tiles[tileIndex].function == 3 && helpers.coords_to_tile_index(object.x, object.y) != tileIndex) {
            target = helpers.tile_index_to_coords(tileIndex);
        }
    }
    $(object.div).addClass("warp");
    setTimeout(function() {object.teleport(target.column, target.row);}, 500);
    setTimeout(function() {$(object.div).removeClass("warp"); if (callback) callback()}, 1000);
}

/** Will delete all DOM objects created by the game and reset the game to where a level can be loaded.
* 
* @cat Core
* @name game.destroy
* @function
* @version 0.1
*/
game.destroy = function () {
    // empty the DOM container    
    $("#container *").remove();
//    game.level = {}
    game.player = {}
//    game.theme.tileset = "";
//    game.theme = {}
    game.objects = []
    game.monsters = [];
}

/** Will reload the current level from scratch
* 
* @cat Core
* @name game.destroy
* @function
* @version 0.1
*/
game.reload = function () {
    var level = game.level;
    game.destroy();
    loaders.init(level);
    graphics.draw_level();
}

/** Executes each of the monster's moves.
* 
* @param {Monster} monster object from game.monsters
* @param {Function} callback Will be called after the monster's last move is completed.
* @cat Mechanics
* @name game.move_monster
* @function
* @version 0.1
*/
game.move_monster = function (monsterIndex, callback) {        
    
    // are we out of monsters to move?
    if (monsterIndex < game.monsters.length) {  
        monster = game.monsters[monsterIndex];
        if (monster.moves_left-- > 0) {
            // no - move it!
            direction = game.pick_monster_move(monster);
            if (direction == -1) { // Don't know where to move...
                // Make a cute animation!
                graphics.anim(monster.x, monster.y, "question");
                monster.moves_left = 0;
                game.move_monster(parseInt(monsterIndex)+1, callback)
            } else { // ah, there we go!
                var target = helpers.translate(monster.x, monster.y, direction);
                if (target.column == game.player.x && target.row == game.player.y) {
                    monster.move(direction, game.die);
                } else {
                    // move monster, callback to check for teleportation, with a callback to move next monster
                    monster.move(direction, function () {
                        game.check_teleport(monster, function(){game.move_monster(monsterIndex, callback)});
                    });
                }
                
            }
        } else {
            // yeah - pick the next index and start over
            game.move_monster(parseInt(monsterIndex)+1, callback)
        }

    } else {
    // no monsters left, call home.
        callback();
    }
}

game.check_teleport = function(monster, callback) {
    var tileIndex = helpers.coords_to_tile_index(monster.x, monster.y);
    if (game.level.tiles[tileIndex].function == 3) {
        game.teleport_object(monster, function() {
            if (monster.x == game.player.x && monster.y == game.player.y) {
                game.die();
            } else {
                callback();
            }
        
        });
    } else {
        callback();
    }
}

/** Contains the monster's "AI"...
* 
* @param {Monster} Monster object from game.monsters
* @return {Number} Direction to move, -1 if no move
* @cat Mechanics
* @name game.pick_monster_move
* @function
* @version 0.1
*/
game.pick_monster_move = function(monster) {
    // Step 1: get possible moves
    var adj = helpers.get_adjacent(monster.x, monster.y);
    // Check which one brings us closest
    var distances = []
    var smallest_d = 9999;
    for (direction in adj) {
        var d = helpers.distance(adj[direction].column, adj[direction].row, game.player.x, game.player.y)
        if (d < smallest_d) smallest_d = d;
        distances.push(d);
    }
    var closest_adj = []
    for (direction in distances) {
        if (distances[direction] == smallest_d && game.is_valid_move(adj[direction].column, adj[direction].row, {column: monster.x, row: monster.y})) {
                closest_adj.push(direction);                
        }
    }
    
    
    // Awesome. Now we got all possible moves that bring us closer to the player.
    // But what if we're not sure yet? Going down!
    if (closest_adj.length == 0) {
        return -1; // no move found!
    } else if (closest_adj.length == 1) {
        return closest_adj[0]
    } else if (closest_adj.length == 2) {
        var preference = [4, 3, 5, 0, 2, 1];
        /** @todo why do I have to use parseInt here?? */
        if (preference.indexOf(parseInt(closest_adj[0])) < preference.indexOf(parseInt(closest_adj[1]))) 
            return closest_adj[0]
        else return closest_adj[1]
    }

}

/** Checks whether moving to a certain place is possible for the player or another object.
* It does so by checking whether the target is adjacent to the origin, a passable tile and not blocked by a wall.
* 
* @param {Number} column Column to move to
* @param {Number} row Row to move to.
* @param origin (Optional) If no origin is given, the player's position will be used instead
* @param {Number} origin.column Column from which to move
* @param {Number} origin.row Row from which to move    
* 
* @cat Mechanics
* @name game.is_valid_move
* @function
* @version 0.1
*/    
game.is_valid_move = function(column, row, origin) {
    var defaults = {
        column: game.player.x,
        row: game.player.y
    };
    var origin = $.extend({}, defaults, origin);

    // step 1: check if tile is passable
    var tileIndex = helpers.coords_to_tile_index(column, row);
    var passable = (game.level.tiles.hasOwnProperty(tileIndex) && game.level.tiles[tileIndex].function > 0);
    // make sure there is no monster!
    for (m in game.monsters) {
        if (game.monsters[m].x == column && game.monsters[m].y == row) passable = false;
    }    
    // step 2: check if adjacent to ours
    var adjacent = (Math.abs(origin.column - column) <= 1 && Math.abs(origin.row - row) <= 2);
    // step 3: check if a wall blocks our way
    var blocked = false;
    var wallIndex = -1;
    var direction = -1;
    if (row < origin.row) { // direction is up -> wallIndex relative to player field
        direction = 1 + (column - origin.column);
        wallIndex = helpers.coords_to_wall_index(origin.column, origin.row, direction)            
    } else { // direction is down -> wallIndex relative to target field
        direction = 4 + (origin.column - column);
        if (direction == 3) {
            wallIndex = helpers.coords_to_wall_index(origin.column+1, origin.row+1, 0)
        } else if (direction == 5) {
            wallIndex = helpers.coords_to_wall_index(origin.column-1, origin.row+1, 2)
        } else if (direction == 4) {
            wallIndex = helpers.coords_to_wall_index(origin.column,   origin.row+2, 1)
        }
    }
    if (game.level.walls.indexOf(wallIndex) > -1) blocked = true;         

    return (adjacent && passable && !blocked);
}

