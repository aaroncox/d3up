$(function() {
	// Sticky Toolbar on the page
	var $window = $(window),
			$stickyEl = $('#toolbar');

	var elTop = $stickyEl.offset().top;
	$window.scroll(function() {
		var windowTop = $window.scrollTop();
		$stickyEl.toggleClass('sticky', windowTop > elTop);
	});
	// Confirm Leaving the Page
	window.onbeforeunload = confirmExit;
	function confirmExit()
	{
	  return 'WARNING! If you leave this page without clicking "Save Sections", any changes you made to the sections will be LOST!';
	}
	
	var guideBuilder = {
		guide: $("#guide"),
		sections: false,
		toolbar: $("#toolbar"),
		addSection: function() {
			var section = $("<div class='section'>"),
					title = $("<h3 class='section-title'>Title of Section</h3>"),
					body = $("<div class='section-content'>Body of Section</div>");
			section.append(title, body);
			this.addControls(section);
			this.sections.append(section);			
		},
		addControls: function(section) {
			var controls = $("<div class='section-control'>"),
					btnEdit = $("<a class='btnEdit'>Edit</a>").button(),
					btnDelete = $("<a class='btnDelete'>Delete</a>").button(),
					btnDone = $("<a class='btnDone'>Done Editing</a>").button(),
					editWrap = $("<div class='editing'>"),
					title = section.find("h3.section-title"),
					body = section.find("div.section-content"),
					titleEdit = $("<input class='titleEdit' type='text' value='" + title.text() + "'>"),
					bodyEdit = $("<textarea class='bodyEdit' style='width: 100%; height: 300px'>").html(body.html());
			// Add the Buttons to the Section
			this.bindEdit(btnEdit, section);
			this.bindDelete(btnDelete, section);
			this.bindDone(btnDone, section);
			// Hide Done for now
			btnDone.hide();
			// Append the Controls
			controls.append(btnDone, btnEdit, btnDelete);
			// Bind the new Editors
			titleEdit.bind("keyup", function() {
				title.html($(this).val());
			});
			bodyEdit.bind("keyup", function() {
				body.html($(this).val());
			});
			// Append them to the Wrapper
			section.prepend(controls);
			editWrap.append($("<h3>").append(titleEdit), bodyEdit);
			editWrap.hide();
			// Append them to the Section
			section.append(editWrap);
		},
		bindDone: function(btn, section) {
			var $this = this;
			btn.bind('click', function() {
				section.find(".titleEdit").remove();
				section.find(".bodyEdit").remove();
				section.find(".section-control").remove();
				section.find("h3").show();
				section.find("div.section-content").show();				
				$this.addControls(section);
			});
		},
		bindEdit: function(btn, section) {
			var $this = this;
			btn.bind('click', function() {
				var	title = section.find("h3.section-title"),
						body = section.find("div.section-content"),
						done = section.find(".btnDone"),
						edit = section.find(".btnEdit"),
						editor = section.find(".editing");
				done.show();
				edit.hide();
				// Hide the Real Elements
				title.hide();
				body.hide();
				// Show the Text Fields
				editor.show();
			});
		},
		bindDelete: function(btn, section) {
			btn.bind('click', function() {
				$("<p>Are you sure you want to delete this section?</p>").dialog({
					resizable: false,
					modal: true,
					buttons: {
						Confirm: function() {
							section.remove();
							$( this ).dialog("close");
						},
						Cancel: function() {
							$( this ).dialog( "close" );
						}
					}
				});
			});
		},
		addBindings: function() {
			var $this = this;
			this.btnNewsSection.bind('click', function() {
				$this.addSection();
			});
			this.btnSaveGuide.bind('click', function() {
				// $.ajax({
				// 	data: 
				// })
			});
		},
		init: function() {
			// Setup jQuery Elements
			this.btnNewsSection = this.toolbar.find(".createSection");
			this.btnSaveGuide = this.toolbar.find(".saveGuide");
			this.sections = this.guide.find(".content");
			// Add all the Bindings
			this.addBindings();			
		}
	}
	
	var builder = Object.create(guideBuilder);
	builder.init();
});
