

/// <reference path="../../../lib/puremvc-typescript-standard-1.0.d.ts"/>
/// <reference path="ControllerPrepCommand.ts"/>
/// <reference path="ModelPrepCommand.ts"/>
/// <reference path="ViewPrepCommand.ts"/>

module game {

	export class StartupCommand extends puremvc.MacroCommand{

		public constructor(){
			super();
		}
		public initializeMacroCommand():void{
			this.addSubCommand(ControllerPrepCommand);
			this.addSubCommand(ModelPrepCommand);
			this.addSubCommand(ViewPrepCommand);
		}
	}
}