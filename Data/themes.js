var themes = {
    "lab": {
        tileset_src: "Data/Themes/lab/lab.png?d=5",
        tile_width: 100,
        tile_height: 100,
        floor_width: 100,
        floor_height: 70,
        padding_bottom: 0,
        padding_left: 0,
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
    },
    "dirt": {
        tileset_src: "Data/Themes/dirt.png",
        tile_width: 120,
        tile_height: 140,
        floor_width: 100,
        floor_height: 70,
        padding_bottom: 40,
        padding_left: 10,
        tiles: [0, 1, 2, 3],
        tile_functions: [1, 1, 0, 1],
        walls: [12, 13, 14],
        wall_corners: [15, 16],
        objects: {
            "player": {
                tile: 18,
                move_anim_steps: 4
            },
            "bot": {
                tile: 24,
                move_anim_steps: 4,
                moves: 2
            },  
            "stairs": {
                tile: 10,
            }
        },
        deco: [
            {"tile":  4, "z": 0},
            {"tile":  6, "z": 0},
            {"tile":  7, "z": 0},
            {"tile":  8, "z": 0},
            {"tile":  9, "z": 0},
            {"tile":  10, "z": 0},
            {"tile": 30, "z": 0},
        ],
        anim: {
            "question": {
                tile: 32,
                steps: 0,
                duration: 1000,
                class: "fadeInOutBottom"
            }
        
        }
    }

}
