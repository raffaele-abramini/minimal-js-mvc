const parser =  {
	parse(...params){
		return this.populate(...params);
	},

	populate(htmlstring, controllerInstance){
		const placeholders = this.findPlaceholders(htmlstring);
		return placeholders.reduce((newHtmlstring, placeholder)=>{
			return newHtmlstring.replace(
				placeholder,
				controllerInstance[this.removeBrackets(placeholder)] || ''
			);
		}, htmlstring);
	},

	findPlaceholders(htmlstring){
		return htmlstring.match(/{.*?}/g);
	},

	removeBrackets(item){
		return item.slice(1, item.length -1);
	}
};


export default parser;