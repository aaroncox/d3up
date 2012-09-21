(function( d3up ) {
  function Compare() {
  	return this.init();
  }
  Compare.prototype = {
    init: function(data) {

    },
    table: function(diff, target) {
      var build = d3up.builds.build,
			    compare = d3up.builds[target],
          tBody = $("<tbody/>"),
          tHeader = $("<tr/>");
      tHeader.append("<th>Stat</th>", "<th>Diff</th>", "<th>Old</th>", "<th>New</th>");
      tBody.append(tHeader);
      $.each(diff, function(k,v) {
  			var data = v.split("|"),
  					diffVal = data[1],
  					diffName = data[0],
  					row = $("<tr/>");
  			row.append($("<td/>").html(diffName));
  			var oldStat = Math.round(build.stats[k] * 100) / 100,
  					newStat = Math.round(compare.stats[k] * 100) / 100;
  			if(oldStat > 99999) {
  				oldStat = Math.round(oldStat / 10) / 100 + "k";
  			}
  			if(newStat > 99999) {
  				newStat = Math.round(newStat / 10) / 100 + "k";
  			}
  			if(diffVal > 0) {
  				row.append($("<td/>").html("+"+diffVal).addClass("pos"));
  				row.append($("<td class='neg'/>").html(oldStat));
  				row.append($("<td class='pos'/>").html(newStat));				
  			} else {
  				row.append($("<td/>").html(diffVal).addClass("neg"));
  				row.append($("<td class='pos'/>").html(oldStat));
  				row.append($("<td class='neg'/>").html(newStat));				
  			}
  			tBody.append(row);
  		});
      return tBody;
    }
  }
  d3up.Compare = Compare;
})( d3up );