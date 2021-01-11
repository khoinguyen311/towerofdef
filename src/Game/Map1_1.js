var Map1_1 = Abstractsmap.extend({

    ctor : function () {


        var wayPoints = [
            {x : 360,y : 560},
            {x : 360, y : 490},
            {x : 660, y : 491},
            {x : 661, y : 340},
            {x : 310, y : 340},
            {x : 310, y : 195},
            {x : 600, y : 195},
            {x : 600, y : 35},
            {x : 650, y : -125}
        ];
        var  towerPoints = [
            {x : 400, y : 533},
            {x : 470, y : 533},
            {x : 650, y : 523},
            {x : 620, y : 453},

        ];
        var waves =
            [
                [
                    {idEnemy :1, soluong : 5},
                    {idEnemy :1, soluong : 2},
                ]
            ];

        Abstractsmap.prototype.ctor.call(this,res.Map_map1_png,wayPoints,towerPoints,waves);

    }
})