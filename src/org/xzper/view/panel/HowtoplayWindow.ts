/**
 * Created by xzper on 2014/11/15.
 */

module game {

    export class HowtoplayWindow extends egret.gui.SkinnableComponent {

        public constructor() {
            super();
            this.skinName = skin.HowtoPlaySkin;
        }

        public prevButton:egret.gui.Button;
        public nextButton:egret.gui.Button;

        public partAdded(partName:string, instance:any):void{
            super.partAdded(partName, instance);
            if(instance ==this.prevButton)
            {
                this.prevButton.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onPrevButtonClick , this);
            }
            else if(instance ==this.nextButton)
            {
                this.nextButton.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onNextButtonClick , this);
            }
        }

        private onPrevButtonClick(event:egret.TouchEvent):void
        {
            if(this.state == 1)
            {
                egret.gui.PopUpManager.removePopUp(this);
            }
            else
            {
                this.state--;
                this.invalidateSkinState();
            }
        }

        private onNextButtonClick(event:egret.TouchEvent):void
        {
            if(this.state == 4)
            {
                egret.gui.PopUpManager.removePopUp(this);
            }
            else
            {
                this.state++;
                this.invalidateSkinState();
            }
        }

        private state:number = 1;
        public getCurrentSkinState():string
        {
            return "s"+this.state;
        }
    }
}