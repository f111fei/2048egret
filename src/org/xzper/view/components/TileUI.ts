

/// <reference path="../../../../egret.d.ts"/>
/// <reference path="../../model/vos/TileVO.ts"/>

module game {

	export class TileUI extends egret.UIAsset{

		public constructor(){
			super();
			this.width = 105;
			this.height = 105;

            //使描点在中心
            this.anchorX = this.anchorY = 0.5;
		}
		
		private _tileVO:TileVO;
		/**
		 * 格子的数据
		 */
		public get tileVO():TileVO{
			return this._tileVO;
		}
		
		public set tileVO(value:TileVO){
			if(value == this._tileVO){
				return;
			}
			this._tileVO = value;
			this.invalidateProperties();
		}
		
		public commitProperties():void{
			if(this._tileVO){
				this.updateView();
			}
		}
		
		private updateView():void{
            var mi:number = <number><any> (Math.log(this._tileVO.value)/Math.log(2));
            this.source = "number.number_"+mi;
		}
		
		/**
		 * 播放缩放效果 merged是否是合并方块
		 */
		public playScale(merged:boolean = false):void{
            if(!merged)
            {
                this.scaleX = this.scaleY = 0.1;
                egret.Tween.get(this).to({scaleX:1 , scaleY:1} , 100);
            }
            else
            {
                var self:TileUI = this;
                var fun:Function = function(){
                    egret.Tween.get(self).to({scaleX:1 , scaleY:1} , 80);
                };
                this.scaleX = this.scaleY = 1;
                egret.Tween.get(this).to({scaleX:1.3 , scaleY:1.3} , 80).call(fun , this);
            }
		}

        /**
         * 移动格子
         */
		public playmove(xTo:number, yTo:number , compelete:Function = null):void{
            if(compelete == null)
            {
                egret.Tween.get(this).to({x:xTo , y:yTo} , 100);
            }
            else
            {
                egret.Tween.get(this).to({x:xTo , y:yTo} , 100).call(compelete , this);
            }
		}
	}
}