import {Controller} from '../core/';

class MyApp extends Controller {
	constructor(params){
		super(params);

		this.properties = {message:'Hello world'};
	}

	handleButtonClick(){
		console.log(1);
		this.update({
			clicks : this.properties.click+1
		});
	}
}

const template = `
	<div>
		{message}
		
		<button _onClick="handleButtonClick">
			click me
		</button>
	</div>
`;

MyApp.init(template, '.content');