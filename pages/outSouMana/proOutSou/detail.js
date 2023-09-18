// pages/outSouMana/proOutSou/detail.js
var posDetailPage;
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
    posDetailPage=this;
    rootIP=getApp().getRootIP();
    let id=options.id;
    //let id=10;
    console.log(id);
    posDetailPage.setData({id:id});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wxUser=wx.getStorageSync("wxUser");
    getApp().getTradeList(posDetailPage);
    posDetailPage.getPOSInfo();
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
  getPOSInfo:function(){
    let id=posDetailPage.data.id;
    wx.request({
      url: rootIP+"getProOutSou",
      method: 'POST',
      data: { id:id},
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log(res);
        let data=res.data;
        let proOutSou=data.proOutSou;
        let companyName=proOutSou.companyName;
        let tradeId=proOutSou.tradeId;
        let tradeSelectIndex=getApp().getTradeIndexInListById(posDetailPage,tradeId);
        let tradeName=getApp().getTradeNameById(posDetailPage,tradeId);
        let otherTrade=proOutSou.otherTrade;
        let post=proOutSou.post;
        let needCount=proOutSou.needCount;
        let speciality=proOutSou.speciality;
        let describe=proOutSou.describe;
        let describePlaceholder=proOutSou.describePlaceholder;
        describePlaceholder=describe==null?describePlaceholder:"";
        let startDate=proOutSou.startDate;
        let endDate=proOutSou.endDate;
        let contactName=proOutSou.contactName;
        let phone=proOutSou.phone;
        posDetailPage.setData({companyName:companyName,tradeSelectId:tradeId,tradeSelectIndex:tradeSelectIndex,tradeName:tradeName,otherTrade:otherTrade,post:post,needCount:needCount,speciality:speciality,describe:describe,describePlaceholder:describePlaceholder,startDate:startDate,endDate:endDate,contactName:contactName,phone:phone});
      }
    })
  },
  goPage:function(e){
    let pageFlag=e.currentTarget.dataset.pageflag;
    let url="/pages/";
    console.log(pageFlag)
    switch (pageFlag) {
      case posDetailPage.data.listPageFlag:
        url+='outSouMana/proOutSou/list';
        break;
    }
    wx.redirectTo({
      url: url,
    })
  }
})