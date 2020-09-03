// 发送请求之前执行
// options : 请求参数对象
$.ajaxPrefilter(function (options) {
    options.url = "http://ajax.frontend.itheima.net" + options.url
    // 统一为有权限的接口设置hearder请求头
    if (options.url.indexOf("/my/") !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ""
        }
    }
    // 全局调用complete函数
    options.complete = function (res) {
        // console.log(res);
        // 使用res.responseJSON获取信息
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            // 1. 清空token
            localStorage.removeItem('token')
            // 2. 跳转到登录页面
            location.href = "/login.html"
        }
    }
})