var menu = {};

menu.show_screen = function(id) {
    $("#screen_fader").fadeIn();
    $(id).show('fast');
}

menu.show_dead = function() {
    menu.show_screen("#screen_dead");
}

menu.show_level = function() {
    menu.show_screen("#screen_level");
}

menu.hide = function(callback) {
    $("div.screen").hide('fast')
    $("#screen_fader").fadeOut('fast', callback)
}

menu.show_dialogue = function() {
    menu.show_screen("#screen_story");
}