$(function() {
	var tooltip = $(".d3up-tooltip");
	$.fn.bindTooltip = function() {
		if(!$(this).attr('data-json')) {
			return false;
		}
		var item = $.parseJSON($(this).attr('data-json'));
		var container = $("<div class='d3-item'/>"),
				header = $("<div class='top'/>"),
				content = $("<div class='item'/>"),
				footer = $("<div class='bottom'/>"),
				itemName = $("<p/>"),
				itemLabel = $("<p class='item-type'/>"),
				itemQuality = $("<span class='quality'/>"),
				itemType = $("<span class='type'/>"),
				itemPrimary = $("<p class='stats stats-primary'/>"),
				itemPrimaryBigStat = $("<span class='big-stat'/>"),
				itemPrimaryHelper = $("<span class='stat-helper'/>"),
				itemExtraPercent = $("<p class='stats stats-extra-percent'/>"),
				itemExtraRange = $("<p class='stats stats-extra-range'/>"),
				itemAttrs = $("<ul class='attrs'/>"),
				itemSockets = $("<ul class='sockets'/>");
		
		itemName.html(item.name);
		if(item.display && item.display.quality) {
			itemQuality.html(item.display.quality);			
		}
		itemType.html(item.display.type);
		// Add the Header to the Tooltip
		container.append(header.append(itemName.addClass("quality-" + item.quality)));
		container.append(content);
		container.append(footer);
		// Add the Item Type, Item Quality and class for quality to the content
		content.append(itemLabel.addClass("quality-" + item.quality).append(itemQuality, ' ', itemType));
		if(item.stats) {
			// Is this armor?
			if(item.stats.armor > 0) {
				// Add the Armor Value
				itemPrimaryBigStat.html(item.stats.armor);
				itemPrimaryHelper.html("Armor");
				// Is this a shield?
				if(item.stats['block-chance'] > 0) {
					// Add the Block Values
					itemExtraPercent.html(item.stats['block-chance'] + " <span class='stat-helper'>Chance to Block</span>");
					itemExtraRange.html(item.stats['block-amount']['min'] + "-" + item.stats['block-amount']['max'] + " <span class='stat-helper'>Block Amount</span>");
				} 
			}
			// Is this a weapon?
			if(item.stats.dps > 0) {
				// Add the DPS Value, Attack Speed and damage range
				itemPrimaryBigStat.html(item.stats.dps);
				itemPrimaryHelper.html("Damage Per Second");
				itemExtraPercent.html(item.stats['speed'] + " <span class='stat-helper'>Attacks per Second</span>");
				itemExtraRange.html(item.stats['damage']['min'] + "-" + item.stats['damage']['max'] + " <span class='stat-helper'>Damage</span>");
			}
			// Add the BigStat and Helper to the primary
			itemPrimary.append(itemPrimaryBigStat, itemPrimaryHelper);
			// Append the collected data onto the content
			content.append(itemPrimary, itemExtraPercent, itemExtraRange);			
		}
		if(item.attrs) {
			// Loop through attrs and add
			$.each(item.display.attrs, function(k, v) {
				itemAttrs.append("<li>" + v + "</li>");
			});
			// Append Attrs to content
			content.append(itemAttrs);			
		}
		// Do we have sockets?
		if(item.sockets) {
			$.each(item.display.sockets, function(k,v) {
				itemSockets.append("<li class='gem_" + item.sockets[k] + "'>" + v + "</li>");
			});
			content.append(itemSockets);
		}
		
		// Bind the mouse
		$(this).mouseover(function() {
			var $this = $(this);
			tooltip.css({
					position: 'absolute'
			});
			tooltip.empty().append(container);
			var position = {
				of: $this,
				at: "right top",
				my: "left top",
				offset: "0 10",
				collision: "flip"
			};
			tooltip.appendTo("body").position(position);
		}).mouseout(function() {
			tooltip.empty();
		});
		
	}
	$.fn.bindSkilltip = function() {
		var tooltip = $(".d3up-tooltip");
		var container = $("<div class='d3-item'/>"),
				header = $("<div class='top'/>"),
				content = $("<div class='item'/>"),
				footer = $("<div class='bottom'/>");
		header.html($("<p>").append($(this).data("name")));
		content.html($("<p>").append($(this).data("tooltip")));
		container.append(header, content, footer);
		$(this).mouseover(function() {
			var $this = $(this);
			tooltip.css({
					position: 'absolute'
			});
			tooltip.empty().append(container);
			var position = {
				of: $this,
				at: "right bottom",
				my: "left top",
				offset: "0 10",
				collision: "flip"
			};
			tooltip.appendTo("body").position(position);
		}).mouseout(function() {
			tooltip.empty();
		});
	}
	function checkTooltip() {
		if($(this).attr('data-json')) {			
			$(this).bindTooltip();
		}
	}
	$("a").each(checkTooltip);
});