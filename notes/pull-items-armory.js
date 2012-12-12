$(".legendary,.set").each(function() {
  var e = $(this);
  console.log(JSON.stringify({
    "type": $.trim(e.find(".item-type").text()),
    slug: e.find("h4 > a").attr("href").split("/").pop(),
		ilvl: parseFloat($.trim(e.find(".item-ilvl .value").text())),
    name: $.trim(e.find("h4.subcategory a").text()),
    icon: e.find(".icon-item-inner").css("background-image"),
    link: "http://us.battle.net" + e.find("h4 > a").attr("href"),
		quality: e.find("h4 > a").attr("class"),		
  }) + ",");
}).get();