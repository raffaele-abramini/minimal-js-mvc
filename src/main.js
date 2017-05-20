import {Controller} from '../core/';

class MyApp extends Controller {
}

const template = `
	<div>
		{message}
	</div>
`;

MyApp.init(template, {message: 'Hello world'});