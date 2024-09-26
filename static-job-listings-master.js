'use strict'; 

$(window).resize(function(){
	location.reload();
});
const elements = {
	listingsContainer : document.querySelector('#js-job-listings'),
    
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
		    <section class='d-flex flex-md-row flex-column'>
		      <img src='${item.logo}' alt=''>
			  <div class='d-flex'>
		        <div>${item.company} </div>
				<div>${item.new ? 'NEW!' : ''} </div>
				<div>${item.featured ? 'FEATURED' :''}</div>
			  </div>
			  <div>
			     ${item.position}
			  </div>
			  <div>
			     <div>${}</div>
                 <div>${}</div>
				 <div>${}</div>
			  </div>
		    </section>
	    `;
	  });
};

$(window).on('load',function(){
    fetchAsync();
	
    

});