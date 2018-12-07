(function(){
    function search(url,getEl,imageUrl,keywords){
    var oFeature = getSec(getEl);
    $.ajax({
        url:url,
        success:function(items){
            var htmlStr = "";
            var shops = items;
                if(keywords) {
                    shops = shops.filter(function(goods) {
                        var reg = new RegExp(keywords, "i");
                        return reg.test(JSON.stringify(goods));
                    }) 
                }
                
            shops.forEach(function(item){
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
                        location.href = "../html/ultraboostclima.html";
                    }
                });
                
            }
            
        }
    });
}
    var oSearch = getSec(".search");
    oSearch.value = JSON.parse(sessionStorage.search);
    var keywords =oSearch.value ;
    search("../json/featureinfo.json",".feature","../images/",keywords);
    oSearch.oninput = function() {
        var keywords =this.value ;
            search("../json/featureinfo.json",".feature","../images/",keywords);
    }
})();