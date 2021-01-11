var Map2_2 = Abstractsmap.extend({

    ctor : function () {


        var wayPoints = [
            {x : 260, y : 580},
            {x : 260, y : 480},
            {x : 550, y : 480},
            {x : 550, y : 350},
            {x : 700, y : 350},
            {x : 700, y : 150},
            {x : 280, y : 150},
            {x : 280, y : 0},
        ];
        var  towerPoints = [
            {x : 310, y : 545},
            {x : 550, y : 545},
            {x : 500, y : 465},
            {x : 510, y : 350},
            {x : 200, y : 400},
            {x : 280, y : 290},
        ];
        var waves =
            [
                [
                    {idEnemy :1, soluong : 5},
                    {idEnemy :1, soluong : 2},
                ]
            ];

        Abstractsmap.prototype.ctor.call(this,res.Map_map2_png,wayPoints,towerPoints,waves);

    }
})