'use strict'; 

$(window).resize(function(){
	location.reload();
});
const elements = {
	listingsContainer : document.querySelector('#js-job-listings'),
    searchTerms: document.querySelector('#listings-search'),
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
const getSearch=()=>{
   console.log(elements.searchTerms.value);
}

$( "#listings-search" ).on( "keyup", function() {
	getSearch();
} );

$(window).on('load',function(){
    fetchAsync();
	
    

});