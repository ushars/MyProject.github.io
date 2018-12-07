(function(){
    new LHYFlash({
        id: "flash",
        effect: "scroll",
        imgs: [
            "../images/customize/1920-630-ad.jpg",
            "../images/customize/1920-630-2.jpg",
        ]
    });
    tabSwiper("../json/tab-con.json");
    var oChangeTop = document.querySelectorAll('.swiper-slide');
    var oChangeCon = Array.from(document.querySelectorAll('.tab-content'));
    oChangeTop.forEach(function(item,index){
        item.dataset.index = index;
        item.onclick = function(){
            var index = item.dataset.index;
            for(var i = 0, len = oChangeTop.length; i < len; i++) {
                if(oChangeTop[i].classList.contains('choose-tab')) {
                    oChangeTop[i].classList.remove('choose-tab');
                    oChangeCon[i].classList.remove('show-tab');
                }
            }
            oChangeTop[index].classList.add('choose-tab');
            oChangeCon[index].classList.add('show-tab');
        }
    });

    var oBranner = Array.from(document.querySelectorAll('.branner-image'));
    oBranner.forEach(function(branner, index){
        branner.onmouseenter = function(){
            for(var i = 0, len = oBranner.length; i < len; i++) {
                if(!oBranner[i].classList.contains('selected-image')) {
                    oBranner[i].classList.add('selected-image');
                    this.classList.remove('selected-image');
                }
            }
        }
        branner.onmouseleave = function(){
            for(var i = 0, len = oBranner.length; i < len; i++) {
                if(oBranner[i].classList.contains('selected-image')) {
                    oBranner[i].classList.remove('selected-image');
                }
            }
        }
    });

    scroller();
})();