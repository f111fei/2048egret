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
    }
}