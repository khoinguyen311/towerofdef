
var res = {
    HelloWorld_png : "res/HelloWorld.png",
    BackGround_png : "res/BackGround/background.png",
    BackGround_play_png :"res/BackGround/play.png",
    BackGround_minimap1_png : "res/BackGround/minimap1.png",
    Map_map1_png :"res/Map/map1.png",
    Map_map2_png :"res/Map/map2.png",
    Tower1_png :"res/Tower/LightTower.png",
    Tower2_png :"res/Tower/MediumTower.png",
    Bullet_png :"res/Tower/Bullet.png",
    AirCraftcarrier_png :"res/Enemy/Mob_aircraftcarrier.png",
    layerScore : "res/ScoreLayer.json",
    layerGameover : "res/GameoverLayer.json",
    layerWinner :"res/WinnerLayer.json",
    layerSetting : "res/SettingLayer.json",
    fire_png :"res/Fire/test.png",
    fire_plist :"res/Fire/test.plist",
    main_music : "res/Sound/determination.mp3"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
