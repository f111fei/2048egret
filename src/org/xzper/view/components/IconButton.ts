/**
 * Created by xzper on 2014/11/15.
 */

module game {
    /**
     * 带图标的按钮
     */
    export class IconButton extends egret.gui.Button {

        public constructor() {
            super();
            this.skinName = skin.components.IconButtonSkin;
        }

        /**
         * 要显示的图片
         */
        public iconDisplay:egret.gui.UIAsset;

        private _icon:any;
        /**
         * 图标
         */
        public get icon():any
        {
            return this._icon;
        }

        public set icon(value:any)
        {
            if(value == this._icon)
                return;
            this._icon = value;
            if(this.iconDisplay){
                this.iconDisplay.source = value;
            }
        }

        public partAdded(partName:string, instance:any):void{
            super.partAdded(partName, instance);

            if (instance == this.iconDisplay){
                this.iconDisplay.source = this._icon;
            }
        }

    }
}