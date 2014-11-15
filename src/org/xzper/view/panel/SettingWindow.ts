/**
 * Created by xzper on 2014/11/15.
 */
module game {

    export class SettingWindow extends egret.gui.TitleWindow {

        public constructor() {
            super();
            this.title = "Settings";
            this.skinName = skin.SettingScreenSkin;
            this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
        }

        public createCompleteEvent(event:egret.gui.UIEvent):void{
            this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
            ApplicationFacade.getInstance().registerMediator( new SettingWindowMediator(this) );
        }

        public howtoplayButton:egret.gui.Button;
        public musicButton:egret.gui.ToggleButton;
        public soundButton:egret.gui.ToggleButton;
        public moreButton:egret.gui.Button;
        public aboutButton:egret.gui.Button;

        public resumeButton:egret.gui.Button;
        public restartButton:egret.gui.Button;
        public quitButton:egret.gui.Button;

        public yesButton:egret.gui.Button;
        public noButton:egret.gui.Button;

        private _type:string;

        public get type():string
        {
            return this._type;
        }

        /**
         * 设置窗口显示类型
         * @param type
         */
        public setWindowType(type:string):void
        {
            this._type = type;
            this.invalidateSkinState();
        }

        public getCurrentSkinState():string
        {
            return this._type;
        }

        public partAdded(partName:string, instance:any):void{
            super.partAdded(partName, instance);
            if(instance ==this.closeButton)
            {
                this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onCloseButtonClick , this);
            }
        }

        private onCloseButtonClick(event:egret.TouchEvent):void
        {
            egret.gui.PopUpManager.removePopUp(this);
        }

    }
}