/**
 * Created by xzper on 2014/11/15.
 */

module game {

    export class GameScreen extends egret.gui.SkinnableComponent {

        public constructor() {
            super();
            this.skinName = skin.MainGameUISkin;
            this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
        }

        public createCompleteEvent(event:egret.gui.UIEvent):void{
            this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
            ApplicationFacade.getInstance().registerMediator( new GameScreenMediator(this) );
        }

        public gameMenuUI:GameMenuUI;
        public gameSceneUI:GameScene;
    }
}