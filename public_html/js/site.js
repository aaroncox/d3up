$(function() {
	$(".class-selector img").bind('click', function() {
		console.log($(this).data('class'));
		var resultsTable = $(".recent-builds table tbody"),
				buildClass = $(this).data('class');
		resultsTable.addClass("ui-state-disabled");
		$.ajax({
			url: '/build?build-class=' + buildClass,
			type: 'html',
			success: function(data) {
				var results = $("<div/>").append(data);
				resultsTable.replaceWith(results.find(".recent-builds table tbody"));
				$(".recent-builds table tfoot").replaceWith(results.find(".recent-builds table tfoot"))
			}
		});
	});
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
});
