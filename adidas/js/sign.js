(function(){
    var username = document.querySelector('#username');
    var password = document.querySelector('#firPassword');
    var sign    = document.querySelector('.btn-sign');
    var information = JSON.parse(localStorage.goodsList);
    sign.onclick = function (){
        for(var i = 0,len = information.length; i < len; i++){
            if((information[i].username === username.value) && (information[i].firPassword === password.value)){
                new LHYAlertView({
                    type: "alert",
                    message: "登陆成功！",
                    autoClose: 1000
                })
                break;
            }else if(username.value === "" || password.value === ""){
                new LHYAlertView({
                    type: "alert",
                    message: "请完善登陆信息"
                })
                break;
            }else if((information[i].username === username.value) && (information[i].firPassword !== password.value)){
                new LHYAlertView({
                    type: "alert",
                    message: "密码错误，请重新输入密码"
                })
                break;
            }else{
                new LHYAlertView({
                    type: "alert",
                    message: "该账号未注册,请先注册账号！"
                })
                break;
            }
        }
    }
})();