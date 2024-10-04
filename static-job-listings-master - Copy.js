'use strict'; 

$(window).resize(function(){
	location.reload();
});
const elements = {
	listingsContainer : document.querySelector('#js-job-listings'),
	outerSearch:document.querySelector('#outer-search'),
}
let vars={
	searchId: 0,
}


async function fetchAsync () {
	// await response of fetch call
	let response = await fetch('https://raw.githubusercontent.com/cmb347827/static-job-listings-master/refs/heads/main/data.json');
	// only proceed once promise is resolved
	const data= await response.json()
	// only proceed once second promise is resolved
	addListings(data);
}


const addListings=(data)=>{
	  //console.log('in addlistings:',data);
      data.forEach((item,index)=>{
		elements.listingsContainer.innerHTML += `
		    <section class='border d-flex flex-md-row flex-column justify-content-md-between'>
				<div class='d-flex flex-md-row flex-column'>
						<img src='${item.logo}' alt='' class='me-4'>
						<div class='d-flex flex-column'>
								<div class='d-flex'>
									<div>${item.company} </div>
									<div>${item.new ? 'NEW!' : ''} </div>
									<div>${item.featured ? 'FEATURED' :''}</div>
								</div>
								<div>
									${item.position}
								</div>
								<div class='d-flex'>
									<div>${item.postedAt}</div>
									<div>${item.contract}</div>
									<div>${item.location}</div>
								</div>
						</div>
				</div>
				<div class='ms-md-5 d-flex align-self-md-center'>
					<div>${item.role}</div>
					<div>${item.level}</div>
					<div>${item.languages}</div>
					<div>${item.tools}</div>
				</div>
		    </section>
	    `;
	  });
};
/*const getSearch=()=>{
   let value='Enter your search term';
   const list = document.querySelectorAll('input[type="search"]');
   list.forEach((item,index)=>{
	   //return last search value
	   if(index===list.length-1){
		   value=item.value;
	   } 
   });
   if(value!==''){ 
	return value;
   }
}*/
$( "#outer-search" ).on( "keyup", function(event) {
	
	//pluse lege search end
   //const list = document.querySelectorAll('input[type="search"]');
	if (event.code === 'Space') {
		//vars.searchId=++vars.searchId;
		//addSearch();
		returnElement();
	}
	if (event.code === 'Enter') {
		//return results
		//loadSearch();
	}
	
} );
/*
const returnSearch=()=>{
	const value=getSearch();
	return `<search class="outer-search">
	                      <label for='search-term${vars.searchId}' class='visually-hidden'>Search term ${vars.searchId}</label>
			              <input class='border' type='search' id='search-term${vars.searchId}' name='searchterm-item' value='${value}' >
						</search>`;
}
const addSearch=()=>{
    elements.outerSearch.innerHTML += returnSearch();
}*/
const returnElement=()=>{
	elements.outerSearch.innerHTML += `<search class="outer-search">
	                      <label for='search-term${vars.searchId}' class='visually-hidden'>Search term ${vars.searchId}</label>
			              <input class='border' type='search' id='search-term${vars.searchId}' name='searchterm-item' value=''>
						</search>`;
}
/*const addEmptySearch=()=>{
    elements.outerSearch.innerHTML += returnElement();
}*/
$(window).on('load',function(){

	returnElement();
	
    fetchAsync();


});