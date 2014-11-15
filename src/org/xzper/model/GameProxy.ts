

module game {

	export class GameProxy extends puremvc.Proxy implements puremvc.IProxy{
		public static NAME:string = "GameProxy";

		/**
		 * 分数更新 , body  {totalScore:int , addScore:int}
		 */
		public static SCORE_UPDATE:string = "score_update";

        /**
         * 游戏重置
         */
		public static SCORE_RESET:string = "score_reset";

		private won:boolean = false;
		private over:boolean = false;
		
		
		public constructor(){
			super(GameProxy.NAME);
		}

        private _score:number = 0;
        /**
		 * 游戏分数
		 */
		public get score():number{
			return this._score;
		}

		/**
		 * 重置游戏数据
		 */
		public reset():void{
			this._score = 0;
			this.won = false;
			this.over = false;
			CommonData.isRunning = true;
			this.sendNotification(GameProxy.SCORE_RESET);
		}

		/**
		 * 更新分数
		 */
		public updateScore(addScore:number):void{
			if(addScore != 0){
				this._score += addScore;
                if(this._score > CommonData.highScore)
                    CommonData.highScore = this._score;
				this.sendNotification(GameProxy.SCORE_UPDATE , {"totalScore":this.score , "highScore":CommonData.highScore ,"addScore":addScore});
			}
		}
		
		/**
		 * 游戏是否胜利
		 */
		public setResult(b:boolean):void{
			if(b){
				this.won = true;
			}else{
				this.over = true;
			}
			CommonData.isRunning = false;
		}

        /**
         * 游戏中断退出
         */
        public quit():void{
            this.reset();
            this.over = true;
            CommonData.isRunning = false;
        }
	}
}