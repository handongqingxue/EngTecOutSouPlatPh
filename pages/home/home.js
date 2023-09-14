// pages/home/home.js
var home;
var rootIP;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nos:1,
    pos:2,
    comLogin:3,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    home=this;
    rootIP=getApp().getRootIP();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    home.login();
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
  login: function(e) {
    //https://pythonjishu.com/wirvsmuzfagvzej/
    //https://www.zhihu.com/question/272220287/answer/2825656622
    //https://www.xuexiareas.com/index/Articles/details/num/603.html
    //https://www.5axxw.com/questions/simple/p9di6v
    wx.login({ 
      success: function(res) {
        console.log("code="+res.code)
        if (res.code) { // 发送 res.code 到后台换取 openId, sessionKey, unionId
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              appid: 'wxa81e31805c520754',
              secret: '08eb5c17224c178d500c2ac441494cd8',
              js_code: res.code,
              grant_type: 'authorization_code'
            },
            success:function(res) {
              console.log(res)
              const openid = res.data.openid; // 用户的openid
              const sessionKey = res.data.session_key; // 会话密钥
              console.log(openid, sessionKey);
              home.setData({openId:openid});
              home.getUserInfo();
            }
          })
        } 
      } 
    }) 
  },
  getUserInfo: function(e) { 
    wx.getUserInfo({ 
      withCredentials: true, 
      success: function(res) { 
        var userInfo=res.userInfo;
        console.log(userInfo) 
        home.setData({nickName:userInfo.nickName,avatarUrl:userInfo.avatarUrl});
        home.addOrEditWXUser();
      } 
    }) 
  },
  addOrEditWXUser: function() {
    let openId=home.data.openId;
    let nickName=home.data.nickName;
    let avatarUrl=home.data.avatarUrl;
    console.log("openId==="+openId)
    console.log("nickName==="+nickName)
    console.log("avatarUrl==="+avatarUrl)
    wx.request({
      url: rootIP+"addOrEditWXUser",
      data:{openId:openId,nickName:nickName,avatarUrl:avatarUrl},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let message=data.message;
        console.log("message==="+message)
        var wxUser={openId:openId,nickName:nickName,avatarUrl:avatarUrl};
        wx.setStorageSync("wxUser",wxUser);
      }
    })
  },
  goPage:function(e){
    let pageFlag=e.currentTarget.dataset.pageflag;
    let url="/pages/";
    console.log(pageFlag)
    switch (pageFlag) {
      case home.data.nos:
        url+='outSouMana/needOutSou/new';
        break;
      case home.data.pos:
        url+='outSouMana/proOutSou/new';
        break;
      case home.data.comLogin:
        url+='comLogin/comLogin';
        break;
      }
      wx.redirectTo({
        url: url,
      })
    }
  })