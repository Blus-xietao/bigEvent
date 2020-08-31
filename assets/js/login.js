$(function () {
    $('#login').on("click", function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#reg').on("click", function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    $('#reg').click()
    
})