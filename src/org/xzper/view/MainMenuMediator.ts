

module game {

	export class MainMenuMediator extends puremvc.Mediator implements puremvc.IMediator{
		public static NAME:string = "MainMenuMediator";

		public constructor(viewComponent:any){
			super(MainMenuMediator.NAME, viewComponent);
			this.mainGameUI.resetButton.addEventListener(egret.TouchEvent.TOUCH_TAP , this.startButtonClick, this);
		}
		
		public startButtonClick(event:egret.TouchEvent):void{
			this.sendNotification(GameCommand.GAME_RESET);
		}
		
		public listNotificationInterests():Array<any>{
			return [GameProxy.UPDATE_SCORE , GameProxy.RESET_SCORE];
		}
		
		public handleNotification(notification:puremvc.INotification):void{
			var data:any = notification.getBody();
			switch(notification.getName()){
				case GameProxy.UPDATE_SCORE:{
					this.mainGameUI.scoreLabel.text = data["totalScore"].toString();
                    this.mainGameUI.highScoreLabel.text = data["highScore"].toString();
                    this.mainGameUI.playScoreEffect(data["addScore"]);
					break;
				}

				case GameProxy.RESET_SCORE:{
					this.mainGameUI.scoreLabel.text = "0";
					break;
				}
			}
		}
		
		public get mainGameUI():MainMenuUI{
			return <MainMenuUI><any> (this.viewComponent);
		}
	}
}