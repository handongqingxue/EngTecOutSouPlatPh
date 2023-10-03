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
    homePageFlag:1,
    osmPageFlag:2,
    ssPageFlag:3,
    addVShowTradeOption:false,
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
    getApp().getTradeList(comLoginPage);
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
        //exist=false;
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
    console.log(index+","+trade.id+","+trade.name);
    comLoginPage.setData({
      addVTradeSelectIndex: index,
      addVTradeSelectId: trade.id,
      addVShowTradeOption: !comLoginPage.data.addVShowTradeOption
    });
  },
  editVSelectTradeOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let tradeList=comLoginPage.data.tradeList;
    let trade=tradeList[index];
    console.log(index+","+trade.id+","+trade.name);
    comLoginPage.setData({
      editVTradeSelectIndex: index,
      editVTradeSelectId: trade.id,
      editVShowTradeOption: !comLoginPage.data.editVShowTradeOption
    });
  },
  getInputValue:function(e){
    if(e.currentTarget.id=="add_v_name_inp"){
      let addVName=e.detail.value;
      comLoginPage.setData({addVName:addVName});
    }
    else if(e.currentTarget.id=="add_v_contactName_inp"){
      let addVContactName=e.detail.value;
      comLoginPage.setData({addVContactName:addVContactName});
    }
    else if(e.currentTarget.id=="add_v_phone_inp"){
      let addVPhone=e.detail.value;
      comLoginPage.setData({addVPhone:addVPhone});
    }
    else if(e.currentTarget.id=="edit_v_name_inp"){
      let editVName=e.detail.value;
      comLoginPage.setData({editVName:editVName});
    }
    else if(e.currentTarget.id=="edit_v_contactName_inp"){
      let editVContactName=e.detail.value;
      comLoginPage.setData({editVContactName:editVContactName});
    }
    else if(e.currentTarget.id=="edit_v_phone_inp"){
      let editVPhone=e.detail.value;
      comLoginPage.setData({editVPhone:editVPhone});
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
  focusAddVContactName:function(){
    let addVContactName=comLoginPage.data.addVContactName;
    if(addVContactName=="联系人不能为空"){
      comLoginPage.setData({addVContactName:''});
    }
  },
  checkAddVContactName:function(){
    let addVContactName=comLoginPage.data.addVContactName;
    if(addVContactName==""||addVContactName==null||addVContactName=="联系人不能为空"){
      comLoginPage.setData({addVContactName:'联系人不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  focusAddVPhone:function(){
    let addVPhone=comLoginPage.data.addVPhone;
    if(addVPhone=="联系方式不能为空"){
      comLoginPage.setData({addVPhone:''});
    }
  },
  checkAddVPhone:function(){
    let addVPhone=comLoginPage.data.addVPhone;
    if(addVPhone==""||addVPhone==null||addVPhone=="联系方式不能为空"){
      comLoginPage.setData({addVPhone:'联系人不能为空'});
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
  checkEditVTradeId:function(){
    let editVTradeSelectId=comLoginPage.data.editVTradeSelectId;
    if(editVTradeSelectId==null||editVTradeSelectId==""){
      wx.showToast({
        title: "请选择行业",
      })
	  	return false;
    }
    else
      return true;
  },
  focusEditVContactName:function(){
    let editVContactName=comLoginPage.data.editVContactName;
    if(editVContactName=="联系人不能为空"){
      comLoginPage.setData({editVContactName:''});
    }
  },
  checkEditVContactName:function(){
    let editVContactName=comLoginPage.data.editVContactName;
    if(editVContactName==""||editVContactName==null||editVContactName=="联系人不能为空"){
      comLoginPage.setData({editVContactName:'联系人不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  focusEditVPhone:function(){
    let editVPhone=comLoginPage.data.editVPhone;
    if(editVPhone=="联系方式不能为空"){
      comLoginPage.setData({editVPhone:''});
    }
  },
  checkEditVPhone:function(){
    let editVPhone=comLoginPage.data.editVPhone;
    if(editVPhone==""||editVPhone==null||editVPhone=="联系方式不能为空"){
      comLoginPage.setData({editVPhone:'联系方式不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  checkNew:function(){
    if(comLoginPage.checkAddVName()){
      if(comLoginPage.checkAddVTradeId()){
        if(comLoginPage.checkAddVContactName()){
          if(comLoginPage.checkAddVPhone()){
            comLoginPage.newCompany();
          }
        }
      }
    }
  },
  checkEdit:function(){
    if(comLoginPage.checkEditVName()){
      if(comLoginPage.checkEditVTradeId()){
        if(comLoginPage.checkEditVContactName()){
          if(comLoginPage.checkEditVPhone()){
            comLoginPage.editCompany();
          }
        }
      }
    }
  },
  newCompany:function(){
    comLoginPage.addVSaving(true);
    let name=comLoginPage.data.addVName;
    let tradeSelectId=comLoginPage.data.addVTradeSelectId;
    let contactName=comLoginPage.data.addVContactName;
    let phone=comLoginPage.data.addVPhone;
    let openId=wxUser.openId;
    console.log("name==="+name)
    console.log("tradeSelectId==="+tradeSelectId)
    console.log("contactName==="+contactName)
    console.log("phone==="+phone)
    console.log("openId==="+openId)
    //return false;
    wx.request({
      url: rootIP+"submitCompany",
      data:{name:name,tradeId:tradeSelectId,contactName:contactName,phone:phone,openId:openId},
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
            let ssPageFlag=comLoginPage.data.ssPageFlag;
            var e={currentTarget:{dataset:{pageflag:ssPageFlag}}};
            comLoginPage.goPage(e);
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
  editCompany:function(){
    comLoginPage.editVSaving(true);
    let name=comLoginPage.data.editVName;
    let tradeSelectId=comLoginPage.data.editVTradeSelectId;
    let contactName=comLoginPage.data.editVContactName;
    let phone=comLoginPage.data.editVPhone;
    let openId=wxUser.openId;
    console.log("name==="+name)
    console.log("tradeSelectId==="+tradeSelectId)
    console.log("contactName==="+contactName)
    console.log("phone==="+phone)
    console.log("openId==="+openId)
    //return false;
    wx.request({
      url: rootIP+"editCompany",
      data:{name:name,tradeId:tradeSelectId,contactName:contactName,phone:phone,openId:openId},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let message=data.message;
        console.log("message==="+message)
        if(message=="ok"){
          comLoginPage.editVSaving(false);
          wx.showToast({
            title: data.info,
          })
          setTimeout(() => {
            let ssPageFlag=comLoginPage.data.ssPageFlag;
            var e={currentTarget:{dataset:{pageflag:ssPageFlag}}};
            comLoginPage.goPage(e);
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
  editVSaving:function(flag){
    if(flag){
      comLoginPage.setData({editVShowSubmitBut:false,editVShowSubmitingBut:true});
    }
    else{
      comLoginPage.setData({editVShowSubmitingBut:false,editVShowSubmitedBut:true});
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
        let contactName=company.contactName;
        let phone=company.phone;
        let tradeSelectIndex=getApp().getTradeIndexInListById(comLoginPage,tradeId);
        comLoginPage.setData({detailVName:name,detailVTradeId:tradeId,detailVContactName:contactName,detailVPhone:phone,editVName:name,editVTradeId:tradeId,editVTradeSelectId:tradeId,editVTradeSelectIndex:tradeSelectIndex,editVContactName:contactName,editVPhone:phone});
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
  goPage:function(e){
    let pageFlag=e.currentTarget.dataset.pageflag;
    let url="/pages/";
    console.log(pageFlag)
    switch (pageFlag) {
      case comLoginPage.data.homePageFlag:
        url+='home/home';
        break;
      case comLoginPage.data.osmPageFlag:
        url+='outSouMana/select';
        break;
      case comLoginPage.data.ssPageFlag:
        url+='subSuc/subSuc';
        break;
    }
    wx.redirectTo({
      url: url,
    })
  },
})