

module game {

	export class ResultWindowMediator extends puremvc.Mediator implements puremvc.IMediator{
		public static NAME:string = "ResultWindowMediator";

		public constructor(viewComponent:any){
			super(ResultWindowMediator.NAME, viewComponent);
			this.resultWindow.button.addEventListener(egret.TouchEvent.TOUCH_TAP , this.tryAgainButtonClick, this);
		}
		
		public tryAgainButtonClick(event:egret.TouchEvent):void{
			this.sendNotification(GameCommand.GAME_RESET);
		}
		
		public listNotificationInterests():Array<any>{
			return [
				GameCommand.GAME_RESET
			];
		}
		
		public handleNotification(notification:puremvc.INotification):void{
			switch(notification.getName()){
				case GameCommand.GAME_RESET:{
					(<egret.IVisualElementContainer><any> (this.resultWindow.parent)).removeElement(this.resultWindow);
					this.facade.removeMediator(ResultWindowMediator.NAME);
					break;
				}
			}
		}
		
		public get resultWindow():ResultWindow{
			return <ResultWindow><any> (this.viewComponent);
		}
	}
}