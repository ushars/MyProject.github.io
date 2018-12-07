function getSec(Sel, isAll) {
    if(isAll) {
        return document.querySelectorAll(Sel);
    }else {
        return document.querySelector(Sel);
    }
}
function getStyle(el, attr) {
    // 兼容IE
    if (el.currentStyle) {
        return el.currentStyle[attr];
    } else {
        return getComputedStyle(el, null)[attr];
    }
}
function tab(){
    
    var oTab = Array.from(getSec(".nav-tab > li", true));
    var oMouseover = Array.from(getSec(".nav-mouseover > div", true));
    var oMouseleave = getSec(".nav-mouseover");
    oTab.forEach(function(items, index){
        items.dataset.index = index;
        items.onmouseenter = function(){
            var index = items.dataset.index;
            for(var i = 0, len = oTab.length; i < len; i++) {
                if(oTab[i].classList.contains('selected')) {
                    oTab[i].classList.remove('selected');
                    oMouseover[i].classList.remove('show');
                }
            }
            oTab[index].classList.add('selected');
            oMouseover[index].classList.add('show');
        }
        // items.onmouseleave = function(){
        //     for(var i = 0, len = oTab.length; i < len; i++) {
        //         if(oTab[i].classList.contains('selected')) {
        //             oTab[i].classList.remove('selected');
        //             oMouseover[i].classList.remove('show');
        //         }
        //     }
        // }
        
    });
}

function scroll() {
    // 1. 获取DOM元素
    var _prevBtn     = getSec('.scroll .prev');
    var _nextBtn     = getSec('.scroll .next');
    var _idots       = getSec('.scroll .idot', true);
    var _wrapper     = getSec('.scroll-flash-wrapper');
    var _imgBox      = getSec('.scroll .img-box');
    var _curIndex    = 1; 
    var _timer       = null;  // 存储定时器/自动播放使用
    var _isAnimating = false; // 记录动画状态
    var _kWidth      = parseInt(getStyle(_wrapper, "width"));
    // 2. 自适应处理
    // 由于元素绝对定位脱离文档流，故父级元素无法获取子元素高度
    // 但我们可以通过脚本获取子元素高度之后赋值给容器即可
    _wrapper.style.height  = getStyle(_imgBox, "height");
    _imgBox.style.left     = "-" + _kWidth + "px";
    // 监听窗口变化/重新计算容器尺寸
    window.onresize = function() {
        _kWidth   = parseInt(getStyle(_wrapper, "width"));
        _wrapper.style.height  = getStyle(_imgBox, "height");
        // 更新left值
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

tab();
scroll();