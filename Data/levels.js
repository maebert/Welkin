
var levels = {
    'blankdirt': {"name":"Blank",story:"end","width":14,"height":15,"theme":"dirt","tiles":{},"walls":[],"player":{"x":1,"y":3,"sprite":"player"},"monsters":[],"objects":{}},
    'blankdirt': {"name":"Blank",story:"end","width":14,"height":15,"theme":"dirt","tiles":{},"walls":[],"player":{"x":1,"y":3,"sprite":"player"},"monsters":[],"objects":{}},

    'test': {"name":"TEST","story":"end","width":14,"height":15,"theme":"dirt","tiles":{"55":{"tile":0,"function":1},"71":{"tile":0,"function":1},"89":{"tile":0,"function":1},"73":{"tile":0,"function":1},"91":{"tile":1,"function":1},"75":{"tile":1,"function":1},"57":{"tile":1,"function":1},"107":{"tile":0,"function":1},"109":{"tile":0,"function":1},"93":{"tile":0,"function":1},"77":{"tile":0,"function":1},"37":{"tile":0,"function":1}},"walls":[],"player":{"x":1,"y":3,"sprite":"player"},"monsters":[],"objects":{"73":{"x":3,"y":5,"tile":2,"z":0},"93":{"x":4,"y":8,"tile":6,"z":0},"89":{"x":4,"y":4,"tile":7,"z":0}}},

    "wait": {"name":"Wait1","story":"wait","width":14,"height":15,"theme":"dirt","tiles":{"55":{"tile":0,"function":1},"57":{"tile":0,"function":1},"59":{"tile":0,"function":1},"61":{"tile":0,"function":2},"71":{"tile":0,"function":1},"73":{"tile":1,"function":1},"75":{"tile":0,"function":1},"77":{"tile":0,"function":1},"79":{"tile":0,"function":1},"89":{"tile":1,"function":1},"91":{"tile":1,"function":1},"93":{"tile":3,"function":1},"95":{"tile":0,"function":1},"105":{"tile":1,"function":1},"107":{"tile":1,"function":1},"109":{"tile":1,"function":1},"111":{"tile":3,"function":1},"113":{"tile":3,"function":1},"123":{"tile":0,"function":1},"125":{"tile":1,"function":1},"127":{"tile":0,"function":1},"129":{"tile":3,"function":1}},"walls":[297,298,299,385,344,345],"player":{"x":4,"y":6,"sprite":"player"},"monsters":[{"x":2,"y":6,"sprite":"bot","moves":2}],"objects":{"59":{"x":2,"y":8,"tile":7,"z":0},"61":{"x":2,"y":10,"tile":4,"z":0},"71":{"x":3,"y":3,"tile":6,"z":0},"95":{"x":4,"y":10,"tile":6,"z":0},"123":{"x":6,"y":4,"tile":6,"z":0},"127":{"x":6,"y":8,"tile":7,"z":0}},"nextLevel":"med1"},
    "easy1": {"name":"Easy1","story":"easy1","width":14,"height":15,"theme":"dirt","tiles":{"37":{"tile":3,"function":1},"41":{"tile":3,"function":1},"55":{"tile":0,"function":1},"57":{"tile":0,"function":1},"71":{"tile":0,"function":1},"73":{"tile":3,"function":1},"75":{"tile":0,"function":1},"77":{"tile":0,"function":1},"89":{"tile":0,"function":1},"91":{"tile":0,"function":2},"93":{"tile":0,"function":1},"95":{"tile":3,"function":1},"105":{"tile":3,"function":1},"107":{"tile":0,"function":1},"109":{"tile":0,"function":1},"111":{"tile":0,"function":1},"123":{"tile":0,"function":1},"125":{"tile":0,"function":1},"127":{"tile":2,"function":0},"129":{"tile":0,"function":1},"143":{"tile":3,"function":1},"145":{"tile":0,"function":1}},"walls":[214,215,342,383,301,261],"player":{"x":1,"y":3,"sprite":"player"},"monsters":[{"x":4,"y":10,"sprite":"bot","moves":2}],"objects":{"55":{"x":2,"y":4,"tile":6,"z":0},"61":{"x":2,"y":10,"sprite":"stairs"},"75":{"x":3,"y":7,"tile":6,"z":0},"91":{"x":4,"y":6,"tile":4,"z":0},"111":{"x":5,"y":9,"tile":6,"z":0},"123":{"x":6,"y":4,"tile":7,"z":0},"143":{"x":7,"y":7,"tile":7,"z":0}},"nextLevel":"wait"},
    "easy2": {"name":"Easy2","width":14,"height":15,"best":23,"theme":"dirt","tiles":{"55":{"tile":0,"function":1},"57":{"tile":0,"function":1},"59":{"tile":0,"function":1},"61":{"tile":0,"function":1},"71":{"tile":0,"function":1},"73":{"tile":0,"function":1},"75":{"tile":3,"function":1},"77":{"tile":2,"function":0},"79":{"tile":0,"function":1},"87":{"tile":0,"function":1},"89":{"tile":0,"function":1},"91":{"tile":0,"function":1},"93":{"tile":3,"function":1},"95":{"tile":1,"function":1},"97":{"tile":1,"function":1},"103":{"tile":0,"function":1},"105":{"tile":0,"function":1},"107":{"tile":0,"function":1},"109":{"tile":1,"function":1},"111":{"tile":1,"function":1},"113":{"tile":1,"function":1},"115":{"tile":1,"function":1},"121":{"tile":3,"function":2},"123":{"tile":0,"function":1},"125":{"tile":0,"function":1},"127":{"tile":0,"function":1},"129":{"tile":1,"function":1},"131":{"tile":0,"function":1},"139":{"tile":0,"function":1},"141":{"tile":0,"function":1},"143":{"tile":2,"function":0},"145":{"tile":0,"function":1},"147":{"tile":0,"function":1},"157":{"tile":0,"function":1},"159":{"tile":0,"function":1},"161":{"tile":0,"function":1},"163":{"tile":0,"function":1}},"walls":[175,131,471,431,430,427,426,467,135,178,302,300,514,513,345,554,384,344,386,176],"player":{"x":2,"y":4,"sprite":"player"},"monsters":[{"x":5,"y":1,"sprite":"bot","moves":2}],"objects":{"75":{"x":3,"y":7,"tile":6,"z":0},"121":{"x":6,"y":2,"tile":4,"z":0},"125":{"x":6,"y":6,"tile":6,"z":0},"141":{"x":7,"y":5,"tile":6,"z":0},"161":{"x":8,"y":8,"tile":6,"z":0}}},
    "med1": {"name":"Med1","width":14,"height":15,"theme":"dirt","tiles":{"37":{"tile":0,"function":1},"39":{"tile":3,"function":1},"41":{"tile":0,"function":1},"43":{"tile":1,"function":1},"53":{"tile":3,"function":1},"55":{"tile":0,"function":1},"57":{"tile":0,"function":1},"59":{"tile":1,"function":1},"61":{"tile":1,"function":1},"63":{"tile":1,"function":1},"69":{"tile":3,"function":1},"71":{"tile":0,"function":1},"73":{"tile":0,"function":1},"75":{"tile":3,"function":1},"77":{"tile":1,"function":1},"79":{"tile":0,"function":1},"81":{"tile":3,"function":1},"87":{"tile":0,"function":1},"89":{"tile":0,"function":1},"91":{"tile":0,"function":1},"93":{"tile":0,"function":1},"95":{"tile":0,"function":1},"97":{"tile":0,"function":1},"103":{"tile":0,"function":1},"105":{"tile":3,"function":1},"107":{"tile":3,"function":1},"109":{"tile":0,"function":1},"111":{"tile":0,"function":1},"113":{"tile":2,"function":0},"115":{"tile":0,"function":1},"121":{"tile":0,"function":1},"123":{"tile":0,"function":1},"125":{"tile":0,"function":1},"127":{"tile":3,"function":1},"129":{"tile":0,"function":1},"131":{"tile":0,"function":1},"137":{"tile":3,"function":1},"139":{"tile":0,"function":1},"141":{"tile":0,"function":2},"143":{"tile":0,"function":1},"145":{"tile":0,"function":1},"147":{"tile":3,"function":1}},"walls":[300,261,216,345,258,299,385,177,466,426,431,347,214,256,219,263,220],"player":{"x":6,"y":4,"sprite":"player"},"monsters":[{"x":4,"y":8,"sprite":"bot","moves":2}],"objects":{"39":{"x":1,"y":5,"tile":6,"z":0},"53":{"x":2,"y":2,"tile":6,"z":0},"71":{"x":3,"y":3,"tile":6,"z":0},"91":{"x":4,"y":6,"tile":7,"z":0},"97":{"x":4,"y":12,"tile":6,"z":0},"127":{"x":6,"y":8,"tile":6,"z":0},"131":{"x":6,"y":12,"tile":7,"z":0},"137":{"x":7,"y":1,"tile":7,"z":0},"141":{"x":7,"y":5,"tile":4,"z":0}},"nextLevel":"twospiders"},
    "twospiders": {"name":"two1","nextLevel":"teleport","story":"two1","width":14,"height":15,"theme":"dirt","tiles":{"19":{"tile":0,"function":1},"21":{"tile":0,"function":1},"23":{"tile":0,"function":1},"25":{"tile":0,"function":1},"27":{"tile":0,"function":1},"35":{"tile":0,"function":1},"37":{"tile":0,"function":1},"39":{"tile":0,"function":1},"41":{"tile":0,"function":1},"43":{"tile":0,"function":1},"45":{"tile":0,"function":1},"53":{"tile":0,"function":1},"55":{"tile":0,"function":1},"57":{"tile":3,"function":1},"59":{"tile":0,"function":1},"61":{"tile":3,"function":1},"63":{"tile":0,"function":1},"71":{"tile":0,"function":1},"73":{"tile":0,"function":1},"75":{"tile":0,"function":1},"77":{"tile":1,"function":1},"79":{"tile":0,"function":1},"81":{"tile":0,"function":1},"89":{"tile":0,"function":1},"91":{"tile":1,"function":1},"93":{"tile":0,"function":1},"95":{"tile":1,"function":1},"97":{"tile":0,"function":1},"105":{"tile":0,"function":1},"107":{"tile":1,"function":1},"109":{"tile":1,"function":1},"111":{"tile":1,"function":1},"113":{"tile":0,"function":1},"115":{"tile":0,"function":1},"121":{"tile":1,"function":1},"123":{"tile":0,"function":1},"125":{"tile":1,"function":1},"127":{"tile":1,"function":1},"129":{"tile":0,"function":1},"131":{"tile":0,"function":1},"137":{"tile":1,"function":1},"139":{"tile":0,"function":1},"141":{"tile":0,"function":1},"143":{"tile":0,"function":1},"145":{"tile":3,"function":1},"147":{"tile":0,"function":1},"155":{"tile":1,"function":1},"157":{"tile":0,"function":1},"159":{"tile":0,"function":1},"161":{"tile":0,"function":1},"163":{"tile":0,"function":1}},"walls":[216,423,296,213,173,258,299,297,343,469,429,381,347,220,135,136,137,464,508,465,178,181,134,179],"player":{"x":1,"y":3,"sprite":"player"},"monsters":[{"x":2,"y":10,"sprite":"bot","moves":2},{"x":6,"y":4,"sprite":"bot","moves":2}],"objects":{"53":{"x":2,"y":2,"tile":7,"z":0},"55":{"x":2,"y":4,"tile":6,"z":0},"57":{"x":2,"y":6,"tile":6,"z":0},"63":{"x":2,"y":12,"tile":7,"z":0},"73":{"x":3,"y":5,"tile":6,"z":0},"113":{"x":5,"y":11,"tile":6,"z":0},"129":{"x":6,"y":10,"tile":6,"z":0},"139":{"x":7,"y":3,"tile":4,"z":0},"143":{"x":7,"y":7,"tile":6,"z":0},"155":{"x":8,"y":2,"tile":7,"z":0},"159":{"x":8,"y":6,"tile":6,"z":0}}},
    "two2" : {"name":"Blank","width":14,"height":15,story:"two2","nextLevel":"teleport1","theme":"dirt","tiles":{"69":{"tile":0,"function":1},"71":{"tile":0,"function":1},"73":{"tile":0,"function":1},"75":{"tile":0,"function":1},"77":{"tile":0,"function":1},"79":{"tile":0,"function":1},"81":{"tile":0,"function":1},"85":{"tile":0,"function":1},"87":{"tile":0,"function":1},"89":{"tile":0,"function":1},"91":{"tile":0,"function":1},"93":{"tile":0,"function":1},"95":{"tile":0,"function":1},"97":{"tile":0,"function":1},"103":{"tile":0,"function":1},"105":{"tile":3,"function":1},"107":{"tile":0,"function":1},"109":{"tile":3,"function":1},"111":{"tile":0,"function":1},"113":{"tile":0,"function":1},"115":{"tile":0,"function":1},"119":{"tile":0,"function":1},"121":{"tile":0,"function":1},"123":{"tile":0,"function":1},"125":{"tile":0,"function":1},"127":{"tile":0,"function":1},"129":{"tile":0,"function":1},"131":{"tile":0,"function":1},"137":{"tile":0,"function":1},"139":{"tile":3,"function":1},"141":{"tile":0,"function":1},"143":{"tile":0,"function":1},"145":{"tile":0,"function":1},"147":{"tile":0,"function":1},"149":{"tile":0,"function":1},"153":{"tile":0,"function":1},"155":{"tile":0,"function":1},"157":{"tile":0,"function":1},"159":{"tile":3,"function":1},"161":{"tile":0,"function":1},"163":{"tile":0,"function":2},"165":{"tile":0,"function":1},"171":{"tile":0,"function":1},"173":{"tile":0,"function":1},"175":{"tile":0,"function":1},"177":{"tile":0,"function":1},"179":{"tile":0,"function":1},"181":{"tile":0,"function":1},"183":{"tile":0,"function":1},"187":{"tile":0,"function":1},"189":{"tile":0,"function":1},"191":{"tile":0,"function":1},"193":{"tile":0,"function":1},"195":{"tile":0,"function":1},"197":{"tile":0,"function":1},"199":{"tile":0,"function":1},"205":{"tile":0,"function":1},"207":{"tile":0,"function":1},"209":{"tile":0,"function":1},"211":{"tile":0,"function":1},"213":{"tile":0,"function":1},"215":{"tile":0,"function":1},"217":{"tile":0,"function":1}},"walls":[176,133,177,301,300,385,179,136,180,264,349,266,433,432],"player":{"x":3,"y":5,"sprite":"player"},"monsters":[{"x":10,"y":4,"sprite":"bot","moves":2},{"x":8,"y":8,"sprite":"bot","moves":2}],"objects":{"163":{"x":8,"y":10,"sprite":"stairs"}}},
    "tutorial": {"name":"Tutorial","stsory":"tutorial","nextLevel":"easy1","width":10,"height":15,"theme":"dirt","tiles":{"37":{"tile":0,"function":1},"55":{"tile":0,"function":2},"57":{"tile":3,"function":1},"59":{"tile":3,"function":1},"61":{"tile":3,"function":1},"63":{"tile":3,"function":1},"81":{"tile":3,"function":1},"79":{"tile":3,"function":1},"77":{"tile":3,"function":1},"73":{"tile":0,"function":1},"75":{"tile":3,"function":1},"91":{"tile":0,"function":1},"93":{"tile":3,"function":1},"97":{"tile":3,"function":1},"95":{"tile":3,"function":1},"115":{"tile":0,"function":1},"113":{"tile":3,"function":1},"111":{"tile":3,"function":1},"109":{"tile":0,"function":1},"127":{"tile":0,"function":1},"129":{"tile":0,"function":1},"131":{"tile":0,"function":1},"149":{"tile":0,"function":1},"147":{"tile":0,"function":2},"107":{"tile":0,"function":1},"125":{"tile":0,"function":1},"141":{"tile":0,"function":1},"143":{"tile":0,"function":1},"145":{"tile":0,"function":1},"39":{"tile":2,"function":0},"41":{"tile":2,"function":0},"43":{"tile":2,"function":0},"45":{"tile":2,"function":0},"47":{"tile":2,"function":0},"29":{"tile":2,"function":0},"27":{"tile":2,"function":0},"19":{"tile":2,"function":0},"21":{"tile":2,"function":0},"23":{"tile":2,"function":0},"25":{"tile":2,"function":0},"53":{"tile":2,"function":0},"35":{"tile":2,"function":0},"51":{"tile":2,"function":0},"69":{"tile":2,"function":0},"71":{"tile":2,"function":0},"89":{"tile":2,"function":0},"87":{"tile":2,"function":0},"85":{"tile":2,"function":0},"105":{"tile":2,"function":0},"121":{"tile":2,"function":0},"103":{"tile":2,"function":0},"119":{"tile":2,"function":0},"137":{"tile":2,"function":0},"139":{"tile":2,"function":0},"123":{"tile":2,"function":0},"153":{"tile":2,"function":0},"155":{"tile":2,"function":0},"159":{"tile":2,"function":0},"157":{"tile":2,"function":0},"161":{"tile":2,"function":0},"163":{"tile":2,"function":0},"165":{"tile":2,"function":0},"167":{"tile":2,"function":0},"133":{"tile":2,"function":0},"151":{"tile":2,"function":0},"117":{"tile":2,"function":0},"99":{"tile":2,"function":0},"83":{"tile":2,"function":0},"65":{"tile":2,"function":0},"49":{"tile":2,"function":0},"31":{"tile":2,"function":0},"15":{"tile":2,"function":0},"13":{"tile":2,"function":0},"11":{"tile":2,"function":0},"9":{"tile":2,"function":0},"7":{"tile":2,"function":0},"5":{"tile":2,"function":0},"3":{"tile":2,"function":0},"1":{"tile":2,"function":0},"-1":{"tile":2,"function":0},"17":{"tile":2,"function":0},"33":{"tile":2,"function":0},"67":{"tile":2,"function":0},"101":{"tile":2,"function":0},"135":{"tile":2,"function":0},"169":{"tile":2,"function":0},"171":{"tile":2,"function":0},"187":{"tile":2,"function":0},"173":{"tile":2,"function":0},"189":{"tile":2,"function":0},"191":{"tile":2,"function":0},"177":{"tile":2,"function":0},"193":{"tile":2,"function":0},"175":{"tile":2,"function":0},"195":{"tile":2,"function":0},"179":{"tile":2,"function":0},"181":{"tile":2,"function":0},"183":{"tile":2,"function":0},"185":{"tile":2,"function":0},"199":{"tile":2,"function":0},"197":{"tile":2,"function":0},"201":{"tile":2,"function":0}},"walls":[304,184,274,185,214,275,215,247,248,277,278,309,338,339,369,397,396,340,183,212,243,272,303,332,363,424,392,454,425,426,427,367,371],"player":{"x":1,"y":3,"sprite":"player"},"monsters":[{"x":2,"y":12,"sprite":"bot","moves":2}],"objects":{"147":{"x":7,"y":11,"sprite":"stairs"}}},
    'teleport1': {"name":"Mind the Gap","width":14,"story":"teleport","nextLevel":"two2","height":15,"theme":"dirt","tiles":{"57":{"tile":0,"function":1},"59":{"tile":3,"function":1},"61":{"tile":0,"function":1},"75":{"tile":0,"function":1},"77":{"tile":3,"function":1},"79":{"tile":0,"function":1},"87":{"tile":3,"function":1},"93":{"tile":0,"function":1},"95":{"tile":1,"function":1},"97":{"tile":1,"function":1},"103":{"tile":3,"function":1},"105":{"tile":3,"function":1},"111":{"tile":3,"function":1},"113":{"tile":1,"function":1},"115":{"tile":1,"function":1},"119":{"tile":3,"function":1},"121":{"tile":1,"function":1},"123":{"tile":3,"function":1},"129":{"tile":3,"function":1},"131":{"tile":1,"function":1},"137":{"tile":1,"function":1},"139":{"tile":1,"function":3},"141":{"tile":3,"function":1},"147":{"tile":0,"function":1},"155":{"tile":1,"function":1},"157":{"tile":1,"function":1},"159":{"tile":3,"function":1},"175":{"tile":3,"function":1}},"walls":[256,257,298,299,344,343,385,386,430,431,472,473,349,305,304,263,262,217,218,176,175,131,49,50,48],"player":{"x":3,"y":7,"sprite":"player"},"monsters":[],"objects":{"61":{"x":2,"y":10,"tile":7,"z":0},"75":{"x":3,"y":7,"tile":6,"z":0},"93":{"x":4,"y":8,"tile":6,"z":0},"103":{"x":5,"y":1,"tile":4,"z":0},"113":{"x":5,"y":11,"tile":30,"z":0},"119":{"x":6,"y":0,"tile":7,"z":0},"129":{"x":6,"y":10,"tile":6,"z":0},"139":{"x":7,"y":3,"tile":30,"z":0},"175":{"x":9,"y":5,"tile":6,"z":0}},"best":5},
    'teleport2': {"name":"Déjà vu","width":14,"height":15,"best":6,"theme":"dirt","tiles":{"55":{"tile":3,"function":1},"57":{"tile":0,"function":1},"59":{"tile":0,"function":1},"61":{"tile":0,"function":1},"71":{"tile":0,"function":1},"73":{"tile":0,"function":1},"75":{"tile":0,"function":1},"77":{"tile":0,"function":1},"79":{"tile":0,"function":1},"89":{"tile":0,"function":1},"91":{"tile":3,"function":3},"93":{"tile":0,"function":1},"95":{"tile":0,"function":1},"107":{"tile":0,"function":1},"109":{"tile":0,"function":1},"111":{"tile":0,"function":1},"123":{"tile":0,"function":1},"125":{"tile":0,"function":1},"127":{"tile":3,"function":3},"129":{"tile":0,"function":1},"139":{"tile":0,"function":1},"141":{"tile":3,"function":2},"143":{"tile":0,"function":1},"145":{"tile":0,"function":1},"147":{"tile":0,"function":1},"157":{"tile":0,"function":1},"159":{"tile":0,"function":1},"161":{"tile":0,"function":1},"163":{"tile":0,"function":1}},"walls":[172,171,212,215,302,344,431,263,219,220,221,264],"player":{"x":2,"y":4,"sprite":"player"},"monsters":[{"x":7,"y":9,"sprite":"bot","moves":2}],"objects":{"91":{"x":4,"y":6,"tile":30,"z":0},"127":{"x":6,"y":8,"tile":30,"z":0},"141":{"x":7,"y":5,"tile":10,"z":0}},"nextLevel":"blank"}
}

var dialogue = {
    'tutorial': [
        {char: 'char1', text: "Wow, pre-alpha game. Bugs, missing content, sloppy graphics… Exciting!"},
        {char: 'char1', text: "Alright, picture a proper in-story introduction here. Bottom line: I want to get to the exit, spider-bots want to eat me."},
        {char: 'char1', text: "Downside: spider-bots take two moves for each move I make. Fortunately, all their &uuml;ber-destructive killer weaponry left little room for a proper AI."},
        {char: 'char1', text: "So they'll move according to a simple pattern: with each move, they try to get closer to me without any detours."},
        {char: 'char1', text: "If they have two choices that both bring them closer to me, they will prefer the lower tile (due to some quantum effect)."},
        {char: 'char1', text: "And if all tiles that would get them closer to me are blocked, they simple don't move."},
        {char: 'char1', text: "Alright, let's try that. Click on a highlighted tile to move me."}
    ],
    'easy1': [
        {char: 'char1', text: "Alright, that was a bit too easy. This time they are armed and dangerous... and not in a cage."}
    ],
    'wait': [
        {char: 'char1', text: "Did you know that I can also skip my turn by clicking on the tile where I stand? Im sure sometime this will be terribly useful."}
    ],
    'two1': [
        {char: 'char1', text: "Hey, two of them? Unfair!"}
    ],
    'teleport': [
        {char: 'char1', text: "Hm, an impassable abyss? Cunning..."}
    ],
    'two2': [
        {char: 'char1', text: "Man, these spider-bots have absolutely no sense of humor!"},
        {char: 'char1', text: "I told the last one ten different puns, hoping at least one would make it laugh."},
        {char: 'char1', text: "But no pun in ten did."},
        {char: 'char1', text: "..."}
    ],
    'end': [
        {char: 'char1', text: "Congratulations, you have survived the proof-of-concept."}
    ]
}
