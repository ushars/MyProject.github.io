(function(){
    signLoading();
    var oShopCard = getSec(".shopcartbox");
    var shopping = null;
    if(localStorage.shopsList) {
        shopping = JSON.parse(localStorage.shopsList);
    }else {
        shopping = [];
    }

    console.log(shopping);
    if(!localStorage.shopsList || JSON.parse(localStorage.shopsList).length === 0) {
        oShopCard.innerHTML = "<li class='nodata'>暂无商品!</li>"
    }else{
        var htmlStr = "";
        htmlStr += `
                <section class="shop-info">
                    <ul>
                    <li>
                        <div class="cardLeft">
                            <img src="${shopping.oShopImage}">
                        </div>
                        <div class="cardCon">
                            <h3>${shopping.oShopName}</h3>
                            <p>${shopping.oShopDes}</p>
                            <p>${shopping.oShopColorDes}</p>
                            <p>${shopping.oSecList}</P>
                        </div>
                        <div class="cardRight">
                            <p>数量${shopping.oSecNum}</p>
                            <p>${shopping.oShopPrice}</p>
                        </div>
                    </ul>
                </section>
                `;
        oShopCard.innerHTML = htmlStr;
    }
})();