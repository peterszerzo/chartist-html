/*
* Checks existence (is not null or undefined), traversing arbitrarily deeply nested objects recursively.
* @param {obj} obj - Object checked.
* @param {string} key - Dot-separated deep nesting key, e.g. "data.type.simple".
* @returns {boolean} exists
*/
ChartistHtml.exists = function(obj, key) {
	var keys, keysExceptFirst, newObj,
		isUnset = function(param) { return (typeof param === "undefined" || param === null); };

	// Return false if object is null or undefined.
	if (isUnset(obj)) { return false; }

	// If no further key is specified, return true.
	if (isUnset(key) || key === "") { return true; }

	// Step down to deeper nesting level and check recursively.
	keys = key.split('.');
	keysExceptFirst = keys.slice(1).join('.');
	newObj = obj[keys[0]];
	if (isUnset(newObj)) { return false; }
	return ChartistHtml.exists(newObj, keysExceptFirst);
};