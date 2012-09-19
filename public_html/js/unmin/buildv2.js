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
    init: function(data) {
      this.calc = new d3up.BuildCalculator;
      this.heroClass = false;
      this.gear = {};
      this.skills = {
        actives: {},
        passives: {},
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
      this.run();
    }, 
    run: function() {
      this.calc.setBuild(this);
      this.stats = this.calc.run();
    },
    renderTo: function(elem) {
      var build = this,
          elements = elem.find("*[data-value]");
      elements.each(function() {
        var id = $(this).data("value"),
            value = build.stats[id],
            type = $(this).data("display");
        if(type) {
          switch(type) {
            default:
              console.log("Unknown Formatter: " + type);
              break;
          }
        }
        if(value) {
          value = Math.round(value * 100) / 100;
          value = value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");          
        } else {
          value = "~";
        }
        $(this).html(value);
      });
    },
    
    setGear: function(gear) {
      var build = this;
      $.each(gear, function(k,v) {
        var $this = $(v);
        var slot = $this.attr("data-slot"),
            item = $.parseJSON($this.attr("data-json"));
        build.gear[slot] = item;
      });
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
              console.log("Unknown Skills Type: " + type);
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