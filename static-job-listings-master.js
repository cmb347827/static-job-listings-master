'use strict'; 

$(window).resize(function(){
	location.reload();
});
const elements = {
	listingsContainer : document.querySelector('#js-job-listings'),
	filteredListings:document.querySelector('#filtered-listings'),
}
let vars={
	filterId: 0,
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
				<ul class='ms-md-5 d-flex align-self-md-center nav nav-tabs'>
					<li class="nav-item"><a class="nav-link search-item">${item.role}</a></li>
					<li class="nav-item"><a class="nav-link search-item">${item.level}</a></li>
					<li class='nav-item d-flex'>${item.languages.map(elmt => `
						<a class='nav-link search-item'>${elmt}</a>
					`).join('')}</li>
					<li class='nav-item d-flex'>${item.tools.map(elmt => `
						<a class='nav-link search-item'>${elmt}</a>
					`).join('')}</li>
				</ul>
		    </section>
	    `;
	  });
	  addListener(); 
};
function addFilter(linktext) {
	vars.filterId=++vars.filterId;
	const output = `<form class="outer-search me-1 me-md-3">
			            <input class='border' type='hidden' id='search-term${vars.searchId}' name='search-term${vars.searchId}'>
					    <output name='result' for='search-term${vars.searchId}'>
						    ${linktext}<button data-remove-button-id="${vars.searchId}" type='button' class='btn close'><i class="fa-solid fa-square-xmark"></i></button>
						</output>
					</form>`;
	elements.filteredListings.insertAdjacentHTML("beforeend", output );

	const removeBtn = document.querySelector(`[data-remove-button-id="${vars.searchId}"]`);

	removeBtn.addEventListener('click',removeSearch);
	
}
const removeSearch=(e)=>{
	console.log(e.currentTarget);
}
function addListener(){
	[...document.querySelectorAll('.search-item')].forEach(function(item) {
		item.addEventListener('click', function() {
			//pass the link text to addFilter
            addFilter($(this).text());
			//avoid double adds

		});
	});
	
}

$(window).on('load',function(){

    fetchAsync();
    

});