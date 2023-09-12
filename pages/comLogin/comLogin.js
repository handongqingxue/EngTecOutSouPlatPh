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
    addVShowTradeOption:false,
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
    showDetailV:false,
    showEditV:false,
    addVShowSubmitBut:true,
    addVShowSubmitingBut:false,
    addVShowSubmitedBut:false,
    editVShowSubmitBut:true,
    editVShowSubmitingBut:false,
    editVShowSubmitedBut:false,

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
          comLoginPage.setData({showDetailV:true});
          comLoginPage.getComInfo();
        }
        else{
          comLoginPage.setData({showAddV:true});
          
        }
      }
    })
  },
  // 点击下拉显示框
  addVShowTradeOption() {
    comLoginPage.setData({
      addVShowTradeOption: !comLoginPage.data.addVShowTradeOption,
    });
  },
  editVShowTradeOption() {
    comLoginPage.setData({
      editVShowTradeOption: !comLoginPage.data.editVShowTradeOption,
    });
  },
  // 点击下拉列表
  addVSelectTradeOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let tradeList=comLoginPage.data.tradeList;
    let trade=tradeList[index];
    console.log(index+","+trade.value+","+trade.text);
    comLoginPage.setData({
      addVTradeSelectIndex: index,
      addVTradeSelectId: trade.value,
      addVShowTradeOption: !comLoginPage.data.addVShowTradeOption
    });
  },
  editVSelectTradeOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let tradeList=comLoginPage.data.tradeList;
    let trade=tradeList[index];
    console.log(index+","+trade.value+","+trade.text);
    comLoginPage.setData({
      editVTradeSelectIndex: index,
      editVTradeSelectId: trade.value,
      editVShowTradeOption: !comLoginPage.data.editVShowTradeOption
    });
  },
  getInputValue:function(e){
    if(e.currentTarget.id=="add_v_name_inp"){
      let addVName=e.detail.value;
      comLoginPage.setData({addVName:addVName});
    }
    else if(e.currentTarget.id=="edit_v_name_inp"){
      let editVName=e.detail.value;
      comLoginPage.setData({editVName:editVName});
    }
  },
  focusAddVName:function(){
    let addVName=comLoginPage.data.addVName;
    if(addVName=="公司名不能为空"){
      comLoginPage.setData({addVName:''});
    }
  },
  checkAddVName:function(){
    let addVName=comLoginPage.data.addVName;
    if(addVName==""||addVName==null||addVName=="公司名不能为空"){
      comLoginPage.setData({addVName:'公司名不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  focusEditVName:function(){
    let editVName=comLoginPage.data.editVName;
    if(editVName=="公司名不能为空"){
      comLoginPage.setData({editVName:''});
    }
  },
  checkEditVName:function(){
    let editVName=comLoginPage.data.editVName;
    if(editVName==""||editVName==null||editVName=="公司名不能为空"){
      comLoginPage.setData({editVName:'公司名不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  checkAddVTradeId:function(){
    let addVTradeSelectId=comLoginPage.data.addVTradeSelectId;
    if(addVTradeSelectId==null||addVTradeSelectId==""){
      wx.showToast({
        title: "请选择行业",
      })
	  	return false;
    }
    else
      return true;
  },
  checkNew:function(){
    if(comLoginPage.checkAddVName()){
      if(comLoginPage.checkAddVTradeId()){
        comLoginPage.newCompany();
      }
    }
  },
  newCompany:function(){
    comLoginPage.addVSaving(true);
    let name=comLoginPage.data.addVName;
    let tradeSelectId=comLoginPage.data.addVTradeSelectId;
    let openId=wxUser.openId;
    console.log("name==="+name)
    console.log("tradeSelectId==="+tradeSelectId)
    console.log("openId==="+openId)
    //return false;
    wx.request({
      url: rootIP+"submitCompany",
      data:{name:name,tradeId:tradeSelectId,openId:openId},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let message=data.message;
        console.log("message==="+message)
        if(message=="ok"){
          comLoginPage.addVSaving(false);
          wx.showToast({
            title: data.info,
          })
          setTimeout(() => {
            comLoginPage.goSubSucPage();
          }, 1000);
        }
        else{
          wx.showToast({
            title: data.info,
          })
        }
      }
    })
  },
  addVSaving:function(flag){
    if(flag){
      comLoginPage.setData({addVShowSubmitBut:false,addVShowSubmitingBut:true});
    }
    else{
      comLoginPage.setData({addVShowSubmitingBut:false,addVShowSubmitedBut:true});
    }
  },
  getComInfo:function(){
    let openId=wxUser.openId;
    wx.request({
      url: rootIP+"getCompanyByOpenId",
      method: 'POST',
      data: { openId:openId},
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log(res);
        let data=res.data;
        let company=data.company;
        let name=company.name;
        let tradeId=company.tradeId;
        comLoginPage.setData({detailVName:name,detailVTradeId:tradeId});
      }
    })
  },
  showEditV:function(e){
    let flag = e.currentTarget.dataset.flag;
    if(flag){
      comLoginPage.setData({showDetailV:false,showEditV:true});
    }
    else{

    }
  },
  goSubSucPage:function(){
    wx.redirectTo({
      url: '/pages/subSuc/subSuc',
    })
  },
  goHomePage:function(){
    wx.redirectTo({
      url: '/pages/home/home',
    })
  }
})