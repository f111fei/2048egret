/**
 * Created by xzper on 2014/11/15.
 */

module game {

    export class StartScreenMediator extends puremvc.Mediator implements puremvc.IMediator{
        public static NAME:string = "StartScreenMediator";

        public constructor(viewComponent:any){
            super(StartScreenMediator.NAME, viewComponent);

            this.setLevel(CommonData.level);

            this.startScreen.levelButton.addEventListener(egret.TouchEvent.TOUCH_TAP , this.levelButtonClick, this);
            this.startScreen.playButton.addEventListener(egret.TouchEvent.TOUCH_TAP , this.startButtonClick, this);
            this.startScreen.settingButton.addEventListener(egret.TouchEvent.TOUCH_TAP , this.settingButtonClick, this);
        }

        private settingButtonClick(event:egret.TouchEvent):void
        {
            this.sendNotification(SceneCommand.SHOW_SETTING,"setting");
        }

        private levelButtonClick(event:egret.TouchEvent):void
        {
            if(CommonData.level==Level.EASY)
                this.setLevel(Level.NORMAL);
            else if(CommonData.level==Level.NORMAL)
                this.setLevel(Level.SPECIAL);
            else if(CommonData.level==Level.SPECIAL)
                this.setLevel(Level.EASY);
        }

        private setLevel(value:string):void
        {
            CommonData.level = value;
            this.startScreen.levelButton.label = value.toLocaleUpperCase();
            this.startScreen.levelButton.icon = "level_"+value;
        }

        private startButtonClick(event:egret.TouchEvent):void
        {
            this.sendNotification(GameCommand.START_GAME);
        }

        public listNotificationInterests():Array<any>{
            return [

            ];
        }

        public handleNotification(notification:puremvc.INotification):void{
            var data:any = notification.getBody();
            switch(notification.getName()){

            }
        }

        public get startScreen():StartScreen{
            return <StartScreen><any> (this.viewComponent);
        }
    }
}