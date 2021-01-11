
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        cc.Layer.prototype.ctor.call(this);

        var background = new cc.Sprite(res.BackGround_png);
        var menuItem1 = new cc.MenuItemImage (res.BackGround_play_png,res.BackGround_play_png,play);
        var menu = new cc.Menu(menuItem1);
        background.setPosition(this.width/2,this.height/2);
        menu.setPosition(this.width/2,this.height/2);
        this.addChild(background, 0);
        this.addChild(menu);
        return true;
    },

});
var play = function() {
    cc.director.runScene(new MapMenu());
}
var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

