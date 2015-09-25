
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/res/res.js",
	"libs/modules/tween/tween.js",
	"libs/modules/gui/gui.js",
	"libs/modules/puremvc/puremvc.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/AutoScreenAdapter.js",
	"bin-debug/components/IconButton.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/org/xzper/app/AppConfig.js",
	"bin-debug/org/xzper/app/AppContainer.js",
	"bin-debug/org/xzper/app/IApp.js",
	"bin-debug/org/xzper/ApplicationFacade.js",
	"bin-debug/org/xzper/controller/commands/GameCommand.js",
	"bin-debug/org/xzper/controller/commands/SceneCommand.js",
	"bin-debug/org/xzper/controller/ControllerPrepCommand.js",
	"bin-debug/org/xzper/controller/ModelPrepCommand.js",
	"bin-debug/org/xzper/controller/StartupCommand.js",
	"bin-debug/org/xzper/controller/ViewPrepCommand.js",
	"bin-debug/org/xzper/model/common/Level.js",
	"bin-debug/org/xzper/model/common/CommonData.js",
	"bin-debug/org/xzper/model/GameProxy.js",
	"bin-debug/org/xzper/model/GridProxy.js",
	"bin-debug/org/xzper/model/vos/TileVO.js",
	"bin-debug/org/xzper/utils/ObjectPool.js",
	"bin-debug/org/xzper/view/ApplicationMediator.js",
	"bin-debug/org/xzper/view/EndWindowMediator.js",
	"bin-debug/org/xzper/view/GameMenuMediator.js",
	"bin-debug/org/xzper/view/GameSceneMediator.js",
	"bin-debug/org/xzper/view/GameScreenMediator.js",
	"bin-debug/org/xzper/view/panel/AboutWindow.js",
	"bin-debug/org/xzper/view/panel/EndWindow.js",
	"bin-debug/org/xzper/view/panel/GameMenuUI.js",
	"bin-debug/org/xzper/view/panel/GameScene.js",
	"bin-debug/org/xzper/view/panel/GameScreen.js",
	"bin-debug/org/xzper/view/panel/HowtoplayWindow.js",
	"bin-debug/org/xzper/view/panel/SettingWindow.js",
	"bin-debug/org/xzper/view/panel/StartScreen.js",
	"bin-debug/org/xzper/view/panel/TileUI.js",
	"bin-debug/org/xzper/view/SettingWindowMediator.js",
	"bin-debug/org/xzper/view/StartScreenMediator.js",
	"bin-debug/skin/AboutSkin.g.js",
	"bin-debug/skin/components/ButtonSkin.g.js",
	"bin-debug/skin/components/CloseButtonSkin.g.js",
	"bin-debug/skin/components/IconButtonSkin.g.js",
	"bin-debug/skin/components/MusicButonSkin.g.js",
	"bin-debug/skin/components/PauseButtonSkin.g.js",
	"bin-debug/skin/components/PlayButtonSkin.g.js",
	"bin-debug/skin/components/ProgressBarSkin.g.js",
	"bin-debug/skin/components/RetryButtonSkin.g.js",
	"bin-debug/skin/components/ReturnSkin.g.js",
	"bin-debug/skin/components/SettingButtonSkin.g.js",
	"bin-debug/skin/components/SoundButtonSkin.g.js",
	"bin-debug/skin/EndScreenSkin.g.js",
	"bin-debug/skin/GameMenuSkin.g.js",
	"bin-debug/skin/HowtoPlaySkin.g.js",
	"bin-debug/skin/LoadingUISkin.g.js",
	"bin-debug/skin/MainGameUISkin.g.js",
	"bin-debug/skin/SettingScreenSkin.g.js",
	"bin-debug/skin/StartScreenSkin.g.js",
	//----auto game_file_list end----
];

var window = {};

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 60,
		scaleMode: "showAll",
		contentWidth: 640,
		contentHeight: 960,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:10",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};