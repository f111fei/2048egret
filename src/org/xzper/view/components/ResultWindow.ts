

/// <reference path="../../../../egret.d.ts"/>
/// <reference path="../../ApplicationFacade.ts"/>
/// <reference path="../ResultWindowMediator.ts"/>
/// <reference path="skin/ContinueButtonSkin.ts"/>
/// <reference path="skin/ResetButtonSkin.ts"/>
/// <reference path="skin/ResultWindowSkin.ts"/>

module game {

	export class ResultWindow extends egret.SkinnableComponent{
		public resultUI:egret.UIAsset;
		public button:egret.Button;
		
		public constructor(){
			super();
            this.skinName = ResultWindowSkin;
			this.addEventListener(egret.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
		}
		
		public createCompleteEvent(event:egret.UIEvent):void{
            this.updataSkin();

			this.removeEventListener(egret.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
			ApplicationFacade.getInstance().registerMediator( new ResultWindowMediator(this) );
		}
		
		private _won:boolean = false;
		/**
		 * 设置文本
		 */
		public get won():boolean{
			return this._won;
		}
		
		private textChanged:boolean;
		public set won(value:boolean){
			if(value == this._won)
				return;
			this.textChanged = true;
			this._won = value;
			this.invalidateProperties();
		}
		
		public commitProperties():void{
			super.commitProperties();
			if(this.textChanged)
            {
                this.updataSkin();
			}
		}

        private updataSkin():void
        {
            if(this._won)
            {
                this.resultUI.source = "source.result_sucess";
                this.button.skinName = ContinueButtonSkin;
            }
            else
            {
                this.resultUI.source = "source.result_failed";
                this.button.skinName = ResetButtonSkin;
            }
        }
	}
}