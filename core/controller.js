import parser from './parser';
import events from './events';

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
		const newHTML = parser.parse(this.template, this.properties);
		const DOMElem = document.querySelector(this.DOMSelector);
		DOMElem.innerHTML = newHTML;
		events.listen(DOMElem, this);
	}

}

export default Controller