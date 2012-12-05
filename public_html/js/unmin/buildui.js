$(function() {
  // ------------------------------
  // Tab Controls
  // ------------------------------
  var controls = $('#tabs li a'),
      tabs = $("#tabs-render"),
      atabs = $("#tabs-render > div");
  atabs.hide();
	$($("#tabs").find(".current").attr("data-tab")).show();
	if(window.location.hash) {
		atabs.hide();
		tabs.find(window.location.hash).show();
	}
	controls.each(function() {
		if(!$(this).is(".saveStats")) {
		  $(this).bind('click',function(e){
		    // Hide All Tabs
		    atabs.hide();
		    // Remove the Current CSS Class
		    controls.removeClass('current');
		    // Find the Tab you turned on and show it
		    tabs.find($(this).attr("data-tab")).show();
		    // Add the Current Class to the new Tab
		    $(this).addClass('current'); 			
				// Set the Hash in the URL
				var parts = window.location.toString().split("#");
				if(history.pushState) {
			    history.pushState(null, null, $(this).attr("data-tab"));
				} else {
			    location.hash = $(this).attr("data-tab");
				}
		  });		
		}
	});
	$(window).bind( "hashchange", function(e) {
		// Hide All Tabs
    atabs.hide();
    // Remove the Current CSS Class
    controls.removeClass('current');
    // Find the Tab you turned on and show it
    tabs.find(window.location.hash).show();
    // Add the Current Class to the new Tab
		// Haven't figured this out...
    // controls.find("[data-tab='" + window.location.hash + "']").addClass('current'); 			
	});

  // ------------------------------
  // Statistics Show/Hide
  // ------------------------------
	$(".statistics-table").on('click', 'thead th', function(event) {
		var header = $(this);
		header.closest(".statistics-table").toggleClass('collapsed');
		header.find("span.ui-icon").toggleClass("ui-icon-minusthick ui-icon-plusthick");
	});
	
	// Change VS Level
	$("#vsLevel").bind("change", function() {
		var level = $(this).val();
		$.each(d3up.builds, function(k) {
			d3up.builds[k].calc.setVsLevel(level);
	    d3up.builds[k].renderAgain();
	  });
	});

	// Sticky Statistics on the page
	var $window = $(window),
			$stickyEl = $('#compare-table').show();
	var elTop = $("#compare-table").offset().top - 20;
	$window.scroll(_.throttle(function() {
		var windowTop = $window.scrollTop();
		$stickyEl.toggleClass('sticky', windowTop > elTop);
	}, 150));
	$stickyEl.hide();

  // ------------------------------
  // Gear Change / Compare Button
  // ------------------------------
  var changeButton = $(".gear-change"),
			simulateButton = $(".gear-simulate"),
      statistics = $("#statistics"),
      compareResults = $("#compare-table"),
      compareResultsHeader = compareResults.find("thead"),
      compareResultsData = compareResults.find("tbody");
	simulateButton.click(function() {
		var builder = _.clone(new d3up.ItemBuilder, true),
				itemRow = $(this).closest("tr"),
				buildId = $("#character").data("id"),
        gearTable = itemRow.closest("tbody"),
        itemSlot = itemRow.data("slot"),
        simulateRowName = "simulate-row-" + itemSlot,
        compareRowName = "compare-row-" + itemSlot;
		// console.log("created builder clone", builder);
	  compareResults.find(".overview-" + itemSlot).remove();
		// console.log(itemRow.find(".equipped a"));
		if(itemRow.find(".equipped a[data-json]").length == 0) {
			itemRow.find(".equipped a").attr("data-json", "{name: 'Simulated Item'}");
		}
		if($("." + compareRowName).length) {
		  $("." + compareRowName).remove();
		  // Remove the Comparision Row if we equipped it
		  $(this).closest("table").closest("tr").remove();
			// Remove the Compared Item
			d3up.builds.compare.setItem(itemSlot, d3up.builds.build.getItem(itemSlot));
			builder.setItem(itemSlot, d3up.builds.build.getItem(itemSlot));
			// Redo the Calcs without this compare
			updateDiff(builder, true);
			// Loop through All Builds and render them again.
		  $.each(d3up.builds, function(k) {
		    d3up.builds[k].renderAgain();
		  });
			itemRow.find(".gear-change").html("Modify/Compare");
		}
		if($("." + simulateRowName).length) {
		  $("." + simulateRowName).remove();
		  // Remove the Comparision Row if we equipped it
		  $(this).closest("table").closest("tr").remove();
		  // Remove the Compare Overview row
		  compareResults.find(".overview-" + itemSlot).remove();
			// Remove the Simulated Item
			d3up.builds.compare.setItem(itemSlot, d3up.builds.build.getItem(itemSlot));
			builder.setItem(itemSlot, d3up.builds.build.getItem(itemSlot));
			// Redo the Diff without this Sim
			updateDiff(builder, true);
			// Loop through All Builds and render them again.
		  $.each(d3up.builds, function(k) {
		    d3up.builds[k].renderAgain();
		  });
			// Restore the Original Item
			// console.log(d3up.builds.compare.getStats().armor);
		  // Hide the Compare Results
		  if(gearTable.find(".simulate-row").length == 0 && gearTable.find(".compare-row").length == 0) {
		    statistics.find(".statistics-table").show();   
		    compareResults.hide();     
		  }
			$(this).html("Simulate");
		  return false;
		}
		$(this).html("Cancel");
		var itemDisplay = $("<td class='primary'>").html(" "),
        simulateHeader = $("<tr>").append("<th colspan='10'><h4>Tweak the item below as you see fit to change your " + itemSlot + "</h4></th>"),
				simulateToTd = $("<td colspan='2'>"),
				simulateToRow = $("<tr class='simulate-row'>").append(simulateToTd),
        simulateTable = $("<table class='d3up-table'>").append(simulateHeader, simulateToRow),
        simulateTd = $("<td colspan='3'>").append(simulateTable),
        simulateRow = $("<tr class='simulate-row " + simulateRowName + "'>").append(simulateTd),
				// Item Builder and Sim Information
				buildName = $("<input type='text'>"),
				simName = "simulate-" + itemSlot,
				// Selectors
				itemAttrs = $("<select multiple='multiple'>"),
				itemQuality = $("<select>"),
				itemType = $("<select name='itemType' id='itemType' data-placeholder='What type of item is this?'><option value='' label=''></option><option value='amulet' label='Amulet'>Amulet</option><option value='belt' label='Belt'>Belt</option><option value='boots' label='Boots'>Boots</option><option value='bracers' label='Bracers'>Bracers</option><option value='chest' label='Chest Armor'>Chest Armor</option><option value='cloak' label='Cloak'>Cloak</option><option value='gloves' label='Gloves'>Gloves</option><option value='helm' label='Helm'>Helm</option><option value='pants' label='Pants'>Pants</option><option value='mighty-belt' label='Mighty Belt'>Mighty Belt</option><option value='ring' label='Ring'>Ring</option><option value='shoulders' label='Shoulders'>Shoulders</option><option value='spirit-stone' label='Spirit Stone'>Spirit Stone</option><option value='voodoo-mask' label='Voodoo Mask'>Voodoo Mask</option><option value='wizard-hat' label='Wizard Hat'>Wizard Hat</option><option value='2h-mace' label='Two-Handed Mace'>Two-Handed Mace</option><option value='2h-axe' label='Two-Handed Axe'>Two-Handed Axe</option><option value='bow' label='Bow'>Bow</option><option value='daibo' label='Daibo'>Daibo</option><option value='crossbow' label='Crossbow'>Crossbow</option><option value='2h-mighty' label='Two-Handed Mighty Weapon'>Two-Handed Mighty Weapon</option><option value='polearm' label='Polearm'>Polearm</option><option value='staff' label='Staff'>Staff</option><option value='2h-sword' label='Two-Handed Sword'>Two-Handed Sword</option><option value='axe' label='Axe'>Axe</option><option value='ceremonial-knife' label='Ceremonial Knife'>Ceremonial Knife</option><option value='hand-crossbow' label='Hand Crossbow'>Hand Crossbow</option><option value='dagger' label='Dagger'>Dagger</option><option value='fist-weapon' label='Fist Weapon'>Fist Weapon</option><option value='mace' label='Mace'>Mace</option><option value='mighty-weapon' label='Mighty Weapon'>Mighty Weapon</option><option value='spear' label='Spear'>Spear</option><option value='sword' label='Sword' selected='selected'>Sword</option><option value='wand' label='Wand'>Wand</option><option value='mojo' label='Mojo'>Mojo</option><option value='source' label='Source'>Source</option><option value='quiver' label='Quiver'>Quiver</option><option value='shield' label='Shield'>Shield</option></select>"),
				itemSockets = $("<select name='sockets' id='sockets'><option value='' label='0 Sockets' selected='selected'>0 Sockets</option><option value='1' label='1 Socket'>1 Socket</option><option value='2' label='2 Sockets'>2 Sockets</option><option value='3' label='3 Sockets'>3 Sockets</option></select>"),
				itemSet = $("<select name='itemSet' id='itemSet'></select>"),
				selectContainer = $("<div class='simulate-select'>").append(itemType, itemSockets, itemSet);
				// it = Item Template
				itName = $('<p>').append(itemSlot.capitalize(), ' Simulation'),
				itStatPrime = $('<p class="stats stats-primary">').append('<span class="big-stat"></span><span class="stat-helper"></span>'),
				itStatExtra = $('<p class="stats stats-extra-percent">'),
				itStatRange = $('<p class="stats stats-extra-range">'),
				itMeta = $('<p class="item-type">'),
				itAttrs = $('<ul class="attrs">'), 
				itSockets = $('<ul class="sockets">'), 
				itTop = $('<div class="top">').append(itName),
				itBottom = $('<div class="bottom">'),
				itData = $('<div class="item">').append(itMeta, itStatPrime, itStatExtra, itStatRange, itAttrs, itSockets),
				it = $('<div class="simulate-item d3-item">').append(itTop, itData, itBottom).addClass(simName); 
		$.each(builder.skillText, function(k,v) {
			var option = $("<option>");
			option.val(k);
			option.html(v.replace("VVV", ""));
			itemAttrs.append(option);
		});
		simulateToTd.append(itemAttrs, selectContainer, it);
		if(d3up.builds.compare.getItem(itemSlot)) {
			itemType.find("option[value=" + d3up.builds.compare.getItem(itemSlot).type + "]").attr("selected", "selected");
			if(d3up.builds.compare.getItem(itemSlot).sockets) {
				itemSockets.find("option[value=" + d3up.builds.compare.getItem(itemSlot).sockets.length + "]").attr("selected", "selected");				
			}
		}
    itemRow.after(simulateRow);	
		// A hook for the skills to latch onto
		itemType.addClass('simulate-change');
		// Cleanup of the cloned attribute selector
		itemAttrs.removeAttr("id");
		itemAttrs.removeAttr("class");
		itemAttrs.attr("data-placeholder", "Which attributes does this item have?");
		itemAttrs.show();
		itemAttrs.chosen();
		if(d3up.builds.compare.getItem(itemSlot)) {
			$.each(d3up.builds.compare.getItem(itemSlot).attrs, function(k, v) {
				itemAttrs.find('[value=' + k + ']').attr("selected", "selected");
			});			
		}
		// Trigger all the fields for the item
		itemAttrs.trigger("liszt:updated");
		itemAttrs.trigger("change");
		itemSockets.trigger("change");
		itemQuality.trigger("change");
		itemType.trigger("change");
		// Set the Quality Selector
		builder.setQualitySelect(itemQuality);
		// Set the Type Selector
		builder.setItemTypeSelect(itemType);		
		// Set the Attribute Selector
		builder.setAttributeSelect(itemAttrs);
		// Set the Socket selector
		builder.setSocketSelect(itemSockets);
    // Set the Set Bonus selector
    builder.setSetBonusSelect(itemSet);		
		// Set the Item Preview
		builder.setItemPreview(it);
		// Initialize the Item Builder
		builder.init();
		// Set the Item
		if(d3up.builds.compare.getItem(itemSlot)) {
			builder.setItem(itemSlot, d3up.builds.compare.getItem(itemSlot));					
		}
		// Set the Calculator Callback		
		// console.log(d3up.builds.build.getItem(itemSlot).stats);
		builder.setChangeCallback(updateDiff);
		// console.log(window.d3up.builds.build.getItem(itemSlot).stats.armor);
		// 
		// $("#quality").chosen({
		// 	placeholder: 'Choose the item\'s quality...',
		// 	allowClear: true
		// });
		// $("#sockets").chosen({
		// 	placeholder: 'No Sockets...',
		// 	allowClear: true
		// });
		// $("#attributes").chosen({
		// 	placeholder: 'What attributes does this item have?',
		// 	allowClear: true
		// });
		// $("#itemType").chosen({
		// 	placeholder: 'Choose the item type...',
		// 	allowClear: true
		// });
		// <? if(isset($_GET['slot'])): ?>
		// $("#sockets, #attributes, #quality, #itemType").trigger('change');	
		// <? endif ?>
		// <? if(!empty($_POST)): ?>
		// $("#sockets, #attributes, #quality, #itemType").trigger('change');
		// var post = <?= json_encode($_POST) ?>;
		// $(".item-preview input").each(function() {
		// 	$(this).val(post[$(this).attr("name")]);
		// });
		// $(".item-preview select").each(function() {
		// 	$(this).val(post[$(this).attr("name")]);
		// });
		// $(".create-form input").each(function() {
		// 	$(this).val(post[$(this).attr("name")]);
		// 	// $(this).trigger("keyup");
		// });
		// if(post.setBonus) {
		// 	$("#setBonus").val(post.setBonus);
		// }
	});
	function updateDiff(inst, noHeader) {
		var itemSlot = inst.slot,
				compareTo = d3up.builds.compare.getItem(itemSlot);
    compareResultsHeader.find(".overview-" + itemSlot).remove();
		if(!compareTo) {
			compareTo = {
				name: 'No Item'
			};
		}
		if(!noHeader) {
			var overviewTr = $("<tr class='compare-overview overview-" + itemSlot + "'>"),
		      overviewTd = $("<td colspan='10'>"), 
		      newItemLink = $("<a>").append("Simulated Item"),				
		      oldItemLink = $("<a>").append(compareTo.name);
				  overviewTd.append(oldItemLink, " vs ", newItemLink);
		  compareResultsHeader.append(overviewTr.append(overviewTd));			
		}
		// Remove the old item
		d3up.builds.compare.calc.removeItem(itemSlot);
	  // Set the Proper Item
    d3up.builds.compare.setItem(itemSlot, inst.getItem());
    // Loop through All Builds and render them again.
    $.each(d3up.builds, function(k) {
      d3up.builds[k].renderAgain();
    });
    // d3up.builds.compare.calc.removeItem(itemSlot);
    // d3up.builds.compare.calc.setItem(itemSlot, itemData);
	  // Calculate the Diff
    // console.log(d3up.builds.build.getStats(), d3up.builds.compare.getStats());
    // console.log(d3up.builds.build.getSkills(), d3up.builds.compare.getSkills());
    // console.log("===");
    var diff = d3up.builds.build.diffWith(d3up.builds.compare);
    // Hide all other data tables
    statistics.find(".statistics-table").not("#compare-table").hide();   
    // Show the results table
    compareResults.show();
		// console.log("diff", diff);
    // Append the Diff Table to the Compare Table
    $("#compare-table > tbody").replaceWith(d3up.compare.table(diff, 'compare'));
	}
  changeButton.click(function() {
    var builder = _.clone(new d3up.ItemBuilder, true),
				itemRow = $(this).closest("tr"),
				buildId = $("#character").data("id"),
        gearTable = itemRow.closest("tbody"),
        itemSlot = itemRow.data("slot"),
        itemDisplay = $("<td class='primary'>").html(" "),
        compareRowName = "compare-row-" + itemSlot,
        simulateRowName = "simulate-row-" + itemSlot,
        compareTo = $("<select class='compare-change'>"),
        compareEquip = $("<a class='button equip-button'>").html("Equip"),
				compareSimulate = itemRow.find("a.button.gear-simulate"),
				///item/create?b=<?= $this->record->id ?>&slot=<?= $slot ?>&return=build
				compareNew = $("<a>").html("New Item").attr("href", "/item/create?b=" + buildId + "&slot=" + itemSlot + "&return=build").addClass('button'),
        compareToTd = $("<td class='primary gear-controls'>").append(compareTo, "<br/>", compareNew, compareEquip),
        compareToRow = $("<tr class='compare-row'>").append(itemDisplay, compareToTd),
        compareToHeader = $("<tr>").append("<th colspan='10'><h4>Please select an item to compare/change this " + itemSlot + " to...</h4></th>"),
        compareSimulateHeader = $("<tr>").append("<th colspan='10'><h4>Tweak the item below as you see fit to change your " + itemSlot + "</h4></th>").hide(),
				compareToSimulateTd = $("<td colspan='2'>"),
				compareToSimulateRow = $("<tr class='simulate-row'>").append(compareToSimulateTd).hide(),
        compareTable = $("<table class='d3up-table'>").append(compareToHeader, compareToRow, compareSimulateHeader, compareToSimulateRow),
        compareTd = $("<td colspan='3'>").append(compareTable),
        compareRow = $("<tr class='compare-row " + compareRowName + "'>"),
        compareResults = $("#compare-table"),
        compareResultsHeader = compareResults.find("thead"),
        compareResultsData = compareResults.find("tbody"),
        compareSelect = $("");
		if(!$("#character").data("owner")) {
			compareEquip.hide();
			compareNew.hide();
		}
	  compareResults.find(".overview-" + itemSlot).remove();
		if($("." + simulateRowName).length) {
		  $("." + simulateRowName).remove();
		  // Remove the Comparision Row if we equipped it
		  $(this).closest("table").closest("tr").remove();
		  // Remove the Compare Overview row
		  compareResults.find(".overview-" + itemSlot).remove();
			// Remove the Simulated Item and restore old
			d3up.builds.compare.setItem(itemSlot, d3up.builds.build.getItem(itemSlot));
			// Redo the Diff without this Sim
			updateDiff(builder, true);
			// Loop through All Builds and render them again.
		  $.each(d3up.builds, function(k) {
		    d3up.builds[k].renderAgain();
		  });
			itemRow.find(".gear-simulate").html("Simulate");
		}
		if($("." + compareRowName).length) {
		  $("." + compareRowName).remove();
		  // Remove the Comparision Row if we equipped it
		  $(this).closest("table").closest("tr").remove();
			// Remove the Compared Item
			d3up.builds.compare.setItem(itemSlot, d3up.builds.build.getItem(itemSlot));
			// Redo the Calcs without this compare
			updateDiff(builder, true);
			// Loop through All Builds and render them again.
		  $.each(d3up.builds, function(k) {
		    d3up.builds[k].renderAgain();
		  });
		  // Hide the Compare Results
		  if(gearTable.find(".simulate-row").length == 0 && gearTable.find(".compare-row").length == 0) {
		    statistics.find(".statistics-table").show();   
		    compareResults.hide();     
		  }
			$(this).html("Modify/Compare");
		  // Remove the Compare Overview row
		  return false;
		}
		$(this).html("Cancel");
		itemDisplay.append("<span class='equipped'>Select an item from the right or...</span>", compareNew);
		if(isLoggedIn) {
			$.ajax({
				url: '/item/fetch/type/' + itemRow.data("slot"),
				cache: false,
				dataType: 'json',
				success: function(data) {
					// Clear out the List to avoid confusion
					compareTo.html("");
					compareTo.css({"min-width": "140px"});
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
		} else {
		  compareToRow.html("<td>The compare tool uses the items you've scanned or created. You must be logged in to use this function.</td>");
		}      

		compareEquip.click(function() {
		  var currentItem = itemRow.find(".equipped a"),
		      newItem = compareTo.find(":selected").data("json"),
		      newId = compareTo.find(":selected").val();                        
			// Loop through EVERY build and equip this item, then re-render the page
		  $.each(d3up.builds, function(k) {
		  	d3up.builds[k].setItem(itemSlot, newItem);
		    d3up.builds[k].renderAgain();
		  });
			var stats = d3up.builds.build.getStats();
			$.ajax({
			   data: {
			     a: 'equip',
			     slot: itemSlot,
			     newItem: newId,
			     stats: {
			       dps: stats.dps,
			       ehp: stats.ehp
			     }
			   }
		  });
		  // Render the Item on the Page with the proper link
			currentItem.replaceWith(d3up.builds.build.calc.getItemLink(newItem));
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
		      itemLink = d3up.builds.build.calc.getItemLink(itemData),
		      overviewLink = d3up.builds.build.calc.getItemLink(itemData);
		  // Add this Tooltip
      // console.log(itemData);
      // console.log(itemLink);
      // console.log(itemDisplay);
		  itemDisplay.html($("<div class='selected-item'>").append(itemLink, "<br/><span class='equipped-type'>" + itemSlot + "</span>")).append(compareNew);
		  // Add a row to the Compare Table Header to show the compare happening
		  var overviewTr = $("<tr class='compare-overview overview-" + itemSlot + "'>"),
		      overviewTd = $("<td colspan='10'>"), 
		      oldItem = itemRow.find(".equipped a").data("json"),
		      oldItemLink = d3up.builds.build.calc.getItemLink(oldItem);
      compareResultsHeader.find(".overview-" + itemSlot).remove();
		  overviewTd.append(oldItemLink, " vs ", overviewLink);
		  compareResultsHeader.append(overviewTr.append(overviewTd));
		  // Set the Proper Item
      d3up.builds.compare.setItem(itemSlot, itemData);
      // Loop through All Builds and render them again.
      $.each(d3up.builds, function(k) {
        d3up.builds[k].renderAgain();
      });
      // d3up.builds.compare.calc.removeItem(itemSlot);
      // d3up.builds.compare.calc.setItem(itemSlot, itemData);
		  // Calculate the Diff
      // console.log(d3up.builds.build.getStats(), d3up.builds.compare.getStats());
      // console.log(d3up.builds.build.getSkills(), d3up.builds.compare.getSkills());
      // console.log("===");
      var diff = d3up.builds.build.diffWith(_.clone(d3up.builds.compare, true));
      // Hide all other data tables
      statistics.find(".statistics-table").not("#compare-table").hide();   
      // Show the results table
      compareResults.show();
      // Append the Diff Table to the Compare Table
      $("#compare-table > tbody").replaceWith(d3up.compare.table(diff, 'compare'));
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
  });
	// Show/hide skill changer
	$(".passive-change").bind('click', function() {
		var chooser = $("#passive-skill-chooser");
		if(chooser.is(":visible")) {
			chooser.hide();
		} else {
			chooser.show();
		}
		var selects = $("#passive-skill-chooser select");
		$.each(selects, function() {
			$(this).chosen({
				allow_single_deselect: true
			});			
		});
	});
	$(".skill-change").bind('click', function() {
		var chooser = $("#active-skill-chooser");
		if(chooser.is(":visible")) {
			chooser.hide();
		} else {
			chooser.show();
		}
		var selects = $("#active-skill-chooser select");
		$.each(selects, function() {
			$(this).chosen({
				allow_single_deselect: true
			});			
		});
	});
	// Hide the Choosers
	$("#passive-skill-chooser").hide();
	$("#active-skill-chooser").hide();
	// Create the Selects for passives
	$.each([0,1,2], function(k, v) {
		var select = $("<select data-index='"+(v - 1)+"' data-placeholder='Select a Skill...' name='passiveSelect"+v+"'>"),
				label = $("<span class='skill-label'>").html("Passive #" + v),
				build = d3up.builds.build,
				heroClass = build.meta.heroClass, 
				skills = _.keys(build.getSkills().passives);
		select.append("<option value=''>None</option>");
		$.each(d3up.gameData.passives[heroClass], function(slug, data) {
			var option = $("<option value='" + slug + "'>").html(slug.replace(/\-/g, " ").capitalize()),
					idx = v;
			if(skills[idx] && skills[idx] == slug) {
				option.attr("selected", "selected");
				select.attr("data-skill", slug);
			}
			select.append(option);
		});
		$("#passive-skill-chooser").append($("<p>").append(label, select));
		select.bind('change', function() {
			var skill = $(this).val(),
					id = parseInt($(this).attr("name").replace("passiveSelect", ""));
			$.each(d3up.builds, function(k) {
				skills[id] = skill;
				d3up.builds[k].setSkills({passives: skills});
				d3up.builds[k].run();
		  });
	    d3up.builds.build.renderSkillsTo($("#passives"));
	    d3up.builds.build.renderSkillsTo($("#build-header"));
	    $.each(d3up.builds, function(k) {
        d3up.builds[k].renderAgain();
      });
		});
	});
	// Create the Selects for actives
	$.each([0,1,2,3,4,5], function(k, v) {
		var select = $("<select data-index='"+(v - 1)+"' data-placeholder='Select a Skill...' name='activeSelect"+v+"'>"),
				label = $("<span class='skill-label'>").html("Skill #" + v),
				build = d3up.builds.build,
				heroClass = build.meta.heroClass, 
				skills = _.keys(build.getSkills().actives);
		select.append("<option value=''>None</option>");
		$.each(d3up.gameData.actives[heroClass], function(slug, data) {
			var option = $("<option value='" + slug + "'>").html(data.name),
					idx = v;
			if(skills[idx] && skills[idx] == slug) {
				option.attr("selected", "selected");
			}
			select.append(option);
		});
		$("#active-skill-chooser").append($("<p>").append(label, select));
		select.bind('change', function() {
			var skill = $(this).val(), 
					id = parseInt($(this).attr("name").replace("activeSelect", ""));
			$.each(d3up.builds, function(k) {
				skills[id] = skill;
				d3up.builds[k].setSkills({actives: skills});
				d3up.builds[k].run();
		  });
	    d3up.builds.build.renderSkillsTo($("#skills"));
	    d3up.builds.build.renderSkillsTo($("#build-header"));
	    $.each(d3up.builds, function(k) {
        d3up.builds[k].renderAgain();
      });
		});
	});
	// Append Save Buttons
	if($("#character").data("owner")) {
		var savePassives = $("<a class='save-skills button'>").html("Save Passives");
		$("#passive-skill-chooser").append(savePassives);
		var saveActives = $("<a class='save-skills button'>").html("Save Skills");
		$("#active-skill-chooser").append(saveActives);
		// Bind Clicks
		$(".save-skills").click(function() {
			var skills = [],
					passives = [];
			$("#passive-skill-chooser").find("select").each(function() {
				passives.push($(this).val());
			});
			$("#active-skill-chooser").find("select").each(function() {
				skills.push($(this).val());
			});
			$("#active-skill-chooser").hide();
			$("#passive-skill-chooser").hide();
			// console.log(passives);
			$.ajax({
				data: {
					a: 'skills',
					actives: skills,
					passives: passives,
					stats: {
						dps: d3up.builds.build.stats.dps,
						ehp: d3up.builds.build.stats.ehp
					},
					success: function() {
						$($("<div style='padding: 20px'/>").html("Saved!")).dialog({
							modal: true,
							buttons: {
								Ok: function() {
									$( this ).dialog( "close" );
								}
							}
						});
					}
				}
			});
		});
	}
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

	var saveStatsButton = $(".saveStats");
	saveStatsButton.attr("data-name", "Manual Stats Save");
	saveStatsButton.attr("data-tooltip", "Manually save the stats from the right (stats) panel of your build to the database.<br/><br/>This happens automatically on a skill change or item change, but if for some reason your stats aren't updating, hit this.");
	saveStatsButton.bindSkilltip();
	saveStatsButton.bind('click', function() {
		var stats = d3up.builds.build.getStats();
		$.ajax({
			url: '/b/' + $("#character").data("id") + '/update-stats',
			cache: false,
			data: {
				stats: stats
			},
			type: 'post',
			dataType: 'json',
			success: function(data) {
				$($("<div style='padding: 20px'/>").html("Saved!")).dialog({
					modal: true,
					buttons: {
						Ok: function() {
							$( this ).dialog( "close" );
						}
					}
				});
			}
		});
	});
});