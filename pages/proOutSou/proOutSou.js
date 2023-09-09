// pages/proOutSou/proOutSou.js
var proOutSouPage;
var rootIP;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backButSign:'<',
    startDate:'',
    endDate:'',
    describePlaceholder:'请填写描述',
    startDatePlaceholder:'请选择开始日期',
    endDatePlaceholder:'请选择结束日期',
    showSubmitBut:true,
    showSubmitingBut:false,
    showSubmitedBut:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    proOutSouPage=this;
    rootIP=getApp().getRootIP();
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
  checkNew:function(){
    if(proOutSouPage.checkContactName()){
      if(proOutSouPage.checkPhone()){
        if(proOutSouPage.checkArea()){
          if(proOutSouPage.checkProCount()){
            if(proOutSouPage.checkOtherTrade()){
              if(proOutSouPage.checkOtherSpeciality()){
                if(proOutSouPage.checkDescribe()){
                  if(proOutSouPage.checkStartDate()){
                    if(proOutSouPage.checkEndDate()){
                      proOutSouPage.newProOutSou();
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  newProOutSou:function(){
    proOutSouPage.saving(true);
    let contactName=proOutSouPage.data.contactName;
    let phone=proOutSouPage.data.phone;
    let area=proOutSouPage.data.area;
    let proCount=proOutSouPage.data.proCount;
    let otherTrade=proOutSouPage.data.otherTrade;
    let otherSpeciality=proOutSouPage.data.otherSpeciality;
    let describe=proOutSouPage.data.describe;
    let startDate=proOutSouPage.data.startDate;
    let endDate=proOutSouPage.data.endDate;
    console.log("contactName==="+contactName)
    console.log("phone==="+phone)
    console.log("area==="+area)
    console.log("proCount==="+proCount)
    console.log("otherTrade==="+otherTrade)
    console.log("otherSpeciality==="+otherSpeciality)
    console.log("describe==="+describe)
    console.log("startDate==="+startDate)
    console.log("endDate==="+endDate)
    //return false;
    wx.request({
      url: rootIP+"submitProOutSou",
      data:{contactName:contactName,phone:phone,area:area,proCount:proCount,otherTrade:otherTrade,otherSpeciality:otherSpeciality,describe:describe,startDate:startDate,endDate:endDate},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let message=data.message;
        console.log("message==="+message)
        if(message=="ok"){
          proOutSouPage.saving(false);
          wx.showToast({
            title: data.info,
          })
          setTimeout(() => {
            //proOutSouPage.goListPage();
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
  getInputValue:function(e){
    if(e.currentTarget.id=="contactName_inp"){
      let contactName=e.detail.value;
      proOutSouPage.setData({contactName:contactName});
    }
    else if(e.currentTarget.id=="phone_inp"){
      let phone=e.detail.value;
      proOutSouPage.setData({phone:phone});
    }
    else if(e.currentTarget.id=="area_inp"){
      let area=e.detail.value;
      proOutSouPage.setData({area:area});
    }
    else if(e.currentTarget.id=="proCount_inp"){
      let proCount=e.detail.value;
      proOutSouPage.setData({proCount:proCount});
    }
    else if(e.currentTarget.id=="otherTrade_inp"){
      let otherTrade=e.detail.value;
      proOutSouPage.setData({otherTrade:otherTrade});
    }
    else if(e.currentTarget.id=="otherSpeciality_inp"){
      let otherSpeciality=e.detail.value;
      proOutSouPage.setData({otherSpeciality:otherSpeciality});
    }
    else if(e.currentTarget.id=="describe_inp"){
      let describe=e.detail.value;
      proOutSouPage.setData({describe:describe});
    }
  },
  focusContactName:function(){
    let contactName=proOutSouPage.data.contactName;
    if(contactName=="姓名不能为空"){
      proOutSouPage.setData({contactName:''});
    }
  },
  checkContactName:function(){
    let contactName=proOutSouPage.data.contactName;
    if(contactName==""||contactName==null||contactName=="姓名不能为空"){
      proOutSouPage.setData({contactName:'姓名不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  focusPhone:function(){
    let phone=proOutSouPage.data.phone;
    if(phone=="联系方式不能为空"){
      proOutSouPage.setData({phone:''});
    }
  },
  checkPhone:function(){
    let phone=proOutSouPage.data.phone;
    console.log(phone)
    if(phone==""||phone==null||phone=="联系方式不能为空"){
      proOutSouPage.setData({phone:'联系方式不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  focusArea:function(){
    let area=proOutSouPage.data.area;
    if(area=="地区不能为空"){
      proOutSouPage.setData({area:''});
    }
  },
  checkArea:function(){
    let area=proOutSouPage.data.area;
    console.log(area)
    if(area==""||area==null||area=="地区不能为空"){
      proOutSouPage.setData({area:'地区不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  checkProCount:function(){
    let proCount=proOutSouPage.data.proCount;
    console.log(proCount)
    if(proCount==""||proCount==null){
      wx.showToast({
        title: "工程提供人数",
      })
      return false;
    }
    else{
      return true;
    }
  },
  focusOtherTrade:function(){
    let otherTrade=proOutSouPage.data.otherTrade;
    if(otherTrade=="其他行业不能为空"){
      proOutSouPage.setData({otherTrade:''});
    }
  },
  checkOtherTrade:function(){
    let otherTrade=proOutSouPage.data.otherTrade;
    console.log(otherTrade)
    if(otherTrade==""||otherTrade==null||otherTrade=="其他行业不能为空"){
      proOutSouPage.setData({otherTrade:'其他行业不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  focusOtherSpeciality:function(){
    let otherSpeciality=proOutSouPage.data.otherSpeciality;
    if(otherSpeciality=="其他特长不能为空"){
      proOutSouPage.setData({otherSpeciality:''});
    }
  },
  checkOtherSpeciality:function(){
    let otherSpeciality=proOutSouPage.data.otherSpeciality;
    console.log(otherSpeciality)
    if(otherSpeciality==""||otherSpeciality==null||otherSpeciality=="其他特长不能为空"){
      proOutSouPage.setData({otherSpeciality:'其他特长不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  focusDescribe:function(){
    let describe=proOutSouPage.data.describe;
    if(describe=="描述不能为空"){
      proOutSouPage.setData({describePlaceholder:'请填写描述'});
      proOutSouPage.setData({describe:''});
    }
  },
  checkDescribe:function(){
    let describe=proOutSouPage.data.describe;
    console.log(describe)
    if(describe==""||describe==null||describe=="描述不能为空"){
      proOutSouPage.setData({describePlaceholder:''});
      proOutSouPage.setData({describe:'描述不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  checkStartDate:function(){
    let startDate=proOutSouPage.data.startDate;
    if(startDate==null||startDate==""){
        wx.showToast({
          title: "请选择开始日期",
        })
        return false;
    }
    else
      return true;
  },
  checkEndDate:function(){
    let endDate=proOutSouPage.data.endDate;
    if(endDate==null||endDate==""){
        wx.showToast({
          title: "请选择结束日期",
        })
        return false;
    }
    else
      return true;
  },
  pickerStartDateChange:function(e){
    let value = e.detail.value;
    console.log(value)
    proOutSouPage.setData({startDate:value});
  },
  pickerStartDateCancel:function(){
    proOutSouPage.setData({startDate:''});
  },
  pickerEndDateChange:function(e){
    let value = e.detail.value;
    console.log(value)
    proOutSouPage.setData({endDate:value});
  },
  pickerEndDateCancel:function(){
    proOutSouPage.setData({endDate:''});
  },
  saving:function(flag){
    if(flag){
      proOutSouPage.setData({showSubmitBut:false,showSubmitingBut:true});
    }
    else{
      proOutSouPage.setData({showSubmitingBut:false,showSubmitedBut:true});
    }
  },
  goHomePage:function(){
    wx.redirectTo({
      url: '/pages/home/home',
    })
  }
})