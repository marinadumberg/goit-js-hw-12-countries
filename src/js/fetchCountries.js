	
import countryCardTemplate from '../templates/country-card.hbs';
	import countiesCardTemplate from '../templates/countries.hbs';
import ApiServise from '../js/fetchCountries-api';
import { debounce } from "lodash";
    import PNotify from '../../node_modules/@pnotify/core/dist/PNotify'

import { alert, notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

	const refs = {
	    input: document.querySelector('input'),
	    countriesList: document.querySelector('.countries-list')
	}
	

	const apiServise = new ApiServise()
	
	refs.input.addEventListener('input', debounce(onSearch,500));
	
	function onSearch(e) {
	
	    clearCardList();
	
        apiServise.query = e.target.value;
        console.log(apiServise)
        
        if (apiServise.query.trim() === '') {
            return;
        }

        apiServise.fetchCountries().then(data => {
            
                
            if (data.length > 10) {
                error('Too many matches found. Please enter a more spesific query!');
	        //     PNotify.notice({
	        //   text: 'Too many matches found. Please enter a more spesific query!',
	        // })
	      
	        }else if (data.length > 1) {
	           countriesMarup(data) 
	        }
            else {
                countryMarup(data)
            }

	        
	        
        }).catch(error => {
            PNotify.error({
                text:'Please,enter country name',
            })
        })
	

    }
    
    
	function countriesMarup(items) {
	    refs.countriesList.insertAdjacentHTML
	    ('beforeend',countiesCardTemplate(items))
	}
	

	function countryMarup(items) {
	    refs.countriesList.insertAdjacentHTML
	    ('beforeend',countryCardTemplate(items))
	}
	
	function clearCardList() {
	    refs.countriesList.innerHTML = '';
	    
	}
	


