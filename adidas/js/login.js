(function(){

    function getVerificationCode(length) {
        // 定义随机源
        var str = "";
        str += "QWERTYUIOPASDFGHJKLZXCVBNM";
        str += "1234567890";
        str += "qwertyuiopasdfghjklzxcvbnm";
        // 根据长度截取字符
        var resStr = "";
        for(var i = 0; i < length; i++) {
            // 获取随机下标
            var index = Math.floor(Math.random() * str.length);
            resStr += str.slice(index, index + 1);
        }
        return resStr;
    }
    // 1. 随机验证码
    var oSpan = document.querySelector('.verification-code-box > span')
    oSpan.textContent = getVerificationCode(7);
    oSpan.onclick = function() {
        oSpan.textContent = getVerificationCode(7);
    }
    // 2. 表单验证
    var valObj = {};
    var inputs = Array.from(document.querySelectorAll('.myForm input'));
    var register = document.querySelector('.btn-reg');
    var oTips = Array.from(document.querySelectorAll('.myForm .form-item'));
    var information  = {};
    inputs.forEach(function(input){
        // 实时验证
        input.oninput = function(){
            var val = this.value;
            var flag = false;
            // 存储表单输入的数据
            valObj[this.id] = val;
            switch(this.id){
                case "username": {
                    if(/^\w{5,10}$/.test(val)){
                        flag = true;
                    }
                } break;
                case "firPassword": {
                    if(/^[\w*]{6,}$/.test(val)){
                        flag = true;
                    }
                } break;
                case "secPassword": {
                    if(val === valObj.firPassword){
                        flag = true;
                    }
                } break;
                case "email": {
                    if(/^\w+@[A-Za-z\d]+\.(com|cn)$/.test(val)){
                        flag = true;
                    }
                } break;
                case "verification-code": {
                    var reg = new RegExp(oSpan.textContent, "i");
                    if(reg.test(val)){
                        flag = true;
                    }
                } break;
            }
            if(flag){
                this.parentElement.classList.remove("error");
            }else{
                this.parentElement.classList.add("error");
            }
        }
    });
    register.onclick = function(){
        var isEmpty = false;
        for(var i = 0, len = inputs.length; i < len; i++) {
            if(inputs[i].value.length == 0) {
                isEmpty = true;
                break;
            }
        }
        if(isEmpty){
            new LHYAlertView({
                type: "alert",
                message: "请完善用户信息!!!",
            });
            // 终止后续操作
            return;
        }
        var wrong = false;
        for(var i = 0, len = oTips.length; i < len; i++) {
            if(oTips[i].classList.contains('error')) {
                wrong = true;
                break;
            }
        }
        if(wrong){
            new LHYAlertView({
                type: "alert",
                message: "格式不正确!",
            });
            return;
        }
        inputs.forEach(function(input, index){
            if(index == 0) {
                information[input.id] = `${input.value}`;
            }
            information[input.id] = input.value;
        });
        var message = "";
        if(this.dataset.editing === "true") {
            // 获取编辑下标
            var index = this.dataset.index;
            // 修改本地数据
            var goodsList = JSON.parse(localStorage.goodsList);

            goodsList[index] = information;
            localStorage.goodsList = JSON.stringify(goodsList);
        }else {
            save(information);
            message = "添加成功！";
        }   
        new LHYAlertView({
            message: message,
            autoClose: 500
        })
    
    }
    function save(information) {
        var goodsList = null;
        // 判断本地是否存在商品列表
        // 如果存在，则根据本地商品初始化
        // 否则，直接初始化一个空的数组
        if(localStorage.goodsList) {
            goodsList = JSON.parse(localStorage.goodsList);
        }else {
            goodsList = [];
        }
        goodsList.push(information);
        localStorage.goodsList = JSON.stringify(goodsList);
    }
})();