

module game {

	export class ApplicationMediator extends puremvc.Mediator implements puremvc.IMediator{
		public static NAME:string = "ApplicationMediator";
		public constructor(viewComponent:any){
			super(ApplicationMediator.NAME, viewComponent);
        }

		public listNotificationInterests():Array<any>{
			return [];
		}
		
		public handleNotification(notification:puremvc.INotification):void{
			switch(notification.getName()){
			}
		}
		
		public get main():AppContainer{
			return <AppContainer><any> (this.viewComponent);
		}
	}
}