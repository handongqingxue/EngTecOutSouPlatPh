// pages/outSouMana/needOutSou/detail.js
var nosDetailPage;
var rootIP;
var wxUser;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backButSign:'<',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    nosDetailPage=this;
    rootIP=getApp().getRootIP();
    //let id=options.id;
    let id=10;
    console.log(id);
    nosDetailPage.setData({id:id});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wxUser=wx.getStorageSync("wxUser");
    getApp().getTradeList(nosDetailPage);
    nosDetailPage.getNOSInfo();
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
  getNOSInfo:function(){
    let id=nosDetailPage.data.id;
    wx.request({
      url: rootIP+"getNeedOutSou",
      method: 'POST',
      data: { id:id},
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log(res);
        let data=res.data;
        let needOutSou=data.needOutSou;
        let companyName=needOutSou.companyName;
        let tradeId=needOutSou.tradeId;
        let tradeSelectIndex=getApp().getTradeIndexInListById(nosDetailPage,tradeId);
        let tradeName=getApp().getTradeNameById(nosDetailPage,tradeId);
        let otherTrade=needOutSou.otherTrade;
        let post=needOutSou.post;
        let enginName=needOutSou.enginName;
        let needCount=needOutSou.needCount;
        let speciality=needOutSou.speciality;
        let describe=needOutSou.describe;
        let describePlaceholder=needOutSou.describePlaceholder;
        describePlaceholder=describe==null?describePlaceholder:"";
        let startDate=needOutSou.startDate;
        let endDate=needOutSou.endDate;
        let contactName=needOutSou.contactName;
        let phone=needOutSou.phone;
        nosDetailPage.setData({companyName:companyName,tradeSelectId:tradeId,tradeSelectIndex:tradeSelectIndex,tradeName:tradeName,otherTrade:otherTrade,post:post,enginName:enginName,needCount:needCount,speciality:speciality,describe:describe,describePlaceholder:describePlaceholder,startDate:startDate,endDate:endDate,contactName:contactName,phone:phone});
      }
    })
  },
  goPage:function(){
    wx.redirectTo({
      url: '/pages/outSouMana/needOutSou/list',
    })
  }
})