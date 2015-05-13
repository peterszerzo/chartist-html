ChartistHtml.ChartCollectionManager = function($el) {
	var self = this;
	this._chartManagers = [];
	$el.each(function(i) {
		self._chartManagers.push(new ChartistHtml.ChartManager($(this), i));
	});
	return this;
};

ChartistHtml.ChartCollectionManager.prototype = {

	constructor: ChartistHtml.ChartCollectionManager,

	render: function() {
		var i, max;
		for(i = 0, max = this._chartManagers.length; i < max; i += 1) {
			this._chartManagers[i].render();
		}
		return this;
	},

	destroy: function() {
		var i, max;
		for(i = 0, max = this._chartManagers.length; i < max; i += 1) {
			this._chartManagers[i].destroy();
		}
	}

};