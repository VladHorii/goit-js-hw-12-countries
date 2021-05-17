const BASE_URL = 'https://restcountries.eu/rest/v2';
export default function (searchQuery) {
  return fetch(`${BASE_URL}/name/${searchQuery}`).then(r => r.json());
}
