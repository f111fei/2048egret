/**
 * Created by xzper on 2014/11/15.
 */

module game {

    export class SettingWindowMediator extends puremvc.Mediator implements puremvc.IMediator{
        public static NAME:string = "SettingWindowMediator";

        public constructor(viewComponent:any){
            super(SettingWindowMediator.NAME, viewComponent);
            this.settingWindow.howtoplayButton.addEventListener(egret.TouchEvent.TOUCH_TAP , this.howtoplayButtonClick, this);
            this.settingWindow.aboutButton.addEventListener(egret.TouchEvent.TOUCH_TAP , this.aboutButtonClick, this);
            this.settingWindow.resumeButton.addEventListener(egret.TouchEvent.TOUCH_TAP , this.resumeButtonClick, this);
            this.settingWindow.restartButton.addEventListener(egret.TouchEvent.TOUCH_TAP , this.restartButtonClick, this);
            this.settingWindow.quitButton.addEventListener(egret.TouchEvent.TOUCH_TAP , this.quitButtonClick, this);
            this.settingWindow.yesButton.addEventListener(egret.TouchEvent.TOUCH_TAP , this.yesButtonClick, this);
            this.settingWindow.noButton.addEventListener(egret.TouchEvent.TOUCH_TAP , this.resumeButtonClick, this);
        }

        private howtoplayButtonClick(event:egret.TouchEvent):void
        {
            var howtoPlay:HowtoplayWindow = new HowtoplayWindow();
            egret.gui.PopUpManager.addPopUp(howtoPlay,true);
        }

        private aboutButtonClick(event:egret.TouchEvent):void
        {
            var about:AboutWindow = new AboutWindow();
            egret.gui.PopUpManager.addPopUp(about,true);
        }

        private resumeButtonClick(event:egret.TouchEvent):void
        {
            egret.gui.PopUpManager.removePopUp(this.settingWindow);
        }

        private restartButtonClick(event:egret.TouchEvent):void
        {
            this.settingWindow.setWindowType("restart");
        }

        private quitButtonClick(event:egret.TouchEvent):void
        {
            this.settingWindow.setWindowType("quit");
        }

        private yesButtonClick(event:egret.TouchEvent):void
        {
            egret.gui.PopUpManager.removePopUp(this.settingWindow);
            if(this.settingWindow.type=="restart")
            {
                this.sendNotification(GameCommand.START_GAME);
            }
            else if(this.settingWindow.type=="quit")
            {
                this.sendNotification(GameCommand.FINISH_GAME);
            }
        }


        public listNotificationInterests():Array<any>{
            return [
            ];
        }

        public handleNotification(notification:puremvc.INotification):void{
            switch(notification.getName()){

            }
        }

        public get settingWindow():SettingWindow{
            return <SettingWindow><any> (this.viewComponent);
        }
    }
}