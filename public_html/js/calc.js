function statLabel(e,t,n,r){stats[e]=t;switch(n){case"per":t?t+="%":t="0%";break;case"round":t=Math.round(t*100)/100;default:}var i=e.replace(/\s+/g,"-").toLowerCase();t&&(t=t.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1,"));var s=$("<li/>").addClass("stat-"+i).html($("<span class='stat-helper'/>").html(e+": ")).append(t);return r&&s.append(" ("+r+"%)"),s}function calc(e,t){var n=[],r=[],i=[],s=!1;heroClass||(heroClass=$(e).parent().parent().parent().data("class")),$(e).each(function(){if($(this).attr("data-json")){var e=$(this).data("json"),t=$(this).parent().data("slot");gearJSON[t]=e,e.attrs&&$.each(e.attrs,function(t,n){switch(t){case"armor":if(e.type=="ring"||e.type=="amulet")r[t]?r[t]+=parseFloat(n):r[t]=parseFloat(n);break;case"plus-block":e.type!="shield"&&(r[t]?r[t]+=parseFloat(n):r[t]=parseFloat(n));break;case"max-damage":case"min-damage":switch(e.type){case"shield":case"belt":case"boots":case"bracers":case"chest-armor":case"cloak":case"gloves":case"helm":case"pants":case"mighty-belt":case"shoulder":case"spirit-stone":case"voodoo-mask":case"wizard-hat":case"ring":case"amulet":case"quiver":case"mojo":case"source":r[t]?r[t]+=parseFloat(n):r[t]=parseFloat(n);break;default:}break;case"attack-speed":switch(e.type){case"shield":case"belt":case"boots":case"bracers":case"chest-armor":case"cloak":case"gloves":case"helm":case"pants":case"mighty-belt":case"shoulder":case"spirit-stone":case"voodoo-mask":case"wizard-hat":case"ring":case"amulet":case"quiver":case"mojo":case"source":i.push(n/100);break;default:}break;default:r[t]?r[t]+=parseFloat(n):r[t]=parseFloat(n)}}),e.socketAttrs&&$.each(e.socketAttrs,function(e,t){r[e]?r[e]+=parseFloat(t):r[e]=parseFloat(t)}),e.stats&&$.each(e.stats,function(e,r){switch(e){case"speed":t=="mainhand"&&(n[e]=parseFloat(r)),t=="offhand"&&(s=!0,n["speed-oh"]=parseFloat(r));break;case"damage":t=="mainhand"&&(n[e]={min:r.min,max:r.max}),t=="offhand"&&(n["damage-oh"]={min:r.min,max:r.max});break;case"block-amount":n[e]=r.min+"-"+r.max;break;default:n[e]?n[e]+=parseFloat(r):n[e]=parseFloat(r)}})}});var o=0;r.dexterity||(r.dexterity=0),r.vitality||(r.vitality=0),r.strength||(r.strength=0),r.intelligence||(r.intelligence=0);switch(heroClass){case"wizard":case"witch-doctor":r.strength+=67,r.dexterity+=67,r.intelligence+=187,o=r.intelligence;break;case"barbarian":r.strength+=187,r.dexterity+=67,r.intelligence+=67,o=r.strength;break;case"demon-hunter":case"monk":r.strength+=67,r.dexterity+=187,r.intelligence+=67,o=r.dexterity}r.vitality+=127;var u=276+35*r.vitality,a=r["plus-life"]?r["plus-life"]:0,f=Math.round(u+u*a*.01),l=selectVs.val()?selectVs.val():60,c=(n.armor?n.armor:0)+r.strength+(r.armor?r.armor:0),h=c/(50*l+c),p=Math.round(r["resist-all"]+r.intelligence/10),d={physical:p+(r["physical-resist"]?r["physical-resist"]:0),cold:p+(r["cold-resist"]?r["cold-resist"]:0),fire:p+(r["fire-resist"]?r["fire-resist"]:0),lightning:p+(r["lightning-resist"]?r["lightning-resist"]:0),poison:p+(r["poison-resist"]?r["poison-resist"]:0),arcane:p+(r["arcane-resist"]?r["arcane-resist"]:0)},v=Math.round(h*100*100)/100,m=r.dexterity,g=0,y=[[100,.1],[400,.025],[500,.02],[7e3,.01]],b=(n["block-chance"]?n["block-chance"]:0)+(r["plus-block"]?r["plus-block"]:0);m>0&&$.each(y,function(e,t){m>t[0]?(m-=t[0],g+=t[0]*t[1]):(g+=m*t[1],m=0)});var w=n.speed,E=0,S=n.damage,x=n.dps,T=0,N=0,C=0,k=0,L=!1,A=!1,O=5+(r["critical-hit"]?r["critical-hit"]:0),M=50+(r["critical-hit-damage"]?r["critical-hit-damage"]:0),_=!1;typeof S=="undefined"&&(S={min:0,max:0});if(!t)var t=passiveSelect.val();t&&$.each(t,function(e,t){typeof passives[heroClass][t]["effect"]!="undefined"&&$.each(passives[heroClass][t].effect,function(e,t){switch(e){case"sharpshooter":A="Sharpshooter",L=((S.min+S.max)/2+T)*n.speed*E*(o/100+1)*1*(1*(M/100)+1),L=Math.round(k*100)/100;break;case"plus-armor":c=Math.round(c*(1+t)*100)/100,h=c/(50*l+c),v=Math.round(h*100*100)/100;break;case"plus-thorns":r.thorns&&(r.thorns=r.thorns*(1+t));break;case"plus-damage":_?_+=t:_=t;break;case"flatten-resists":var i=0;$.each(d,function(e,t){t>0&&t>i&&(i=t)}),$.each(d,function(e,t){d[e]=i});break;case"plus-resist-all":p*=1+t,d.physical=d.physical*(1+t),d.cold=d.cold*(1+t),d.fire=d.fire*(1+t),d.lightning=d.lightning*(1+t),d.poison=d.poison*(1+t),d.arcane=d.arcane*(1+t);break;case"melee-reduce":case"plus-movement-speed":case"max-spirit":case"max-hatred":case"max-fury":case"life-steal":case"cc-reduce":r[e]?r[e]+=t*100:r[e]=t*100;break;case"reduce-damage":v*=1+t;break;case"health-globes":r["health-globes"]&&r["health-globes"]>0&&(r["health-globes"]=r["health-globes"]*(1+t));break;case"critical-to-dodge":g+=g*t;break;case"dexterity-to-armor":c+=r.dexterity*t,h=c/(50*l+c),v=Math.round(h*100*100)/100;break;case"vitality-to-armor":c+=r.vitality*t;break;case"critical-hit-damage":M+=t*100;break;case"plus-mana":r["max-mana"]&&(r["max-mana"]=r["max-mana"]+r["max-mana"]*t);break;case"critical-hit":O+=t*100;break;case"switch":typeof gearJSON[t.var]!="undefined"&&$.each(t.cases,function(e,n){var r=!1;$.each(n.case.split("|"),function(e,r){r==gearJSON[t.var][t.lookup]&&$.each(n.effect,function(e,t){switch(e){case"plus-damage":_?_+=t:_=t;break;case"critical-hit-damage":M+=t*100;break;case"attack-speed":w*=1+t;break;case"plus-damage":k=Math.round(k*(1+t)*100)/100;break;case"critical-hit":O+=t*100;break;default:console.log("Unhandled Switch: "+e+" ["+t+"]")}})})});break;default:console.log("Unhandled Effect: "+e+"["+t+"]")}})});if(r["max-damage"]||r["min-damage"])T=((r["max-damage"]?r["max-damage"]:0)+(r["min-damage"]?r["min-damage"]:0))/2,r["min-damage"]&&(N=r["min-damage"]),r["max-damage"]&&(C=r["max-damage"]);$.each(i,function(e,t){E+=t});var D=x*w*(r.intelligence/100),P=D*1.74*.325;if(S){if(s){var H=n["damage-oh"];E=Math.round(E*1e3)/1e3,console.log(n.speed,n["speed-oh"],E),n.speed=Math.floor(n.speed*1024)/1024,n["speed-oh"]=Math.floor(n["speed-oh"]*1024)/1024;var B=((S.min+S.max+H.min+H.max)/2+N+C)/2,j=(n.speed+n["speed-oh"])/2,F=1.15+E,I=1+o/100,q=1+O/100*(M/100),k=Math.round(B*j*F*I*q*100)/100,w=Math.round(w*(1+E+.15)*100)/100,R=(n.speed+n["speed-oh"])/2,U=1/(Math.round(n.speed*1024)/1024*(1+E))+1/(Math.round(n["speed-oh"]*1024)/1024*(1+E));console.log(R,j,E)}else n.speed=Math.floor(n.speed*1024)/1024,w=Math.round(w*(1+E)*100)/100,k=((S.min+S.max)/2+T)*n.speed*(1+E)*(o/100+1)*1*(O/100*(M/100)+1),k=Math.round(k*100)/100;_&&(k=Math.round(k*(1+_)*100)/100)}var z={all:Math.round(p/(5*l+p)*100*100)/100,physical:Math.round(d.physical/(5*l+d.physical)*100*100)/100,cold:Math.round(d.cold/(5*l+d.cold)*100*100)/100,fire:Math.round(d.fire/(5*l+d.fire)*100*100)/100,lightning:Math.round(d.lightning/(5*l+d.lightning)*100*100)/100,poison:Math.round(d.poison/(5*l+d.poison)*100*100)/100,arcane:Math.round(d.arcane/(5*l+d.arcane)*100*100)/100},W=v/100,X=p/(5*l+p),V=(1-X)*(1-W),J=r["melee-reduce"]?r["melee-reduce"]:0,K=r["range-reduce"]?r["range-reduce"]:0,Q=r["elite-reduce"]?r["elite-reduce"]:0,G=d.physical/(5*l+d.physical),Y=d.cold/(5*l+d.cold),Z=d.fire/(5*l+d.fire),et=d.lightning/(5*l+d.lightning),tt=d.poison/(5*l+d.poison),nt=d.arcane/(5*l+d.arcane),rt=f/((1-X)*(1-G)),it=f/((1-X)*(1-Y)),st=f/((1-X)*(1-Z)),ot=f/((1-X)*(1-et)),ut=f/((1-X)*(1-tt)),at=f/((1-X)*(1-nt));if(heroClass=="monk"||heroClass=="barbarian"){V=(1-X)*(1-W)*.7;var rt=f/((1-X)*(1-G)*.7),it=f/((1-X)*(1-Y)*.7),st=f/((1-X)*(1-Z)*.7),ot=f/((1-X)*(1-et)*.7),ut=f/((1-X)*(1-tt)*.7),at=f/((1-X)*(1-nt)*.7)}var ft=f/V,lt=V*(1-g/100),ct=V*(1-J/100),ht=V*(1-K/100),pt=V*(1-Q/100),dt=f/lt,vt=f/ct,mt=f/ht,gt=f/pt,yt={};$(e).each(function(){var e=$(this).data("json"),t=$(this).parent().data("slot"),n={mathEHP:0,mathReduction:0,resistAll:0,armor:0,intelligence:0,vitality:127,life:0};e.stats&&e.stats.armor&&(n.armor+=e.stats.armor),e.attrs&&(e.attrs.intelligence&&(n.intelligence+=e.attrs.intelligence),e.attrs.strength&&(n.armor+=e.attrs.strength),e.attrs["resist-all"]&&(n.resistAll+=e.attrs["resist-all"]),e.attrs.vitality&&(n.vitality+=e.attrs.vitality)),e.socketAttrs&&(e.socketAttrs.vitality,e.socketAttrs.intelligence&&(n.intelligence+=e.socketAttrs.intelligence),e.socketAttrs.strength&&(n.armor+=e.socketAttrs.strength)),n.life=276+35*n.vitality,e.socketAttrs&&e.socketAttrs["plus-life"]&&(n.life=n.life*(1+e.socketAttrs.plusLife)),n.armor&&(n.mathReduction=n.armor/(50*l*n.armor)),n.mathAllResist=Math.round(n.resistAll+n.intelligence/10),n.mathAR=n.mathAllResist/(5*parseInt(l)+n.mathAllResist),n.mathDT=(1-n.mathAR)*(1-n.mathReduction),n.mathDT&&(n.mathEHP=n.life/n.mathDT),yt[t]=n.mathEHP}),$("#stats-ehp-gear").html("");var bt=$("<ul class='resist-specific'/>").append($("<li class='header'/>").html("Gear Based EHP (<a href='/faq/gear-based-ehp'>?</a>)"));$.each(yt,function(e,t){t&&t>4721&&bt.append(statLabel(e+" EHP",t,"round"))}),$("#stats-ehp-gear").append(bt),tabEHP.empty(),tabEHP.append(statLabel("EHP",ft,"round")),tabEHP.append(statLabel("EHP w/ Dodge",dt,"round")),tabEHP.append($("<ul class='resist-specific'/>").append($("<li class='header'/>").html("Damage Type EHP"),statLabel("Melee EHP",vt,"round"),statLabel("Ranged EHP",mt,"round"),statLabel("Elite EHP",gt,"round"))),tabEHP.append($("<ul class='resist-specific'/>").append($("<li class='header'/>").html("Elemental EHP"),statLabel("Physical EHP",rt,"round"),statLabel("Cold EHP",it,"round"),statLabel("Fire EHP",st,"round"),statLabel("Lightning EHP",ot,"round"),statLabel("Poison EHP",ut,"round"),statLabel("Arcane/Holy EHP",at,"round"))),tabBase.empty(),tabBase.append(statLabel("Strength",r.strength)),tabBase.append(statLabel("Dexterity",r.dexterity)),tabBase.append(statLabel("Intelligence",r.intelligence)),tabBase.append(statLabel("Vitality",r.vitality)),tabBase.append(statLabel("Magic Find",r["plus-magic-find"],"per")),tabBase.append(statLabel("Gold Find",r["plus-gold-find"],"per")),tabDefense.empty(),tabDefense.append(statLabel("Armor",c,"",v)),tabDefense.append(statLabel("All Resist",p,"round",z.all)),tabDefense.append(statLabel("Block Amount",n["block-amount"]?n["block-amount"]:"~")),tabDefense.append(statLabel("Block Chance",b,"per")),tabDefense.append(statLabel("Dodge Chance",Math.round(g*10)/10,"per")),tabDefense.append(statLabel("Damage Reduction",v,"per")),tabDefense.append(statLabel("Physical Resistance",d.physical,"round",z.physical)),tabDefense.append(statLabel("Cold Resistance",d.cold,"round",z.cold)),tabDefense.append(statLabel("Fire Resistance",d.fire,"round",z.fire)),tabDefense.append(statLabel("Lightning Resistance",d.lightning,"round",z.lightning)),tabDefense.append(statLabel("Poison Resistance",d.poison,"round",z.poison)),tabDefense.append(statLabel("Arcane/Holy Resistance",d.arcane,"round",z.arcane)),tabDefense.append(statLabel("Crowd Control Reduction",r["cc-reduce"]?r["cc-reduce"]:0,"per")),tabDefense.append(statLabel("Missile Damage Reduction",K,"per")),tabDefense.append(statLabel("Melee Damage Reduction",J,"per")),tabDefense.append(statLabel("Elite Damage Reduction",Q,"per")),tabDefense.append(statLabel("Thorns",r.thorns)),tabOffense.empty(),tabOffense.append(statLabel("DPS",k)),L&&tabOffense.append(statLabel("DPS w/ "+A,k)),tabOffense.append(statLabel("Attacks per Second",w)),tabOffense.append(statLabel("Critical Hit Chance",O,"per")),tabOffense.append(statLabel("Critical Hit Damage",M,"per")),tabLife.empty(),tabLife.append(statLabel("Maximum Life",f)),tabLife.append(statLabel("Total Life Bonus",a,"per")),tabLife.append(statLabel("Life per Second",r["life-regen"]?r["life-regen"]:0)),tabLife.append(statLabel("Life Steal",r["life-steal"]?r["life-steal"]:0,"per")),tabLife.append(statLabel("Life per Kill",r["life-kill"]?r["life-kill"]:0)),tabLife.append(statLabel("Life per Hit",r["life-hit"]?r["life-hit"]:0)),tabLife.append(statLabel("Health Globe Healing Bonus",r["health-globes"]?r["health-globes"]:0)),tabLife.append(statLabel("Bonus to Gold/Globe Radius",r["plus-pickup-radius"]?r["plus-pickup-radius"]:0))}function calcDiff(e,t){var n=$("#compared-slot").find(":selected").val(),r=stats;itemDisplay=$("#equipped-"+n);var i=$("<a/>"),s=itemDisplay.html(),o=!1,u=[];switch(t.type){case"2h-mace":case"2h-axe":case"diabo":case"2h-mighty":case"polearm":case"staff":case"2h-sword":$("#equipped-offhand a").length&&(o=JSON.parse($("#equipped-offhand a").attr("data-json")),$("#equipped-offhand").html(""),u.push("We notice you're comparing a two-handed weapon vs your currently equipped mainhand + off-hand items. We've adjusted the comparision slightly so you can see the actual stats between your mainhand + offhand VS the two-hander (without the offhand)."))}i.attr("href","/i/"+t.id),i.attr("data-json",JSON.stringify(t)),i.addClass("quality-"+t.quality),i.html(t.name),i.bindTooltip(),itemDisplay.html(i),calc(".equipped a");var a={};jQuery.extend(a,stats);if(o){var f=$("<a/>").attr("href","/i/"+o.id).attr("data-json",JSON.stringify(o)).addClass("quality-"+o.quality).html(o.name);f.bindTooltip(),$("#equipped-offhand").append(f)}itemDisplay.html(s),itemDisplay.find("a").bindTooltip(),calc(".equipped a"),$("#compare-notes").html(""),u.length>0&&$.each(u,function(e,t){$("#compare-notes").append(t)});var l=$("<div/>"),c=$("<div/>").append("Old Item: ",s),h=$("<div/>").append("New Item: ",i),p=$.diff(e,a),d=$("<table/>");return header=$("<tr/>").append("<th>Stat</th><th>Diff</th><th>Old</th><th>New</th>"),o&&c.append(" (+"+$("#equipped-offhand").html()+")"),l.append(c,h),d.append(header),Object.keys(p.mod).length>0?($.each(p.mod,function(t,n){var r=Math.round((a[t]-e[t])*100)/100,i=$("<tr/>");i.append($("<td/>").html(t));var s=Math.round(e[t]*100)/100,o=Math.round(a[t]*100)/100;s>99999&&(s=Math.round(s/10)/100+"k"),o>99999&&(o=Math.round(o/10)/100+"k"),r>0?(i.append($("<td/>").html("+"+r).addClass("pos")),i.append($("<td class='neg'/>").html(s)),i.append($("<td class='pos'/>").html(o))):(i.append($("<td/>").html(r).addClass("neg")),i.append($("<td class='pos'/>").html(s)),i.append($("<td class='neg'/>").html(o))),d.append(i)}),d.append("<tr><td colspan='10'><span class='pos'>Green = Increase</span> / <span class='neg'>Red = Decrease</span></td></tr>")):d.append("<tr><td colspan='10' style='text-align: center; font-weight: bold;'>These items are identical.</td></tr>"),l.find("div a").each(function(){$(this).bindTooltip()}),$(".compare-diff").empty().append(l,d),p.mod}Object.keys||(Object.keys=function(e){var t=[],n;for(n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.push(n);return t}),String.prototype.capitalize=function(){return this.replace(/(^|\s)([a-z])/g,function(e,t,n){return t+n.toUpperCase()})};var stats=[],gearJSON={},tabOffense=$("#stats-offense"),tabDefense=$("#stats-defense"),tabBase=$("#stats-base"),tabLife=$("#stats-life"),tabMisc=$("#stats-misc"),tabEHP=$("#stats-ehp"),tabEHPGear="#stats-ehp-gear",selectVs=$("#vsLevel"),heroClass=$("#character").data("class"),isOwner=$("#character").data("owner"),actives={barbarian:{},"demon-hunter":{},monk:{},"witch-doctor":{},wizard:{}},passives={barbarian:{"pound-of-flesh":{desc:'Increases the chance of finding a health globe by <span class="skill-highlight">25%</span> and you gain <span class="skill-highlight">100%</span> additional Life from health globes.',effect:{"health-globes":1}},ruthless:{desc:'Critical Hit Chance increased by <span class="skill-highlight">5%</span>. Critical Hit Damage increased by <span class="skill-highlight">50%</span>.',effect:{"critical-hit":.05,"critical-hit-damage":.5}},"nerves-of-steel":{desc:'Your Armor is increased by <span class="skill-highlight">100%</span> of your Vitality.',effect:{"vitality-to-armor":1}},"weapons-master":{desc:'Gain a bonus based on the weapon type of your main hand weapon:<br />Swords/Daggers: <span class="skill-highlight">15%</span> increased damage<br />Maces/Axes: <span class="skill-highlight">10%</span> Critical Hit Chance<br />Polearms/Spears: <span class="skill-highlight">10%</span> attack speed<br />Mighty Weapons: <span class="skill-highlight">3</span> Fury per hit',effect:{"switch":{lookup:"type","var":"mainhand",cases:[{"case":"sword|dagger|2h-sword",effect:{"plus-damage":.15}},{"case":"mace|axe|2h-axe|2h-mace",effect:{"critical-hit":.1}},{"case":"spear|polearm",effect:{"attack-speed":.1}},{"case":"mighty|2h-mighty",effect:{}}]}}},"berserker-rage":{desc:'You inflict an additional <span class="skill-highlight">25%</span> damage while at maximum Fury.'},"inspiring-presence":{desc:'The duration of your shouts is doubled. After using a shout you regenerate <span class="skill-highlight">1%</span> of your maximum Life per second for <span class="skill-highlight">60</span> seconds.'},bloodthirst:{desc:'Gain <span class="skill-highlight">3%</span> of all damage done as Life.',effect:{"life-steal":.03}},animosity:{desc:'Increases Fury generation by <span class="skill-highlight">10%</span> and maximum Fury is increased by <span class="skill-highlight">20</span>.',effect:{"max-fury":20}},superstition:{desc:'Reduces all non-Physical damage by <span class="skill-highlight">20%</span>. Whenever you take damage from a ranged or elemental attack, you have a chance to gain <span class="skill-highlight">3</span> Fury.'},"tough-as-nails":{desc:'Increases Armor by <span class="skill-highlight">25%</span>.<br />Thorns damage dealt increased by <span class="skill-highlight">50%</span>.',effect:{"plus-armor":.25,"plus-thorns":.5}},"no-escape":{desc:'Increases the damage of Ancient Spear and Weapon Throw by <span class="skill-highlight">10%</span>. In addition, a Critical Hit with Ancient Spear resets the cooldown while Critical Hits with Weapon Throw have a chance to return <span class="skill-highlight">14</span> Fury.'},relentless:{desc:'While below <span class="skill-highlight">20%</span> Life, all skills cost no Fury and all damage taken is reduced by <span class="skill-highlight">50%</span>.'},brawler:{desc:'As long as there are <span class="skill-highlight">3</span> enemies within <span class="skill-highlight">8</span> yards, all of your damage is increased by <span class="skill-highlight">30%</span>.'},juggernaut:{desc:'The duration of control impairing effects on you are reduced by <span class="skill-highlight">20%</span>. In addition, whenever a Stun, Fear, Immobilize or Charm is cast on you, you have a chance to recover <span class="skill-highlight">15%</span> of your maximum Life.',effect:{"cc-reduce":.2}},unforgiving:{desc:'You no longer degenerate Fury. Instead, you gain <span class="skill-highlight">1</span> Fury every <span class="skill-highlight">2</span> seconds.'},"boon-of-bul-kathos":{desc:'The cooldown on your Earthquake, Call of the Ancients, and Wrath of the Berserker skills is reduced by <span class="skill-highlight">30</span> seconds.'}},monk:{"fleet-footed":{desc:'Increases movement speed by <span class="skill-highlight">10%</span>.',effect:{"plus-movement-speed":.1}},resolve:{desc:'Damage you deal reduces enemy damage by <span class="skill-highlight">25%</span> for <span class="skill-highlight">2.5</span> seconds.'},"exalted-soul":{desc:'Increases maximum Spirit by <span class="skill-highlight">100</span>.',effect:{"max-spirit":100}},transcendence:{desc:'Every point of Spirit spent heals you for <span class="skill-highlight">62.0</span> Life.'},"chant-of-resonance":{desc:'Duration of all Mantras increased by <span class="skill-highlight">7</span> minutes. While one of your Mantras is active you gain <span class="skill-highlight">2</span> Spirit every second.'},"seize-the-initiative":{desc:'Your Armor is increased by <span class="skill-highlight">100%</span> of your Dexterity.',effect:{"dexterity-to-armor":1}},"the-guardians-path":{desc:'While dual-wielding, you gain a <span class="skill-highlight">15%</span> chance to dodge incoming attacks. While using a two-handed weapon, all Spirit generation is increased by <span class="skill-highlight">25%</span>.',effect:{"switch":{"var":"slot",cases:[{"case":"mainhand|offhand",effect:{"plus-dodge":.15}},{"case":"mainhand",effect:{"plus-spirit-regen":.25}}]}}},"sixth-sense":{desc:'Your dodge chance is increased by an amount equal to <span class="skill-highlight">30%</span> of your Critical Hit Chance.',effect:{"critical-to-dodge":.3}},pacifism:{desc:'While you are under a Stun, Fear or Charm effect, all damage taken is reduced by <span class="skill-highlight">75%</span>.'},"beacon-of-ytar":{desc:'Reduces all cooldowns by <span class="skill-highlight">15%</span>.'},"guiding-light":{desc:'Whenever you use a direct heal skill on another player you and the other player deal <span class="skill-highlight">16%</span> more damage for <span class="skill-highlight">15</span> seconds.'},"one-with-everything":{desc:"Your resistance to all elements is equal to your highest elemental resistance.",effect:{"flatten-resists":1}},"combination-strike":{desc:'Each different Spirit Generator ability you use increases your damage by <span class="skill-highlight">8%</span> for <span class="skill-highlight">3</span> seconds.'},"near-death-experience":{desc:'When receiving fatal damage, you are instead restored to <span class="skill-highlight">35%</span> of maximum Life and <span class="skill-highlight">35%</span> Spirit.'}},wizard:{blur:{desc:'Decreases melee damage taken by <span class="skill-highlight">20%</span>.',effect:{"melee-reduce":.2}},"power-hungry":{desc:'Gain <span class="skill-highlight">30</span> Arcane Power whenever you are healed by a health globe.'},evocation:{desc:'Reduces all cooldowns by <span class="skill-highlight">15%</span>.'},"glass-cannon":{desc:'Increases all damage done by <span class="skill-highlight">15%</span>, but decreases Armor and resistances by <span class="skill-highlight">10%</span>.',effect:{"plus-damage":.15,"plus-resist-all":-0.1,"plus-armor":-0.1}},prodigy:{desc:'When you deal damage with a Signature spell, you gain <span class="skill-highlight">4</span> Arcane Power.<br/>The following skills are Signature spells:<ul><li>Magic Missile</li><li>Shock Pulse</li><li>Spectral Blade</li><li>Electrocute</li></ul>'},"astral-presence":{desc:'Increases your maximum Arcane Power by <span class="skill-highlight">20</span> and Arcane Power regeneration by <span class="skill-highlight">2</span> per second.'},illusionist:{desc:'Whenever you suffer more than <span class="skill-highlight">15%</span> of your Life in a single hit, the cooldowns on Mirror Image and Teleport are automatically reset.'},"cold-blooded":{desc:'Cold damage dealt to chilled and frozen targets is increased by <span class="skill-highlight">20%</span>.'},conflaguration:{desc:'Fire damage dealt to enemies applies a burning effect, increasing all damage done to them by <span class="skill-highlight">10%</span> for 3 seconds.'},paralysis:{desc:'Lightning damage dealt to enemies has up to a <span class="skill-highlight">8%</span> chance to Stun the target for <span class="skill-highlight">2</span> seconds.'},"galvanizing-ward":{desc:'Increases the duration of your Armor spells by <span class="skill-highlight">120</span> seconds. As long as an Armor spell is active, you gain <span class="skill-highlight">310</span> Life per second. The following skills are improved:<ul><li>Energy Armor</li><li>Ice Armor</li><li>Storm Armor</li></ul>'},"temporal-flux":{desc:'Whenever you deal Arcane damage, enemies are slowed by <span class="skill-highlight">30%</span> for <span class="skill-highlight">2</span> seconds.'},"critical-mass":{desc:'Critical Hits have a chance to reduce the cooldown of your spells by <span class="skill-highlight">1</span> second.'},"arcane-dynamo":{desc:'When you deal damage with a Signature spell you may gain a Flash of Insight. After 5 Flashes of Insight, your next non-Signature spell deals <span class="skill-highlight">75%</span> additional damage. The following skills are Signature spells:<ul><li>Magic Missile</li><li>Shock Pulse</li><li>Spectral Blade</li><li>Electrocute</li></ul>'},"unstable-anomaly":{desc:'When reduced below <span class="skill-highlight">20%</span> Life, release a shockwave that knocks all enemies back. This effect cannot occur more than once every 60 seconds.'}},"demon-hunter":{"tactical-advantage":{desc:'Whenever you use Vault, Smoke Screen, or backflip with Evasive Fire you gain <span class="skill-highlight">60%</span> movement speed for <span class="skill-highlight">2</span> seconds.'},"thrill-of-the-hunt":{desc:'Every <span class="skill-highlight">10</span> seconds, your next bow attack will immobilize your target for <span class="skill-highlight">3</span> seconds.'},vengeance:{desc:'Your maximum Hatred is increased by <span class="skill-highlight">25</span>. In addition, gain <span class="skill-highlight">20</span> Hatred and <span class="skill-highlight">2</span> Discipline whenever you are healed by a health globe.',effect:{"max-hatred":25}},"steady-aim":{desc:'As long as there are no enemies within <span class="skill-highlight">10</span> yards, all damage is increased by <span class="skill-highlight">20%</span>.',effect:{"plus-damage":.2}},"cull-the-weak":{desc:'Damage against slowed enemies increased by <span class="skill-highlight">15%</span>.'},"night-stalker":{desc:'Critical Hits have a chance to restore <span class="skill-highlight">1</span> Discipline.'},brooding:{desc:'As long as you have not taken damage in the last <span class="skill-highlight">3</span> seconds you gain <span class="skill-highlight">1%</span> of your maximum Life per second.'},"hot-pursuit":{desc:'Whenever you are at full Hatred, movement speed is increased by <span class="skill-highlight">15%</span>.'},archery:{desc:'Gain a bonus based on the weapon type of your main hand weapon:<br />Bow: <span class="skill-highlight">15%</span> increased damage<br />Crossbows: <span class="skill-highlight">50%</span> Critical Hit Damage<br />Hand Crossbows: <span class="skill-highlight">10%</span> Critical Hit Chance',effect:{"switch":{lookup:"type","var":"mainhand",cases:[{"case":"bow",effect:{"plus-damage":.15}},{"case":"crossbow",effect:{"critical-hit-damage":.5}},{"case":"hand-crossbow",effect:{"critical-hit":.1}}]}}},"numbing-traps":{desc:'Enemies hit by Fan of Knives, Spike Trap, and Caltrops have their damage reduced by <span class="skill-highlight">25%</span> for <span class="skill-highlight">3</span> seconds.'},perfectionist:{desc:'Reduces the Discipline cost of all skills by <span class="skill-highlight">10%</span>.'},"custom-engineering":{desc:'The duration of your Caltrops, Marked for Death, Spike Trap, and Sentry is increased by <span class="skill-highlight">100%</span>.'},grenadier:{desc:'Increases Hatred generated from Grenades by <span class="skill-highlight">2</span> and reduces the Hatred cost of Cluster Arrow by <span class="skill-highlight">10</span>. Upon death, you drop a giant grenade that explodes for <span class="skill-highlight">450%</span> weapon damage as Fire.'},sharpshooter:{desc:'Gain <span class="skill-highlight">3%</span> Critical Hit Chance every second. This bonus is reset <span class="skill-highlight">1</span> second after you successfully critically hit.',effect:{sharpshooter:!0}},ballistics:{desc:'Damage from rockets increased by <span class="skill-highlight">50%</span>. '}},"witch-doctor":{"circle-of-life":{desc:'Whenever an enemy dies within <span class="skill-highlight">12</span> yards, there is a <span class="skill-highlight">5%</span> chance that a Zombie Dog will automatically emerge. The range of this effect is increased by items that increase your gold pickup radius.'},"jungle-fortitude":{desc:'Reduces all damage taken by you and your pets by <span class="skill-highlight">20%</span>.',effect:{"reduce-damage":.2}},"spiritual-attunement":{desc:'Maximum Mana is increased by <span class="skill-highlight">20%</span>. Regenerate <span class="skill-highlight">1%</span> of your maximum Mana per second.',effect:{"plus-mana":.2}},"gruesome-feast":{desc:'Whenever you are healed by a health globe, you gain <span class="skill-highlight">10%</span> of your maximum Mana and <span class="skill-highlight">10%</span> Intelligence for <span class="skill-highlight">10</span> seconds. The Intelligence bonus can stack up to <span class="skill-highlight">5</span> times.'},"bad-medicine":{desc:'Whenever you deal Poison damage to an enemy, their damage is reduced by <span class="skill-highlight">20%</span> for <span class="skill-highlight">3</span> seconds.'},"blood-ritual":{desc:'<span class="skill-highlight">15%</span> of Mana costs are paid with Life. In addition, you regenerate <span class="skill-highlight">1%</span> of your maximum Life per second.'},"zombie-handler":{desc:'You can have <span class="skill-highlight">4</span> Zombie Dogs summoned at one time. The health of your Zombie Dogs and Gargantuan is increased by <span class="skill-highlight">20%</span>.'},"pierce-the-veil":{desc:'All of your damage is increased by <span class="skill-highlight">20%</span>, but your Mana costs are increased by <span class="skill-highlight">30%</span>.',effect:{"plus-damage":.2}},"fetish-sycophants":{desc:'Whenever you cast a physical realm spell, you have a <span class="skill-highlight">3%</span> chance to summon a dagger-wielding Fetish to fight by your side for <span class="skill-highlight">60</span> seconds.'},"spirit-vessel":{desc:'Reduces the cooldown of your Horrify, Spirit Walk, and Soul Harvest spells by <span class="skill-highlight">2</span> seconds. In addition, the next time you receive fatal damage, you automatically enter the spirit realm for <span class="skill-highlight">3</span> seconds and heal to <span class="skill-highlight">10%</span> of your maximum Life. This effect cannot occur more than once every <span class="skill-highlight">90</span> seconds.'},"rush-of-essence":{desc:'Spirit spells return <span class="skill-highlight">30%</span> of their Mana cost over <span class="skill-highlight">10</span> seconds.'},"vision-quest":{desc:'Any time you have <span class="skill-highlight">4</span> or more skills on cooldown, your Mana regeneration is increased by <span class="skill-highlight">300%</span>.'},"fierce-loyalty":{desc:'All your pets get <span class="skill-highlight">100%</span> of the benefit of your Thorns and Life regeneration items.'},"grave-injustice":{desc:'Whenever an enemy dies within <span class="skill-highlight">8</span> yards, regain <span class="skill-highlight">1%</span> of your maximum Life and Mana and the cooldown on all of your abilities is reduced by <span class="skill-highlight">1</span> second. This range is extended by items that increase your gold pickup radius.'},"tribal-rites":{desc:'The cooldowns of your Fetish Army, Big Bad Voodoo, and Hex abilities are reduced by <span class="skill-highlight">25%</span>.'}}},passiveSelect=$("#passives"),passiveDisplay=$("#passive-display");passives&&passives[heroClass]&&$.each(passives[heroClass],function(e,t){var n="";typeof activePassives!="undefined"&&$.each(activePassives,function(t,r){e==r&&(n='selected="selected"')}),passiveSelect.append($("<option value='"+e+"' "+n+"/>").html(e.replace(/\-/g," ").capitalize()))}),passiveSelect.chosen({placeholder:"Which passives skills are you using?",allowClear:!0}),passiveSelect.bind("change",function(){var e=$(this).val()?$(this).val():[];(!e||activePassives.length!=e.length)&&isOwner&&$.ajax({data:{a:"passive-skills",passives:e}}),passiveDisplay.empty(),$.each(e,function(e,t){var n=passives[heroClass][t],r=$("<span/>").append($("<strong>").html(t.replace(/\-/g," ").capitalize()+": "),n.desc);passiveDisplay.append($("<li/>").html(r))}),calc(".equipped a")}),passiveSelect.trigger("change"),selectVs.bind("change",function(){calc(".equipped a")}),isOwner&&$(".gear-change").click(function(){var e=$(this).data("item-type"),t=$("#equipped-"+e);if(e=="offhand"){var n=$("#equipped-mainhand a").data("json");switch(n.type){case"2h-mace":case"2h-axe":case"diabo":case"2h-mighty":case"polearm":case"staff":case"2h-sword":return $($("<div style='padding: 20px'/>").html("<p>You're currently wearing a two handed weapon, an offhand isn't allowed.")).dialog({modal:!0,buttons:{Ok:function(){$(this).dialog("close")}}}),!1}}$.ajax({url:"/item/fetch/type/"+e,cache:!1,dataType:"json",success:function(n){var r=$("#available-gear"),i=$("#gear-change");r.html(""),r.append("<option value=''>Nothing</option>"),$.each(n,function(e,t){var n=$.parseJSON(t),i=$("<option/>");i.attr("value",e),i.attr("data-json",t),i.html(n.name),i.bindTooltip(),r.append(i)}),i.dialog({width:800,modal:!0,buttons:{Equip:function(){var n=$(this);$.ajax({data:{a:"equip",slot:e,newItem:r.val(),stats:{dps:stats.DPS,ehp:stats.EHP}},success:function(e){if(r.val()!=""){var i=$("<a/>"),s=r.find(":selected"),o=$.parseJSON(s.attr("data-json"));switch(o.type){case"2h-mace":case"2h-axe":case"diabo":case"2h-mighty":case"polearm":case"staff":case"2h-sword":$("#equipped-offhand").html("Nothing")}i.attr("href","/i/"+r.val()),i.attr("data-json",JSON.stringify(o)),i.addClass("quality-"+o.quality),i.html(o.name),i.bindTooltip(),t.html(i)}else t.html("Nothing");n.dialog("close"),calc(".equipped a")}})},Cancel:function(){$(this).dialog("close")}}})}})});var compareTo=$("#compare-to");$("#compared-slot").bind("change",function(){var e=$(this).val();$.ajax({url:"/item/fetch/type/"+e,cache:!1,dataType:"json",success:function(e){compareTo.html(""),compareTo.append("<option value=''>Nothing</option>"),$.each(e,function(e,t){var n=$.parseJSON(t),r=$("<option/>");r.attr("value",e),r.attr("data-json",t),r.html(n.name),r.bindTooltip(),compareTo.append(r)})}})}),compareTo.bind("change",function(){var e={};jQuery.extend(e,stats);var t=$("#compared-slot").find(":selected").val(),n=$("#equipped-"+t+" a").data("json"),r=$(this).find(":selected").data("json"),i=calcDiff(e,r)})