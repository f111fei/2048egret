

/// <reference path="../../../egret.d.ts"/>
/// <reference path="../ApplicationFacade.ts"/>
/// <reference path="../controller/commands/GameCommand.ts"/>
/// <reference path="../view/ApplicationMediator.ts"/>
/// <reference path="../view/components/MainGameUI.ts"/>
/// <reference path="../view/components/MainMenuUI.ts"/>

module game {

	export class AppContainer extends egret.UIStage{
		public mainMenuUI:MainMenuUI;
		public mainGameUI:MainGameUI;
//
		public constructor(){
			super();
			this.addEventListener(egret.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
		}
		
		private createCompleteEvent(event:egret.UIEvent):void{
			this.removeEventListener(egret.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
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
			this.mainGameUI.top = 130;
			this.mainGameUI.horizontalCenter = 0;
			this.addElement(this.mainGameUI);
		}
		
	}
}