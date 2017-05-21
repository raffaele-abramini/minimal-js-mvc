/*
	Helper for parsing html strings
 */

let id = 0;
const parser =  {
	/**
	 * Main parsing function
	 * @param htmlstring String
	 * @param controllerInstance Controller
	 * @returns String
	 */
	parse(htmlstring, controllerInstance){
		if(!controllerInstance.__id) controllerInstance.__id =`jsmvc-${id}`;

		let parsedHtmlstring = this._populate(htmlstring, controllerInstance);

		const map = this._mapEventIds(parsedHtmlstring, controllerInstance.__id);
		controllerInstance.__eventsMap = map.eventsMap;

		parsedHtmlstring = map.htmlstring;

		return parsedHtmlstring;
	},

	/**
	 * Populate a template string with instance properties.
	 * @param htmlstring String
	 * @param controllerInstance Controller
	 * @returns String
	 * @private
	 */
	_populate(htmlstring, controllerInstance){
		const placeholders = this._getPlaceholders(htmlstring);

		return placeholders.reduce(this._populateString.bind(this, controllerInstance), htmlstring);
	},

	/**
	 * Replace a string with instance property.
	 * @param controllerInstance Controller
	 * @param newHtmlstring String
	 * @param placeholder String
	 * @returns String
	 * @private
	 */
	_populateString(controllerInstance, newHtmlstring, placeholder){
		return newHtmlstring.replace(
			placeholder,
			controllerInstance[this._removeBrackets(placeholder)]
		)
	},

	/**
	 * Return all the placeholder matches of a htmlstring.
	 * @param htmlstring String
	 * @returns Array
	 * @private
	 */
	_getPlaceholders(htmlstring){
		return htmlstring.match(/{.*?}/g) || [];
	},

	/**
	 * Remove wrapping brackets from a string
	 * @param item String
	 * @returns String
	 * @private
	 */
	_removeBrackets(item){
		return item.slice(1, item.length -1);
	},

	/**
	 * Returns an object with:
	 * 	- htmlstring: html markup string with element ids
	 * 	- eventsMap: array of objects with events listeners data
	 * @param prevHtmlstring String
	 * @param controllerInstanceId Controller
	 * @returns {{htmlstring: String, eventsMap: Array}}
	 * @private
	 */
	_mapEventIds(prevHtmlstring, controllerInstanceId){
		const events = this._getEventsObj(prevHtmlstring);
		let eventsMap =[];

		const htmlstring = events.reduce((acc, match, index)=>{
			if(!match) return;

			const result = /on(.*?)="(.*?)"/g.exec(match);
			const elemId = `${controllerInstanceId}-${index}`;

			eventsMap.push({
				name: result[1].replace('_on', '').toLowerCase().trim(),
				method: result[2].trim(),
				id: elemId
			});

			return prevHtmlstring.replace(
				match,
				`${match} _id=${elemId}`
			)
		}, '');

		return {
			htmlstring,
			eventsMap
		}
	},

	/**
	 * Returns an array with all the custom events attributes matches
	 * @param htmlstring String
	 * @returns Array
	 * @private
	 */
	_getEventsObj(htmlstring){
		return htmlstring.match(/on(.*?)="(.*?)"/g) || [];
	}
};


export default parser;