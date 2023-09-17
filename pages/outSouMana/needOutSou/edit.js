// pages/outSouMana/needOutSou/edit.js
var nosEditPage;
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
    nosEditPage=this;
    rootIP=getApp().getRootIP();
    let id=options.id;
    console.log(id)
    nosEditPage.setData({id:id});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wxUser=wx.getStorageSync("wxUser");
    getApp().getTradeList(nosEditPage);
    nosEditPage.getNOSInfo();
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
    nosEditPage.setData({
      showTradeOption: !nosEditPage.data.showTradeOption,
    });
  },
  // 点击下拉列表
  selectTradeOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let tradeList=nosEditPage.data.tradeList;
    let trade=tradeList[index];
    console.log(index+","+trade.id+","+trade.name);
    nosEditPage.setData({
      tradeSelectIndex: index,
      tradeSelectId: trade.id,
      showTradeOption: !nosEditPage.data.showTradeOption
    });
  },
  checkEdit:function(){
    if(nosEditPage.checkCompanyName()){
      if(nosEditPage.checkTradeId()){
        if(nosEditPage.checkPost()){
          if(nosEditPage.checkEnginName()){
            if(nosEditPage.checkNeedCount()){
              if(nosEditPage.checkSpeciality()){
                if(nosEditPage.checkDescribe()){
                  if(nosEditPage.checkStartDate()){
                    if(nosEditPage.checkEndDate()){
                      if(nosEditPage.checkContactName()){
                        if(nosEditPage.checkPhone()){
                          nosEditPage.editNeedOutSou();
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
    }
  },
  editNeedOutSou:function(){
    nosEditPage.saving(true);
    let id=nosEditPage.data.id;
    let companyName=nosEditPage.data.companyName;
    let tradeSelectId=nosEditPage.data.tradeSelectId;
    let otherTrade=nosEditPage.data.otherTrade;
    let post=nosEditPage.data.post;
    let enginName=nosEditPage.data.enginName;
    let needCount=nosEditPage.data.needCount;
    let speciality=nosEditPage.data.speciality;
    let describe=nosEditPage.data.describe;
    let startDate=nosEditPage.data.startDate;
    let endDate=nosEditPage.data.endDate;
    let contactName=nosEditPage.data.contactName;
    let phone=nosEditPage.data.phone;
    let openId=wxUser.openId;
    console.log("id==="+id)
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
      url: rootIP+"editNeedOutSou",
      data:{id:id,companyName:companyName,tradeId:tradeSelectId,otherTrade:otherTrade,post:post,enginName:enginName,needCount:needCount,speciality:speciality,describe:describe,startDate:startDate,endDate:endDate,contactName:contactName,phone:phone,openId:openId},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let message=data.message;
        console.log("message==="+message)
        if(message=="ok"){
          nosEditPage.saving(false);
          wx.showToast({
            title: data.info,
          })
          setTimeout(() => {
            nosEditPage.goSubSucPage();
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
      nosEditPage.setData({companyName:companyName});
    }
    else if(e.currentTarget.id=="otherTrade_inp"){
      let otherTrade=e.detail.value;
      nosEditPage.setData({otherTrade:otherTrade});
    }
    else if(e.currentTarget.id=="post_inp"){
      let post=e.detail.value;
      nosEditPage.setData({post:post});
    }
    else if(e.currentTarget.id=="enginName_inp"){
      let enginName=e.detail.value;
      nosEditPage.setData({enginName:enginName});
    }
    else if(e.currentTarget.id=="needCount_inp"){
      let needCount=e.detail.value;
      nosEditPage.setData({needCount:needCount});
    }
    else if(e.currentTarget.id=="speciality_inp"){
      let speciality=e.detail.value;
      nosEditPage.setData({speciality:speciality});
    }
    else if(e.currentTarget.id=="describe_inp"){
      let describe=e.detail.value;
      nosEditPage.setData({describe:describe});
    }
    else if(e.currentTarget.id=="contactName_inp"){
      let contactName=e.detail.value;
      nosEditPage.setData({contactName:contactName});
    }
    else if(e.currentTarget.id=="phone_inp"){
      let phone=e.detail.value;
      nosEditPage.setData({phone:phone});
    }
  },
  focusCompanyName:function(){
    let companyName=nosEditPage.data.companyName;
    if(companyName=="公司名称不能为空"){
      nosEditPage.setData({companyName:''});
    }
  },
  checkCompanyName:function(){
    let companyName=nosEditPage.data.companyName;
    if(companyName==""||companyName==null||companyName=="公司名称不能为空"){
      nosEditPage.setData({companyName:'公司名称不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  checkTradeId:function(){
    let tradeSelectId=nosEditPage.data.tradeSelectId;
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
    let otherTrade=nosEditPage.data.otherTrade;
    if(otherTrade=="其他行业不能为空"){
      nosEditPage.setData({otherTrade:''});
    }
  },
  checkOtherTrade:function(){
    let otherTrade=nosEditPage.data.otherTrade;
    if(otherTrade==""||otherTrade==null||otherTrade=="其他行业不能为空"){
      nosEditPage.setData({otherTrade:'其他行业不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  focusPost:function(){
    let post=nosEditPage.data.post;
    if(post=="岗位名称不能为空"){
      nosEditPage.setData({post:''});
    }
  },
  checkPost:function(){
    let post=nosEditPage.data.post;
    if(post==""||post==null||post=="岗位名称不能为空"){
      nosEditPage.setData({post:'岗位名称不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  focusEnginName:function(){
    let enginName=nosEditPage.data.enginName;
    if(enginName=="工程名不能为空"){
      nosEditPage.setData({enginName:''});
    }
  },
  checkEnginName:function(){
    let enginName=nosEditPage.data.enginName;
    if(enginName==""||enginName==null||enginName=="工程名不能为空"){
      nosEditPage.setData({enginName:'工程名不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  checkNeedCount:function(){
    let needCount=nosEditPage.data.needCount;
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
    let speciality=nosEditPage.data.speciality;
    if(speciality=="特长不能为空"){
      nosEditPage.setData({speciality:''});
    }
  },
  checkSpeciality:function(){
    let speciality=nosEditPage.data.speciality;
    console.log(speciality)
    if(speciality==""||speciality==null||speciality=="特长不能为空"){
      nosEditPage.setData({speciality:'特长不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  focusDescribe:function(){
    let describe=nosEditPage.data.describe;
    if(describe=="描述不能为空"){
      nosEditPage.setData({describePlaceholder:'请填写描述'});
      nosEditPage.setData({describe:''});
    }
  },
  checkDescribe:function(){
    let describe=nosEditPage.data.describe;
    console.log(describe)
    if(describe==""||describe==null||describe=="描述不能为空"){
      nosEditPage.setData({describePlaceholder:''});
      nosEditPage.setData({describe:'描述不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  checkStartDate:function(){
    let startDate=nosEditPage.data.startDate;
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
    let endDate=nosEditPage.data.endDate;
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
    let contactName=nosEditPage.data.contactName;
    if(contactName=="联系人姓名不能为空"){
      nosEditPage.setData({contactName:''});
    }
  },
  checkContactName:function(){
    let contactName=nosEditPage.data.contactName;
    if(contactName==""||contactName==null||contactName=="联系人姓名不能为空"){
      nosEditPage.setData({contactName:'联系人姓名不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  focusPhone:function(){
    let phone=nosEditPage.data.phone;
    if(phone=="联系方式不能为空"){
      nosEditPage.setData({phone:''});
    }
  },
  checkPhone:function(){
    let phone=nosEditPage.data.phone;
    if(phone==""||phone==null||phone=="联系方式不能为空"){
      nosEditPage.setData({phone:'联系方式不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  pickerStartDateChange:function(e){
    let value = e.detail.value;
    console.log(value)
    nosEditPage.setData({startDate:value});
  },
  pickerStartDateCancel:function(){
    nosEditPage.setData({startDate:''});
  },
  pickerEndDateChange:function(e){
    let value = e.detail.value;
    console.log(value)
    nosEditPage.setData({endDate:value});
  },
  pickerEndDateCancel:function(){
    nosEditPage.setData({endDate:''});
  },
  saving:function(flag){
    if(flag){
      nosEditPage.setData({showSubmitBut:false,showSubmitingBut:true});
    }
    else{
      nosEditPage.setData({showSubmitingBut:false,showSubmitedBut:true});
    }
  },
  getNOSInfo:function(){
    let id=nosEditPage.data.id;
    wx.request({
      url: rootIP+"getNeedOutSou",
      method: 'POST',
      data: { id:id},
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log(res);
        let data=res.data;
        let needOutSou=data.needOutSou;
        let companyName=needOutSou.companyName;
        let tradeId=needOutSou.tradeId;
        let tradeSelectIndex=getApp().getTradeIndexInListById(nosEditPage,tradeId);
        let otherTrade=needOutSou.otherTrade;
        let post=needOutSou.post;
        let enginName=needOutSou.enginName;
        let needCount=needOutSou.needCount;
        let speciality=needOutSou.speciality;
        let describe=needOutSou.describe;
        let describePlaceholder=needOutSou.describePlaceholder;
        describePlaceholder=describe==null?describePlaceholder:"";
        let startDate=needOutSou.startDate;
        let endDate=needOutSou.endDate;
        let contactName=needOutSou.contactName;
        let phone=needOutSou.phone;
        nosEditPage.setData({companyName:companyName,tradeSelectId:tradeId,tradeSelectIndex:tradeSelectIndex,otherTrade:otherTrade,post:post,enginName:enginName,needCount:needCount,speciality:speciality,describe:describe,describePlaceholder:describePlaceholder,startDate:startDate,endDate:endDate,contactName:contactName,phone:phone});
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
      url: '/pages/outSouMana/needOutSou/list',
    })
  }
})