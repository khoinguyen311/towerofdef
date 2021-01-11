var Bullet = cc.Sprite.extend({
    Bullet_speed : null,
    Bullet_Direction : null,
    Bullet_Dame : null,
    enemy : null,
    ctor : function (direction,enemy) {
        cc.Sprite.prototype.ctor.call(this,res.Bullet_png);
        this.enemy = enemy;

        this.Bullet_speed = 500;
        this.Bullet_Dame = 4;
        this.scheduleUpdate();
        this.Bullet_Direction = direction;
        return true;

    },

    update : function(dt)
    {console.log(this.enemy)
        for ( var i in this.enemy.getChildren()){
            var e = this.enemy.getChildren()[i];

            if (this.getPosition().x >= cc.winSize.width ||
                this.getPosition().y >= cc.winSize.height ||
                this.getPosition().x < 0 ||
                this.getPosition().y < 0 ||
                cc.rectIntersectsRect(e.getBoundingBox(),this.getBoundingBox()) )
            {

                e.enemy_HealthSet(e.enemy_HealthGet() - this.Bullet_Dame);
                if(e.enemy_HealthGet()<=0)
                {
                    var count = 0;
                    count = this.enemy.getChildren().length;
                    var fire = new FireExplosion();
                    fire.setPosition(e.getPosition());
                    this.getParent().addChild(fire);
                    e.removeFromParent();
                    SCORE++;
                    money+=10;
                }

                this.removeFromParent();
                return;
            }
        }
        this.setPositionX(this.getPosition().x + this.Bullet_Direction.x *this.Bullet_speed*dt);
        this.setPositionY(this.getPosition().y + this.Bullet_Direction.y *this.Bullet_speed*dt)
    },


});