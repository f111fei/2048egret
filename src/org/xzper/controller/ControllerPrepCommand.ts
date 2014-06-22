

/// <reference path="../../../lib/puremvc-typescript-standard-1.0.d.ts"/>
/// <reference path="commands/GameCommand.ts"/>

module game {

	export class ControllerPrepCommand extends puremvc.SimpleCommand implements puremvc.ICommand{

		public constructor(){
			super();
		}
		public execute(notification:puremvc.INotification):void{
            (new GameCommand()).register();
        }
	}
}