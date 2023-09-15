// app.js
var rootIP = "http://localhost:8080/EngTecOutSouPlat/phone/";

App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  },
  getRootIP:function(){
    return rootIP;
  },
  getTradeList:function(page){
    wx.request({
      url: rootIP+"initTradeCBBData",
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let message=data.message;
        if(message=="ok"){
          let tradeList=data.tradeList;
          page.setData({tradeList:tradeList});
        }
      }
    })
  },
  getTradeNameById:function(page,tradeId){
    var tradeName;
    var tradeList=page.data.tradeList;
    for(var i=0;i<tradeList.length;i++){
      var trade=tradeList[i];
      if(tradeId==trade.id){
        tradeName=trade.name;
        break;
      }
    }
    return tradeName;
  },
  getPostList:function(page){
    wx.request({
      url: rootIP+"initPostCBBData",
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let message=data.message;
        if(message=="ok"){
          let postList=data.postList;
          page.setData({postList:postList});
        }
      }
    })
  },
  getPostNameById:function(page,postId){
    var postName;
    var postList=page.data.postList;
    for(var i=0;i<postList.length;i++){
      var post=postList[i];
      if(postId==post.id){
        postName=post.name;
        break;
      }
    }
    return postName;
  },
})
