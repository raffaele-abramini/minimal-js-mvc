import $ from 'jquery';
import renderArticle from '../demo/article';

beforeAll(()=>{
	document.body.innerHTML = `
		<div class="article"></div>
	`;

	renderArticle();
});

test('Article is correctly rendered', ()=>{
	expect($('.article').children().length).toBe(1);
});

test('Title is correctly rendered', ()=>{
	expect($('h1').text()).toBe('Hello world');
});

test('Article has 0 likes', ()=>{
	expect($('.likes').text()).toBe('0');
});

test('Click on like button increase likes number', ()=>{
	$('button').trigger('click');
	expect($('.likes').text()).toBe('1');
});