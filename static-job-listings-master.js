'use strict'; 

$(window).resize(function(){
	location.reload();
});

async function getJson() {
	const requestURL =
	  "https://raw.githubusercontent.com/cmb347827/static-job-listings-master/refs/heads/main/data.json";
	const request = new Request(requestURL);
  
	const response = await fetch(request);
	const dataText = await response.text();
  
	const data = JSON.parse(dataText);
	console.log(data);
	
  }

$(window).on('load',function(){
     getJson();
    
});