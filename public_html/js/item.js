switch($("#itemType").val()){case"shield":$("#base_dps-element, #base_damage_min-element, #base_damage_max-element, #base_speed-element, #base_dps-label, #base_damage_min-label, #base_damage_max-label, #base_speed-label").hide(),$("#base_armor-label, #base_armor-element, #base_block_chance-element, #base_block_chance-label, #base_block_amount_min-element, #base_block_amount_min-label, #base_block_amount_max-element, #base_block_amount_max-label").show();break;case"belt":case"boots":case"bracers":case"chest-armor":case"cloak":case"gloves":case"helm":case"pants":case"mighty-belt":case"shoulder":case"spirit-stone":case"voodoo-mask":case"wizard-hat":$("#base_dps-element, #base_damage_min-element, #base_damage_max-element, #base_speed-element, #base_dps-label, #base_damage_min-label, #base_damage_max-label, #base_speed-label, #base_block_chance-element, #base_block_chance-label, #base_block_amount_min-element, #base_block_amount_min-label, #base_block_amount_max-element, #base_block_amount_max-label").hide(),$("#base_armor-label, #base_armor-element").show();break;case"2h-mace":case"2h-axe":case"bow":case"diabo":case"crossbow":case"2h-mighty":case"polearm":case"staff":case"2h-sword":case"axe":case"ceremonial-knife":case"hand-crossbow":case"dagger":case"fist-weapon":case"mace":case"mighty-weapon":case"spear":case"sword":case"wand":$("#base_armor-label, #base_armor-element, #base_block_chance-element, #base_block_chance-label, #base_block_amount_min-element, #base_block_amount_min-label, #base_block_amount_max-element, #base_block_amount_max-label").hide(),$("#base_dps-element, #base_damage_min-element, #base_damage_max-element, #base_speed-element, #base_dps-label, #base_damage_min-label, #base_damage_max-label, #base_speed-label").show();break;default:}$("#name").keyup(function(){$(".item-preview .top p").html(document.createTextNode($("#name").val()))}),$("#itemType").chosen({placeholder:"Choose the item type...",allowClear:!0}),$("#itemType").bind("change",function(){var e=$(this).find(":selected").html(),t=$(this).find(":selected").val(),n=$(".item-preview .item-type .type").html(e),r=$(".additional");$("#sockets").trigger("change");switch(t){case"shield":$("#base_dps-element, #base_damage_min-element, #base_damage_max-element, #base_speed-element, #base_dps-label, #base_damage_min-label, #base_damage_max-label, #base_speed-label").hide(),$("#base_armor-label, #base_armor-element, #base_block_chance-element, #base_block_chance-label, #base_block_amount_min-element, #base_block_amount_min-label, #base_block_amount_max-element, #base_block_amount_max-label").show();var i=$(".item-preview .stats"),s=$("#base_armor"),o=$("#base_block_amount_min"),u=$("#base_block_amount_max"),a=$("#base_block_chance"),f=$(".stats-extra-percent").empty(),l=$(".stats-extra-range").empty(),c=i.find(".big-stat"),h=i.find(".stat-helper");$(".stats-damage, .stats-speed").empty(),h.html("Armor"),s.keyup(function(e){c.html(s.val())}).trigger("keyup"),o.keyup(function(e){l.html(o.val()+"-"+u.val()+" <span class='stat-helper'>Block Amount</span>")}).trigger("keyup"),u.keyup(function(e){l.html(o.val()+"-"+u.val()+" <span class='stat-helper'>Block Amount</span>")}).trigger("keyup"),a.keyup(function(e){f.html(a.val()+"% <span class='stat-helper'>Chance to Block</span>")}).trigger("keyup");break;case"belt":case"boots":case"bracers":case"chest-armor":case"cloak":case"gloves":case"helm":case"pants":case"mighty-belt":case"shoulder":case"spirit-stone":case"voodoo-mask":case"wizard-hat":$("#base_dps-element, #base_damage_min-element, #base_damage_max-element, #base_speed-element, #base_dps-label, #base_damage_min-label, #base_damage_max-label, #base_speed-label, #base_block_chance-element, #base_block_chance-label, #base_block_amount_min-element, #base_block_amount_min-label, #base_block_amount_max-element, #base_block_amount_max-label").hide(),$("#base_armor-label, #base_armor-element").show();var i=$(".item-preview .stats"),p=$("#base_armor"),c=i.find(".big-stat"),h=i.find(".stat-helper");$(".stats-extra-percent, .stats-extra-range").empty(),h.html("Armor"),p.keyup(function(e){c.html(p.val())}).trigger("keyup");break;case"2h-mace":case"2h-axe":case"bow":case"diabo":case"crossbow":case"2h-mighty":case"polearm":case"staff":case"2h-sword":case"axe":case"ceremonial-knife":case"hand-crossbow":case"dagger":case"fist-weapon":case"mace":case"mighty-weapon":case"spear":case"sword":case"wand":var i=$(".item-preview .stats"),s=$("#base_dps"),o=$("#base_damage_min"),u=$("#base_damage_max"),a=$("#base_speed"),f=$(".stats-extra-percent").html(""),l=$(".stats-extra-range").html(""),c=i.find(".big-stat"),h=i.find(".stat-helper");h.html("Damage per Second"),$("#base_armor-label, #base_armor-element, #base_block_chance-element, #base_block_chance-label, #base_block_amount_min-element, #base_block_amount_min-label, #base_block_amount_max-element, #base_block_amount_max-label").hide(),$("#base_dps-element, #base_damage_min-element, #base_damage_max-element, #base_speed-element, #base_dps-label, #base_damage_min-label, #base_damage_max-label, #base_speed-label").show(),s.keyup(function(e){c.html(s.val())}).trigger("keyup"),o.keyup(function(e){l.html(o.val()+"-"+u.val()+" <span class='stat-helper'>Damage</span>")}).trigger("keyup"),u.keyup(function(e){l.html(o.val()+"-"+u.val()+" <span class='stat-helper'>Damage</span>")}).trigger("keyup"),a.keyup(function(e){f.html(a.val()+" <span class='stat-helper'>Attacks per Second</span>")}).trigger("keyup");break;default:$(".stats .big-stat, .stats .stat-helper").html(""),$(".stats-speed").html(""),$(".stats-damage").html(""),$(".item-preview .stats").removeClass("stats-armor stats-dps"),$("#base_dps-element, #base_damage_min-element, #base_damage_max-element, #base_speed-element, #base_dps-label, #base_damage_min-label, #base_damage_max-label, #base_speed-label, #base_armor-label, #base_armor-element").hide()}}),$("#quality").chosen({placeholder:"Choose the item's quality...",allowClear:!0}),$("#sockets").chosen({placeholder:"No Sockets...",allowClear:!0}),$("#sockets").bind("change",function(){var e=$(this).find(":selected").val(),t=$(".item-preview .item .sockets");t.empty();if(e>0)for(i=0;i<e;i++){var n=$("<select tabindex='150' name='socket"+i+"' style='width: 300px'><option></option></select>"),r=$("#itemType").val(),s="unknown";$.each(gems,function(e,t){switch(r){case"spirit-stone":case"voodoo-mask":case"wizard-hat":case"helm":s=t[1];break;case"shield":case"belt":case"boots":case"bracers":case"chest-armor":case"cloak":case"gloves":case"pants":case"mighty-belt":case"shoulder":default:s=t[3];break;case"2h-mace":case"2h-axe":case"bow":case"diabo":case"crossbow":case"2h-mighty":case"polearm":case"staff":case"2h-sword":case"axe":case"ceremonial-knife":case"hand-crossbow":case"dagger":case"fist-weapon":case"mace":case"mighty-weapon":case"spear":case"sword":case"wand":s=t[2]}n.append("<option value='"+e+"'>"+t[0]+" ("+s+")</option>")}),t.append($("<li>").append(n))}}),$("#quality").bind("change",function(){var e=$(this).find(":selected").html(),t=$(".top p"),n=$(this).find(":selected").val(),r=$(".item-preview .item-type"),i=$(".item-preview .item-type .quality").html(e);t.removeClass("quality-1 quality-2 quality-3 quality-4 quality-5 quality-6 quality-7"),t.addClass("quality-"+n),r.removeClass("quality-1 quality-2 quality-3 quality-4 quality-5 quality-6 quality-7"),r.addClass("quality-"+n)}),$("#attributes").chosen({placeholder:"What attributes does this item have?",allowClear:!0}),$("#attributes").bind("change",function(){var e=$(this).val(),t=$(".item-preview .item ul.attrs");e&&$.each(e,function(e,n){var r=t.find("."+n),i=$("<li></li>");if(!r.length){var s=td[n],o="<input type='text' name='"+n+"' value='' tabindex='100'/>";s=s.replace("VVV",o),i.html(s),i.addClass(n),t.append(i)}}),t.find("li").each(function(){(!e||e.indexOf($(this).attr("class"))==-1)&&$(this).remove()})}),$("#attributes").trigger("change"),$("#quality").trigger("change"),$("#itemType").trigger("change"),$("#name").trigger("keyup")