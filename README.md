## 微信小程序-移动端图书馆-前端
## 项目说明：

- 微信小程序：实现一个移动端图书馆图书检索、华师漂流角的书籍借阅登记以及馆员帮忙代找书籍的信息上传 至服务器（待实现一个将代找书籍信息即时传递至助理的“途径”），本项目（可能不）持续更新中...（滑稽脸）

- 使用技术：**wxml**、**wxss**、**javascript**


## 目录结构：
    ├─.wing             # EgretWing编辑器小程序配置相关
    ├─pages             # 存放小程序页面相关文件
    │  ├─bookcross  
    │  ├─borrow  
    │  ├─current_Info  
    │  ├─detail  
    │  ├─fav  
    │  ├─feedback  
    │  ├─search  
    │  ├─template  
    │  └─user  
    ├─src               # 项目静态资源，
    │  ├─img            # 项目图片及小程序icon图标
    │  └─styles         # 小程序公用css样式表
    ├─typings           # 小程序api方法提示封装
    └─utils             # 存放配置文件，例如：api.js、config.js、hotapp.js 

源程序（检索图书功能）来源：

https://github.com/wxappdev/library_search

接口的服务器貌似出问题了，所以现在用的是司嘉年师兄的服务器接口，他的源码如下：

https://github.com/sijianian/library-front