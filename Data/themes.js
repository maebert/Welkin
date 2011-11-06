var themes = {
    "lab": {
        tileset_src: "Data/Themes/lab/lab.png?d=4",
        tile_width: 100,
        tile_height: 100,
        floor_width: 100,
        floor_height: 70,
        tiles: [0, 1, 2, 3],
        tile_functions: [1,0,0, 1],
        walls: [15, 16, 17],
        wall_corners: [11, 12],
        objects: {
            "player": {
                tile: 5,
                move_anim_steps: 4
            },
            "bot": {
                tile: 20,
                move_anim_steps: 4,
                moves: 2
            },  
            "stairs": {
                tile: 10,
            }
        },
        deco: [
            {"tile":  4, "z": 0},
            {"tile":  9, "z": 0},
            {"tile": 10, "z": 0},
            {"tile": 13, "z": 0},
            {"tile": 14, "z": 0},
            {"tile": 30, "z": 0},
        ],
        anim: {
            "question": {
                tile: 25,
                steps: 0,
                duration: 1000,
                class: "fadeInOutBottom"
            }
        
        }
    }
}
