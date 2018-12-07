(function(){
    signLoading();
    tab();
    // 动态加载选项卡
    //男子
    getTab("json/boyinfo.json",".boy");
    //女子
    getTab("json/girlinfo.json",".girl");
    //童装
    getTab("json/kidsinfo.json",".children");
    //运动
    getTabNav("json/sportsinfo.json",".sports");
    //品牌
    getTabNav("json/brandinfo.json",".brand");
    //定制
    getTabNav("json/customizedinfo.json",".customized");

    scroll();
    feature("json/featureinfo.json",".feature","images/");
    
    detailLoading('.month section',"mon");
    detailLoading('.week section',"week");

    search();
})();