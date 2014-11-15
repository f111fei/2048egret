
module game {

	export class GameCommand extends puremvc.SimpleCommand implements puremvc.ICommand{

		public constructor(){
			super();
		}
		public static NAME:string = "GameCommand";
		
		/**
		 * 开始游戏
		 */
		public static START_GAME:string = "start_game";

        /**
         * 结束游戏
         */
        public static FINISH_GAME:string = "finish_game";

        /**
         * 更新分数
         */
        public static UPDATE_SCORE:string = "update_score";
		
		/**
		 * 执行移动 , body  0: 上, 1: 右, 2:下, 3: 左
		 */
		public static MOVE_TILE:string = "move_tile";
		
		/**
		 * 注册消息
		 */
		public register():void{
			this.facade.registerCommand(GameCommand.START_GAME , GameCommand);
            this.facade.registerCommand(GameCommand.FINISH_GAME , GameCommand);
            this.facade.registerCommand(GameCommand.UPDATE_SCORE , GameCommand);
			this.facade.registerCommand(GameCommand.MOVE_TILE , GameCommand);
		}
		
		public execute(notification:puremvc.INotification):void{
			var gameProxy:GameProxy = <GameProxy><any> (this.facade.retrieveProxy(GameProxy.NAME));
			var gridProxy:GridProxy = <GridProxy><any> (this.facade.retrieveProxy(GridProxy.NAME));
			var data:any = notification.getBody();
			switch(notification.getName()){
				case GameCommand.START_GAME:{
                    this.sendNotification(SceneCommand.CHANGE,2);
                    gameProxy.reset();
					gridProxy.reset();
					gridProxy.addStartTiles();
					break;
				}
				case GameCommand.UPDATE_SCORE:{
					gameProxy.updateScore(data);
                    break;
				}
				case GameCommand.MOVE_TILE:{
					gridProxy.move(<number><any> data);
					break;
				}
                case GameCommand.FINISH_GAME:{
                    if(data)
                    {
                        gameProxy.setResult(data);
                        this.sendNotification(SceneCommand.SHOW_END);
                    }
                    else
                    {
                        gameProxy.quit();
                        gridProxy.reset();
                        this.sendNotification(SceneCommand.CHANGE,1);
                    }
                    break;
                }
			}
		}
	}
}