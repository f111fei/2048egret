2048是最近很火的一个小游戏，<a href="http://gabrielecirulli.github.io/2048/" target="_blank">原版</a>就是用javascript写的。恰巧最近egretpublicbeta，观望和学习了一阵后，发现egret正好适合开发这类游戏。egret使用typescript作为开发语言，最终编译为javascript，正好和原始版本PK一下。

游戏预览：<a href="http://xzper.qiniudn.com/2048egret/launcher/index.html" target="_blank">点我体验</a>

<strong>1.准备开始</strong>
在开始之前，我们需要学习一下typescript，和阅读官方的教程从egret开发环境的部署到创建，编译，发布项目，以及egret相关工具。在安装好开发环境后，在工作空间目录下使用命令行，创建2048egret新项目
<pre class="lang:as decode:true">egret create 2048egret</pre>
<strong>2.准备素材</strong>

每一个游戏都离不开美术资源，我们需要做的就是把美术资源打包，然后加载进来使用。这一方面egret有一套完整的工作流。
