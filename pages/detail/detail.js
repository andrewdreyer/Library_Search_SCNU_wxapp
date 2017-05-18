var app = getApp();
Page({
    data: {
        code: "",//索书号
        books: [],
        book_author: "",
        book_name: "加载中...",
        book_place:"",
        marc_no: "",
        ctrl_no: '',
        description: {},
        mounted: false,
        school: "",
        is_faved: false,
        is_toBeFound: false,
        //页面配置
        scroll_height: 0,
        winWidth: 0,
        winHeight: 0,
        currentTab: 0,
        button_findBook_bcolor:"#85dcec",
        button_findBook_context:"馆员代找图书"
    },

    onPullDownRefresh: function () {
        wx.stopPullDownRefresh();
    },

    /* 代找图书按钮点击事件 */
    findBook: function (e) {
      var that = this;
      //判断是否申请代找服务，
      if (that.data.is_toBeFound==false){
      that.setData({ loading: true, is_toBeFound: true });
      //try
      var find = {}
      find["marc_no"] = this.data.marc_no;
      find["book_name"] = this.data.book_name;
      find["book_author"] = this.data.book_author;
      find["school"] = this.data.school;
      find["code"] = this.data.code;
      find['ctrl_no'] = this.data.ctrl_no;
      var finds = wx.getStorageSync('finds') || []
      finds.unshift(find)
      wx.setStorageSync('finds', finds)
      //try
      console.log(e.detail.value);
      that.findBookRequest(that.data.book_name, that.data.book_author, that.data.books, that.data.code)
      }
    },

    /* 向服务器发送代找图书信息 */
    findBookRequest: function (book_name, book_author, books, code) {
        var that = this;
        that.setData({ button_findBook_bcolor: "#ffffff", button_findBook_context: "已请求馆员代找本书" });
        wx.request({
          url: 'https://www.huxiaowu0504.cn/Handler_find_book.ashx',
          method: "POST",
          data: {
            book_name: book_name,
            book_author: book_author,
            books: books,
            code: code
          },
          success: function (res) {
            wx.showToast({
              title: '已成功请求馆员代找本书',
              icon: 'loading',
              duration: 1500
            });
            if (res.statusCode == 500) {
              wx.showToast({
                title: '服务器连接错误',
                icon: 'loading',
                duration: 1500
              });
              that.setData({
                loading: false,
              });
            } else if (res.statusCode == 200) {
              that.setData({
                loading: false,
                books: res.data.books,
                is_alot: res.data.is_alot,
              });
            }
          }
        })
    },

    /* 图书收藏事件 */
    favBook: function () {
        this.setData({
            is_faved: true
        });
        var fav = {}
        fav["marc_no"] = this.data.marc_no;
        fav["book_name"] = this.data.book_name;
        fav["book_author"] = this.data.book_author;
        fav["school"] = this.data.school;
        fav["code"] = this.data.code;
        fav['ctrl_no'] = this.data.ctrl_no;
        var favs = wx.getStorageSync('favs') || []
        favs.unshift(fav)
        wx.setStorageSync('favs', favs)
        wx.showToast({
            title: '收藏成功',
            icon: 'success',
            duration: 1500
        });
    },

    /* 图书取消收藏事件 */
    unfavBook: function () {
        var favs = wx.getStorageSync('favs') || [];
        for (var i = favs.length - 1; i >= 0; i--) {
            if (favs[i].marc_no === this.data.marc_no && favs[i].school === this.data.school) {
                favs.splice(i, 1);
            }
        };
        wx.setStorageSync('favs', favs);
        this.setData({
            is_faved: false
        });
        wx.showToast({
            title: '取消收藏',
            icon: 'success',
            duration: 1500
        });
    },

    /* 图书是否被收藏事件 */
    searchFav: function (marc_no, favs) {
        for (var i = 0; i < favs.length; i++) {
            if (favs[i].marc_no === marc_no) {
                return true;
            }
        };
        return false;
    },
    /* 是否已通知代找事件 */
    searchFind: function (marc_no, finds) {
      for (var i = 0; i < finds.length; i++) {
        if (finds[i].marc_no === marc_no) {
          var that = this;
          that.setData({ button_findBook_bcolor: "#ffffff", button_findBook_context: "已请求馆员代找本书" });
          return true;
        }
      };
      return false;
    },


    /* 页面加载 */
    onLoad: function (options) {
        var that = this;
        var favs = wx.getStorageSync('favs') || []
        var finds = wx.getStorageSync('finds') || []
        var queryUrl = app.baseUrl + '/search/detail'
        var headerObj = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        that.setData({
            marc_no: options.marc_no,
            is_faved: that.searchFav(options.marc_no, favs),
            is_toBeFound: that.searchFind(options.marc_no, finds),
            school: options.school,
            ctrl_no: options.ctrl_no
        });
        var data = {
            marc_no: options.marc_no,
            school: that.data.school,
            ctrl_no: options.ctrl_no
        }
        setTimeout(function () {
            wx.request({
                url: queryUrl,
                method: "POST",
                data: data,
                header: headerObj,
                success: function (res) {
                    that.setData({
                        books: res.data.books,
                        code: res.data.code,
                        book_author: res.data.book_author,
                        book_name: res.data.book_name,
                        description: res.data.description, 
                        mounted: true
                    });
                }
            });
            //获取系统信息
            wx.getSystemInfo({
                success: function (res) {
                    that.setData({
                        winWidth: res.windowWidth,
                        winHeight: res.windowHeight,
                        scroll_height: res.windowHeight * 0.67
                    });
                }
            });
        }, 1000);
    },

    /* tab事件 */
    bindChange: function (e) {
        var that = this;
        that.setData({
            currentTab: e.detail.current
        });
    },

    /* 改变当前tab事件 */
    swichNav: function (e) {
        var that = this;
        if (this.data.currentTab === e.target.dataset.current) {
            return false;
        } else {
            that.setData({
                currentTab: e.target.dataset.current
            })
        }
    },

    /* 返回首页 */
    returnIndex: function () {
        wx.navigateBack()
    }
})