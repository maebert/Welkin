var all_scripts = [
    'Lib/spritely.js', 
    'Data/levels.js',
    'Scripts/game.js', 
    'Scripts/graphics.js', 
    'Scripts/ui.js', 
    'Scripts/loaders.js', 
    'Scripts/helpers.js',
    'Scripts/menu.js',
    'Data/themes.js'
];

function load_scripts(scripts, callback) {
    var to_load = scripts.length;
    for (i in all_scripts) {
        $.getScript(scripts[i], function () {
            if (--to_load == 0) callback();
        })
    }
}

function init() {
    load_scripts(all_scripts, init_game)
}

function init_game() {
    loaders.init(levels.tutorial, game.start_level);
}