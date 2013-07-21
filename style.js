if (!RedactorPlugins) var RedactorPlugins = {};

var redStylesJSON = [
			{btnName:'Bold Red',className:'redactor_format_boldred',style:'font-weight:bold;color:red'},
			{btnName:'Green Faint',className:'redactor_format_greenfaint',spanClass:'mygreen'},
			{btnName:'Green Aside',className:'redactor_format_greenaside',wrap: 'aside',style:'color:green'}
];

RedactorPlugins.styles = {
	init: function ()
	{
		if(typeof redStylesJSON === 'undefined' || !redStylesJSON.length) return;
		
		var that = this;
		var dropdown = {};

		jQuery.each(redStylesJSON, function(i, s)
		{
			dropdown['s' + i] = { title: s.btnName, className:s.className, callback: function() { that.setFontfamily(s); }};
		});

		dropdown['remove'] = { title: 'Remove style', callback: function() { that.resetFontfamily(); }};
		console.log(this.buttonGet('formatting'));
		(this.buttonGet('formatting').length) ? this.buttonAddAfter('formatting','styles', 'Change font family', false, dropdown) : this.buttonAdd('styles', 'Change font family', false, dropdown);
	},
	setFontfamily: function (s)
	{
		if (s.wrap) {
			this.selectionWrap(s.wrap); 
			//this.inlineFormat(s.wrap);
			if(s.style) this.blockSetAttr('style',s.style);
		}
		else if(s.style) this.inlineSetAttr('style', s.style);

		if(s.spanClass) {
			this.inlineSetClass(s.spanClass);
		}
	},
	resetFontfamily: function()
	{
		var that = this;
		jQuery.each(redStylesJSON, function(i,s) {
			if(s.spanClass) that.inlineRemoveClass(s.spanClass);
		});
		this.inlineSetAttr('style','');
	}
};