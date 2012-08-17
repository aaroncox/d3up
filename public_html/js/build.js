$(function(){function e(e,t,n,r){t||(t=0);switch(n){case"per":t?t<=1?t=Math.round(t*1e3)/10+"%":t=Math.round(t*10)/10+"%":t="0%";break;case"round":t=Math.round(t*100)/100;default:}var i=e.replace(/\s+/g,"-").toLowerCase();t&&(t=t.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1,"));var s=$("<li/>").addClass("stat-"+i).html($("<span class='stat-helper'/>").html(e+": ")).append(t);return r&&(r<=1?s.append(" ("+Math.round(r*1e3)/10+"%)"):s.append(" ("+r+"%)")),s}function O(){E={},S={},x={},T={},w.init(),$(".skill-activate").each(function(){E[$(this).data("skill")]=y[$(this).data("skill")],$(this).is(":checked")&&(x[$(this).data("skill")]=y[$(this).data("skill")])}),$(".passive-activate").each(function(){S[$(this).data("skill")]=b[$(this).data("skill")],$(this).is(":checked")&&(x[$(this).data("skill")]=b[$(this).data("skill")])}),w.setActives(E),w.setEnabledSkills(x),w.setPassives(S),w.setClass($("#character").data("class")),$(".equipped a").each(function(){var e=$(this).parent().data("slot"),t=$(this).data("json");w.setItem(e,t)}),N=w.run(),_.each(N.skillData,function(e,t){e.activate&&$(".skill-calc-row[data-id='"+t+"'] .control").show()},this),D()}function M(){var e=$("#build-active-skills").empty(),t=activeActives,n=activePassives;n.length&&g.empty(),t.length&&m.empty(),_.each(t,function(t){if(t!="undefined"&&t!=""){var n=activeSkills[p][t],r=$("<li class='skill-calc-row'>").attr("data-json",JSON.stringify(n.effect)).attr("data-id",t).attr("id","skill-"+t),i=t.split("~"),s=$("<img src='/images/icons/"+p+"-"+i[0]+".png'>"),o=$("<h3>").html(n.name),u=$("<ul class='details'>"),a=$("<p><span class='stat-helper'>Description</span>: </p>").append(n.desc),f=$("<p>"),l=$("<div class='control'></div>");s.attr("data-tooltip",n.desc),s.attr("data-name",n.name),n.rune&&(s.attr("data-tooltip",n.desc.replace(/  /,"<br/><br/>")+"<br/><br/>"+n.rune),f=$("<p>").html("<span class='stat-helper'>Rune Bonus</span>: "+n.rune)),s.bindSkilltip();if(n.effect){var c=$("<input type='checkbox' class='skill-activate' data-skill='"+t+"'>");c.click(function(){r.toggleClass("skill-activated"),O()}),l.append("Activate ",c).hide()}m.append($("<li>").append(s.clone())),r.append(s,l,o,u,a,f),e.append(r)}}),_.each(n,function(t){var n=t;if(n!="undefined"&&n!=""){var r=passives[p][n],i=$("<li class='skill-calc-row'>").attr("data-id",n).attr("id","skill-"+n),s=n.split("~"),o=$("<img src='/images/icons/"+p+"-"+s[0]+".png'>"),u=$("<h3>").html(t.replace(/\-/g," ").capitalize()),a=$("<ul class='details'>"),f=$("<p>").append(r.desc),l=$("<div class='control'></div>");o.attr("data-tooltip",r.desc),o.attr("data-name",t.replace(/\-/g," ").capitalize()),o.bindSkilltip();var c=$("<input type='checkbox' class='passive-activate' data-skill='"+n+"'>");c.click(function(){i.toggleClass("skill-activated"),O()}),l.append("Activate ",c).hide(),g.append($("<li/>").html(o.clone())),i.append(o,l,u,a,f),e.append(i)}}),O()}function D(){f.empty(),f.append($("<ul class='resist-specific'/>").append(e("EHP",N.ehp,"round"),e("EHP w/ Dodge",N["ehp-dodge"],"round"),e("EHP w/ Block","Not Implemented"))),f.append($("<ul class='resist-specific'/>").append($("<li class='header'/>").html("VS Damage Source EHP"),e("Melee EHP",N["ehp-melee"],"round"),e("Ranged EHP",N["ehp-range"],"round"),e("Elite EHP",N["ehp-elite"],"round"))),f.append($("<ul class='resist-specific'/>").append($("<li class='header'/>").html("VS Specific Element EHP"),e("Physical EHP",N["ehp-physical"],"round"),e("Cold EHP",N["ehp-cold"],"round"),e("Fire EHP",N["ehp-fire"],"round"),e("Lightning EHP",N["ehp-lightning"],"round"),e("Poison EHP",N["ehp-poison"],"round"),e("Arcane/Holy EHP",N["ehp-arcane"],"round")));var i=$("#build-active-skills");$.each(N.skillData,function(t,n){var r=i.find('li[data-id="'+t+'"] ul.details').empty();$.each(n,function(t,n){switch(t){case"3rd-hit":r.append(e("Average 3rd Hit",n,"round"));break;case"per-tick":r.append(e("DPS",n,"round"));break;case"total-damage":r.append(e("Total Damage per Cast",n,"round"));break;case"average-hit":r.append(e("Average Hit",n));break;case"damage-tick":r.append(e("Per Tick",n));break;case"damage":r.append(e("Damage Range",n));break;case"dps":r.append(e("DPS",n));break;case"critical-hit":r.append(e("Crit Damage Range",n));break;case"critical-hit-tick":r.append(e("Per Tick Crit Damage",n))}})}),r.empty(),r.append(e("Strength",N.strength)),r.append(e("Dexterity",N.dexterity)),r.append(e("Intelligence",N.intelligence)),r.append(e("Vitality",N.vitality)),r.append(e("Magic Find",N["plus-magic-find"],"per")),r.append(e("Gold Find",N["plus-gold-find"],"per")),n.empty(),n.append(e("Armor",N.armor,"round",N.armorReduce)),n.append(e("All Resist",N["resist-all"],"round",N["percent-resist-all"])),n.append(e("Block Chance",N["block-chance"],"per")),n.append(e("Dodge Chance",N["dodge-chance"],"per")),n.append(e("Damage Reduction",N.armorReduction,"per")),n.append(e("Physical Resistance",N["resist-physical"],"round",N["percent-resist-physical"])),n.append(e("Cold Resistance",N["resist-cold"],"round",N["percent-resist-cold"])),n.append(e("Fire Resistance",N["resist-fire"],"round",N["percent-resist-fire"])),n.append(e("Lightning Resistance",N["resist-lightning"],"round",N["percent-resist-lightning"])),n.append(e("Poison Resistance",N["resist-poison"],"round",N["percent-resist-poison"])),n.append(e("Arcane/Holy Resistance",N["resist-arcane"],"round",N["percent-resist-arcane"])),n.append(e("Crowd Control Reduction",N["cc-reduce"]?N["cc-reduce"]:0,"per")),n.append(e("Missile Damage Reduction",N["range-reduce"],"per")),n.append(e("Melee Damage Reduction",N["melee-reduce"],"per")),n.append(e("Elite Damage Reduction",N["elite-reduce"],"per")),n.append(e("Thorns",N.thorns)),t.empty(),t.append(e("DPS",N.dps,"round")),t.append(e("Attacks per Second",N["dps-speed-display"])),t.append(e("Critical Hit Chance",N["critical-hit"],"per")),t.append(e("Critical Hit Damage",N["critical-hit-damage"],"per")),a.empty(),a.append($("<li class='header'/>").html("DPS Gained per Stat")),a.append(e("+1 Primary Stat",N["dps-pt-primary"],"round")),a.append(e("+1% Crit Hit",N["dps-pt-critical-hit"],"round")),a.append(e("+1% Crit Hit Dmg",N["dps-pt-critical-hit-damage"],"round")),a.append(e("+1 Minimum Dmg",N["dps-pt-min-damage"],"round")),a.append(e("+1 Maximum Dmg",N["dps-pt-max-damage"],"round")),a.append(e("+1% Attack Speed",N["dps-pt-attack-speed"],"round")),u.empty(),u.append($("<li class='header'/>").html("EHP Gained per Stat")),u.append(e("+1 Armor",N["ehp-pt-armor"],"round")),u.append(e("+1 Strength",N["ehp-pt-strength"],"round")),u.append(e("+1 Intelligence",N["ehp-pt-intelligence"],"round")),u.append(e("+1 Vitality",N["ehp-pt-vitality"],"round")),u.append(e("+1 Resist All",N["ehp-pt-resist-all"],"round")),u.append(e("+1% Life",N["ehp-pt-plus-life"],"round")),s.empty(),s.append(e("Maximum Life",N.life,"round")),s.append(e("Total Life Bonus",N["plus-life"],"per")),s.append(e("Life per Second",N["life-regen"]?N["life-regen"]:0)),s.append(e("Life Steal",N["life-steal"]?N["life-steal"]:0,"per")),s.append(e("Life per Kill",N["life-kill"]?N["life-kill"]:0)),s.append(e("Life per Hit",N["life-hit"]?N["life-hit"]:0)),s.append(e("Health Globe Healing Bonus",N["health-globes"]?N["health-globes"]:0)),s.append(e("Bonus to Gold/Globe Radius",N["plus-pickup-radius"]?N["plus-pickup-radius"]:0));var o=$("<ul class='resist-specific'/>").append($("<li class='header'/>").html("Gear EHP Contributions (<a href='/faq/gear-based-ehp'>?</a>)"));o.append(e("Helm EHP",N["ehp-helm"],"round")),o.append(e("Shoulder EHP",N["ehp-shoulders"],"round")),o.append(e("Amulet EHP",N["ehp-amulet"],"round")),o.append(e("Chest EHP",N["ehp-chest"],"round")),o.append(e("Gloves EHP",N["ehp-gloves"],"round")),o.append(e("Bracers EHP",N["ehp-bracers"],"round")),o.append(e("Belt EHP",N["ehp-belt"],"round")),o.append(e("Pants EHP",N["ehp-pants"],"round")),o.append(e("Ring 1 EHP",N["ehp-ring1"],"round")),o.append(e("Ring 2 EHP",N["ehp-ring2"],"round")),o.append(e("Boots EHP",N["ehp-boots"],"round")),o.append(e("Main Hand EHP",N["ehp-mainhand"],"round")),o.append(e("Off Hand EHP",N["ehp-offhand"],"round")),$("#stats-ehp-gear").html(o);var l=$("<ul class='resist-specific'/>").append($("<li class='header'/>").html("Gear DPS Contributions (<a href='/faq/gear-based-dps'>?</a>)"));l.append(e("Helm DPS",N["dps-helm"],"round")),l.append(e("Shoulder DPS",N["dps-shoulders"],"round")),l.append(e("Amulet DPS",N["dps-amulet"],"round")),l.append(e("Chest DPS",N["dps-chest"],"round")),l.append(e("Gloves DPS",N["dps-gloves"],"round")),l.append(e("Bracers DPS",N["dps-bracers"],"round")),l.append(e("Belt DPS",N["dps-belt"],"round")),l.append(e("Pants DPS",N["dps-pants"],"round")),l.append(e("Ring 1 DPS",N["dps-ring1"],"round")),l.append(e("Ring 2 DPS",N["dps-ring2"],"round")),l.append(e("Boots DPS",N["dps-boots"],"round")),$("#stats-dps-gear").html(l)}function W(e,t,n,r){var i=jQuery.extend({},e),s=w.getItem(n),o=null,u=[];w.init(),w.setClass($("#character").data("class")),$(".equipped a").each(function(){var e=$(this).parent().data("slot"),t=$(this).data("json");w.setItem(e,t)}),w.setPassives(S),w.removeItem(n);switch(t.type){case"2h-mace":case"2h-axe":case"diabo":case"2h-mighty":case"polearm":case"staff":case"2h-sword":$("#equipped-offhand a").length&&(o=JSON.parse($("#equipped-offhand a").attr("data-json")),w.removeItem("offhand"),u.push("We notice you're comparing a two-handed weapon vs your currently equipped mainhand + off-hand items. We've adjusted the comparision slightly so you can see the actual stats between your mainhand + offhand VS the two-hander (without the offhand)."))}w.parseItem(t,n);var a=w.run(),f=w.diff(i,a);$(".compare-diff").empty();if(!r){var l=$("<h4>Comparision Results</h4>").css({margin:0}),c=$("<p/>").append("Old Item: ",w.getItemLink(s)),h=$("<p/>").append("New Item: ",w.getItemLink(t));o&&c.append(" + Offhand: ",w.getItemLink(o))}$(".compare-diff").append(l,c,h),$("#compare-notes").html(""),u.length>0&&$.each(u,function(e,t){$("#compare-notes").append(t)});var p=$("<table/>");header=$("<tr/>").append("<th>Stat</th><th>Diff</th><th>Old</th><th>New</th>"),p.append(header),$.each(f,function(e,t){var n=t.split("|"),r=n[1],s=n[0],o=$("<tr/>");o.append($("<td/>").html(s));var u=Math.round(i[e]*100)/100,f=Math.round(a[e]*100)/100;u>99999&&(u=Math.round(u/10)/100+"k"),f>99999&&(f=Math.round(f/10)/100+"k"),r>0?(o.append($("<td/>").html("+"+r).addClass("pos")),o.append($("<td class='neg'/>").html(u)),o.append($("<td class='pos'/>").html(f))):(o.append($("<td/>").html(r).addClass("neg")),o.append($("<td class='pos'/>").html(u)),o.append($("<td class='neg'/>").html(f))),p.append(o)}),p.append("<tr><td colspan='10'><span class='pos'>Green = Increase</span> / <span class='neg'>Red = Decrease</span></td></tr>"),$(".compare-diff").append(p),w.removeItem(n),w.parseItem(s,n)}var t=$("#stats-offense"),n=$("#stats-defense"),r=$("#stats-base"),s=$("#stats-life"),o=$("#stats-misc"),u=$("#stats-ehp-gains"),a=$("#stats-dps-gains"),f=$("#stats-ehp"),l=$("#stats-ehp-gear"),c=$("#stats-dps-gear"),h=$("#vsLevel"),p=$("#character").data("class"),d=$("#character").data("owner"),v=$("#skill-display"),m=$("#active-display"),g=$("#passive-display"),y={},b={},w=new d3up.BuildCalculator,E={},S={},x={},T={};w.init(),w.setClass($("#character").data("class")),$(".equipped a").each(function(){var e=$(this).parent().data("slot"),t=$(this).data("json");w.setItem(e,t)}),w.setPassives(S);var N=w.run(),C=[1,2,3,4,5,6],k=[1,2,3],L=$("#skill-chooser");$.each(C,function(e,t){var n=$("<select data-index='"+(t-1)+"' data-placeholder='Select a Skill...' name='activeSelect"+t+"'>"),r=$("<span class='skill-label'>").html("Skill #"+t);n.append("<option value=''>None</option>"),$.each(activeSkills[p],function(e,r){var i=$("<option value='"+e+"'>").html(r.name),s=t-1;activeActives[s]&&activeActives[s]==e&&(i.attr("selected","selected"),y[e]=activeSkills[p][e]),n.append(i)}),L.append($("<p>").append(r,n)),n.chosen({allow_single_deselect:!0}),n.bind("change",function(){var e=$(this).val();activeActives[$(this).data("index")]=e,y[e]=activeSkills[p][e],M()})}),$.each(k,function(e,t){var n=$("<select data-index='"+(t-1)+"' data-placeholder='Select a Skill...' name='passiveSelect"+t+"'>"),r=$("<span class='skill-label'>").html("Passive #"+t);n.append("<option value=''>None</option>"),$.each(passives[p],function(e,r){var i=$("<option value='"+e+"'>").html(e.replace(/\-/g," ").capitalize()),s=t-1;activePassives[s]&&activePassives[s]==e&&(i.attr("selected","selected"),b[e]=passives[p][e]),n.append(i)}),L.append($("<p>").append(r,n)),n.chosen({allow_single_deselect:!0}),n.bind("change",function(){activePassives[$(this).data("index")]=$(this).val(),b[$(this).val()]=passives[p][$(this).val()],M()})});var A=$("<button>").html("Save Skills");A.click(function(){$.ajax({data:{a:"skills",actives:activeActives,passives:activePassives,stats:{dps:N.dps,ehp:N.ehp},success:function(){$($("<div style='padding: 20px'/>").html("Saved!")).dialog({modal:!0,buttons:{Ok:function(){$(this).dialog("close")}}})}}})}),L.hide(),L.append(A),$(".skill-change").click(function(){L.show()}),h.bind("change",function(){w.setVsLevel($(this).val()),O()}),M(),d&&$(".gear-change").click(function(){var e=$(this).data("item-type"),t=$("#equipped-"+e);if(e=="offhand"){var n=$("#equipped-mainhand a").data("json");if(n)switch(n.type){case"2h-mace":case"2h-axe":case"diabo":case"2h-mighty":case"polearm":case"staff":case"2h-sword":return $($("<div style='padding: 20px'/>").html("<p>You're currently wearing a two handed weapon, an offhand isn't allowed.")).dialog({modal:!0,buttons:{Ok:function(){$(this).dialog("close")}}}),!1}}return $.ajax({url:"/item/fetch/type/"+e,cache:!1,dataType:"json",success:function(n){var r=$("#available-gear"),i=$("#gear-change");r.html(""),r.append("<option value=''>Nothing</option>"),$.each(n,function(e,t){var n=$.parseJSON(t),i=$("<option/>");i.attr("value",e),i.attr("data-json",t),i.html(n.name),i.bindTooltip(),r.append(i)}),i.dialog({width:800,modal:!0,buttons:{Equip:function(){var n=$(this);if(r.val()!=""){var i=$("<a/>"),s=r.selectedOption(),o=$.parseJSON(s.attr("data-json"));switch(o.type){case"2h-mace":case"2h-axe":case"diabo":case"2h-mighty":case"polearm":case"staff":case"2h-sword":$("#equipped-offhand").html("Nothing")}i.attr("href","/i/"+r.val()),i.attr("data-json",JSON.stringify(o)),i.addClass("quality-"+o.quality),i.html(o.name),i.bindTooltip(),t.html(i)}else t.html("Nothing");n.dialog("close"),O(),setTimeout(function(){$.ajax({data:{a:"equip",slot:e,newItem:r.val(),stats:{dps:N.dps,ehp:N.ehp}}})},0)},Cancel:function(){$(this).dialog("close")}}})}}),!1}),D(),$("#character").tabs({select:function(e,t){window.location=t.tab.href}}),$(".calc-stats").tabs(),$("#active-display, #passive-display").find("li img").each(function(){$(this).bindSkilltip()});var P=$("#compared-slot"),H=$("#compare-to");H.bind("change",function(){var e=$("#compared-slot").selectedOption().val(),t=$(this).selectedOption().data("json");W(N,t,e)}),P.bind("change",function(){var e=$(this).val();O(),$.ajax({url:"/item/fetch/type/"+e,cache:!1,dataType:"json",success:function(e){H.html(""),H.append("<option value=''>Nothing</option>"),$.each(e,function(e,t){var n=$.parseJSON(t),r=$("<option/>");r.attr("value",e),r.attr("data-json",t),r.html(n.name),r.bindTooltip(),H.append(r)})}})});var B=$("#simulate-slot"),j=!1,F=!1,I=!1,q=$("#simulate-stats"),R=$("#simulate-attributes"),U=$("#simulate-sliders"),z=!1;$("#simulation-stats").hide(),B.bind("change",function(){O(),R.val(""),z=jQuery.extend({},N),I=!1,j=$(this).val(),I=$("#equipped-"+j+" a").data("json"),$.each(I.attrs,function(e,t){t==0&&delete I.attrs[e];var n=$("#simulate-stats ul.attrs input[name="+e+"]");n&&n.val(t)});var e=q.find(".stats-primary .big-stat").empty(),t=q.find(".stats-primary .stat-helper").empty(),n=q.find(".stats-extra-percent").empty(),r=q.find(".stats-extra-range").empty(),s=q.find("ul.sockets").empty();if(I.sockets)for(i=0;i<I.sockets.length;i++){var o=$("<select class='sockets' name='socket"+i+"' style='width: 300px'><option value=''>None</option></select>"),u="unknown";$.each(gems,function(e,t){var n=!1;I.sockets[i]==e&&(n=!0);switch(I.type){case"spirit-stone":case"voodoo-mask":case"wizard-hat":case"helm":effectNum=1,u=t[1];break;case"2h-mace":case"2h-axe":case"bow":case"diabo":case"crossbow":case"2h-mighty":case"polearm":case"staff":case"2h-sword":case"axe":case"ceremonial-knife":case"hand-crossbow":case"dagger":case"fist-weapon":case"mace":case"mighty-weapon":case"spear":case"sword":case"wand":effectNum=2,u=t[2];break;case"shield":case"belt":case"boots":case"bracers":case"chest":case"cloak":case"gloves":case"pants":case"mighty-belt":case"shoulders":effectNum=3,u=t[3];break;default:effectNum=3,u=t[3]}var r=$("<option value='"+e+"'>"+t[0]+" ("+u+")</option>");n&&r.attr("selected","selected"),o.append(r)}),o.bind("change",function(){I.socketAttrs={},q.find("select.sockets").each(function(e,t){if(gemEffect[$(this).val()]){var n=gemEffect[$(this).val()][effectNum];I.socketAttrs[n[0]]?I.socketAttrs[n[0]]+=n[1]:I.socketAttrs[n[0]]=n[1]}}),w.init(),w.setClass($("#character").data("class")),$(".equipped a").each(function(){var e=$(this).parent().data("slot"),t=$(this).data("json");w.setItem(e,t)}),w.setPassives(S),w.removeItem(j),w.parseItem(I,j),N=w.run(),W(z,I,j,!0),D()}),s.append($("<li>").html(o))}I.stats&&$.each(I.stats,function(i,s){var o=$("<input name='"+i+"' type='text'/>");o.val(s);switch(i){case"armor":e.html(o),t.html("Total Armor");break;case"block-amount":var u=$("<input name='"+i+"-min' type='text'/>"),a=$("<input name='"+i+"-max' type='text'/>");u.val(s.min),a.val(s.max),r.append(u,"-",a).append(" Block Amount");break;case"block-chance":n.html(o).append(" Block Chance");break;case"dps":e.html("<span id='simulated-dps'>"+s+"</span>"),t.html("Damage Per Second");break;case"speed":n.html(o).append(" Attack Speed");break;case"damage":var f=$("<input name='"+i+"-min' type='text'/>"),l=$("<input name='"+i+"-max' type='text'/>");f.val(s.min),l.val(s.max);function c(){switch($(this).attr("name")){case"damage-min":I.stats.damage.min=$(this).val()?parseFloat($(this).val()):0;break;case"damage-max":I.stats.damage.max=$(this).val()?parseFloat($(this).val()):0;break;default:return console.log($(this)),!1}var e=(I.stats.damage.min+I.stats.damage.max)/2*I.stats.speed;return $("#simulated-dps").html(Math.round(e*10)/10),w.init(),w.setClass($("#character").data("class")),$(".equipped a").each(function(){var e=$(this).parent().data("slot"),t=$(this).data("json");w.setItem(e,t)}),w.setPassives(S),w.removeItem(j),w.parseItem(I,j),N=w.run(),W(z,I,j,!0),D(),!1}f.bind("keyup",c),l.bind("keyup",c),r.append(f,"-",l).append(" Damage");break;default:console.log(i,s)}o.bind("keyup",function(){switch(i){case"block-chance":I.stats[$(this).attr("name")]=$(this).val()?parseFloat($(this).val()):0;break;default:I.stats[$(this).attr("name")]=$(this).val()?parseFloat($(this).val()):0;if(i=="speed"){var e=(I.stats.damage.min+I.stats.damage.max)/2*I.stats.speed;$("#simulated-dps").html(Math.round(e*10)/10)}}w.init(),w.setClass($("#character").data("class")),$(".equipped a").each(function(){var e=$(this).parent().data("slot"),t=$(this).data("json");w.setItem(e,t)}),w.setPassives(S),w.removeItem(j),w.parseItem(I,j),N=w.run(),W(z,I,j,!0),D()})}),I.attrs&&$.each(I.attrs,function(e,t){R.find("option[value="+e+"]").attr("selected","selected")}),$("#simulate-stats ul.stats").empty(),R.trigger("liszt:updated"),R.trigger("change"),$("#simulation-stats").show()}),R.bind("change",function(){var e=$(this).val(),t=$("#simulate-stats ul.attrs");e&&$.each(e,function(e,n){if(n!=""){var r=t.find("."+n);if(td[n]&&!r.length){var i=I.attrs[n]?I.attrs[n]:0,s=$("<li></li>"),o=td[n],u="<input type='text' name='"+n+"' value='"+i+"' tabindex='100'/>";o=o.replace("VVV",u),s.append(o),s.find("input").bind("keyup",function(){I.attrs[$(this).attr("name")]=$(this).val()?$(this).val():0,w.init(),w.setClass($("#character").data("class")),$(".equipped a").each(function(){var e=$(this).parent().data("slot"),t=$(this).data("json");w.setItem(e,t)}),w.setPassives(S),w.removeItem(j),w.parseItem(I,j),N=w.run(),W(z,I,j,!0),D()}),s.addClass(n),t.append(s)}}}),t.find("li").each(function(){if(!e||e.indexOf($(this).attr("class"))==-1)I.attrs[$(this).attr("class")]=0,w.init(),w.setClass($("#character").data("class")),$(".equipped a").each(function(){var e=$(this).parent().data("slot"),t=$(this).data("json");w.setItem(e,t)}),w.setPassives(S),w.removeItem(j),w.parseItem(I,j),N=w.run(),W(z,I,j,!0),D(),$(this).remove()})}),R.chosen();var X=$("#button-upvote"),V=$("#button-downvote");if(isLoggedIn){X.attr("data-tooltip","Do you find this build useful or just simply awesome? Give them an upvote!"),V.attr("data-tooltip","Is this build not useful at all or full of made-up things? Feel free to downvote.");switch(voted){case"up":X.removeClass("ui-state-disabled");break;case"down":V.removeClass("ui-state-disabled")}X.click(function(){J("up")}),V.click(function(){J("down")});function J(e){$.ajax({url:"?vote="+e});var t=0;e=="up"?(X.hasClass("ui-state-disabled")?V.hasClass("ui-state-disabled")?t=1:t=2:t=-1,X.toggleClass("ui-state-disabled"),V.addClass("ui-state-disabled")):(V.hasClass("ui-state-disabled")?X.hasClass("ui-state-disabled")?t=-1:t=-2:t=1,X.addClass("ui-state-disabled"),V.toggleClass("ui-state-disabled")),$("#vote-count").html(parseInt($("#vote-count").text(),10)+t).attr("data-count",t)}}X.bindSkilltip(),V.bindSkilltip()})