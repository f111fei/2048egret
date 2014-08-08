module game {

    export class MainGameUISkin extends egret.gui.Skin{

        public constructor(){
            super();
        }

        /**
         * 和主机组件匹配的皮肤部件
         */
        private static _skinParts:Array<string> = [
            "tileGroup","contentGroup"
        ];

        public get skinParts():Array<string>{
            return MainGameUISkin._skinParts;
        }

        /**
         * 游戏底背景
         */
        private backUIAsset:egret.gui.UIAsset;

        /**
         * 背景格子容器
         */
        private backGroundGroup:egret.gui.Group;

        /**
         * 格子容器
         */
        public tileGroup:egret.gui.Group;

        /**
         * 内容
         */
        public contentGroup:egret.gui.Group;

        private gap:number = 16;
        public createChildren():void
        {
            super.createChildren;
            this.backUIAsset = new egret.gui.UIAsset();
            this.backUIAsset.source = "source.background";
            //使用九宫格
            this.backUIAsset.scale9Grid = new egret.Rectangle(20, 20, 65, 65);
            this.backUIAsset.width = CommonData.size*(TileUI.size + this.gap) + this.gap;
            this.backUIAsset.height = this.backUIAsset.width;
            this.addElement(this.backUIAsset);

            //使用格子布局
            var layout:egret.gui.TileLayout = new egret.gui.TileLayout();
            layout.columnCount = layout.rowCount = CommonData.size;
            layout.horizontalGap = layout.verticalGap = this.gap;
            this.backGroundGroup = new egret.gui.Group();
            this.backGroundGroup.x = this.backGroundGroup.y = this.gap;
            this.backGroundGroup.layout = layout;
            this.addElement(this.backGroundGroup);
            this.initBackGround(CommonData.size);

            this.tileGroup = new egret.gui.Group();
            this.tileGroup.x = this.tileGroup.y = this.gap;
            this.addElement(this.tileGroup);

            this.contentGroup = new egret.gui.Group();
            this.contentGroup.percentHeight = this.contentGroup.percentWidth = 100;
            this.contentGroup.touchEnabled = false;
            this.addElement(this.contentGroup);
        }

        /**
         * 初始化背景
         */
        private initBackGround(size:number):void{
            //背景格子
            var tile:egret.gui.UIAsset;
            var totalNum:number = size * size;
            for(var i:number = 0;i < totalNum ; i++)
            {
                tile = new egret.gui.UIAsset();
                tile.width = tile.height = TileUI.size;
                tile.source = "source.backtile";
                this.backGroundGroup.addElement(tile);
            }
        }

    }
}