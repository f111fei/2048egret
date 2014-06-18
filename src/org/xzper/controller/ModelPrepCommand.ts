

/// <reference path="../../../lib/puremvc-typescript-standard-1.0.d.ts"/>
/// <reference path="../model/GameProxy.ts"/>
/// <reference path="../model/GridProxy.ts"/>

module game {

	export class ModelPrepCommand extends puremvc.SimpleCommand implements puremvc.ICommand{

		public constructor(){
			super();
		}
		public execute(notification:puremvc.INotification):void{
			this.facade.registerProxy( new GameProxy() );
			this.facade.registerProxy( new GridProxy() );
		}
	}
}