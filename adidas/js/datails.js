(function(){
    getmonth();
    var oTabImage =  Array.from(getSec("ul.image-tab li",true));
    var oTabSmallImage =  Array.from(getSec(".small-image img",true));
    var oTabBigImage =  Array.from(getSec(".big-image img",true));
    var smallImg  = Array.from(getSec('.small-img',true));
    var bigImg    = Array.from(getSec('.big-img',true));
    var container = getSec('.detail-con');
    var smallBox  = getSec('.small-image');
    var mirror    = getSec('.mirror');
    var bigBox    = getSec('.big-image');
    
    
    // oTabImage[0].classList.add("sec-image");
    // oTabSmallImage[0].classList.add("selected-tab");
    // oTabBigImage[0].classList.add("selected-tab");
    oTabSmallImage.forEach(function(item,index){
        item.dataset.index = index;
        item.onmouseenter = function(){
            bigBox.style.display = "block";
            item.style.cursor = "move";
            oTabBigImage[index].classList.add("selected-tab");
            // 放大镜
            var _width  = parseInt(getStyle(smallImg[index], "width"))   * parseInt(getStyle(bigBox, "width"))   / parseInt(getStyle(mirror, "width"));
            var _height = parseInt(getStyle(smallImg[index], "height"))  * parseInt(getStyle(bigBox, "height"))  / parseInt(getStyle(mirror, "height"));
            bigImg[index].style.width  = _width + 610 + "px";
            bigImg[index].style.height = _height + "px";
            // 3. 鼠标移动
                smallBox.onmousemove = function(event) {
                    // 3.1. 计算放大镜的位置
                    var _left = event.clientX - container.offsetLeft - smallBox.offsetLeft - parseInt(getStyle(mirror, "width")) / 2 + window.pageXOffset;
                    var _top  = event.clientY - container.offsetTop - smallBox.offsetTop - parseInt(getStyle(mirror, "height")) / 2  + window.pageYOffset;
                    
                    // 3.2. 计算放大镜/大图可移动的最大距离
                    var _mirrorMaxH = parseInt(getStyle(smallImg[index], "width"))  - parseInt(getStyle(mirror, "width"));
                    var _mirrorMaxV = parseInt(getStyle(smallImg[index], "height")) - parseInt(getStyle(mirror, "height"));
                    var _bigImgMaxH = parseInt(getStyle(bigImg[index], "width"))    - parseInt(getStyle(bigBox, "width"));
                    var _bigImgMaxV = parseInt(getStyle(bigImg[index], "height"))   - parseInt(getStyle(bigBox, "height"));
            
                    // 3.3. 异常处理
                    // 水平
                    if(_left < 0) {
                        _left = 0;
                    }else if(_left > _mirrorMaxH) {
                        _left = _mirrorMaxH;
                    }
                    // 垂直
                    if(_top < 0) {
                        _top = 0;
                    }else if(_top > _mirrorMaxV) {
                        _top = _mirrorMaxV;
                    }
                    // 3.4. 更新放大镜的位置
                    mirror.style.top  = _top  + "px";
                    mirror.style.left = _left + "px";
                    // 3.5. 计算大图移动的距离
                    // 大图移动的距离 = 放大镜移动的距离 * 大图的最大移动距离 / 放大镜的最大移动距离
                    bigImg[index].style.top  = -_top  * _bigImgMaxH / _mirrorMaxH + "px";
                    bigImg[index].style.left = -_left * _bigImgMaxV / _mirrorMaxV + "px";
                }
        }
        item.onmouseleave = function(){
            var index = item.dataset.index;
            bigImg[index].classList.remove("selected-tab");
            bigBox.style.display = "none";
        }
    });
    oTabImage.forEach(function(item,index){
        item.dataset.index = index;
        item.onclick = function(){
            var index = item.dataset.index;
            for(var i = 0, len = oTabSmallImage.length; i < len; i++) {
                if(oTabSmallImage[i].classList.contains('selected-tab')) {
                    oTabImage[i].classList.remove("sec-image");
                    oTabSmallImage[i].classList.remove('selected-tab');
                    // oTabBigImage[i].classList.remove("selected-tab");
                }
            }
            oTabImage[index].classList.add("sec-image");
            oTabSmallImage[index].classList.add('selected-tab');
            // oTabBigImage[index].classList.add("selected-tab");
            
        }
    });

    // 添加购物车   // 待开发
    /* var oAddBtn = getSec(".addBtn");
    var oUser = document.getElementById("user");
    var oShopImage = getSec('.sec-image img').getAttribute("src");
    var oShopName = getSec('.shopName').textContent;
    var oShopDes = getSec('.shopdes').textContent;
    var oShopPrice = getSec('.shoprice').textContent;
    var oShopColorDes = getSec('.shopcolordes').textContent;
    var oSecList = getSec('.secList').value;
    var oSecNum = getSec('.secNum').value; */
    /* oAddBtn.onclick = function(){
        if(oUser.textContent.length <= 3){
            alert("还未登录，请登录账号");
        }else{
            var shops = {
                oShopImage,
                oShopName,
                oShopDes,
                oShopPrice,
                oShopColorDes,
                oSecList,
                oSecNum
            };
            var List = null;
            if(localStorage.shopsList) {
                List = JSON.parse(localStorage.goodsList);
            }else {
                List = [];
            }
            shopsList.push(List);
            localStorage.shopsList = JSON.stringify(shops);
            
            location.href = "../html/shoppingcart.html";
        }
    } */
})();