$(function () {
    // 表单切换
    $('#login').on("click", function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#reg').on("click", function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 表单验证
    //获取要操作的form模块
    var form = layui.form
    form.verify({
        // 自定义pwd的校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            var pwd = $('.reg-box [name="password"]').val()
            if (pwd !== value) {
                return "两次密码不一致"
            }
        }
    });
    // 获取layer模块(弹出层模块)
    var layer = layui.layer
    //监听注册表单
    $("#form_reg").on('submit', function (e) {
        e.preventDefault() //组织默认行为
        // 发起post请求
        var data = {
            username: $('.reg-box [name=username]').val(),
            password: $('.reg-box [name=password]').val()
        }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg(res.message)
            $('#reg').click()
        })
    })
    //监听登录表单
    $("#form_login").on('submit', function (e) {
        e.preventDefault() //组织默认行为
        $.ajax({
            url: '/api/login',
            type: 'post',
            data: $(this).serialize(), //快速获取表单数据方法
            success(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                // 将登录成功后的token值存到localStorage中
                //token相当于是身份标识  
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })












})