// pages/about/about.js
var app = getApp();
var Constant = require('../../utils/constants.js');
Page({
  data:{
    images:[],
    status:true,
    loadHidden:true,
  },
  onLoad:function(){
    //显示出网络加载中提示
    this.setData({loadHidden:false})
     var that = this;
     //获取网络类型
      wx.getNetworkType({
        success: function(res) {
          var networkType = res.networkType // 返回网络类型2g，3g，4g，wifi
          if(networkType != 'wifi'){
            //可以做在wifi情况下的弹出框       
          }
        }
      })
    
    // 页面初始化 options为页面跳转所带来的参数
      requestData(that,mCurrentPage);
  },
  loadMore:function(event){
    var that =this; 
    // 这里是为了替换获取数据的page数目
    var index =Constant.GET_URL.lastIndexOf("\/");
    var length=  Constant.GET_URL.lenght;
    var str  = Constant.GET_URL .substring(index + 1,length);
    requestData(that,mCurrentPage+1,str);
  },
  toastHide:function(event){
    console.log(1111);
    this.setData({status:true})
  },
  loadHidden:function(event){
    this.setData({loadHidden:true})
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
         if(res.data.results == null){
              that.setData({
                  status:false
              });
              return false;
              // wx.showToast({
              //     title: '没有更多图片',
              //     // icon: 'loading',
              //     duration: 3000
              //         })
         }
            console.log(res.data.results.length);
            console.log(res.data.results);
            var dataArr = that.data.images
            //合并数据，使加载更多成功
            var newData = dataArr.concat(res.data.results)
            that.setData({
              images: newData
                });
                mCurrentPage = targetPage;
                console.log(mCurrentPage);
        },
        complete:function(){
          //隐藏加载中的提示
          that.setData({loadHidden:true})
        }
    })
}
