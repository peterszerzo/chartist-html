/*
* Protects for existence, checks nested objects recursively
* @param {obj} - object
* @param {obj} - optional keys if object is defined
* @returns {obj}
*/
ChartistHtml.exists = function(obj, key) {
	if (typeof obj === "undefined" || obj === null) { return false; }
	if (typeof key === "undefined" || key === null || key === "") { return true; }

	var keys = key.split('.'),
		keysExceptFirst = keys.slice(1).join('.'),
		newObj = obj[keys[0]];

	if (typeof newObj === "undefined" || newObj === null) { return false; }
	return ChartistHtml.exists(newObj, keysExceptFirst);
};