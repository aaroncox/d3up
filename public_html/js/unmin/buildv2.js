/*
  window.D3Up
    Builds: object (key = descriptive key: 'default', 'skill-wrath-of-the-berskerer', 'skill-warcry~e')
      Skills: object (key = slug of skill name)
        name: json (containing SAME or )
      Gear: object (key = slot name)
        slot: json
    Calculator
*/

(function( d3up ) {
  function Build(data) {
  	return this.init(data);
  }
  Build.prototype = {
    slots: ['helm', 'shoulders', 'amulet', 'chest', 'gloves', 'bracers', 'belt', 'pants', 'ring1', 'ring2', 'boots', 'mainhand', 'offhand'],
    elems: {},
		skillElems: {},
		skillCatalog: {},
    iconmappings: {
      'blackhole' : 'x1_wizard_wormhole',
      'dominance' : 'x1_wizard_passive_arcaneaegis'
    },
    init: function(data) {
      this.calc = new d3up.BuildCalculator;
			this.builder = new d3up.ItemBuilder;
      this.heroClass = false;
      this.gear = {};
      this.skills = {
        actives: {},
        passives: {},
        enabled: {},
        misc: {}
      };
      this.stats = {};
      // Set Defaults
      if(data) {
        if(data.meta) {
          this.setMeta(data.meta);
        }   
        if(data.gear) {
          this.setGear(data.gear);
        }
        if(data.skills) {
          this.setSkills(data.skills);
        }     
      }
    }, 
    run: function() {
			this.calc.setBuild(this)
      this.stats = this.calc.run();
    },
    renderAgain: function() {
      var build = this;
			// Reset the Gains by Stats Inputs
			$(".pt-adjustor").val("1");
      // Reset the Calculator with our new Build
      this.calc.setBuild(this);
      // Run the new Stats
      this.stats = this.calc.run();
      // Loop through all Elements previously used and re-render
      $.each(this.elems, function(k,v) {
        build.renderTo(v);
      });
      // Loop through all Skill Elements previously used and re-render
      $.each(this.skillElems, function(k,v) {
        build.renderSkillsTo(v);
      });
      // Loop through the Skill Catalog used and re-render
      $.each(this.skillCatalog, function(k,v) {
        build.renderSkillCatalog(v);
      });
    },
    renderTo: function(elem) {
      // If we've called render before run, then run it before the render
      if($.isEmptyObject(this.stats)) {
        this.run();
      }
      var build = this;
      this.elems[elem.selector] = elem;
      elem.find("*[data-value]").each(function() {
				var stat = $(this).empty(),
        		id = stat.data("value"),
            value = build.stats[id],
            type = stat.data("display"),
            suffix = "",
            prefix = "";
        if(type) {
          switch(type) {
            case "percent":
              suffix = "%";
              break;
            case "dps-heat":
              // $("#gear-" + v).html(val + "<br/>(" + (Math.round(tPer * 1000) / 10) + "%)");
              stat.append($("<p>").append(Math.round(value / build.stats['dps-gear-total'] * 1000) / 10, "%"));
              stat.css("color", $.Color( "#750" ).transition($.Color( "#f50" ), ((value / build.stats['dps']) * 8))); 
              break;
            case "ehp-heat":
              // $("#gear-" + v).html(val + "<br/>(" + (Math.round(tPer * 1000) / 10) + "%)");
              // console.log(value, build.stats['ehp'], (value / build.stats['ehp']), "" + $.Color( "#570" ).transition($.Color( "#5F0" ), ((value / build.stats['ehp']) * 6)));
              // console.log(build.stats['ehp-gear-total']);
              stat.append($("<p>").append(Math.round(value / build.stats['ehp-gear-total'] * 1000) / 10, "%"));
              stat.css("color", $.Color( "#570" ).transition($.Color( "#5F0" ), ((value / build.stats['ehp']) * 4))); 
              break;
            case "round-1":
              value = Math.round(value * 10) / 10;
              break;
            default:
              // console.log("Unknown Formatter: " + type);
              break;
          }
        }
				var hiddenVals = ['sharpshooter-dps', 'dps-demon', 'tdps', 'tdps-elites', 'tdps-demon', 'dps-demon-elite', 'tdps-demon-elite', 'tickRate-mh', 'tickRate-oh', 'dps-elites', 'scram-a-mh', 'scram-a-oh', '3sec-dps'];
				if(id == 'dps-speed-display' || id  == 'hp-ehp-ratio') {
					stat.prepend(prefix + value + suffix);
				} else if(_.indexOf(hiddenVals, id) >= 0 && parseFloat(value)) { 
					stat.parent().show();
					value = Math.round(value * 100) / 100;
          value = value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");          
          if(id == 'tickRate') {
            suffix = " ticks/sec";
          }
					stat.prepend(prefix + value + suffix);
				} else if(type == 'long-round') {
					if(typeof(value) == 'undefined') {
						value = 0;
					} 
					value = Math.round(value * 10000) / 10000;
					// console.log("long");
          stat.prepend(prefix + value + suffix);					
				} else {
	        if(isNaN(parseFloat(value)) && value) {
						stat.prepend(prefix + value + suffix);
					} else if(value) {
						if(stat.data("multiply")) {
							value = value * 100;
						}
	          value = Math.round(value * 100) / 100;
	          value = value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");          
	          stat.prepend(prefix + value + suffix);
	        } else {
	          stat.prepend(prefix + "0" + suffix);
	        }					
				}
      });
			this.renderItems(elem);
    },
		renderItems: function(elem) {
			var build = this;
			elem.find("*[data-display-item]").each(function() {
				var slot = $(this).data('display-item'),
						item = build.gear[slot];
				$(this).html(build.calc.getItemLink(item));
			});
		},
		renderSkillCatalog: function(elem) {
      // If we've called render before run, then run it before the render
      if(!this.stats.strength) {
        this.run();
      }
      this.skillCatalog[elem.selector] = elem;
      var build = this,
          compare = d3up.buildCompare,
          elements = elem.find("*[data-skill-type]");
			elements.each(function() {
				// Remove Existing Elements
        $(this).empty();
        
				var table = $(this), 
						res = "Res";
				switch(build.meta.heroClass) {
					case "barbarian":
						res = "Fury";
						break;
					case "demon-hunter":
						res = "Hatred";
						break;
					case "monk":
						res = "Spirit";
						break;
				}
				table.prepend("<tr><th>Skill</th><th>DPS</th><th>Life/Sec</th><th>" + res + "/Sec</th></tr>");
				_.each(build.stats.allSkillData, function(v,k) {
					if(v.dps) {
						// d3up.log(v);
						var skill = d3up.gameData.actives[build.meta.heroClass][k],
								name = $("<td>").append(skill.name),
								dps = $("<td>").append(v.dps.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")),
								lps = $("<td>").append(Math.round(v['lps-average'] * 10) / 10),
								rps = $("<td>").append(" "),
								row = $("<tr>").append(name, dps, lps, rps);
						_.each(v.rps, function(v, i) {
							rps.append(Math.round(v * 10) / 10);
						});
						table.append(row);						
					}
				}, this);
			});
		},
    renderSkillsTo: function(elem) {
      // If we've called render before run, then run it before the render
      if(!this.stats.strength) {
        this.run();
      }
      this.skillElems[elem.selector] = elem;
      var build = this,
          compare = d3up.buildCompare,
          elements = elem.find("*[data-skill-type]");
      elements.each(function() {
        var $this = $(this),
            type = $(this).data("skill-type"), 
            display = $(this).data("display"),
            icon = false,
            name = false, 
						unordered = build.skills[type],
						ordered = {};
				if(type == "misc-buffs") {
					ordered = {};
					$.each(['misc-buffs'], function(k, v) {
						var buffs = d3up.gameData.actives[v];
						$.each(buffs, function(idx, skill) {
							if(skill.effect) {
								ordered[idx] = {
									slug: idx,
									isBuff: true,
									data: d3up.gameData.actives[v][idx]
								};														
							}
						});
						// console.log(v, ordered);
					});
				} else if(type == "group-buffs") {
					ordered = {};
					var skills = d3up.gameData.actives;
					$.each(skills, function(heroClass, data) {
					  $.each(data, function(idx, skill) {
					    if(skill.groupBuff && skill.groupBuff == true) {
                ordered[idx] = {
                  slug: idx, 
                  isBuff: true,
                  data: skill,
                  heroClass: heroClass,
                };
					    }
					  });
					});
				} else {
					$.each(unordered, function(slug, data) {
						if(data) {
							ordered[data.order] = {
								slug: slug,
								data: data
							};							
						}
					});					
				}
        // Remove Existing Elements
        $(this).empty();
        // Loop through selected Skills and Render
        $.each(ordered, function(idx, skill) {
					var slug = skill.slug,
							data = skill.data, 
							heroClass = skill.heroClass,
							isBuff = false;
					if(skill.isBuff) {
						isBuff = true
					}
          if(!data) {
            return null;
          }
          switch(display) {
            case "icon":
              var li = $("<li>"),
                  cleaned = slug.split("~"),
                  iconName = cleaned[0].replace(/-/i, ''),
                  baseUrl = 'http://media.blizzard.com/d3/icons/skills/64/',
                  icon = $("<img class='skill-icon'>");
              if(build.iconmappings[iconName]) {
                icon.attr("src", baseUrl + build.iconmappings[iconName] + ".png");
              } else {
                if(type == 'passives') {
                  iconName = 'passive_' + iconName;
                }
                icon.attr("src", baseUrl + build.meta.heroClass + "_" + iconName + ".png");
              }
              icon.attr('data-tooltip', data.desc),
              icon.attr('data-name', data.name);
              icon.attr('data-skill', slug);
							var checkbox = $(".skill-activate[data-skill='" + slug + "']");
							if((d3up.builds['build'].stats.skillData[slug] && d3up.builds['build'].stats.skillData[slug].activate)) {
                icon.addClass("activatable");
              }
							if(d3up.builds['build'].skills.enabled[slug]) {
                icon.addClass("skill-activated");                  
							}
              icon.click(function() {
								if((d3up.builds['build'].stats.skillData[slug] && d3up.builds['build'].stats.skillData[slug].activate)) {
									if(d3up.builds['build'].skills.enabled[slug]) {
                    checkbox.removeAttr("checked");
                  } else {
                    checkbox.attr("checked", "checked");
                  }
                  checkbox.trigger("change");
                }
              });
              if(!data.name) {
                icon.attr('data-name', slug.replace(/\-/g, " ").capitalize());
              }
              if(data.rune) {
                icon.attr('data-tooltip', data.desc.replace(/  /, "<br/><br/>") + "<br/><br/>" + data.rune);
              }
              icon.bindSkilltip();
              li.append(icon);
              $this.append(li);
              break;
            case "table-row":
              var skillName = data.name,
                  cleaned = slug.split("~"),
                  h3 = $("<h3>").html(skillName),
                  skillIcon = $("#build-header").find("img[data-skill='" + slug + "']"),
                  tr = $("<tr class='skill-calc-row' data-id='" + slug + "'>"),
                  td = $("<td colspan='2'>"),
                  control = $("<div class='control'></div>");
              if(!skillName) {
                skillName = slug.replace(/\-/g, " ").capitalize();
                h3.html(skillName);
              }
          		if(data.effect) {
          		  var select = $("<select class='skill-stacks' data-skill='" + slug + "'>").hide(),
										stacks = data.stacks,
          		      checkbox = $("<input type='checkbox' class='skill-activate' data-skill='" + slug + "' data-stacks='" + stacks + "'>"),
      					    skill = build.stats.skillData[slug];
								if(!stacks) {
									stacks = 1;
									if(data.effect.stackable && data.effect.stackable.limit) {
										stacks = data.effect.stackable.limit;
									}
								}
								if(d3up.builds['build'].skills.enabled[slug]) {
									skillIcon.addClass("skill-activated");
									checkbox.attr("checked", "checked");
								} else {
									skillIcon.removeClass("skill-activated");
									checkbox.removeAttr("checked");
								}
								// console.log(stacks);
								// console.log(skillName, isBuff, skill);
      					if(isBuff || (skill && skill.activate)) {
          				td.append(control);
          			}
								
          			if(skill && skill.stackable) {
          				select.show();
          				if(select.find("option").length == 0) {
            				for(i = skill.stackable; i >= 1; i--) {
            				  var option = $("<option value='" + i + "'>").html(i + " Stacks");
											if(data.effect.stackable.labels) {
												option.html(data.effect.stackable.labels[i]);
											}
											if(stacks == i) {
												// console.log("selecting #" + i, stacks);
												option.attr("selected", "selected");
											}
            				  select.append(option);
            				}				  
          				}
          				// Set the Default
          				checkbox.attr("data-stacks", stacks);
                  // if(heroClass) {
                  // }
          			}
        				checkbox.attr("data-skill-class", heroClass);          				  
                // if(build.stats.skillData[slug] && build.stats.skillData[slug].activate) {
                // 
                // }
                // checkbox.click(function() {
                  // tr.toggleClass("skill-activated");
                // });
                // select.bind('change', function() {
                  //  checkbox.attr("data-stacks", $(this).val());
                // });
                checkbox.bind('change', function() {
                  var name = $(this).attr('data-skill'), 
											stacks = $(this).attr('data-stacks'),
                      type = $(this).closest("table").data("skill-type");
									// console.log(typeof(stacks));
									if(stacks == "undefined") {
										stacks = 1;
									}
                  if(type == 'group-buffs') {
                    type = $(this).attr("data-skill-class");
                  }
                  if(!d3up.builds['build'].skills.enabled[name]) {
                    skillIcon.addClass("skill-activated");
                    tr.addClass("skill-activated");
                    $.each(d3up.builds, function(k) {
											if(!isBuff) {
		                    d3up.builds[k].skills.enabled[name] = build.skills[type][name];                      												
											} else {
	                      d3up.builds[k].skills.enabled[name] = d3up.gameData.actives[type][name];                      												
											}
                      // console.log("applying [" + name + "] to build id#" + k);
                      // console.log("enabled", d3up.builds[k].skills.enabled, $(this));
                      if(stacks) {
                        // console.log("adding stacks (" + stacks + ") to build id#" + k);
                        d3up.builds[k].skills.enabled[name].stacks = stacks;
                      }
                    });
                  } else {
                    skillIcon.removeClass("skill-activated");
                    tr.removeClass("skill-activated");
                    $.each(d3up.builds, function(k) {
                      // console.log("removing [" + name + "] from build id#" + k);
                      delete d3up.builds[k].skills.enabled[name];
                      // console.log("enabled", d3up.builds[k].skills.enabled);
                    });
                  }
                  // Update any Compare's that might be active...
                  $(".compare-change").trigger("change");
									$(".simulate-change").trigger("change");
                  $.each(d3up.builds, function(k) {
                    d3up.builds[k].renderAgain();
                    // console.log(k, d3up.builds[k]);
                  });
                });
                select.bind('change', function() {
									var stacks = $(this).val()
                  checkbox.attr("data-stacks", stacks);
                  $.each(d3up.builds, function(k) {
										if(d3up.builds[k].skills.enabled[slug]) {
											d3up.builds[k].skills.enabled[slug].stacks = stacks; 										
	                    d3up.builds[k].renderAgain();											
										}
                  });
                  // checkbox.trigger('change');
                });
      					control.append("Activate ", checkbox, select);					
      				}
							if(!isBuff || (isBuff && heroClass)) {
							  var cls = build.meta.heroClass
                    cleaned = slug.split("~"),
                    iconName = cleaned[0].replace(/-/i, ''),
                    baseUrl = 'http://media.blizzard.com/d3/icons/skills/64/',
                    icon = $("<img class='skill-icon'>");
                if(build.iconmappings[iconName]) {
                  icon.attr("src", baseUrl + build.iconmappings[iconName] + ".png");
                } else {
                  if(type == 'passives') {
                    iconName = 'passive_' + iconName;
                  }
                  icon.attr("src", baseUrl + build.meta.heroClass + "_" + iconName + ".png");
                };
								icon.attr('data-tooltip', data.desc);
								icon.attr('data-name', data.name);
								if(data.rune) {
									icon.attr('data-tooltip', data.desc.replace(/  /, "<br/><br/>") + "<br/><br/>" + data.rune);
								}
								h3.attr('data-tooltip', data.desc);
								h3.attr('data-name', data.name);
								if(data.rune) {
									h3.attr('data-tooltip', data.desc.replace(/  /, "<br/><br/>") + "<br/><br/>" + data.rune);
								}
								icon.bindSkilltip();
								h3.bindSkilltip();
	              h3.prepend(icon);								
							}
              td.prepend(h3);
              tr.append(td);
              $this.append(tr);
							if(build.stats.skillData[slug]) {
								var skillTable = $("<table class='statistics-table skill-data-table'>"),
										effectTable = $("<table class='statistics-table skill-effect-table'>");
								$.each(build.stats.skillData[slug], function(s,v) {
									skillTable.append(build.renderSkillData(s,v));
								});
								if(build.skills.actives[slug]) {
									if(build.skills.actives[slug].effect) {
										$.each(build.skills.actives[slug].effect, function(k,v) {
											effectTable.append(build.renderEffectData(k, v));																					
										});
									}
									if(build.skills.actives[slug].procRate) {
										effectTable.append(build.renderEffectData('procRate', Math.round(build.skills.actives[slug].procRate * 1000) / 10));																					
									}
									if(build.skills.actives[slug].monkHaste) {
										effectTable.append(build.renderEffectData('monkHaste', Math.round(build.skills.actives[slug].monkHaste * 1000) / 10));	
									}
								}
								$this.append($("<tr>").append($("<td>").append(skillTable), $("<td>").append(effectTable)));
							}
							if(build.skills.passives[slug]) {
								$this.append($("<tr>").append($("<td colspan='2' class='skill-description'>").append(build.skills.passives[slug].desc)));
							}
							if(d3up.gameData.actives['misc-buffs'][slug]) {
								$this.append($("<tr>").append($("<td colspan='2' class='skill-description'>").append(d3up.gameData.actives['misc-buffs'][slug].desc)));
							}
              break;
            default:
              // console.log("Unhandled Display Type: " + display);
              break;
          }
        });
      });
    },
		renderSkillData: function(s,i) {
			var row = $("<tr>"), 
					label = false,
					value = false;
			switch(s) {
			  case "per-tick-norm":
					label = "Per Tick";
					value = i;
			    break;
			  case "per-tick-crit":
					label = "Critical Per Tick";
					value = i;
			    break;
			  case "total-damage-norm":
					label = "Total Damage";
					value = i;
			    break;
			  case "total-damage-crit":
					label = "Critical Damage Total";
					value = i;
			    break;
				case "3rd-hit":
					label = "Average 3rd Hit";
					value = i;
					break;						
				case "critical-hit-2nd":
					label = "2nd Pierce Critical Hit";
					value = i;
					break;						
				case "critical-hit-3rd":
					label = "3rd Pierce Critical Hit";
					value = i;
					break;						
				case "per-tick":
					label = "DPS";
					value = i;
					break;
				case "total-damage":
					label = "Total Damage/Cast";
					value = i;
					break;
				case "average-hit":
					label = "Average Hit";
					value = i;
					break;
				case "damage-tick":
					label = "Damage per Tick";
					value = i;
					break;
				case "damage":
					label = "Damage Range";
					html = this.abbreviate(i[0], 2, 1) + " - " + this.abbreviate(i[1], 2, 2);
					break;
				case "damage-2nd":
					label = "2nd Pierce Hit";
					html = this.abbreviate(i[0], 2, 1) + " - " + this.abbreviate(i[1], 2, 2);
					break;
				case "damage-3rd":
					label = "3rd Pierce Hit";
					html = this.abbreviate(i[0], 2, 1) + " - " + this.abbreviate(i[1], 2, 2);
					break;
				case "dps":
					label = "DPS";
					value = i;
					break;
				case "critical-hit":
					label = "Critical Hit";
					html = this.abbreviate(i[0], 2, 1) + " - " + this.abbreviate(i[1], 2, 2);
					break;
				case "bnSkillDamage":
					if(i > 0) {
						label = "Gear Bonus";
						html = "<span class='skill-highlight'>+" + i + "%</span> Damage";						
					}
					break;
				case "bnDuration":
					if(i > 0) {
						label = "Duration Bonus";
						html = "<span class='skill-highlight'>+" + i + "</span> Second(s)";						
					}
					break;
				case "bnCriticalHit":
					if(i > 0) {
						label = "Critical Hit Bonus";
						html = "<span class='skill-highlight'>+" + i + "%</span> Crit";
					}
					break;
				case "cast-duration":
					if(i > 0) {
						label = "Cast Duration";
						html = i + " Seconds";						
					}
					break;
				case "bnSkillExtra":
					if(i > 0) {
						label = "Gear Bonus";
						value = i;						
					}
					break;
				case "critical-hit-tick":
					label = "Per Tick Crit";
					value = i;
					break;
				case "average-life-steal":
					label = "Life Steal/Hit Avg";
					value = i;
					break;
				case "average-life-hit":
					label = "Life on Hit/Hit Avg";
					value = i;
					break;
				case "lps-average":
					label = "Life/Sec";
					value = i;
					break;
				case "rps":
					_.each(i, function(v,k) {
						switch(k) {
							case "ap":
								// row.append($("<td colspan='2'>").html(v));
								// return row;							
								label = "AP/Crit/Sec";
								value = v;
								break;
							case "fury":
								label = "Fury Generation";
								html = v + " fury/sec";
								break;
							case "spirit":
								label = "Spirit Generation";
								html = v + " spirit/sec";
								break;
							case "hatred":
								label = "Hatred Generation";
								html = v + " hatred/sec";
								break;
						}
					});
					break;
					default: 
						// d3up.log("Unknown Bonus: " + s);
						break;
			}
			if(label && value) {
				row.append($("<td>").html(label));
				row.append($("<td>").html(this.abbreviate(value, 1, 2)));
				return row;
			}
      if(label && html) {
        // console.log(label, html);
        row.append($("<td>").html(label));
        row.append($("<td>").html(html));
        return row;
      }
			return false;
		},
		renderEffectData: function(k, v) {
			var row = $("<tr>"), 
					effect = false,
					wrap = $("<span class='skill-highlight'>").append(v); 
			switch(k) {
				case "stackable":
					effect = "Each Stack: ";
					_.each(v, function(d,i) {
						if(this.builder.skillText[i] && wrap[0]) {
							wrap = $("<span class='skill-highlight'>").append(d); 
							effect += this.builder.skillText[i].replace("VVV", wrap[0].outerHTML);						
						} else {
		          // d3up.log("Unknown Effect: " + k);
						}
					}, this);
					break;
				default:
					if(this.builder.skillText[k] && wrap[0]) {
						effect = this.builder.skillText[k].replace("VVV", wrap[0].outerHTML);						
					} else {
            // d3up.log("Unknown Effect: " + k);
					}
					break;
			}
			if(effect) {
				row.append($("<td>").html(effect));
				return row;
			}
			return false;
			//  target.append($("<tr>").append(th));
			//  		  $.each(activeActivesData[k].effect, function(i,e) {
			//  		    var tr = $("<tr>"),
			//  		        td = $("<td colspan='10'>");
			//  		    if(itemBuilder.skillText[i]) {
			//  		      var value = "<span class='skill-highlight'>" + e + "</span>",
			//  		          desc = itemBuilder.skillText[i].replace("VVV", value);
			//    		    td.append(desc);
			//    		    tr.append(td);
			//    			  target.append(tr);			    
			//  		    } else {
			//  		      d3up.log("Unhandled Ability Effect: " + i);
			//  		    }
			//  		  });			  
			// }
			//      if(target.find('.statLabel').length == 0) {
			//        target.find('.skill-damage').hide();
			//      }
			//      if(target.text() != "") {
			//        target.show();
			//      }
			// });
		},
    diffWith: function(build) {
      // Compares this build to the build passed in
      return this.calc.diff(this.getStats(), build.getStats());
    },
    setGear: function(gear) {
      var build = this;
      $.each(gear, function(k,v) {
				if($.isPlainObject(v)) {
					var slot = k, 
							item = v;
				} else {
	        var $this = $(v);
	        var slot = $this.attr("data-slot"),
	            item = $.parseJSON($this.attr("data-json"));					
				}
        build.gear[slot] = item;
      });
    },
    setItem: function(slot, item) {
      this.gear[slot] = _.clone(item, true);
    },
		getItem: function(slot) {
			return _.clone(this.gear[slot], true);
		},
    setMeta: function(meta) {
      this.meta = meta;
    },
    setSkills: function(skills) {
      var build = this;
			build.skills['enabled'] = {};
      $.each(skills, function(type, data) {
				build.skills[type] = {};
				if(!data) {
					return false;
				}
        $.each(data, function(idx, slug) {
					if(slug) {
					  switch(type) {
	            case "passives":
	              build.skills[type][slug] = d3up.gameData.passives[build.meta.heroClass][slug];
								if(build.skills[type][slug]) {
									build.skills[type][slug].order = idx;									
								}
	              break;
	            case "actives":
	              build.skills[type][slug] = d3up.gameData.actives[build.meta.heroClass][slug];
								if(build.skills[type][slug]) {
									build.skills[type][slug].order = idx;									
								}
	              break;
	            default:
	              // console.log("Unknown Skills Type: " + type);
	              break;
	          }	
					}
        });
      });
    },
    getGear: function() {
      return this.gear;
    },
    getStats: function() {
      return this.stats;
    },
    getSkills: function() {
      return this.skills;
    },
    abbreviate: function(number, maxPlaces, forcePlaces, forceLetter) {
      number = Number(number);
      forceLetter = forceLetter || false;
      if(forceLetter !== false) {
        return Grid.utils.annotate(number, maxPlaces, forcePlaces, forceLetter);
      }
      var abbr;
      if(number >= 1e12) {
        abbr = 'T';
      }
      else if(number >= 1e9) {
        abbr = 'B';
      }
      else if(number >= 1e6) {
        abbr = 'M';
      }
      else if(number >= 1e3) {
        abbr = 'K';
      }
      else {
        abbr = '';
      }
      return this.annotate(number, maxPlaces, forcePlaces, abbr);
    },
    annotate: function(number, maxPlaces, forcePlaces, abbr) {
      // set places to false to not round
      var rounded = 0;
      switch(abbr) {
        case 'T':
          rounded = number / 1e12;
          break;
        case 'B':
          rounded = number / 1e9;
          break;
        case 'M':
          rounded = number / 1e6;
          break;
        case 'K':
          rounded = number / 1e3;
          break;
        case '':
          rounded = number;
          break;
      }
      if(maxPlaces !== false) {
        var test = new RegExp('\\.\\d{' + (maxPlaces + 1) + ',}$');
        if(test.test(('' + rounded))) {
          rounded = rounded.toFixed(maxPlaces);
        }
      }
      if(forcePlaces !== false) {
        rounded = Number(rounded).toFixed(forcePlaces);
      }
      return rounded + abbr;
    }

  }
  d3up.Build = Build;
})( d3up );