if (!RedactorPlugins) var RedactorPlugins = {};

RedactorPlugins.style = {
	init: function ()
	{
		var styleJSON = [{'name':'Bold Red','className':'redactor_format_boldred','style':'font-weight:bold;color:red'}];
		var that = this;
		var dropdown = {};

		$.each(styleJSON, function(i, s)
		{
			dropdown['s' + i] = { title: s.name, className:s.className, callback: function() { that.setFontfamily(s.style); }};
		});

		dropdown['remove'] = { title: 'Remove style', callback: function() { that.resetFontfamily(); }};

		this.buttonAddAfter('formatting','style', 'Change font family', false, dropdown);
	},
	setFontfamily: function (value)
	{
		this.inlineSetAttr('style', value);
	},
	resetFontfamily: function()
	{
		this.inlineSetAttr('style','');
	}
};