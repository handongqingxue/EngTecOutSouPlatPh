// pages/outSouMana/needOutSou/list.js
var listPage;
var rootIP;
var wxUser;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backButSign:'<',
    selectPageFlag:1,
    showNoDataView:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    listPage=this;
    rootIP=getApp().getRootIP();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wxUser=wx.getStorageSync("wxUser");
    getApp().getPostList(listPage);
    listPage.getListData();
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
  showNoDataView:function(flag){
    if(flag){
      listPage.setData({showNoDataView:true});
    }
    else{
      listPage.setData({showNoDataView:false});
    }
  },
  getListData:function(){
    let openId=wxUser.openId;
    wx.request({
      url: rootIP+"getNOSListByOpenId",
      data:{openId:openId},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let status=data.status;
        console.log("status==="+status)
        listPage.setData({needOutSouList:[]});
        if(status=="ok"){
          var needOutSouList=data.list;
          for(let i=0;i<needOutSouList.length;i++){
            let needOutSou=needOutSouList[i];
            let postId=needOutSou.postId;
            let postName=getApp().getPostNameById(listPage,postId);
            needOutSou.postName=postName;
          }
          listPage.setData({needOutSouList:needOutSouList});
          listPage.showNoDataView(false);
          listPage.setData({noDataText:""});
        }
        else{
          listPage.showNoDataView(true);
          listPage.setData({noDataText:data.message});
        }
      }
    })
  },
  goPage:function(e){
    let pageFlag=e.currentTarget.dataset.pageflag;
    let url="/pages/";
    console.log(pageFlag)
    switch (pageFlag) {
      case listPage.data.selectPageFlag:
        url+='outSouMana/select';
        break;
    }
    wx.redirectTo({
      url: url,
    })
  }
})