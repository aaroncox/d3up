jQuery.fn.selectedOption = function() { return this.find("option").filter( function() { return this.selected; }); }
