switch($("#itemType").val()) {
		case "shield":
			$("#base_dps-element, #base_damage_min-element, #base_damage_max-element, #base_speed-element, #base_dps-label, #base_damage_min-label, #base_damage_max-label, #base_speed-label").hide();
			$("#base_armor-label, #base_armor-element, #base_block_chance-element, #base_block_chance-label, #base_block_amount_min-element, #base_block_amount_min-label, #base_block_amount_max-element, #base_block_amount_max-label").show();			
			break;
		case "belt":
		case "boots":
		case "bracers":
		case "chest":
		case "cloak":
		case "gloves":
		case "helm":
		case "pants":
		case "mighty-belt":
		case "shoulders":
		case "spirit-stone":
		case "voodoo-mask":
		case "wizard-hat":
			$("#base_dps-element, #base_damage_min-element, #base_damage_max-element, #base_speed-element, #base_dps-label, #base_damage_min-label, #base_damage_max-label, #base_speed-label, #base_block_chance-element, #base_block_chance-label, #base_block_amount_min-element, #base_block_amount_min-label, #base_block_amount_max-element, #base_block_amount_max-label").hide();
			$("#base_armor-label, #base_armor-element").show();
			break;
		case "2h-mace":
		case "2h-axe":
		case "bow":
		case "daibo":
		case "crossbow":
		case "2h-mighty":
		case "polearm":
		case "staff":
		case "2h-sword":
		case "axe":
		case "ceremonial-knife":
		case "hand-crossbow":
		case "dagger":
		case "fist-weapon":
		case "mace":
		case "mighty-weapon":
		case "spear":
		case "sword":
		case "wand":
			$("#base_armor-label, #base_armor-element, #base_block_chance-element, #base_block_chance-label, #base_block_amount_min-element, #base_block_amount_min-label, #base_block_amount_max-element, #base_block_amount_max-label").hide();
			$("#base_dps-element, #base_damage_min-element, #base_damage_max-element, #base_speed-element, #base_dps-label, #base_damage_min-label, #base_damage_max-label, #base_speed-label").show();
			break;
		default:
			break;
	}
$("#name").keyup(function() {
	$(".item-preview .top p").html(document.createTextNode($("#name").val()));
});
$("#itemType").chosen({
	placeholder: 'Choose the item type...',
	allowClear: true
});
$("#itemType").bind("change", function() {
	var name = $(this).find(":selected").html(),
			val = $(this).find(":selected").val(),
			type = $(".item-preview .item-type .type").html(name),
			add = $(".additional");
	$("#sockets").trigger('change');
	switch(val) {
		case "shield":
			$("#base_dps-element, #base_damage_min-element, #base_damage_max-element, #base_speed-element, #base_dps-label, #base_damage_min-label, #base_damage_max-label, #base_speed-label").hide();
			$("#base_armor-label, #base_armor-element, #base_block_chance-element, #base_block_chance-label, #base_block_amount_min-element, #base_block_amount_min-label, #base_block_amount_max-element, #base_block_amount_max-label").show();
			var stats = $(".item-preview .stats"),
					input1 = $("#base_armor"),
					input2 = $("#base_block_amount_min"),
					input3 = $("#base_block_amount_max"),
					input4 = $("#base_block_chance"),
					speedStat = $(".stats-extra-percent").empty(),
					damageStat = $(".stats-extra-range").empty(),
					bigStat = stats.find(".big-stat"),
					bigLabel = stats.find(".stat-helper");
			$(".stats-damage, .stats-speed").empty();
			bigLabel.html("Armor");
			input1.keyup(function(event) {
					bigStat.html(input1.val());
			}).trigger('keyup');					
			input2.keyup(function(event) {
					damageStat.html(input2.val() + "-" + input3.val() + " <span class='stat-helper'>Block Amount</span>");
			}).trigger('keyup');					
			input3.keyup(function(event) {
					damageStat.html(input2.val() + "-" + input3.val() + " <span class='stat-helper'>Block Amount</span>");
			}).trigger('keyup');					
			input4.keyup(function(event) {
					speedStat.html(input4.val() + "% <span class='stat-helper'>Chance to Block</span>");
			}).trigger('keyup');							
			break;
		case "belt":
		case "boots":
		case "bracers":
		case "chest":
		case "cloak":
		case "gloves":
		case "helm":
		case "pants":
		case "mighty-belt":
		case "shoulders":
		case "spirit-stone":
		case "voodoo-mask":
		case "wizard-hat":
			$("#base_dps-element, #base_damage_min-element, #base_damage_max-element, #base_speed-element, #base_dps-label, #base_damage_min-label, #base_damage_max-label, #base_speed-label, #base_block_chance-element, #base_block_chance-label, #base_block_amount_min-element, #base_block_amount_min-label, #base_block_amount_max-element, #base_block_amount_max-label").hide();
			$("#base_armor-label, #base_armor-element").show();
			stats = $(".item-preview .stats");
			input = $("#base_armor");
			bigStat = stats.find(".big-stat");
			bigLabel = stats.find(".stat-helper");
			$(".stats-extra-percent, .stats-extra-range").empty();
			bigLabel.html("Armor");
			input.keyup(function(event) {
					bigStat.html(input.val());
			}).trigger('keyup');					
			break;
		case "2h-mace":
		case "2h-axe":
		case "bow":
		case "daibo":
		case "crossbow":
		case "2h-mighty":
		case "polearm":
		case "staff":
		case "2h-sword":
		case "axe":
		case "ceremonial-knife":
		case "hand-crossbow":
		case "dagger":
		case "fist-weapon":
		case "mace":
		case "mighty-weapon":
		case "spear":
		case "sword":
		case "wand":
			stats = $(".item-preview .stats");
			input1 = $("#base_dps");
			input2 = $("#base_damage_min");
			input3 = $("#base_damage_max");
			input4 = $("#base_speed");
			speedStat = $(".stats-extra-percent").html("");
			damageStat = $(".stats-extra-range").html("");
			bigStat = stats.find(".big-stat");
			bigLabel = stats.find(".stat-helper");
			bigLabel.html("Damage per Second");
			$("#base_armor-label, #base_armor-element, #base_block_chance-element, #base_block_chance-label, #base_block_amount_min-element, #base_block_amount_min-label, #base_block_amount_max-element, #base_block_amount_max-label").hide();
			$("#base_dps-element, #base_damage_min-element, #base_damage_max-element, #base_speed-element, #base_dps-label, #base_damage_min-label, #base_damage_max-label, #base_speed-label").show();
			input1.keyup(function(event) {
					bigStat.html(input1.val());
			}).trigger('keyup');					
			input2.keyup(function(event) {
					damageStat.html(input2.val() + "-" + input3.val() + " <span class='stat-helper'>Damage</span>");
			}).trigger('keyup');					
			input3.keyup(function(event) {
					damageStat.html(input2.val() + "-" + input3.val() + " <span class='stat-helper'>Damage</span>");
			}).trigger('keyup');					
			input4.keyup(function(event) {
					speedStat.html(input4.val() + " <span class='stat-helper'>Attacks per Second</span>");
			}).trigger('keyup');					
			break;
		default:
			$(".stats .big-stat, .stats .stat-helper").html("");
			$(".stats-speed").html("");
			$(".stats-damage").html("");
			$(".item-preview .stats").removeClass("stats-armor stats-dps");
			$("#base_dps-element, #base_damage_min-element, #base_damage_max-element, #base_speed-element, #base_dps-label, #base_damage_min-label, #base_damage_max-label, #base_speed-label, #base_armor-label, #base_armor-element").hide();
			break;
	}

});
$("#quality").chosen({
	placeholder: 'Choose the item\'s quality...',
	allowClear: true
});
$("#sockets").chosen({
	placeholder: 'No Sockets...',
	allowClear: true
});
$("#sockets").bind("change", function() {
	var sockets = $(this).find(":selected").val(),
			container = $(".item-preview .item .sockets");
	container.empty();
	if(sockets > 0) {
		for(i=0; i<sockets; i++) {
			var select = $("<select tabindex='150' name='socket"+i+"' style='width: 300px'><option></option></select>"),
					itemType = $("#itemType").val(),
					effect = "unknown";
			$.each(gems, function(k,v) {
				switch(itemType) {
					case "spirit-stone":
					case "voodoo-mask":
					case "wizard-hat":
					case "helm":
						effect = v[1];						
						break;
					case "shield":
					case "belt":
					case "boots":
					case "bracers":
					case "chest":
					case "cloak":
					case "gloves":
					case "pants":
					case "mighty-belt":
					case "shoulders":
						effect = v[3];
						break;
					case "2h-mace":
					case "2h-axe":
					case "bow":
					case "daibo":
					case "crossbow":
					case "2h-mighty":
					case "polearm":
					case "staff":
					case "2h-sword":
					case "axe":
					case "ceremonial-knife":
					case "hand-crossbow":
					case "dagger":
					case "fist-weapon":
					case "mace":
					case "mighty-weapon":
					case "spear":
					case "sword":
					case "wand":
						effect = v[2];							
						break;
					default:
						effect = v[3];
						break;					
				}
				select.append("<option value='" + k + "'>" + v[0] + " (" + effect + ")</option>");
			});
			container.append($("<li>").append(select));
		}
		// container.find("select").chosen();
	}
});
$("#quality").bind("change", function() {
	var name = $(this).find(":selected").html(),
			top = $(".top p"),
			nameClass = $(this).find(":selected").val(),
			container = $(".item-preview .item-type"),
			quality = $(".item-preview .item-type .quality").html(name);
	top.removeClass("quality-1 quality-2 quality-3 quality-4 quality-5 quality-6 quality-7");
	top.addClass("quality-" + nameClass);
	container.removeClass("quality-1 quality-2 quality-3 quality-4 quality-5 quality-6 quality-7");
	container.addClass("quality-" + nameClass);
});
$("#attributes").chosen({
	placeholder: 'What attributes does this item have?',
	allowClear: true
});
$("#attributes").bind("change", function() {
	var attrs = $(this).val(),
			elements = $(".item-preview .item ul.attrs");
	// Add new Elements to the Item for Editing
	if(attrs) {
		$.each(attrs, function(k,v) {
			var exists = elements.find("." + v),
					attr = $("<li></li>");
			if(!exists.length) {
				var label = td[v],
						input = "<input type='text' name='" + v + "' value='' tabindex='100'/>";
				label = label.replace("VVV", input);
				attr.html(label);
				attr.addClass(v);
				elements.append(attr);
			}
		});			
	}
	// Remove deleted elements from the Item
	elements.find("li").each(function() {
		if(!attrs || attrs.indexOf($(this).attr("class")) == -1) {
			$(this).remove();
		}
	});
});
$("#attributes").trigger('change');
$("#quality").trigger('change');
$("#itemType").trigger('change');
$("#name").trigger("keyup");