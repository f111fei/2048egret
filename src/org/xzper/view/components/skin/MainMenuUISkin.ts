

module game {

	export class MainMenuUISkin extends egret.Skin{

		public constructor(){
			super();
		}

        /**
         * 和主机组件匹配的皮肤部件
         */
        private static _skinParts:Array<string> = ["addLabel","scoreLabel","highScoreLabel","resetButton"];

        public get skinParts():Array<string>{
            return MainMenuUISkin._skinParts;
        }

        /**
         * 加分文本
         */
        public addLabel:egret.Label;

        /**
         * 总分文本
         */
        public scoreLabel:egret.Label;

        /**
         * 最高分文本
         */
        public highScoreLabel:egret.Label;

        /**
         * 重置按钮
         */
        public resetButton:egret.Button;

        public createChildren():void
        {
            super.createChildren;
            var uiAsset:egret.UIAsset = new egret.UIAsset();
            uiAsset.source = "source.menu";
            this.addElement(uiAsset);

            this.resetButton = new egret.Button();
            this.resetButton.skinName = ResetButtonSkin;
            this.resetButton.right = 10;
            this.resetButton.top = 80;
            this.resetButton.label = "重置游戏";
            this.addElement(this.resetButton);

            this.highScoreLabel = new egret.Label();
            this.highScoreLabel.text = "0";
            this.highScoreLabel.horizontalCenter = 203;
            this.highScoreLabel.size = 23;
            this.highScoreLabel.textAlign = "center";
            this.highScoreLabel.textColor = 0xFFFFFF;
            this.highScoreLabel.verticalAlign = "middle";
            this.highScoreLabel.top = 40;
            this.addElement(this.highScoreLabel);

            var group:egret.Group = new egret.Group;
            group.width = 96;
            group.height = 56;
            group.right = 103;
            group.top = 15;
            this.addElement(group);

            this.scoreLabel = new egret.Label();
            this.scoreLabel.text = "0";
            this.scoreLabel.horizontalCenter = 0;
            this.scoreLabel.size = 23;
            this.scoreLabel.textAlign = "center";
            this.scoreLabel.textColor = 0xFFFFFF;
            this.scoreLabel.verticalAlign = "middle";
            this.scoreLabel.percentWidth = 100;
            this.scoreLabel.y = 25;
            group.addElement(this.scoreLabel);

            this.addLabel = new egret.Label();
            this.addLabel.horizontalCenter = 0;
            this.addLabel.size = 20;
            this.addLabel.textColor = 0x8B8177;
            group.addElement(this.addLabel);
        }
		
	}
}