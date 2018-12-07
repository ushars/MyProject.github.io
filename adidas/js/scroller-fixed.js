function scroller(){
    // 1. 获取DOM元素
    var wrapper = document.querySelector('.wrapper');
    var prevBtn = document.querySelector('.prev-btn');
    var nextBtn = document.querySelector('.next-btn');
    var idots = Array.from(document.querySelectorAll('.pagenation-item'));
    var curIndex = 1;
    // 记录当前是否在做切换
    var isAnimating = false;
    // 2. 左右切换
    prevBtn.onclick = function(){
        if(isAnimating){
            return;
        }
        if(curIndex === 1){
            curIndex = 3;
        }else{
            curIndex--;
        }
        tab(+500);
        updateIdots();
    }
    nextBtn.onclick = function(){
        if(isAnimating){
            return;
        }
        if(curIndex === 3){
            curIndex = 1;
        }else{
            curIndex++;
        }
        tab(-500);
        updateIdots();
    }
    // 自动播放
    var timer = null;
    play();
    container = document.querySelector('.container');
    
    function play(){
        timer = setInterval(function(){
            nextBtn.onclick();
        },3000);
    }
    function stop(){
        clearInterval(timer);
    }
    container.onmouseenter = stop;
    container.onmouseleave = play;
    // 点击小圆点切换
    idots.forEach(function(idot,index){
        idot.dataset.index = index + 1;
        idot.onclick = function() {
            var index = parseInt(this.dataset.index);
            if(index === curIndex || isAnimating) {
                return;
            }
            // 计算偏移
            // 1 -> 3 -> -1000 -> -(3 - 1)*500
            var offset = -(index - curIndex) *  500;
            // 切换
            tab(offset);
            // 更新下标显示
            curIndex = index ;
            // 更新小圆点显示
            updateIdots();
        }
    });
    function tab(offset){
        isAnimating = true;
        // 当前left值
        var curLeft = parseInt(getStyle(wrapper, "left"));
        // 目标left值
        var tarLeft = curLeft + offset;
        // 帧动画
        var duration = 500;
        var interval = 15;
        var frames = duration / interval;
        var speed = offset / frames;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        var t = setInterval(function(){
            // 更新当前位置
            curLeft = parseInt(getStyle(wrapper, "left"));
            // 判断
            // offset > 0 && curLeft < tarLeft
            // offset < 0 && curLeft > tarLeft
            if((offset > 0 && curLeft < tarLeft) || (offset < 0 && curLeft > tarLeft)){
                wrapper.style.left = curLeft + speed + "px";
            }else{
                clearInterval(t);
                isAnimating = false;
                // 修正位置
                wrapper.style.left = tarLeft  + "px";
                // 无限滚动
                if(parseInt(getStyle(wrapper, "left")) < -1500){
                    wrapper.style.left = "-500px";
                }else if(parseInt(getStyle(wrapper, "left")) > -500){
                    wrapper.style.left = -500 * 3 + "px";
                }
            }
        }, interval);
    }
    function updateIdots(){
        for(var i = 0,len = idots.length; i < len; i++){
            if(idots[i].classList.contains('show')){
                idots[i].classList.remove('show');
                break;
            }
        }
        idots[curIndex - 1].classList.add('show');
        
    }
}