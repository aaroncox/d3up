$(function(){function t(t,n,r,i){e[t]=n;switch(r){case"per":n+="%";break;default:}var s=$("<li/>").html($("<span class='stat-helper'/>").html(t+": ")).append(n);return i&&s.append(" ("+i+"%)"),s}function n(e){var n=[],r=[],i=[],s=$("#stats-offense"),o=$("#stats-defense"),u=$("#stats-base"),a=$("#stats-life"),f=$("#stats-misc"),l=$("#character").data("class");$(".equipped a").each(function(){if($(this).attr("data-json")){var e=$(this).data("json");e.attrs&&$.each(e.attrs,function(t,n){switch(t){case"armor":if(e.type=="ring"||e.type=="amulet")r[t]?r[t]+=parseFloat(n):r[t]=parseFloat(n);break;case"attack-speed":switch(e.type){case"shield":case"belt":case"boots":case"bracers":case"chest-armor":case"cloak":case"gloves":case"helm":case"pants":case"mighty-belt":case"shoulder":case"spirit-stone":case"voodoo-mask":case"wizard-hat":case"ring":case"amulet":i.push(n/100);break;default:}break;default:r[t]?r[t]+=parseFloat(n):r[t]=parseFloat(n)}}),e.socketAttrs&&$.each(e.socketAttrs,function(e,t){r[e]?r[e]+=parseFloat(t):r[e]=parseFloat(t)}),e.stats&&$.each(e.stats,function(e,t){switch(e){case"damage":n[e]={min:t.min,max:t.max};break;case"block-amount":n[e]=t.min+"-"+t.max;break;default:n[e]?n[e]+=parseFloat(t):n[e]=parseFloat(t)}})}}),u.empty();var c=0;switch(l){case"wizard":case"witch-doctor":r.strength+=67,r.dexterity+=67,r.intelligence+=187,c=r.intelligence;break;case"barbarian":r.strength+=187,r.dexterity+=67,r.intelligence+=67,c=r.strength;break;case"demon-hunter":case"monk":r.strength+=67,r.dexterity+=187,r.intelligence+=67,c=r.dexterity}r.vitality+=127,u.append(t("Strength",r.strength)),u.append(t("Dexterity",r.dexterity)),u.append(t("Intelligence",r.intelligence)),u.append(t("Vitality",r.vitality));var h=276+35*r.vitality,p=r["plus-life"]?r["plus-life"]:0,d=Math.round(h+h*p*.01);a.empty(),a.append(t("Maximum Life",d)),a.append(t("Total Life Bonus",p,"per")),a.append(t("Life per Second",r["life-regen"]?r["life-regen"]:0)),a.append(t("Life Steal",r["life-steal"]?r["life-steal"]:0,"per")),a.append(t("Life per Kill",r["life-kill"]?r["life-kill"]:0)),a.append(t("Life per Hit",r["life-hit"]?r["life-hit"]:0)),a.append(t("Health Globe Healing Bonus",r["health-globes"]?r["health-globes"]:0)),a.append(t("Bonus to Gold/Globe Radius",r["plus-pickup-radius"]?r["plus-pickup-radius"]:0)),o.empty();var v=n.armor+r.strength+(r.armor?r.armor:0),m=v/(3e3+v),g=Math.round(r["resist-all"]+r.intelligence/10),y={physical:g+(r["physical-resist"]?r["physical-resist"]:0),cold:g+(r["cold-resist"]?r["cold-resist"]:0),fire:g+(r["fire-resist"]?r["fire-resist"]:0),lightning:g+(r["lightning-resist"]?r["lightning-resist"]:0),poison:g+(r["poison-resist"]?r["poison-resist"]:0),arcane:g+(r["arcane-resist"]?r["arcane-resist"]:0)},b={physical:Math.round(y.physical/(300+y.physical)*100*100)/100,cold:Math.round(y.cold/(300+y.cold)*100*100)/100,fire:Math.round(y.fire/(300+y.fire)*100*100)/100,lightning:Math.round(y.lightning/(300+y.lightning)*100*100)/100,poison:Math.round(y.poison/(300+y.poison)*100*100)/100,arcane:Math.round(y.arcane/(300+y.arcane)*100*100)/100};o.append(t("Armor",v)),o.append(t("Block Amount",n["block-amount"]?n["block-amount"]:"~")),o.append(t("Block Chance",n["block-chance"]?n["block-chance"]:"0%"));var w=r.dexterity,E=0,S=[[100,.1],[500,.025],[1e3,.02],[8e3,.01]];w>0&&$.each(S,function(e,t){w>t[0]?(w-=t[0],E+=t[0]*t[1]):(E+=w*t[1],w=0)}),o.append(t("Dodge Chance",Math.round(E*10)/10)),o.append(t("Damage Reduction",Math.round(m*100*100)/100)),o.append(t("Physical Resistance",y.physical,"",b.physical)),o.append(t("Cold Resistance",y.cold,"",b.cold)),o.append(t("Fire Resistance",y.fire,"",b.fire)),o.append(t("Lightning Resistance",y.lightning,"",b.lightning)),o.append(t("Poison Resistance",y.poison,"",b.poison)),o.append(t("Arcane/Holy Resistance",y.arcane,"",b.arcane)),o.append(t("Crowd Control Reduction",r["cc-reduce"],"per")),o.append(t("Missile Damage Reduction",r["range-reduce"],"per")),o.append(t("Melee Damage Reduction",r["melee-reduce"],"per")),o.append(t("Thorns",r.thorns)),s.empty();var x=n.speed,T=1,N=n.damage,C=n.dps,k=0,L=0,A=r["critical-hit"]+5,O=r["critical-hit-damage"]+50;r["max-damage"]&&r["min-damage"]&&(k=(r["max-damage"]+r["min-damage"])/2),$.each(i,function(e,t){T+=t}),x=Math.round(x*T*100)/100;var M=C*x*(r.intelligence/100),_=M*1.74*.325;N&&(L=((N.min+N.max)/2+k)*n.speed*T*(c/100+1)*1*(A/100*(O/100)+1),L=Math.round(L*100)/100),s.append(t("DPS",L)),s.append(t("Attacks per Second",x)),s.append(t("Critical Hit Chance",A+"%")),s.append(t("Critical Hit Damage",O+"%"))}function i(t,r){var i=$("#compared-slot").find(":selected").val(),s=e;itemDisplay=$("#equipped-"+i);var o=$("<a/>"),u=itemDisplay.html();o.attr("href","/i/"+r.id),o.attr("data-json",JSON.stringify(r)),o.addClass("quality-"+r.quality),o.html(r.name),o.bindTooltip(),itemDisplay.html(o),n();var a={};jQuery.extend(a,e),itemDisplay.html(u),n();var f=$("<div/>").append($("<div/>").append("Old Item: ",u),$("<div/>").append("New Item: ",o)),l=$.diff(t,a),c=$("<table/>");header=$("<tr/>").append("<th>Stat</th><th>Old</th><th>New</th><th>Diff</th>"),c.append(header),$.each(l.mod,function(e,n){var r=Math.round((a[e]-t[e])*100)/100,i=$("<tr/>");i.append($("<td/>").html(e)),r>0?(i.append($("<td class='neg'/>").html(t[e])),i.append($("<td class='pos'/>").html(a[e])),i.append($("<td/>").html(r).addClass("pos"))):(i.append($("<td class='pos'/>").html(t[e])),i.append($("<td class='neg'/>").html(a[e])),i.append($("<td/>").html(r).addClass("neg"))),c.append(i)}),c.append("<tr><td colspan='10'><span class='pos'>Green = Increase</span> / <span class='neg'>Red = Decrease</span></td></tr>"),f.find("div a").each(function(){$(this).bindTooltip()}),$(".compare-diff").empty().append(f,c)}var e=[];$(".gear-change").click(function(){var e=$(this).data("item-type"),t=$("#equipped-"+e);$.ajax({url:"/item/fetch/type/"+e,cache:!1,dataType:"json",success:function(r){var i=$("#available-gear"),s=$("#gear-change");i.html(""),i.append("<option value=''>Nothing</option>"),$.each(r,function(e,t){var n=$.parseJSON(t),r=$("<option/>");r.attr("value",e),r.attr("data-json",t),r.html(n.name),r.bindTooltip(),i.append(r)}),s.dialog({width:800,modal:!0,buttons:{Equip:function(){var r=$(this);$.ajax({data:{a:"equip",slot:e,newItem:i.val()},success:function(e){if(i.val()!=""){var s=$("<a/>"),o=i.find(":selected"),u=$.parseJSON(o.attr("data-json"));s.attr("href","/i/"+i.val()),s.attr("data-json",JSON.stringify(u)),s.addClass("quality-"+u.quality),s.html(u.name),s.bindTooltip(),t.html(s)}else t.html("Nothing");r.dialog("close"),n()}})},Cancel:function(){$(this).dialog("close")}}})}})}),n(),$("#character").tabs();var r=$("#compare-to");$("#compared-slot").bind("change",function(){var e=$(this).val();$.ajax({url:"/item/fetch/type/"+e,cache:!1,dataType:"json",success:function(e){r.html(""),r.append("<option value=''>Nothing</option>"),$.each(e,function(e,t){var n=$.parseJSON(t),i=$("<option/>");i.attr("value",e),i.attr("data-json",t),i.html(n.name),i.bindTooltip(),r.append(i)})}})}),r.bind("change",function(){var t={};jQuery.extend(t,e);var n=$("#compared-slot").find(":selected").val(),r=$("#equipped-"+n+" a").data("json"),s=$(this).find(":selected").data("json"),o=i(t,s)})})