

/// <reference path="../../../../egret.d.ts"/>
/// <reference path="../../ApplicationFacade.ts"/>
/// <reference path="../../model/common/CommonData.ts"/>
/// <reference path="../../model/vos/TileVO.ts"/>
/// <reference path="../../utils/ObjectPool.ts"/>
/// <reference path="../MainGameMediator.ts"/>
/// <reference path="TileUI.ts"/>

module game {

	export class MainGameUI extends egret.Group{
		public backGroundGroup:egret.Group;
		public tileGroup:egret.Group;

        private gap:number = 16;

        public constructor(){
			super();
			this.addEventListener(egret.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
		}

        public createChildren():void
        {
            super.createChildren();
            this.backGroundGroup = new egret.Group();
            this.addElement(this.backGroundGroup);

            this.tileGroup = new egret.Group();
            this.tileGroup.x = this.gap;
            this.tileGroup.y = this.gap;
            this.addElement(this.tileGroup);
        }
		
		public createCompleteEvent(event:egret.UIEvent):void{
			this.removeEventListener(egret.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
			ApplicationFacade.getInstance().registerMediator( new MainGameMediator(this) );
			
			this.initBackGround(CommonData.size);
		}
		
		/**
		 * 初始化背景
		 */
		public initBackGround(size:number):void{
			this.backGroundGroup.removeAllElements();

            //背景图
            var backUIAsset:egret.UIAsset = new egret.UIAsset();
            backUIAsset.width = size*TileUI.size + (size+1)*this.gap;
            backUIAsset.height = backUIAsset.width;

            //使用九宫格
            var texture:egret.Texture = RES.getRes("source.background");
            var scale9Grid:egret.Rectangle = new egret.Rectangle(20, 20, 65, 65);
            var scaleBitmap:egret.Bitmap = new egret.Bitmap(texture);
            scaleBitmap.scale9Grid = scale9Grid;
            backUIAsset.source = scaleBitmap;
            this.backGroundGroup.addElement(backUIAsset);

            //背景格子
            var tile:egret.UIAsset;
            for (var i:number = 0; i < size; i++) {
				for (var j:number = 0; j < size; j++) {
                    tile = new egret.UIAsset();
                    tile.source = "source.backtile";
					tile.width = tile.height =  TileUI.size;
					tile.x = this.gap + i * (tile.width+this.gap);
					tile.y = this.gap + j * (tile.height+this.gap);
					this.backGroundGroup.addElement(tile);
				}
			}
		}
		
		/**
		 * 创建一个格子
		 */
		public createTile(tileVO:TileVO):void{
			var tile:TileUI = <TileUI>(ObjectPool.getPool("game.TileUI").borrowObject());  //从对象池创建
			tile.tileVO = tileVO;
			tile.includeInLayout = false;
			tile.x = tileVO.x * (tile.width+this.gap) + tile.width/2;
			tile.y = tileVO.y * (tile.height+this.gap) + tile.height/2;

            //延迟添加格子，保证其他的格子移动完成后添加。
            egret.Ticker.getInstance().setTimeout(function():void{
                this.tileGroup.addElement(tile);
                if(tileVO.merged){
                    tile.playScale(true);
                }else{
                    tile.playScale(false);
                }
            } , this , 100);
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

            if(tileFrom){
                this.tileGroup.setElementIndex(tileFrom,0);  //将要消失的格子沉底，
                var self:MainGameUI = this;
                tileFrom.tileVO.x = tileVO.x;
                tileFrom.tileVO.y = tileVO.y;
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
			var tile:TileUI = this.getTileUI(tileVO.x , tileVO.y);
			if(tile){
				this.tileGroup.removeElement(tile);
                ObjectPool.getPool("game.TileUI").returnObject(tile);
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
			this.tileGroup.removeAllElements();
		}
	}
}