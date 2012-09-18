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
		sectionTypes: {
			'generic': {
				name: 'Text'
			},
			'skills': {
				name: 'Text + Skills'
			},
			'passives': {
				name: 'Text + Passives'
			},
			// 'build': {
			// 	name: 'Build + Text'
			// },
			'youtube': {
				name: 'Youtube + Text'
			}
		},
		isOwner: false,
		hasChanges: false,
		getSectionData: function() {
			var $this = this;
			$(".content .section[data-section]").each(function() {
				var id = $(this).attr("data-section"),
						title = $(this).find(".section-title").text(),
						content = $(this).find(".section-content").html(),
						hasContent = $(this).find(".section-content").html().length,
						skills = $(this).find(".skill-data"),
						type = $(this).attr("data-section-type"),
						youtube = $(this).find("iframe[data-youtube]"),
						hidden = $(this).attr("data-hidden");
				$this.data[id] = {
					title: title,
					content: content,
					hidden: hidden,
					type: type,
					youtube: youtube.attr("data-youtube")
				};
				// If we're empty, hide!
				if(hasContent < 5) {
					$(this).find(".section-content").hide();
				}
				if(skills.length) {
					if(!$this.data[id].skills) {
	 					$this.data[id].skills = {};						
					}
					skills.find("li").each(function() {
						$this.data[id].skills[$(this).attr("data-id")] = {
							skill: $(this).attr("data-skill"),
							content: $(this).find('.skill-content').html(),
						}
					});
				}
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
						$this.getSectionData();
					}, 0);
					// Set the Status to Unsaved
					$this.saveStatusChange(false);
				}
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
		addSection: function() {
			var section = $("<div class='section'>"),
					title = $("<h3 class='section-title'>Title of Section</h3>"),
					body = $("<div class='section-content'>Body of Section</div>"),
					specific = $("<div class='section-specific'></div>"),
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
				content: 'Body of Section',
				type: 'generic'
			};
			// Push the Object into the Array
			this.data.push(newSection);
			// Append the Title & Body to Section
			section.append(title, body, specific);
			// Add the Controls to the Section
			this.addControls(section);
			// Set Unsaved
			this.saveStatusChange(false);
			// Append the Section
			$("#guide .content").append(section);			
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
						btnDone = $("<a class='btnDone button' style='margin: 10px'>Done Editing</a>"),
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
				section.find(".section-specific").hide();
				section.find(".skill-data, .admin-ui").hide();
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
							var newIdx = 0;
							$("#guide .content .section").each(function() {
								$(this).attr("data-section", newIdx);
								newIdx++;
							});
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
		bindSectionType: function(select, section) {
			var $this = this;
			select.empty();
			select.attr("data-section", section.attr("data-section"));
			$.each(this.sectionTypes, function(k,v) {
				var option = $("<option>");
				option.attr("value", k);
				option.html(v.name);
				if(section.attr("data-section-type") == k) {
					option.attr("selected", "selected");
				}
				select.append(option);
			});
			select.bind('change', function() {
				$this.saveStatusChange(false);
				$this.data[section.attr("data-section")].skills = null;
				$this.data[section.attr("data-section")].type = $(this).val();
				section.attr("data-section-type", $(this).val());
				section.find(".skill-data").remove();
				$this.addControls(section);
			});
		},
		bindDone: function(btn, section) {
			var $this = this;
			btn.bind('click', function() {
				section.find(".editing").remove();
				section.find(".section-control").remove();
				section.find(".wrap-button").remove();
				section.find("div.section-content").show();
				section.find("div.skill-block").show();
				section.find("h3.section-title").show();
				section.find(".skill-data").show();				
				section.find(".section-specific").show();
				$this.addControls(section);
			});
		},
		skillRender: function() {
			var $this = this;
			$(".skill-data li[data-skill]").each(function() {
				var skillName = $(this).data("skill"), 
						skill = activeSkills[$this.heroClass][skillName];
				if(!skill) {
					skill = passives[$this.heroClass][skillName];
				}
				var	id = $(this).parent().parent().parent().attr("data-section"),
						skillId = $(this).data("id"),
						skillInfo = $("<div class='skill-block ui-helper-clearfix'>"),
						content = $(this).find(".skill-content"),
						cleaned = skillName.split("~"),
						icon = $("<img src='/images/icons/" + $this.heroClass + "-" + cleaned[0] + ".png'>");
				if(skill.name) {
					title = $("<h3>").append(icon, skill.name);					
				} else {
					title = $("<h3>").append(icon, skillName.replace(/-/g, " ").capitalize());
				}
				$(this).empty();
				if(!$this.data[id].skills) {
					$this.data[id].skills = {};
				}
				$this.data[id].skills[skillId] = {
					skill: skillName,
					content: content.html(),
				};
				if(content.text().length == 0) {
					content.hide();
				}
				icon.attr('data-tooltip', skill.desc);
				icon.attr('data-name', skill.name);
				if(skill.rune) {
					icon.attr('data-tooltip', skill.desc.replace(/  /, "<br/><br/>") + "<br/><br/>" + skill.rune);
				}
				skillInfo.append(title.prepend(icon));
				icon.bindSkilltip();
				$(this).prepend(skillInfo, content);
				$this.addSkillControls($(this));
			});
		},
		addControls: function(section) {
			var $this = this,
					id = section.attr("data-section"),
					hidden = section.attr("data-hidden"),
					controls = $("<div class='section-control'>"),
					btnEdit = $("<a class='button btnEdit'>Edit</a>"),
					toggleHidden = $("<label for='tglHidden'>Hidden?</label><input type='checkbox' name='tglHidden' class='tglHidden'>"),
					sectionType = $("<select name='section-type'>"),
					btnDelete = $("<a class='button btnDelete'>Delete</a>"),
					btnTop = $("<a class='button btnTop'>Top</a>"),
					minWrap = $("<div class='wrap-button ui-state-default ui-corner-all'>"),
					minBtn = $("<span class='ui-icon ui-icon-minusthick'></span>"),
					title = section.find("h3.section-title"),
					body = section.find("div.section-content");
			section.find(".skill-picker").remove();
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
				this.bindSectionType(sectionType, section);
				switch(section.attr('data-section-type')) {
					case "youtube":
						this.addYoutubeLink(section);
						break;
					case "passives":
						this.addSkillPickers(section, 'passives', 3);
						this.skillRender();
						break;
					case "skills":
						this.addSkillPickers(section, 'skills', 6);
						this.skillRender();
						break;
					default:
						break;
				}
				this.bindEdit(btnEdit, section);						
				this.bindDelete(btnDelete, section);
				// Append the Controls
				controls.append(toggleHidden, sectionType, btnEdit, btnDelete);
			}
			controls.append(btnTop);
			// Remove any existing controls
			section.find(".section-control").remove();
			section.find(".wrap-button").remove();
			// Append them to the Wrapper
			section.prepend(minWrap.append(minBtn));
			section.prepend(controls);
		},
		addYoutubeLink: function(section) {
			var $this = this,
					container = $("<div class='skill-picker admin-ui ui-state-error ui-corner-all'>"),
					id = section.attr("data-section"),
					input = $("<input type='text'>"),
					wrapper = $("<div>");
			input.attr("value", this.data[id].youtube);
			container.append("<h3>Admin Controls</h3><p>Enter the URL of a Youtube video to embed it in this section. It will be embedded before the text that you enter in this section.</p><p><strong style='color: #f00'>Note:</strong> The video will appear after you save your guide and refresh the page.</p>");
			container.append(wrapper.append("Youtube Link: ", input));
			input.bind("keyup", function() {
				$this.data[id].youtube = $(this).val();
			});
			/*
				http://www.youtube.com/watch?v=US8Cs06qCAA&feature=fvst
				<iframe width="560" height="315" src="http://www.youtube.com/embed/US8Cs06qCAA" frameborder="0" allowfullscreen></iframe>
			*/
			section.find(".section-title").after(container);
		},
		bindToolbar: function() {
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
							$(".section-specific").hide();
						} else {
							$(".section-content").show();							
							$(".section-specific").show();
						}
					});
				}
				if(this.btnSaveGuide) {
					this.btnSaveGuide.bind('click', function() {
						$(".btnDone").trigger('click');
						// d3up.log($this.data);
						$.ajax({
						  type: 'POST',
						  data: {
								sections: $this.data,
							},
							success: function() {
								$this.saveStatusChange(true);
							}
						});
					});								
				}
			}
		},		
		bindSkillDone: function(btn, section) {
			var $this = this;
			btn.bind('click', function() {
				section.find(".editing").remove();
				section.find(".skill-control").remove();
				section.find("h3.section-title").show();
				section.parent().find("div.skill-content").show();		
				if(section.parent().find("div.skill-content").text().length == 0) {
					section.parent().find("div.skill-content").hide();
				}		
				$this.addSkillControls(section);
			});
		},
		addSkillPickers: function(section, type, count) {
			// Remove one for counting
			count--;
			var container = $("<div class='skill-picker admin-ui ui-state-error ui-corner-all'>");
			container.append("<h3>Admin Controls</h3><p>Select the skills to show in this section. You can then click 'Edit Explanation' next to each one to explain your choice in this skill.</p>");
			for(i = 0; i <= count; i++) {
				var $this = this,
						id = section.attr("data-section"),
						picker = $("<select data-id='" + i + "'>"), 
						wrapper = $("<div class='skill-block'>");
				// If our section doesn't contain skill info, set it up.
				if(!$this.data[id].skills) {
					$this.data[id].skills = {};
				}
				// If our section's skill for this skill is empty, setup a blank.
				if(!$this.data[id].skills[i]) {
					$this.data[id].skills[i] = {
						skill: null,
						content: null,
					}
				}
				// Append a Null value for selecting
				picker.append("<option value=''>None Selected</option>");						
				// Foreach of the skills, add it to the select
				var options = activeSkills[this.heroClass];
				switch(type) {
					case "passives":
						options = passives[this.heroClass];
						break;
					default:
						break;
				}
				_.each(options, function(v,k) {
					var option = $("<option>");
					option.attr("value", k);
					option.html(v.name);
					switch(type) {
						case "passives":
							option.html(k.replace(/-/g, " ").capitalize());
							break;
					}
					if(option.attr("value") == $this.data[id].skills[i].skill) {
						option.attr("selected", "selected");
					}
					picker.append(option);
				}, this);
				wrapper.html("Skill #" + i);
				container.append(wrapper.append(picker));				
				picker.bind('change', function() {
					$this.saveStatusChange(false);
					$this.data[id].skills[$(this).attr("data-id")] = {
						skill: $(this).val(),
						content: $(".selectedSkills li[data-id=" + $(this).attr("data-id") + "] .skill-content").html(),
					};
					var li = $("<li>"), 
							skillData = section.find(".skill-data li[data-id=" + $(this).attr("data-id") + "]");
					if($(this).val() == "") {
						skillData.remove();
						return false;
					}
					li.attr("data-skill", $(this).val());
					li.attr("data-id", $(this).attr("data-id"));
					if(!skillData.length) {
						section.find(".skill-data").append(li);
					} else {
						skillData.replaceWith(li);
					}
					$this.skillRender();
				});
			}
			if(!section.find(".skill-data").length) {
				section.find(".section-specific").append($("<ul class='skill-data'>"));
			}
			section.find(".skill-data").before(container);
		},
		addSkillControls: function(section) {
			var $this = this,
					id = section.attr("data-skill"),
					controls = $("<div class='skill-control'>"),
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
		bindSkillEdit: function(btn, section) {
			var $this = this;
			btn.bind('click', function() {
				var	id = section.parent().parent().parent().attr("data-section"),
						skillId = section.attr("data-id"),
						body = section.find("div.skill-content");
				if(!body.length) {
					var body = $("<div class='skill-content'>");
					section.append(body);
				}
				var	controls = section.find(".skill-control"),
						btnDone = $("<a class='btnDone button'>Done Editing</a>"),
						editWrap = $("<div class='editing'>"),
						bodyEdit = $("<textarea class='bodyEdit' style='width: 100%; height: 300px'>").html(body.html());
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
						html = html.replace(/\u00a0/g, " ").trim();
						body.html(html);
						bodyEdit.html(html);
						$this.data[id].skills[skillId].content = html;
						$this.saveStatusChange(false);
					}
				});
				// Hide the Real Elements
				body.hide();
			});
		},
		// addPassivePickers: function() {
		// 	for(i = 1; i <= 3; i++) {
		// 		var $this = this,
		// 				picker = $("<select data-id='" + i + "'>"), 
		// 				wrapper = $("<div class='skill-picker'>");
		// 		if(!$this.passives[i]) {
		// 			$this.passives[i] = {
		// 				skill: 'null',
		// 				content: 'null'
		// 			};					
		// 		}
		// 		picker.append("<option value=''>None Selected</option>");						
		// 		_.each(passives[this.heroClass], function(v,k) {
		// 			var option = $("<option>");
		// 			option.attr("value", k);
		// 			option.html(k.replace(/-/g, " ").capitalize());
		// 			if(option.attr("value") == $this.passives[i].skill) {
		// 				option.attr("selected", "selected");
		// 			}
		// 			picker.append(option);
		// 		}, this);
		// 		wrapper.html("Skill #" + i);
		// 		this.selectedPassives.before(wrapper.append(picker));				
		// 		picker.bind('change', function() {
		// 			$this.changePassiveDisplay($(this).attr("data-id"), $(this).val());
		// 			$this.saveStatusChange(false);
		// 			$this.passives[$(this).attr("data-id")] = {
		// 				skill: $(this).val(),
		// 				content: $(".selectedPassives li[data-id=" + $(this).attr("data-id") + "] .skill-content").html(),
		// 			};
		// 		});
		// 	}
		// },
		toggleHidden: function(section) {
			var id = section.attr("data-section"); 
			this.saveStatusChange(false);
			switch(section.attr('class')) {
				case "section":
					if(this.data[id]) {
						if(this.data[id].hidden) {
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
			var content = section.find(".section-content"),
					sectionData = section.parent().find(".section-specific");
			if(content.is(":visible")) {
				content.hide();
				sectionData.hide();
			} else {
				content.show();
				sectionData.show();
			}
		},
		init: function() {
			var $this = this;
			// Determine if we're the owner
			if(this.guide.data("owner") == true) {
				this.isOwner = true;
			}
			// Assign if this is class specific.
			this.heroClass = this.guide.attr("data-class");
			// Get existing Content Sections
			this.getSectionData();
			if(this.isOwner) {
				// Setup jQuery Elements
				this.btnNewSection = this.toolbar.find(".createSection");
				this.btnSaveGuide = this.toolbar.find(".saveGuide");
				this.btnMinAll = this.toolbar.find("#minAll");
				// Bind Sortable on Sections
				this.sectionSortable();
				// Bind Controls on each Section
				$("#guide .content .section").each(function() {
					$this.addControls($(this));
				});
			}
			// Render Skill Blocks
			this.skillRender();
			// Bind Toolbar Controls
			this.bindToolbar();
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