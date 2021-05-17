import '../styles.css';
import './themeSwitcher';
import fetchCountries from './fetchCountries';
import renderResult from '../templates/country.hbs';
import listOfCountry from '../templates/listOfCountry.hbs';

const debounce = require('lodash.debounce');

import { defaults, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/Material.css';
defaults.delay = 2000;
defaults.styling = 'material';
defaults.icons = 'material';
let notice = null;

const refs = {
  input: document.querySelector('#search-country'),
  result: document.querySelector('.query-result'),
};

refs.input.addEventListener('input', debounce(onSearch, 500));
// refs.input.addEventListener('input', onSearch);

const processingRequest = data => {
  notice.close();
  if (data.status === 404) {
    return error({
      text: 'Нет ни одного результата по вашему запросу',
    });
  }
  if (data.length > 9) {
    return error({
      title: 'Введите более специфический запрос',
      text: 'Слишком много результатов',
    });
  }
  success({
    title: 'По вашему запросу найдено результатов: ' + data.length,
  });
  refs.result.innerHTML =
    data.length === 1
      ? renderResult(data[0])
      : listOfCountry(data.map(el => el.name));
};

function onSearch(e) {
  const value = e.target.value;
  if (value.length < 1) {
    return;
  }
  notice = info({
    text: 'Выполняется поиск по вашему запросу',
    delay: 5555,
  });
  fetchCountries(value).then(processingRequest);
}
