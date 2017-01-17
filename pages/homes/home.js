// pages/about/about.js
var app = getApp();
var Constant = require('../../utils/constants.js');
Page({
  data:{
    images:[{
        url:"../../images/mm.jpg"}],
  },
      lastId:0,
  onLoad:function(){
     var that = this;
    // 页面初始化 options为页面跳转所带来的参数
        var lenght = Constant.GET_URL.lastIndexOf("\/"); 
      requestData(that,mCurrentPage);
  },
  loadMore:function(event){
    var that =this; 
    var index =Constant.GET_URL.lastIndexOf("\/");
    var length=  Constant.GET_URL.lenght;
    var str  = Constant.GET_URL .substring(index + 1,length);
    requestData(that,mCurrentPage+1,str);
  }
});
var mCurrentPage =1;
function requestData(that,targetPage,str){
      wx.request({
      url:Constant.GET_URL.replace(str, targetPage),
      header: {
      'content-type': 'application/json'
            },
       success: function(res) {
            console.log(res.data.results.length);
             console.log(res.data.results);
          that.setData({
            images:res.data.results
             });
              mCurrentPage = targetPage;
              console.log(mCurrentPage);
        }
    })
}
