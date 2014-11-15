/**
 * Created by xzper on 2014/11/15.
 */
module game {

    /**
     * 游戏菜单
     */
    export class GameMenuUI extends egret.gui.SkinnableComponent {

        public constructor() {
            super();
            this.skinName = skin.GameMenuSkin;
            this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
        }

        public createCompleteEvent(event:egret.gui.UIEvent):void{
            this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
            ApplicationFacade.getInstance().registerMediator( new GameMenuMediator(this) );
        }

        private resetFlag:boolean = true;
        /**
         * 重置数据
         */
        public reset():void
        {
            this.resetFlag = true;
            this.invalidateProperties();
        }

        public commitProperties():void
        {
            if(this.resetFlag)
            {
                this.resetFlag = false;
                this.scoreLabel.text = "0";
                this.highScoreLabel.text = CommonData.highScore.toString();
                this.levelLabel.text = CommonData.level.toLocaleUpperCase();
                this.levelIcon.source = "level_small_"+CommonData.level;
            }
        }

        public scoreLabel:egret.gui.Label;
        public highScoreLabel:egret.gui.Label;
        public levelLabel:egret.gui.Label;
        public levelIcon:egret.gui.UIAsset;
        public pauseButton:egret.gui.Button;

    }
}