let request = new XMLHttpRequest();
request.open('POST', 'https://ls-230-web-store-demo.herokuapp.com/v1/products');
request.setRequestHeader('Authorization', 'token AUTH_Token')

request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

let newProduct = {
	name: 'Awesome Thing',
	sku: 'abcd1234',
	price: 200
}

request.send(JSON.stringify(newProduct));