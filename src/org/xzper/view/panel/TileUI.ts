

module game {

	export class TileUI extends egret.gui.UIAsset{

		public constructor(){
			super();
            //使描点在中心
            this.anchorX = this.anchorY = 0.5;
            this.location = {"x":0 , "y":0};
		}

        /**
         * 行列位置
         */
        public location:any;

        private valueChanged:boolean;
        private _value:number;
        /**
         * 格子的数字
         */
        public get value():number{
            return this._value;
        }

        public set value(value:number){
            if(value == this._value){
                return;
            }
            this.valueChanged = true;
            this._value = value;
            this.invalidateProperties();
        }

        public commitProperties():void{
            if(this.valueChanged){
                this.valueChanged = false;
                this.updateValue();
            }
        }

        private updateValue():void{
            var mi:number = Math.log(this._value)/Math.log(2);
            this.source = "tile_"+mi;
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
		public playmove(xTo:number, yTo:number):void{
            var self:TileUI = this;
            egret.Tween.get(this).to({x:xTo , y:yTo} , 100).call(function():void{
                self.dispatchEvent(new egret.Event("moveComplete"));
            } , this);
		}
	}
}