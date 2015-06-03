/*
* Protects for existence
* @returns
*/
ChartistHtml.exists = function(a) {
	// console.log("I exist!");
	return (typeof a !== "undefined" && a !== null);
};