$(function() {
	// Sticky Toolbar on the page
	var $window = $(window),
			$stickyEl = $('#toolbar');
	if($stickyEl.length) {
		var elTop = $stickyEl.offset().top;
		$window.scroll(function() {
			var windowTop = $window.scrollTop();
			$stickyEl.toggleClass('sticky', windowTop > elTop);
		});
		// Confirm Leaving the Page
	}
	
	var guideBuilder = {
		heroClass: false,
		guide: $("#guide"),
		data: [],
		sections: false,
		skills: {},
		passives: {},
		toc: $("#toc"),
		toolbar: $("#toolbar"),
		saveStatus: $("#save-status"),
		isOwner: false,
		hasChanges: false,
		addSection: function() {
			var section = $("<div class='section'>"),
					title = $("<h3 class='section-title'>Title of Section</h3>"),
					body = $("<div class='section-content'>Body of Section</div>"),
					tocEntry = $("<li><a>Title of Section</a></li>"),
					count = this.data.length;
			// Add to the Table of Contents
			tocEntry.attr("data-section", count);
			// Associate the TOC Link to the Section
			tocEntry.find("a").attr("href", "#section-" + count);
			this.toc.append(tocEntry);
			// Add the data-section tag onto the new section
			section.attr("data-section", count);
			// Add the ID onto the section for the TOC to find.
			section.attr("id", "section-" + count);
			// Buid the Object for the Data array
			var newSection = {
				title: 'Title of Section',
				content: 'Body of Section'
			};
			// Push the Object into the Array
			this.data.push(newSection);
			// Append the Title & Body to Section
			section.append(title, body);
			// Add the Controls to the Section
			this.addControls(section);
			// Set Unsaved
			this.saveStatusChange(false);
			// Append the Section
			this.sections.append(section);			
		},
		addSkillControls: function(section) {
			var $this = this,
					id = section.data("skill"),
					controls = $("<div class='section-control'>"),
					btnEdit = $("<a class='button btnEdit'>Edit Explanation</a>"),
					body = section.find("div.skill-content");
			if(this.isOwner) {
				// Add the Buttons to the Section
				this.bindSkillEdit(btnEdit, section);
				// Append the Controls
				controls.append(btnEdit);
			}
			// Append them to the Wrapper
			section.prepend(controls);
		},
		addPassiveControls: function(section) {
			var $this = this,
					id = section.data("skill"),
					controls = $("<div class='section-control'>"),
					btnEdit = $("<a class='button btnEdit'>Edit Explanation</a>"),
					body = section.find("div.skill-content");
			if(this.isOwner) {
				// Add the Buttons to the Section
				this.bindPassiveEdit(btnEdit, section);
				// Append the Controls
				controls.append(btnEdit);
			}
			// Append them to the Wrapper
			section.prepend(controls);
		},
		toggleHidden: function(section) {
			var id = section.attr("data-section"); 
			this.saveStatusChange(false);
			switch(section.attr('class')) {
				case "section":
					if(this.data[id]) {
						if(this.data[id].hidden == true) {
							this.data[id].hidden = false;																				
						} else {
							this.data[id].hidden = true;													
						}
					}
					break;
				default:
					break;
			}
			
		},
		toggleContent: function(section) {
			var content = section.find(".section-content");
			if(content.is(":visible")) {
				content.hide();
			} else {
				content.show();
			}
		},
		addControls: function(section) {
			var $this = this,
					id = section.attr("data-section"),
					hidden = section.data("hidden"),
					controls = $("<div class='section-control'>"),
					btnEdit = $("<a class='button btnEdit'>Edit</a>"),
					toggleHidden = $("<label for='tglHidden'>Hidden?</label><input type='checkbox' name='tglHidden' class='tglHidden'>"),
					btnDelete = $("<a class='button btnDelete'>Delete</a>"),
					btnTop = $("<a class='button btnTop'>Top</a>"),
					minWrap = $("<div class='wrap-button ui-state-default ui-corner-all'>"),
					minBtn = $("<span class='ui-icon ui-icon-minusthick'></span>"),
					title = section.find("h3.section-title"),
					body = section.find("div.section-content");
			btnTop.bind('click', function() {
				scrollTo(0,0);
			});
			if(hidden) {
				toggleHidden.attr("checked", "checked");
			}
			toggleHidden.bind('click', function() {
				$this.toggleHidden(section);
			});
			minBtn.bind('click', function() {
				$(this).toggleClass('ui-icon-minusthick ui-icon-plusthick');
				$this.toggleContent(section);
			})
			if(this.isOwner) {
				// Add the Buttons to the Section
				this.bindEdit(btnEdit, section);
				this.bindDelete(btnDelete, section);
				// Append the Controls
				controls.append(toggleHidden, btnEdit, btnDelete);
			}
			controls.append(btnTop);
			// Remove any existing controls
			section.find(".section-control").remove();
			section.find(".wrap-button").remove();
			// Append them to the Wrapper
			section.prepend(minWrap.append(minBtn));
			section.prepend(controls);
		},
		bindDone: function(btn, section) {
			var $this = this;
			btn.bind('click', function() {
				section.find(".editing").remove();
				section.find(".section-control").remove();
				section.find(".wrap-button").remove();
				section.find("h3.section-title").show();
				section.find("div.section-content").show();				
				$this.addControls(section);
			});
		},
		bindSkillDone: function(btn, section) {
			var $this = this;
			btn.bind('click', function() {
				section.find(".editing").remove();
				section.find(".section-control").remove();
				section.find("h3.section-title").show();
				section.parent().find("div.skill-content").show();		
				if(section.parent().find("div.skill-content").text().length == 0) {
					section.parent().find("div.skill-content").hide();
				}		
				$this.addSkillControls(section);
			});
		},
		bindPassiveDone: function(btn, section) {
			var $this = this;
			btn.bind('click', function() {
				section.find(".editing").remove();
				section.find(".section-control").remove();
				section.find("h3.section-title").show();
				section.parent().find("div.skill-content").show();		
				if(section.parent().find("div.skill-content").text().length == 0) {
					section.parent().find("div.skill-content").hide();
				}		
				$this.addPassiveControls(section);
			});
		},
		bindEdit: function(btn, section) {
			var $this = this;
			btn.bind('click', function() {
				var	id = section.attr("data-section"),
						title = section.find("h3.section-title"),
						body = section.find("div.section-content"),
						controls = section.find(".section-control"),
						minBtn = section.find(".wrap-button"),
						tocEntry = $this.toc.find("li[data-section=" + id + "] a"),
						btnDone = $("<a class='btnDone button' style='margin: 10px'>Done Editing</a>").button(),
						editWrap = $("<div class='editing'>"),
						titleEdit = $("<input class='titleEdit' style='width: 75%' type='text'\">").attr("value", title.text()),
						bodyEdit = $("<textarea class='bodyEdit' style='width: 100%; height: 500px'>").html(body.html().trim());
				controls.empty().append(btnDone);
				minBtn.remove();
				// Bind the new Editors
				titleEdit.bind("keyup", function() {
					title.html($(this).val().replace(/(<([^>]+)>)/ig,""));
					tocEntry.html($(this).val().replace(/(<([^>]+)>)/ig,""));
					$this.data[id].title = $(this).val();
					$this.saveStatusChange(false);
				});
				$this.bindDone(btnDone, section);
				editWrap.append($("<h3 class='ui-helper-clearfix' style='margin: 0; padding: 10px 0 0'>").append(titleEdit), bodyEdit);
				// Append them to the Section
				section.append(editWrap);
				bodyEdit.cleditor({
					width: '100%',
					height: '510px',
					docCSSFile: '/css/style.css',
					bodyStyle: "background: #111; padding: 0 10px;",
					docType: '<!DOCTYPE HTML>',
					updateTextArea: function(html) {
						html = html.replace(/\u00a0/g, " ").trim();
						body.html(html);
						bodyEdit.html(html);
						$this.data[id].content = html;
						$this.saveStatusChange(false);
					}
				});
				// Hide the Real Elements
				title.hide();
				body.hide();
			});
		},
		bindSkillEdit: function(btn, section) {
			var $this = this;
			btn.bind('click', function() {
				var	id = section.parent().data("id"),
						body = section.parent().find("div.skill-content"),
						controls = section.find(".section-control"),
						btnDone = $("<a class='btnDone button'>Done Editing</a>"),
						editWrap = $("<div class='editing'>"),
						bodyEdit = $("<textarea class='bodyEdit' style='width: 100%; height: 300px'>").html(body.html().trim());
				controls.empty().append(btnDone);
				$this.bindSkillDone(btnDone, section);
				editWrap.append(bodyEdit);
				// Append them to the Section
				section.append(editWrap);
				bodyEdit.cleditor({
					width: '100%',
					docCSSFile: '/css/style.css',
					bodyStyle: "background: #111; padding: 0 10px;",
					docType: '<!DOCTYPE HTML>',
					updateTextArea: function(html) {
						console.log(html);
						html = html.replace(/\u00a0/g, " ").trim();
						body.html(html);
						bodyEdit.html(html);
						$this.skills[id].content = html;
						$this.saveStatusChange(false);
					}
				});
				// Hide the Real Elements
				body.hide();
			});
		},
		bindPassiveEdit: function(btn, section) {
			var $this = this;
			btn.bind('click', function() {
				var	id = section.parent().data("id"),
						body = section.parent().find("div.skill-content"),
						controls = section.find(".section-control"),
						btnDone = $("<a class='btnDone button'>Done Editing</a>"),
						editWrap = $("<div class='editing'>"),
						bodyEdit = $("<textarea class='bodyEdit' style='width: 100%; height: 300px'>").html(body.html().trim());
				controls.empty().append(btnDone);
				$this.bindPassiveDone(btnDone, section);
				editWrap.append(bodyEdit);
				// Append them to the Section
				section.append(editWrap);
				bodyEdit.cleditor({
					width: '100%',
					docCSSFile: '/css/style.css',
					bodyStyle: "background: #111; padding: 0 10px;",
					docType: '<!DOCTYPE HTML>',
					updateTextArea: function(html) {
						html = html.replace(/\u00a0/g, " ").trim();
						body.html(html);
						bodyEdit.html(html);
						$this.passives[id].content = html;
						$this.saveStatusChange(false);
					}
				});
				// Hide the Real Elements
				body.hide();
			});
		},
		bindDelete: function(btn, section) {
			var $this = this;
			btn.bind('click', function() {
				$("<p>Are you sure you want to delete this section?</p>").dialog({
					resizable: false,
					modal: true,
					buttons: {
						Confirm: function() {
							section.remove();
							$this.saveStatusChange(false);
							$this.toc.find("li[data-section=" + section.attr("data-section") + "]").remove();
							$this.data.splice(section.attr("data-section"), 1);
							$( this ).dialog("close");
						},
						Cancel: function() {
							$( this ).dialog( "close" );
						}
					}
				});
			});
		},
		saveStatusChange: function(status) {
			this.hasChanges = status;
			if(status == true) {
				window.onbeforeunload = $.noop;
				this.saveStatus.removeClass("unsaved");
				this.saveStatus.html("Saved");
			} else {
				window.onbeforeunload = function confirmExit() {
				  return 'WARNING! If you leave this page without clicking "Save Sections", any changes you made to the sections will be LOST!';
				}		
				this.saveStatus.addClass("unsaved");
				this.saveStatus.html("Unsaved");				
			}
		},
		addBindings: function() {
			var $this = this;
			if(this.isOwner) {
				if(this.btnNewSection) {
					this.btnNewSection.bind('click', function() {
						$this.addSection();
					});
				}
				if(this.btnMinAll) {
					this.btnMinAll.bind('click', function() {
						if($(".section-content").is(":visible")) {
							$(".section-content").hide();							
						} else {
							$(".section-content").show();							
						}
					});
				}
				if(this.btnSaveGuide) {
					this.btnSaveGuide.bind('click', function() {
						$(".btnDone").trigger('click');
						$.ajax({
						  type: 'POST',
						  data: {
								sections: $this.data,
								skills: $this.skills,
								passives: $this.passives,
							},
							success: function() {
								$this.saveStatusChange(true);
							}
						});
					});								
				}
			}
		},
		getSections: function() {
			var $this = this;
			$(".section[data-section]").each(function() {
				var id = $(this).attr("data-section"),
						title = $(this).find(".section-title").text(),
						content = $(this).find(".section-content").html(),
						hidden = $(this).data("hidden");
				$this.data[id] = {
					title: title,
					content: content,
					hidden: hidden
				};
				$this.addControls($(this));
			});
		},
		addSkillPickers: function() {
			for(i = 1; i <= 6; i++) {
				var $this = this,
						picker = $("<select data-id='" + i + "'>"), 
						wrapper = $("<div class='skill-picker'>");
				if(!$this.skills[i]) {
					$this.skills[i] = {
						skill: 'null',
						content: 'null'
					};					
				}
				picker.append("<option value=''>None Selected</option>");						
				_.each(activeSkills[this.heroClass], function(v,k) {
					var option = $("<option>");
					option.attr("value", k);
					option.html(v.name);
					if(option.attr("value") == $this.skills[i].skill) {
						option.attr("selected", "selected");
					}
					picker.append(option);
				}, this);
				wrapper.html("Skill #" + i);
				this.selectedSkills.before(wrapper.append(picker));				
				picker.bind('change', function() {
					$this.changeSkillDisplay($(this).data("id"), $(this).val());
					$this.saveStatusChange(false);
					$this.skills[$(this).data("id")] = {
						skill: $(this).val(),
						content: $(".selectedSkills li[data-id=" + $(this).data("id") + "] .skill-content").html(),
					};
				});
			}
		},
		addPassivePickers: function() {
			for(i = 1; i <= 3; i++) {
				var $this = this,
						picker = $("<select data-id='" + i + "'>"), 
						wrapper = $("<div class='skill-picker'>");
				if(!$this.passives[i]) {
					$this.passives[i] = {
						skill: 'null',
						content: 'null'
					};					
				}
				picker.append("<option value=''>None Selected</option>");						
				_.each(passives[this.heroClass], function(v,k) {
					var option = $("<option>");
					option.attr("value", k);
					option.html(k.replace(/-/g, " ").capitalize());
					if(option.attr("value") == $this.passives[i].skill) {
						option.attr("selected", "selected");
					}
					picker.append(option);
				}, this);
				wrapper.html("Skill #" + i);
				this.selectedPassives.before(wrapper.append(picker));				
				picker.bind('change', function() {
					$this.changePassiveDisplay($(this).data("id"), $(this).val());
					$this.saveStatusChange(false);
					$this.passives[$(this).data("id")] = {
						skill: $(this).val(),
						content: $(".selectedPassives li[data-id=" + $(this).data("id") + "] .skill-content").html(),
					};
				});
			}
		},
		changeSkillDisplay: function(id, skillName) {
			var li = $(".skills li[data-id=" + id + "]");
			li.attr("data-skill", skill);
			var skill = activeSkills[this.heroClass][skillName],
					skillInfo = $("<div class='skill-block ui-helper-clearfix'>"),
					content = li.find(".skill-content"),
					cleaned = skillName.split("~");
			li.empty();
			this.skills[id] = {
				skill: skillName,
				content: li.html(),
			};
			if(content.text().length == 0) {
				content.hide();
			}
			if(skill) {
				var icon = $("<img src='/images/icons/" + this.heroClass + "-" + cleaned[0] + ".png'>"),
						title = $("<h3>").append(icon, skill.name);
				this.addSkillControls(skillInfo);
				icon.attr('data-tooltip', skill.desc);
				icon.attr('data-name', skill.name);
				if(skill.rune) {
					icon.attr('data-tooltip', skill.desc.replace(/  /, "<br/><br/>") + "<br/><br/>" + skill.rune);
				}
				skillInfo.append(title.prepend(icon));
				icon.bindSkilltip();
				li.prepend(skillInfo, content);
			} else {
				li.prepend("<h5>Skill #" + id + " is not set.");
			}
		},
		changePassiveDisplay: function(id, skillName) {
			var li = $(".passives li[data-id=" + id + "]");
			li.attr("data-skill", skill);
			var skill = passives[this.heroClass][skillName],
					skillInfo = $("<div class='skill-block ui-helper-clearfix'>"),
					content = li.find(".skill-content"),
					cleaned = skillName.replace(/-/g, " ").capitalize(),
					title = $("<h3>").append(cleaned);
			li.empty();
			this.passives[id] = {
				skill: skillName,
				content: li.html(),
			};
			if(content.text().length == 0) {
				content.hide();
			}
			if(skill) {
				var icon = $("<img src='/images/icons/" + this.heroClass + "-" + skillName + ".png'>");
				this.addPassiveControls(skillInfo);
				icon.attr('data-tooltip', skill.desc);
				icon.attr('data-name', skillName.replace(/-/g, " ").capitalize());
				skillInfo.append(title.prepend(icon));
				icon.bindSkilltip();
				li.prepend(skillInfo, content);				
			} else {
				li.prepend("<h5>Passive #" + id + " is not set.");
			}
		},
		skillRender: function() {
			var $this = this;
			$(".selectedSkills li[data-skill]").each(function() {
				var skillId = $(this).data("id"),
						skillName = $(this).data("skill"), 
						skill = activeSkills[$this.heroClass][skillName],
						skillInfo = $("<div class='skill-block ui-helper-clearfix'>"),
						content = $(this).find(".skill-content"),
						cleaned = skillName.split("~"),
						icon = $("<img src='/images/icons/" + $this.heroClass + "-" + cleaned[0] + ".png'>"),
						title = $("<h3>").append(icon, skill.name);
				$(this).empty();
				$this.skills[skillId] = {
					skill: skillName,
					content: content.html(),
				};
				if(content.text().length == 0) {
					content.hide();
				}
				$this.addSkillControls(skillInfo);
				icon.attr('data-tooltip', skill.desc);
				icon.attr('data-name', skill.name);
				if(skill.rune) {
					icon.attr('data-tooltip', skill.desc.replace(/  /, "<br/><br/>") + "<br/><br/>" + skill.rune);
				}
				skillInfo.append(title.prepend(icon));
				icon.bindSkilltip();
				$(this).prepend(skillInfo, content);
			});
		},
		passiveRender: function() {
			var $this = this;
			$(".selectedPassives li[data-skill]").each(function() {
				var skillId = $(this).data("id"),
						skillName = $(this).data("skill");
				if(!skillId || !skillName) {
					return false;
				}
				var	skill = passives[$this.heroClass][skillName],
						skillInfo = $("<div class='skill-block ui-helper-clearfix'>"),
						content = $(this).find(".skill-content"),
						cleaned = skillName.split("~"),
						icon = $("<img src='/images/icons/" + $this.heroClass + "-" + cleaned[0] + ".png'>"),
						title = $("<h3>").append(icon, skillName.replace(/-/g, " ").capitalize());
				$(this).empty();
				$this.passives[skillId] = {
					skill: skillName,
					content: $(this).html(),
				};
				if(content.text().length == 0) {
					content.hide();
				}
				$this.addPassiveControls(skillInfo);
				icon.attr('data-tooltip', skill.desc);
				icon.attr('data-name', skill.name);
				if(skill.rune) {
					icon.attr('data-tooltip', skill.desc.replace(/  /, "<br/><br/>") + "<br/><br/>" + skill.rune);
				}
				skillInfo.append(title.prepend(icon));
				icon.bindSkilltip();
				$(this).prepend(skillInfo, content);
			});
		},
		sectionSortable: function() {
			var $this = this;
			$("#guide .content").sortable({
				cursor: 'move',
				handle: "h3.section-title",
				helper: 'clone',
				start: function(e, ui) {
					// Get our Old Index
					$(this).attr("data-oldindex", ui.item.index());
				},
				stop: function(e, ui) {
					// Get the New Index we're placed at
					$(this).attr("data-newindex", ui.item.index());
					// Pull the Element out of the Data array from the old position
					var section = $this.data.splice($(this).attr("data-oldindex"), 1)[0];
					// Splice it into the Data array in the proper new position
					$this.data.splice($(this).attr("data-newindex"), 0, section);
					// Empty out the TOC for Rebuilding
					$this.toc.find("li[data-section]").remove();
					// Regenerate the data-section and id tags on each element
					$("#guide .content .section").each(function(k,v) {
						var title = $(this).find("h3.section-title").text()
								tocEntry = $("<li data-section='section-" + k + "'><a href='#section-" + k + "'>" + title + "</a></li>");
						$this.toc.append(tocEntry);
						$(this).attr("data-section", k);
						$(this).attr("id", "section-" + k);
					});
					// Remove Extra Data
					$(this).removeAttr("data-newindex");
					$(this).removeAttr("data-oldindex");
					// Rebuild the Data on this Object
					setTimeout(function() { 
						$this.getSections();
					}, 0);
					// Set the Status to Unsaved
					$this.saveStatusChange(false);
				}
			});
		},
		addTooltips: function() {

		},
		init: function() {
			// Determine if we're the owner
			if(this.guide.data("owner") == true) {
				this.isOwner = true;
			}
			this.sections = this.guide.find(".content");
			this.heroClass = this.guide.data("class");
			this.selectedSkills = this.guide.find(".selectedSkills");
			this.selectedPassives = this.guide.find(".selectedPassives");
			// Add Skills Descriptions on Fields
			this.skillRender();	
			this.passiveRender();	
			if(this.isOwner) {
				// Setup jQuery Elements
				this.btnNewSection = this.toolbar.find(".createSection");
				this.btnSaveGuide = this.toolbar.find(".saveGuide");
				this.btnMinAll = this.toolbar.find("#minAll");
				// Bind Sortable on Sections
				this.sectionSortable();
				// Add Skill Choosers
				this.addSkillPickers();
				this.addPassivePickers();
			}
			// Get existing Content Sections
			this.getSections();
			// Add all the Bindings
			this.addBindings();		
			// Add Tooltips
			this.addTooltips();
		}
	}
	
	var builder = Object.create(guideBuilder);
	builder.init();
	var upvote = $("#button-upvote"),
			downvote = $("#button-downvote");
	if(window.d3up.isLoggedIn) {
		upvote.attr("data-tooltip", "Do you find this guide useful, helpful or just simply awesome? Give them an upvote!");
		downvote.attr("data-tooltip", "Is this guide not useful at all or full of made-up non-sense? Feel free to downvote.");
		switch(window.d3up['voted']) {
			case "up":
				upvote.removeClass('ui-state-disabled');			
				break;
			case "down":
				downvote.removeClass('ui-state-disabled');			
				break;
		}
		upvote.click(function() {
			castVote('up');
		});
		downvote.click(function() {
			castVote('down');
		});
		function castVote(how) {
			$.ajax({
				url: '?vote=' + how
			});
			var change = 0;
			if(how == 'up') {
				if(upvote.hasClass('ui-state-disabled')) {
					if(!downvote.hasClass('ui-state-disabled')) {
						change = 2;
					} else {
						change = 1;
					}
				} else {
					change = -1;
				}
				upvote.toggleClass('ui-state-disabled');				
				downvote.addClass('ui-state-disabled');
			} else {
				if(downvote.hasClass('ui-state-disabled')) {
					if(!upvote.hasClass('ui-state-disabled')) {
						change = -2;
					} else {
						change = -1;
					}
				} else {
					change = 1;
				}			
				upvote.addClass('ui-state-disabled');
				downvote.toggleClass('ui-state-disabled');
			}
			$("#vote-count").html(parseInt($("#vote-count").text(), 10) + change).attr("data-count", change);
		}		
	}
	upvote.bindSkilltip();
	downvote.bindSkilltip();
	
});