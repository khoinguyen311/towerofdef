var FireExplosion = cc.Sprite.extend({
    fire : null,
    _keySuffix : ".png",
    ctor : function ()
    {
        cc.spriteFrameCache.addSpriteFrames(res.fire_plist, res.fire_png);

        cc.Sprite.prototype.ctor.call(this);

        var animationFrame = [];

        for ( var  i = 54 ; i< 62; i++)
        {
            var frame = cc.spriteFrameCache.getSpriteFrame(this.string(i));
            var animFrame = new cc.AnimationFrame();
            animFrame.initWithSpriteFrame(frame, 1, null);
            animationFrame.push(animFrame);
        }
        var animation  = new cc.Animation(animationFrame, 0.05);
        var animate    = new cc.Animate (animation);
       // var remove = cc.callFunc(this.removeFromParent.bind(this));
        var remove = cc.callFunc(function()
                                    {
                                        this.removeFromParent(true);

                                    }.bind(this))
        this.runAction(cc.sequence(animate,remove));
        return true;
    },

    string : function(index)
    {
        return index + this._keySuffix;
    },


})