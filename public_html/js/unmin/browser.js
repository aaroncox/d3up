$(function() {
	var selectedBuild = false;
	$.fn.bindCompareThis = function() {
		$(this).click(function() {
			if(!selectedBuild) {
				$($("<div style='padding: 20px'/>").html("<p>You need to select a build to compare against before comparing. The build selection box is located above the 'Filters & Sorting' options.</p>")).dialog({
					modal: true,
					title: 'Error: Choose a build first!',
					buttons: {
						Ok: function() {
							$( this ).dialog( "close" );
						}
					}
				});
				return false;
				
			}
			// Make sure we have a selected build
			if(selectedBuild) {
				// Get this build's skills
				var passiveSkills = $("#build-" + selectedBuild + " .build-passives").data('json'), 
						buildContainer = $("#build-" + selectedBuild),
						buildItemsContainer = $("#build-" + selectedBuild + " .build-items"),
						buildItems = $("#build-" + selectedBuild + " .build-items a"),
						heroClass = buildContainer.data('class');
				// Get this build's stats (into global 'stats' variable)
				// console.log(passives);
				calc(buildItems, passiveSkills);
				// console.log(stats);
				var current = {},
						changed = {},
						original = {},
						diff = null,
						newRow = [];
				jQuery.extend(original, stats);
				// Move the new item into place
				var itemId = $(this).data('item'),
						newItem = $("#item-" + itemId + " td.name a"),
						newItemData = newItem.data('json'),
						replacementSlots = newItemData.slots;
				// Save our current stats into current
				jQuery.extend(current,stats);
				// Do a diff for each slot we could place this on...
				$.each(replacementSlots, function(k,v) {
					var slot = buildItemsContainer.find("span." + v + " a");
							lastItem = slot.data('json');
					// If we can't dual wield, don't try to compare
					switch(heroClass) {
						case "barbarian":
						case "monk":
						case "demon-hunter":
							break;
						case "wizard":
							// Check to see if we can put whatever it is in the offhand
							if(v == 'offhand' && newItemData.type != "mojo") {
								return false;
							}
							break;
						case "witch-doctor":
							// Check to see if we can put whatever it is in the offhand
							if(v == 'offhand' && newItemData.type != "source") {
								return false;
							}
							break;
					}
					// Put the new item into the gear set
					slot.data('json', newItemData);
					// setTimeout(function() {
						// Recalculate now with the new item in place
						calc($("#build-" + selectedBuild + " .build-items a"), passiveSkills);												
						// Save the new stats into 'changed'
						jQuery.extend(changed, stats);
						// Calculate the Diff
						diff = $.diff(current, changed);
						// Put the old item back in its splace
						slot.data('json', lastItem);
						// Get rid of some of the values for this display...
						var toRemove = ['EHP w/ Dodge', 'Melee EHP', 'Ranged EHP', 'Elite EHP', 'Physical EHP', 'Cold EHP', 'Fire EHP', 'Lightning EHP', 'Arcane/Holy EHP', 'Poison EHP', 'Physical Resistance', 'Cold Resistance', 'Fire Resistance', 'Lightning Resistance', 'Poison Resistance', 'Arcane/Holy Resistance'];
						$.each(toRemove, function(k,v) {
							delete diff['mod'][v];								
						});
						var toRename = {
							'Dodge Chance': 'Dodge', 
							'Damage Reduction': 'Dmg Reduce',
							'Life per Hit': 'Life/Hit',
							'Attacks per Second': 'Attacks/Sec',
							'Critical Hit Damage': 'Crit Dmg',
							'Maximum Life': 'Max Life',
							'Strength': 'STR',
							'Dexterity': 'DEX',
							'Intelligence': 'INT',
							'Vitality': 'VIT'
						};
						$.each(toRename, function(k,v) {
							if(k in diff.mod) {
								diff['mod'][v] = diff['mod'][k];								
							}
							if(k in current) {
							// if(typeof(current[k]) != "undefined") {
								current[v] = current[k];								
							}
							if(k in changed) {
							// if(typeof(changed[k]) != "undefined") {							
								changed[v] = changed[k];
							}
							delete diff['mod'][k];
							delete changed[k];
							delete current[k];
						});
						var table = $("<table/>"), 
								header = $("<tr/>").append("<th>Stat</th><th>Diff</th><th>Old</th><th>New</th>");
						// Sort
						// diff['mod'].sort();
						// Display
						if(Object.keys(diff['mod']).length > 0) {
							var theader = $("<tr/>");
							$.each(diff['mod'], function(k,v) {
								theader.append($("<th/>").html(k));
							});
							table.append(theader);
							var row = $("<tr/>");								
							$.each(diff['mod'], function(k,v) {
								var diffVal = Math.round((changed[k] - current[k]) * 100) / 100;
								var cur = Math.round(current[k] * 100) / 100,
										pos = Math.round(changed[k] * 100) / 100;
								// if(diffVal > 1000) {
								// 	diffVal = Math.round(cur / 10 * 100) / 100 + "k";
								// }
								// if(diffVal < -1000) {
								// 	diffVal = Math.round(cur / 10 * 100) / 100 + "k";
								// }
								if(diffVal > 0) {
									row.append($("<td/>").html(diffVal).addClass("bg-pos"));
								} else {
									row.append($("<td/>").html(diffVal).addClass("bg-neg"));
								}
								table.append(row);
							});
							$("#compared-item-" + itemId + "-" + k).remove();
							var displayItem = slot.clone();
							displayItem.bindTooltip();
							newRow[k] = $("<tr class='compared compared-to' id='compared-item-" + itemId  + "-" + k + "'><td class='name wearing'></td><td class='diff' colspan='10'></td>");
							newRow[k].find(".wearing").html("<p class='helper'>Compared to your item,</p>").append(displayItem).append("<p class='helper'>the following stats change:</p>");
							newRow[k].find(".diff").html(table);
							$("#item-"+itemId).after(newRow[k]);
							$("#item-"+itemId).addClass('compared-against');
						} 		
					return false;
				});
			}
			return false;
		}).css({cursor: 'pointer'});			
	};
	$(".compareThis").bindCompareThis();		
	$("#buildSelect").chosen({allow_single_deselect: true});
	$("#itemType").chosen({allow_single_deselect: true});
	$("#itemType").bind('change', getResults);
	$("#slotType").chosen({allow_single_deselect: true});
	$("#slotType").bind('change', getResults);
	$("#sellMethod").chosen({allow_single_deselect: true});
	$("#sellMethod").bind('change', getResults);
	var priceTimer = null;
	$("#maxPrice").keyup(function(){
	    clearTimeout(priceTimer);
	    priceTimer = setTimeout(function(){
				getResults();
	    }, 500);
	});
	$("#sortAttributes").chosen({allow_single_deselect: true});
	$("#sortAttributes").bind('change', getResults);
	$("#item-pagination a").bind('click', bindPagination);
	function bindPagination() {
		var link = $(this).prop("href");
		$("#recent-items tbody").addClass("ui-state-disabled");
		$.ajax({
			url: link,
			type: 'html',
			success: function(data) {
				$("#recent-items tbody .compared").remove();
				setTimeout(function() {
					$("#recent-items tbody").replaceWith(data);
					$("#item-pagination a").bind('click', bindPagination);
					$("#buildSelect").trigger('change');
					$(".compareThis").bindCompareThis();									
				}, 0);
			},
			error: function() {
				// console.log("error");
			}
		});
		return false;
	};
	$("#buildSelect").bind('change', pickBuild);
	function pickBuild() {
		selectedBuild = $(this).val();
		if(selectedBuild) {
			$(".compareThis").show();				
		} else {
			// $(".compareThis").hide();
		}
	};
	function getResults() {
		setTimeout(function() {
			var resultsTable = $("#recent-items tbody"),
					itemType = $("#itemType").val(),
					slotType = $("#slotType").val(),
					sortAttr = $("#sortAttributes").val(),
					maxPrice = $("#maxPrice").val(),
					sellMethod = $("#sellMethod").val(),
					sortAttrs = [],
					url = window.location.pathname;
			if(itemType && itemType != "") {
				url += '/type/' + itemType;
			}
			if(slotType && slotType != "") {
				url += '/slot/' + slotType;				
			}
			if(maxPrice && maxPrice != "") {
				url += '/limit/' + maxPrice;
			}
			if(sellMethod && sellMethod != "") {
				url += '/sellMethod/' + sellMethod;
			}
			if(sortAttr && sortAttr != "") {
				$("#sortAttributes_chzn ul li a").each(function() {
					sortAttrs.push($("#sortAttributes option:eq(" + $(this).attr("rel") + ")").val());
				});
				url += '/sort/' + sortAttrs.join(",");
			}
			resultsTable.addClass("ui-state-disabled");
			$("#recent-items tbody").html("<h3 style='color: #777; text-align: center;'>Loading</h3>");
			$.ajax({
				url: url,
				type: 'html',
				success: function(data) {
					setTimeout(function() {
						$("#recent-items tbody").replaceWith(data);
						$("#item-pagination a").bind('click', bindPagination);
						$("#buildSelect").trigger('change');
						$(".compareThis").bindCompareThis();		
						$("a[data-json]").each(function() {
							$(this).bindTooltip();							
						});
					}, 0);
				}
			});
		}, 0);
	}		
});