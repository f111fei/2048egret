

module game {

	export class TileVO {
		/**
		 * 列
		 */
		public x:number;
		
		/**
		 * 行
		 */
		public y:number;
		
		/**
		 * 数值
		 */
		public value:number;
		
		/**
		 * 是否已合并
		 */
		public merged:boolean;
		/**
		 * 移动之前的位置
		 */
		public previousPosition:any;
		
		public constructor(){
		}
		
		public clone():TileVO{
			var tileVO:TileVO = new TileVO();
			tileVO.x = this.x;
			tileVO.y = this.y;
			tileVO.value = this.value;
			if(this.previousPosition){
				tileVO.previousPosition = {"x":this.previousPosition.x , "y":this.previousPosition.y};
			}
			tileVO.merged = this.merged;
			return tileVO;
		}

	}
}