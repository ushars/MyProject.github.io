(function(){
    tab();
    // 动态加载选项卡
    // 男孩
    getTab("../json/boyinfo.json",".boy");
    // 女孩
    getTab("../json/girlinfo.json",".girl");
    // 儿童
    getTab("../json/kidsinfo.json",".children");
    // 运动
    getTabNav("../json/sportsinfo.json",".sports","../images/");
    //品牌
    getTabNav("../json/brandinfo.json",".brand","../images/");
    //定制
    getTabNav("../json/customizedinfo.json",".customized","../images/");
    signLoading();
})();