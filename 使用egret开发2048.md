#### 写在前面

本游戏使用Egret的GUI进行开发，不涉及Egret基础部分内容。本实例强烈建议结合GUIExample和深入浅出EGRET GUI系列教程来学习。

要了解Egret基础部分的内容请参考下面：

* [ 官方引导 ](https://github.com/egret-labs/egret-core)
* [ NeoGuo的教程 ](https://github.com/NeoGuo/html5-documents/tree/master/egret)


Egret GUI 相关教程：

* [ 官方DEMO ](https://github.com/egret-labs/egret-examples/tree/master/GUIExample)
* [ 深入浅出EGRET GUI (一):皮肤分离机制 ](http://bbs.egret-labs.org/thread-43-1-1.html)
* [ 深入浅出EGRET GUI (二):失效验证机制 ](http://bbs.egret-labs.org/thread-73-1-1.html)
* [ 深入浅出EGRET GUI (三):AFL自适应流式布局 ](http://bbs.egret-labs.org/thread-102-1-1.html)

---

2048是最近很火的一个小游戏，[原版](http://gabrielecirulli.github.io/2048/) 就是用JavaScript写的。恰巧最近Egret PublicBeta，观望和学习了一阵后，发现egret正好适合开发这类游戏。Egret使用TypeScript作为开发语言，最终编译为JavaScript，正好和原始版本PK一下。

游戏预览：[点我体验](http://xzper.com/project/2048egret/)

**1.准备开始**

在开始之前，我们需要学习一下TypeScript和阅读官方的教程从Egret开发环境的部署到创建，编译，发布项目，以及Egret相关工具。在安装好开发环境后，在工作空间目录下使用命令行，创建2048egret新项目

	egret create 2048egret

**2.准备素材**

每一个游戏都离不开美术资源，我们需要做的就是把美术资源打包，然后加载进来使用。这一方面egret有一套完整的工作流。

**①资源打包**

这里我们用到的资源主要有按钮，背景，文字以及数字这些图片。我们选择把这些图片都打包在一起合成一张大图就像 [这样](http://xzper.com/project/2048egret/resource/assets/source.png) 和 [这样](http://xzper.com/project/2048egret/resource/assets/number.png) 这样做可以减少URL请求数，还能减少资源的体积，把一些具有相同特征的图片放在一起便于管理。在egret里面这种类型的资源就是sheet。只有图片是不够的，还需要一个json描述文件来说明这张图每一张小图片的位置和大小。目前已经有成熟的工具来生成sheet和json。这里我用到的是 [ShoeBox](http://www.renderhjs.net/shoebox/) 配合这个 [插件](https://github.com/runinspring/egretTools) 来生成egret能识别的json。安装好插件后， 将每一张图片命名，然后将这些图片选中拖入Sprites Sheet中然后配置好生成的文件名点击save就能得到一张大图和一个json了，将图片和json放入"resource/assets/"文件夹下以备使用。此外ShoeBox还能读取swf将MovieClip导出为这种大图，按每一帧自动命名，这里的number.png就是这样导出的，下面有原始素材下载地址。

**②资源加载**

接下来我们需要生成一个资源描述文件resource.json，在游戏开始之前读取这个json来加载对应的文件。egret的资源加载机制可以参考 [这里](https://github.com/egret-labs/egret-core/wiki/Using%20Resource%20System) 现在已经有 [工具](http://bbs.egret-labs.org/thread-48-1-1.html) 能自动生成这个resource.json了。按照下图配置。**注意：虽然我们的资源有图片，但是对应的json文件已经记录了图片的位置，所以在这个工具中我们不需要添加对应的图片只添加json文件就行了。**

<center>![](http://xzper.qiniudn.com/2014/06/ResTool.png)</center>

在项目初始化时，使用RES加载资源，简单明了。

	private onAddToStage(event:egret.Event){
        ........
        ........
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.loadConfig("resource/resource.json","resource/");
    }

    /**
     *配置文件加载完成,开始预加载preload资源组。
     */
    private onConfigComplete(event:RES.ResourceEvent):void{
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
        RES.loadGroup("preload");
    }

**③资源使用**

在项目中我们可以使用RES来使用资源，参照对应的API。对于没有写进配置文件的资源使用RES.getResByUrl方法来异步获取。开发人员能使用极其少量的代码来完成各类资源的加载。

**3.更改模板生成的代码**

**①修改细节**

默认的文档类是GameApp。我觉得还是叫Main比较亲切，修改类名称，然后修改项目目录下的egretProperties.json文件，将document_class的值改为Main

	{
	    "document_class" : "Main",
	    "native": {
	        "path_ignore": [
	            "libs"
	        ]
	    }
	}

默认生成的html的背景是黑色的，这里全部改成白色。将index.html里面的背景替换成#ffffff。

默认尺寸是480x800的尺寸。由于我们使用的部分图片宽度大于500，以及部分PC的分辨率太小为了不出现垂直滚动条影响体验，将尺寸换成520x650。这个不影响移动设备上的尺寸，移动设备默认是自适应宽度的。

index.html中

	<div style="display:inline-block;width:100%; height:100%;margin: 0 auto; background: #ffffff; position:relative;" id="gameDiv">
	    <canvas id="gameCanvas" width="520" height="650" style="background-color: #ffffff"></canvas>
	</div>

egret_loader.js中

    //设置屏幕适配策略
    egret.StageDelegate.getInstance().setDesignSize(520, 650);
    context.stage = new egret.Stage();
    var scaleMode =  egret.MainContext.deviceType == egret.MainContext.DEVICE_MOBILE ? egret.StageScaleMode.SHOW_ALL : egret.StageScaleMode.NO_SCALE;
    context.stage.scaleMode = scaleMode;

**③引入第三方库pureMVC**

这次我们要使用到一个mvc开发框架-pureMVC，熟悉as3的朋友一定也对这个框架不陌生吧。不熟悉的也没关系，这个框架不是这次的主角。我们从 [这里](https://github.com/PureMVC/puremvc-typescript-standard-framework) 下载pureMVC的TypeScript版本。得到puremvc-typescript-standard-1.0.d.ts 和 puremvc-typescript-standard-1.0.js这两个文件，其实.d.ts就类似于c++里面的.h头文件，只有空方法和空属性，真正的实现是在js文件或者ts文件里面。在项目里面的src文件夹下建立一个puremvc的文件夹，将这个js文件和d.ts文件放进去。然后在项目根目录下建立一个puremvc.json的文件内容如下

	{
	    "name": "puremvc",
	    "source":"src/puremvc/",
	    "file_list": [
	        "puremvc-typescript-standard-1.0.js",
	        "puremvc-typescript-standard-1.0.d.ts"
	    ]
	}

这样就表示配置了一个第三方模块。之后在编译器编译时会把相应的模块对应的js文件夹编译进libs文件夹下。项目里面我们还使用了gui模块，这些模块的配置是在egretProperties.json中，部分代码如下

	"modules": [
		{
			"name": "core"
		},
		{
			"name": "gui"
		},
        {
            "name": "puremvc","path":"."
        }
	],

**④注入AssetAdapter和SkinAdapter**

我们这次的主角是egret的GUI。找到官方<a href="https://github.com/egret-labs/egret-examples" target="_blank">GUIExample</a>中的这两个ts文件复制到项目的src文件夹下面，由于这个项目没有用到默认皮肤，删除ShinAdapter里面getDefaultSkin方法的默认皮肤。最后不要忘了一点，在引擎初始化的时候注入这两个Adapter。

	private onAddToStage(event:egret.Event){
	        //注入自定义的素材解析器
	        egret.Injector.mapClass("egret.gui.IAssetAdapter",AssetAdapter);
	        //注入自定义的皮肤解析器
	        egret.Injector.mapClass("egret.gui.ISkinAdapter",SkinAdapter);
	        ......
	        ......
	}

这两个的Adapter的作用至关重要，AssetAdapter负责解释UIAsset的source属性 ，SkinAdapter负责解释SkinnableCompent的skinName属性。这里官方提供了两个默认已经写好了的，当然我们可以自己扩展。 没有他们，UIAsset素材包装器的source属性 和 可设置皮肤的GUI组件的skinName属性毫无作用。而这两种组件是今后使用最多的。不信可以往下看 。

**⑤修改createGameScene方法**

在生成的模板中，文档类Main在经过一系列的前期准备工作之后，终于轮到GUI组件的老大UIStage上场了。UIStage类似于Flex里面的SystemManager，内置弹出窗口层，工具提示层和鼠标样式层，所有的GUI组件都应该添加到他的下面，并且UIStage全局唯一。  这里我们实现了一个AppContainer继承自UIStage。 同时在这里pureMVC框架正式启动，开始运作。

	/**
     * 创建游戏场景
     */
    private createGameScene():void {
        var appContainer:game.AppContainer = new game.AppContainer();
        this.addChild(appContainer);
        game.ApplicationFacade.getInstance().startUp(appContainer);
    }

**4.pureMVC**

**①Mediator**

Mediator(中介器)是连接视图也就是egret的GUI和pureMVC的桥梁。Mediator受到消息时(handleNotification)调用GUI组件的方法和设置属性，来改变视图。或者视图发生改变时通知Mediator由其发送消息到pureMVC(sendNotification)。

**ApplicationMediator** 监听键盘事件或者手势发送消息到GameCommand通知移动

**MainGameMediator** 接收消息，调用MainGameUI的方法处理格子的移动，添加，删除，重置，以及接收游戏结果，显示结果面板

**MainMenuMediator** 接收更新分数的消息，调用MainGameUI的方法更新分数与重置

**ResultWindowMediator** 发送游戏重置的消息，以及自销毁。

**②Command**

command属于控制器。负责收发消息和处理简单的事务。在StartupCommand中使用ControllerPrepCommand，ModelPrepCommand，ViewPrepCommand三个子任务。分别注册控制器，数据和视图。

**GameCommand** 处理各类事务。比如 玩家按下了方向键，收到消息调用GridProxy的移动方法改变数据，比如GridProxy移动格子分数改变了，通知GameCommand 调用GameProxy的更新分数方法改变分数，比如处理重置游戏的事务，通知各个数据模块重置数据

**③Proxy**

处理数据，提供公共方法供Command调用以改变数据。改变数据了然后sendNotification通知Mediator改变视图。

**GameProxy** 处理游戏数据，比如更新分数，处理游戏结果

**GridProxy** 这个游戏的核心数据，操作每一个格子的数据，通知视图格子的移动，添加，删除，重置。这里包含2048这个游戏的精髓。有兴趣的可以研究下，源码里面有详细注释，这篇文章不做重点讲解。

**5.egret的GUI**

**①制作菜单-------认识皮肤部件**

先来看看菜单长什么样子

![](http://xzper.qiniudn.com/2014/06/菜单.jpg)

我们会发现这个菜单。有些是静态文本，是一直不变的，我偷懒直接用了一张图片代替了，图片可以用egret.gui.UIAsset。

还有当前得分和最高分已经那个向上飘的数字是动态的，可以选用egret.gui.Label这个组件。

一个重试按钮，既然已经说了是按钮了我们就用egret.gui.Button好了。

接下来我们要做到皮肤和组件分离。那几个需要参与逻辑的组件自然就成了皮肤部件了。来看看MainMenuUISkin：

	/**
     * 和主机组件匹配的皮肤部件
     */
    private static _skinParts:Array&lt;string&gt; = ["addLabel","scoreLabel","highScoreLabel","resetButton"];

    public get skinParts():Array&lt;string&gt;{
        return MainMenuUISkin._skinParts;
    }

    /**
     * 加分文本
     */
    public addLabel:egret.gui.Label;

    /**
     * 总分文本
     */
    public scoreLabel:egret.gui.Label;

    /**
     * 最高分文本
     */
    public highScoreLabel:egret.gui.Label;

    /**
     * 重置按钮
     */
    public resetButton:egret.gui.Button;

    public createChildren():void
    {
        super.createChildren;
        var uiAsset:egret.gui.UIAsset = new egret.gui.UIAsset();
        uiAsset.source = "source.menu";
        this.addElement(uiAsset);

        this.resetButton = new egret.gui.Button();
        this.resetButton.skinName = ResetButtonSkin;
        this.resetButton.right = 10;
        this.resetButton.top = 80;
        this.resetButton.label = "重置游戏";
        this.addElement(this.resetButton);

        this.highScoreLabel = new egret.gui.Label();
        ...省略若干代码
        this.scoreLabel = new egret.gui.Label();
        ...省略若干代码
        this.addLabel = new egret.gui.Label();
        ...省略若干代码
    }

篇幅有限，省略了createChildren方法里面的子组件布局。**skin的createChildren方法是在皮肤和主机组件匹配的时候被调用的。皮肤和主机组件匹配是在主机组件被添加到显示列表的时候完成的。所以只要主机组件hostComponent还没有添加到显示舞台，获取hostComponent的皮肤部件都是无效的。**这也是为什么我将Mediator的注册放在GUI组件的createComplete后。以防Mediator访问出现空对象的情况。

再来看看主机组件MainMenuUI是怎么写的。

	export class MainMenuUI extends egret.gui.SkinnableComponent{
        public addLabel:egret.gui.Label;
        public scoreLabel:egret.gui.Label;
        public highScoreLabel:egret.gui.Label;
        public resetButton:egret.gui.Button;

        public constructor(){
            super();
            this.skinName = MainMenuUISkin;
            this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
        }

        public createCompleteEvent(event:egret.gui.UIEvent):void{
            this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
            ApplicationFacade.getInstance().registerMediator( new MainMenuMediator(this) );
        }

        public partAdded(partName:string, instance:any):void{
            super.partAdded(partName , instance);
            if(this.addLabel == instance){
                this.addLabel.visible = false;
            }
        }

        private moveEffect_effectEndHandler():void
        {
            this.addLabel.visible = false;
        }

	    /**
		* 加分效果
		*/
        public playScoreEffect(addScore:number):void{
            this.addLabel.visible = true;
            this.addLabel.text = "+".concat(addScore.toString());
            egret.Tween.removeTweens(this.addLabel);
            this.addLabel.y = 25;
            egret.Tween.get(this.addLabel).to({y:0},300).call(this.moveEffect_effectEndHandler , this);
		}
   }

在构造函数里面赋值skinName传入皮肤的类引用，这个解析过程就是SkinAdapter完成的。 可以看到主机组件有一个partAdded进行皮肤组件的配对。这个时候我们就可以获取到对应的皮肤组件，来进行操作了，

**②制作游戏区域--------了解九宫格和容器布局**

![](http://xzper.qiniudn.com/2014/06/游戏演示.png)

再次来观察这个游戏的主界面。有一张纯色的背景图，还有4x4个空白的格子，随着游戏的进行会多出带数字的格子，游戏结束了还会出现胜利的界面。

先来看看第一张图。也许你认为这个背景一张4x4的图片不就搞定了么。不过我们这个2048单元格的数量可是可以任意调整的，可以是5x5，或者6x6甚至更多，这样才具备灵活性。你只需要改变CommandData的size属性就可以了(PS:游戏胜利的条件默认是达成2048，也可以通过修改CommandData的winValue属性来修改条件比如8192时胜利或者像上面那样32的时候胜利，想不输都难)。

我们继承SkinnableContainer建立一个MainGameUI的类作为容器来显示上面的界面，当然同时还需要一个皮肤MainGameUISkin。先来确定skinParts，如下：

	/**
     * 和主机组件匹配的皮肤部件
     */
    private static _skinParts:Array&lt;string&gt; = [
        "tileGroup","contentGroup"
    ];

    public get skinParts():Array&lt;string&gt;{
        return MainGameUISkin._skinParts;
    }

    /**
     * 游戏底背景
     */
    private backUIAsset:egret.gui.UIAsset;

    /**
     * 背景格子容器
     */
    private backGroundGroup:egret.gui.Group;

    /**
     * 格子容器
     */
    public tileGroup:egret.gui.Group;

    /**
     * 内容
     */
    public contentGroup:egret.gui.Group;

游戏游戏的底背景backUIAsset和背景格子容器backGroundGroup由于逻辑组件MainGameUI不需要关心所有这里不将其设置为skinParts。tileGroup是放置单元格的容器，contentGroup是SkinnableContainer的皮肤部件，SkinnableContainer的addElement方法实际上是添加到这个里面，换言之如果皮肤缺少这个contentGroup那么调用MainGameUI的addElement是看不到你要添加的子项的。 然后override这个createChildren方法将这些组件加入到显示列表。

	public createChildren():void
    {
        super.createChildren;
        this.backUIAsset = new egret.gui.UIAsset();
        this.backUIAsset.source = "source.background";
        //使用九宫格
        this.backUIAsset.scale9Grid = new egret.gui.Rectangle(20, 20, 65, 65);
        this.backUIAsset.width = CommonData.size*(TileUI.size + this.gap) + this.gap;
        this.backUIAsset.height = this.backUIAsset.width;
        this.addElement(this.backUIAsset);

        //使用格子布局
        var layout:egret.gui.TileLayout = new egret.gui.TileLayout();
        layout.columnCount = layout.rowCount = CommonData.size;
        layout.horizontalGap = layout.verticalGap = this.gap;
        this.backGroundGroup = new egret.gui.Group();
        this.backGroundGroup.x = this.backGroundGroup.y = this.gap;
        this.backGroundGroup.layout = layout;
        this.addElement(this.backGroundGroup);
        this.initBackGround(CommonData.size);

        this.tileGroup = new egret.gui.Group();
        this.tileGroup.x = this.tileGroup.y = this.gap;
        this.addElement(this.tileGroup);

        this.contentGroup = new egret.gui.Group();
        this.contentGroup.percentHeight = this.contentGroup.percentWidth = 100;
        this.contentGroup.touchEnabled = false;
        this.addElement(this.contentGroup);
    }

先看backUIAsset，由于图片素材只是一个小的纯色圆角矩形，使用scale9Grid属性来设置九宫格缩放，这样设置了宽高就不会变形了。这里backGroundGroup设置了一个layout来确定布局。设置好间距以及行列数，向容器里面添加子项时就自动设置了位置了，不需要设置子项的x，y属性。TileLayout会自动布局。

	private initBackGround(size:number):void{
            //背景格子
            var tile:egret.gui.UIAsset;
            var totalNum:number = size * size;
            for(var i:number = 0;i &lt; totalNum ; i++)
            {
                tile = new egret.gui.UIAsset();
                tile.width = tile.height = TileUI.size;
                tile.source = "source.backtile";
                this.backGroundGroup.addElement(tile);
            }
	}

**③制作单元格--------自定义属性**

单元格使用TileUI来定义。单元格有一个很重要的属性就是单元格的数据，这里使用value属性来表示。

	private valueChanged:boolean;
    private _value:number;
    /**
     * 格子的数字
     */
    public get value():number{
        return this._value;
    }

    public set value(value:number){
        if(value == this._value){
            return;
        }
        this.valueChanged = true;
        this._value = value;
        this.invalidateProperties();
    }

    public commitProperties():void{
        if(this.valueChanged){
            this.valueChanged = false;
            this.updateValue();
        }
    }

    private updateValue():void{
        var mi:number = Math.log(this._value)/Math.log(2);
        this.source = "number.number_"+mi;
    }

这里使用了invalidateProperties和commitProperties来完成属性的失效验证。当设置value的时候调用invalidateProperties，失效属性，GUI框架在下一次渲染的时候会调用commitProperties来完成属性的提交。失效验证简单说就是一种延迟应用改变的措施，这种失效验证在egret的GUI组件内部随处可见。这种自定义属性的例子只是其中之一，当组件的commitProperties方法被调用时组件已经准备完毕，所有的皮肤部件也匹配上了。这样也不用担心应用属性的时候报空的情况。这里通过设置TileUI的source属性来改变数字。还记得一开始的resource.json加载的number.json么。

	{
	"frames": {
		"number_1": {"x":106, "y":212, "w":105, "h":105, "offX":0,"offY":0,"sourceW":105,"sourceH":105},
		"number_10": {"x":0, "y":318, "w":105, "h":105, "offX":0,"offY":0,"sourceW":105,"sourceH":105},
		"number_11": {"x":0, "y":212, "w":105, "h":105, "offX":0,"offY":0,"sourceW":105,"sourceH":105},
		"number_12": {"x":0, "y":106, "w":105, "h":105, "offX":0,"offY":0,"sourceW":105,"sourceH":105},
		"number_13": {"x":0, "y":0, "w":105, "h":105, "offX":0,"offY":0,"sourceW":105,"sourceH":105},
		"number_2": {"x":212, "y":318, "w":105, "h":105, "offX":0,"offY":0,"sourceW":105,"sourceH":105},
		"number_3": {"x":212, "y":212, "w":105, "h":105, "offX":0,"offY":0,"sourceW":105,"sourceH":105},
		"number_4": {"x":212, "y":106, "w":105, "h":105, "offX":0,"offY":0,"sourceW":105,"sourceH":105},
		"number_5": {"x":212, "y":0, "w":105, "h":105, "offX":0,"offY":0,"sourceW":105,"sourceH":105},
		"number_6": {"x":106, "y":318, "w":105, "h":105, "offX":0,"offY":0,"sourceW":105,"sourceH":105},
		"number_7": {"x":318, "y":0, "w":105, "h":105, "offX":0,"offY":0,"sourceW":105,"sourceH":105},
		"number_8": {"x":106, "y":106, "w":105, "h":105, "offX":0,"offY":0,"sourceW":105,"sourceH":105},
		"number_9": {"x":106, "y":0, "w":105, "h":105, "offX":0,"offY":0,"sourceW":105,"sourceH":105}
	
	},
	"file": "number.png"
	}

这个sheet记录的每一张图也有一个名称比如2这个数字就是number\_1加上number这个sheet名称使用"."符号连接，所以获取"2"这个数字的图片就可以这样写this.source = "number.number\_1"。根据值的不同取2的对数得到相应的下标数字。

**④制作胜负界面--------自定义组件状态**

游戏结束之后会出现胜负的界面。但是胜负界面应该是两套不同的素材，那么我们是不是可以制作两个皮肤来根据胜负来切换？这样当然可以。但是，还有一种更简单的办法就是使用自定义状态，只需要一个皮肤类就可以完成两种视图的切换。

新建一个ResultWindow类继承自SkinnableComponent，然后新建ResultWindowSkin。在ResultWindowSkin的构造函数中定义两个状态win和failed。

	public constructor(){
        super();
        this.states = ["win","failed"];
	}

然后加入两个皮肤部件button和resultUI

	private static _skinParts:Array<string> = ["button","resultUI"];

    public get skinParts():Array<string>{
        return ResultWindowSkin._skinParts;
    }

    /**
     * 按钮
     */
    public button:egret.gui.Button;

    /**
     * 结果文本
     */
    public resultUI:egret.gui.UIAsset;

在createChildren里面将皮肤部件布局好位置。最后重写commitCurrentState方法来根据对应的状态来改变部件的skin。

	public commitCurrentState():void {
        super.commitCurrentState();
        if(this.currentState == "win")
        {
            this.resultUI.source = "source.result_sucess";
            this.button.skinName = ContinueButtonSkin;
        }
        else
        {
            this.resultUI.source = "source.result_failed";
            this.button.skinName = ResetButtonSkin;
        }
    }

这样还没有完，我们需要在主机组件里面定义何时是何种状态，在ResultWindow中重写getCurrentSkinState来定义皮肤状态。

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

当外界设置win的值时调用invalidateSkinState来失效皮肤状态，在框架下次渲染的时候，调用SkinnableComponent的validateSkinState方法同时通过getCurrentSkinState来获取皮肤状态，通知皮肤去改变视图。这又是失效验证机制的一次完美使用。我们只需要调用失效，然后重写对应的验证方法就行了。事实上，按钮的up，down，disable之类的状态也是这样实现的。

egret的GUI库，集合了Flex和[FlexLite](http://flexlite.org)的核心思想。实现了自动布局，皮肤分离，组件的三层失效验证机制。快来膜拜作者[DOM](http://blog.domlib.com/)大神吧。

**6.优化游戏**

**①使用对象池**

在游戏里面随着游戏的进行，每一次移动都有一个格子组件TileUI的创建，当游戏久了会造成巨大的内存开销。这里使用对象池技术。当一个对象使用完毕时，放入对象池，下次需要使用时取出来，这样避免了对象的重复创建，节约了内存。具体的实现参考ObjectPool这个类。具体使用在MainGameUI里面，如下：

	/**
     * 创建一个格子
     */
    public createTile(tileVO:TileVO):void{
        var tile:TileUI = &lt;TileUI&gt;(ObjectPool.getPool("game.TileUI").borrowObject());  //从对象池创建
       ......
       ......
    }

当对象池里面没有TileUI时使用会new一个出来，否则直接从对象池获取。

	/**
     * 清除一个格子
     */
    public removeTile(tileVO:TileVO):void{
        var tileUI:TileUI = this.getTileUI(tileVO.x , tileVO.y);
        if(tileUI){
            this.tileGroup.removeElement(tileUI);
            ObjectPool.getPool("game.TileUI").returnObject(tileUI);
        }
    }

当格子销毁时，回收到对象池，以备下次使用。

另外由于js没有提供弱引用特性，在对象池里面的对象要彻底销毁就需要手动了。

**②针对不同设备**

游戏在PC我们使用键盘上的方向键操控游戏，但是在移动设备上就需要使用手势来操控了，通过egret.MainContext.deviceType这个值来获取平台 。具体实现在ApplicationMediator中：

	//为PC和移动端设置不同的移动策略
    if(egret.MainContext.deviceType != egret.MainContext.DEVICE_MOBILE)
    {
        var self = this;
        document.addEventListener("keydown",function(event:KeyboardEvent){
            switch (event.keyCode) {
                ....省略键盘事件......
            }
        });
    }
    else
    {
        this.main.addEventListener(egret.TouchEvent.TOUCH_BEGIN , this.mouseDownHandle , this)
    }

由于egret目前没有提供手势的API，这里我们自己实现手势。监听TOUCH\_BEGIN，TOUCH\_MOVE，TOUCH\_END和LEAVE\_STAGE这四个事件。具体实现如下：

	private downPoint:egret.Point;
    private movePoint:egret.Point;
    private mouseDownHandle(event:egret.TouchEvent):void
    {
        egret.UIGlobals.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.stage_mouseMoveHandler,this);
        egret.UIGlobals.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.stage_mouseUpHandler,this);
        egret.UIGlobals.stage.addEventListener(egret.Event.LEAVE_STAGE,this.stage_mouseUpHandler,this);

        this.downPoint = this.main.globalToLocal(event.stageX, event.stageY);
    }

    private needMove:boolean;
    private stage_mouseMoveHandler(event:egret.TouchEvent):void{
        if(!this.movePoint)
            this.movePoint = new egret.Point();
        this.movePoint.x = event.stageX;
        this.movePoint.y = event.stageY;
        if (this.needMove)
            return;
        this.needMove = true;
    }

    public stage_mouseUpHandler(event:egret.Event):void{
        egret.UIGlobals.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,
            this.stage_mouseMoveHandler,
            this);
        egret.UIGlobals.stage.removeEventListener(egret.TouchEvent.TOUCH_END,
            this.stage_mouseUpHandler,
            this);
        egret.UIGlobals.stage.addEventListener(egret.Event.LEAVE_STAGE,
            this.stage_mouseUpHandler,
            this);
        if(this.needMove){
            this.updateWhenMouseUp();
            this.needMove = false;
        }
    }

    /**
     * 移动设备上，判断移动方向
     */
    private updateWhenMouseUp():void
    {
        var p:egret.Point = this.main.globalToLocal(this.movePoint.x, this.movePoint.y ,egret.Point.identity);
        var offSetX:number = p.x - this.downPoint.x;
        var offSetY:number = p.y - this.downPoint.y;

        if(offSetY&lt;0 &amp;&amp; Math.abs(offSetY)&gt;Math.abs(offSetX))  //上
        {
            this.doMove(0);
        }
        else if(offSetX&gt;0 &amp;&amp; offSetX&gt;Math.abs(offSetY))  //右
        {
            this.doMove(1);
        }
        else if(offSetY&gt;0 &amp;&amp; offSetY&gt;Math.abs(offSetX))  //下
        {
            this.doMove(2);
        }
        else if(offSetX&lt;0 &amp;&amp; Math.abs(offSetX)&gt;Math.abs(offSetY))  //左
        {
            this.doMove(3);
        }
    }

**③动画效果**

游戏里面格子的创建，移动，合并，都需要一个缓动效果来支持。这里面最大的问题就是，缓动效果是持续时间的，而往往数据的改变是一瞬间。比如：一个操作合并了两个格子，其中一个需要移动，并且移动完成后要移除掉，此时新的格子也要出现。但是往往数据层把这些数据是同时发过来的，所以我们需要调节时机来让效果更好。比如格子的创建，我们延迟100毫秒显示在舞台上，因为在创建的同时其他格子会移动，所以等其他格子移动完成了后显示出来比较好。再比如格子的合并，实际上就是一个格子移动，移动完成后消失，目标位置格子改变数字并且出现缩放效果。这样要注意的就是移动之前调整将移动的格子的层级显示在最下面，避免移动的时候挡在目标位置格子的上面。

**7.性能**

egret的工作流还是很高效的，工具也不少，架构设计集各家所长。最后发布游戏在PC上运行是满帧运行，比原版甚至更快。在手机上运行也不错，体验超过了某些原生语言开发的2048。

最后交出源代码：[点我传送](https://github.com/f111fei/2048egret)
