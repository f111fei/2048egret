
module game {

	export class AppContainer extends egret.gui.UIStage{
		public startScreen:StartScreen = new StartScreen();
		public gameScreen:GameScreen = new GameScreen();

		public constructor(){
			super();
		}

        /**
         * 进入开始页面
         */
        public enterStartScreen():void{
            this.removeAllElements();
            this.addElement(this.startScreen);
        }

        /**
         * 进入游戏页面
         */
        public enterGameScreen():void{
            this.removeAllElements();
            this.addElement(this.gameScreen);
            if(!this.gameScreen.initialized)
            {
                //在第一次进入游戏页面时立即验证，保证Mediator的注册是及时的，
                //防止注册不及时导致无法接受消息的情况
                this.gameScreen.validateNow();
            }
        }

        public settingWindow:SettingWindow;
        /**
         * 显示设置界面
         */
        public showSettingWindow(type:string = "setting"):void
        {
            if(!this.settingWindow)
            {
                this.settingWindow = new SettingWindow();
            }
            this.settingWindow.setWindowType(type);
            egret.gui.PopUpManager.addPopUp(this.settingWindow,true);
            this.settingWindow.verticalCenter = -700;
            egret.Tween.get(this.settingWindow).to({verticalCenter:0} , 500 , egret.Ease.backOut);
        }

        public endWindow:EndWindow;
        /**
         * 显示结束窗口
         */
        public showEndWindow():void
        {
            if(!this.endWindow)
            {
                this.endWindow = new EndWindow();
            }
            egret.gui.PopUpManager.addPopUp(this.endWindow,true);
            if(!this.endWindow.initialized)
            {
                //在第一次进入游戏页面时立即验证，保证Mediator的注册是及时的，
                //防止注册不及时导致无法接受消息的情况
                this.endWindow.validateNow();
            }
        }
	}
}