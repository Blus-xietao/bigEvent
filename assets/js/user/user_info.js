$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    });
    // 初始化用户信息
    userinfo()
    function userinfo() {
        $.ajax({
            method: "get",
            url: "/my/userinfo",
            success(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取用户基本信息失败！')
                }
                // 调用form.val()快速为form表单赋值
                form.val("formuserInfo", res.data)
            }
        })
    }
    // 重置按钮重置表单数据
    $('#btnreset').on('click', function (e) {
        // console.log('重置');
        // 阻止默认
        e.preventDefault()
        // 获取最新的数据
        userinfo()
    })
    // 提交按钮 发送ajax的post请求
    $('.layui-form').on('submit', function (e) {
        // 阻止默认
        e.preventDefault()
        // 发送ajax的post请求
        $.ajax({
            method: "post",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg("更新用户信息失败")
                }
                layer.msg("更新用户信息成功")
                // 调用父页面中的方法,重新渲染用户的头像和信息
                window.parent.getUserInfo()
            }

        })
        /* $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
              if (res.status !== 0) {
                return layer.msg('更新用户信息失败！')
              }
              layer.msg('更新用户信息成功！')
              // 调用父页面中的方法，重新渲染用户的头像和用户的信息
              window.parent.getUserInfo()
            }
        })   */
    })
    
})
