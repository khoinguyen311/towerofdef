var SCORE = 0;
var live = 10;
var money = 20;


var spamEnemy = {
    createEnemy : function(enemyId,wayPoints){
        switch (enemyId){
            case 1: return new AirCraft(wayPoints);

        }
    }
}