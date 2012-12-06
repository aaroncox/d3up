copy(JSON.stringify($(".legendary,.set").map(function() {
  var e = $(this);
  return {
    "type": $.trim(e.find(".item-type").text()),
    ilvl: parseFloat($.trim(e.find(".item-ilvl .value").text())),
    name: $.trim(e.find("h4.subcategory a").text()),
    img: e.find(".icon-item-inner").css("background-image")
  };
}).get()))
