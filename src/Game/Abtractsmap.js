var AbstractsmapLayer = cc.Layer.extend({

    sprite:null,
    timeDelay : 0.5,
    timeCountdown : null,

    selectTower1 : null,
    selectTower2 : null,
    isSelectTower : false,
    nodeEnemyContainer : null,

    tower_shop : null,
    tower_shop2 : null,
    _wayPoints : [],
    _towerPoints : [],
    _waves :[],
    _towerPlaced : [],
    _enemyNumLeft : 0,
    _groupWays : 0,
    _enemyIndex : 0,

        ctor:function (image, wayPoints, turretPoints, waves)
    {
        cc.Layer.prototype.ctor.call(this);
        var size = cc.winSize;
        this._wayPoints = wayPoints;
        this._towerPoints = turretPoints;
        this._waves = waves;
        this._towerPlaced = [];
        for(var i in this._towerPoints){
            this._towerPlaced.push(false);
        }
        var imageBackground = new cc.Sprite(image);
        imageBackground.setPosition(size.width/2,size.height/2);
        this.addChild(imageBackground);
        var scorelb = ccs.load(res.layerScore);
        this.addChild(scorelb.node);
        scorelb.node.getChildByName("buttonSetting").addTouchEventListener(function (sender,type)
        {
            switch (type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    var layerSetting = ccs.load(res.layerSetting).node;
                    this.addChild(layerSetting);
                    layerSetting.getChildByName("ResumeButton").addTouchEventListener(function (sender,type)
                        {
                            switch (type)
                            {
                                case ccui.Widget.TOUCH_ENDED:
                                    cc.director.resume();
                                    layerSetting.removeFromParent();
                                    break;
                            }
                        }
                        ,this);
                    layerSetting.getChildByName("BackButton").addTouchEventListener(function (sender,type)
                        {
                            switch (type)
                            {
                                case ccui.Widget.TOUCH_ENDED:
                                    cc.director.runScene(new HelloWorldScene());
                                    live = 10;
                                    SCORE = 0;
                                    money = 20;
                                    cc.director.resume();
                                    break;
                            }
                        }
                        ,this);
                    break;
            }cc.director.pause();
        },this);
        this.nodeEnemyContainer = new cc.Node();
        this.nodeEnemyContainer.setPosition(0,0);
        this.addChild(this.nodeEnemyContainer);
        this._enemyNumLeft = this._waves[this._groupWays][this._enemyIndex].soluong;     //number
        this.timeCountdown = this.timeDelay;
        this.selectTower2 = new cc.Sprite(res.Tower2_png);
        this.tower_shop = new cc.Sprite(res.Tower1_png);
        this.tower_shop2 = new cc.Sprite(res.Tower2_png);
        this.addChild(this.tower_shop);
        this.addChild(this.tower_shop2);
        this.tower_shop.setPosition(130,50);
        this.tower_shop2.setPosition(80,50);
        cc.audioEngine.playMusic(res.main_music, false);
        this.scheduleUpdate();
        //
        // cc.eventManager.addListener({
        //     event: cc.EventListener.TOUCH_ONE_BY_ONE,
        //     onTouchBegan : function (touch,event)
        //     {
        //         this._onTouchBegan(touch,event);
        //     }.bind(this),
        // },this);
        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseDown : function (event)
            {
                this._onMouseDown(event);
            }.bind(this),
            onMouseUp : function (event)
            {
                this._onMouseUp(event);
            }.bind(this),
            onMouseMove : function (event)
            {
                this._onMouseMove(event);
            }.bind(this),
        },this);

        return true;
    },
    _onMouseDown : function (event)
    {
        if (cc.rectContainsPoint(this.tower_shop.getBoundingBox(),event.getLocation())
            && money >= 10 )
        {
            this.selectTower1 = new cc.Sprite(res.Tower1_png);
            this.selectTower1.setPosition(event.getLocation());
            this.addChild(this.selectTower1);
            this.selectTower1.setOpacity(125);
            this.isSelectTower = true;
            return;
        }

    },
    _onMouseMove : function (event)
    {

        if(this.selectTower1)
        {
            this.selectTower1.setPosition(event.getLocation());

        }
    },
    _onMouseUp : function (event)
    {
        if (this.isSelectTower == true)
        {
            for ( var i in this._towerPoints)
            {
                if(!this._towerPlaced[i]  && cc.rectContainsPoint(this.selectTower1.getBoundingBox(), this._towerPoints[i]))
                {
                    this._towerPlaced[i] = true;
                    var tower = new Tower(res.Tower1_png,this.nodeEnemyContainer);
                    tower.setPosition(this._towerPoints[i]);
                    this.addChild(tower);
                }
            }
            money -= 10;
            this.removeChild(this.selectTower1);
            this.selectTower1 = null;
            this.isSelectTower = false;
        }
    },
    checkWinner : function ()
    {
        if (this.nodeEnemyContainer.getChildren().length == 0&&
            this._enemyNumLeft == 0 &&
            live > 0)
        {
            return true;
        }
        return false;
    },
    spamEnemy : function () {
        var enemy = spamEnemy.createEnemy(this._waves[this._groupWays][this._enemyIndex].idEnemy, this._wayPoints);
        this.nodeEnemyContainer.addChild(enemy);
    },
    update: function (dt) {
        if(this.timeCountdown <= 0)
        {
               if (this._groupWays < this._waves.length)
               {
                   if( this._enemyIndex < this._waves[this._groupWays].length)
                   {
                           if(this._enemyNumLeft > 0)
                           {
                                   this.timeCountdown = this.timeDelay;
                                   this.spamEnemy();
                                   this._enemyNumLeft--;
                           }
                           else
                           {
                               this._enemyIndex++;
                               if (this._enemyIndex < this._waves[this._groupWays].length)
                               {
                                   this._enemyNumLeft = this._waves[this._groupWays][this._enemyIndex].soluong;
                               }
                           }
                   }
               }else this._groupWays++;
        }
        else
        {
            this.timeCountdown -= dt;
        }
        if(this.checkWinner())
        {
            var winnerBoard = ccs.load(res.layerWinner).node;
            this.addChild(winnerBoard);
            winnerBoard.getChildByName("ButtonNext").addTouchEventListener(function(sender, type)
            {
                switch (type)
                {
                    case ccui.Widget.TOUCH_ENDED:
                        cc.director.runScene(new Map2_2());
                        cc.director.pause();
                        break;
                }cc.director.resume();
            },this);
            winnerBoard.getChildByName("ButtonBack").addTouchEventListener(function(sender, type)
            {
                switch (type)
                {
                    case ccui.Widget.TOUCH_ENDED:
                        money = 20;
                        SCORE = 0;
                        live = 10;
                        cc.director.runScene(new HelloWorldScene());

                        break;
                }
            },this);
        }
        this.getChildByName("ScoreLayer").getChildByName("Scorelb").setString("Score : " +SCORE );
        this.getChildByName("ScoreLayer").getChildByName("Livelb").setString("Live : " +live );
        this.getChildByName("ScoreLayer").getChildByName("Moneylb").setString("Money : " +money );
        if (live == 0)
        {
            var gameover = ccs.load(res.layerGameover).node;
            this.addChild(gameover);
            gameover.getChildByName("ButtonHome").addTouchEventListener(function (sender, type) {
                switch (type){
                    case ccui.Widget.TOUCH_ENDED:
                        cc.director.runScene(new HelloWorldScene());
                        live = 10;
                        SCORE = 0;
                        money = 20;
                        cc.director.resume();
                        break;
                }
            }, this);
            cc.director.pause();
        }
    },
});
var Abstractsmap = cc.Scene.extend({
    ctor :function (image, wayPoints, turretPoints, waves) {
        this._super();
        var layer = new AbstractsmapLayer(image, wayPoints, turretPoints, waves);
        this.addChild(layer);
    }
});

