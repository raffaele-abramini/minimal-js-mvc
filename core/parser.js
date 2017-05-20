const parser =  {
	parse(...params){
		return this.populate(...params)
	},

	analyse() {

	},

	findPlaceholders(htmlstring){
		return htmlstring.match(/{.*?}/g).map(this.removeBrackets);
	},

	removeBrackets(item){
		return item.slice(1, item.length -1);
	},

	populate(htmlstring, controllerInstance){
		this.findPlaceholders(htmlstring)
	}
};


export default parser;