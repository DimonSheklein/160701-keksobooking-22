import {HouseTypesByMinPrices} from './data.js'

const FORM = document.querySelector('.ad-form');
const HOUSE_TYPE_SELECT = FORM.querySelector('#type');
const HOUSE_PRICE_SELECT = FORM.querySelector('#price');
const TIME_IN_SELECT = FORM.querySelector('#timein');
const TIME_OUT_SELECT = FORM.querySelector('#timeout');

/**
 * Функция подставляет минимальную цену в атрибуты min и placeholder в поле "Цена за ночь, руб."
 * @param {*} minPrice - сюда будет отправляться значение цены по ключу из перечисления HouseTypesByMinPrices
 */
const updatePrice = (minPrice) => {
  HOUSE_PRICE_SELECT.setAttribute('placeholder', minPrice);
  HOUSE_PRICE_SELECT.setAttribute('min', minPrice);
}

/**
 * Обработчик получения минимальной цены по типу жилья HouseTypesByMinPrices
 * @param {*} evt - целевое значение value ноды HOUSE_TYPE_SELECT
 * @returns - минимальная цена для соответствующих значений функции updatePrice
 */
const getPriceByTypeHandler = (evt) => {
  const houseType = evt.target.value;
  const minPrice = HouseTypesByMinPrices[houseType];

  return updatePrice(minPrice);
}

HOUSE_TYPE_SELECT.addEventListener('change', getPriceByTypeHandler);

// Обработчик получения времени заезда по времени выезда
const getTimeInHandler = () => {
  TIME_OUT_SELECT.value = TIME_IN_SELECT.value;
}

// Обработчик получения времени выезда по времени заезда
const getTimeOutHandler = () => {
  TIME_IN_SELECT.value = TIME_OUT_SELECT.value;
}

TIME_IN_SELECT.addEventListener('change', getTimeInHandler);
TIME_OUT_SELECT.addEventListener('change', getTimeOutHandler);
