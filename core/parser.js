let id = 0;
const parser =  {
	parse(htmlstring, controllerInstance){
		if(!controllerInstance.__id) controllerInstance.__id =`jsmvc-${id}`;

		let parsedHtmlstring = this._populate(htmlstring, controllerInstance);

		const map = this._mapEventIds(parsedHtmlstring, controllerInstance.__id);
		controllerInstance.__eventsMap = map.eventsMap;

		parsedHtmlstring = map.htmlstring;

		return parsedHtmlstring;
	},

	_populate(htmlstring, controllerInstance){
		const placeholders = this._getPlaceholders(htmlstring);

		return placeholders.reduce(this._populateString.bind(this, controllerInstance), htmlstring);
	},

	_populateString(controllerInstance, newHtmlstring, placeholder){
		return newHtmlstring.replace(
			placeholder,
			controllerInstance[this._removeBrackets(placeholder)] || ''
		)
	},

	_getPlaceholders(htmlstring){
		return htmlstring.match(/{.*?}/g);
	},

	_removeBrackets(item){
		return item.slice(1, item.length -1);
	},

	_mapEventIds(prevHtmlstring, controllerInstanceId){
		const events = this._getEventsObj(prevHtmlstring);
		let eventsMap =[];

		const htmlstring = events.reduce((acc, match, index)=>{
			if(!match) return;

			const result = /on(.*?)="(.*?)"/g.exec(match);
			const elemId = `${controllerInstanceId}-${index}`;

			eventsMap.push({
				event: result[1].toLowerCase(),
				method: result[2],
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

	_getEventsObj(htmlstring){
		return htmlstring.match(/on(.*?)="(.*?)"/g);
	}
};


export default parser;