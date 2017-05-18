var app = getApp()

Page({
	data: {
		userInfo: {},
		items: [
			{
				icon: '../../src/img/bookcrossLight.png',
				text: '图书借阅',
				path: '../borrow/borrow'
			},
	
			{
				icon: '../../src/img/bookcrossLight.png',
				text: '图书归还',
				path:  '../return/return'
			},
		
			{
				icon: '../../src/img/bookcrossLight.png',
				text: '当前借阅',
				path:  '../fav/fav'
			},
		],
		settings: [
			{
				icon: '../../src/img/callme.png',
				text: '联系我们',
			}
		]
	},

	onPullDownRefresh: function () {
		wx.stopPullDownRefresh();
	},
	/* 页面加载 */
	onLoad: function () {
		var that = this;
		app.getUserInfo(function (res) {
			that.setData({
				userInfo: res
			})
		})
	},

	/* 页面显示 */
	onShow: function () {
		var that = this;
		that.showCurrentStorage();
	},

	/* 显示我的收藏 */
	navigateTo: function (e) {
		var index = e.currentTarget.dataset.index;
		var path = e.currentTarget.dataset.path;
		wx.navigateTo({
			url: path
		});
	},


	/* 联系我们 */
	bindtap: function (e) {
		wx.makePhoneCall({
			phoneNumber: '15521303970' //仅为示例，并非真实的电话号码
			})
	}
})