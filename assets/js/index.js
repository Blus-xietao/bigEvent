$(function () {
    getUserInfo() // 获取用户的基本信息

    $("#btnreturn").on('click', function () {
        layui.layer.confirm('是否退出登录', { icon: 3, title: '提示' }, function (index) {
            // 1.清空本地存储的token
            localStorage.removeItem('token')
            // 2.重新跳转到登录页面
            location.href = "/login.html"
            // 关闭confirm询问框
            layer.close(index);
        });
    })
})
// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: "get",
        url: "/my/userinfo",
        success(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取失败')
            }
            renderAvatar(res.data) // 调用 renderAvatar 渲染用户的头像
        }
    })
}
// 渲染用户头像
function renderAvatar(user) {
    // 1. 获取昵称或者用户名
    var name = user.nickname || user.username
    // 2. 设置欢迎文本
    $('#welcome').html(`欢迎&nbsp;&nbsp;${name}`)
    // 3.按需要渲染用户头像
    if (user.user_pic !== null) {
        // 3.1 渲染图片头像并显示
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 3.2 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }

}