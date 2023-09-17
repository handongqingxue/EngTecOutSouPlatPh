// pages/outSouMana/proOutSou/edit.js
var posEditPage;
var rootIP;
var wxUser;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backButSign:'<',
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
    posEditPage=this;
    rootIP=getApp().getRootIP();
    let id=options.id;
    console.log(id)
    posEditPage.setData({id:id});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wxUser=wx.getStorageSync("wxUser");
    getApp().getTradeList(posEditPage);
    posEditPage.getPOSInfo();
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
    posEditPage.setData({
      showTradeOption: !posEditPage.data.showTradeOption,
    });
  },
  // 点击下拉列表
  selectTradeOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let tradeList=posEditPage.data.tradeList;
    let trade=tradeList[index];
    console.log(index+","+trade.id+","+trade.name);
    posEditPage.setData({
      tradeSelectIndex: index,
      tradeSelectId: trade.id,
      showTradeOption: !posEditPage.data.showTradeOption
    });
  },
  checkEdit:function(){
    if(posEditPage.checkCompanyName()){
      if(posEditPage.checkTradeId()){
        if(posEditPage.checkPost()){
          if(posEditPage.checkProCount()){
            if(posEditPage.checkSpeciality()){
              if(posEditPage.checkDescribe()){
                if(posEditPage.checkStartDate()){
                  if(posEditPage.checkEndDate()){
                    if(posEditPage.checkContactName()){
                      if(posEditPage.checkPhone()){
                        posEditPage.editproOutSou();
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
  editproOutSou:function(){
    posEditPage.saving(true);
    let id=posEditPage.data.id;
    let companyName=posEditPage.data.companyName;
    let tradeSelectId=posEditPage.data.tradeSelectId;
    let otherTrade=posEditPage.data.otherTrade;
    let post=posEditPage.data.post;
    let proCount=posEditPage.data.proCount;
    let speciality=posEditPage.data.speciality;
    let describe=posEditPage.data.describe;
    let startDate=posEditPage.data.startDate;
    let endDate=posEditPage.data.endDate;
    let contactName=posEditPage.data.contactName;
    let phone=posEditPage.data.phone;
    let openId=wxUser.openId;
    console.log("id==="+id)
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
      url: rootIP+"editProOutSou",
      data:{id:id,companyName:companyName,tradeId:tradeSelectId,otherTrade:otherTrade,post:post,proCount:proCount,speciality:speciality,describe:describe,startDate:startDate,endDate:endDate,contactName:contactName,phone:phone,openId:openId},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let message=data.message;
        console.log("message==="+message)
        if(message=="ok"){
          posEditPage.saving(false);
          wx.showToast({
            title: data.info,
          })
          setTimeout(() => {
            posEditPage.goSubSucPage();
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
      posEditPage.setData({companyName:companyName});
    }
    else if(e.currentTarget.id=="otherTrade_inp"){
      let otherTrade=e.detail.value;
      posEditPage.setData({otherTrade:otherTrade});
    }
    else if(e.currentTarget.id=="post_inp"){
      let post=e.detail.value;
      posEditPage.setData({post:post});
    }
    else if(e.currentTarget.id=="enginName_inp"){
      let enginName=e.detail.value;
      posEditPage.setData({enginName:enginName});
    }
    else if(e.currentTarget.id=="proCount_inp"){
      let proCount=e.detail.value;
      posEditPage.setData({proCount:proCount});
    }
    else if(e.currentTarget.id=="speciality_inp"){
      let speciality=e.detail.value;
      posEditPage.setData({speciality:speciality});
    }
    else if(e.currentTarget.id=="describe_inp"){
      let describe=e.detail.value;
      posEditPage.setData({describe:describe});
    }
    else if(e.currentTarget.id=="contactName_inp"){
      let contactName=e.detail.value;
      posEditPage.setData({contactName:contactName});
    }
    else if(e.currentTarget.id=="phone_inp"){
      let phone=e.detail.value;
      posEditPage.setData({phone:phone});
    }
  },
  focusCompanyName:function(){
    let companyName=posEditPage.data.companyName;
    if(companyName=="公司名称不能为空"){
      posEditPage.setData({companyName:''});
    }
  },
  checkCompanyName:function(){
    let companyName=posEditPage.data.companyName;
    if(companyName==""||companyName==null||companyName=="公司名称不能为空"){
      posEditPage.setData({companyName:'公司名称不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  checkTradeId:function(){
    let tradeSelectId=posEditPage.data.tradeSelectId;
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
    let otherTrade=posEditPage.data.otherTrade;
    if(otherTrade=="其他行业不能为空"){
      posEditPage.setData({otherTrade:''});
    }
  },
  checkOtherTrade:function(){
    let otherTrade=posEditPage.data.otherTrade;
    if(otherTrade==""||otherTrade==null||otherTrade=="其他行业不能为空"){
      posEditPage.setData({otherTrade:'其他行业不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  focusPost:function(){
    let post=posEditPage.data.post;
    if(post=="岗位名称不能为空"){
      posEditPage.setData({post:''});
    }
  },
  checkPost:function(){
    let post=posEditPage.data.post;
    if(post==""||post==null||post=="岗位名称不能为空"){
      posEditPage.setData({post:'岗位名称不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  checkProCount:function(){
    let proCount=posEditPage.data.proCount;
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
    let speciality=posEditPage.data.speciality;
    if(speciality=="特长不能为空"){
      posEditPage.setData({speciality:''});
    }
  },
  checkSpeciality:function(){
    let speciality=posEditPage.data.speciality;
    console.log(speciality)
    if(speciality==""||speciality==null||speciality=="特长不能为空"){
      posEditPage.setData({speciality:'特长不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  focusDescribe:function(){
    let describe=posEditPage.data.describe;
    if(describe=="描述不能为空"){
      posEditPage.setData({describePlaceholder:'请填写描述'});
      posEditPage.setData({describe:''});
    }
  },
  checkDescribe:function(){
    let describe=posEditPage.data.describe;
    console.log(describe)
    if(describe==""||describe==null||describe=="描述不能为空"){
      posEditPage.setData({describePlaceholder:''});
      posEditPage.setData({describe:'描述不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  checkStartDate:function(){
    let startDate=posEditPage.data.startDate;
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
    let endDate=posEditPage.data.endDate;
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
    let contactName=posEditPage.data.contactName;
    if(contactName=="联系人姓名不能为空"){
      posEditPage.setData({contactName:''});
    }
  },
  checkContactName:function(){
    let contactName=posEditPage.data.contactName;
    if(contactName==""||contactName==null||contactName=="联系人姓名不能为空"){
      posEditPage.setData({contactName:'联系人姓名不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  focusPhone:function(){
    let phone=posEditPage.data.phone;
    if(phone=="联系方式不能为空"){
      posEditPage.setData({phone:''});
    }
  },
  checkPhone:function(){
    let phone=posEditPage.data.phone;
    if(phone==""||phone==null||phone=="联系方式不能为空"){
      posEditPage.setData({phone:'联系方式不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  pickerStartDateChange:function(e){
    let value = e.detail.value;
    console.log(value)
    posEditPage.setData({startDate:value});
  },
  pickerStartDateCancel:function(){
    posEditPage.setData({startDate:''});
  },
  pickerEndDateChange:function(e){
    let value = e.detail.value;
    console.log(value)
    posEditPage.setData({endDate:value});
  },
  pickerEndDateCancel:function(){
    posEditPage.setData({endDate:''});
  },
  saving:function(flag){
    if(flag){
      posEditPage.setData({showSubmitBut:false,showSubmitingBut:true});
    }
    else{
      posEditPage.setData({showSubmitingBut:false,showSubmitedBut:true});
    }
  },
  getPOSInfo:function(){
    let id=posEditPage.data.id;
    wx.request({
      url: rootIP+"getProOutSou",
      method: 'POST',
      data: { id:id},
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log(res);
        let data=res.data;
        let proOutSou=data.proOutSou;
        let companyName=proOutSou.companyName;
        let tradeId=proOutSou.tradeId;
        let tradeSelectIndex=getApp().getTradeIndexInListById(posEditPage,tradeId);
        let otherTrade=proOutSou.otherTrade;
        let post=proOutSou.post;
        let proCount=proOutSou.proCount;
        let speciality=proOutSou.speciality;
        let describe=proOutSou.describe;
        let describePlaceholder=proOutSou.describePlaceholder;
        describePlaceholder=describe==null?describePlaceholder:"";
        let startDate=proOutSou.startDate;
        let endDate=proOutSou.endDate;
        let contactName=proOutSou.contactName;
        let phone=proOutSou.phone;
        posEditPage.setData({companyName:companyName,tradeSelectId:tradeId,tradeSelectIndex:tradeSelectIndex,otherTrade:otherTrade,post:post,proCount:proCount,speciality:speciality,describe:describe,describePlaceholder:describePlaceholder,startDate:startDate,endDate:endDate,contactName:contactName,phone:phone});
      }
    })
  },
  goSubSucPage:function(){
    wx.redirectTo({
      url: '/pages/subSuc/subSuc',
    })
  },
  goPage:function(){
    wx.redirectTo({
      url: '/pages/outSouMana/proOutSou/list',
    })
  }
})