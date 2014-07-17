
module game {

	export class MainGameMediator extends puremvc.Mediator implements puremvc.IMediator{
		public static NAME:string = "MainGameMediator";
		
		public constructor(viewComponent:any){
			super(MainGameMediator.NAME, viewComponent);
		}
		
		public listNotificationInterests():Array<any>{
			return [
				GridProxy.INSERT_TILE ,
                GridProxy.MERGED_TILE,
				GridProxy.MOVE_TILE , 
				GridProxy.REMOVE_TILE , 
				GridProxy.RESET_TILE , 
				GameProxy.GAME_RESULT
			];
		}
		
		public handleNotification(notification:puremvc.INotification):void{
			var data:any = notification.getBody();
			switch(notification.getName()){
				case GridProxy.INSERT_TILE:{
					this.mainGameUI.createTile(<TileVO><any> data);
					break;
				}

                case GridProxy.MERGED_TILE:{
                    this.mainGameUI.mergedTile(<TileVO><any> data);
                    break;
                }

				case GridProxy.MOVE_TILE:{
					this.mainGameUI.moveTile(<TileVO><any> data);
					break;
				}

				case GridProxy.REMOVE_TILE:{
					this.mainGameUI.removeTile(<TileVO><any> data);
					break;
				}
				case GridProxy.RESET_TILE:{
					this.mainGameUI.clearTiles();
					break;
				}
				case GameProxy.GAME_RESULT:{
					this.showResultWindow(<boolean><any> data);
					break;
				}
			}
		}
		
		private showResultWindow(win:boolean):void{
			var resultWindow:ResultWindow = new ResultWindow();
			resultWindow.win = win;
			resultWindow.percentWidth = 100;
			resultWindow.percentHeight = 100;
			this.mainGameUI.addElement(resultWindow);
		}
		
		public get mainGameUI():MainGameUI{
			return <MainGameUI><any> (this.viewComponent);
		}
	}
}