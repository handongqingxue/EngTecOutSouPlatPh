// pages/proOutSou/proOutSou.js
var posNewPage;
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
    posNewPage=this;
    rootIP=getApp().getRootIP();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wxUser=wx.getStorageSync("wxUser");
    getApp().getTradeList(posNewPage);
    posNewPage.getComInfo();
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
    posNewPage.setData({
      showTradeOption: !posNewPage.data.showTradeOption,
    });
  },
  // 点击下拉列表
  selectTradeOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let tradeList=posNewPage.data.tradeList;
    let trade=tradeList[index];
    console.log(index+","+trade.id+","+trade.name);
    posNewPage.setData({
      tradeSelectIndex: index,
      tradeSelectId: trade.id,
      showTradeOption: !posNewPage.data.showTradeOption
    });
  },
  checkNew:function(){
    if(posNewPage.checkCompanyName()){
      if(posNewPage.checkTradeId()){
        if(posNewPage.checkPost()){
          if(posNewPage.checkProCount()){
            if(posNewPage.checkSpeciality()){
              if(posNewPage.checkDescribe()){
                if(posNewPage.checkStartDate()){
                  if(posNewPage.checkEndDate()){
                    if(posNewPage.checkContactName()){
                      if(posNewPage.checkPhone()){
                        posNewPage.newProOutSou();
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
  newProOutSou:function(){
    posNewPage.saving(true);
    let companyName=posNewPage.data.companyName;
    let tradeSelectId=posNewPage.data.tradeSelectId;
    let otherTrade=posNewPage.data.otherTrade;
    let post=posNewPage.data.post;
    let proCount=posNewPage.data.proCount;
    let speciality=posNewPage.data.speciality;
    let describe=posNewPage.data.describe;
    let startDate=posNewPage.data.startDate;
    let endDate=posNewPage.data.endDate;
    let contactName=posNewPage.data.contactName;
    let phone=posNewPage.data.phone;
    let openId=wxUser.openId;
    console.log("companyName==="+companyName)
    console.log("tradeSelectId==="+tradeSelectId)
    console.log("otherTrade==="+otherTrade)
    console.log("post==="+post)
    console.log("proCount==="+proCount)
    console.log("speciality==="+speciality)
    console.log("describe==="+describe)
    console.log("startDate==="+startDate)
    console.log("endDate==="+endDate)
    console.log("contactName==="+contactName)
    console.log("phone==="+phone)
    console.log("openId==="+openId)
    //return false;
    wx.request({
      url: rootIP+"submitProOutSou",
      data:{companyName:companyName,tradeId:tradeSelectId,otherTrade:otherTrade,post:post,proCount:proCount,speciality:speciality,describe:describe,startDate:startDate,endDate:endDate,contactName:contactName,phone:phone,openId:openId},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let message=data.message;
        console.log("message==="+message)
        if(message=="ok"){
          posNewPage.saving(false);
          wx.showToast({
            title: data.info,
          })
          setTimeout(() => {
            let ssPageFlag=posNewPage.data.ssPageFlag;
            var e={currentTarget:{dataset:{pageflag:ssPageFlag}}};
            posNewPage.goPage(e);
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
      posNewPage.setData({companyName:companyName});
    }
    else if(e.currentTarget.id=="otherTrade_inp"){
      let otherTrade=e.detail.value;
      posNewPage.setData({otherTrade:otherTrade});
    }
    else if(e.currentTarget.id=="post_inp"){
      let post=e.detail.value;
      posNewPage.setData({post:post});
    }
    else if(e.currentTarget.id=="proCount_inp"){
      let proCount=e.detail.value;
      posNewPage.setData({proCount:proCount});
    }
    else if(e.currentTarget.id=="speciality_inp"){
      let speciality=e.detail.value;
      posNewPage.setData({speciality:speciality});
    }
    else if(e.currentTarget.id=="describe_inp"){
      let describe=e.detail.value;
      posNewPage.setData({describe:describe});
    }
    else if(e.currentTarget.id=="contactName_inp"){
      let contactName=e.detail.value;
      posNewPage.setData({contactName:contactName});
    }
    else if(e.currentTarget.id=="phone_inp"){
      let phone=e.detail.value;
      posNewPage.setData({phone:phone});
    }
  },
  focusCompanyName:function(){
    let companyName=posNewPage.data.companyName;
    if(companyName=="公司名称不能为空"){
      posNewPage.setData({companyName:''});
    }
  },
  checkCompanyName:function(){
    let companyName=posNewPage.data.companyName;
    if(companyName==""||companyName==null||companyName=="公司名称不能为空"){
      posNewPage.setData({companyName:'公司名称不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  checkTradeId:function(){
    let tradeSelectId=posNewPage.data.tradeSelectId;
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
    let otherTrade=posNewPage.data.otherTrade;
    if(otherTrade=="其他行业不能为空"){
      posNewPage.setData({otherTrade:''});
    }
  },
  checkOtherTrade:function(){
    let otherTrade=posNewPage.data.otherTrade;
    console.log(otherTrade)
    if(otherTrade==""||otherTrade==null||otherTrade=="其他行业不能为空"){
      posNewPage.setData({otherTrade:'其他行业不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  focusPost:function(){
    let post=posNewPage.data.post;
    if(post=="岗位名称不能为空"){
      posNewPage.setData({post:''});
    }
  },
  checkPost:function(){
    let post=posNewPage.data.post;
    console.log(post)
    if(post==""||post==null||post=="岗位名称不能为空"){
      posNewPage.setData({post:'岗位名称不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  checkProCount:function(){
    let proCount=posNewPage.data.proCount;
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
  focusSpeciality:function(){
    let speciality=posNewPage.data.speciality;
    if(speciality=="特长不能为空"){
      posNewPage.setData({speciality:''});
    }
  },
  checkSpeciality:function(){
    let speciality=posNewPage.data.speciality;
    if(speciality==""||speciality==null||speciality=="特长不能为空"){
      posNewPage.setData({speciality:'特长不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  focusDescribe:function(){
    let describe=posNewPage.data.describe;
    if(describe=="描述不能为空"){
      posNewPage.setData({describePlaceholder:'请填写描述'});
      posNewPage.setData({describe:''});
    }
  },
  checkDescribe:function(){
    let describe=posNewPage.data.describe;
    console.log(describe)
    if(describe==""||describe==null||describe=="描述不能为空"){
      posNewPage.setData({describePlaceholder:''});
      posNewPage.setData({describe:'描述不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  checkStartDate:function(){
    let startDate=posNewPage.data.startDate;
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
    let endDate=posNewPage.data.endDate;
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
    let contactName=posNewPage.data.contactName;
    if(contactName=="姓名不能为空"){
      posNewPage.setData({contactName:''});
    }
  },
  checkContactName:function(){
    let contactName=posNewPage.data.contactName;
    if(contactName==""||contactName==null||contactName=="姓名不能为空"){
      posNewPage.setData({contactName:'姓名不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  focusPhone:function(){
    let phone=posNewPage.data.phone;
    if(phone=="联系方式不能为空"){
      posNewPage.setData({phone:''});
    }
  },
  checkPhone:function(){
    let phone=posNewPage.data.phone;
    console.log(phone)
    if(phone==""||phone==null||phone=="联系方式不能为空"){
      posNewPage.setData({phone:'联系方式不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  pickerStartDateChange:function(e){
    let value = e.detail.value;
    console.log(value)
    posNewPage.setData({startDate:value});
  },
  pickerStartDateCancel:function(){
    posNewPage.setData({startDate:''});
  },
  pickerEndDateChange:function(e){
    let value = e.detail.value;
    console.log(value)
    posNewPage.setData({endDate:value});
  },
  pickerEndDateCancel:function(){
    posNewPage.setData({endDate:''});
  },
  saving:function(flag){
    if(flag){
      posNewPage.setData({showSubmitBut:false,showSubmitingBut:true});
    }
    else{
      posNewPage.setData({showSubmitingBut:false,showSubmitedBut:true});
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
        let tradeSelectIndex=getApp().getTradeIndexInListById(posNewPage,tradeId);
        posNewPage.setData({companyName:name,tradeSelectId:tradeId,tradeSelectIndex:tradeSelectIndex,contactName:contactName,phone:phone});
      }
    })
  },
  goPage:function(e){
    let pageFlag=e.currentTarget.dataset.pageflag;
    let url="/pages/";
    console.log(pageFlag)
    switch (pageFlag) {
      case posNewPage.data.homePageFlag:
        url+='home/home';
        break;
      case posNewPage.data.ssPageFlag:
        url+='subSuc/subSuc';
        break;
    }
    wx.redirectTo({
      url: url,
    })
  }
})