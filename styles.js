/*
[{"btnName":"Note","className":"redactor_format_note","wrap":"div","spanClass":"note"}]
 */

if (!RedactorPlugins) var RedactorPlugins = {};

RedactorPlugins.styles = {
	init: function ()
	{
		if(typeof redStylesJSON === 'undefined' || !redStylesJSON.length) return;
		
		var that = this;
		var dropdown = {};

		jQuery.each(redStylesJSON, function(i, s)
		{
			dropdown['s' + i] = { title: s.btnName, className:s.className, callback: function() { that.setCustomFormat(s); }};
		});

		dropdown['remove'] = { title: 'Remove style', callback: function() { that.resetCustomFormat(); }};
		(this.buttonGet('formatting').length) ? this.buttonAddAfter('formatting','styles', this.opts.curLang.customStyles, false, dropdown) : this.buttonAdd('styles', this.opts.curLang.customStyles, false, dropdown);
	},
	setCustomFormat: function (s)
	{
		if (s.wrap) {
			this.selectionWrap(s.wrap); 
			//this.inlineFormat(s.wrap);
			if(s.style) this.blockSetAttr('style',s.style);
			if(s.spanClass) this.blockSetClass(s.spanClass);
		}
		else {
			if(s.style) this.inlineSetAttr('style', s.style);
			if(s.spanClass) this.inlineSetClass(s.spanClass);
		}
	},
	resetCustomFormat: function()
	{
		var that = this;
		jQuery.each(redStylesJSON, function(i,s) {
			if(s.spanClass) that.inlineRemoveClass(s.spanClass);
		});
		this.inlineSetAttr('style','');
	}
};