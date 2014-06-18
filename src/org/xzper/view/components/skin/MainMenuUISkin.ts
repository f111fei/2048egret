

/// <reference path="../../../../../egret.d.ts"/>
/// <reference path="ResetButtonSkin.ts"/>

module game {

	export class MainMenuUISkin extends egret.Skin{

		public constructor(){
			super();
		}
		
        private static _skinParts:Array<string> = ["addLabel","scoreLabel","resetButton"];

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
			this.resetButton.horizontalCenter = 75;
			this.resetButton.label = "重置游戏";
			this.resetButton.top = 8;
			this.addElement(this.resetButton);

			var group:egret.Group = new egret.Group;
            group.width = 116;
            group.height = 56;
			group.right = 2;
			group.top = 4;
			this.addElement(group);

			this.scoreLabel = new egret.Label();
            this.scoreLabel.text = "0";
			this.scoreLabel.horizontalCenter = 0;
			this.scoreLabel.size = 23;
			this.scoreLabel.textAlign = "center";
			this.scoreLabel.textColor = 0xFFFFFF;
			this.scoreLabel.verticalAlign = "middle";
			this.scoreLabel.percentWidth = 100;
			this.scoreLabel.y = 30;
			group.addElement(this.scoreLabel);
			
			this.addLabel = new egret.Label();
			this.addLabel.horizontalCenter = 0;
			this.addLabel.size = 20;
			this.addLabel.textColor = 0x8B8177;
			group.addElement(this.addLabel);
		}
		
	}
}