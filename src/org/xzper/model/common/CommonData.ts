

module game {

	export class CommonData{
        /**
         * 游戏胜利时的数字
         */
        public static winValue:number = 2048;

		/**
		 * 游戏的大小
		 */
		public static size:number = 4;
		
		/**
		 * 游戏是否开始
		 */
		public static isRunning:boolean = false;
		
		public constructor(){
		}
	}
}