/**
 * Created by xzp on 2014/6/17.
 */

module game {
    export class ResultWindowSkin extends egret.gui.Skin
    {
        public constructor(){
            super();
            this.states = ["win","failed"];
        }

        private static _skinParts:Array<string> = ["button","resultUI"];

        public get skinParts():Array<string>{
            return ResultWindowSkin._skinParts;
        }

        /**
         * 按钮
         */
        public button:egret.gui.Button;

        /**
         * 结果文本
         */
        public resultUI:egret.gui.UIAsset;

        public createChildren():void {
            super.createChildren;

            //背景
            var backUI:egret.gui.UIAsset = new egret.gui.UIAsset();
            backUI.alpha = 0.3;
            backUI.percentHeight = backUI.percentWidth = 100;
            //使用九宫格
            backUI.source = "source.background";
            backUI.scale9Grid = new egret.Rectangle(20, 20, 65, 65);
            this.addElement(backUI);

            this.button = new egret.gui.Button();
            this.button.horizontalCenter = 0;
            this.button.verticalCenter = 90;
            this.addElement(this.button);

            this.resultUI = new egret.gui.UIAsset();
            this.resultUI.horizontalCenter = 0;
            this.resultUI.verticalCenter = -90;
            this.addElement(this.resultUI);
        }

        public commitCurrentState():void {
            super.commitCurrentState();
            if(this.currentState == "win")
            {
                this.resultUI.source = "source.result_sucess";
                this.button.skinName = ContinueButtonSkin;
            }
            else
            {
                this.resultUI.source = "source.result_failed";
                this.button.skinName = ResetButtonSkin;
            }
        }
    }
}