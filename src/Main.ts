/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

class Main extends egret.Sprite{

    /**
     * 加载进度界面
     */
    private loadingView:LoadingUI;

    public constructor() {
        super();
        this.init();
    }

    private appContainer:game.AppContainer;

    private init():void
    {
        egret.Profiler.getInstance().run();

        //注入自定义的解析器
        egret.Injector.mapClass("egret.gui.IAssetAdapter",AssetAdapter);
        egret.gui.Theme.load("resource/theme.thm");

        //初始化UIStage
        this.appContainer = new game.AppContainer();
        this.addChild(this.appContainer);

        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.loadConfig("resource/resource.json","resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     */
    private onConfigComplete(event:RES.ResourceEvent):void{
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
        RES.loadGroup("loading",1);
        RES.loadGroup("preload");
    }
    /**
     * preload资源组加载完成
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if(event.groupName=="loading"){
            //设置加载进度界面
            this.loadingView  = new LoadingUI();
            this.appContainer.addElement(this.loadingView);
        }
        else if(event.groupName=="preload"){
            this.appContainer.removeElement(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
            this.createGameScene();
        }
    }
    /**
     * preload资源组加载进度
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if(event.groupName=="preload"){
            this.loadingView.setProgress(event.itemsLoaded,event.itemsTotal);
        }
    }

    /**
     * 创建游戏场景
     */
    private createGameScene():void {
        //注入自定义的弹出层管理器,写在这里是因为初始化的时候UIStage还没初始化完毕，直接new会报错
        var popImpl:egret.gui.PopUpManagerImpl = new egret.gui.PopUpManagerImpl();
        popImpl.modalAlpha = 0;
        egret.Injector.mapValue("egret.gui.IPopUpManager", popImpl);

        game.ApplicationFacade.getInstance().startUp(this.appContainer);
        game.ApplicationFacade.getInstance().sendNotification(game.SceneCommand.CHANGE,1);
    }
}