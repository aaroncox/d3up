$(function(){function n(){var e=$(this).prop("href");return $("#recent-items tbody").addClass("ui-state-disabled"),$.ajax({url:e,type:"html",success:function(e){$("#recent-items tbody .compared").remove(),setTimeout(function(){$("#recent-items tbody").replaceWith(e),$("#item-pagination a").bind("click",n),$("#buildSelect").trigger("change"),$(".compareThis").bindCompareThis()},0)},error:function(){}}),!1}function r(){e=$(this).val(),e&&$(".compareThis").show()}function i(){setTimeout(function(){var e=$("#recent-items tbody"),t=$("#itemType").val(),r=$("#slotType").val(),i=$("#sortAttributes").val(),s=$("#maxPrice").val(),o=$("#sellMethod").val(),u=[],a=window.location.pathname;t&&t!=""&&(a+="/type/"+t),r&&r!=""&&(a+="/slot/"+r),s&&s!=""&&(a+="/limit/"+s),o&&o!=""&&(a+="/sellMethod/"+o),i&&i!=""&&($("#sortAttributes_chzn ul li a").each(function(){u.push($("#sortAttributes option:eq("+$(this).attr("rel")+")").val())}),a+="/sort/"+u.join(",")),e.addClass("ui-state-disabled"),$("#recent-items tbody").html("<h3 style='color: #777; text-align: center;'>Loading</h3>"),$.ajax({url:a,type:"html",success:function(e){setTimeout(function(){$("#recent-items tbody").replaceWith(e),$("#item-pagination a").bind("click",n),$("#buildSelect").trigger("change"),$(".compareThis").bindCompareThis(),$("a[data-json]").each(function(){$(this).bindTooltip()})},0)}})},0)}var e=!1;$.fn.bindCompareThis=function(){$(this).click(function(){if(!e)return $($("<div style='padding: 20px'/>").html("<p>You need to select a build to compare against before comparing. The build selection box is located above the 'Filters & Sorting' options.</p>")).dialog({modal:!0,title:"Error: Choose a build first!",buttons:{Ok:function(){$(this).dialog("close")}}}),!1;if(e){var t=$("#build-"+e+" .build-passives").data("json"),n=$("#build-"+e),r=$("#build-"+e+" .build-items");buildItems=$("#build-"+e+" .build-items a"),heroClass=n.data("class"),calc(buildItems,t);var i={},s={},o={},u=null,a=[];jQuery.extend(o,stats);var f=$(this).data("item"),l=$("#item-"+f+" td.name a"),c=l.data("json"),h=c.slots;jQuery.extend(i,stats),$.each(h,function(n,o){var l=r.find("span."+o+" a");lastItem=l.data("json");switch(heroClass){case"barbarian":case"monk":case"demon-hunter":break;case"wizard":if(o=="offhand"&&c.type!="mojo")return!1;break;case"witch-doctor":if(o=="offhand"&&c.type!="source")return!1}l.data("json",c),calc($("#build-"+e+" .build-items a"),t),jQuery.extend(s,stats),u=$.diff(i,s),l.data("json",lastItem);var h=["EHP w/ Dodge","Melee EHP","Ranged EHP","Elite EHP","Physical EHP","Cold EHP","Fire EHP","Lightning EHP","Arcane/Holy EHP","Poison EHP","Physical Resistance","Cold Resistance","Fire Resistance","Lightning Resistance","Poison Resistance","Arcane/Holy Resistance"];$.each(h,function(e,t){delete u.mod[t]});var p={"Dodge Chance":"Dodge","Damage Reduction":"Dmg Reduce","Life per Hit":"Life/Hit","Attacks per Second":"Attacks/Sec","Critical Hit Damage":"Crit Dmg","Maximum Life":"Max Life",Strength:"STR",Dexterity:"DEX",Intelligence:"INT",Vitality:"VIT"};$.each(p,function(e,t){e in u.mod&&(u.mod[t]=u.mod[e]),e in i&&(i[t]=i[e]),e in s&&(s[t]=s[e]),delete u.mod[e],delete s[e],delete i[e]});var d=$("<table/>"),v=$("<tr/>").append("<th>Stat</th><th>Diff</th><th>Old</th><th>New</th>");if(Object.keys(u.mod).length>0){var v=$("<tr/>");$.each(u.mod,function(e,t){v.append($("<th/>").html(e))}),d.append(v);var m=$("<tr/>");$.each(u.mod,function(e,t){var n=Math.round((s[e]-i[e])*100)/100,r=Math.round(i[e]*100)/100,o=Math.round(s[e]*100)/100;n>0?m.append($("<td/>").html(n).addClass("bg-pos")):m.append($("<td/>").html(n).addClass("bg-neg")),d.append(m)}),$("#compared-item-"+f+"-"+n).remove();var g=l.clone();g.bindTooltip(),a[n]=$("<tr class='compared compared-to' id='compared-item-"+f+"-"+n+"'><td class='name wearing'></td><td class='diff' colspan='10'></td>"),a[n].find(".wearing").html("<p class='helper'>Compared to your item,</p>").append(g).append("<p class='helper'>the following stats change:</p>"),a[n].find(".diff").html(d),$("#item-"+f).after(a[n]),$("#item-"+f).addClass("compared-against")}})}}).css({cursor:"pointer"})},$(".compareThis").bindCompareThis(),$("#buildSelect").chosen({allow_single_deselect:!0}),$("#itemType").chosen({allow_single_deselect:!0}),$("#itemType").bind("change",i),$("#slotType").chosen({allow_single_deselect:!0}),$("#slotType").bind("change",i),$("#sellMethod").chosen({allow_single_deselect:!0}),$("#sellMethod").bind("change",i);var t=null;$("#maxPrice").keyup(function(){clearTimeout(t),t=setTimeout(function(){i()},500)}),$("#sortAttributes").chosen({allow_single_deselect:!0}),$("#sortAttributes").bind("change",i),$("#item-pagination a").bind("click",n),$("#buildSelect").bind("change",r)})