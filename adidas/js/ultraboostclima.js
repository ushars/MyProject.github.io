(function(){
    var oClima = document.querySelector(".product-list-cont");
    $.ajax({
        url:"../json/ultraboostclima.json",
        success:function(clima){
            var htmlStr = "";
            clima.forEach(function(shop){
                htmlStr += `
                        <section>
                            <img src="../images/ultimate/${shop.image}" alt="图片显示失败...">
                            <p>${shop.name}</p>
                            <p>${shop.des}</p>
                            <p>${shop.price}</p>
                        </section>
                            `;
            });
            oClima.innerHTML = htmlStr;
        }
    });
    feature("../json/featureinfo.json",".sub-banner","../images/");
})();