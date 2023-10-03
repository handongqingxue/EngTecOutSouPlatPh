// pages/outSouMana/needOutSou/new.js
var nosNewPage;
var rootIP;
var wxUser;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backButSign:'<',
    homePageFlag:1,
    ssPageFlag:2,
    showTradeOption:false,
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
    nosNewPage=this;
    rootIP=getApp().getRootIP();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wxUser=wx.getStorageSync("wxUser");
    getApp().getTradeList(nosNewPage);
    nosNewPage.getComInfo();
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
  // 点击下拉显示框
  showTradeOption() {
    nosNewPage.setData({
      showTradeOption: !nosNewPage.data.showTradeOption,
    });
  },
  // 点击下拉列表
  selectTradeOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let tradeList=nosNewPage.data.tradeList;
    let trade=tradeList[index];
    console.log(index+","+trade.id+","+trade.name);
    nosNewPage.setData({
      tradeSelectIndex: index,
      tradeSelectId: trade.id,
      showTradeOption: !nosNewPage.data.showTradeOption
    });
  },
  checkNew:function(){
    if(nosNewPage.checkCompanyName()){
      if(nosNewPage.checkTradeId()){
        if(nosNewPage.checkPost()){
          if(nosNewPage.checkEnginName()){
            if(nosNewPage.checkNeedCount()){
              if(nosNewPage.checkSpeciality()){
                if(nosNewPage.checkStartDate()){
                  if(nosNewPage.checkEndDate()){
                    if(nosNewPage.checkContactName()){
                      if(nosNewPage.checkPhone()){
                        nosNewPage.newNeedOutSou();
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
    nosNewPage.saving(true);
    let companyName=nosNewPage.data.companyName;
    let tradeSelectId=nosNewPage.data.tradeSelectId;
    let otherTrade=nosNewPage.data.otherTrade;
    let post=nosNewPage.data.post;
    let enginName=nosNewPage.data.enginName;
    let needCount=nosNewPage.data.needCount;
    let speciality=nosNewPage.data.speciality;
    let describe=nosNewPage.data.describe;
    let startDate=nosNewPage.data.startDate;
    let endDate=nosNewPage.data.endDate;
    let contactName=nosNewPage.data.contactName;
    let phone=nosNewPage.data.phone;
    let openId=wxUser.openId;
    console.log("companyName==="+companyName)
    console.log("tradeSelectId==="+tradeSelectId)
    console.log("otherTrade==="+otherTrade)
    console.log("post==="+post)
    console.log("enginName==="+enginName)
    console.log("needCount==="+needCount)
    console.log("speciality==="+speciality)
    console.log("describe==="+describe)
    console.log("startDate==="+startDate)
    console.log("endDate==="+endDate)
    console.log("contactName==="+contactName)
    console.log("phone==="+phone)
    console.log("openId==="+openId)
    //return false;
    wx.request({
      url: rootIP+"submitNeedOutSou",
      data:{companyName:companyName,tradeId:tradeSelectId,otherTrade:otherTrade,post:post,enginName:enginName,needCount:needCount,speciality:speciality,describe:describe,startDate:startDate,endDate:endDate,contactName:contactName,phone:phone,openId:openId},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let message=data.message;
        console.log("message==="+message)
        if(message=="ok"){
          nosNewPage.saving(false);
          wx.showToast({
            title: data.info,
          })
          setTimeout(() => {
            let ssPageFlag=nosNewPage.data.ssPageFlag;
            var e={currentTarget:{dataset:{pageflag:ssPageFlag}}};
            nosNewPage.goPage(e);
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
    if(e.currentTarget.id=="companyName_inp"){
      let companyName=e.detail.value;
      nosNewPage.setData({companyName:companyName});
    }
    else if(e.currentTarget.id=="otherTrade_inp"){
      let otherTrade=e.detail.value;
      nosNewPage.setData({otherTrade:otherTrade});
    }
    else if(e.currentTarget.id=="post_inp"){
      let post=e.detail.value;
      nosNewPage.setData({post:post});
    }
    else if(e.currentTarget.id=="enginName_inp"){
      let enginName=e.detail.value;
      nosNewPage.setData({enginName:enginName});
    }
    else if(e.currentTarget.id=="needCount_inp"){
      let needCount=e.detail.value;
      nosNewPage.setData({needCount:needCount});
    }
    else if(e.currentTarget.id=="speciality_inp"){
      let speciality=e.detail.value;
      nosNewPage.setData({speciality:speciality});
    }
    else if(e.currentTarget.id=="describe_inp"){
      let describe=e.detail.value;
      nosNewPage.setData({describe:describe});
    }
    else if(e.currentTarget.id=="contactName_inp"){
      let contactName=e.detail.value;
      nosNewPage.setData({contactName:contactName});
    }
    else if(e.currentTarget.id=="phone_inp"){
      let phone=e.detail.value;
      nosNewPage.setData({phone:phone});
    }
  },
  focusCompanyName:function(){
    let companyName=nosNewPage.data.companyName;
    if(companyName=="公司名称不能为空"){
      nosNewPage.setData({companyName:''});
    }
  },
  checkCompanyName:function(){
    let companyName=nosNewPage.data.companyName;
    if(companyName==""||companyName==null||companyName=="公司名称不能为空"){
      nosNewPage.setData({companyName:'公司名称不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  checkTradeId:function(){
    let tradeSelectId=nosNewPage.data.tradeSelectId;
    if(tradeSelectId==null||tradeSelectId==""){
      wx.showToast({
        title: "请选择行业",
      })
	  	return false;
    }
    else
      return true;
  },
  focusOtherTrade:function(){
    let otherTrade=nosNewPage.data.otherTrade;
    if(otherTrade=="其他行业不能为空"){
      nosNewPage.setData({otherTrade:''});
    }
  },
  checkOtherTrade:function(){
    let otherTrade=nosNewPage.data.otherTrade;
    if(otherTrade==""||otherTrade==null||otherTrade=="其他行业不能为空"){
      nosNewPage.setData({otherTrade:'其他行业不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  focusPost:function(){
    let post=nosNewPage.data.post;
    if(post=="岗位名称不能为空"){
      nosNewPage.setData({post:''});
    }
  },
  checkPost:function(){
    let post=nosNewPage.data.post;
    if(post==""||post==null||post=="岗位名称不能为空"){
      nosNewPage.setData({post:'岗位名称不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  focusEnginName:function(){
    let enginName=nosNewPage.data.enginName;
    if(enginName=="工程名不能为空"){
      nosNewPage.setData({enginName:''});
    }
  },
  checkEnginName:function(){
    let enginName=nosNewPage.data.enginName;
    if(enginName==""||enginName==null||enginName=="工程名不能为空"){
      nosNewPage.setData({enginName:'工程名不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  checkNeedCount:function(){
    let needCount=nosNewPage.data.needCount;
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
  focusSpeciality:function(){
    let speciality=nosNewPage.data.speciality;
    if(speciality=="特长不能为空"){
      nosNewPage.setData({speciality:''});
    }
  },
  checkSpeciality:function(){
    let speciality=nosNewPage.data.speciality;
    console.log(speciality)
    if(speciality==""||speciality==null||speciality=="特长不能为空"){
      nosNewPage.setData({speciality:'特长不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  checkStartDate:function(){
    let startDate=nosNewPage.data.startDate;
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
    let endDate=nosNewPage.data.endDate;
    if(endDate==null||endDate==""){
        wx.showToast({
          title: "请选择结束日期",
        })
        return false;
    }
    else
      return true;
  },
  focusContactName:function(){
    let contactName=nosNewPage.data.contactName;
    if(contactName=="联系人姓名不能为空"){
      nosNewPage.setData({contactName:''});
    }
  },
  checkContactName:function(){
    let contactName=nosNewPage.data.contactName;
    if(contactName==""||contactName==null||contactName=="联系人姓名不能为空"){
      nosNewPage.setData({contactName:'联系人姓名不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  focusPhone:function(){
    let phone=nosNewPage.data.phone;
    if(phone=="联系方式不能为空"){
      nosNewPage.setData({phone:''});
    }
  },
  checkPhone:function(){
    let phone=nosNewPage.data.phone;
    if(phone==""||phone==null||phone=="联系方式不能为空"){
      nosNewPage.setData({phone:'联系方式不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  pickerStartDateChange:function(e){
    let value = e.detail.value;
    console.log(value)
    nosNewPage.setData({startDate:value});
  },
  pickerStartDateCancel:function(){
    nosNewPage.setData({startDate:''});
  },
  pickerEndDateChange:function(e){
    let value = e.detail.value;
    console.log(value)
    nosNewPage.setData({endDate:value});
  },
  pickerEndDateCancel:function(){
    nosNewPage.setData({endDate:''});
  },
  saving:function(flag){
    if(flag){
      nosNewPage.setData({showSubmitBut:false,showSubmitingBut:true});
    }
    else{
      nosNewPage.setData({showSubmitingBut:false,showSubmitedBut:true});
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
        let tradeSelectIndex=getApp().getTradeIndexInListById(nosNewPage,tradeId);
        nosNewPage.setData({companyName:name,tradeSelectId:tradeId,tradeSelectIndex:tradeSelectIndex,contactName:contactName,phone:phone});
      }
    })
  },
  goPage:function(e){
    let pageFlag=e.currentTarget.dataset.pageflag;
    let url="/pages/";
    console.log(pageFlag)
    switch (pageFlag) {
      case nosNewPage.data.homePageFlag:
        url+='home/home';
        break;
      case nosNewPage.data.ssPageFlag:
        url+='subSuc/subSuc';
        break;
    }
    wx.redirectTo({
      url: url,
    })
  }
})