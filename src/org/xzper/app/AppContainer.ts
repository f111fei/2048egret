
module game {

	export class AppContainer extends egret.gui.UIStage{
		public mainMenuUI:MainMenuUI;
		public mainGameUI:MainGameUI;
//
		public constructor(){
			super();
			this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
		}
		
		private createCompleteEvent(event:egret.gui.UIEvent):void{
			this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
			ApplicationFacade.getInstance().registerMediator( new ApplicationMediator(this) );

            //创建完成，游戏开始
            ApplicationFacade.getInstance().sendNotification(GameCommand.GAME_RESET);
        }

		public createChildren():void{
			super.createChildren();
			
			this.mainMenuUI = new MainMenuUI();
			this.mainMenuUI.top = 10;
			this.mainMenuUI.horizontalCenter = 0;
			this.addElement(this.mainMenuUI);

			this.mainGameUI = new MainGameUI();
			this.mainGameUI.top = 140;
			this.mainGameUI.horizontalCenter = 0;
			this.addElement(this.mainGameUI);
		}
		
	}
}