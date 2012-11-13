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
      tHeader.append("<th>Stat</th>", "<th class='diff'>Diff</th>", "<th>%</th>", "<th>Old</th>", "<th>New</th>");
      tBody.append(tHeader);
      $.each(diff, function(k,v) {
  			var data = v.split("|"),
  					diffVal = data[1],
  					diffName = data[0],
  					row = $("<tr/>");
  			row.append($("<td/>").html(diffName));
  			var oldStat = Math.round(build.stats[k] * 10) / 10,
  					newStat = Math.round(compare.stats[k] * 10) / 10,
						change = Math.round(100 - (newStat / oldStat * 100)) * -1;				
  			if(oldStat > 9999) {
  				oldStat = Math.round(oldStat / 100) / 10 + "k";
  			}
  			if(newStat > 9999) {
  				newStat = Math.round(newStat / 100) / 10 + "k";
  			}
				diffVal = diffVal.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");			
				oldStat = oldStat.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");			
				newStat = newStat.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");			
  			if(data[1] > 0) {
  				row.append($("<td class='diff'>").html("+"+diffVal).addClass("pos"));
          row.append($("<td class='per pos'/>").html(change + "%"));       
  				row.append($("<td class='neg'>").html(oldStat));
  				row.append($("<td class='pos'>").html(newStat));				
  			} else {
  				row.append($("<td class='diff'>").html(diffVal).addClass("neg"));
          row.append($("<td class='per neg'/>").html(change + "%"));       
  				row.append($("<td class='pos'>").html(oldStat));
  				row.append($("<td class='neg'>").html(newStat));				
  			}
  			tBody.append(row);
  		});
      return tBody;
    }
  }
  d3up.Compare = Compare;
})( d3up );