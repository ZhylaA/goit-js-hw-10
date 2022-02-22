import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries';


const DEBOUNCE_DELAY = 300;
const countryInput = document.querySelector('#search-box');


// const options = {
//     headers:{name,}
// }
const url = 'https://restcountries.com/';

fetch(url).then(r => r.json()).then(console.log);
