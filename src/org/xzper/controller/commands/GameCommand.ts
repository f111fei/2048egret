
module game {

	export class GameCommand extends puremvc.SimpleCommand implements puremvc.ICommand{

		public constructor(){
			super();
		}
		public static NAME:string = "GameCommand";
		
		/**
		 * 游戏重置
		 */
		public static GAME_RESET:string = "game_reset";
		
		/**
		 * 处理移动后的事务 , body  {score , won , moved}
		 */
		public static USER_MOVED:string = "user_moved";
		
		/**
		 * 执行移动 , body  0: 上, 1: 右, 2:下, 3: 左
		 */
		public static USER_MOVE:string = "user_move";
		
		/**
		 * 注册消息
		 */
		public register():void{
			this.facade.registerCommand(GameCommand.GAME_RESET , GameCommand); //注册游戏重置消息
			this.facade.registerCommand(GameCommand.USER_MOVED , GameCommand); //注册移动后消息
			this.facade.registerCommand(GameCommand.USER_MOVE , GameCommand);  //注册将要移动的消息
		}
		
		public execute(notification:puremvc.INotification):void{
			var gameProxy:GameProxy = <GameProxy><any> (this.facade.retrieveProxy(GameProxy.NAME));
			var gridProxy:GridProxy = <GridProxy><any> (this.facade.retrieveProxy(GridProxy.NAME));
			var data:any = notification.getBody();
			switch(notification.getName()){
				case GameCommand.GAME_RESET:{
					gameProxy.reset();
					gridProxy.reset();
					gridProxy.addStartTiles();
					break;
				}
				case GameCommand.USER_MOVED:{
					gameProxy.updateScore(data["score"]);
					if(!data["won"]){
						if(data["moved"]){
							gridProxy.computerMove();
						}
					}else{
						gameProxy.setResult(true);
					}
					if(!gridProxy.movesAvailable()){
						gameProxy.setResult(false);
					}
					break;
				}
				case GameCommand.USER_MOVE:{
					gridProxy.move(<number><any> data);
					break;
				}
			}
		}
	}
}