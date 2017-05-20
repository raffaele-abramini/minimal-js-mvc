import parser from './parser';

class Controller {
	static init(template, DOMSelector){
		const instance =new this({
			template,
			DOMSelector
		});

		instance.render();
	}

	constructor({template, DOMSelector}){
		this.template = template;
		this.DOMSelector = DOMSelector;
	}

	update(newProperties){
		this.properties = {...this.properties, ...newProperties};
		this.render();
	}

	render(){
		const newHTML = parser.populate(this.template, this.properties);
		document.querySelector(this.DOMSelector).innerHTML = newHTML;
	}

}

export default Controller