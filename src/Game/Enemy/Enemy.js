
var Enemy = cc.Sprite.extend({
    enemy_Name :null,
    enemy_Health : null,
    enemy_Reward : null,
    enemy_Speed : null,
    enemy_Id : null,
    distanceMin : 10,
    currentPoint : 0,
    enemyNum : 10,
    wayPoints:[],
    ctor : function (fileName,wayPoints) {

        cc.Sprite.prototype.ctor.call(this, fileName);

        this.wayPoints = wayPoints;
        this.setPosition(this.wayPoints[this.currentPoint]);
        this.setScale(0.5);
        this.enemy_Health = 5;
        this.enemy_Speed = 100;
        this.timeCountdown = this.timeDelay;
        this.scheduleUpdate();

        return true;
    },

    calcDirection : function () {
        var direc = cc.pSub (this.wayPoints[this.currentPoint],this.getPosition());
        var direction  = cc.pNormalize(direc);

        return direction;
    },

    enemy_HealthSet : function(h){
        this.enemy_Health = h;
    },

    enemy_HealthGet : function () {
        return this.enemy_Health;
    },


    update : function (dt) {

        if ( this.currentPoint < this.wayPoints.length )
        {
            var delta = cc.pDistance(this.getPosition(),this.wayPoints[this.currentPoint]);
            if ( delta >= this.distanceMin )
            {
                var direc = this.calcDirection();
                this.setPosition(this.getPositionX() + direc.x * dt * this.enemy_Speed,
                                 this.getPositionY() + direc.y * dt * this.enemy_Speed );
            }
            else
            {
               this.currentPoint++;
            }
        }
        else if (this.currentPoint == this.wayPoints.length)
        {
            this.removeFromParent();
            live--;
        }
    }
})