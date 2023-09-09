// pages/needOutSou/needOutSou.js
var needOutSouPage;
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
    needOutSouPage=this;
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
    if(needOutSouPage.checkContactName()){
      if(needOutSouPage.checkPhone()){
        if(needOutSouPage.checkArea()){
          if(needOutSouPage.checkEnginName()){
            if(needOutSouPage.checkNeedCount()){
              if(needOutSouPage.checkOtherTrade()){
                if(needOutSouPage.checkOtherSpeciality()){
                  if(needOutSouPage.checkDescribe()){
                    if(needOutSouPage.checkStartDate()){
                      if(needOutSouPage.checkEndDate()){
                        needOutSouPage.newNeedOutSou();
                      }
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
  newNeedOutSou:function(){
    needOutSouPage.saving(true);
    let contactName=needOutSouPage.data.contactName;
    let phone=needOutSouPage.data.phone;
    let area=needOutSouPage.data.area;
    let enginName=needOutSouPage.data.enginName;
    let needCount=needOutSouPage.data.needCount;
    let otherTrade=needOutSouPage.data.otherTrade;
    let otherSpeciality=needOutSouPage.data.otherSpeciality;
    let describe=needOutSouPage.data.describe;
    let startDate=needOutSouPage.data.startDate;
    let endDate=needOutSouPage.data.endDate;
    console.log("contactName==="+contactName)
    console.log("phone==="+phone)
    console.log("area==="+area)
    console.log("enginName==="+enginName)
    console.log("needCount==="+needCount)
    console.log("otherTrade==="+otherTrade)
    console.log("otherSpeciality==="+otherSpeciality)
    console.log("describe==="+describe)
    console.log("startDate==="+startDate)
    console.log("endDate==="+endDate)
    //return false;
    wx.request({
      url: rootIP+"submitNeedOutSou",
      data:{contactName:contactName,phone:phone,area:area,enginName:enginName,needCount:needCount,otherTrade:otherTrade,otherSpeciality:otherSpeciality,describe:describe,startDate:startDate,endDate:endDate},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let message=data.message;
        console.log("message==="+message)
        if(message=="ok"){
          needOutSouPage.saving(false);
          wx.showToast({
            title: data.info,
          })
          setTimeout(() => {
            //needOutSouPage.goListPage();
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
      needOutSouPage.setData({contactName:contactName});
    }
    else if(e.currentTarget.id=="phone_inp"){
      let phone=e.detail.value;
      needOutSouPage.setData({phone:phone});
    }
    else if(e.currentTarget.id=="area_inp"){
      let area=e.detail.value;
      needOutSouPage.setData({area:area});
    }
    else if(e.currentTarget.id=="enginName_inp"){
      let enginName=e.detail.value;
      needOutSouPage.setData({enginName:enginName});
    }
    else if(e.currentTarget.id=="needCount_inp"){
      let needCount=e.detail.value;
      needOutSouPage.setData({needCount:needCount});
    }
    else if(e.currentTarget.id=="otherTrade_inp"){
      let otherTrade=e.detail.value;
      needOutSouPage.setData({otherTrade:otherTrade});
    }
    else if(e.currentTarget.id=="otherSpeciality_inp"){
      let otherSpeciality=e.detail.value;
      needOutSouPage.setData({otherSpeciality:otherSpeciality});
    }
    else if(e.currentTarget.id=="describe_inp"){
      let describe=e.detail.value;
      needOutSouPage.setData({describe:describe});
    }
  },
  focusContactName:function(){
    let contactName=needOutSouPage.data.contactName;
    if(contactName=="姓名不能为空"){
      needOutSouPage.setData({contactName:''});
    }
  },
  checkContactName:function(){
    let contactName=needOutSouPage.data.contactName;
    if(contactName==""||contactName==null||contactName=="姓名不能为空"){
      needOutSouPage.setData({contactName:'姓名不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  focusPhone:function(){
    let phone=needOutSouPage.data.phone;
    if(phone=="联系方式不能为空"){
      needOutSouPage.setData({phone:''});
    }
  },
  checkPhone:function(){
    let phone=needOutSouPage.data.phone;
    console.log(phone)
    if(phone==""||phone==null||phone=="联系方式不能为空"){
      needOutSouPage.setData({phone:'联系方式不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  focusArea:function(){
    let area=needOutSouPage.data.area;
    if(area=="地区不能为空"){
      needOutSouPage.setData({area:''});
    }
  },
  checkArea:function(){
    let area=needOutSouPage.data.area;
    console.log(area)
    if(area==""||area==null||area=="地区不能为空"){
      needOutSouPage.setData({area:'地区不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  focusEnginName:function(){
    let enginName=needOutSouPage.data.enginName;
    if(enginName=="工程名不能为空"){
      needOutSouPage.setData({enginName:''});
    }
  },
  checkEnginName:function(){
    let enginName=needOutSouPage.data.enginName;
    console.log(enginName)
    if(enginName==""||enginName==null||enginName=="工程名不能为空"){
      needOutSouPage.setData({enginName:'工程名不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  checkNeedCount:function(){
    let needCount=needOutSouPage.data.needCount;
    console.log(needCount)
    if(needCount==""||needCount==null){
      wx.showToast({
        title: "工程所需人数",
      })
      return false;
    }
    else{
      return true;
    }
  },
  focusOtherTrade:function(){
    let otherTrade=needOutSouPage.data.otherTrade;
    if(otherTrade=="其他行业不能为空"){
      needOutSouPage.setData({otherTrade:''});
    }
  },
  checkOtherTrade:function(){
    let otherTrade=needOutSouPage.data.otherTrade;
    console.log(otherTrade)
    if(otherTrade==""||otherTrade==null||otherTrade=="其他行业不能为空"){
      needOutSouPage.setData({otherTrade:'其他行业不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  focusOtherSpeciality:function(){
    let otherSpeciality=needOutSouPage.data.otherSpeciality;
    if(otherSpeciality=="其他特长不能为空"){
      needOutSouPage.setData({otherSpeciality:''});
    }
  },
  checkOtherSpeciality:function(){
    let otherSpeciality=needOutSouPage.data.otherSpeciality;
    console.log(otherSpeciality)
    if(otherSpeciality==""||otherSpeciality==null||otherSpeciality=="其他特长不能为空"){
      needOutSouPage.setData({otherSpeciality:'其他特长不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  focusDescribe:function(){
    let describe=needOutSouPage.data.describe;
    if(describe=="描述不能为空"){
      needOutSouPage.setData({describePlaceholder:'请填写描述'});
      needOutSouPage.setData({describe:''});
    }
  },
  checkDescribe:function(){
    let describe=needOutSouPage.data.describe;
    console.log(describe)
    if(describe==""||describe==null||describe=="描述不能为空"){
      needOutSouPage.setData({describePlaceholder:''});
      needOutSouPage.setData({describe:'描述不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  checkStartDate:function(){
    let startDate=needOutSouPage.data.startDate;
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
    let endDate=needOutSouPage.data.endDate;
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
    needOutSouPage.setData({startDate:value});
  },
  pickerStartDateCancel:function(){
    needOutSouPage.setData({startDate:''});
  },
  pickerEndDateChange:function(e){
    let value = e.detail.value;
    console.log(value)
    needOutSouPage.setData({endDate:value});
  },
  pickerEndDateCancel:function(){
    needOutSouPage.setData({endDate:''});
  },
  saving:function(flag){
    if(flag){
      needOutSouPage.setData({showSubmitBut:false,showSubmitingBut:true});
    }
    else{
      needOutSouPage.setData({showSubmitingBut:false,showSubmitedBut:true});
    }
  },
  goHomePage:function(){
    wx.redirectTo({
      url: '/pages/home/home',
    })
  }
})