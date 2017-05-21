import parser from './parser';
import events from './events';

class Controller {
	/**
	 * Initialise a controller instance
	 * @param template String
	 * @param DOMSelector String
	 */
	static init(template, DOMSelector){
		if(!template || !DOMSelector) throw new Error('Please specify template string and DOM selector when instantiating a Controller');

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

	/**
	 * Re-render controller with new properties
	 * @param newProperties Object
	 */
	update(newProperties){
		this.properties = {...this.properties, ...newProperties};
		this.render();
	}

	/**
	 *  Render controller, parsing the template and add the event listeners.
	 */
	render(){
		const newHTML = parser.parse(this.template, this.properties);
		const DOMElem = document.querySelector(this.DOMSelector);

		if(!DOMElem) throw new Error('Please specify a selector for an existing DOMElement when initialising a controller.');

		DOMElem.innerHTML = newHTML;
		events.listen(DOMElem, this);
	}

}

export default Controller