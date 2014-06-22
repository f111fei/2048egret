
/// <reference path="../../../../egret.d.ts"/>
/// <reference path="../../ApplicationFacade.ts"/>
/// <reference path="../../model/common/CommonData.ts"/>
/// <reference path="../../model/vos/TileVO.ts"/>
/// <reference path="../../utils/ObjectPool.ts"/>
/// <reference path="../MainGameMediator.ts"/>
/// <reference path="TileUI.ts"/>

module game {

	export class MainGameUI extends egret.SkinnableContainer{
        public backUIAsset:egret.Group;
		public backGroundGroup:egret.Group;
        public tileGroup:egret.Group;

        public gap:number = 16;

        public constructor(){
			super();
            this.skinName = MainGameUISkin;
			this.addEventListener(egret.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
		}

		public createCompleteEvent(event:egret.UIEvent):void{
			this.removeEventListener(egret.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
			ApplicationFacade.getInstance().registerMediator( new MainGameMediator(this) );
		}
		
		/**
		 * 创建一个格子
		 */
		public createTile(tileVO:TileVO):void{
			var tile:TileUI = <TileUI>(ObjectPool.getPool("game.TileUI").borrowObject());  //从对象池创建
			tile.tileVO = tileVO;
            tile.x = tileVO.x * (tile.width + this.gap) + tile.width/2;
            tile.y = tileVO.y * (tile.height + this.gap) + tile.height/2;
			tile.includeInLayout = false;
            tile.visible = false;
            this.tileGroup.addElement(tile);
            var showTile:Function = function():void{
                tile.visible = true;
                if(tileVO.merged){
                    tile.playScale(true);
                }else{
                    tile.playScale(false);
                }
            };
            egret.Ticker.getInstance().setTimeout(showTile , this , 100);   //延迟显示格子，保证其他的格子移动完成后显示
		}

        /**
         *获取指定位置的格子
         */
		public getTileUI(x:number , y:number):TileUI{
			for (var i:number = 0; i < this.tileGroup.numElements; i++) {
                var tile:TileUI = <TileUI><any> (this.tileGroup.getElementAt(i));
                if(tile.tileVO.x == x && tile.tileVO.y == y){
                    return tile;
                }
            }
            return null;
        }

        /**
         * 合并格子
         */
        public mergedTile(tileVO:TileVO):void{
            var tileFrom:TileUI = this.getTileUI(tileVO.previousPosition.x , tileVO.previousPosition.y);
            var tileTo:TileUI = this.getTileUI(tileVO.x , tileVO.y);
            if(tileFrom && tileTo){
                this.tileGroup.setElementIndex(tileFrom,0);  //将要消失的格子沉底，
                var self:MainGameUI = this;
                tileFrom.tileVO.x = -1;
                tileFrom.tileVO.y = -1;
                tileFrom.playmove(tileVO.x * (tileFrom.width+this.gap)+tileFrom.width/2 ,tileVO.y * (tileFrom.height+this.gap)+tileFrom.height/2 );
                var moveComplete:Function = function(event:egret.Event):void{
                    tileFrom.removeEventListener("moveComplete" , moveComplete , self);
                    if(tileFrom.parent)
                        self.tileGroup.removeElement(tileFrom);
                    ObjectPool.getPool("game.TileUI").returnObject(tileFrom);   //回收到对象池
                    tileTo.tileVO = tileVO;
                    tileTo.playScale(true);
                };
                tileFrom.addEventListener("moveComplete" , moveComplete ,this);
            }
        }

		/**
		 * 清除一个格子
		 */
		public removeTile(tileVO:TileVO):void{
			var tileUI:TileUI = this.getTileUI(tileVO.x , tileVO.y);
			if(tileUI){
				this.tileGroup.removeElement(tileUI);
                ObjectPool.getPool("game.TileUI").returnObject(tileUI);
			}
		}
		
		/**
		 * 移动一个格子
		 */
		public moveTile(tileVO:TileVO):void{
			var tile:TileUI = this.getTileUI(tileVO.previousPosition.x , tileVO.previousPosition.y);
			if(tile){
				tile.tileVO.x = tileVO.x;
				tile.tileVO.y = tileVO.y;
				tile.playmove( tileVO.x * (tile.width+this.gap)+tile.width/2 ,
                        tileVO.y * (tile.height+this.gap)+tile.height/2 );
			}
		}
		
		/**
		 * 清除所有
		 */
		public clearTiles():void{
            var num:number = this.tileGroup.numElements;
            var tileUI:TileUI;
            for(var i:number = num - 1 ; i >= 0 ; i--)
            {
                tileUI = <TileUI> this.tileGroup.removeElementAt(i);
                ObjectPool.getPool("game.TileUI").returnObject(tileUI);
            }
		}
	}
}