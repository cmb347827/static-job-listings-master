'use strict'; 

$(window).resize(function(){
	location.reload();
});
const elements = {
	listingsContainer : document.querySelector('#js-job-listings'),
	filteredListings:document.querySelector('#filtered-listings'),
	data:{},
}
let vars={
	filterId: 0,
	allSearchTerms:[],
	filterData:[],
}


async function fetchAsync () {
	// await response of fetch call
	let response = await fetch('https://raw.githubusercontent.com/cmb347827/static-job-listings-master/refs/heads/main/data.json');
	// only proceed once promise is resolved
	elements.data= await response.json()
	// only proceed once second promise is resolved
	addListings('non-filtered');
}

const filterData =()=>{
	let included=false;
	
	elements.data.forEach((outeritem)=>{
		included=vars.allSearchTerms.includes(outeritem.role);
		//console.log('item',item.role, 'included',included);
		if(included) {
			vars.filterData.push(outeritem);
			return included===true;
		}
		included=vars.allSearchTerms.includes(outeritem.level);
		//console.log('item',item.level, 'included',included);
		if(included) {
			vars.filterData.push(outeritem);
			return included===true;
		}
		outeritem.languages.forEach((item)=>{
           included =vars.allSearchTerms.includes(item);
           if(included) {
				vars.filterData.push(outeritem);
				return included===true;
		    }
		});
		//console.log('item',item.languages, 'included',included);
        /*if(included) {
			vars.filterData.push(item);
			return included===true;
		}*/
		outeritem.tools.forEach((item)=>{
           included=vars.allSearchTerms.includes(item);
           if(included) {
			  vars.filterData.push(outeritem);
			  return included===true;
		   }
		});
		//console.log('item',item.tools, 'included',included);
		/*if(included) {
			vars.filterData.push(item);
			return included===true;
		}*/
		//console.log("--------------------------NEXT-----------------------------------");
	});
	console.log('filterdata',vars.filterData);
};
const addListings=(which)=>{
	  //add job listings from json data
	  console.log('vars filterdata',vars.filterData);
	  const data= (which==='non-filtered') ? elements.data : vars.filterData;
	  //console.log('in add listings',data);
	  //clear listingsContainer.innerHTML for new reload
	  elements.listingsContainer.innerHTML='';
	  //clear filterData for next time the user adds a searchterm, and a new addListings() will be called with new filterdata including the new searchterm results
	  vars.filterData=[];  
	  
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
	//add search terms (to filter results) at top output
	vars.filterId=++vars.filterId;
	const output = `<form class="outer-search me-1 me-md-3">
			            <input class='border' type='hidden' id='search-term${vars.filterId}' name='search-term${vars.filterId}'>
					    <output name='result' for='search-term${vars.filterId}'>${linktext}<button data-remove-button-id="${vars.filterId}" type='button' class='btn close'><i class="fa-solid fa-square-xmark"></i></button>
						</output>
					</form>`;
	elements.filteredListings.insertAdjacentHTML("beforeend", output );
    
	//add data attribute id value to the last added search term delete button.
	const removeBtn = document.querySelector(`[data-remove-button-id="${vars.filterId}"]`);
	//addeventListener to the last added search term delete button
	removeBtn.addEventListener('click',removeSearch(linktext));

}
const removeSearch =(linktext)=>{
	return function curried_func(e) {
		//delete search term at page top output 
		e.currentTarget.parentElement.remove();
        //console.log(linktext,e.currentTarget.parentElement.firstChild);
		//find index of search term in allSearchTerms in order to delete it from array , so its possible to reselect the same term again.
		let indexSearchTerm= vars.allSearchTerms.indexOf(linktext);
	    vars.allSearchTerms.splice(indexSearchTerm,1);
		//update visible filter listings
		filterData();
		addListings('filtered');
    }
}
function addListener(){
	[...document.querySelectorAll('.search-item')].forEach(function(item) {
		item.addEventListener('click', function() {
			//avoid double adds
			const includesTerm= vars.allSearchTerms.includes($(this).text());
			if(includesTerm===false){
                vars.allSearchTerms.push($(this).text());
				//is oke, pass the link text to addFilter
				addFilter($(this).text());
			}
            console.log('in addlisten',vars.allSearchTerms);
			filterData();
			addListings('filtered');
		});
	});
	
}

$(window).on('load',function(){

    fetchAsync();
    

});