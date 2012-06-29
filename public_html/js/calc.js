Object.keys||(Object.keys=function(e){var t=[],n;for(n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.push(n);return t}),String.prototype.capitalize=function(){return this.replace(/(^|\s)([a-z])/g,function(e,t,n){return t+n.toUpperCase()})},$(function(){function h(t,n,r,i){e[t]=n;switch(r){case"per":n+="%";break;case"round":n=Math.round(n*100)/100;default:}var s=t.replace(/\s+/g,"-").toLowerCase();n&&(n=n.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1,"));var o=$("<li/>").addClass("stat-"+s).html($("<span class='stat-helper'/>").html(t+": ")).append(n);return i&&o.append(" ("+i+"%)"),o}function p(e){var s=[],c=[],p=[],d={},v=!1;$(".equipped a").each(function(){if($(this).attr("data-json")){var e=$(this).data("json"),t=$(this).parent().data("slot");d[t]=e,e.attrs&&$.each(e.attrs,function(t,n){switch(t){case"armor":if(e.type=="ring"||e.type=="amulet")c[t]?c[t]+=parseFloat(n):c[t]=parseFloat(n);break;case"plus-block":e.type!="shield"&&(c[t]?c[t]+=parseFloat(n):c[t]=parseFloat(n));break;case"max-damage":case"min-damage":switch(e.type){case"shield":case"belt":case"boots":case"bracers":case"chest-armor":case"cloak":case"gloves":case"helm":case"pants":case"mighty-belt":case"shoulder":case"spirit-stone":case"voodoo-mask":case"wizard-hat":case"ring":case"amulet":case"quiver":case"mojo":case"source":c[t]?c[t]+=parseFloat(n):c[t]=parseFloat(n);break;default:}break;case"attack-speed":switch(e.type){case"shield":case"belt":case"boots":case"bracers":case"chest-armor":case"cloak":case"gloves":case"helm":case"pants":case"mighty-belt":case"shoulder":case"spirit-stone":case"voodoo-mask":case"wizard-hat":case"ring":case"amulet":case"quiver":case"mojo":case"source":p.push(n/100);break;default:}break;default:c[t]?c[t]+=parseFloat(n):c[t]=parseFloat(n)}}),e.socketAttrs&&$.each(e.socketAttrs,function(e,t){c[e]?c[e]+=parseFloat(t):c[e]=parseFloat(t)}),e.stats&&$.each(e.stats,function(e,n){switch(e){case"speed":t=="mainhand"&&(s[e]=parseFloat(n)),t=="offhand"&&(v=!0,s["speed-oh"]=parseFloat(n));break;case"damage":t=="mainhand"&&(s[e]={min:n.min,max:n.max}),t=="offhand"&&(s["damage-oh"]={min:n.min,max:n.max});break;case"block-amount":s[e]=n.min+"-"+n.max;break;default:s[e]?s[e]+=parseFloat(n):s[e]=parseFloat(n)}})}});var m=0;c.dexterity||(c.dexterity=0),c.vitality||(c.vitality=0),c.strength||(c.strength=0),c.intelligence||(c.intelligence=0);switch(a){case"wizard":case"witch-doctor":c.strength+=67,c.dexterity+=67,c.intelligence+=187,m=c.intelligence;break;case"barbarian":c.strength+=187,c.dexterity+=67,c.intelligence+=67,m=c.strength;break;case"demon-hunter":case"monk":c.strength+=67,c.dexterity+=187,c.intelligence+=67,m=c.dexterity}c.vitality+=127;var g=276+35*c.vitality,y=c["plus-life"]?c["plus-life"]:0,b=Math.round(g+g*y*.01),w=u.val()?u.val():60,E=(s.armor?s.armor:0)+c.strength+(c.armor?c.armor:0),S=E/(50*w+E),x=Math.round(c["resist-all"]+c.intelligence/10),T={physical:x+(c["physical-resist"]?c["physical-resist"]:0),cold:x+(c["cold-resist"]?c["cold-resist"]:0),fire:x+(c["fire-resist"]?c["fire-resist"]:0),lightning:x+(c["lightning-resist"]?c["lightning-resist"]:0),poison:x+(c["poison-resist"]?c["poison-resist"]:0),arcane:x+(c["arcane-resist"]?c["arcane-resist"]:0)},N=Math.round(S*100*100)/100,C=c.dexterity,k=0,L=[[100,.1],[500,.025],[1e3,.02],[8e3,.01]],A=(s["block-chance"]?s["block-chance"]:0)+(c["plus-block"]?c["plus-block"]:0);C>0&&$.each(L,function(e,t){C>t[0]?(C-=t[0],k+=t[0]*t[1]):(k+=C*t[1],C=0)});var O=s.speed,M=1,_=s.damage,D=s.dps,P=0,H=0,B=5+(c["critical-hit"]?c["critical-hit"]:0),j=50+(c["critical-hit-damage"]?c["critical-hit-damage"]:0);if(c["max-damage"]||c["min-damage"])P=((c["max-damage"]?c["max-damage"]:0)+(c["min-damage"]?c["min-damage"]:0))/2;$.each(p,function(e,t){M+=t}),O=Math.round(O*M*100)/100;var F=D*O*(c.intelligence/100),I=F*1.74*.325;if(_)if(v){var q=s["damage-oh"],R=(_.min+_.max)/2,U=(q.min+q.max)/2,z=P,W=M,X=s.speed,V=s["speed-oh"],J=B/100*(j/100)+1,H=Math.round((R+U+z*2)*((X+V)*(W+.15)/4)*J*(m/100)*100)/100;O=Math.round(O*1.15*100)/100}else H=((_.min+_.max)/2+P)*s.speed*M*(m/100+1)*1*(B/100*(j/100)+1),H=Math.round(H*100)/100;var K=l.val();K&&$.each(K,function(e,t){typeof f[a][t]["effect"]!="undefined"&&$.each(f[a][t].effect,function(e,t){switch(e){case"plus-armor":E=Math.round(E*(1+t)*100)/100,S=E/(50*w+E),N=Math.round(S*100*100)/100;break;case"plus-thorns":c.thorns&&(c.thorns=c.thorns*(1+t));break;case"plus-damage":H=Math.round(H*(1+t)*100)/100;break;case"flatten-resists":var n=0;$.each(T,function(e,t){t>0&&t>n&&(n=t)}),$.each(T,function(e,t){T[e]=n});break;case"plus-resist-all":x*=1+t,T.physical=T.physical*(1+t),T.cold=T.cold*(1+t),T.fire=T.fire*(1+t),T.lightning=T.lightning*(1+t),T.poison=T.poison*(1+t),T.arcane=T.arcane*(1+t);break;case"melee-reduce":case"plus-movement-speed":case"max-spirit":case"max-hatred":case"max-fury":case"life-steal":case"cc-reduce":c[e]?c[e]+=t*100:c[e]=t*100;break;case"reduce-damage":N*=1+t;break;case"health-globes":c["health-globes"]&&c["health-globes"]>0&&(c["health-globes"]=c["health-globes"]*(1+t));break;case"critical-to-dodge":k+=k*t;break;case"dexterity-to-armor":E+=c.dexterity*t;break;case"vitality-to-armor":E+=c.vitality*t;break;case"critical-hit-damage":j+=t*100;break;case"plus-mana":c["max-mana"]&&(c["max-mana"]=c["max-mana"]+c["max-mana"]*t);break;case"critical-hit":B+=t*100;break;case"switch":typeof d[t.var]!="undefined"&&$.each(t.cases,function(e,n){var r=!1;$.each(n.case.split("|"),function(e,r){r==d[t.var][t.lookup]&&$.each(n.effect,function(e,t){switch(e){case"critical-hit-damage":j+=t*100;break;case"attack-speed":O*=1+t;break;case"plus-damage":H=Math.round(H*(1+t)*100)/100;break;case"critical-hit":B+=t*100;break;default:console.log("Unhandled Switch: "+e+" ["+t+"]")}})})});break;default:console.log("Unhandled Effect: "+e+"["+t+"]")}})});var Q={all:Math.round(x/(5*w+x)*100*100)/100,physical:Math.round(T.physical/(5*w+T.physical)*100*100)/100,cold:Math.round(T.cold/(5*w+T.cold)*100*100)/100,fire:Math.round(T.fire/(5*w+T.fire)*100*100)/100,lightning:Math.round(T.lightning/(5*w+T.lightning)*100*100)/100,poison:Math.round(T.poison/(5*w+T.poison)*100*100)/100,arcane:Math.round(T.arcane/(5*w+T.arcane)*100*100)/100},G=N/100,Y=x/(5*w+x),Z=c["melee-reduce"]?c["melee-reduce"]:0,et=c["range-reduce"]?c["range-reduce"]:0,tt=c["elite-reduce"]?c["elite-reduce"]:0,nt=T.physical/(5*w+T.physical),rt=T.cold/(5*w+T.cold),it=T.fire/(5*w+T.fire),st=T.lightning/(5*w+T.lightning),ot=T.poison/(5*w+T.poison),ut=T.arcane/(5*w+T.arcane),at=(1-Y)*(1-G),ft=at*(1-k/100),lt=at*(1-Z/100),ct=at*(1-et/100),ht=at*(1-tt/100),pt=b/at,dt=b/ft,vt=b/lt,mt=b/ct,gt=b/ht,yt=b/((1-Y)*(1-nt)),bt=b/((1-Y)*(1-rt)),wt=b/((1-Y)*(1-it)),Et=b/((1-Y)*(1-st)),St=b/((1-Y)*(1-ot)),xt=b/((1-Y)*(1-ut));o.empty(),o.append(h("EHP",pt,"round")),o.append(h("EHP w/ Dodge",dt,"round")),o.append($("<ul class='resist-specific'/>").append($("<li class='header'/>").html("Damage Type EHP"),h("Melee EPH",vt,"round"),h("Ranged EPH",mt,"round"),h("Elite EPH",gt,"round"))),o.append($("<ul class='resist-specific'/>").append($("<li class='header'/>").html("Elemental EHP"),h("Physical EPH",yt,"round"),h("Cold EPH",bt,"round"),h("Fire EPH",wt,"round"),h("Lightning EPH",Et,"round"),h("Poison EPH",St,"round"),h("Arcane/Holy EPH",xt,"round"))),r.empty(),r.append(h("Strength",c.strength)),r.append(h("Dexterity",c.dexterity)),r.append(h("Intelligence",c.intelligence)),r.append(h("Vitality",c.vitality)),n.empty(),n.append(h("Armor",E,"",N)),n.append(h("All Resist",x,"",Q.all)),n.append(h("Block Amount",s["block-amount"]?s["block-amount"]:"~")),n.append(h("Block Chance",A,"per")),n.append(h("Dodge Chance",Math.round(k*10)/10,"per")),n.append(h("Damage Reduction",N,"per")),n.append(h("Physical Resistance",T.physical,"",Q.physical)),n.append(h("Cold Resistance",T.cold,"",Q.cold)),n.append(h("Fire Resistance",T.fire,"",Q.fire)),n.append(h("Lightning Resistance",T.lightning,"",Q.lightning)),n.append(h("Poison Resistance",T.poison,"",Q.poison)),n.append(h("Arcane/Holy Resistance",T.arcane,"",Q.arcane)),n.append(h("Crowd Control Reduction",c["cc-reduce"]?c["cc-reduce"]:0,"per")),n.append(h("Missile Damage Reduction",et,"per")),n.append(h("Melee Damage Reduction",Z,"per")),n.append(h("Elite Damage Reduction",tt,"per")),n.append(h("Thorns",c.thorns)),t.empty(),t.append(h("DPS",H)),t.append(h("Attacks per Second",O)),t.append(h("Critical Hit Chance",B,"per")),t.append(h("Critical Hit Damage",j,"per")),i.empty(),i.append(h("Maximum Life",b)),i.append(h("Total Life Bonus",y,"per")),i.append(h("Life per Second",c["life-regen"]?c["life-regen"]:0)),i.append(h("Life Steal",c["life-steal"]?c["life-steal"]:0,"per")),i.append(h("Life per Kill",c["life-kill"]?c["life-kill"]:0)),i.append(h("Life per Hit",c["life-hit"]?c["life-hit"]:0)),i.append(h("Health Globe Healing Bonus",c["health-globes"]?c["health-globes"]:0)),i.append(h("Bonus to Gold/Globe Radius",c["plus-pickup-radius"]?c["plus-pickup-radius"]:0))}function v(t,n){var r=$("#compared-slot").find(":selected").val(),i=e;itemDisplay=$("#equipped-"+r);var s=$("<a/>"),o=itemDisplay.html();s.attr("href","/i/"+n.id),s.attr("data-json",JSON.stringify(n)),s.addClass("quality-"+n.quality),s.html(n.name),s.bindTooltip(),itemDisplay.html(s),p();var u={};jQuery.extend(u,e),itemDisplay.html(o),p();var a=$("<div/>").append($("<div/>").append("Old Item: ",o),$("<div/>").append("New Item: ",s)),f=$.diff(t,u),l=$("<table/>");header=$("<tr/>").append("<th>Stat</th><th>Diff</th><th>Old</th><th>New</th>"),l.append(header),Object.keys(f.mod).length>0?($.each(f.mod,function(e,n){var r=Math.round((u[e]-t[e])*100)/100,i=$("<tr/>");i.append($("<td/>").html(e));var s=Math.round(t[e]*100)/100,o=Math.round(u[e]*100)/100;s>99999&&(s=Math.round(s/10)/100+"k"),o>99999&&(o=Math.round(o/10)/100+"k"),r>0?(i.append($("<td/>").html("+"+r).addClass("pos")),i.append($("<td class='neg'/>").html(s)),i.append($("<td class='pos'/>").html(o))):(i.append($("<td/>").html(r).addClass("neg")),i.append($("<td class='pos'/>").html(s)),i.append($("<td class='neg'/>").html(o))),l.append(i)}),l.append("<tr><td colspan='10'><span class='pos'>Green = Increase</span> / <span class='neg'>Red = Decrease</span></td></tr>")):l.append("<tr><td colspan='10' style='text-align: center; font-weight: bold;'>These items are identical.</td></tr>"),a.find("div a").each(function(){$(this).bindTooltip()}),$(".compare-diff").empty().append(a,l)}var e=[],t=$("#stats-offense"),n=$("#stats-defense"),r=$("#stats-base"),i=$("#stats-life"),s=$("#stats-misc"),o=$("#stats-ehp"),u=$("#vsLevel"),a=$("#character").data("class"),f={barbarian:{"pound-of-flesh":{desc:'Increases the chance of finding a health globe by <span class="skill-highlight">25%</span> and you gain <span class="skill-highlight">100%</span> additional Life from health globes.',effect:{"health-globes":1}},ruthless:{desc:'Critical Hit Chance increased by <span class="skill-highlight">5%</span>. Critical Hit Damage increased by <span class="skill-highlight">50%</span>.',effect:{"critical-hit":.05,"critical-hit-damage":.5}},"nerves-of-steel":{desc:'Your Armor is increased by <span class="skill-highlight">100%</span> of your Vitality.',effect:{"vitality-to-armor":1}},"weapons-master":{desc:'Gain a bonus based on the weapon type of your main hand weapon:<br />Swords/Daggers: <span class="skill-highlight">15%</span> increased damage<br />Maces/Axes: <span class="skill-highlight">10%</span> Critical Hit Chance<br />Polearms/Spears: <span class="skill-highlight">10%</span> attack speed<br />Mighty Weapons: <span class="skill-highlight">3</span> Fury per hit',effect:{"switch":{lookup:"type","var":"mainhand",cases:[{"case":"sword|dagger|2h-sword",effect:{"plus-damage":.15}},{"case":"mace|axe|2h-axe|2h-mace",effect:{"critical-hit":.1}},{"case":"spear|polearm",effect:{"attack-speed":.1}},{"case":"mighty|2h-mighty",effect:{}},{"case":"sword|dagger|2h-sword",effect:{"plus-damage":.15}}]}}},"berserker-rage":{desc:'You inflict an additional <span class="skill-highlight">25%</span> damage while at maximum Fury.'},"inspiring-presence":{desc:'The duration of your shouts is doubled. After using a shout you regenerate <span class="skill-highlight">1%</span> of your maximum Life per second for <span class="skill-highlight">60</span> seconds.'},bloodthirst:{desc:'Gain <span class="skill-highlight">3%</span> of all damage done as Life.',effect:{"life-steal":.03}},animosity:{desc:'Increases Fury generation by <span class="skill-highlight">10%</span> and maximum Fury is increased by <span class="skill-highlight">20</span>.',effect:{"max-fury":20}},superstition:{desc:'Reduces all non-Physical damage by <span class="skill-highlight">20%</span>. Whenever you take damage from a ranged or elemental attack, you have a chance to gain <span class="skill-highlight">3</span> Fury.'},"tough-as-nails":{desc:'Increases Armor by <span class="skill-highlight">25%</span>.<br />Thorns damage dealt increased by <span class="skill-highlight">50%</span>.',effect:{"plus-armor":.25,"plus-thorns":.5}},"no-escape":{desc:'Increases the damage of Ancient Spear and Weapon Throw by <span class="skill-highlight">10%</span>. In addition, a Critical Hit with Ancient Spear resets the cooldown while Critical Hits with Weapon Throw have a chance to return <span class="skill-highlight">14</span> Fury.'},relentless:{desc:'While below <span class="skill-highlight">20%</span> Life, all skills cost no Fury and all damage taken is reduced by <span class="skill-highlight">50%</span>.'},brawler:{desc:'As long as there are <span class="skill-highlight">3</span> enemies within <span class="skill-highlight">8</span> yards, all of your damage is increased by <span class="skill-highlight">30%</span>.'},juggernaut:{desc:'The duration of control impairing effects on you are reduced by <span class="skill-highlight">20%</span>. In addition, whenever a Stun, Fear, Immobilize or Charm is cast on you, you have a chance to recover <span class="skill-highlight">15%</span> of your maximum Life.',effect:{"cc-reduce":.2}},unforgiving:{desc:'You no longer degenerate Fury. Instead, you gain <span class="skill-highlight">1</span> Fury every <span class="skill-highlight">2</span> seconds.'},"boon-of-bul-kathos":{desc:'The cooldown on your Earthquake, Call of the Ancients, and Wrath of the Berserker skills is reduced by <span class="skill-highlight">30</span> seconds.'}},monk:{"fleet-footed":{desc:'Increases movement speed by <span class="skill-highlight">10%</span>.',effect:{"plus-movement-speed":.1}},resolve:{desc:'Damage you deal reduces enemy damage by <span class="skill-highlight">25%</span> for <span class="skill-highlight">2.5</span> seconds.'},"exalted-soul":{desc:'Increases maximum Spirit by <span class="skill-highlight">100</span>.',effect:{"max-spirit":100}},transcendence:{desc:'Every point of Spirit spent heals you for <span class="skill-highlight">62.0</span> Life.'},"chant-of-resonance":{desc:'Duration of all Mantras increased by <span class="skill-highlight">7</span> minutes. While one of your Mantras is active you gain <span class="skill-highlight">2</span> Spirit every second.'},"seize-the-initiative":{desc:'Your Armor is increased by <span class="skill-highlight">100%</span> of your Dexterity.',effect:{"dexterity-to-armor":1}},"the-guardians-path":{desc:'While dual-wielding, you gain a <span class="skill-highlight">15%</span> chance to dodge incoming attacks. While using a two-handed weapon, all Spirit generation is increased by <span class="skill-highlight">25%</span>.',effect:{"switch":{"var":"slot",cases:[{"case":"mainhand|offhand",effect:{"plus-dodge":.15}},{"case":"mainhand",effect:{"plus-spirit-regen":.25}}]}}},"sixth-sense":{desc:'Your dodge chance is increased by an amount equal to <span class="skill-highlight">30%</span> of your Critical Hit Chance.',effect:{"critical-to-dodge":.3}},pacifism:{desc:'While you are under a Stun, Fear or Charm effect, all damage taken is reduced by <span class="skill-highlight">75%</span>.'},"beacon-of-ytar":{desc:'Reduces all cooldowns by <span class="skill-highlight">15%</span>.'},"guiding-light":{desc:'Whenever you use a direct heal skill on another player you and the other player deal <span class="skill-highlight">16%</span> more damage for <span class="skill-highlight">15</span> seconds.'},"one-with-everything":{desc:"Your resistance to all elements is equal to your highest elemental resistance.",effect:{"flatten-resists":1}},"combination-strike":{desc:'Each different Spirit Generator ability you use increases your damage by <span class="skill-highlight">8%</span> for <span class="skill-highlight">3</span> seconds.'},"near-death-experience":{desc:'When receiving fatal damage, you are instead restored to <span class="skill-highlight">35%</span> of maximum Life and <span class="skill-highlight">35%</span> Spirit.'}},wizard:{blur:{desc:'Decreases melee damage taken by <span class="skill-highlight">20%</span>.',effect:{"melee-reduce":.2}},"power-hungry":{desc:'Gain <span class="skill-highlight">30</span> Arcane Power whenever you are healed by a health globe.'},evocation:{desc:'Reduces all cooldowns by <span class="skill-highlight">15%</span>.'},"glass-cannon":{desc:'Increases all damage done by <span class="skill-highlight">15%</span>, but decreases Armor and resistances by <span class="skill-highlight">10%</span>.',effect:{"plus-damage":.15,"plus-resist-all":-0.1,"plus-armor":-0.1}},prodigy:{desc:'When you deal damage with a Signature spell, you gain <span class="skill-highlight">4</span> Arcane Power.<br/>The following skills are Signature spells:<ul><li>Magic Missile</li><li>Shock Pulse</li><li>Spectral Blade</li><li>Electrocute</li></ul>'},"astral-presence":{desc:'Increases your maximum Arcane Power by <span class="skill-highlight">20</span> and Arcane Power regeneration by <span class="skill-highlight">2</span> per second.'},illusionist:{desc:'Whenever you suffer more than <span class="skill-highlight">15%</span> of your Life in a single hit, the cooldowns on Mirror Image and Teleport are automatically reset.'},"cold-blooded":{desc:'Cold damage dealt to chilled and frozen targets is increased by <span class="skill-highlight">20%</span>.'},conflaguration:{desc:'Fire damage dealt to enemies applies a burning effect, increasing all damage done to them by <span class="skill-highlight">10%</span> for 3 seconds.'},paralysis:{desc:'Lightning damage dealt to enemies has up to a <span class="skill-highlight">8%</span> chance to Stun the target for <span class="skill-highlight">2</span> seconds.'},"galvanizing-ward":{desc:'Increases the duration of your Armor spells by <span class="skill-highlight">120</span> seconds. As long as an Armor spell is active, you gain <span class="skill-highlight">310</span> Life per second. The following skills are improved:<ul><li>Energy Armor</li><li>Ice Armor</li><li>Storm Armor</li></ul>'},"temporal-flux":{desc:'Whenever you deal Arcane damage, enemies are slowed by <span class="skill-highlight">30%</span> for <span class="skill-highlight">2</span> seconds.'},"critical-mass":{desc:'Critical Hits have a chance to reduce the cooldown of your spells by <span class="skill-highlight">1</span> second.'},"arcane-dynamo":{desc:'When you deal damage with a Signature spell you may gain a Flash of Insight. After 5 Flashes of Insight, your next non-Signature spell deals <span class="skill-highlight">75%</span> additional damage. The following skills are Signature spells:<ul><li>Magic Missile</li><li>Shock Pulse</li><li>Spectral Blade</li><li>Electrocute</li></ul>'},"unstable-anomaly":{desc:'When reduced below <span class="skill-highlight">20%</span> Life, release a shockwave that knocks all enemies back. This effect cannot occur more than once every 60 seconds.'}},"demon-hunter":{"tactical-advantage":{desc:'Whenever you use Vault, Smoke Screen, or backflip with Evasive Fire you gain <span class="skill-highlight">60%</span> movement speed for <span class="skill-highlight">2</span> seconds.'},"thrill-of-the-hunt":{desc:'Every <span class="skill-highlight">10</span> seconds, your next bow attack will immobilize your target for <span class="skill-highlight">3</span> seconds.'},vengeance:{desc:'Your maximum Hatred is increased by <span class="skill-highlight">25</span>. In addition, gain <span class="skill-highlight">20</span> Hatred and <span class="skill-highlight">2</span> Discipline whenever you are healed by a health globe.',effect:{"max-hatred":25}},"steady-aim":{desc:'As long as there are no enemies within <span class="skill-highlight">10</span> yards, all damage is increased by <span class="skill-highlight">20%</span>.'},"cull-the-weak":{desc:'Damage against slowed enemies increased by <span class="skill-highlight">15%</span>.'},"night-stalker":{desc:'Critical Hits have a chance to restore <span class="skill-highlight">1</span> Discipline.'},brooding:{desc:'As long as you have not taken damage in the last <span class="skill-highlight">3</span> seconds you gain <span class="skill-highlight">1%</span> of your maximum Life per second.'},"hot-pursuit":{desc:'Whenever you are at full Hatred, movement speed is increased by <span class="skill-highlight">15%</span>.'},archery:{desc:'Gain a bonus based on the weapon type of your main hand weapon:<br />Bow: <span class="skill-highlight">15%</span> increased damage<br />Crossbows: <span class="skill-highlight">50%</span> Critical Hit Damage<br />Hand Crossbows: <span class="skill-highlight">10%</span> Critical Hit Chance',effect:{"switch":{lookup:"type","var":"mainhand",cases:[{"case":"bow",effect:{"plus-damage":.15}},{"case":"crossbow",effect:{"critical-hit-damage":.5}},{"case":"hand-crossbow",effect:{"critical-hit":.1}}]}}},"numbing-traps":{desc:'Enemies hit by Fan of Knives, Spike Trap, and Caltrops have their damage reduced by <span class="skill-highlight">25%</span> for <span class="skill-highlight">3</span> seconds.'},perfectionist:{desc:'Reduces the Discipline cost of all skills by <span class="skill-highlight">10%</span>.'},"custom-engineering":{desc:'The duration of your Caltrops, Marked for Death, Spike Trap, and Sentry is increased by <span class="skill-highlight">100%</span>.'},grenadier:{desc:'Increases Hatred generated from Grenades by <span class="skill-highlight">2</span> and reduces the Hatred cost of Cluster Arrow by <span class="skill-highlight">10</span>. Upon death, you drop a giant grenade that explodes for <span class="skill-highlight">450%</span> weapon damage as Fire.'},sharpshooter:{desc:'Gain <span class="skill-highlight">3%</span> Critical Hit Chance every second. This bonus is reset <span class="skill-highlight">1</span> second after you successfully critically hit.'},ballistics:{desc:'Damage from rockets increased by <span class="skill-highlight">50%</span>. '}},"witch-doctor":{"circle-of-life":{desc:'Whenever an enemy dies within <span class="skill-highlight">12</span> yards, there is a <span class="skill-highlight">5%</span> chance that a Zombie Dog will automatically emerge. The range of this effect is increased by items that increase your gold pickup radius.'},"jungle-fortitude":{desc:'Reduces all damage taken by you and your pets by <span class="skill-highlight">20%</span>.',effect:{"reduce-damage":.2}},"spiritual-attunement":{desc:'Maximum Mana is increased by <span class="skill-highlight">20%</span>. Regenerate <span class="skill-highlight">1%</span> of your maximum Mana per second.',effect:{"plus-mana":.2}},"gruesome-feast":{desc:'Whenever you are healed by a health globe, you gain <span class="skill-highlight">10%</span> of your maximum Mana and <span class="skill-highlight">10%</span> Intelligence for <span class="skill-highlight">10</span> seconds. The Intelligence bonus can stack up to <span class="skill-highlight">5</span> times.'},"bad-medicine":{desc:'Whenever you deal Poison damage to an enemy, their damage is reduced by <span class="skill-highlight">20%</span> for <span class="skill-highlight">3</span> seconds.'},"blood-ritual":{desc:'<span class="skill-highlight">15%</span> of Mana costs are paid with Life. In addition, you regenerate <span class="skill-highlight">1%</span> of your maximum Life per second.'},"zombie-handler":{desc:'You can have <span class="skill-highlight">4</span> Zombie Dogs summoned at one time. The health of your Zombie Dogs and Gargantuan is increased by <span class="skill-highlight">20%</span>.'},"pierce-the-veil":{desc:'All of your damage is increased by <span class="skill-highlight">20%</span>, but your Mana costs are increased by <span class="skill-highlight">30%</span>.',effect:{"plus-damage":.2}},"fetish-sycophants":{desc:'Whenever you cast a physical realm spell, you have a <span class="skill-highlight">3%</span> chance to summon a dagger-wielding Fetish to fight by your side for <span class="skill-highlight">60</span> seconds.'},"spirit-vessel":{desc:'Reduces the cooldown of your Horrify, Spirit Walk, and Soul Harvest spells by <span class="skill-highlight">2</span> seconds. In addition, the next time you receive fatal damage, you automatically enter the spirit realm for <span class="skill-highlight">3</span> seconds and heal to <span class="skill-highlight">10%</span> of your maximum Life. This effect cannot occur more than once every <span class="skill-highlight">90</span> seconds.'},"rush-of-essence":{desc:'Spirit spells return <span class="skill-highlight">30%</span> of their Mana cost over <span class="skill-highlight">10</span> seconds.'},"vision-quest":{desc:'Any time you have <span class="skill-highlight">4</span> or more skills on cooldown, your Mana regeneration is increased by <span class="skill-highlight">300%</span>.'},"fierce-loyalty":{desc:'All your pets get <span class="skill-highlight">100%</span> of the benefit of your Thorns and Life regeneration items.'},"grave-injustice":{desc:'Whenever an enemy dies within <span class="skill-highlight">8</span> yards, regain <span class="skill-highlight">1%</span> of your maximum Life and Mana and the cooldown on all of your abilities is reduced by <span class="skill-highlight">1</span> second. This range is extended by items that increase your gold pickup radius.'},"tribal-rites":{desc:'The cooldowns of your Fetish Army, Big Bad Voodoo, and Hex abilities are reduced by <span class="skill-highlight">25%</span>.'}}},l=$("#passives"),c=$("#passive-display");$.each(f[a],function(e,t){var n="";typeof activePassives!="undefined"&&$.each(activePassives,function(t,r){e==r&&(n='selected="selected"')}),l.append($("<option value='"+e+"' "+n+"/>").html(e.replace(/\-/g," ").capitalize()))}),l.select2({placeholder:"Which passives skills are you using?",allowClear:!0}),l.bind("change",function(){var e=$(this).val()?$(this).val():[];(!e||activePassives.length!=e.length)&&$.ajax({data:{a:"passive-skills",passives:e}}),c.empty(),$.each(e,function(e,t){var n=f[a][t],r=$("<span/>").append($("<strong>").html(t.replace(/\-/g," ").capitalize()+": "),n.desc);c.append($("<li/>").html(r))}),p()}),l.trigger("change"),u.bind("change",p),$(".gear-change").click(function(){var e=$(this).data("item-type"),t=$("#equipped-"+e);$.ajax({url:"/item/fetch/type/"+e,cache:!1,dataType:"json",success:function(n){var r=$("#available-gear"),i=$("#gear-change");r.html(""),r.append("<option value=''>Nothing</option>"),$.each(n,function(e,t){var n=$.parseJSON(t),i=$("<option/>");i.attr("value",e),i.attr("data-json",t),i.html(n.name),i.bindTooltip(),r.append(i)}),i.dialog({width:800,modal:!0,buttons:{Equip:function(){var n=$(this);$.ajax({data:{a:"equip",slot:e,newItem:r.val()},success:function(e){if(r.val()!=""){var i=$("<a/>"),s=r.find(":selected"),o=$.parseJSON(s.attr("data-json"));i.attr("href","/i/"+r.val()),i.attr("data-json",JSON.stringify(o)),i.addClass("quality-"+o.quality),i.html(o.name),i.bindTooltip(),t.html(i)}else t.html("Nothing");n.dialog("close"),p()}})},Cancel:function(){$(this).dialog("close")}}})}})}),p();var d=$("#compare-to");$("#compared-slot").bind("change",function(){var e=$(this).val();$.ajax({url:"/item/fetch/type/"+e,cache:!1,dataType:"json",success:function(e){d.html(""),d.append("<option value=''>Nothing</option>"),$.each(e,function(e,t){var n=$.parseJSON(t),r=$("<option/>");r.attr("value",e),r.attr("data-json",t),r.html(n.name),r.bindTooltip(),d.append(r)})}})}),d.bind("change",function(){var t={};jQuery.extend(t,e);var n=$("#compared-slot").find(":selected").val(),r=$("#equipped-"+n+" a").data("json"),i=$(this).find(":selected").data("json"),s=v(t,i)})})