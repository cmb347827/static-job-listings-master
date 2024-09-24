'use strict'; 

$(window).resize(function(){
	location.reload();
});

async function getJson() {
	const requestURL =
	  "https:";
	const request = new Request(requestURL);
  
	const response = await fetch(request);
	const dataText = await response.text();
  
	const data = JSON.parse(dataText);
	console.log(data);
	console.log('d');
	console.log('dfd');
  }

$(window).on('load',function(){

    
});