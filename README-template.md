# Frontend Mentor - Job listings with filtering solution

This is a solution to the [Job listings with filtering challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/job-listings-with-filtering-ivstIPCt). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)


## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Filter job listings based on the categories

### Screenshot

![screenshot](./images/screenshot.PNG "screenshot")

### Links

- Solution URL: [Github]()
- Live Site URL: [Live Github]()

## My process

### Built with

- Semantic HTML5 markup
- Sass/SCSS
- Bootstrap
- jQuery/Javascript
- Mobile-first workflow


### What I learned

- After first trying and failing to add input of type search everytime a user clicks the spacebar in the header by adding them using `elements.outerSearch.innerHTML += `<search class="outer-search">
	                      <label for='search-term${vars.searchId}' class='visually-hidden'>Search term ${vars.searchId}</label>
			              <input class='border me-3' type='search' id='search-term${vars.searchId}' name='searchterm-item'>
					</search>`;`
  I finally found a stackoverflow post explaining the use of insertAdjacentHTML and 'beforeend'.
- I found how to access the input close button using the `::-webkit-search-cancel-button` pseudoselector. As MDN said it's 'non-standard' , I added vendor prefixes to apply this. 
- I misunderstood the design at first and thought the search bar on top was where you'd enter search options 
  My old code was based on that : 

  ```
     function addSearch() {
	      vars.searchId=++vars.searchId;
	      const search = `<search class="outer-search me-1 me-md-3">
	                      <label for='search-term${vars.searchId}' class='visually-hidden'>Search term ${vars.searchId}</label>
			                  <input placeholder="Search" class='border' type='search' id='search-term${vars.searchId}' name='searchterm-item'>
					            </search>`;
	      elements.outerSearch.insertAdjacentHTML("beforeend", search );
     }

     $( "#outer-search" ).on( "keyup", function(event) {
	
	      if (event.code === 'Space') {
		        addSearch();
	      }
     });

  ```
  

  
 
### Continued development

- Daily tutorials and projects in HTML5, CSS3, Javascript, Bootstrap, Sass/SCSS. For now, in time I will go re-learn React ect.

### Useful resources

 

## Author

- Website - [One of my latest codepens](https://codepen.io/cynthiab72/pen/oNybYON)
- Frontend Mentor - [@cmb347827](https://www.frontendmentor.io/profile/cmb347827)

