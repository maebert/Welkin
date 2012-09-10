/** 
 * @namespace Holds functions for loading game resources and creating DOM stuff
 */
var loaders = {}


/** Preloads a tileset and computes some statistics about it
* 
* @example game.load_theme(levels[1].theme)
* @desc loads the theme for the first level
* 
* @param {String} theme String identifier of the theme, as defined in themes.js
* @returns {Theme} Enriched theme object
* 
* @cat Loaders
* @name loaders.load_theme
* @function
* @version 0.1
*/
loaders.load_theme = function (theme, callback) {
    theme = themes[theme];
    var t = new Image();
    theme.tileset = t;
    theme.tileset.onload = callback;
    theme.tileset.src = theme.tileset_src;
    //    theme.tileset.onload = function () {
//        console.log("loaded")
//    };
    return theme;
}

/** Initialises a level and creates all objects necessary for drawing stuff.
* Should be called pretty early as most functions in game depend on this.
* 
* @param {level} level Level from levels.js
* @cat Loaders
* @name loaders.init
* @function
* @version 0.1
*/
loaders.init = function (level, callback) {
    // width is the number of columns, height of rows.
    game.level = level;
    // preload images
    game.theme = loaders.load_theme(level.theme, function() { // wait for theme to load
        // compute width and height of map in px
        graphics.layer_width = game.theme.tile_width * .75 * level.width + game.theme.floor_width * .25
        graphics.layer_height = (level.height + 1) / 2 * game.theme.floor_height;
    
        // create layers
        graphics.layers = {}
        graphics.layers.game          = graphics.create_layer({id: "game_layer"});
        graphics.ctx                  = graphics.layers.game.getContext("2d");
        graphics.layers.floor         = graphics.create_layer({zIndex: -2, id: "floor"});
        graphics.layers.object_layers = graphics.create_object_layers();
        graphics.layers.highlight     = graphics.create_layer({zIndex: -1, id: "highlight"});
        game.iPane                    = graphics.create_layer({zIndex: 99, id: "interactionPane"});

        graphics.draw_level();
        
        if (callback) callback();
    
    });
    
}

