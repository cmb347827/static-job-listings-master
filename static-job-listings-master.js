'use strict'; 

$(window).resize(function(){
	location.reload();
});
const elements = {
	listingsContainer : document.querySelector('#js-job-listings'),
	filters:document.querySelector('#filters'),
	data:{},
	resultsContainer: document.querySelector('#js-results'),
}
let vars={
	filterId: 0,
	allSearchTerms:[],
	filterData:[],
	clearBtnAdded: false,
	filterTabs:[]
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
			return included;
		}
		included=vars.allSearchTerms.includes(outeritem.level);
		//console.log('item',item.level, 'included',included);
		if(included) {
			vars.filterData.push(outeritem);
			return included;
		}
		outeritem.languages.some((item)=>{
           included =vars.allSearchTerms.includes(item);
           if(included) {
				vars.filterData.push(outeritem);
				return included;
		    }
		});
		outeritem.tools.some((item)=>{
           included=vars.allSearchTerms.includes(item);
           if(included) {
			  vars.filterData.push(outeritem);
			  return included;
		   }
		});
	});
	console.log('filterdata',vars.filterData);
};
const addListings=(which)=>{
	  
	  //add job listings from json data
	  //console.log('vars filterdata',vars.filterData);
	  const data= (which==='non-filtered') ? elements.data : vars.filterData;
	  const container = (vars.filterData.length>0) ? elements.resultsContainer : elements.listingsContainer;
	  //clear results/listingsContainer.innerHTML for new reload
	  elements.listingsContainer.innerHTML='';
	  elements.resultsContainer.innerHTML='';
	  //clear filterData for next time the user adds a searchterm, and a new addListings() will be called with new filterdata including the new searchterm results
	  vars.filterData=[];  
	  let addFeaturedBorder; let tabFont__hover; let featuredFont;

      data.forEach((item,index)=>{
		//some items may not include, featured or new, so add classes based on if they are included or not only.
        addFeaturedBorder = item.featured ? 'addFeaturedBorder' :'';
        tabFont__hover = item.new ? 'tabFont__hover' : '';
		featuredFont= item.featured ? 'featuredFont' : '';

		container.innerHTML += `
		    <section class=' ${addFeaturedBorder} d-flex flex-md-row flex-column justify-content-md-between align-items-md-center me-2 '>
				<div class='d-flex flex-md-row align-items-md-center flex-column'>
				        <div class='svg-logo-outer'>
						   <img src='${item.logo}' alt='' class='svg-100 me-4'>
						</div>
						<div class='d-flex flex-column'>
								<div class='d-flex'>
									<div class='me2'>${item.company} </div>
									<div class='${tabFont__hover} me-2'>${item.new ? 'NEW!' : ''} </div>
									<div class='${featuredFont} me-2'>${item.featured ? 'FEATURED' :''}</div>
								</div>
								<div>
									${item.position}
								</div>
								<div class='d-flex'>
									<div class='me-2'>${item.postedAt}</div>
									<div class='me-2'>${item.contract}</div>
									<div>${item.location}</div>
								</div>
						</div>
				</div>
				<ul class='noborder ms-md-5 d-flex align-self-md-center nav nav-tabs'>
					<li class="nav-item"><a class="nav-link search-item lightgreenbg tabFont mb-2 me-2">${item.role}</a></li>
					<li class="nav-item"><a class="nav-link search-item lightgreenbg tabFont mb-2 me-2">${item.level}</a></li>
					<li class='nav-item d-flex'>${item.languages.map(elmt => `
						<a class='nav-link search-item lightgreenbg tabFont mb-2 me-2'>${elmt}</a>
					`).join('')}</li>
					<li class='nav-item d-flex'>${item.tools.map(elmt => `
						<a class='nav-link search-item lightgreenbg tabFont mb-2 me-2'>${elmt}</a>
					`).join('')}</li>
				</ul>
		    </section>
	    `;
	  });
	  addListener(); 
};

const clearFilters=()=>{
	//remove filters
	elements.filters.innerHTML='';
	addListings('non-filtered');
    
}
function addFilter(linktext) {
	//add search terms (to filter results) at top output
	if($('#filters').hasClass('visuallyhidden')){ //show filter terms output element
		$('#filters').removeClass('visuallyhidden');
	}
	vars.filterId=++vars.filterId;
	const output = `<form class="customtab me-1 me-md-3 ">
			            <input type='hidden' id='search-term${vars.filterId}' name='search-term${vars.filterId}'>
					    <output name='result' for='search-term${vars.filterId}'>${linktext}<button data-remove-button-id="${vars.filterId}" type='button' class='btn close'><i class="fa-solid fa-square-xmark"></i></button>
						</output>
					</form>`;
	//vars.filterTabs.push(output);
	//add the new filter tab 
	elements.filters.insertAdjacentHTML("afterbegin", output );
	//create a clear button element
	const clearBtn=`<button type="button" class="btn clearButton">Clear</button>`;
	if(vars.clearBtnAdded===false){
		//if the clear button has not yet been added, add it to the end of the filter tabs.
		elements.filters.insertAdjacentHTML('beforeend',clearBtn);
		vars.clearBtnAdded=true;
		document.querySelector('.clearButton').addEventListener('click',clearFilters,{once:true});
	}
    
	//add data attribute id value to the last added search term delete button.
	const removeBtn = document.querySelector(`[data-remove-button-id="${vars.filterId}"]`);
	//addeventListener to the last added search term delete button, and only listens once 
	removeBtn.addEventListener('click',removeFilter(linktext), { once: true });

}

const removeFilter =(linktext)=>{
	return function curried_func(e) {
		//delete filter tab at page top output 
		
		e.currentTarget.parentElement.parentElement.remove();
		//find index of search term in allSearchTerms in order to delete it from array , so its possible to reselect the same term again.
		let indexSearchTerm= vars.allSearchTerms.indexOf(linktext);
	    vars.allSearchTerms.splice(indexSearchTerm,1);
		//update visible filter listings
		filterData();
		if(vars.allSearchTerms.length>=1){
			addListings('filtered');
		 }else{
			if($('#filters').hasClass('visuallyhidden')===false){
                $('#filters').addClass('visuallyhidden');
			}
			addListings('non-filtered');
			//remove clear button, I use false/true instead of toggling the boolean variable for clarity and reduces bugs.
			vars.clearBtnAdded=false;
		    const clearBtn=document.querySelector('.clearButton');
			if(clearBtn){
				clearBtn.remove();
			}

		 }
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
			filterData();
			if(vars.allSearchTerms.length>=1){
			   addListings('filtered');
			}else{
			   //default non-filtered added for else as a safe fail.
			   addListings('non-filtered');
			   //remove clear button, I use false/true instead of toggling the boolean variable for clarity and reduces bugs.
				vars.clearBtnAdded=false;
				const clearBtn=document.querySelector('.clearButton');
				if(clearBtn){
					clearBtn.remove();
				}
			}
		},{once:true}); //once as doubles are not added and search return returns new elements(.search-item)
	});
	
}


$(window).on('load',function(){

    fetchAsync();
    

});