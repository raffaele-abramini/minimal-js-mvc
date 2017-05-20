import {Controller} from '../core/';

class MyApp extends Controller {
	constructor(params){
		super(params);

		this.properties = {message:123};
	}

	handleButtonClick(){
		this.update({
			clicks : this.properties.click+1
		});
	}
}

const template = `
	<div>
		{message}
	</div>
`;

MyApp.init(template, '.content');