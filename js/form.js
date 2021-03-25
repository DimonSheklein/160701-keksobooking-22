import { addEvent, addDisabledModification, getNodeState } from './util.js';

const FORM = document.querySelector('.ad-form');
const FORM_ELEMENTS = FORM.querySelectorAll('.ad-form__element');
const MAP_FILTERS = document.querySelector('.map__filters');
const FILTERS_SELECTS = MAP_FILTERS.querySelectorAll('.map__filter');
const MAP_FEATURES = MAP_FILTERS.querySelector('.map__features');
const FEATURES_CHECKBOXES = MAP_FEATURES.querySelectorAll('.map__checkbox');
const HOUSE_TYPE_SELECT = FORM.querySelector('#type');
const HOUSE_PRICE_SELECT = FORM.querySelector('#price');
const TIME_IN_SELECT = FORM.querySelector('#timein');
const TIME_OUT_SELECT = FORM.querySelector('#timeout');
const ADDRESS_INPUT = document.querySelector('#address');

const HouseTypesByMinPrices = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};
const priceSelectedHouse = HouseTypesByMinPrices[HOUSE_TYPE_SELECT.value];

/* ------------------------------------------------------ */
// активное состояние формы
const activeStateForm = (coordinates) => {
  FORM.classList.remove('ad-form--disabled');
  MAP_FILTERS.classList.remove('map__filters--disabled');
  getNodeState(FORM_ELEMENTS, 0);
  getNodeState(FILTERS_SELECTS, 0);
  getNodeState(FEATURES_CHECKBOXES, 0);

  ADDRESS_INPUT.value = Object.values(coordinates).join(', ');
  ADDRESS_INPUT.setAttribute('readonly', true);
};


// устанавливаем минимальную цену выбранного типа жилья
HOUSE_PRICE_SELECT.setAttribute('placeholder', priceSelectedHouse);
HOUSE_PRICE_SELECT.setAttribute('min', priceSelectedHouse);

/**
 * Функция подставляет минимальную цену в атрибуты min и placeholder в поле "Цена за ночь, руб."
 * @param {*} minPrice - сюда будет отправляться значение цены по ключу из перечисления HouseTypesByMinPrices
 */
const updatePrice = (minPrice) => {
  HOUSE_PRICE_SELECT.setAttribute('placeholder', minPrice);
  HOUSE_PRICE_SELECT.setAttribute('min', minPrice);
};

/**
 * Обработчик получения минимальной цены по типу жилья HouseTypesByMinPrices
 * @param {*} evt - целевое значение value ноды HOUSE_TYPE_SELECT
 * @returns - минимальная цена для соответствующих значений функции updatePrice
 */
const getPriceByTypeHandler = (evt) => {
  const houseType = evt.target.value;
  const minPrice = HouseTypesByMinPrices[houseType];

  return updatePrice(minPrice);
};

// Обработчик получения времени заезда по времени выезда
const getTimeInHandler = (evt) => {
  TIME_IN_SELECT.value = evt.target.value;
};

// Обработчик получения времени выезда по времени заезда
const getTimeOutHandler = (evt) => {
  TIME_OUT_SELECT.value = evt.target.value;
};

// Вызов событий
const addFormHandlers = () => {
  addEvent('change', HOUSE_TYPE_SELECT, getPriceByTypeHandler);
  addEvent('change', TIME_IN_SELECT, getTimeInHandler);
  addEvent('change', TIME_IN_SELECT, getTimeOutHandler);
};

// Перевод страницы в неактивное состояние
addDisabledModification(FORM);
addDisabledModification(MAP_FILTERS);

getNodeState(FORM_ELEMENTS, 1);
getNodeState(FILTERS_SELECTS, 1);
getNodeState(FEATURES_CHECKBOXES, 1);

// Получаем значение координат из объекта и транслируем их в поле формы "Адрес"
const addCoords = (coords) => {
  const valCoords = Object.values(coords).map((value) => {
    return value.toFixed(5);
  });

  ADDRESS_INPUT.value = valCoords.join(', ');
}

export {
  addFormHandlers,
  activeStateForm,
  addCoords,
  ADDRESS_INPUT
};
