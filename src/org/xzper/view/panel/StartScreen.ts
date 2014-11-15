/**
 * Created by xzper on 2014/11/15.
 */

module game {

    export class StartScreen extends egret.gui.SkinnableComponent {

        public constructor() {
            super();
            this.skinName = skin.StartScreenSkin;
            this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
        }

        public createCompleteEvent(event:egret.gui.UIEvent):void{
            this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
            ApplicationFacade.getInstance().registerMediator( new StartScreenMediator(this) );
        }

        public playButton:egret.gui.Button;
        public settingButton:egret.gui.Button;
        public levelButton:IconButton;


        public partAdded(partName:string, instance:any):void{
            super.partAdded(partName, instance);
        }
    }
}