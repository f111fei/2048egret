

module game {

    export class MainMenuUI extends egret.SkinnableComponent{
        public addLabel:egret.Label;
        public scoreLabel:egret.Label;
        public highScoreLabel:egret.Label;
        public resetButton:egret.Button;

        public constructor(){
            super();
            this.skinName = MainMenuUISkin;
            this.addEventListener(egret.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
        }

        public createCompleteEvent(event:egret.UIEvent):void{
            this.removeEventListener(egret.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
            ApplicationFacade.getInstance().registerMediator( new MainMenuMediator(this) );
        }

        public partAdded(partName:string, instance:any):void{
            super.partAdded(partName , instance);
            if(this.addLabel == instance){
                this.addLabel.visible = false;
            }
        }
        
        private moveEffect_effectEndHandler():void
        {
            this.addLabel.visible = false;
        }
		
		/**
		 * 加分效果
		 */
        public playScoreEffect(addScore:number):void{
            this.addLabel.visible = true;
            this.addLabel.text = "+".concat(addScore.toString());
            egret.Tween.removeTweens(this.addLabel);
            this.addLabel.y = 25;
            egret.Tween.get(this.addLabel).to({y:0},300).call(this.moveEffect_effectEndHandler , this);
		}
	}
}