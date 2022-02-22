export default function fetchCountries(name) {
    return fetch('https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,lang')
        .then(response => {
            return response.json();
        })
};