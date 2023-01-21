import Notiflix from 'notiflix'
const API = 'https://restcountries.com/v3.1/name/'
const filter = '?fields=name,capital,population,flags,languages'

export function fetchCountries(name) {
    return fetch(`${API}${name}${filter}`).then(response => {
        if(!response.ok) {
            Notiflix.Notify.failure('"Oops, there is no country with that name"')
            throw new Error(response.status)
      };
      return response.json();
    })
    
};