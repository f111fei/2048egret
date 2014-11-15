/**
 * Created by xzper on 2014/11/15.
 */

module game {

    export class SceneCommand extends puremvc.SimpleCommand implements puremvc.ICommand{

        public constructor(){
            super();
        }
        public static NAME:string = "SceneCommand";

        /**
         * 切换场景
         */
        public static CHANGE:string = "scene_change";

        /**
         * 显示设置界面
         */
        public static SHOW_SETTING:string = "scene_setting";

        /**
         * 显示结束窗口
         */
        public static SHOW_END:string = "scene_end";

        /**
         * 注册消息
         */
        public register():void{
            this.facade.registerCommand(SceneCommand.CHANGE , SceneCommand);
            this.facade.registerCommand(SceneCommand.SHOW_SETTING , SceneCommand);
            this.facade.registerCommand(SceneCommand.SHOW_END , SceneCommand);
        }

        public execute(notification:puremvc.INotification):void{
            var data:any = notification.getBody();
            var appMediator:ApplicationMediator =
                <ApplicationMediator><any>this.facade.retrieveMediator(ApplicationMediator.NAME);
            switch(notification.getName()){
                case SceneCommand.CHANGE:{
                    if(data == 1)
                        appMediator.main.enterStartScreen();
                    else
                        appMediator.main.enterGameScreen();
                    break;
                }
                case SceneCommand.SHOW_SETTING:{
                    appMediator.main.showSettingWindow(data);
                    break;
                }
                case SceneCommand.SHOW_END:{
                    egret.setTimeout(function():void{
                        appMediator.main.showEndWindow();
                    },this,300);
                    break;
                }
            }
        }
    }
}