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
    showDjckgdView:true,
    showPageView:false,
    showToolBarView:false,
    currentPage:1,
    pageSize:10,
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
  showPageView:function(flag){
    if(flag){
      listPage.setData({showDjckgdView:false,showPageView:true});
    }
    else{
      listPage.setData({showDjckgdView:true,showPageView:false});
    }
  },
  showToolBarView:function(e){
    let flag=e.currentTarget.dataset.flag;
    if(flag){
      listPage.setData({showToolBarView:true});
    }
    else{
      listPage.setData({showToolBarView:false});
    }
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
    let currentPage=listPage.data.currentPage;
    let pageSize=listPage.data.pageSize;
    let ddh=listPage.data.ddh;
    let openId=wxUser.openId;
    wx.request({
      url: rootIP+"getNOSListByOpenId",
      data:{page:currentPage,rows:pageSize,ddh:ddh,openId:openId},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let status=data.status;
        console.log("status==="+status)
        let dataCount;
        listPage.setData({ddList:[]});
        if(status=="ok"){
          var ddList=data.list;
          for(let i=0;i<ddList.length;i++){
            let dsh=ddList[i];
            let lxlx=dsh.lxlx;
            //let lxlxMc=listPage.getLxlxMcById(lxlx);
            //dsh.lxlxMc=lxlxMc;
          }
          listPage.setData({ddList:ddList});
          listPage.showNoDataView(false);
          listPage.setData({noDataText:""});
        }
        else{
          listPage.showNoDataView(true);
          listPage.setData({noDataText:data.message});
        }
        dataCount=data.total;
        listPage.setData({dataCount:dataCount,pageCount:Math.floor((dataCount-1)/pageSize)+1});
        let e={currentTarget:{dataset:{flag:false}}};
        listPage.showToolBarView(e);
      }
    })
  },
})