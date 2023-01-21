import './css/styles.css';
import Notiflix from 'notiflix';
import 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const listCountry = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  e.preventDefault();
  const request = e.target.value;
    if(request === '') {
      listCountry.innerHTML = '';
      countryInfo.innerHTML = '';
  };
    
  fetchCountries(request).then(countries => {
    const [{ name, flags, capital, population, languages }] = countries;
    countryInfo.innerHTML = '';
    if (countries.length === 1) {
      renderCountryCard(name, flags, capital, population, languages);
      listCountry.innerHTML = '';
    }
    else {
      renderCountriesList(countries);
    };

    if (countries.length >= 10) {
      Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
      listCountry.innerHTML = '';
      countryInfo.innerHTML = '';
    };
  });

}

function renderCountryCard (name, flags, capital, population, languages) {
  return countryInfo.innerHTML = `<div class='card-wrap'><img src='${flags.svg}' alt='${name.common}' width='60' height='50'>
    <h1 class='country-title'> ${name.common}</h1></div>
    <p class='text'><span class='text-info'>Capital: </span>${capital}</p>
    <p class='text'><span class='text-info'>Population: </span>${population}</p>
    <p class='text'><span class='text-info'>Languages: </span>${Object.values(
    languages)}</p>`;
};

function renderCountriesList (countries) {
  const [{ name, flags, capital, population, languages }] = countries;
  listCountry.innerHTML = '';

  const countryEl = countries.map(({ name, flags }) => {
    return `<li class='country-item'><img src='${flags.svg}' alt='${name.common}' width='40' height='20'>
        <p class='item-text'>${name.common}</p></li>`
  }).join('');
  listCountry.insertAdjacentHTML('beforeend', countryEl);
};