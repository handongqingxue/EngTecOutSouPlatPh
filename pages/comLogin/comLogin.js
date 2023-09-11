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
    showTradeOption:false,
    tradeList:[
      {value:"",text:"请选择"},
      {value:"1",text:"工业自动化系统集成"},
      {value:"2",text:"环保工程"},
      {value:"3",text:"设备制造"},
      {value:"4",text:"监控安装"},
      {value:"5",text:"工业软件"},
      {value:"6",text:"化工行业"},
      {value:"7",text:"电厂锅炉"},
      {value:"8",text:"新能源新材料"}
    ],
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
  // 点击下拉显示框
  showTradeOption() {
    comLoginPage.setData({
      showTradeOption: !comLoginPage.data.showTradeOption,
    });
  },
  // 点击下拉列表
  selectTradeOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let tradeList=comLoginPage.data.tradeList;
    let trade=tradeList[index];
    console.log(index+","+trade.value+","+trade.text);
    comLoginPage.setData({
      tradeSelectIndex: index,
      tradeSelectId: trade.value,
      showTradeOption: !comLoginPage.data.showTradeOption
    });
  },
  goHomePage:function(){
    wx.redirectTo({
      url: '/pages/home/home',
    })
  }
})