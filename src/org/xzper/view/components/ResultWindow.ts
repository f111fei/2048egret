
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
			this.removeEventListener(egret.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
			ApplicationFacade.getInstance().registerMediator( new ResultWindowMediator(this) );
		}

        private _win:boolean = false;
        public get win():boolean{
            return this._win;
        }

        public set win(value:boolean){
            if(value == this._win)
                return;
            this._win = value;
            this.invalidateSkinState();
        }

        public getCurrentSkinState():string {
            return this.win?"win":"failed";
        }
	}
}