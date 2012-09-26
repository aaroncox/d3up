$(function() {
	function statLabel(k,v,format,math) {
		if(!v) {
			v = 0;
		}
		switch(format) {
			case "per":
				if(v) {
					if(v <= 1) {
						v = Math.round(v * 1000)/10 + "%";					
					} else { 
						v = Math.round(v * 10)/10 + "%";					
					}
				} else {
					v = "0%";
				}
				break;
			case "around":
			  v = Math.round(v);
			  break;
			case "round":
				v = Math.round(v * 100) / 100;
				break;
			default:
				break;
		}
		var cleaned = k.replace(/\s+/g, '-').toLowerCase();
		if(v) {
			v = v.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");			
		}
		var tr = $("<tr>").addClass('stat-' + cleaned + ' statLabel'),
		    label = $("<td>").html(k), 
		    controls = $("<td>").addClass('skill-control').html("");
		if(v.toString().split("-").length == 2) {
		  var parts = v.toString().split("-");
      d1 = $("<td class='range'>").html(parts[0]);
      dv = $("<td class='range-div'>").html("-");
      d2 = $("<td class='range'>").html(parts[1]);
  		tr.append(label, d1, dv, d2, controls);		  
		} else {
		  data = $("<td class='data'>").html(v);
		  var placeholder = $("<td colspan='2'>");
  		tr.append(label, data, placeholder, controls);		  
		}
		if(math) {
			if(math <= 1) {
				data.append(" (" + (Math.round(math * 1000)/10) + "%)");
			} else {
				data.append(" (" + math + "%)");
			}
		}
		return tr;
	}
	$("#item-sim-tab").click(function() {
		$(".skill-activate").each(function() {
			if($(this).is(":checked")) {
				$(this).trigger('click');
				recalc();
			}
		});
	});
	var tabOffense = $("#stats-offense"),
			tabDefense = $("#stats-defense"),
			tabBase = $("#stats-base"),
			tabLife = $("#stats-life"),
			tabMisc = $("#stats-misc"),
			tabEHPGains = $("#stats-ehp-gains"),
			tabDPSGains = $("#stats-dps-gains"),
			tabEHP = $("#stats-ehp"),
			tabEHPGear = $("#stats-ehp-gear"),
			tabDPSGear = $("#stats-dps-gear"),
			selectVs = $("#vsLevel"), 
			selectParagon = $("#paragonLevel"),
			heroClass = $("#character").data('class'),
			isOwner = $("#character").data("owner"),
			skillDisplay = $("#skill-display"),
			// activeSelect = $("#actives"),
			activeDisplay = $("#active-display"),
			// passiveSelect = $("#passives"),
			passiveDisplay = $("#passive-display"),	
			activeActivesData = {},		
			activePassivesData = {},
			activeCompanionData = {},
			calc = new d3up.BuildCalculator,
			itemBuilder = new d3up.ItemBuilder,
			activeActiveSkills = {},
			activePassiveSkills = {},
			enabledSkills = {},
			enabledPassiveSkills = {};
	itemBuilder.init();
	// Setup Defaults and Reset
	calc.init();
	// Setup the Class for the Calculator
	calc.setClass($("#character").data('class'));
	calc.setParagonLevel($("#paragon-level").text());
	// Pass in which gear we are calculating
	$(".equipped a").each(function() {
		var slot = $(this).parent().data("slot"),		// Get the slot this gear is in
				data = $(this).data("json");						// Get the JSON for this gear
		calc.setItem(slot, data);
	});
	
	// Pass in the Passives we're using
	calc.setPassives(activePassiveSkills);
	// Get the Calculated Stats
	var stats = calc.run();
		
	var activeSelects = [1,2,3,4,5,6],
			passiveSelects = [1,2,3],
			activeChooser = $("#active-skill-chooser"),
			passiveChooser = $("#passive-skill-chooser");
	$.each(activeSelects, function(k, v) {
		var select = $("<select data-index='"+(v - 1)+"' data-placeholder='Select a Skill...' name='activeSelect"+v+"'>"),
				label = $("<span class='skill-label'>").html("Skill #" + v);
		select.append("<option value=''>None</option>");
		$.each(activeSkills[heroClass], function(slug, data) {
			var option = $("<option value='" + slug + "'>").html(data.name),
					idx = v - 1;
			if(activeActives[idx] && activeActives[idx] == slug) {
				option.attr("selected", "selected");
				activeActivesData[slug] = activeSkills[heroClass][slug];	
			}
			select.append(option);
		});
		activeChooser.append($("<p>").append(label, select));
		select.chosen({
			allow_single_deselect: true
		});
		select.bind('change', function() {
			var slug = $(this).val();
			activeActives[$(this).data("index")] = slug;
			activeActivesData[slug] = activeSkills[heroClass][slug];	
			displaySkills();
		});
	});
	$.each(['scoundrel', 'enchantress', 'templar', 'shrine'], function(k, v) {
	  $.each(activeSkills[v], function(slug, data) {
			if(activeSkills[v]) {
				activeCompanionData[slug] = activeSkills[v][slug];	
			}
		});
	});	
	$.each(passiveSelects, function(k, v) {
		var select = $("<select data-index='"+(v - 1)+"' data-placeholder='Select a Skill...' name='passiveSelect"+v+"'>"),
				label = $("<span class='skill-label'>").html("Passive #" + v);
		select.append("<option value=''>None</option>");
		$.each(passives[heroClass], function(slug, data) {
			var option = $("<option value='" + slug + "'>").html(slug.replace(/\-/g, " ").capitalize()),
					idx = v - 1;
			if(activePassives[idx] && activePassives[idx] == slug) {
				option.attr("selected", "selected");
				activePassivesData[slug] = passives[heroClass][slug];	
			}
			select.append(option);
		});
		passiveChooser.append($("<p>").append(label, select));
		select.chosen({
			allow_single_deselect: true
		});
		select.bind('change', function() {
			activePassives[$(this).data("index")] = $(this).val();
			activePassivesData[$(this).val()] = passives[heroClass][$(this).val()];	
			displaySkills();
		});
	});
	if(isOwner) {
		var skillSaveButton = $("<a class='button'>").html("Save Skills"),
		    passiveSaveButton = $("<a class='button'>").html("Save Skills");
		passiveSaveButton.click(function() {
			$.ajax({
				data: {
					a: 'skills',
					actives: activeActives,
					passives: activePassives,
					stats: {
						dps: stats.dps,
						ehp: stats.ehp
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
		skillSaveButton.click(function() {
			$.ajax({
				data: {
					a: 'skills',
					actives: activeActives,
					passives: activePassives,
					stats: {
						dps: stats.dps,
						ehp: stats.ehp
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
  activeChooser.hide();
  passiveChooser.hide();
	activeChooser.append(skillSaveButton);
	passiveChooser.append(passiveSaveButton);
	$(".skill-change").click(function() {
	  if(activeChooser.is(":visible")) {
  		activeChooser.hide();	    
	  } else {
  		activeChooser.show();
	  }
	});
	$(".passive-change").click(function() {
	  if(passiveChooser.is(":visible")) {
      passiveChooser.hide();
	  } else {
      passiveChooser.show();
	  }
	});
	// Debugging
	// d3up.log(stats);
	// if(activeSkills && activeSkills[heroClass]) {
	// 	var idx = 0;
	// 	$.each(activeSkills[heroClass], function(k,v) {
	// 		var selected = false;
	// 		activeSelect.append($("<option value='"+k+"' rel='"+idx+"'/>").html(v.name));			
	// 		idx++;
	// 	});
	// };
	// // consol
	// activeSelect.chosen({
	// 	placeholder: 'Which skills/abilities do you use?',
	// 	allowClear: true
	// });
	// $.each(activeActives, function(key, active) {
	// 	activeSelect.find("option[value='" + active + "']").attr("selected", "selected");
	// 	// d3up.log(key, active);
	// 	// if(k == active) {
	// 	// 	selected = 'selected="selected"';
	// 	// }
	// }); 			
	// activeSelect.trigger("liszt:updated");
	// 
	// if(passives && passives[heroClass]) {
	// 	$.each(passives[heroClass], function(k,v) {
	// 		var selected = '';
	// 		if(typeof activePassives != "undefined") {
	// 			$.each(activePassives, function(key,active) {
	// 				if(k == active) {
	// 					selected = 'selected="selected"';
	// 				}
	// 			}); 			
	// 		}
	// 		passiveSelect.append($("<option value='"+k+"' "+selected+"/>").html(k.replace(/\-/g," ").capitalize()));			
	// 	});		
	// };
	// passiveSelect.chosen({
	// 	placeholder: 'Which passives skills are you using?',
	// 	allowClear: true
	// });
	// 
	// activeSelect.bind('change', function() {
	// 	var select = $(this),
	// 			skills = [];
	// 	activeActivesData = {};
	// 	$("#" + $(this).attr("id") + "_chzn ul li a").each(function() {
	// 		skills.push(select.find("option[rel=" + $(this).attr("rel") + "]").attr("value"));
	// 	});
	// 	if(skills.length >= 0) {
	// 		activeDisplay.empty();
	// 		$("#build-active-skills").empty();
	// 		$.each(skills, function(k,v) {
	// 			skillDisplay.show();
	// 			if(k >= 6) {
	// 				return false;
	// 			}
	// 			var skill = activeSkills[heroClass][v],
	// 					cleaned = v.split("~"),
	// 					icon = "/images/icons/" + heroClass + "-" + cleaned[0] + ".png";
	// 					img = $("<img/>").attr("src", icon);
	// 			img.attr('data-name', skill.name);
	// 			img.attr('title', skill.name);
	// 			if(skill.rune) {
	// 				img.attr('data-tooltip', skill.desc.replace(/  /, "<br/><br/>") + "<br/><br/>" + skill.rune);
	// 			} else { 
	// 				img.attr('data-tooltip', skill.desc);
	// 			}
	// 			img.bindSkilltip();
	// 			activeDisplay.append($("<li/>").html(img));			
	// 			
	// 		});	
	// 	}
	// 	recalc();
	// 	if(!activeActives) {
	// 		activeActives = [];
	// 	}
	// 	// d3up.log(skills);
	// 	if(!skills || activeActives.length != skills.length) {
	// 		if(isOwner && skills.length <= 6) {
	// 			setTimeout(function() {
	// 				$.ajax({
	// 					data: {
	// 						a: 'active-skills',
	// 						actives: skills,
	// 						stats: stats
	// 					}
	// 				});												
	// 			}, 0);
	// 		}
	// 	}
	// 	activeActives = skills;
	// 	displaySkills();	
	// });
	// passiveSelect.bind('change', function() {
	// 	var skills = ($(this).val()) ? $(this).val() : [];
	// 	if(skills.length > 0) {
	// 		passiveDisplay.empty();
	// 		$.each(skills, function(k,v) {
	// 			skillDisplay.show();
	// 			var skill = passives[heroClass][v],
	// 					icon = "/images/icons/" + heroClass + "-" + v + ".png";
	// 					img = $("<img/>").attr("src", icon);
	// 			img.attr('data-name', v.replace(/\-/g," ").capitalize());
	// 			img.attr('title', v.replace(/\-/g," ").capitalize());
	// 			img.attr('data-tooltip', skill.desc);
	// 			img.bindSkilltip();
	// 			passiveDisplay.append($("<li/>").html(img));
	// 		});
	// 		recalc();			
	// 	}
	// 	if(!activePassives) {
	// 		activePassives = [];
	// 	}
	// 	if(!skills || activePassives.length != skills.length) {
	// 		if(isOwner && skills.length <= 3) {
	// 			setTimeout(function() {
	// 				$.ajax({
	// 					data: {
	// 						a: 'passive-skills',
	// 						passives: skills, 
	// 						stats: stats
	// 					}
	// 				});												
	// 			}, 0);
	// 		}
	// 	}
	// 	activePassives = $(this).val();		
	// });
	// activeSelect.trigger('change');
	// passiveSelect.trigger('change');
	selectVs.bind('change', function() {
		calc.setVsLevel($(this).val());
		recalc();
	});
	selectParagon.bind('change', function() {
		$("#paragon-level").html($(this).val());
		calc.setParagonLevel($(this).val());
		recalc();
	});
	function recalc() {
		activeActiveSkills = {};
		activePassiveSkills = {};
		activeCompanionSkills = {};
		enabledSkills = {};
		enabledPassiveSkills = {};
		calc.init();
		$('.skill-activate').each(function() {
			activeActiveSkills[$(this).data('skill')] = activeActivesData[$(this).data('skill')];
			if($(this).is(":checked")) {
				enabledSkills[$(this).data('skill')] = activeActivesData[$(this).data('skill')];
				if($(this).data('stacks')) {
          enabledSkills[$(this).data('skill')].stacks = $(this).attr('data-stacks');
				} else {
          enabledSkills[$(this).data('skill')].stacks = 1;
				}
			}
		});
		$('.passive-activate').each(function() {
			// d3up.log($(this).data('skill'));
			activePassiveSkills[$(this).data('skill')] = activePassivesData[$(this).data('skill')];
			if($(this).is(":checked")) {
				enabledSkills[$(this).data('skill')] = activePassivesData[$(this).data('skill')];
				if($(this).data('stacks')) {
          enabledSkills[$(this).data('skill')].stacks = $(this).attr('data-stacks');
				} else {
          enabledSkills[$(this).data('skill')].stacks = 1;
				}
			}
			// d3up.log(activePassiveSkills, $(this).data('skill'), activePassivesData);
		});
		$('.companion-activate').each(function() {
      // d3up.log($(this).data('skill'));
			activeCompanionSkills[$(this).data('skill')] = activeCompanionData[$(this).data('skill')];
			if($(this).is(":checked")) {
				enabledSkills[$(this).data('skill')] = activeCompanionData[$(this).data('skill')];
			}
		});
		calc.setActives(activeActiveSkills);
		calc.setEnabledSkills(enabledSkills);
		calc.setPassives(activePassiveSkills);
		calc.setCompanionSkills(activeCompanionSkills);
		calc.setParagonLevel($("#paragon-level").text());
		calc.setClass($("#character").data('class'));
			$(".equipped a").each(function() {
		var slot = $(this).parent().data("slot"),		// Get the slot this gear is in
				data = $(this).data("json");						// Get the JSON for this gear
		calc.setItem(slot, data);
	});
    // d3up.log(activePassiveSkills);
		stats = calc.run();
		_.each(stats.skillData, function(v,k) {
			if(v.activate) {
				$(".skill-calc-row[data-id='" + k + "'] .control").show();
			}
			if(v.stackable) {
				var select = $(".skill-calc-row[data-id='" + k + "'] .control select").show();
				if(select.find("option").length == 0) {
  				for(i = 1; i <= v.stackable; i++) {
  				  var option = $("<option value='" + i + "'>").html(i + " Stacks");
  				  select.append(option);
  				}				  
				}
			}
		}, this);
		displayStats();
	}
	displaySkills();
	function displaySkills() {
		var target = $("#build-active-skills").empty(),
				skills = activeActives,
				passiveSkills = activePassives;
		if(passiveSkills.length) {
			passiveDisplay.empty();			
		}
		if(skills.length) {
			activeDisplay.empty();			
		}
		_.each(skills, function(skill) {
			if(skill != "undefined" && skill != "") {
				var data = activeSkills[heroClass][skill];
				if(!data || !data['effect']) {
					return;
				}
				var	tr = $("<tr class='skill-calc-row'>").attr("data-json", JSON.stringify(data.effect)).attr("data-id", skill).attr("id", "skill-" + skill),
						cleaned = skill.split("~"),
						icon = $("<img src='/images/icons/" + heroClass + "-" + cleaned[0] + ".png'>"),
						h3 = $("<h3>").html(data.name),
						details = $("<table class='details'>"),
						desc = $("<p><span class='stat-helper'>Description</span>: </p>").append(data.desc),
						rune = $("<p>"),
						control = $("<div class='control'></div>");
				h3.attr('data-tooltip', data.desc);
				h3.attr('data-name', data.name);
				icon.attr('data-tooltip', data.desc);
				icon.attr('data-name', data.name);
				if(data.rune) {
					h3.attr('data-tooltip', data.desc.replace(/  /, "<br/><br/>") + "<br/><br/>" + data.rune);
					rune = $("<p>").html("<span class='stat-helper'>Rune Bonus</span>: " + data.rune);
				}
				h3.prepend(icon);
				icon.bindSkilltip();
				h3.bindSkilltip();
				if(data.effect) {
					// d3up.log("effect ", data.effect);
					var checkbox = $("<input type='checkbox' class='skill-activate' data-skill='" + skill + "'>");
					checkbox.click(function() {
						tr.toggleClass("skill-activated");
						recalc();
					});
					var select = $("<select class='skill-stacks' data-skill='" + skill + "'>").hide();
					select.bind('change', function() {
						checkbox.attr("data-stacks", $(this).val());
						recalc();
					});
					control.append("Activate ", checkbox, "<br/>", select).hide();					
				}
				// d3up.log(details);
				activeDisplay.append($("<li>").append(icon.clone()));									
				tr.append($("<td>").append(control, h3, details));
				target.append(tr);
				// var damage = calc.calcSkillDamage(data);
				// d3up.log(data);				
			}
		});
		target = $("#build-passive-skills").empty(),
		_.each(passiveSkills, function(v) {
			var skill = v;
			if(skill != "undefined" && skill != "") {
				var data = passives[heroClass][skill];
				if(!data) {
					return;
				}
				var	tr = $("<tr class='skill-calc-row'>").attr("data-id", skill).attr("id", "skill-" + skill),
						cleaned = skill.split("~"),
						icon = $("<img src='/images/icons/" + heroClass + "-" + cleaned[0] + ".png'>"),
						h3 = $("<h3>").html(v.replace(/\-/g, " ").capitalize()),
						details = $("<ul class='details'>"),
						desc = $("<p>").append(data.desc),
						control = $("<div class='control'></div>");
				h3.attr('data-tooltip', data.desc);
				h3.attr('data-name', v.replace(/\-/g," ").capitalize());
				icon.attr('data-tooltip', data.desc);
				icon.attr('data-name', v.replace(/\-/g," ").capitalize());
				h3.prepend(icon);
				icon.bindSkilltip();
				h3.bindSkilltip();
				// if(data.effect) {
					// d3up.log("effect ", data.effect);
					var checkbox = $("<input type='checkbox' class='passives-activate' data-skill='" + skill + "'>");
					checkbox.click(function() {
						tr.toggleClass("skill-activated");
						recalc();
					});
					var select = $("<select class='skill-stacks' data-skill='" + skill + "'>").hide();
					select.bind('change', function() {
						checkbox.attr("data-stacks", $(this).val());
						recalc();
					});
					control.append("Activate ", checkbox, "<br/>", select).hide();					
				// }
				passiveDisplay.append($("<li/>").html(icon.clone()));
				tr.append(control, h3, details, desc);
				target.append(tr);
			}
		});
		target = $("#companion-buffs").empty();
		var companions = ['scoundrel', 'enchantress', 'templar', 'shrine'];
		_.each(companions, function(c) {
		  _.each(activeSkills[c], function(k, v) {
		    var skill = v;
  			if(skill != "undefined" && skill != "") {
  				var data = activeSkills[c][skill];
  				if(!data || !data.effect) {
  					return;
  				}
  				var	tr = $("<tr class='skill-calc-row'>").attr("data-id", skill).attr("id", "skill-" + skill),
  						cleaned = skill.split("~"),
  						icon = $("<img src='/images/icons/" + c + "-" + cleaned[0] + ".png'>"),
  						h3 = $("<h3>").html(c.capitalize() + " - " + v.replace(/\-/g, " ").capitalize()),
  						details = $("<ul class='details'>"),
  						desc = $("<p>").append(data.desc),
  						control = $("<div class='control'></div>");
  				h3.attr('data-tooltip', data.desc);
  				h3.attr('data-name', v.replace(/\-/g," ").capitalize());
  				// if(data.effect) {
            // d3up.log("effect ", data.effect);
  					var checkbox = $("<input type='checkbox' class='companion-activate' data-skill='" + skill + "'>");
  					checkbox.click(function() {
  						tr.toggleClass("skill-activated");
              recalc();
  					});
            // var select = $("<select class='skill-stacks' data-skill='" + skill + "'>").hide();
            // select.bind('change', function() {
            //  checkbox.attr("data-stacks", $(this).val());
            //  recalc();
            // });
  					control.append("Activate ", checkbox); //, "<br/>" select).hide();					
  				// }
          // passiveDisplay.append($("<li/>").html(icon.clone()));
  				tr.append(control, h3, details, desc);
  				target.append(tr);
  			}
		  });
		});
    recalc();
		// d3up.log(activeSelect.val());
	}
	if(isOwner) {
		$(".gear-change").click(function() {
			var itemType = $(this).data('item-type'),
					itemDisplay = $("#equipped-" + itemType);
			if(itemType == 'offhand') {
				var mh = $("#equipped-mainhand a").data("json");
				if(mh) {
					switch(mh.type) {
						case '2h-mace': 
						case '2h-axe': 
						case 'daibo': 
						case '2h-mighty': 
						case 'polearm': 
						case 'staff': 
						case '2h-sword':
							$($("<div style='padding: 20px'/>").html("<p>You're currently wearing a two handed weapon, an offhand isn't allowed.")).dialog({
								modal: true,
								buttons: {
									Ok: function() {
										$( this ).dialog( "close" );
									}
								}
							});
							return false;
							break;
					}					
				}
			}
			$.ajax({
				url: '/item/fetch/type/' + itemType,
				cache: false,
				dataType: 'json',
				success: function(data) {
					var gearSelect = $("#available-gear"),
							gearDialog = $("#gear-change");
					// Clear out the List to avoid confusion
					gearSelect.html("");
					// Add a "Nothing" option
					gearSelect.append("<option value=''>Nothing</option>");
					// Loop through all the JSON we recieved and append them as options
					$.each(data, function(k,v) {
						var item = $.parseJSON(v), 
								option = $("<option/>");
						option.attr("value", k);
						option.attr("data-json", v);
						option.html(item.name);
						option.bindTooltip();
						gearSelect.append(option);
					});
					gearDialog.dialog({
						width: 800,
						modal: true,
						buttons: {
							Equip: function() {	
								var dialog = $(this);
								if(gearSelect.val() != "") {
									var itemLink = $("<a/>"),
											itemSelected = gearSelect.selectedOption(),
											itemData = $.parseJSON(itemSelected.attr("data-json"));
									// Unequip offhand if we're equipping a 2h weapon
									switch(itemData.type) {
										case '2h-mace': 
										case '2h-axe': 
										case 'daibo': 
										case '2h-mighty': 
										case 'polearm': 
										case 'staff': 
										case '2h-sword':
											$("#equipped-offhand").html("Nothing");
											break;
									}
									itemLink.attr("href", "/i/" + gearSelect.val());
									itemLink.attr("data-json", JSON.stringify(itemData));
									itemLink.addClass("quality-" + itemData.quality);
									itemLink.html(itemData.name);
									itemLink.bindTooltip();
									itemDisplay.html(itemLink);
								} else {
									itemDisplay.html("Nothing");
								}
								dialog.dialog( "close" );		
								recalc();
								setTimeout(function() {
									$.ajax({
										data: {
											a: 'equip',
											slot: itemType,
											newItem: gearSelect.val(),
											stats: {
												dps: stats.dps,
												ehp: stats.ehp
											}
										}
									});									
								}, 0);
							},
							Cancel: function() {
								$(this).dialog( "close" );
							}
						}
					});
				}			
			});
			return false;
		});		
	}
	function displayStats() {
		// EHP 
		tabEHP.empty();
		tabEHP.append($("<tr class='header'><th colspan='10'>Effective Hit Points</th></tr>"));
		tabEHP.append(statLabel("EHP", stats.ehp, 'round'));
		$(".hl-ehp .value").html((Math.round(stats.ehp * 100) / 100).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
		tabEHP.append(statLabel("EHP w/ Dodge", stats['ehp-dodge'], 'round'));
		tabEHP.append(statLabel("EHP w/ Block", "Not Implemented")); //stats['ehp-block']
		tabEHP.append(statLabel("Melee EHP", stats['ehp-melee'], 'round'));
		tabEHP.append(statLabel("Ranged EHP", stats['ehp-range'], 'round'));
		tabEHP.append(statLabel("Elite EHP", stats['ehp-elite'], 'round'));
		tabEHP.append(statLabel("Physical EHP", stats['ehp-physical'], 'round'));
		tabEHP.append(statLabel("Cold EHP", stats['ehp-cold'], 'round'));
		tabEHP.append(statLabel("Fire EHP", stats['ehp-fire'], 'round'));
		tabEHP.append(statLabel("Lightning EHP", stats['ehp-lightning'], 'round'));
		tabEHP.append(statLabel("Poison EHP", stats['ehp-poison'], 'round'));
		tabEHP.append(statLabel("Arcane/Holy EHP", stats['ehp-arcane'], 'round'));
		// ----------------------------------
		// Render Skill Damage
		// ----------------------------------
		var containerSkills = $("#build-active-skills");
    // d3up.log(stats.skillData);
		$.each(stats.skillData, function(k,v) {
			var target = containerSkills.find("tr[data-id=\"" + k + "\"] table.details").empty(),
			    th = $("<th colspan='10' class='skill-damage'>").html("Damage Statistics");
			target.append($("<tr>").append(th));			  
			$.each(v, function(s,i) {
				switch(s) {
				  case "per-tick-norm":
  					target.append(statLabel("Per Tick", i, 'around'));
				    break;
				  case "per-tick-crit":
  					target.append(statLabel("Critical Per Tick", i, 'around'));
				    break;
				  case "total-damage-norm":
  					target.append(statLabel("Total Damage", i, 'around'));
				    break;
				  case "total-damage-crit":
  					target.append(statLabel("Critical Total Damage", i, 'around'));
				    break;
					case "3rd-hit":
						target.append(statLabel("Average 3rd Hit", i, 'around'));
						break;						
					case "critical-hit-2nd":
						target.append(statLabel("2nd Pierce Critical Hit", i));
						break;						
					case "critical-hit-3rd":
						target.append(statLabel("3rd Pierce Critical Hit", i));
						break;						
					case "per-tick":
						target.append(statLabel("DPS", i, 'around'));
						break;
					case "total-damage":
						target.append(statLabel("Total Damage/Cast", i, 'around'));
						break;
					case "average-hit":
						target.append(statLabel("Average Hit", i));
						break;
					case "damage-tick":
						target.append(statLabel("Damage Per Tick", i));
						break;
					case "damage":
						target.append(statLabel("Damage Range", i));
						break;
					case "damage-2nd":
						target.append(statLabel("2nd Pierce Hit", i));
						break;
					case "damage-3rd":
						target.append(statLabel("3rd Pierce Hit", i));
						break;
					case "dps":
						target.append(statLabel("DPS", i));
						break;
					case "critical-hit":
						target.append(statLabel("Crit Damage Range", i));
						break;
					case "critical-hit-tick":
						target.append(statLabel("Per Tick Crit Damage", i));
						break;
				}
			});
			if(activeActivesData[k].effect) {
			  var th = $("<th colspan='10' class='skill-effects'>").append("Skill Effects");
			  target.append($("<tr>").append(th));
  		  $.each(activeActivesData[k].effect, function(i,e) {
  		    var tr = $("<tr>"),
  		        td = $("<td colspan='10'>");
  		    if(itemBuilder.skillText[i]) {
  		      var value = "<span class='skill-highlight'>" + e + "</span>",
  		          desc = itemBuilder.skillText[i].replace("VVV", value);
    		    td.append(desc);
    		    tr.append(td);
    			  target.append(tr);			    
  		    } else {
  		      d3up.log("Unhandled Ability Effect: " + i);
  		    }
  		  });			  
			}
      if(target.find('.statLabel').length == 0) {
        target.find('.skill-damage').hide();
      }
      if(target.text() != "") {
        target.show();
      }
		});
		// ----------------------------------
		// Render the Stasistics below
		// ----------------------------------	
		// Base Statistics Display
		tabBase.empty();
		tabBase.append($("<tr class='header'><th colspan='10'>Base Statistics</th></tr>"));
		tabBase.append(statLabel("Strength", stats['strength']));
		tabBase.append(statLabel("Dexterity", stats['dexterity']));
		tabBase.append(statLabel("Intelligence", stats['intelligence']));
		tabBase.append(statLabel("Vitality", stats['vitality']));
		tabBase.append(statLabel("Magic Find", stats['plus-magic-find'], 'per'));
		tabBase.append(statLabel("Gold Find", stats['plus-gold-find'], 'per'));
		// Defensive Statistics Display
		tabDefense.empty();
		tabDefense.append($("<tr class='header'><th colspan='10'>Defensive Statistics</th></tr>"));
		tabDefense.append(statLabel("Armor", stats.armor, 'round', stats.armorReduce));
		tabDefense.append(statLabel("All Resist", stats['resist-all'], 'round', stats['percent-resist-all']));
		// tabDefense.append(statLabel("Block Amount", (stats['block-amount']) ? stats['block-amount'] : '~'));		
		tabDefense.append(statLabel("Block Chance", stats['block-chance'], 'per'));
		tabDefense.append(statLabel("Dodge Chance", stats['dodge-chance'], 'per'));
		tabDefense.append(statLabel("Damage Reduction", stats.armorReduction, 'per'));
		tabDefense.append(statLabel("Physical Resistance", stats['resist-physical'], 'round', stats['percent-resist-physical']));
		tabDefense.append(statLabel("Cold Resistance", stats['resist-cold'], 'round', stats['percent-resist-cold']));
		tabDefense.append(statLabel("Fire Resistance", stats['resist-fire'], 'round', stats['percent-resist-fire']));
		tabDefense.append(statLabel("Lightning Resistance", stats['resist-lightning'], 'round', stats['percent-resist-lightning']));
		tabDefense.append(statLabel("Poison Resistance", stats['resist-poison'], 'round', stats['percent-resist-poison']));
		tabDefense.append(statLabel("Arcane/Holy Resistance", stats['resist-arcane'], 'round', stats['percent-resist-arcane']));
		tabDefense.append(statLabel("Crowd Control Reduction", ((stats['cc-reduce'])?stats['cc-reduce']:0), 'per'));
		tabDefense.append(statLabel("Missile Damage Reduction", stats['percent-range-reduce'], 'per'));
		tabDefense.append(statLabel("Melee Damage Reduction", stats['percent-melee-reduce'], 'per'));
		tabDefense.append(statLabel("Elite Damage Reduction", stats['percent-elite-reduce'], 'per'));
		tabDefense.append(statLabel("Thorns", stats['thorns']));
		// Offensive Statistics Display
		tabOffense.empty();
		tabOffense.append($("<tr class='header'><th colspan='10'>Damage Statistics</th></tr>"));
		tabOffense.append(statLabel("DPS", stats.dps, 'round'));
		$(".hl-dps .value").html((Math.round(stats.dps * 100) / 100).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
		tabOffense.append(statLabel("Attacks per Second", stats['dps-speed-display']));
		tabOffense.append(statLabel("Critical Hit Chance", stats['critical-hit'], 'per'));
		tabOffense.append(statLabel("Critical Hit Damage", stats['critical-hit-damage'], 'per'));
		// Gains Stats Display
		tabDPSGains.empty();
		tabDPSGains.append($("<tr class='header'><th colspan='10'>DPS Gains by Stat</th></tr>"));
		tabDPSGains.append(statLabel("+1 Primary Stat", stats['dps-pt-primary'], 'round'));
		tabDPSGains.append(statLabel("+1% Crit Hit", stats['dps-pt-critical-hit'], 'round'));
		tabDPSGains.append(statLabel("+1% Crit Hit Dmg", stats['dps-pt-critical-hit-damage'], 'round'));
		tabDPSGains.append(statLabel("+1 Minimum Dmg", stats['dps-pt-min-damage'], 'round'));
		tabDPSGains.append(statLabel("+1 Maximum Dmg", stats['dps-pt-max-damage'], 'round'));
		tabDPSGains.append(statLabel("+1% Attack Speed", stats['dps-pt-attack-speed'], 'round'));
		tabEHPGains.empty();
		tabEHPGains.append($("<tr class='header'><th colspan='10'>EHP Gains by Stat</th></tr>"));
		tabEHPGains.append(statLabel("+1 Armor", stats['ehp-pt-armor'], 'round'));
		tabEHPGains.append(statLabel("+1 Strength", stats['ehp-pt-strength'], 'round'));
		tabEHPGains.append(statLabel("+1 Intelligence", stats['ehp-pt-intelligence'], 'round'));
		tabEHPGains.append(statLabel("+1 Vitality", stats['ehp-pt-vitality'], 'round'));
		tabEHPGains.append(statLabel("+1 Resist All", stats['ehp-pt-resist-all'], 'round'));
		tabEHPGains.append(statLabel("+1% Life", stats['ehp-pt-plus-life'], 'round'));
		// Life Stastics Display
		tabLife.empty();
		tabLife.append($("<tr class='header'><th colspan='10'>Health Stastistics</th></tr>"));
		tabLife.append(statLabel("Maximum Life", stats.life, 'round'));
		tabLife.append(statLabel("Total Life Bonus", stats['plus-life'], 'per'));
		tabLife.append(statLabel("Life per Second", (stats['life-regen']) ? stats['life-regen'] : 0));
		tabLife.append(statLabel("Life Steal", (stats['life-steal']) ? stats['life-steal'] : 0, 'per'));
		tabLife.append(statLabel("Life per Kill", (stats['life-kill']) ? stats['life-kill'] : 0));
		tabLife.append(statLabel("Life per Hit", (stats['life-hit']) ? stats['life-hit'] : 0));
		tabLife.append(statLabel("Health Globe Healing Bonus", (stats['health-globes']) ? stats['health-globes'] : 0));
		tabLife.append(statLabel("Bonus to Gold/Globe Radius", (stats['plus-pickup-radius']) ? stats['plus-pickup-radius'] : 0));	
		// Add the EHP Gear Ratings
		var ehpGear = $("<ul class='resist-specific'/>").append($("<li class='header'/>").html("Gear EHP Contributions (<a href='/faq/gear-based-ehp'>?</a>)"));
		// Figure out how good each rating is
    var ehpT = 0,
        ehpM = 0,
        dpsT = 0,
        dpsM = 0;
		$.each(['ehp-helm','ehp-shoulders','ehp-amulet','ehp-chest','ehp-gloves','ehp-bracers','ehp-belt','ehp-pants','ehp-ring1','ehp-ring2','ehp-boots','ehp-mainhand','ehp-offhand'], function(k,v) {
		  if(stats[v] && stats[v] != "undefined") {
  		  ehpT += stats[v];
        if(stats[v] > ehpM) {
          ehpM = stats[v];
        }
      }
		});	
		$.each(['dps-helm','dps-shoulders','dps-amulet','dps-chest','dps-gloves','dps-bracers','dps-belt','dps-pants','dps-ring1','dps-ring2','dps-boots','dps-mainhand','dps-offhand'], function(k,v) {
		  if(stats[v] && stats[v] != "undefined") {
  		  dpsT += stats[v];
        if(stats[v] > dpsM) {
          dpsM = stats[v];
        }		    
		  }
		});
		$.each(['ehp-helm','ehp-shoulders','ehp-amulet','ehp-chest','ehp-gloves','ehp-bracers','ehp-belt','ehp-pants','ehp-ring1','ehp-ring2','ehp-boots','ehp-mainhand','ehp-offhand'], function(k,v) {
      if(stats[v]) {
  		  var per = stats[v] / ehpM,
  		      tPer = stats[v] / ehpT,
  		      val = Math.round(stats[v]).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        $("#gear-" + v).html(val + "<br/>(" + (Math.round(tPer * 1000) / 10) + "%)");
        // $("#gear-" + v).css({color: "rgb(0," + parseInt(color) + ",0)"});  
        $("#gear-" + v).css("color", $.Color( "#570" ).transition($.Color( "#5F0" ), (tPer * 8))); 
        
      }
		});
		$.each(['dps-helm','dps-shoulders','dps-amulet','dps-chest','dps-gloves','dps-bracers','dps-belt','dps-pants','dps-ring1','dps-ring2','dps-boots','dps-mainhand','dps-offhand'], function(k,v) {
		  if(stats[v]) {
  		  var per = stats[v] / dpsM,
  		      tPer = stats[v] / dpsT,
  		      val = Math.round(stats[v]).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        $("#gear-" + v).html(val + "<br/>(" + (Math.round(tPer * 1000) / 10) + "%)");
        // $("#gear-" + v).css({color: "rgb(" + parseInt(color) + ",0,0)"});
        $("#gear-" + v).css("color", $.Color( "#750" ).transition($.Color( "#f50" ), (tPer * 12))); 
      }
		});
	}
	// Run stats display
	displayStats();
	// Bind Character Tabs
  // $("#character").tabs({
  //     select: function(event, ui){
  //       window.location = ui.tab.href;
  //     }
  // });
	// Bind Statistics Tabs
	$(".calc-stats").tabs();
	// Bind SkillTips on all Skills
	$("#active-display, #passive-display").find("li img").each(function() {
		$(this).bindSkilltip();
	});
	// Bind CompareTo Change
	var compareSlot = $("#compared-slot"),
			compareTo = $("#compare-to");
	// Bind the calcDiff function when compareTo is changed
	compareTo.bind('change', function() {
		var itemSlot = $("#compared-slot").selectedOption().val(),
				newItem = $(this).selectedOption().data("json");
		calcDiff(stats, newItem, itemSlot);
	});
	// Change which slot we are comparing and ajax in the possibilities
	compareSlot.bind('change', function() {
		var itemType = $(this).val();
		recalc();
		$.ajax({
			url: '/item/fetch/type/' + itemType,
			cache: false,
			dataType: 'json',
			success: function(data) {
				// Clear out the List to avoid confusion
				compareTo.html("");
				// Add a "Nothing" option
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
	});
	// Change which slot we are simulating to replace
	var simSlot = $("#simulate-slot"),
			simItemType = false, 
			simAgainst = false, 
			simAgainstData = false,
			simAgainstDisplay = $("#simulate-stats"),
			simAttrs = $("#simulate-attributes"),
			simSliders = $("#simulate-sliders"),
			prevStats = false;
	$("#simulation-stats").hide();
	simSlot.bind('change', function() {
		recalc();
		simAttrs.val("");
		prevStats = jQuery.extend({}, stats);
		simAgainstData = false;
		simItemType = $(this).val(); 
		// simAgainst = false;
		// simAgainst = $("#equipped-" + simItemType + " a").clone(true);
		simAgainstData = $("#equipped-" + simItemType + " a").data('json');
		$.each(simAgainstData.attrs, function(k,v) {
			if(v == 0) {
				delete simAgainstData.attrs[k];
			}
			var existing = $("#simulate-stats ul.attrs input[name=" + k + "]");
			if(existing) {
				existing.val(v);
			}
		});
		// d3up.log($("#equipped-" + simItemType + " a").data('json'), simAgainstData, simItemType);
		// simAgainst.bindTooltip();
		// simAgainstDisplay.find(".top p").empty().append(simAgainst);
		var statsValue = simAgainstDisplay.find(".stats-primary .big-stat").empty(),
				statsValueHelper = simAgainstDisplay.find(".stats-primary .stat-helper").empty(),
				statsPercent = simAgainstDisplay.find(".stats-extra-percent").empty(),
				statsRange = simAgainstDisplay.find(".stats-extra-range").empty(),
				statsSockets = simAgainstDisplay.find("ul.sockets").empty();
		// if(simAgainstData.socket)
		if(simAgainstData.sockets) {
			for(i=0; i<simAgainstData.sockets.length; i++) {
				var select = $("<select class='sockets' name='socket"+i+"' style='width: 300px'><option value=''>None</option></select>"),
						effect = "unknown";
				$.each(gems, function(k,v) {
					var selected = false;
					if(simAgainstData.sockets[i] == k) {
						selected = true;
					}
					switch(simAgainstData.type) {
						case "spirit-stone":
						case "voodoo-mask":
						case "wizard-hat":
						case "helm":
							effectNum = 1;
							effect = v[1];						
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
							effectNum = 2;
							effect = v[2];							
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
							effectNum = 3;
							effect = v[3];
							break;						
						default:
							effectNum = 3;
							effect = v[3];
							break;
					}
					var option = $("<option value='" + k + "'>" + v[0] + " (" + effect + ")</option>");
					if(selected) {
						option.attr("selected", "selected");
					}
					select.append(option);
				});
				select.bind('change', function() {
					simAgainstData.socketAttrs = {};
					simAgainstDisplay.find('select.sockets').each(function(k,v) {
						if(gemEffect[$(this).val()]) {
							var newEffect = gemEffect[$(this).val()][effectNum];
							if(simAgainstData.socketAttrs[newEffect[0]]) {
								simAgainstData.socketAttrs[newEffect[0]] += newEffect[1];
							} else {
								simAgainstData.socketAttrs[newEffect[0]] = newEffect[1];							
							}
						}
					});
					// Init the Calc
					calc.init();
					// Setup the Class for the Calculator
					calc.setClass($("#character").data('class'));
					calc.setParagonLevel($("#paragon-level").text());
					// Pass in which gear we are calculating
						$(".equipped a").each(function() {
		var slot = $(this).parent().data("slot"),		// Get the slot this gear is in
				data = $(this).data("json");						// Get the JSON for this gear
		calc.setItem(slot, data);
	});

					// Pass in the Passives we're using
					calc.setPassives(activePassiveSkills);
					// Remove Item in Slot
					calc.removeItem(simItemType);
					// Add in the fake item
					calc.parseItem(simAgainstData, simItemType);
					stats = calc.run();
					calcDiff(prevStats, simAgainstData, simItemType, true);
					displayStats();
				});
				statsSockets.append($("<li>").html(select));
			}
		}
		// if(simAgainstData.socketAttrs) {
		// 	$.each(simAgainstData.socketAttrs, function(k,v) {
		// 		
		// 	});
		// }
		if(simAgainstData.stats) {			
			$.each(simAgainstData.stats, function(k,v) {
				var input = $("<input name='" + k + "' type='text'/>");
				input.val(v);
				switch(k) {
					case "armor":
						statsValue.html(input);
						statsValueHelper.html("Total Armor");
						break;
					case "block-amount":
						var i1 = $("<input name='" + k + "-min' type='text'/>"),
								i2 = $("<input name='" + k + "-max' type='text'/>");
						i1.val(v.min);
						i2.val(v.max);
						statsRange.append(i1, "-", i2).append(" Block Amount");
						break;
					case "block-chance":
						statsPercent.html(input).append(" Block Chance");
						break;
					case "dps":
						statsValue.html("<span id='simulated-dps'>" + v + "</span>");
						statsValueHelper.html("Damage Per Second");
						break;
					case "speed":
						statsPercent.html(input).append(" Attack Speed");
						break;
					case "damage":
						var di1 = $("<input name='" + k + "-min' type='text'/>"),
								di2 = $("<input name='" + k + "-max' type='text'/>");
						di1.val(v.min);
						di2.val(v.max);
						function reSim() {
							switch($(this).attr("name")) {
								case "damage-min":
									simAgainstData.stats.damage.min = ($(this).val()) ? parseFloat($(this).val()) : 0;
									break;
								case "damage-max":
									simAgainstData.stats.damage.max = ($(this).val()) ? parseFloat($(this).val()) : 0;
									break;
								default:
									// d3up.log($(this));
									return false;
									break;
							}
							var simDps = (simAgainstData.stats.damage.min + simAgainstData.stats.damage.max) / 2 * simAgainstData.stats.speed;
							$("#simulated-dps").html(Math.round(simDps * 10) / 10);
							// Init the Calc
							calc.init();
							// Setup the Class for the Calculator
							calc.setClass($("#character").data('class'));
							calc.setParagonLevel($("#paragon-level").text());
							// Pass in which gear we are calculating
								$(".equipped a").each(function() {
		var slot = $(this).parent().data("slot"),		// Get the slot this gear is in
				data = $(this).data("json");						// Get the JSON for this gear
		calc.setItem(slot, data);
	});

							// Pass in the Passives we're using
							calc.setPassives(activePassiveSkills);
							// Remove Item in Slot
							calc.removeItem(simItemType);
							// Add in the fake item
							calc.parseItem(simAgainstData, simItemType);
							stats = calc.run();
							calcDiff(prevStats, simAgainstData, simItemType, true);
							displayStats();
							return false;
						}
						di1.bind('keyup', reSim);
						di2.bind('keyup', reSim);
						statsRange.append(di1, "-", di2).append(" Damage");
						break;
					default: 
						// d3up.log(k,v);
						break;
				}
				input.bind('keyup', function() {
					switch(k) {
						case "block-chance":
							simAgainstData.stats[$(this).attr("name")] = ($(this).val()) ? parseFloat($(this).val()): 0;
							break;
						default:
							simAgainstData.stats[$(this).attr("name")] = ($(this).val()) ? parseFloat($(this).val()) : 0;
							if(k == 'speed') {
								var simDps = (simAgainstData.stats.damage.min + simAgainstData.stats.damage.max) / 2 * simAgainstData.stats.speed;
								$("#simulated-dps").html(Math.round(simDps * 10) / 10);
							}
							break;
					}
					// Init the Calc
					calc.init();
					// Setup the Class for the Calculator
					calc.setClass($("#character").data('class'));
					calc.setParagonLevel($("#paragon-level").text());
					// Pass in which gear we are calculating
						$(".equipped a").each(function() {
		var slot = $(this).parent().data("slot"),		// Get the slot this gear is in
				data = $(this).data("json");						// Get the JSON for this gear
		calc.setItem(slot, data);
	});

					// Pass in the Passives we're using
					calc.setPassives(activePassiveSkills);
					// Remove Item in Slot
					calc.removeItem(simItemType);
					// Add in the fake item
					calc.parseItem(simAgainstData, simItemType);
					stats = calc.run();
					calcDiff(prevStats, simAgainstData, simItemType, true);
					displayStats();
				});
			});
		}
		if(simAgainstData.attrs) {
			$.each(simAgainstData.attrs, function(k,v) {
				simAttrs.find("option[value=" + k + "]").attr("selected", "selected");
			});			
		}
		$("#simulate-stats ul.stats").empty();
		simAttrs.trigger("liszt:updated");
		simAttrs.trigger("change");
		$("#simulation-stats").show();
	});
	simAttrs.bind('change', function() {
		var attrs = $(this).val(),
				elements = $("#simulate-stats ul.attrs");
		// Add new Elements to the Item for Editing
		if(attrs) {
			$.each(attrs, function(k,v) {
				if(v != "") {
					var exists = elements.find("." + v);
					if(td[v] && !exists.length) {
						var val = (simAgainstData.attrs[v]) ? simAgainstData.attrs[v] : 0;
						// Hacky solution for minmax... will be better in new version
						if(typeof(val) == 'object') {
							val = val.min + "-" + val.max;
						}
						var	attr = $("<li></li>"),
								label = td[v],
								input = "<input type='text' name='" + v + "' value='" + val + "' tabindex='100'/>";
						label = label.replace("VVV", input);
						attr.append(label);
						attr.find("input").bind("keyup", function() {
							// Set the Simulated Data Attribute Value
							if(_.indexOf(['minmax-damage', 'arcane-damage', 'cold-damage', 'fire-damage', 'holy-damage', 'lightning-damage', 'poison-damage'], v) >= 0) {
								var parts = $(this).val().split("-");
								simAgainstData.attrs[$(this).attr("name")].min = parts[0];
								simAgainstData.attrs[$(this).attr("name")].max = parts[1];
							} else {
								simAgainstData.attrs[$(this).attr("name")] = ($(this).val()) ? $(this).val() : 0;								
							}
							// Init the Calc
							calc.init();
							// Setup the Class for the Calculator
							calc.setClass($("#character").data('class'));
							calc.setParagonLevel($("#paragon-level").text());
							// Pass in which gear we are calculating
								$(".equipped a").each(function() {
		var slot = $(this).parent().data("slot"),		// Get the slot this gear is in
				data = $(this).data("json");						// Get the JSON for this gear
		calc.setItem(slot, data);
	});

							// Pass in the Passives we're using
							calc.setPassives(activePassiveSkills);
							// Remove Item in Slot
							calc.removeItem(simItemType);
							calc.parseItem(simAgainstData, simItemType);
							stats = calc.run();
							// d3up.log(simAgainstData, prevStats);
							calcDiff(prevStats, simAgainstData, simItemType, true);
							displayStats();
							// d3up.log(stats, newStats, simItemType);
							// calcDiff(stats, newStats, simItemType);
							// recalc();
						});
						attr.addClass(v);
						elements.append(attr);
					} 				
				}
			});			
		}
		// Remove deleted elements from the Item
		elements.find("li").each(function() {
			if(!attrs || attrs.indexOf($(this).attr("class")) == -1) {
				simAgainstData.attrs[$(this).attr("class")] = 0;
				// Init the Calc
				calc.init();
				// Setup the Class for the Calculator
				calc.setClass($("#character").data('class'));
				calc.setParagonLevel($("#paragon-level").text());
				// Pass in which gear we are calculating
					$(".equipped a").each(function() {
		var slot = $(this).parent().data("slot"),		// Get the slot this gear is in
				data = $(this).data("json");						// Get the JSON for this gear
		calc.setItem(slot, data);
	});

				// Pass in the Passives we're using
				calc.setPassives(activePassiveSkills);
				// Remove Item in Slot
				calc.removeItem(simItemType);
				calc.parseItem(simAgainstData, simItemType);
				stats = calc.run();
				calcDiff(prevStats, simAgainstData, simItemType, true);
				displayStats();
				$(this).remove();
			}
		});
	});
	simAttrs.chosen();
	function calcDiff(currentStats, newItem, slot, hideHelpers) {
		var oldStats = jQuery.extend({}, currentStats),
				oldItem = calc.getItem(slot),	// Store the Old Item
				oldItemOH = null,							// Storage for OH if we need it
				notices = [];
		calc.init();
		// Setup the Class for the Calculator
		calc.setClass($("#character").data('class'));
		calc.setParagonLevel($("#paragon-level").text());
		// Pass in which gear we are calculating
			$(".equipped a").each(function() {
		var slot = $(this).parent().data("slot"),		// Get the slot this gear is in
				data = $(this).data("json");						// Get the JSON for this gear
		calc.setItem(slot, data);
	});

		// Pass in the Passives we're using
		calc.setPassives(activePassiveSkills);
		// Remove Item in Slot
		calc.removeItem(slot);
		// Should we automatically unequip the OH if it exists (since we're trying to use a 2h?)
		switch(newItem.type) {
			case '2h-mace': 
			case '2h-axe': 
			case 'daibo': 
			case '2h-mighty': 
			case 'polearm': 
			case 'staff': 
			case '2h-sword': 
				// Ensure we're using an OH atm
				if($("#equipped-offhand a").length) {
					oldItemOH = JSON.parse($("#equipped-offhand a").attr("data-json"));
					calc.removeItem("offhand");
					notices.push("We notice you're comparing a two-handed weapon vs your currently equipped mainhand + off-hand items. We've adjusted the comparision slightly so you can see the actual stats between your mainhand + offhand VS the two-hander (without the offhand).");					
				}
				break;
		}
		// Add the new item
		calc.parseItem(newItem, slot);
		// Get new stats
		var newStats = calc.run();
		// calculate the diff
		var diff = calc.diff(oldStats, newStats);
		// Debug the Diff
		// d3up.log(calc.diff(oldStats, newStats));
		$(".compare-diff").empty();
		if(!hideHelpers) {
			var h4 = $("<h4>Comparision Results</h4>").css({margin: 0}),
					oldLabel = $("<p/>").append("Old Item: ", calc.getItemLink(oldItem)),
					newLabel = $("<p/>").append("New Item: ", calc.getItemLink(newItem));
			if(oldItemOH) {
				oldLabel.append(" + Offhand: ", calc.getItemLink(oldItemOH));
			}			
		}
		$(".compare-diff").append(h4, oldLabel, newLabel);
		// Do we need to add any notices?
		$("#compare-notes").html("");
		if(notices.length > 0) {
			$.each(notices, function(k,v) {
				$("#compare-notes").append(v);
			});
		}
		var table = $("<table/>");
				header = $("<tr/>").append("<th>Stat</th><th>Diff</th><th>Old</th><th>New</th>");
		table.append(header);
		$.each(diff, function(k,v) {
			var data = v.split("|"),
					diffVal = data[1],
					diffName = data[0],
					row = $("<tr/>");
			row.append($("<td/>").html(diffName));
			var oldStat = Math.round(oldStats[k] * 100) / 100,
					newStat = Math.round(newStats[k] * 100) / 100;
			if(oldStat > 99999) {
				oldStat = Math.round(oldStat / 10) / 100 + "k";
			}
			if(newStat > 99999) {
				newStat = Math.round(newStat / 10) / 100 + "k";
			}
			if(diffVal > 0) {
				row.append($("<td/>").html("+"+diffVal).addClass("pos"));
				row.append($("<td class='neg'/>").html(oldStat));
				row.append($("<td class='pos'/>").html(newStat));				
			} else {
				row.append($("<td/>").html(diffVal).addClass("neg"));
				row.append($("<td class='pos'/>").html(oldStat));
				row.append($("<td class='neg'/>").html(newStat));				
			}
			table.append(row);
		});
		table.append("<tr><td colspan='10'><span class='pos'>Green = Increase</span> / <span class='neg'>Red = Decrease</span></td></tr>");
		// } else {
		// 	table.append("<tr><td colspan='10' style='text-align: center; font-weight: bold;'>These items are identical.</td></tr>");
		// }
		// items.find("div a").each(function() {
		// 	$(this).bindTooltip();
		// });			
		$(".compare-diff").append(table);
		calc.removeItem(slot);
		calc.parseItem(oldItem, slot);
		// return diff['mod'];
	}
	recalc();
	// Vote button logic
	var upvote = $("#button-upvote"),
			downvote = $("#button-downvote");
	if(isLoggedIn) {
		upvote.attr("data-tooltip", "Do you find this build useful or just simply awesome? Give them an upvote!");
		downvote.attr("data-tooltip", "Is this build not useful at all or full of made-up things? Feel free to downvote.");
		switch(voted) {
			case "up":
				upvote.removeClass('ui-state-disabled');			
				break;
			case "down":
				downvote.removeClass('ui-state-disabled');			
				break;
		}
		upvote.click(function() {
			castVote('up');
		});
		downvote.click(function() {
			castVote('down');
		});
		function castVote(how) {
			$.ajax({
				url: '?vote=' + how
			});
			var change = 0;
			if(how == 'up') {
				if(upvote.hasClass('ui-state-disabled')) {
					if(!downvote.hasClass('ui-state-disabled')) {
						change = 2;
					} else {
						change = 1;
					}
				} else {
					change = -1;
				}
				upvote.toggleClass('ui-state-disabled');				
				downvote.addClass('ui-state-disabled');
			} else {
				if(downvote.hasClass('ui-state-disabled')) {
					if(!upvote.hasClass('ui-state-disabled')) {
						change = -2;
					} else {
						change = -1;
					}
				} else {
					change = 1;
				}			
				upvote.addClass('ui-state-disabled');
				downvote.toggleClass('ui-state-disabled');
			}
			$("#vote-count").html(parseInt($("#vote-count").text(), 10) + change).attr("data-count", change);
		}		
	}
	upvote.bindSkilltip();
	downvote.bindSkilltip();
	// Manual Save button
	var saveStatsButton = $(".saveStats");
	saveStatsButton.attr("data-name", "Manual Stats Save");
	saveStatsButton.attr("data-tooltip", "Manually save the stats from the right (stats) panel of your build to the database.<br/><br/>This happens automatically on a skill change or item change, but if for some reason you're stats aren't updating, hit this.");
	saveStatsButton.bindSkilltip();
	saveStatsButton.click(function() {
		$.ajax({
			data: {
				a: 'skills',
				actives: activeActives,
				passives: activePassives,
				stats: {
					dps: stats.dps,
					ehp: stats.ehp
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
});