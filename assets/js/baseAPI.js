// 发送请求之前执行
// options : 请求参数对象
$.ajaxPrefilter(function(options){
options.url = "http://ajax.frontend.itheima.net"+options.url
})