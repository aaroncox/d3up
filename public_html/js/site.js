$(function() {
	$(".class-selector img").bind('click', setClass);
	$("#hasGuide").bind("change", classFilter);
	$(".build-paginator a").bind('click', function() {
		var resultsTable = $(".recent-builds table tbody"),
				link = $(this).prop("href");
		resultsTable.addClass("ui-state-disabled");
		$.ajax({
			url: link,
			type: 'html',
			success: function(data) {
				var results = $("<div/>").append(data);
				resultsTable.replaceWith(results.find(".recent-builds table tbody"));
			}
		});
		return false;
	});	
	var selectedClass = null;
	function setClass() {
		selectedClass = $(this).data('class');
		classFilter();
	}
	function classFilter() {
		var resultsTable = $(".recent-builds table tbody"),
				hasGuide = $("#hasGuide").val();
		if(selectedClass) {
			resultsTable.addClass("ui-state-disabled");
			$.ajax({
				url: '/build?build-class=' + selectedClass + "&guide=" + hasGuide,
				type: 'html',
				success: function(data) {
					var results = $("<div/>").append(data);
					resultsTable.replaceWith(results.find(".recent-builds table tbody"));
					$(".recent-builds table tfoot").replaceWith(results.find(".recent-builds table tfoot"))
				}
			});			
		}
	}
});
