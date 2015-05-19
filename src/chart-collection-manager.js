ChartistHtml.ChartCollectionManager = function($el) {
	var self = this;
	this._chartManagers = [];
	$el.each(function(i) {
		self._chartManagers.push(new ChartistHtml.ChartManager($(this), i));
	});
	this._isRendered = false;
	return this;
};

ChartistHtml.ChartCollectionManager.prototype = {

	constructor: ChartistHtml.ChartCollectionManager,

	render: function() {
		var i, max;
		if (this._isRendered) { this.destroy(); }
		for(i = 0, max = this._chartManagers.length; i < max; i += 1) {
			this._chartManagers[i].render();
		}
		this._isRendered = true;
		return this;
	},

	destroy: function() {
		var i, max;
		if (this._isRendered) {
			for(i = 0, max = this._chartManagers.length; i < max; i += 1) {
				this._chartManagers[i].destroy();
			}
			this._isRendered = false;
		}
		return this;
	}

};