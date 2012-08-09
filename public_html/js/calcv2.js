var buildCalculator={"class":null,gearSelector:null,passiveSkills:[],activeSkills:[],enabledSkills:[],gear:{},attrs:{},stats:{},sets:{},bonuses:{},values:{},vsLevel:60,isDuelWielding:!1,init:function(){this.attrs={armor:0,"block-chance":0,speed:0},this.sets={},this.attrs={primary:null,strength:0,dexterity:0,intelligence:0,vitality:0,"plus-life":0,armor:0,"cold-resist":0,"lightning-resist":0,"fire-resist":0,"arcane-resist":0,"poison-resist":0,"physical-resist":0,"plus-block":0,"critical-hit":5,"critical-hit-damage":50,"melee-reduce":0,"range-reduce":0,"elite-reduce":0,"resist-all":0},this.gear={},this.values={},this.bonuses={"plus-resist-all":0,"plus-armor":0,"plus-dodge":[],"plus-damage":0,"plus-attack-speed":0,"plus-damage-reduce":0,"plus-life":0,"3rd-hit-damage":!1}},setClass:function(e){switch(e){case"wizard":case"witch-doctor":this.attrs.primary="intelligence",this.attrs.strength+=67,this.attrs.dexterity+=67,this.attrs.intelligence+=187;break;case"barbarian":this.attrs.primary="strength",this.attrs.strength+=187,this.attrs.dexterity+=67,this.attrs.intelligence+=67;break;case"demon-hunter":case"monk":this.attrs.primary="dexterity",this.attrs.strength+=67,this.attrs.dexterity+=187,this.attrs.intelligence+=67}this.attrs.vitality+=127,this.class=e},getClass:function(){return this.class},setActives:function(e){this.activeSkills=e},setEnabledSkills:function(e){this.enabledSkills=e},setPassives:function(e){this.passiveSkills=e},addBonus:function(e,t){this.bonuses[e]?this.bonuses[e]+=t:this.bonuses[e]=t},removeBonus:function(e,t){this.bonuses[e]&&(this.bonuses[e]-=t)},setVsLevel:function(e){this.vsLevel=e},setGear:function(e){var t={};this.gearSelector=e,$(this.gearSelector).each(function(){var e=$(this).parent().data("slot"),n=$(this).data("json");t[e]=n}),this.gear=t,_.each(this.gear,this.parseItem,this)},getItem:function(e){return this.gear[e]},setItem:function(e,t){this.gear[e]=t},getItemLink:function(e){if(e==null)return"";var t=$("<a href='/i/"+e.id+"' class='quality-"+e.quality+"'/>").attr("data-json",JSON.stringify(e)).html(e.name);return t.bindTooltip(),t},applyEnabledSkill:function(e,t){switch(t){case"plus-dodge":var n=e/100;this.bonuses["plus-dodge"].push(n);break;case"plus-crit-hit":this.attrs["critical-hit"]+=e;break;case"plus-life":case"plus-life-regen":case"plus-damage-reduce":case"plus-resist-all":case"plus-attack-speed":case"plus-damage":case"plus-armor":var n=e/100;this.addBonus(t,n);break;default:}},applyEnabledSkills:function(){_.each(this.enabledSkills,function(e,t){_.each(e.effect,function(e,t){switch(t){case"stack":_.each(e,function(e,t){this.applyEnabledSkill(e.limit*e.value,t)},this);break;case"plus-damage-conditional":this.applyEnabledSkill(e,"plus-damage");break;case"damage-reduce-conditional":this.applyEnabledSkill(e,"plus-damage-reduce");break;default:this.applyEnabledSkill(e,t)}},this)},this)},applyPassives:function(){_.each(this.passiveSkills,function(e,t){e.effect&&_.each(e.effect,function(e,t){switch(t){case"damage-reduce-conditional":case"plus-damage-conditional":break;case"sharpshooter":this.bonuses.sharpshooter=!0;break;case"plus-thorns":case"plus-armor":case"plus-resist-all":case"plus-damage":this.addBonus(t,e);break;case"flatten-resists":this.bonuses["flatten-resists"]=!0;break;case"melee-reduce":case"plus-movement-speed":case"max-spirit":case"max-hatred":case"max-fury":case"life-steal":case"cc-reduce":this.attrs[t]?this.attrs[t]+=e*100:this.attrs[t]=e*100;break;case"damage-reduce":break;case"health-globes":break;case"critical-to-dodge":this.bonuses["plus-dodge"].push(this.attrs["critical-hit"]*.3/100);break;case"dexterity-to-armor":this.attrs.armor=this.attrs.armor+this.attrs.dexterity*e;break;case"vitality-to-armor":this.attrs.armor=this.attrs.armor+this.attrs.vitality*e;break;case"critical-hit-damage":this.attrs["critical-hit-damage"]=this.attrs["critical-hit-damage"]+e*100;break;case"plus-mana":break;case"critical-hit":this.attrs["critical-hit"]=this.attrs["critical-hit"]+e*100;break;case"switch":e.var=="isDuelWielding"&&_.each(e.cases,function(e,t){e.case==this.isDuelWielding&&_.each(e.effect,function(e,t){switch(t){case"plus-dodge":this.bonuses["plus-dodge"].push(e)}},this)},this),typeof this.gear[e.var]!="undefined"&&_.each(e.cases,function(t,n){var r=!1;_.each(t.case.split("|"),function(n,r){n==this.gear[e.var][e.lookup]&&_.each(t.effect,function(e,t){switch(t){case"plus-damage":this.bonuses["plus-damage"]?this.bonuses["plus-damage"]+=e:this.bonuses["plus-damage"]=e;break;case"critical-hit-damage":this.attrs["critical-hit-damage"]=this.attrs["critical-hit-damage"]+e*100;break;case"attack-speed":this.attrs["attack-speed-incs"]?this.attrs["attack-speed-incs"]+=e:this.attrs["attack-speed-incs"]=e;break;case"critical-hit":this.attrs["critical-hit"]=this.attrs["critical-hit"]+e*100;break;default:console.log("Unhandled Switch: "+t+" ["+e+"]")}},this)},this)},this);break;default:console.log("Unhandled Effect: "+t+"["+e+"]")}},this)},this)},calcDefenses:function(){var e={};e.life=276+35*this.attrs.vitality,e.life+=e.life*((this.attrs["plus-life"]+this.bonuses["plus-life"]*100)/100),e.armor=(this.attrs.armor+this.attrs.strength)*(1+this.bonuses["plus-armor"]),e.armorReduction=e.armor/(50*this.vsLevel+e.armor),e["resist-all"]=(this.attrs["resist-all"]+this.attrs.intelligence/10)*(1+this.bonuses["plus-resist-all"]),e["resist-physical"]=e["resist-all"]+this.attrs["physical-resist"],e["resist-cold"]=e["resist-all"]+this.attrs["cold-resist"],e["resist-fire"]=e["resist-all"]+this.attrs["fire-resist"],e["resist-lightning"]=e["resist-all"]+this.attrs["lightning-resist"],e["resist-poison"]=e["resist-all"]+this.attrs["poison-resist"],e["resist-arcane"]=e["resist-all"]+this.attrs["arcane-resist"];if(this.bonuses["flatten-resists"]){var t=0,n=["resist-all","resist-physical","resist-cold","resist-fire","resist-lightning","resist-poison","resist-arcane"];_.each(n,function(n){e[n]>t&&(t=e[n])},this),_.each(n,function(n){e[n]=t},this)}e["percent-resist-all"]=e["resist-all"]/(5*this.vsLevel+e["resist-all"]),e["percent-resist-physical"]=e["resist-physical"]/(5*this.vsLevel+e["resist-physical"]),e["percent-resist-cold"]=e["resist-cold"]/(5*this.vsLevel+e["resist-cold"]),e["percent-resist-fire"]=e["resist-fire"]/(5*this.vsLevel+e["resist-fire"]),e["percent-resist-lightning"]=e["resist-lightning"]/(5*this.vsLevel+e["resist-lightning"]),e["percent-resist-poison"]=e["resist-poison"]/(5*this.vsLevel+e["resist-poison"]),e["percent-resist-arcane"]=e["resist-arcane"]/(5*this.vsLevel+e["resist-arcane"]),e["percent-resist-melee"]=this.attrs["melee-reduce"],e["percent-resist-range"]=this.attrs["range-reduce"],e["percent-resist-elite"]=this.attrs["elite-reduce"],e["block-chance"]=this.attrs["block-chance"]+this.attrs["plus-block"];var r=this.attrs.dexterity,i={100:.1,400:.025,500:.02,7e3:.01};e["dodge-chance"]=0,_.each(i,function(t,n){r>n?(r-=n,e["dodge-chance"]+=n*t):(e["dodge-chance"]+=r*t,r=0)},this);if(this.bonuses["plus-dodge"].length){var s=e["dodge-chance"]/100;_.each(this.bonuses["plus-dodge"],function(e){s=(1-s)*(1-e)}),e["dodge-chance"]=(1-s)*100}return e},calcEffectiveHealth:function(e){var t={};return this.class=="monk"||this.class=="barbarian"?(t.damageTaken=(1-e["percent-resist-all"])*(1-e.armorReduction)*(1-this.bonuses["plus-damage-reduce"])*.7,t["ehp-physical"]=e.life/((1-e.armorReduction)*(1-e["percent-resist-physical"])*.7),t["ehp-cold"]=e.life/((1-e.armorReduction)*(1-e["percent-resist-cold"])*.7),t["ehp-fire"]=e.life/((1-e.armorReduction)*(1-e["percent-resist-fire"])*.7),t["ehp-lightning"]=e.life/((1-e.armorReduction)*(1-e["percent-resist-lightning"])*.7),t["ehp-poison"]=e.life/((1-e.armorReduction)*(1-e["percent-resist-poison"])*.7),t["ehp-arcane"]=e.life/((1-e.armorReduction)*(1-e["percent-resist-arcane"])*.7)):(t.damageTaken=(1-e["percent-resist-all"])*(1-this.bonuses["plus-damage-reduce"])*(1-e.armorReduction),t["ehp-physical"]=e.life/((1-e.armorReduction)*(1-e["percent-resist-physical"])),t["ehp-cold"]=e.life/((1-e.armorReduction)*(1-e["percent-resist-cold"])),t["ehp-fire"]=e.life/((1-e.armorReduction)*(1-e["percent-resist-fire"])),t["ehp-lightning"]=e.life/((1-e.armorReduction)*(1-e["percent-resist-lightning"])),t["ehp-poison"]=e.life/((1-e.armorReduction)*(1-e["percent-resist-poison"])),t["ehp-arcane"]=e.life/((1-e.armorReduction)*(1-e["percent-resist-arcane"]))),t.ehp=e.life/t.damageTaken,t["ehp-dodge"]=e.life/(t.damageTaken*(1-e["dodge-chance"]/100)),t["ehp-melee"]=e.life/(t.damageTaken*(1-e["percent-resist-melee"]/100)),t["ehp-range"]=e.life/(t.damageTaken*(1-e["percent-resist-range"]/100)),t["ehp-elite"]=e.life/(t.damageTaken*(1-e["percent-resist-elite"]/100)),t},calcGearEhp:function(e,t){var n={};_.each(this.gear,function(e,r){var i=r;this.removeItem(r);var s=this.calcDefenses(),o=this.calcEffectiveHealth(s);n["ehp-"+r]=o.ehp-t.ehp,this.parseItem(e,r)},this);var r={"pt-resist-all":{"resist-all":1},"pt-armor":{armor:1},"pt-vitality":{vitality:1},"pt-plus-life":{"plus-life":1},"pt-intelligence":{intelligence:1},"pt-strength":{strength:1}};return _.each(r,function(e,r){switch(r){case"pt-armor":var i={stats:e};break;default:var i={attrs:e}}this.parseItem(i,"extra");var s=this.calcDefenses(),o=this.calcEffectiveHealth(s);n["ehp-"+r]=o.ehp-t.ehp,this.removeItem("extra")},this),n},calcOffense:function(){var e={},t=0,n=0,r=0,i=0,s=0,o=0,u=0,a=0;this.attrs.damage&&(n=this.attrs.damage.min,r=this.attrs.damage.max,this.attrs["damage-oh"]&&(i=this.attrs["damage-oh"].min,s=this.attrs["damage-oh"].max)),this.attrs["max-damage"]&&(u=this.attrs["max-damage"]),this.attrs["min-damage"]&&(o=this.attrs["min-damage"]),this.attrs["attack-speed-incs"]&&(t=this.attrs["attack-speed-incs"]),a=(o+u)/2;if(this.isDuelWielding){e["dps-speed"]={mh:Math.floor(this.attrs.speed*1024)/1024,oh:Math.floor(this.attrs["speed-oh"]*1024)/1024};var f=1+this.attrs[this.attrs.primary]*.01,l=1+this.attrs["critical-hit"]*.01*this.attrs["critical-hit-damage"]*.01,c=(e["dps-speed"].mh+e["dps-speed"].oh)/2*(1+t+.15+this.bonuses["plus-attack-speed"]),h=((n+r)/2+(i+s)/2+o+u)/2,p=1+this.bonuses["plus-damage"];e.dps=f*l*c*h*p,e["dps-speed-display"]=Math.round(c*100)/100}else{e["dps-speed"]=Math.floor(this.attrs.speed*1024)/1024;var f=1+this.attrs[this.attrs.primary]*.01,l=1+this.attrs["critical-hit"]*.01*this.attrs["critical-hit-damage"]*.01,c=e["dps-speed"]*(1+t+this.bonuses["plus-attack-speed"]),h=(n+r)/2+(o+u)/2,p=1+this.bonuses["plus-damage"];e.dps=f*l*c*h*p,e["dps-speed-display"]=Math.round(c*100)/100}return e},calcSAME:function(e,t){var n={},r=0,i=0,s=0,o=0,u=0,a=0,f=0,l=0,c=e.effect["weapon-damage"],h=e.effect.cooldown?!0:!1;this.attrs.damage&&(i=this.attrs.damage.min,s=this.attrs.damage.max,this.attrs["damage-oh"]&&(o=this.attrs["damage-oh"].min,u=this.attrs["damage-oh"].max)),this.attrs["attack-speed-incs"]&&(r=this.attrs["attack-speed-incs"]),this.attrs["max-damage"]&&(f=this.attrs["max-damage"]),this.attrs["min-damage"]&&(a=this.attrs["min-damage"]),l=(a+f)/2,c/=100;if(this.isDuelWielding){n["dps-speed"]={mh:Math.floor(this.attrs.speed*1024)/1024,oh:Math.floor(this.attrs["speed-oh"]*1024)/1024};var p=1+this.attrs[this.attrs.primary]*.01,d=((i+s)/2+(o+u)/2+a+f)/2,v=(i+o+a+f)/4,m=(s+u+f+f)/4,g=1+this.bonuses["plus-damage"];b=(n["dps-speed"].mh+n["dps-speed"].oh)/2*(1+r+.15+this.bonuses["plus-attack-speed"]),y=1+this.attrs["critical-hit"]*.01*this.attrs["critical-hit-damage"]*.01,dLow=p*v*g*c,dHigh=p*m*g*c}else{n["dps-speed"]=Math.floor(this.attrs.speed*1024)/1024;var p=1+this.attrs[this.attrs.primary]*.01,y=1+this.attrs["critical-hit"]*.01*this.attrs["critical-hit-damage"]*.01,b=n["dps-speed"]*(1+r+this.bonuses["plus-attack-speed"]),v=i+a,m=s+f,g=1+this.bonuses["plus-damage"];dLow=p*v*g*c,dHigh=p*m*g*c}dps=Math.round((dLow+dHigh)/2*b*y*100)/100,hit=Math.round((dLow+dHigh)/2*y*100)/100;if(t)n["per-tick"]=Math.round(hit/t*100)/100,n["total-damage"]=n["per-tick"]*t,n["damage-tick"]=Math.round(dLow/t*100)/100+" - "+Math.round(dHigh/t*100)/100,n["critical-hit-tick"]=Math.round(dLow/t*(1+this.attrs["critical-hit-damage"]*.01)*10)/10+" - "+Math.round(dHigh/t*(1+this.attrs["critical-hit-damage"]*.01)*10)/10;else{h||(n.dps=dps),n["average-hit"]=hit;if(this.bonuses["3rd-hit-damage"]){var w=p*v*(g+this.bonuses["3rd-hit-damage"]/100)*c,E=p*m*(g+this.bonuses["3rd-hit-damage"]/100)*c,S=Math.round((w+E)/2*y*100)/100,x=((dLow+dHigh)/2+(dLow+dHigh)/2+(w+E)/2)/3;n.dps=Math.round(x*b*y*100)/100,n["3rd-hit"]=S}n.damage=Math.round(dLow*100)/100+" - "+Math.round(dHigh*100)/100,n["critical-hit"]=Math.round(dLow*this.attrs["critical-hit-damage"]*.01*10)/10+" - "+Math.round(dHigh*this.attrs["critical-hit-damage"]*.01*10)/10}return n},calcSkills:function(){var e={};return _.each(this.activeSkills,function(t,n){var r=!1,i=!1,s=!1,o={};t&&t.effect&&_.each(t.effect,function(e,n){switch(n){case"3rd-hit":o["3rd-hit-damage"]=e;break;case"plus-damage-conditional":case"damage-reduce-conditional":case"plus-crit-hit":case"plus-attack-speed":case"plus-damage":case"plus-armor":case"plus-resist-all":case"stack":s=!0;break;default:break;case"plus-critical-hit-this":o["plus-critical-hit"]=se.value/100*se.limit;break;case"stack":_.each(e,function(e,t){switch(t){case"plus-attack-speed-this":o["plus-attack-speed"]=e.value/100*e.limit}},this);break;case"weapon-damage":i=t;break;case"weapon-damage-for":r=e}},this),i&&(_.each(o,function(e,t){this.addBonus(t,e)},this),r?e[n]=this.calcSAME(i,r):e[n]=this.calcSAME(i),_.each(o,function(e,t){this.removeBonus(t,e)},this)),s&&(e[n]||(e[n]={}),e[n].activate=!0)},this),_.each(this.passiveSkills,function(t,n){var r=!1,i={};t&&t.effect&&_.each(t.effect,function(e,t){switch(t){case"damage-reduce-conditional":case"plus-damage-conditional":r=!0;break;default:}},this),r&&(e[n]||(e[n]={}),e[n].activate=!0)},this),{skillData:e}},applySetBonuses:function(){_.each(this.sets,function(e,t){e>1&&_.each(setBonuses[t].effect,function(e,n){t>=n&&_.each(e,function(e,t){e<1&&(e*=100),typeof this.attrs[t]!="undefined"?this.attrs[t]+=parseFloat(e):this.attrs[t]=parseFloat(e)},this)},this)},this)},run:function(){this.applyPassives(),this.applySetBonuses(),this.applyEnabledSkills();var e=this.calcDefenses(),t=this.calcEffectiveHealth(e),n=this.calcGearEhp(e,t),r=this.calcOffense(),i=this.calcSkills();$.extend(this.values,e,t,n,r,i),_.each(this.gear,function(e,t){var n=t;this.removeItem(t);var r=this.calcOffense();this.values["dps-"+t]=this.values.dps-r.dps,this.parseItem(e,t)},this);var s={"pt-primary":{stat:1},"pt-critical-hit":{"critical-hit":1},"pt-critical-hit-damage":{"critical-hit-damage":1},"pt-min-damage":{"min-damage":1},"pt-max-damage":{"max-damage":1},"pt-attack-speed":{"attack-speed":1}};return _.each(s,function(e,t){switch(t){case"pt-primary":var n={attrs:{}};n.attrs[this.attrs.primary]=1;break;case"pt-armor":var n={stats:e};break;default:var n={type:"extra",attrs:e}}this.parseItem(n,"extra");var r=this.calcOffense();this.values["dps-"+t]=r.dps-this.values.dps,this.removeItem("extra")},this),this.values=jQuery.extend(this.attrs,this.values),this.values},removeItem:function(e){var t=this.gear[e];this.gear[e]=!1,t.set&&this.sets[t.set]--,t.attrs&&_.each(t.attrs,function(e,n){typeof e!="object"&&isNaN(parseFloat(e))&&(e=0);switch(n){case"armor":if(t.type=="ring"||t.type=="amulet")this.attrs[n]-=parseFloat(e);break;case"minmax-damage":switch(t.type){case"extra":case"shield":case"belt":case"boots":case"bracers":case"chest":case"cloak":case"gloves":case"helm":case"pants":case"mighty-belt":case"shoulders":case"spirit-stone":case"voodoo-mask":case"wizard-hat":case"ring":case"amulet":case"quiver":case"mojo":case"source":this.attrs["min-damage"]&&(this.attrs["min-damage"]-=parseFloat(e.min)),this.attrs["max-damage"]&&(this.attrs["max-damage"]-=parseFloat(e.max));break;default:}break;case"max-damage":case"min-damage":case"plus-damage":switch(t.type){case"extra":case"shield":case"belt":case"boots":case"bracers":case"chest":case"cloak":case"gloves":case"helm":case"pants":case"mighty-belt":case"shoulders":case"spirit-stone":case"voodoo-mask":case"wizard-hat":case"ring":case"amulet":case"quiver":case"mojo":case"source":this.attrs[n]-=parseFloat(e);break;default:}break;case"attack-speed":switch(t.type){case"extra":case"shield":case"belt":case"boots":case"bracers":case"chest":case"cloak":case"gloves":case"helm":case"pants":case"mighty-belt":case"shoulders":case"spirit-stone":case"voodoo-mask":case"wizard-hat":case"ring":case"amulet":case"quiver":case"mojo":case"source":this.attrs["attack-speed-incs"]-=e/100;break;default:}break;default:this.attrs[n]-=parseFloat(e)}},this),t.socketAttrs&&_.each(t.socketAttrs,function(e,t){this.attrs[t]-=parseFloat(e)},this),t.stats&&_.each(t.stats,function(t,n){switch(n){case"speed":e=="mainhand"&&(this.attrs[n]=0),e=="offhand"&&(this.attrs["speed-oh"]=0);break;case"damage":e=="mainhand"&&(this.attrs[n]={min:0,max:0}),e=="offhand"&&(this.attrs["damage-oh"]={min:0,max:0});break;case"block-amount":this.attrs[n]=0;break;default:this.attrs[n]-=parseFloat(t)}},this)},parseItem:function(e,t){this.gear[t]=e,e.set&&(this.sets[e.set]||(this.sets[e.set]=0),this.sets[e.set]++),e.attrs&&_.each(e.attrs,function(t,n){typeof t!="object"&&isNaN(parseFloat(t))&&(t=0);switch(n){case"armor":if(e.type=="ring"||e.type=="amulet")this.attrs[n]?this.attrs[n]+=parseFloat(t):this.attrs[n]=parseFloat(t);break;case"plus-block":e.type!="shield"&&(this.attrs[n]?this.attrs[n]+=parseFloat(t):this.attrs[n]=parseFloat(t));break;case"minmax-damage":switch(e.type){case"extra":case"shield":case"belt":case"boots":case"bracers":case"chest":case"cloak":case"gloves":case"helm":case"pants":case"mighty-belt":case"shoulders":case"spirit-stone":case"voodoo-mask":case"wizard-hat":case"ring":case"amulet":case"quiver":case"mojo":case"source":this.attrs["min-damage"]?this.attrs["min-damage"]+=parseFloat(t.min):this.attrs["min-damage"]=parseFloat(t.min),this.attrs["max-damage"]?this.attrs["max-damage"]+=parseFloat(t.max):this.attrs["max-damage"]=parseFloat(t.max);break;default:}break;case"max-damage":case"min-damage":case"plus-damage":switch(e.type){case"extra":case"shield":case"belt":case"boots":case"bracers":case"chest":case"cloak":case"gloves":case"helm":case"pants":case"mighty-belt":case"shoulders":case"spirit-stone":case"voodoo-mask":case"wizard-hat":case"ring":case"amulet":case"quiver":case"mojo":case"source":this.attrs[n]?this.attrs[n]+=parseFloat(t):this.attrs[n]=parseFloat(t);break;default:}break;case"attack-speed":switch(e.type){case"extra":case"shield":case"belt":case"boots":case"bracers":case"chest":case"cloak":case"gloves":case"helm":case"pants":case"mighty-belt":case"shoulders":case"spirit-stone":case"voodoo-mask":case"wizard-hat":case"ring":case"amulet":case"quiver":case"mojo":case"source":this.attrs["attack-speed-incs"]?this.attrs["attack-speed-incs"]+=t/100:this.attrs["attack-speed-incs"]=t/100;break;default:}break;default:typeof this.attrs[n]!="undefined"?this.attrs[n]+=parseFloat(t):this.attrs[n]=parseFloat(t)}},this),e.socketAttrs&&_.each(e.socketAttrs,function(e,t){typeof this.attrs[t]!="undefined"?this.attrs[t]+=parseFloat(e):this.attrs[t]=parseFloat(e)},this),e.stats&&_.each(e.stats,function(e,n){switch(n){case"speed":t=="mainhand"&&(this.attrs[n]=parseFloat(e)),t=="offhand"&&(this.isDuelWielding=!0,this.attrs["speed-oh"]=parseFloat(e));break;case"damage":t=="mainhand"&&(this.attrs[n]={min:e.min,max:e.max}),t=="offhand"&&(this.attrs["damage-oh"]={min:e.min,max:e.max});break;case"block-amount":this.attrs[n]=e.min+"-"+e.max;break;default:this.attrs[n]?this.attrs[n]+=parseFloat(e):this.attrs[n]=parseFloat(e)}},this)},diff:function(e,t){var n={},r={"ap-max":"Max AP","plus-movement":"+Movement","plus-magic-find":"+Magic Find","plus-gold-find":"+Gold Find",thorns:"Thorns","life-hit":"Life/Hit","ap-on-crit":"AP/Crit","plus-block":"+Block",dps:"DPS",ehp:"EHP",intelligence:"Int",vitality:"Vit",dexterity:"Dex",strength:"Str",dodgePercent:"Dodge",blockChance:"Block %",allResist:"All Resists",lifeTotal:"Life",armorReduction:"Dmg Reduce","plus-life":"+Life",armor:"Armor","cold-resist":"Cold Res","lightning-resist":"Lightning Res","fire-resist":"Fire Res","arcane-resist":"Arcane Res","poison-resist":"Poison Res","physical-resist":"Physical Res","critical-hit":"Crit Hit","critical-hit-damage":"Crit Hit Dmg"};return _.each(e,function(i,s){typeof t[s]!="undefined"&&r.hasOwnProperty(s)&&(e[s]||(e[s]=0),t[s]||(t[s]=0),t[s]-e[s]!=0&&(n[s]=r[s]+"|"+Math.round((t[s]-e[s])*100)/100))}),n}}