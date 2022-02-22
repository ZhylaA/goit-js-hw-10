import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries';


const DEBOUNCE_DELAY = 300;
const countryInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
// const countryListItem = document.querySelector('.country-list_item');
countryList.style.listStyle = "none";
// countryListItem.style.display = "flex";

countryInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));
// countryInput.addEventListener('input', onSearch);

function onSearch(e) {
    e.preventDefault();
    const searchQuery = e.target.value.trim();
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
            countryList.innerHTML = countryListBig(e);}
    }        
};
    
// console.log(fetchCountries)
function countryListSmall(countries) {
    const markupCountryListSmall = countries.map((country) => {return `<li class="country-list_item"><img src="${country.flags.svg}" alt="flag" width="80">
    <p>${country.name.official}</p></li>`;
    }).join("");
    return markupCountryListSmall;
};
function countryListBig(countries) {
    const markupCountryListBig = countries.map((country) => {return `<li><img src="${country.flags.svg}" alt="flag" width="80">
    <p>COUNTRY: ${country.name.official}</p>
    <p>CAPITAL: ${country.capital}</p>
    <p>POPULATION: ${country.population}</p>
    <p>LANGUAGES: ${Object.values(country.languages)}</p>
    </li>`;
    }).join("");
    console.log(Object.values)
    return markupCountryListBig;
};
function clearInput() {
    countryList.innerHTML = ""; }