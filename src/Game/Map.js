var MapMenuLayer = cc.Layer.extend({

    ctor : function(){
        cc.Layer.prototype.ctor.call(this);
        var size = cc.winSize;
        var background = new cc.Sprite(res.BackGround_png);
        var menuMapItem1 = new cc.MenuItemFont("Map 1", scenceMap1,this);
        var menuMapItem2 = new cc.MenuItemFont("Map 2", scenceMap2, this);

        background.setPosition(size.width/2,size.height/2);
        this.addChild(background);

        menuMapItem1.setPosition(240,160);
        menuMapItem2.setPosition(720,160);

        var menuMap = new cc.Menu(menuMapItem1,menuMapItem2);
        menuMap.setPosition(0,0);

        this.addChild(menuMap);

        return true;
    },

});
var scenceMap1 = function () {
    cc.director.runScene(new Map1_1());
}
var scenceMap2 = function () {
    cc.director.runScene(new Map2_2());
}
var MapMenu = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MapMenuLayer();
        this.addChild(layer);
    }
});