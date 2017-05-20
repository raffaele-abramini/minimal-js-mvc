import parser from './parser';

class Controller {
	constructor(template, properties){
		this.template = template;
		this.properties = properties;
	}

	render(){
		parser.populate(this.template, this.properties);
	}

	init(){
		this.render();
	}
}

export default Controller