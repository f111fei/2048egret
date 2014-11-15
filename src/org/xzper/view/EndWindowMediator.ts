/**
 * Created by xzper on 2014/11/16.
 */
/**
 * Created by xzper on 2014/11/15.
 */

module game {

    export class EndWindowMediator extends puremvc.Mediator implements puremvc.IMediator{
        public static NAME:string = "EndWindowMediator";

        public constructor(viewComponent:any){
            super(EndWindowMediator.NAME, viewComponent);
            this.endWindow.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP , this.buttonClick, this);
            this.endWindow.retryButton.addEventListener(egret.TouchEvent.TOUCH_TAP , this.buttonClick, this);
            this.endWindow.returnButton.addEventListener(egret.TouchEvent.TOUCH_TAP , this.buttonClick, this);
            this.endWindow.addEventListener(egret.Event.ADDED_TO_STAGE , this.initData , this);
            this.initData();
        }

        /**
         * 初始化显示数据
         */
        private initData(event:egret.Event = null):void
        {
            var proxy:GameProxy = <GameProxy><any>this.facade.retrieveProxy(GameProxy.NAME);
            this.endWindow.highScoreLabel.text = CommonData.highScore.toString();
            this.endWindow.totalScoreLabel.text = proxy.score.toString();
        }

        private buttonClick(event:egret.TouchEvent):void
        {
            egret.gui.PopUpManager.removePopUp(this.endWindow);
            if(event.currentTarget == this.endWindow.retryButton)
            {
                this.sendNotification(GameCommand.START_GAME);
            }
            else
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

        public get endWindow():EndWindow{
            return <EndWindow><any> (this.viewComponent);
        }
    }
}