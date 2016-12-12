

module game {

    export class StartupCommand extends puremvc.MacroCommand {

        public constructor() {
            super();
        }
        public initializeMacroCommand(): void {
            this.addSubCommand(ControllerPrepCommand);
            this.addSubCommand(ModelPrepCommand);
            this.addSubCommand(ViewPrepCommand);
        }
    }
}