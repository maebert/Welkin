
var editor = {
    current_tile: 0,
    current_object: "player",
    current_deco: 0,
    mode: ""
}

// OVERRIDE GAME BEHAVIOR!!
game.finish_level = function() {
    editor.set_mode("play");
}
game.die = function() {
    editor.set_mode("play");
}

editor.new = function () {
    var answer = confirm ("Oh rly?");
    if (answer) {
        game.destroy();
        loaders.init(levels.blank);
    }
}

editor.save = function() {

    // save monsters to game
    var monsters = []
    for (m in game.monsters) {
        var monster = {
            x: game.monsters[m].x,
            y: game.monsters[m].y,
            sprite: game.monsters[m].sprite,
            moves: game.monsters[m].moves
        }
        monsters.push(monster)
    }
    game.level.monsters = monsters;
    game.level.player.x = game.player.x;
    game.level.player.y = game.player.y;
    game.level.player.sprite = game.player.sprite;
    
    return JSON.stringify(game.level);
}

editor.load = function() {
    $('#levelload').hide('fast');
    var answer = confirm ("Changes be lost. Proceed?");
    if (answer) {
        var lvl = $('#level_load').val();
        game.destroy();
        loaders.init(levels[lvl], function () {});
    }
}

editor.get_level_list = function() {
    var names = [];
    for (lvl in levels) names.push(lvl);
    return names;
}



editor.show_props = function() {
    $('#level_name').val(game.level.name);
    $('#level_theme').val(game.level.theme);
    $('#level_next').val(game.level.nextLevel);
    $('#level_width').val(game.level.width);
    $('#level_height').val(game.level.height);
    $('#level_best').val(game.level.best);
    $('#levelprops').show('fast');
}

editor.save_properties = function() {
    editor.save();
    game.level.name = $('#level_name').val();
    game.level.theme = $('#level_theme').val();
    game.level.nextLevel = $('#level_next').val();
    game.level.width = parseInt($('#level_width').val());
    game.level.height = parseInt($('#level_height').val());
    game.level.best = parseInt($('#level_best').val());
    game.reload();
    $('#levelprops').hide('fast');
}

editor.save_obj_properties = function() {
    editor.edit_object.origin.x = parseInt($("#obj_x").val())
    editor.edit_object.origin.y = parseInt($("#obj_y").val())
    editor.edit_object.sprite = $("#obj_sprite").val()
    editor.edit_object.moves = parseInt($("#obj_moves").val())
    editor.edit_object.reset();
    $('#objectprops').hide('fast');
}

editor.show_function_map = function() {
        graphics.clear_highlight();
        for (t in game.level.tiles) {
            var r = helpers.tile_index_to_coords(t);
            var tile = game.level.tiles[t];
            var fstyle = [
                'rgba(255,0,0,.2)',
                'rgba(0,255,0,.2)',
                'rgba(255,220,0,.2)',
                'rgba(255,0,200,.2)'
            ];
            graphics.highlight_field({
                column: r.column,
                row: r.row,
                fillStyle: fstyle[tile.function],
                strokeStyle: "rgba(0,0,0,.2)",
                lineWidth: 2,
                clear: "none"
            
            });
        }        
}

editor.set_mode = function(mode, arg) {
    $(game.iPane).unbind();

    $(game.iPane).bind('mousemove', function(event, info){
              var r = ui.detect_field(event.layerX, event.layerY);
              $("#debug").html("X: "+r.column+" Y: "+r.row+" ("+r.tileIndex+")");
          });

    graphics.clear_highlight();
    
    $("#palette div.toggle").removeClass("active");
    $("#button_"+mode).addClass("active");

    if (mode == "play") {
        if (editor.mode != "play") {
            $("#palette_inner").hide('fast');
            document.getElementById("button_play").innerHTML = "PAUSE";
            game.start_turn();
        } else {
            game.reset();
            $("#palette div.toggle").removeClass("active");
            $("#palette_inner").show('fast');
            document.getElementById("button_play").innerHTML = "PLAY";
            editor.set_mode("floor");
        }
    } else if (mode == "wall") {
        $("#tileselect").addClass("inactive");
        $(game.iPane).bind('mousemove', function(event, info){
              r = ui.detect_edge(event.layerX, event.layerY);
              graphics.debug_draw_edge(r.column, r.row, r.side)
        });
        
        $(game.iPane).bind('click', function(event, info){
              r = ui.detect_edge(event.layerX, event.layerY);
              var idx = game.level.walls.indexOf(r.wall);
              if (idx == -1) {
                  game.level.walls.push(r.wall)              
              } else {
                  game.level.walls.splice(idx, 1);              
              }
              graphics.redraw();

        });
        
    } else if (mode == "removefloor") {
        $("#tileselect").addClass("inactive");
        $(game.iPane).bind('mousemove', function(event, info){
              var r = ui.detect_field(event.layerX, event.layerY);
              graphics.highlight_field(r)
        });
        $(game.iPane).bind('click', function(event, info){
              var r = ui.detect_field(event.layerX, event.layerY);
              delete game.level.tiles[r.tileIndex];
              graphics.clear(graphics.layers.floor)
              graphics.draw_base();
        });
    } else if (mode == "editobj") {
        $("#tileselect").addClass("inactive");
        $(game.iPane).bind('mousemove', function(event, info){
              var r = ui.detect_field(event.layerX, event.layerY);
              graphics.highlight_field(r)
        });
        $(game.iPane).bind('click', function(event, info){
              var r = ui.detect_field(event.layerX, event.layerY);
              var found = false;
              for (m in game.monsters) {
                if (r.column == game.monsters[m].x && r.row == game.monsters[m].y) {
                    editor.edit_object = game.monsters[m];
                    found = true;
                }
              }
              if (!found && r.column == game.level.player.x && r.row == game.level.player.y) {
                editor.edit_object = game.player;
                found = true;
              }
              
              if (found) {
                    $("#obj_x").val(editor.edit_object.x)
                    $("#obj_y").val(editor.edit_object.y)
                    $("#obj_sprite").val(editor.edit_object.sprite)
                    $("#obj_moves").val(editor.edit_object.moves)
                    $('#objectprops').show('fast');

              }
        });
    } else if (mode == "removeobjects") {
        $("#tileselect").addClass("inactive");
        $(game.iPane).bind('mousemove', function(event, info){
              var r = ui.detect_field(event.layerX, event.layerY);
              graphics.highlight_field(r)
        });
        $(game.iPane).bind('click', function(event, info){
              var r = ui.detect_field(event.layerX, event.layerY);
              delete game.level.objects[r.tileIndex];
              graphics.redraw()
        });
    } else if (mode == "function") {
    
    
    
        $("#tileselect").addClass("inactive");
        editor.show_function_map();

        
        $(game.iPane).bind('click', function(event, info){
            var r = ui.detect_field(event.layerX, event.layerY);
            game.level.tiles[r.tileIndex].function = (game.level.tiles[r.tileIndex].function + 1) % 4;
            editor.show_function_map();
        });
        
        
        
        
    } else if (mode == "floor") {
        $("#tileselect").removeClass("inactive");
        select_tile(editor.current_tile);
        $(game.iPane).bind('mousemove', function(event, info){
              var r = ui.detect_field(event.layerX, event.layerY);
              graphics.highlight_field(r)
        });
        $(game.iPane).bind('click', function(event, info){
              var r = ui.detect_field(event.layerX, event.layerY);
              game.level.tiles[r.tileIndex] = {tile: editor.current_tile, "function": game.theme.tile_functions[game.theme.tiles.indexOf(editor.current_tile)]};
              graphics.clear(graphics.layers.floor)
              graphics.redraw();
        });
    } else if (mode == "object") {
        $("#tileselect").removeClass("inactive");
        select_deco(editor.current_deco);
        $(game.iPane).bind('mousemove', function(event, info){
              var r = ui.detect_field(event.layerX, event.layerY);
              graphics.highlight_field(r)
        });
        $(game.iPane).bind('click', function(event, info){
              var r = ui.detect_field(event.layerX, event.layerY);
              game.level.objects[r.tileIndex] = {x: r.column, y: r.row, tile: game.theme.deco[editor.current_deco].tile, z: game.theme.deco[editor.current_deco].z}
              graphics.redraw();
        });            
    } else if (mode == "monster") {
        $("#tileselect").removeClass("inactive");
        select_object(editor.current_object);
        $(game.iPane).bind('mousemove', function(event, info){
              var r = ui.detect_field(event.layerX, event.layerY);
              graphics.highlight_field(r)
        });
        $(game.iPane).bind('click', function(event, info){
              var r = ui.detect_field(event.layerX, event.layerY);
              var monster = new game.Object($.extend({x: r.column, y: r.row}, game.theme.objects[editor.current_object]));
              game.monsters.push(monster);
        });            
    } 
    editor.mode = mode;

}

