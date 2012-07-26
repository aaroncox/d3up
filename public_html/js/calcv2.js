var buildCalculator={"class":null,gearSelector:null,passiveSkills:[],activeSkills:[],gear:{},attrs:{},stats:{},bonuses:{},values:{},vsLevel:60,isDuelWielding:!1,init:function(){this.stats={armor:0,"block-chance":0,speed:0},this.attrs={primary:null,strength:0,dexterity:0,intelligence:0,vitality:0,"plus-life":0,armor:0,"cold-resist":0,"lightning-resist":0,"fire-resist":0,"arcane-resist":0,"poison-resist":0,"physical-resist":0,"plus-block":0,"critical-hit":5,"critical-hit-damage":50,"melee-reduce":0,"range-reduce":0,"elite-reduce":0},this.gear={},this.values={},this.bonuses={"plus-resist-all":0,"plus-armor":0,"plus-dodge":0}},setClass:function(e){switch(e){case"wizard":case"witch-doctor":this.attrs.primary="intelligence",this.attrs.strength+=67,this.attrs.dexterity+=67,this.attrs.intelligence+=187;break;case"barbarian":this.attrs.primary="strength",this.attrs.strength+=187,this.attrs.dexterity+=67,this.attrs.intelligence+=67;break;case"demon-hunter":case"monk":this.attrs.primary="dexterity",this.attrs.strength+=67,this.attrs.dexterity+=187,this.attrs.intelligence+=67}this.attrs.vitality+=127,this.class=e},getClass:function(){return this.class},setPassives:function(e){this.passiveSkills=e()},addBonus:function(e,t){this.bonuses[e]?this.bonuses[e]+=t:this.bonuses[e]=t},setVsLevel:function(e){this.vsLevel=e},setGear:function(e){var t={};this.gearSelector=e,$(this.gearSelector).each(function(){var e=$(this).parent().data("slot"),n=$(this).data("json");t[e]=n}),this.gear=t,_.each(this.gear,this.parseItem,this)},getItem:function(e){return this.gear[e]},setPassives:function(e){this.passiveSkills=e},getItemLink:function(e){if(e==null)return"";var t=$("<a href='/i/"+e.id+"' class='quality-"+e.quality+"'/>").attr("data-json",JSON.stringify(e)).html(e.name);return t.bindTooltip(),t},applyPassives:function(){_.each(this.passiveSkills,function(e,t){typeof passives[this.class][e]["effect"]!="undefined"&&_.each(passives[this.class][e].effect,function(e,t){switch(t){case"sharpshooter":mathDpsSpecialName="Sharpshooter",mathDpsSpecial=((mathDamage.min+mathDamage.max)/2+mathDamageAdd)*this.stats.speed*mathSpeedAdditive*(primaryAttr/100+1)*1*(1*(mathCriticalHitDamage/100)+1),mathDpsSpecial=Math.round(mathDps*100)/100;break;case"plus-thorns":case"plus-armor":case"plus-resist-all":case"plus-damage":this.addBonus(t,e);break;case"flatten-resists":var n=0,r=["fire-resist","cold-resist","arcane-resist","lightning-resist","poison-resist","physical-resist"];_.each(r,function(e){this.attrs[e]>0&&this.attrs[e]>n&&(n=this.attrs[e])},this),_.each(r,function(e){this.attrs[e]=n},this);break;case"melee-reduce":case"plus-movement-speed":case"max-spirit":case"max-hatred":case"max-fury":case"life-steal":case"cc-reduce":this.attrs[t]?this.attrs[t]+=e*100:this.attrs[t]=e*100;break;case"damage-reduce":mathDamageReduce*=1+e;break;case"health-globes":break;case"critical-to-dodge":this.bonuses["critical-to-dodge"]=!0;break;case"dexterity-to-armor":this.stats.armor=this.stats.armor+this.attrs.dexterity*e;break;case"vitality-to-armor":this.stats.armor=this.stats.armor+this.attrs.vitality*e;break;case"critical-hit-damage":this.attrs["critical-hit-damage"]=this.attrs["critical-hit-damage"]+e*100;break;case"plus-mana":break;case"critical-hit":this.attrs["critical-hit"]=this.attrs["critical-hit"]+e*100;break;case"switch":e.var=="isDuelWielding"&&_.each(e.cases,function(e,t){e.case==this.isDuelWielding&&_.each(e.effect,function(e,t){switch(t){case"plus-dodge":this.bonuses["plus-dodge"]+=e}},this)},this),typeof this.gear[e.var]!="undefined"&&_.each(e.cases,function(t,n){var r=!1;_.each(t.case.split("|"),function(n,r){n==this.gear[e.var][e.lookup]&&_.each(t.effect,function(e,t){switch(t){case"plus-damage":this.bonuses["plus-damage"]?this.bonuses["plus-damage"]+=e:this.bonuses["plus-damage"]=e;break;case"critical-hit-damage":this.attrs["critical-hit-damage"]=this.attrs["critical-hit-damage"]+e*100;break;case"attack-speed":this.attrs["attack-speed-incs"]?this.attrs["attack-speed-incs"]+=e:this.attrs["attack-speed-incs"]=e;break;case"critical-hit":this.attrs["critical-hit"]=this.attrs["critical-hit"]+e*100;break;default:console.log("Unhandled Switch: "+t+" ["+e+"]")}},this)},this)},this);break;default:console.log("Unhandled Effect: "+t+"["+e+"]")}},this)},this)},run:function(){this.applyPassives(),this.values.life=276+35*this.attrs.vitality,this.values.lifeTotal=this.values.life+this.values.life*this.attrs["plus-life"]*.01,this.values.armor=(this.stats.armor+this.attrs.strength+this.attrs.armor)*(1+this.bonuses["plus-armor"]),this.values.armorReduction=this.values.armor/(50*this.vsLevel+this.values.armor),this.values.allResist=(this.attrs["resist-all"]+this.attrs.intelligence/10)*(1+this.bonuses["plus-resist-all"]),this.values["resist-physical"]=this.values.allResist+this.attrs["physical-resist"],this.values["resist-cold"]=this.values.allResist+this.attrs["cold-resist"],this.values["resist-fire"]=this.values.allResist+this.attrs["fire-resist"],this.values["resist-lightning"]=this.values.allResist+this.attrs["lightning-resist"],this.values["resist-poison"]=this.values.allResist+this.attrs["poison-resist"],this.values["resist-arcane"]=this.values.allResist+this.attrs["arcane-resist"],this.values["resper-all"]=this.values.allResist/(5*this.vsLevel+this.values.allResist),this.values["resper-physical"]=this.values["resist-physical"]/(5*this.vsLevel+this.values["resist-physical"]),this.values["resper-cold"]=this.values["resist-cold"]/(5*this.vsLevel+this.values["resist-cold"]),this.values["resper-fire"]=this.values["resist-fire"]/(5*this.vsLevel+this.values["resist-fire"]),this.values["resper-lightning"]=this.values["resist-lightning"]/(5*this.vsLevel+this.values["resist-lightning"]),this.values["resper-poison"]=this.values["resist-poison"]/(5*this.vsLevel+this.values["resist-poison"]),this.values["resper-arcane"]=this.values["resist-arcane"]/(5*this.vsLevel+this.values["resist-arcane"]),this.values.blockChance=this.stats["block-chance"]+this.attrs["plus-block"];var e=dodge=this.attrs.dexterity;this.values.dodgePercent=0,_.each([[100,.1],[400,.025],[500,.02],[7e3,.01]],function(t,n){e>t[0]?(e-=t[0],this.values.dodgePercent+=t[0]*t[1]):(this.values.dodgePercent+=e*t[1],e=0)},this),this.bonuses["critical-to-dodge"]&&(this.values.dodgePercent+=this.attrs["critical-hit"]*.3),this.values.dodgePercent+=this.bonuses["plus-dodge"]*100,this.class=="monk"||this.class=="barbarian"?(this.values.damageTaken=(1-this.values["resper-all"])*(1-this.values.armorReduction)*.7,this.values["ehp-physical"]=this.values.lifeTotal/((1-this.values.armorReduction)*(1-this.values["resper-physical"])*.7),this.values["ehp-cold"]=this.values.lifeTotal/((1-this.values.armorReduction)*(1-this.values["resper-cold"])*.7),this.values["ehp-fire"]=this.values.lifeTotal/((1-this.values.armorReduction)*(1-this.values["resper-fire"])*.7),this.values["ehp-lightning"]=this.values.lifeTotal/((1-this.values.armorReduction)*(1-this.values["resper-lightning"])*.7),this.values["ehp-poison"]=this.values.lifeTotal/((1-this.values.armorReduction)*(1-this.values["resper-poison"])*.7),this.values["ehp-arcane"]=this.values.lifeTotal/((1-this.values.armorReduction)*(1-this.values["resper-arcane"])*.7)):(this.values.damageTaken=(1-this.values["resper-all"])*(1-this.values.armorReduction),this.values["ehp-physical"]=this.values.lifeTotal/((1-this.values.armorReduction)*(1-this.values["resper-physical"])),this.values["ehp-cold"]=this.values.lifeTotal/((1-this.values.armorReduction)*(1-this.values["resper-cold"])),this.values["ehp-fire"]=this.values.lifeTotal/((1-this.values.armorReduction)*(1-this.values["resper-fire"])),this.values["ehp-lightning"]=this.values.lifeTotal/((1-this.values.armorReduction)*(1-this.values["resper-lightning"])),this.values["ehp-poison"]=this.values.lifeTotal/((1-this.values.armorReduction)*(1-this.values["resper-poison"])),this.values["ehp-arcane"]=this.values.lifeTotal/((1-this.values.armorReduction)*(1-this.values["resper-arcane"]))),this.values.ehp=this.values.lifeTotal/this.values.damageTaken,this.values["ehp-dodge"]=this.values.lifeTotal/(this.values.damageTaken*(1-this.values.dodgePercent/100)),this.values["ehp-melee"]=this.values.lifeTotal/(this.values.damageTaken*(1-this.attrs["melee-reduce"]/100)),this.values["ehp-range"]=this.values.lifeTotal/(this.values.damageTaken*(1-this.attrs["range-reduce"]/100/100)),this.values["ehp-elite"]=this.values.lifeTotal/(this.values.damageTaken*(1-this.attrs["elite-reduce"]/100/100)),_.each(this.gear,function(e,t){var n=t;this.removeItem(t);var r=this.attrs.vitality,i=this.attrs["resist-all"],s=this.attrs.intelligence,o=this.stats.armor,u=this.attrs.strength,a=this.attrs["plus-life"],f=this.attrs.armor,l=276+35*r,c=l+l*(a/100),h=(o+u+f)*(1+this.bonuses["plus-armor"]),p=h/(50*this.vsLevel+h),d=(i+s/10)*(1+this.bonuses["plus-resist-all"]),v=d/(5*this.vsLevel+d),m=(1-v)*(1-p);if(this.class=="monk"||this.class=="barbarian")m=(1-v)*(1-p)*.7;this.values["ehp-"+t]=this.values.ehp-c/m,this.parseItem(e,t)},this),this.values["dps-speed"]=this.stats.speed,this.values["dps-damage"]=this.stats.damage,this.values.dps=0,this.values["dps-addDamageAvg"]=0,this.values["dps-addDamageMin"]=0,this.values["dps-addDamageMax"]=0,this.stats["damage-oh"]&&(this.values["dps-damage-oh"]=this.stats["damage-oh"]);if(this.attrs["max-damage"]||this.attrs["min-damage"])this.values["dps-addDamageAvg"]=((this.attrs["max-damage"]?this.attrs["max-damage"]:0)+(this.attrs["min-damage"]?this.attrs["min-damage"]:0))/2,this.attrs["min-damage"]&&(this.values["dps-addDamageMin"]=this.attrs["min-damage"]),this.attrs["max-damage"]&&(this.values["dps-addDamageMax"]=this.attrs["max-damage"]);return this.values["dps-addAttackSpeed"]=this.attrs["attack-speed-incs"]?this.attrs["attack-speed-incs"]:0,this.values["dps-damage"]&&(this.values.dps=this.calculateDps()),_.each(this.gear,function(e,t){var n=t;this.removeItem(t),this.values["dps-"+t]=this.values.dps-this.calculateDps(),this.parseItem(e,t)},this),this.values=jQuery.extend(this.attrs,this.values),this.values},calculateDps:function(){var e=0;if(this.isDuelWielding){this.values["dps-speed"]={mh:Math.floor(this.stats.speed*1024)/1024,oh:Math.floor(this.stats["speed-oh"]*1024)/1024};var t=((this.values["dps-damage"].min+this.values["dps-damage"].max+this.values["dps-damage-oh"].min+this.values["dps-damage-oh"].max)/2+this.values["dps-addDamageAvg"])/2,n=(this.values["dps-speed"].mh+this.values["dps-speed"].oh)/2,r=1.15+this.values["dps-addAttackSpeed"],i=1+this.attrs[this.attrs.primary]/100,s=1+this.attrs["critical-hit"]/100*(this.attrs["critical-hit-damage"]/100);this.values["dps-speedTotal"]=Math.round(this.values["dps-speed"].mh*(1+this.values["dps-addAttackSpeed"]+.15)*100)/100,e=Math.round(t*n*r*i*s*100)/100}else this.values["dps-speed"]=Math.floor(this.values["dps-speed"]*1024)/1024,this.values["dps-speedTotal"]=Math.round(this.values["dps-speed"]*(1+this.values["dps-addAttackSpeed"])*100)/100,e=((this.values["dps-damage"].min+this.values["dps-damage"].max)/2+this.values["dps-addDamageAvg"])*this.values["dps-speed"]*(1+this.values["dps-addAttackSpeed"])*(this.attrs[this.attrs.primary]/100+1)*1*(this.attrs["critical-hit"]/100*(this.attrs["critical-hit-damage"]/100)+1);return this.bonuses["plus-damage"]?Math.round(e*(1+this.bonuses["plus-damage"])*100)/100:e},removeItem:function(e){var t=this.gear[e];t.attrs&&_.each(t.attrs,function(e,n){switch(n){case"armor":if(t.type=="ring"||t.type=="amulet")this.attrs[n]-=parseFloat(e);break;case"plus-block":t.type!="shield"&&(this.attrs[n]-=parseFloat(e));break;case"max-damage":case"min-damage":switch(t.type){case"shield":case"belt":case"boots":case"bracers":case"chest-armor":case"cloak":case"gloves":case"helm":case"pants":case"mighty-belt":case"shoulder":case"spirit-stone":case"voodoo-mask":case"wizard-hat":case"ring":case"amulet":case"quiver":case"mojo":case"source":this.attrs[n]-=parseFloat(e);break;default:}break;case"attack-speed":switch(t.type){case"shield":case"belt":case"boots":case"bracers":case"chest-armor":case"cloak":case"gloves":case"helm":case"pants":case"mighty-belt":case"shoulder":case"spirit-stone":case"voodoo-mask":case"wizard-hat":case"ring":case"amulet":case"quiver":case"mojo":case"source":this.attrs["attack-speed-incs"]-=e/100;break;default:}break;default:this.attrs[n]-=parseFloat(e)}},this),t.socketAttrs&&_.each(t.socketAttrs,function(e,t){this.attrs[t]-=parseFloat(e)},this),t.stats&&_.each(t.stats,function(t,n){switch(n){case"speed":e=="mainhand"&&(this.stats[n]=0),e=="offhand"&&(this.stats["speed-oh"]=0);break;case"damage":e=="mainhand"&&(this.stats[n]={min:0,max:0}),e=="offhand"&&(this.stats["damage-oh"]={min:0,max:0});break;case"block-amount":this.stats[n]=0;break;default:this.stats[n]-=parseFloat(t)}},this),this.gear[e]=!1},parseItem:function(e,t){this.gear[t]=e,e.attrs&&_.each(e.attrs,function(t,n){switch(n){case"armor":if(e.type=="ring"||e.type=="amulet")this.attrs[n]?this.attrs[n]+=parseFloat(t):this.attrs[n]=parseFloat(t);break;case"plus-block":e.type!="shield"&&(this.attrs[n]?this.attrs[n]+=parseFloat(t):this.attrs[n]=parseFloat(t));break;case"max-damage":case"min-damage":switch(e.type){case"shield":case"belt":case"boots":case"bracers":case"chest-armor":case"cloak":case"gloves":case"helm":case"pants":case"mighty-belt":case"shoulder":case"spirit-stone":case"voodoo-mask":case"wizard-hat":case"ring":case"amulet":case"quiver":case"mojo":case"source":this.attrs[n]?this.attrs[n]+=parseFloat(t):this.attrs[n]=parseFloat(t);break;default:}break;case"attack-speed":switch(e.type){case"shield":case"belt":case"boots":case"bracers":case"chest-armor":case"cloak":case"gloves":case"helm":case"pants":case"mighty-belt":case"shoulder":case"spirit-stone":case"voodoo-mask":case"wizard-hat":case"ring":case"amulet":case"quiver":case"mojo":case"source":this.attrs["attack-speed-incs"]?this.attrs["attack-speed-incs"]+=t/100:this.attrs["attack-speed-incs"]=t/100;break;default:}break;default:typeof this.attrs[n]!="undefined"?this.attrs[n]+=parseFloat(t):this.attrs[n]=parseFloat(t)}},this),e.socketAttrs&&_.each(e.socketAttrs,function(e,t){typeof this.attrs[t]!="undefined"?this.attrs[t]+=parseFloat(e):this.attrs[t]=parseFloat(e)},this),e.stats&&_.each(e.stats,function(e,n){switch(n){case"speed":t=="mainhand"&&(this.stats[n]=parseFloat(e)),t=="offhand"&&(this.isDuelWielding=!0,this.stats["speed-oh"]=parseFloat(e));break;case"damage":t=="mainhand"&&(this.stats[n]={min:e.min,max:e.max}),t=="offhand"&&(this.stats["damage-oh"]={min:e.min,max:e.max});break;case"block-amount":this.stats[n]=e.min+"-"+e.max;break;default:this.stats[n]?this.stats[n]+=parseFloat(e):this.stats[n]=parseFloat(e)}},this)},diff:function(e,t){var n={},r={"ap-max":"Max AP","plus-movement":"+Movement","plus-magic-find":"+Magic Find","plus-gold-find":"+Gold Find",thorns:"Thorns","life-hit":"Life/Hit","ap-on-crit":"AP/Crit","plus-block":"+Block",dps:"DPS",ehp:"EHP",intelligence:"Int",vitality:"Vit",dexterity:"Dex",strength:"Str",dodgePercent:"Dodge",blockChance:"Block %",allResist:"All Resists",lifeTotal:"Life",armorReduction:"Dmg Reduce","plus-life":"+Life",armor:"Armor","cold-resist":"Cold Res","lightning-resist":"Lightning Res","fire-resist":"Fire Res","arcane-resist":"Arcane Res","poison-resist":"Poison Res","physical-resist":"Physical Res","critical-hit":"Crit Hit","critical-hit-damage":"Crit Hit Dmg"};return _.each(e,function(i,s){typeof t[s]!="undefined"&&r.hasOwnProperty(s)&&(e[s]||(e[s]=0),t[s]||(t[s]=0),t[s]-e[s]!=0&&(n[s]=r[s]+"|"+Math.round((t[s]-e[s])*100)/100))}),n}}