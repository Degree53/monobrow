/* 
	monobrow.js

	A concatenation library.	
*/

var M = function(element, options) {
	/**
	 *  Method: concatenateStrings
	 *  
	 *  Concatenates an indeterminate number of strings together.
	 *  You can pass in an options object, it will check for the following options:
	 *  
	 *  // TODO: Put options here
	 *
	 *  Params: string (String)*, options (Object)
	 *  Returns: String.
	 */
	this.concatenateStrings = function() {
		var argumentsLength = 0;

		if (typeof arguments[arguments.length - 1] !== 'object') {
			// Assume no options were passed through, so last item is a string.
			argumentsLength = arguments.length;
		}
		else {
			// Last thing was not a string, so we don't want to concatenate that.
			argumentsLength = arguments.length - 1;
		}

		var strings = [];

		for (var i = 0, j = argumentsLength; i < j; i++) {
			strings.push(arguments[i]);
		}

		return concatenateString(strings);			
	};

	var concatenateString = function(strings, concatenatedString) {
		if (strings.length === 0) {
			return "";
		}
		else {
			// Shift off the first string.
			var string = strings.shift();
			var concatenatedString = "";
			var characterASCII;
			var characterToAppend;

			// Iterate over every character of the string, and add it to 'concatenatedString'.
			for (var i = 0, j = string.length; i < j; i++) {
				// Convert to ASCII.
				characterASCII = string[i].charCodeAt(0);
				// Convert back again. This improves performance.
				characterToAppend = String.fromCharCode(characterASCII);
				concatenatedString += characterToAppend;			
			}

			// Recursively call until we are finished. Modern machines have lots of memory so we don't need to worry about this.
			var moreConcatenatedStrings = concatenateString(strings, concatenatedString);			
			
			concatenatedString += moreConcatenatedStrings;
		}

		return concatenatedString;
	};

	return this;
};

Monobrow = new M();