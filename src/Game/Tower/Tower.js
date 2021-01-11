var Tower = cc.Sprite.extend({
    _Tower_attackDamge: null,
    _Tower_attackRange: null,
    _Tower_isPlaced: false,
    _Tower_angle: null,
    timeCount : 0,
    Bullet_location : null,
    _nodeEnemyContainer: null,
    ctor: function (fileName, listEnemy)
    {
        cc.Sprite.prototype.ctor.call(this, fileName);
        this._nodeEnemyContainer = listEnemy;
        this._Tower_attackDamge = 70;
        this._Tower_attackRange = 200;
        this._Tower_isPlaced = false;
        this._Tower_angle = 0;
        this.setScale(1);
        // this.setPosition(130, 50);
        this.scheduleUpdate();
        return true;
    },
    checkEnemy: function () {
        for (var i in this._nodeEnemyContainer.getChildren()) {

            var e = this._nodeEnemyContainer.getChildren()[i];
            var distance = cc.pDistance(e.getPosition(), this.getPosition());

            if (distance <= this._Tower_attackRange) {

                return e;
            }
        }
        return null;
    },
    
    update: function (dt)
    {
        if(this.timeCount <= 0)
        {
            var enemy_target = this.checkEnemy();
            if (enemy_target)
            {
                var angle = cc.radiansToDegrees(cc.pToAngle( cc.pSub(enemy_target.getPosition(), this.getPosition()) ));
                this.setRotation(this.getRotation() + ((90-angle) - this.getRotation()) * 50 * dt);
                var Direction = cc.pSub(enemy_target.getPosition(),this.getPosition());
                var bulletDirection = cc.pNormalize(Direction);
                var bullet = new Bullet(bulletDirection,this._nodeEnemyContainer);
                bullet.setPosition(this.getPosition());
                this.getParent().addChild(bullet);
                this.timeCount = 0.25;
            }
        }
        else
        {
            this.timeCount -= dt;
        }
    }
});