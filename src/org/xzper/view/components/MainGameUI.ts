
module game {

    export class MainGameUI extends egret.gui.Group{

        public constructor(){
            super();
            this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
        }

        public createCompleteEvent(event:egret.gui.UIEvent):void{
            this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
            ApplicationFacade.getInstance().registerMediator( new MainGameMediator(this) );
        }

        /**
         * 创建一个格子
         */
        public createTile(tileVO:TileVO):void{
            var tile:TileUI = <TileUI>(ObjectPool.getPool("game.TileUI").borrowObject());  //从对象池创建
            tile.value = tileVO.value;
            tile.location.x = tileVO.x;
            tile.location.y = tileVO.y;
            tile.width = tile.height = this.tileSize;
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
            egret.setTimeout(showTile , this , 100);   //延迟显示格子，保证其他的格子移动完成后显示
		}

        /**
         *获取指定位置的格子
         */
		public getTileUI(x:number , y:number):TileUI{
			for (var i:number = 0; i < this.tileGroup.numElements; i++) {
                var tile:TileUI = <TileUI><any> (this.tileGroup.getElementAt(i));
                if(tile.location.x == x && tile.location.y == y){
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
                tileFrom.location.x = -1;
                tileFrom.location.y = -1;
                tileFrom.playmove(tileVO.x * (tileFrom.width+this.gap)+tileFrom.width/2 ,tileVO.y * (tileFrom.height+this.gap)+tileFrom.height/2 );
                var moveComplete:Function = function(event:egret.Event):void{
                    tileFrom.removeEventListener("moveComplete" , moveComplete , self);
                    if(tileFrom.parent)
                        self.tileGroup.removeElement(tileFrom);
                    ObjectPool.getPool("game.TileUI").returnObject(tileFrom);   //回收到对象池
                    tileTo.value = tileVO.value;
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
                tile.location.x = tileVO.x;
                tile.location.y = tileVO.y;
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

        /**
         * 游戏底背景
         */
        private backUIAsset:egret.gui.UIAsset;

        /**
         * 背景格子容器
         */
        public backGroundGroup:egret.gui.Group;

        /**
         * 格子容器
         */
        public tileGroup:egret.gui.Group;

        /**
         * 内容
         */
        public contentGroup:egret.gui.Group;

        public createChildren():void
        {
            super.createChildren();
            this.backUIAsset = new egret.gui.UIAsset();
            this.backUIAsset.source = "source.background";
            //使用九宫格
            this.backUIAsset.scale9Grid = new egret.Rectangle(20, 20, 65, 65);
            this.backUIAsset.width = 500;
            this.backUIAsset.height = this.backUIAsset.width;
            this.addElement(this.backUIAsset);

            this.backGroundGroup = new egret.gui.Group();
            this.addElement(this.backGroundGroup);

            this.tileGroup = new egret.gui.Group();
            this.addElement(this.tileGroup);

            this.contentGroup = new egret.gui.Group();
            this.contentGroup.percentHeight = this.contentGroup.percentWidth = 100;
            this.contentGroup.touchEnabled = false;
            this.addElement(this.contentGroup);

            this.initBackGround();
        }

        /**
         * 初始化背景
         */
        private initBackGround():void{
            //使用格子布局
            var layout:egret.gui.TileLayout = new egret.gui.TileLayout();
            layout.requestedColumnCount = layout.requestedRowCount = CommonData.size;
            layout.horizontalGap = layout.verticalGap = this.gap;
            this.backGroundGroup.x = this.backGroundGroup.y = this.gap;
            this.backGroundGroup.layout = layout;

            this.tileGroup.x = this.tileGroup.y = this.gap;

            //背景格子
            var size:number = CommonData.size;
            var tile:egret.gui.UIAsset;
            var totalNum:number = size * size;
            for(var i:number = 0;i < totalNum ; i++)
            {
                tile = new egret.gui.UIAsset();
                tile.width = tile.height = this.tileSize;
                tile.source = "source.backtile";
                this.backGroundGroup.addElement(tile);
            }
        }

        /**
         * 格子的大小
         */
        private get tileSize():number
        {
            return (500-(CommonData.size+1)*this.gap)/CommonData.size;
        }

        /**
         * 间距
         */
        private get gap():number
        {
            if(CommonData.size==4)
                return 16;
            else if(CommonData.size==5)
                return 15;
            else if(CommonData.size==6)
                return 14;
            else if(CommonData.size==7)
                return 10;
            else
                return 20-CommonData.size;
        }

	}
}