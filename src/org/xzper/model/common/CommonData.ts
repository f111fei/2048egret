

module game {

	export class CommonData{
        /**
         * 游戏胜利时的数字
         */
        public static winValue:number = 2048;

		/**
		 * 游戏的大小
		 */
		public static get size():number
        {
            if(CommonData.level == Level.EASY)
                return 6;
            else if(CommonData.level == Level.NORMAL)
                return 5;
            else if(CommonData.level == Level.SPECIAL)
                return 4;
        }

        /**
         * 当前游戏等级
         */
        public static level:string = Level.NORMAL;

        /**
         * 最高分
         */
        public static highScore:number = 0;
		
		/**
		 * 游戏是否开始
		 */
		public static isRunning:boolean = false;
		
		public constructor(){
		}
	}
}