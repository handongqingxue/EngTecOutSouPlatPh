// pages/home/home.js
var home;
var rootIP;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nos:1,
    pos:2,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    home=this;

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  goPage:function(e){
    let pageFlag=e.currentTarget.dataset.pageflag;
    let url="/pages/";
    console.log(pageFlag)
    switch (pageFlag) {
      case home.data.nos:
        url+='needOutSou/needOutSou';
        break;
      case home.data.pos:
        url+='proOutSou/proOutSou';
        break;
      }
      wx.redirectTo({
        url: url,
      })
    }
  })