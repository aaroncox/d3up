$(function() {
	$(".d3up-table:has(.select-all)").on("change", ".select-all", function() {
		$(this).closest(".d3up-table").find(".select input").prop("checked", this.checked);
	});
	$(".d3up-table:has(.delete-selected)").on("click", ".delete-selected", function() {
		var selected = $(this).closest(".d3up-table").find(".select input").filter(function() {
			return this.checked;
		}).closest("tr").map(function() {
			return this.id.replace("item-", "");
		}).get();
		window.location = "/user/delete-items?ids=" + selected.join(",");
	});
	$(".select-all").bind('change', function() {
	})
	$("#buildSelect").chosen({allow_single_deselect: true});
	$("#itemType").chosen({allow_single_deselect: true});
	$("#itemType").bind('change', getResults);
	$("#slotType").chosen({allow_single_deselect: true});
	$("#slotType").bind('change', getResults);
	// $("#sellMethod").chosen({allow_single_deselect: true});
	// $("#sellMethod").bind('change', getResults);
	var priceTimer = null;
	$("#maxPrice").keyup(function(){
	    clearTimeout(priceTimer);
	    priceTimer = setTimeout(function(){
				getResults();
	    }, 500);
	});
	$("#sortAttributes").chosen({allow_single_deselect: true});
	$("#sortAttributes").bind('change', getResults);
	$(".d3up-table:has(#item-pagination)").on("click", "#item-pagination a", bindPagination);
	function bindPagination() {
		var target = $(this).closest('.d3up-table').find('tbody'),
				link = $(this).prop("href");
		target.addClass("ui-state-disabled");
		$.ajax({
			url: link,
			type: 'html',
			success: function(data) {
				target.replaceWith(data);
			},
			error: function() {
				window.location = link;
			}
		});
		return false;
	};
	function getResults() {
		setTimeout(function() {
			var resultsTable = $("#my-items tbody"),
					itemType = $("#itemType").val(),
					slotType = $("#slotType").val(),
					sortAttr = $("#sortAttributes").val(),
					maxPrice = $("#maxPrice").val(),
					sellMethod = $("#sellMethod").val(),
					sortAttrs = [],
					url = window.location.pathname;
			if(itemType && itemType != "") {
				url += '/type/' + itemType;
			}
			if(slotType && slotType != "") {
				url += '/slot/' + slotType;				
			}
			if(maxPrice && maxPrice != "") {
				url += '/limit/' + maxPrice;
			}
			if(sellMethod && sellMethod != "") {
				url += '/sellMethod/' + sellMethod;
			}
			if(sortAttr && sortAttr != "") {
				$("#sortAttributes_chzn ul li a").each(function() {
					sortAttrs.push($("#sortAttributes option:eq(" + $(this).attr("rel") + ")").val());
				});
				url += '/sort/' + sortAttrs.join(",");
			}
			resultsTable.addClass("ui-state-disabled");
			$("#my-items tbody").html("<h3 style='color: #777; text-align: center;'>Loading</h3>");
			$.ajax({
				url: url,
				type: 'html',
				success: function(data) {
					setTimeout(function() {
						$("#my-items tbody").replaceWith(data);
						$("#item-pagination a").bind('click', bindPagination);
						$("#buildSelect").trigger('change');
						$("a[data-json]").each(function() {
							$(this).bindTooltip();							
						});
					}, 0);
				}
			});
		}, 0);
	}		
});