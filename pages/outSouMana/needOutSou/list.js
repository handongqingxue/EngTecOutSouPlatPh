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
    showDjckgdView:true,
    showPageView:false,
    showToolBarView:false,
    currentPage:1,
    pageSize:10,
    showNoDataView:false,
    enginName:"",
    tradeSelectId:"",
    otherTrade:"",
    speciality:'',

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
    getApp().getTradeList(listPage);
    setTimeout(() => {
      listPage.getDdztSelectData();
    }, 1000);
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
  getInputValue:function(e){
    if(e.currentTarget.id=="enginName_inp"){
      let enginName=e.detail.value;
      listPage.setData({enginName:enginName});
    }
    else if(e.currentTarget.id=="otherTrade_inp"){
      let otherTrade=e.detail.value;
      listPage.setData({otherTrade:otherTrade});
    }
    else if(e.currentTarget.id=="speciality_inp"){
      let speciality=e.detail.value;
      listPage.setData({speciality:speciality});
    }
  },
  resetToolBarData:function(){
    listPage.setData({enginName:"",tradeSelectIndex:0,tradeSelectId:"",otherTrade:"",speciality:""});
  },
  getDdztSelectData:function(){
    let tradeList=listPage.data.tradeList;
    tradeList.unshift({id:"",name:"请选择"});
    listPage.setData({tradeList:tradeList});
    listPage.getListData();
  },
  getListData:function(){
    let currentPage=listPage.data.currentPage;
    let pageSize=listPage.data.pageSize;
    let enginName=listPage.data.enginName;
    let tradeId=listPage.data.tradeSelectId;
    let otherTrade=listPage.data.otherTrade;
    let speciality=listPage.data.speciality;
    let openId=wxUser.openId;
    wx.request({
      url: rootIP+"getNOSListByOpenId",
      data:{page:currentPage,rows:pageSize,enginName:enginName,tradeId:tradeId,otherTrade:otherTrade,speciality:speciality,openId:openId},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let status=data.status;
        console.log("status==="+status)
        let dataCount;
        listPage.setData({needOutSouList:[]});
        if(status=="ok"){
          var needOutSouList=data.list;
          for(let i=0;i<needOutSouList.length;i++){
            let needOutSou=needOutSouList[i];
            let tradeId=needOutSou.tradeId;
            let tradeName=getApp().getTradeNameById(listPage,tradeId);
            needOutSou.tradeName=tradeName;
          }
          listPage.setData({needOutSouList:needOutSouList});
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
  // 点击下拉显示框
  showTradeOption() {
    listPage.setData({
      showTradeOption: !listPage.data.showTradeOption,
    });
  },
  // 点击下拉列表
  selectTradeOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let tradeList=listPage.data.tradeList;
    let ddzt=tradeList[index];
    console.log(index+","+ddzt.id+","+ddzt.mc);
    this.setData({
      ddztSelectIndex: index,
      ddztSelectId: ddzt.id,
      showTradeOption: !this.data.showTradeOption
    });
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