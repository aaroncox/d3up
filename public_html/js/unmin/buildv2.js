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
    init: function(data) {
      this.calc = new d3up.BuildCalculator;
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
      // Reset the Calculator with our new Build
      this.calc.setBuild(this);
      // Run the new Stats
      this.stats = this.calc.run();
      // Loop through all Elements previously used and re-render
      $.each(this.elems, function(k,v) {
        build.renderTo(v);
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
            default:
              // console.log("Unknown Formatter: " + type);
              break;
          }
        }
        if(isNaN(parseFloat(value)) && value) {
					stat.prepend(prefix + value + suffix);
				} else if(value) {
          value = Math.round(value * 100) / 100;
          value = value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");          
          stat.prepend(prefix + value + suffix);
        } else {
          stat.prepend(prefix + "0" + suffix);
        }
      });
    },
    renderSkillsTo: function(elem) {
      // If we've called render before run, then run it before the render
      if(!this.stats.strength) {
        this.run();
      }
      var build = this,
          compare = d3up.buildCompare,
          elements = elem.find("*[data-skill-type]");
      elements.each(function() {
        var $this = $(this),
            type = $(this).data("skill-type"), 
            display = $(this).data("display"),
            icon = false,
            name = false;
        // Remove Existing Elements
        $(this).empty();
        // Loop through selected Skills and Render
        $.each(build.skills[type], function(slug, data) {
          if(!data) {
            return null;
          }
          switch(display) {
            case "icon":
              var li = $("<li>"),
                  cleaned = slug.split("~"),
                  icon = $("<img class='skill-icon' src='/images/icons/" + build.meta.heroClass + "-" + cleaned[0] + ".png'>");
              icon.attr('data-tooltip', data.desc),
              icon.attr('data-name', data.name);
              icon.attr('data-skill', slug);
              icon.click(function() {
                var checkbox = $(".skill-activate[data-skill='" + slug + "']");
                if(checkbox.length) {
                  $(this).toggleClass("skill-activated");                  
                  if(checkbox.is(":checked")) {
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
                  icon = $("<img src='/images/icons/" + build.meta.heroClass + "-" + cleaned[0] + ".png'>"),
                  tr = $("<tr class='skill-calc-row' data-id='" + slug + "'>"),
                  td = $("<td>"),
                  control = $("<div class='control'></div>");
              if(!skillName) {
                skillName = slug.replace(/\-/g, " ").capitalize();
                h3.html(skillName);
              }
          		if(data.effect) {
          		  var select = $("<select class='skill-stacks' data-skill='" + slug + "'>").hide(),
          		      checkbox = $("<input type='checkbox' class='skill-activate' data-skill='" + slug + "'>"),
      					    skill = build.stats.skillData[slug];
      					if(skill && skill.activate) {
          				td.append(control);
          			}
          			if(skill && skill.stackable) {
          				select.show();
          				if(select.find("option").length == 0) {
            				for(i = 1; i <= skill.stackable; i++) {
            				  var option = $("<option value='" + i + "'>").html(i + " Stacks");
            				  select.append(option);
            				}				  
          				}
          				// Set the Default
          				checkbox.attr("data-stacks", 1);
          			}
                if(build.stats.skillData[slug] && build.stats.skillData[slug].activate) {

                }
                checkbox.click(function() {
                  // tr.toggleClass("skill-activated");
                });
                // select.bind('change', function() {
                  //  checkbox.attr("data-stacks", $(this).val());
                // });
                checkbox.bind('change', function() {
                  var name = $(this).attr('data-skill'), 
                      type = $(this).closest("table").data("skill-type");
                  if($(this).is(":checked")) {
                    skillIcon.addClass("skill-activated");
                    tr.addClass("skill-activated");
                    $.each(d3up.builds, function(k) {
                      d3up.builds[k].skills.enabled[name] = build.skills[type][name];                      
                      // console.log("applying [" + name + "] to build id#" + k);
                      // console.log("enabled", d3up.builds[k].skills.enabled);
                      if($(this).attr("data-stacks")) {
                        // console.log("adding stacks (" + $(this).attr("data-stacks") + ") to build id#" + k);
                        d3up.builds[k].skills.enabled[name].stacks = $(this).attr("data-stacks");
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
                  checkbox.attr("data-stacks", $(this).val());
                  checkbox.trigger('change');
                });
      					control.append("Activate ", checkbox, select);					
      				}
              h3.prepend(icon);
              td.prepend(h3);
              tr.append(td);
              $this.append(tr);
              break;
            default:
              // console.log("Unhandled Display Type: " + display);
              break;
          }
        });
      });
    },
    diffWith: function(build) {
      // Compares this build to the build passed in
      return this.calc.diff(this.getStats(), build.getStats());
    },
    setGear: function(gear) {
      // console.log("setting gear");
      var build = this;
      $.each(gear, function(k,v) {
        var $this = $(v);
        var slot = $this.attr("data-slot"),
            item = $.parseJSON($this.attr("data-json"));
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
      $.each(skills, function(type, data) {
        $.each(data, function(idx, slug) {
          switch(type) {
            case "passives":
              build.skills[type][slug] = passives[build.meta.heroClass][slug];
              break;
            case "actives":
              build.skills[type][slug] = activeSkills[build.meta.heroClass][slug];
              break;
            default:
              // console.log("Unknown Skills Type: " + type);
              break;
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
    }
  }
  d3up.Build = Build;
})( d3up );