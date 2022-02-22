import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries';


const DEBOUNCE_DELAY = 300;
const countryInput = document.querySelector('#search-box');

countryInput.addEventListener('input', onSearch);
function onSearch(e) {
    e.preventDefault();
    const searchQuery = e.currentTarget.elements.query.value;
    console.log(searchQuery)
};