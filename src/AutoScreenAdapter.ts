/**
 * Created by xzper on 2015/9/25.
 */
class AutoScreenAdapter extends egret.HashObject implements egret.sys.IScreenAdapter {

    /**
     * @private
     */
    public constructor() {
        super();
    }

    /**
     * @private
     * 计算舞台显示尺寸
     * @param scaleMode 当前的缩放模式
     * @param screenWidth 播放器视口宽度
     * @param screenHeight 播放器视口高度
     * @param contentWidth 初始化内容宽度
     * @param contentHeight 初始化内容高度
     */
    public calculateStageSize(scaleMode:string, screenWidth:number, screenHeight:number,
                              contentWidth:number, contentHeight:number):egret.sys.StageDisplaySize {


        if(egret.MainContext.deviceType == egret.MainContext.DEVICE_MOBILE)
        {
            scaleMode = egret.StageScaleMode.SHOW_ALL;
        }
        else
        {
            if(screenHeight > contentHeight && screenWidth > contentWidth) {
                scaleMode = egret.StageScaleMode.NO_SCALE;
            }
            else
                scaleMode = egret.StageScaleMode.SHOW_ALL;
        }

        var displayWidth = contentWidth;
        var displayHeight = contentHeight;
        var stageWidth = contentWidth;
        var stageHeight = contentHeight;
        var scaleX = (screenWidth / stageWidth) || 0;
        var scaleY = (screenHeight / stageHeight) || 0;
        switch (scaleMode) {
            case egret.StageScaleMode.SHOW_ALL:
                if (scaleX > scaleY) {
                    displayWidth = Math.round(stageWidth * scaleY);
                    displayHeight = Math.round(stageHeight * scaleY);
                }
                else {
                    displayWidth = Math.round(stageWidth * scaleX);
                    displayHeight = Math.round(stageHeight * scaleX);
                }
                break;
            default :
                break;
        }
        return {
            stageWidth: stageWidth,
            stageHeight: stageHeight,
            displayWidth: displayWidth,
            displayHeight: displayHeight
        };
    }
}