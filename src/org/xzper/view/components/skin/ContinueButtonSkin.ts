/**
 * Created by xzp on 2014/6/17.
 */

/// <reference path="../../../../../egret.d.ts"/>

module game {

    export class ContinueButtonSkin extends egret.Skin{

        public constructor(){
            super();
            this.states = ["up","down","disabled"];
        }

        private upSkin:egret.UIAsset;
        private downSkin:egret.UIAsset;
        private disabledSkin:egret.UIAsset;

        public createChildren():void{
            super.createChildren();
            this.upSkin = new egret.UIAsset();
            this.upSkin.percentHeight = this.upSkin.percentWidth = 100;
            this.upSkin.source = "source.continueButton_up";
            this.addElement(this.upSkin);

            this.downSkin = new egret.UIAsset();
            this.downSkin.percentHeight = this.downSkin.percentWidth = 100;
            this.downSkin.source = "source.continueButton_over";
            this.addElement(this.downSkin);

            this.disabledSkin = new egret.UIAsset();
            this.disabledSkin.percentHeight = this.disabledSkin.percentWidth = 100;
            this.disabledSkin.source = "source.continueButton_over";
            this.addElement(this.disabledSkin);
        }

        public commitCurrentState():void{
            super.commitCurrentState();
            switch (this.currentState){
                case "up":
                    this.upSkin.visible = true;
                    this.disabledSkin.visible = false;
                    this.downSkin.visible = false;
                    break;
                case "down":
                    this.downSkin.visible = true;
                    this.disabledSkin.visible = false;
                    this.upSkin.visible = false;
                    break;
                case "disabled":
                    this.disabledSkin.visible = true;
                    this.downSkin.visible = false;
                    this.upSkin.visible = false;
                    break;
            }
        }
    }
}