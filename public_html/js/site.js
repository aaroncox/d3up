$(function() {
	$("#classSelect").bind('change', classFilter);
	$("#hasGuide").bind("change", classFilter);
	$("#isGeared").bind("change", classFilter);
	$(".build-paginator a").bind('click', setupPaginator);
	function setupPaginator() {
		var resultsTable = $(".recent-builds table tbody"),
				link = $(this).prop("href");
		resultsTable.addClass("ui-state-disabled");
		$.ajax({
			url: link,
			type: 'html',
			success: function(data) {
				var results = $("<div/>").append(data);
				resultsTable.replaceWith(results.find(".recent-builds table tbody"));
				$("#item-pagination a").bind('click', setupPaginator);
			}
		});
		return false;
	};	
	function classFilter() {
		var resultsTable = $(".recent-builds table tbody"),
				selectedClass = $("#classSelect").val(),
				hasGuide = $("#hasGuide").val(),
				isGeared = $("#isGeared").val();
		// if(selectedClass) {
			resultsTable.addClass("ui-state-disabled");
			$.ajax({
				url: '/build?class=' + selectedClass + "&guide=" + hasGuide + "&geared=" + isGeared,
				type: 'html',
				success: function(data) {
					var results = $("<div/>").append(data);
					resultsTable.replaceWith(results.find(".recent-builds table tbody"));
					$(".recent-builds table tfoot").replaceWith(results.find(".recent-builds table tfoot"));
					$("#item-pagination a").bind('click', setupPaginator);
				}
			});			
		// }
	}
});
