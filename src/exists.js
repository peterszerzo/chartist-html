/*
* Protects for existence
* @param {obj} - object, and if object exists, then keys
* @returns {a}
*/
ChartistHtml.exists = function(obj, key) {
	// return (typeof obj !== "undefined" && obj !== null);
	if (typeof obj === "undefined" || obj === null) { return false; }
	if (typeof key === "undefined" || key === null || key === "") { return true; }
	var keys = key.split('.'),
		keysExceptFirst = keys.slice(1).join('.'),
		newObj = obj[keys[0]];
	if (typeof newObj === "undefined" || newObj === null) { return false; }
	return ChartistHtml.exists(newObj, keysExceptFirst);
};