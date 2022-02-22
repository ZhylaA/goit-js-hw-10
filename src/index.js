import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries';


const DEBOUNCE_DELAY = 300;
const countryInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');

// countryInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));
countryInput.addEventListener('input', onSearch);

function onSearch(e) {
    e.preventDefault();
    // const searchQuery = e.currentTarget.elements.query.value;
    const searchQuery = e.currentTarget.value.trim();
    console.log(searchQuery);
    if (searchQuery === "") { countryList.innerHTML = "";}
    else {
        fetchCountries(searchQuery).then(renderCard).catch(error => {
            if (error.status === 404) Notiflix.Notify.failure('Oops, there is no country with that name');
        });
    }
    function renderCard(e) {
        if (e.length >= 10)
        { clearInput(); Notiflix.Notify.failure('Too many matches found. Please enter a more specific name.'); }
        else if (e.length >= 2) {
            clearInput();
            // countryList.innerHTML = "";
            const addSmallList = countryListSmall(e);
            countryList.innerHTML = addSmallList;
        }
        else {
            clearInput();
            // countryList.innerHTML = "";
            countryList.innerHTML = countryListBig(e);}
    }        
};
    
// console.log(fetchCountries)
function countryListSmall(countries) {
    const markupCountryListSmall = countries.map((country) => {return `<li></li><img src="${country.flags.svg}" alt="flag" width="80">
    <p>${country.name}</p></li>`;
    }).join("");
    return markupCountryListSmall;
};
function countryListBig(countries) {
    const markupCountryListBig = countries.map((country) => {return `<li></li><img src="${country.flags.svg}" alt="flag" width="80">
    <p>${country.name}</p>
    <p>${country.capital}</p>
    <p>${country.population}</p>
    <p>${country.lang}</p>
    </li>`;
    }).join("");
    return markupCountryListBig;
};
function clearInput() {
    countryList.innerHTML = ""; }