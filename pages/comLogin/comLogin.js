// pages/comLogin/comLogin.js
var comLoginPage;
var rootIP;
var wxUser;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backButSign:'<',
    showAddV:false,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    comLoginPage=this;
    rootIP=getApp().getRootIP();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wxUser=wx.getStorageSync("wxUser");
    comLoginPage.checkCompIfExist();
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
  checkCompIfExist:function(){
    let openId=wxUser.openId;
    console.log("openId==="+openId)
    wx.request({
      url: rootIP+"checkCompIfExist",
      data:{openId:openId},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let exist=data.exist;
        console.log("exist==="+exist)
        if(exist){
          
        }
        else{
          comLoginPage.setData({showAddV:true});
          
        }
      }
    })
  },
  goHomePage:function(){
    wx.redirectTo({
      url: '/pages/home/home',
    })
  }
})