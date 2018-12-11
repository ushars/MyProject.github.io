function getSec(Sel, isAll) {
    if(isAll) {
        return document.querySelectorAll(Sel);
    }else {
        return document.querySelector(Sel);
    }
}
// 获取非行类样式的值
function getStyle(el, attr) {
    // 兼容IE
    if (el.currentStyle) {
        return el.currentStyle[attr];
    } else {
        return getComputedStyle(el, null)[attr];
    }
}
// 导航栏切换
function tab(){
    var oTab = Array.from(getSec(".nav-tab > li", true));
    oTab.forEach(function(items, index){
        items.dataset.index = index;
        items.onmouseenter = function(){
            var index = items.dataset.index;
            for(var i = 0, len = oTab.length; i < len; i++) {
                if(oTab[i].classList.contains('selected')) {
                    oTab[i].classList.remove('selected');
                }
            }
            oTab[index].classList.add('selected');
        }
        items.onmouseleave = function(){
            for(var i = 0, len = oTab.length; i < len; i++) {
                if(oTab[i].classList.contains('selected')) {
                    oTab[i].classList.remove('selected');
                    
                }
            }
        }
        
    });
}
// 导航栏动态加载
function getTab(url,getEl){ 
    var oBoy = getSec(getEl);
    $.ajax({
        url:url,
        success:function(items){
            var htmlStr = "";
            items.forEach(function(item){
                htmlStr += 
                        `
                        <div class="girl-tab">
                            <p><a>${item.tui}</a></p>
                            <ul>
                                ${(function(){
                                    var Str = "";
                                    item.pro.forEach(function(list){
                                        Str += `<li><a href="">${list}</a></li>`;
                                    });
                                    return Str;
                                })()}
                                
                            </ul>
                            <h4><a>${item.chanping}</a></h4>
                        </div>
                        `;
            });
            oBoy.innerHTML = htmlStr;
        }
    });
}
function getTabNav(url,getEl){
    var oSport = getSec(getEl);
    $.ajax({
        url:url,
        success:function(items){
            var htmlStr = "";
            items.forEach(function(item){
                if(item.img){
                    htmlStr +=`
                        <div class="common-tab">
                                <p><a><i class="iconfont">&#xe618;</i>${item.tui}</a></p>
                                <ul>
                                    <li><a href=""><img src="../images/${item.img}"></a></li>
                                    ${(function(){
                                        var Str = "";
                                        item.pro.forEach(function(list){
                                            Str += `<li><a href="">${list}</a></li>`;
                                        });
                                        return Str;
                                    })()}
                                </ul>
                                <h4><a>${item.chanping}</a></h4>
                            </div>
                        `;
                }else{
                    htmlStr +=`
                            <div class="common-other">
                            <p><a href="">${item.tui}</a></p>
                            <ul>
                                <li><a href="">${(function(){
                                    var Str = "";
                                    item.pro.forEach(function(list){
                                        Str += `<li><a href="">${list}</a></li>`;
                                    });
                                    return Str;
                                })()}</a></li>
                                
                            </ul>
                        </div>
                        `;
                }
            });
            oSport.innerHTML = htmlStr;
        }
    });
}
// 主页轮播图效果
function scroll() {
    var _prevBtn     = getSec('.scroll .prev');
    var _nextBtn     = getSec('.scroll .next');
    var _idots       = getSec('.scroll .idot', true);
    var _wrapper     = getSec('.scroll-flash-wrapper');
    var _imgBox      = getSec('.scroll .img-box');
    var _curIndex    = 1; 
    var _timer       = null;  
    var _isAnimating = false; 
    var _kWidth      = parseInt(getStyle(_wrapper, "width"));
    _wrapper.style.height  = getStyle(_imgBox, "height");
    _imgBox.style.left     = "-" + _kWidth + "px";
    window.onresize = function() {
        _kWidth   = parseInt(getStyle(_wrapper, "width"));
        _wrapper.style.height  = getStyle(_imgBox, "height");
        _imgBox.style.left     = "-" + _curIndex * _kWidth + "px";
    }
    _prevBtn.onclick = function() {
        if(_isAnimating) { return; }
        if(_curIndex === 1) {
            _curIndex = 4;
        }else {
            _curIndex--;
        }
        tab(+_kWidth);
        updateIdot();
    }
    _nextBtn.onclick = function() {
        if(_isAnimating) { return; }
        if(_curIndex === 4) {
            _curIndex = 1;
        }else {
            _curIndex++;
        }

        tab(-_kWidth);
        updateIdot();
    }
    _idots.forEach(function(idot, index) {
        idot.dataset.index = index + 1;
        idot.onclick = function() {
            var index = parseInt(this.dataset.index);
            if(index === _curIndex || _isAnimating) {
                return;
            }
            var offset = -(index - _curIndex) *  _kWidth;
            tab(offset);
            _curIndex = index ;
            updateIdot();
        }
    });
    play();
    _wrapper.onmouseenter = stop;
    _wrapper.onmouseleave = play;

    function play() {
        _timer = setInterval(function() {
            _nextBtn.onclick();
        }, 3000);
    }
    function stop() {
        clearInterval(_timer);
    }
    function updateIdot() {
        for(var i = 0, len = _idots.length; i < len; i++) {
            if(_idots[i].classList.contains('selected')) {
                _idots[i].classList.remove('selected');
                break;
            }
        }
        _idots[_curIndex - 1].classList.add('selected');
    }
    function tab(offset) {
        _isAnimating = true;
        var duration = 600,
            interval = 10,
            frames   = duration / interval,
            speed    = Math.ceil(offset / frames);
        var curLeft  = parseInt(_imgBox.style.left);
        var desLeft  = curLeft + offset;
        var isScroll = false;
        var t = setInterval(function() {
            curLeft  = parseInt(_imgBox.style.left);
            isScroll = (offset < 0 && curLeft > desLeft) || (offset > 0 && curLeft < desLeft);
            if(isScroll) {
                _imgBox.style.left = curLeft + speed + "px";
            }else {
                clearInterval(t);
                _isAnimating = false;
                _imgBox.style.left = desLeft + 'px';
                if(desLeft < -4 * _kWidth) {
                    _imgBox.style.left = -_kWidth + 'px';
                }else if(desLeft > -_kWidth) {
                    _imgBox.style.left = -4 * _kWidth + 'px';
                }
            }
        }, interval);
    }
}
// 主页数据模块加载
function feature(url,getEl,imageUrl){
    var oFeature = getSec(getEl);
    $.ajax({
        url:url,
        success:function(items){
            var htmlStr = "";
            items.forEach(function(item){
                htmlStr += 
                        `
                        <div class="feature-box">
                            <div><a><img src="${imageUrl}${item.images}"></a></div>
                            <h3><a>${item.tags}</a></h3>
                            <p><a>${item.purchase}</a></p>
                        </div>
                        `;
            });
            oFeature.innerHTML = htmlStr;
            if(getEl = ".feature"){
                var oFeatureBox = Array.from(getSec(".feature-box",true));
                oFeatureBox.forEach(function(feature){
                    feature.onclick = function(){
                        location.href = "html/ultraboostclima.html";
                    }
                });
                
            }
            
        }
    });
    
}
// Tab选项卡切换
function tabSwiper(url){
    var oSwiper = getSec('.tab-swiper');
    var oRunning =getSec('.tab-con-running');
    var oOriginals =getSec('.tab-com-originals');
    var oBasketball =getSec('.tab-con-basketball');
    $.ajax({
        url:url,
        success:function(tabs){
            var htmlList = "";
            tabs.RUNNING.forEach(function(tab){
                htmlList +=`
                            <div class="con-tab">
                            <div class="con-tab-image">
                                <img src="../images/customize/tab-con/${tab.images}">
                            </div>
                            <p>${tab.tagname}</p>
                            <p>${tab.Customized}</p>
                        </div>`;
                
            });
            oRunning.innerHTML = htmlList;
            var htmlTab = "";
            tabs.ORIGINALS.forEach(function(tab){
                htmlTab +=`
                            <div class="con-tab">
                            <div class="con-tab-image">
                                <img src="../images/customize/tab-con/${tab.images}">
                            </div>
                            <p>${tab.tagname}</p>
                            <p>${tab.Customized}</p>
                        </div>`;
                
            });
            oOriginals.innerHTML = htmlTab;
            var htmlEnd = "";
            tabs.BASKETBALL.forEach(function(tab){
                htmlEnd +=`
                            <div class="con-tab">
                            <div class="con-tab-image">
                                <img src="../images/customize/tab-con/${tab.images}">
                            </div>
                            <p>${tab.tagname}</p>
                            <p>${tab.Customized}</p>
                        </div>`;
                
            });
            oBasketball.innerHTML = htmlEnd;
            
        }
    });

}
// 详情页加载detail
function getmonth(){
    var oDetail = getSec('.detail-con');
    var oDetailName = getSec('.detail-name');
    var hash = window.location.href.split("?")[1];
    var hashName = hash.split("=")[0];
    var hashIndex = hash.split("=")[1];
    if(hashName == "mon"){
        GET("../json/goods.json");
    }else if(hashName == "week"){
        GET("../json/goodsweek.json");
    }
    
    function GET(url){
        $.ajax({
            url:url,
            async:false,
            success:function(good){
                    var obj = good[hashIndex];
                    oDetailName.innerHTML = obj.goodsName;
                    var htmlStr = `
                        <div class="detail-left">
                            <ul class="image-tab">
                            ${(function(){
                                var imageStr = "";
                                obj.image.forEach(function(image,index){
                                    if(index === 0){
                                        imageStr += `<li class="sec-image">
                                                    <img src="../images/goods/${image}">
                                                </li>`;
                                    }else{
                                        imageStr += `<li>
                                                    <img src="../images/goods/${image}">
                                                </li>`;
                                    }
                                });
                                return imageStr;
                            })()}
                            </ul>
                            <div class="small-image">
                            <div class="mirror"></div>
                            ${(function(){
                                var imageStr = "";
                                obj.image.forEach(function(image,index){
                                    if(index === 0){
                                        imageStr += `
                                                <img class="small-img selected-tab" src="../images/goods/${image}">
                                                `;
                                    }else{
                                        imageStr += `
                                                <img class="small-img" src="../images/goods/${image}">
                                                `;
                                    }
                                });
                                return imageStr;
                            })()}
                            </div>
                        </div>
                        <div class="detail-right">
                            <div class="detail-right-con">
                                <p><i class="iconfont">&#xeb16;</i> ${obj.star}</p>
                                <p class="shopdes">${obj.des}</p>
                                <h3 class="shopName">${obj.goodsName}</h3>
                                <p class="shoprice">${obj.price}</p>
                                <p class="shopcolordes">${obj.colcorDes}</p>
                                <select class="secList">
                                    <option>小码</option>
                                    <option selected>中码</option>
                                    <option>大码</option>
                                </select>
                                <input type="number" min="1" class="secNum" value="1">
                                <button type="button">立即购买 ></button>
                                <button type="button" class="addBtn">加入购物袋<i class="iconfont">&#xe61d;</i></button>
                                <span><input class="radio" type="radio" checked>该商品免运费</span>
                                <span><i class="iconfont">&#xe676;</a></i>在线客服</span>
                            </div>
                            <div class="big-image">
                            ${(function(){
                                var imageStr = "";
                                obj.image.forEach(function(image,index){
                                        imageStr += `
                                                <img class="big-img" src="../images/goods/${image}">
                                                `;
                                });
                                return imageStr;
                            })()}
                            </div>
                                `;
                   oDetail.innerHTML = htmlStr;
            }
        });
    }
    
    
}
// 点击事件进入详情页detail
function detailLoading(getName,hashName){
    var oGetName = Array.from(getSec(getName,true));
    oGetName.forEach(function(month,index){
        month.dataset.index = index;
        month.onclick = function(){
            window.location.href = `html/details.html?${hashName}=${month.dataset.index}`;
        }
    });
}
// 登陆状态显示
function signLoading(){
    var userId = document.getElementById("user");
    var signIn = document.getElementById("signIn");
    var exit = document.getElementById("exit");
    userId.style.display = "none";
    exit.style.display = "none";
    var userlist = {};
    if(sessionStorage.userL) {
        userlist = JSON.parse(sessionStorage.userL);
        userId.style.display = "block";
        userId.style.color = "#fff";
        exit.style.display = "block";
        userId.textContent = userlist.username + userId.textContent;
        
        signIn.style.display = "none";
    }else {
        
        signIn.style.display = "block";
    }
    exit.onclick = function(){
        sessionStorage.removeItem("userL");
        window.location.reload();
    }
}

// 搜索
function search(){
    var oSearch = getSec(".search");
    var oSearchBtn = getSec(".search-btn");
    oSearchBtn.onclick = function(){
        sessionStorage.search = JSON.stringify(oSearch.value);
        console.log(sessionStorage.search);
        location.href = "../html/search.html";
    }
}