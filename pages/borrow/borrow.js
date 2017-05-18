var app = getApp();
Page({
  data: {
    reader_name: "",
    reader_tel: "",
    book_name: "",
    loading: false,
    button_bcolor: "#b2b2b2"
  },

  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },


  bindNameInput: function (e) {
    this.setData({
      reader_name: e.detail.value
    });
    if (this.data.reader_name.replace(/\s+/g, "") == "") {
      this.setData({
        button_bcolor: "#b2b2b2"
      });
    } else {
      this.setData({
        button_bcolor: "#1296db"
      });
    }
  },

  bindTelInput: function (e) {
    this.setData({
      reader_tel: e.detail.value
    });
    if (this.data.reader_tel.replace(/\s+/g, "") == "") {
      this.setData({
        button_bcolor: "#b2b2b2"
      });
    } else {
      this.setData({
        button_bcolor: "#1296db"
      });
    }
  },

  bindBookInput: function (e) {
    this.setData({
      book_name: e.detail.value
    });
    if (this.data.book_name.replace(/\s+/g, "") == "") {
      this.setData({
        button_bcolor: "#b2b2b2"
      });
    } else {
      this.setData({
        button_bcolor: "#1296db"
      });
    }
  },

  /* 输入框失去焦点时触发 */
  borrowBooks: function (e) {
    var that = this;
    if (that.data.reader_name === "" || that.data.reader_tel === "" || that.data.book_name === "") return;
    that.setData({ loading: true });
    console.log(e.detail.value);
    that.borrowRequest(that.data.reader_name, that.data.reader_tel, that.data.book_name)
  },

  /* 根据关键词向服务器发起搜索请求 */
  borrowRequest: function (reader_name, reader_tel, book_name) {
    var that = this;
    wx.request({
      url: 'https://www.huxiaowu0504.cn/Handler_borrow.ashx',
      method: "POST",
      data: {
        reader_name: reader_name,
        reader_tel: reader_tel,
        book_name: book_name
      },
      success: function (res) {
        wx.showToast({
          title: '已成功上传所填数据',
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

  /* 页面显示 */
  onShow: function () {
  },

  /* 页面加载 */
  onLoad: function () {
  },
});
