/**
 * Created by xzper on 2014/11/15.
 */
module game {

    /**
     * 游戏场景
     */
    export class GameScene extends egret.gui.Group {

        public constructor(){
            super();
            this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
        }

        public createCompleteEvent(event:egret.gui.UIEvent):void{
            this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
            ApplicationFacade.getInstance().registerMediator( new GameSceneMediator(this) );
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
                var self:GameScene = this;
                tileFrom.location.x = -1;
                tileFrom.location.y = -1;
                tileFrom.playmove(tileVO.x * (tileFrom.width+this.gap)+tileFrom.width/2 ,tileVO.y * (tileFrom.height+this.gap)+tileFrom.height/2 );
                var moveComplete:Function = function(event:egret.Event):void{
                    tileFrom.removeEventListener("moveComplete" , moveComplete , self);
                    if(tileFrom.parent)
                        self.tileGroup.removeElement(tileFrom);
                    ObjectPool.getPool("game.TileUI").returnObject(tileFrom);   //回收到对象池
                    tileTo.value = tileVO.value;
                    self.tileGroup.setElementIndex(tileTo,self.tileGroup.numElements-1);  //将要缩放的格子置顶，
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
         * 格子容器
         */
        public tileGroup:egret.gui.Group;

        public createChildren():void
        {
            super.createChildren();
            this.tileGroup = new egret.gui.Group();
            this.addElement(this.tileGroup);
        }

        /**
         * 格子的大小
         */
        private get tileSize():number
        {
            return (560-(CommonData.size+1)*this.gap)/CommonData.size;
        }

        /**
         * 间距
         */
        private get gap():number
        {
            return 0;
        }

    }
}