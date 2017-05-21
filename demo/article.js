import {Controller} from '../core/';
import articleData from './article.json';

class Article extends Controller {
	constructor(params){
		super(params);

		this.properties = {
			...articleData,
			likes:0
		}
	}

	handleLikeClick(){
		this.update({
			likes : this.properties.likes+1
		});
	}
}

const template = `
	<article>
		<h1>{title}</h1>
		<p>
			{content}
		</p>
		
		<hr>
		
		<small>Likes: <span class="likes">{likes}</span></small>
		<button _onClick="handleLikeClick">
			Like this article
		</button>
	</article>
`;

Article.init(template, '.article');