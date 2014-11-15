

module game {

	export class GameMenuMediator extends puremvc.Mediator implements puremvc.IMediator{
		public static NAME:string = "GameMenuMediator";

		public constructor(viewComponent:any){
			super(GameMenuMediator.NAME, viewComponent);
			this.gameMenuUI.pauseButton.addEventListener(egret.TouchEvent.TOUCH_TAP , this.pauseButtonClick, this);
		}
		
		public pauseButtonClick(event:egret.TouchEvent):void{
			this.sendNotification(SceneCommand.SHOW_SETTING,"pause");
		}
		
		public listNotificationInterests():Array<any>{
			return [GameProxy.SCORE_UPDATE , GameProxy.SCORE_RESET];
		}
		
		public handleNotification(notification:puremvc.INotification):void{
			var data:any = notification.getBody();
			switch(notification.getName()){
				case GameProxy.SCORE_UPDATE:{
					this.gameMenuUI.scoreLabel.text = data["totalScore"].toString();
                    this.gameMenuUI.highScoreLabel.text = data["highScore"].toString();
//                    this.gameMenuUI.playScoreEffect(data["addScore"]);
					break;
				}

				case GameProxy.SCORE_RESET:{
					this.gameMenuUI.reset();
					break;
				}
			}
		}
		
		public get gameMenuUI():GameMenuUI{
			return <GameMenuUI><any> (this.viewComponent);
		}
	}
}