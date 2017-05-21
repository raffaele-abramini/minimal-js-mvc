import {Controller} from '../core/';

class MyApp extends Controller {
	constructor(params){
		super(params);

		this.properties = {
			message:'Hello world',
			clicks:0
		}
	}

	handleButtonClick(){

		this.update({
			clicks : this.properties.clicks+1
		});
	}
}

const template = `
	<div>
		{message}
		
		<hr>
		
		<small>Likes: {clicks}</small>
		
		<button _onClick="handleButtonClick">
			Like this comment
		</button>
	</div>
`;

MyApp.init(template, '.content');