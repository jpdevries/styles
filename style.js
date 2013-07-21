if (!RedactorPlugins) var RedactorPlugins = {};

RedactorPlugins.style = {
	init: function ()
	{
		console.dir(this.opts.formattingTags);
		var styleJSON = [
			{btnName:'Bold Red',className:'redactor_format_boldred',style:'font-weight:bold;color:red'},
			{btnName:'aside',className:'redactor_format_aside',wrap: 'aside'}
		];
		var that = this;
		var dropdown = {};

		$.each(styleJSON, function(i, s)
		{
			dropdown['s' + i] = { title: s.btnName, className:s.className, callback: function() { that.setFontfamily(s); }};
		});

		dropdown['remove'] = { title: 'Remove style', callback: function() { that.resetFontfamily(); }};

		this.buttonAddAfter('formatting','style', 'Change font family', false, dropdown);
	},
	setFontfamily: function (s)
	{
		if (s.wrap) this.selectionWrap(s.wrap);
		else this.inlineSetAttr('style', s.style);
	},
	resetFontfamily: function()
	{
		this.inlineSetAttr('style','');
	}
};