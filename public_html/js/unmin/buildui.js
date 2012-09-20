$(function() {
  // ------------------------------
  // Tab Controls
  // ------------------------------
  var controls = $('#tabs li a'),
      tabs = $("#tabs-render"),
      atabs = $("#tabs-render > div");
  atabs.hide();
  tabs.children("#gear").show();
  controls.bind('click',function(){
    // Hide All Tabs
    atabs.hide();
    // Remove the Current CSS Class
    controls.removeClass('current');
    // Find the Tab you turned on and show it
    tabs.find($(this).attr("data-tab")).show();
    // Add the Current Class to the new Tab
    $(this).addClass('current'); 
  });
  // ------------------------------
  // Gear Change / Compare Button
  // ------------------------------
  var changeButtons = $(".gear-change"),
      statistics = $("#statistics");
  changeButtons.click(function() {
    var itemRow = $(this).closest("tr"),
        gearTable = itemRow.closest("tbody"),
        itemSlot = itemRow.data("slot"),
        itemDisplay = $("<td class='primary'>").html(" "),
        compareRowName = "compare-row-" + itemSlot,
        compareTo = $("<select>"),
        compareEquip = $("<a class='button'>").html("Equip"),
        compareToTd = $("<td class='primary gear-controls'>").append(compareTo),
        compareToEquip = $("<td class='gear-controls'>").append(compareEquip),
        compareToRow = $("<tr>").append(itemDisplay, compareToTd, compareToEquip),
        compareToHeader = $("<tr>").append("<th colspan='10'><h4>Please select an item to compare/change your " + itemSlot + " to...</h4></th>");
        compareTable = $("<table class='d3up-table'>").append(compareToHeader, compareToRow),
        compareTd = $("<td colspan='10'>").append(compareTable),
        compareRow = $("<tr class='compare-row " + compareRowName + "'>"),
        compareResults = $("#compare-table"),
        compareResultsHeader = compareResults.find("thead"),
        compareResultsData = compareResults.find("tbody"),
        compareSelect = $("");
    $("." + compareRowName).remove();
		$.ajax({
			url: '/item/fetch/type/' + itemRow.data("slot"),
			cache: false,
			dataType: 'json',
			success: function(data) {
				// Clear out the List to avoid confusion
				compareTo.html("");
				// Add a "Nothing" option
				compareTo.append("<option value=''></option>");
				compareTo.append("<option value=''>Nothing</option>");
				// Loop through all the JSON we recieved and append them as options
				$.each(data, function(k,v) {
					var item = $.parseJSON(v), 
							option = $("<option/>");
					option.attr("value", k);
					option.attr("data-json", v);
					option.html(item.name);
					option.bindTooltip();
					compareTo.append(option);
				});
			}
		});    
		compareEquip.click(function() {
		  var currentItem = itemRow.find(".equipped a"),
		      newItem = compareTo.find(":selected").data("json");
		  d3up.build.setItem(itemSlot, newItem);
		  currentItem.replaceWith(d3up.build.calc.getItemLink(newItem));
		  d3up.build.run();
		  d3up.build.renderTo($("body"));
		  // Remove the Comparision Row if we equipped it
      $(this).closest("table").closest("tr").remove();
      // Remove the Compare Overview row
      compareResults.find(".overview-" + itemSlot).remove();
      // Hide the Compare Results
      if(gearTable.find(".compare-row").length == 0) {
        statistics.find(".statistics-table").show();   
        compareResults.hide();     
      }
		});
		compareTo.bind('change', function() {
		  // Get the Data
		  var itemData = $(this).find(":selected").data("json"),
		      itemLink = d3up.build.calc.getItemLink(itemData),
		      overviewLink = d3up.build.calc.getItemLink(itemData);
		  // Add this Tooltip
		  console.log(itemData);
		  console.log(itemLink);
		  console.log(itemDisplay);
		  itemDisplay.html($("<div class='selected-item'>").append(itemLink, "<br/><span class='equipped-type'>" + itemSlot + "</span>"));
		  // Add a row to the Compare Table Header to show the compare happening
		  var overviewTr = $("<tr class='compare-overview overview-" + itemSlot + "'>"),
		      overviewTd = $("<td colspan='10'>"), 
		      oldItem = itemRow.find(".equipped a").data("json"),
		      oldItemLink = d3up.build.calc.getItemLink(oldItem);
      compareResultsHeader.find(".overview-" + itemSlot).remove();
		  overviewTd.append(oldItemLink, " vs ", overviewLink);
		  compareResultsHeader.append(overviewTr.append(overviewTd));
		  // Grab the Comparision Build
		  var build = d3up.buildCompare;
		  // Set the Proper Item
		  build.setItem(itemSlot, itemData);
		  // Run the Compare Build
		  build.run();
		  // Calculate the Diff
      var diff = d3up.build.calc.diff(d3up.build.getStats(), build.getStats());
      // Hide all other data tables
      statistics.find(".statistics-table").not("#compare-table").hide();   
      
      // Show the results table
      compareResults.show();
      // Append the Diff Table to the Compare Table
      $("#compare-table tbody").replaceWith(d3up.compare.table(diff));
		});
    compareRow.append(compareTd.append(compareTable));
    itemRow.after(compareRow);
  });
  // ------------------------------
  // Gear Tab Rendering
  // ------------------------------
  var selector = $("#gear-stats"),
      table = $(".equipment-table"),
      cellHeader = $(".cell-header"),
      cellData = $(".cell-data"),
      gearChange = $(".show-gear-change"),
      gearFilter = $("#gear-filters"),
      gearFilters = $(".equipment-table .filters"),
      itemRatings = $("tr.item-rating");
  gearFilter.chosen();
  gearFilters.hide();
  gearChange.click(function() {
    selector.find("option").removeAttr("selected");
    selector.find("option[value=gear-controls]").attr("selected", "selected");
    selector.trigger("change");
  });
  cellData.hide();
  cellHeader.hide();
  table.find(".contributions").show();
  selector.bind('change', function() {
    cellData.hide();
    cellHeader.hide();
    table.find("." + $(this).val()).show();
    $(".equipment-table .filters").hide();
    // Show all Statistics Tables
    $("#statistics").find(".statistics-table").show();   
    // Hide the Compare tab if we leave
    $("#compare-table").hide();     
    // Remove all Gear Changing/Comparing Rows
    $(".equipment-table").find(".compare-row").remove();
    if($(this).val() == 'stats') {
      $(".equipment-table .filters").show();          
    }
  });
  $(".item-rating-filter").bind('click', function() {
    var attr = $(this).data("attr");
    gearFilter.find("option[value=" + attr + "]").attr("selected", "selected");
    gearFilter.trigger("liszt:updated");
    gearFilter.trigger("change");
  }).css({cursor: 'pointer'});
  var button = $("<a class='button'>").bind('click', function() {
    $(".perfection-table").find(".no-match-placeholder").remove();
    $("tr.item-rating").show().removeClass("no-match");
    toggle = false;            
    $(".equipment-table > tbody").find(".remove-filter").remove();
    gearFilter.find("option").attr("selected", null);
    gearFilter.trigger("liszt:updated");
    gearFilter.trigger("change");
  }).html("Remove All Filters");
  gearFilters.find("th").append(button); 
  gearFilters.find(".button").hide();
  gearFilter.bind('change', function() {
    var attrs = $(this).val(),
        attr = "";
    if(attrs && attrs.length > 0) {
      $.each(attrs, function(k, a) {
        if(attr == "") {
          attr += ".item-rating-" + a;
        } else {
          attr += ", .item-rating-" + a;            
        }
      });
      itemRatings.not(attr).hide().addClass("no-match");
      $.each(attrs, function(k,v) {
        $(".item-rating-" + v).show().removeClass("no-match");
      });
      gearFilters.find(".button").show();
    } else {
      gearFilter.find("option").attr("selected", null);
      gearFilter.trigger("liszt:updated");
      $(".perfection-table").find(".no-match-placeholder").remove();
      $(".equipment-table > tbody").find(".remove-filter").remove();
      $("tr.item-rating").show().removeClass("no-match");
      gearFilters.find(".button").hide();
    }
    $(".perfection-table").each(function() {
      if($(this).find(".item-rating.no-match").length == $(this).find(".item-rating").length) {
        if($(this).find(".no-match-placeholder").length < 1) {
          $(this).append("<tr class='no-match-placeholder'><td colspan='3' style='color: #F50'>None</td></tr>");              
        }
      } else {
        $(this).find(".no-match-placeholder").remove();
      }
    });
  })
  // Calculate Armor Percentages
  var tArmor = $("tr.stat-armor td.data").text().replace(",","");
  $(".item-rating-armor .rating-bar").each(function() {
    // console.log(tArmor);
    $(this).attr("data-percent", $(this).data("percent") / 1000 * 100);
    $(this).css("width", Math.round(($(this).data("percent") / 1000) * 100) + "%");
  });
  // Apply Colors to Ratings Bars
  $(".rating-bar").each(function() { 
    var elem = $(this), 
        attr = $(this).closest("tr.item-rating").data("attr"),
        percent = elem.attr("data-percent") / 100,
        elem2 = $(this).closest(".perfection-table").find(".item-rating-" + attr + " .bounds .percent");
    if (percent > 1) { 
      elem.css("background-color", "white"); 
      elem2.css("color", "white"); 
    } else if(percent == 0) {
      elem.css("background-color", "#555"); 
      elem2.css("color", "#555"); 
    } else { 
      elem.css("background-color", $.Color( "red" ).lightness(0.5).transition($.Color( "green" ).lightness(0.5), percent)); 
      elem2.css("color", $.Color( "red" ).lightness(0.5).transition($.Color( "green" ).lightness(0.5), percent));
    } 
  });    
});