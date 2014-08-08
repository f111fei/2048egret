/**
 * Created by xzp on 2014/6/17.
 */

module game {

    export class ContinueButtonSkin extends egret.gui.Skin{

        public constructor(){
            super();
            this.states = ["up","down","disabled"];
        }

        private uiAsset:egret.gui.UIAsset;

        public createChildren():void{
            super.createChildren();
            this.uiAsset = new egret.gui.UIAsset();
            this.uiAsset.percentHeight = this.uiAsset.percentWidth = 100;
            this.addElement(this.uiAsset);
        }

        public commitCurrentState():void{
            super.commitCurrentState();
            switch (this.currentState){
                case "up":
                    this.uiAsset.source = "source.continueButton_up";
                    break;
                case "down":
                    this.uiAsset.source = "source.continueButton_over";
                    break;
                case "disabled":
                    this.uiAsset.source = "source.continueButton_over";
                    break;
            }
        }
    }
}