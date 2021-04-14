import { addEventListener, getNodeState } from './util.js';

const FORM = document.querySelector('.ad-form');
const FORM_ELEMENTS = FORM.querySelectorAll('.ad-form__element');
const TITLE = FORM.querySelector('#title');
const MAP_FILTERS = document.querySelector('.map__filters');
const FILTERS_SELECTS = MAP_FILTERS.querySelectorAll('.map__filter');
const MAP_FEATURES = MAP_FILTERS.querySelector('.map__features');
const FEATURES_CHECKBOXES = MAP_FEATURES.querySelectorAll('.map__checkbox');
const HOUSE_TYPE_SELECT = FORM.querySelector('#type');
const HOUSE_PRICE = FORM.querySelector('#price');
const ROOM_NUMBER = FORM.querySelector('#room_number');
const CAPACITY = FORM.querySelector('#capacity');
const CAPACITY_OPTIONS = CAPACITY.querySelectorAll('option');
const TIME_IN_SELECT = FORM.querySelector('#timein');
const TIME_OUT_SELECT = FORM.querySelector('#timeout');
const ADDRESS_INPUT = document.querySelector('#address');
// const FORM_SUBMIT = FORM.querySelector('.ad-form__submit');

const MIN_LENGTH_TITLE = '30';
const MAX_LENGTH_TITLE = '100';
const MAX_ROOMS_COUNT = 100;

const HouseTypesByMinPrices = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};
const priceSelectedHouse = HouseTypesByMinPrices[HOUSE_TYPE_SELECT.value];

const lastCapacityOption = CAPACITY_OPTIONS[CAPACITY_OPTIONS.length - 1];

// Устанавливаем количество мест, соответствующее количеству комнат
CAPACITY.value = ROOM_NUMBER.value;

/* ------------------------------------------------------ */
// Получаем значение координат из объекта и транслируем их в поле формы "Адрес"
// устанавливаем координаты в поле "Адрес"
const setAddress = coordinates => {
  ADDRESS_INPUT.value = Object.values(coordinates).map(value => value.toFixed(5)).join(', ');
  ADDRESS_INPUT.setAttribute('readonly', true);
};

// const addCoords = coords => {
//   const valCoords = Object.values(coords).map(value => {
//     return value.toFixed(5);
//   });

//   ADDRESS_INPUT.value = valCoords.join(', ');
// };


// устанавливаем минимальную цену выбранного типа жилья
HOUSE_PRICE.setAttribute('placeholder', priceSelectedHouse);
HOUSE_PRICE.setAttribute('min', priceSelectedHouse);

/**
 * Функция подставляет минимальную цену в атрибуты min и placeholder в поле "Цена за ночь, руб."
 * @param {*} minPrice - сюда будет отправляться значение цены по ключу из перечисления HouseTypesByMinPrices
 */
const updatePrice = minPrice => {
  HOUSE_PRICE.setAttribute('placeholder', minPrice);
  HOUSE_PRICE.setAttribute('min', minPrice);
};

/**
 * Обработчик получения минимальной цены по типу жилья HouseTypesByMinPrices
 * @param {*} evt - целевое значение value ноды HOUSE_TYPE_SELECT
 * @returns - минимальная цена для соответствующих значений функции updatePrice
 */
const getPriceByTypeHandler = evt => {
  const houseType = evt.target.value;
  const minPrice = HouseTypesByMinPrices[houseType];

  return updatePrice(minPrice);
};

// Обработчик получения времени заезда по времени выезда
const getTimeInHandler = evt => {
  TIME_IN_SELECT.value = evt.target.value;
};

// Обработчик получения времени выезда по времени заезда
const getTimeOutHandler = evt => {
  TIME_OUT_SELECT.value = evt.target.value;
};

/* ---------------------- ВАЛИДАЦИЯ --------------------- */
// обработчик проверки на валидацию поля "Заголовок объявления"
const titleValidationHandler = () => {
  const valueLength = TITLE.value.length;
  let errMsg = '';

  if (TITLE.validity.valueMissing) {
    errMsg = 'Поле должно быть заполнено!';
  } else if (TITLE.validity.tooShort) {
    errMsg = `Длина поля не должна быть меньше ${
      TITLE.minLength
    } символов. Добавьте ещё ${MIN_LENGTH_TITLE - valueLength} симв.`;
  } else if (TITLE.validity.tooLong) {
    errMsg = `Длина поля не должна превышать ${
      TITLE.maxLength
    } символов. Удалите ${valueLength - MAX_LENGTH_TITLE} симв.`;
  }

  TITLE.reportValidity();

  return TITLE.setCustomValidity(errMsg);
};

// обработчик проверки на валидацию поля "Цена за ночь"
const priceValidationHandler = () => {
  let errMsg = '';

  if (HOUSE_PRICE.validity.valueMissing) {
    errMsg = 'Укажите цену за ночь!';
  } else if (HOUSE_PRICE.validity.rangeUnderflow) {
    errMsg = `Цена за ночь не должна быть меньше ${HOUSE_PRICE.min} RUB.`;
  } else if (HOUSE_PRICE.validity.rangeOverflow) {
    errMsg = `Цена за ночь не должна превышать ${HOUSE_PRICE.max} RUB.`;
  }

  HOUSE_PRICE.reportValidity();

  return HOUSE_PRICE.setCustomValidity(errMsg);
};

// обработчик проверки на валидацию поля "Количество мест"
const capacityValidationHandler = evt => {
  const roomValue = Number(evt.target.value);

  if (roomValue === MAX_ROOMS_COUNT) {
    getNodeState(CAPACITY_OPTIONS, 1);

    lastCapacityOption.disabled = 0;
    lastCapacityOption.selected = 1;
  } else {
    getNodeState(CAPACITY_OPTIONS, 0);

    lastCapacityOption.disabled = 1;

    CAPACITY_OPTIONS.forEach(option => {
      if (roomValue < option.value) {
        option.disabled = true;
      }
    });

    CAPACITY.value = roomValue;
  }
};

/* ------------------------------------------------------ */
// const getValiditeForm = (evt) => {
//   if (!TITLE.validity.valid || !HOUSE_PRICE.validity.valid || !CAPACITY.validity.valid) {
//     FORM_SUBMIT.disabled = true;
//     evt.preventDefault();
//   }
//   FORM_SUBMIT.disabled = false;
// }

// Вызов событий
const addFormHandlers = () => {
  addEventListener('change', HOUSE_TYPE_SELECT, getPriceByTypeHandler);
  addEventListener('change', TIME_IN_SELECT, getTimeInHandler);
  addEventListener('change', TIME_IN_SELECT, getTimeOutHandler);

  addEventListener('input', TITLE, titleValidationHandler);
  addEventListener('input', HOUSE_PRICE, priceValidationHandler);
  addEventListener('change', ROOM_NUMBER, capacityValidationHandler);

  // addEventListener('submit', FORM, getValiditeForm)''
};

const disableFormFields = (node, field) => {
  node.classLIst.add(`${node.className}--disabled`);
  let children = node.querySelectorAll(field);
  children.forEach((elem) => elem.setAttribute('disabled', ''));
}

const enableFormFields = (node, field) => {
  node.classList.remove(`${node.className}--disabled`);
  const children = node.querySelectorAll(field);
  children.forEach((elem) => elem.removeAttribute('disabled'));
}

const enableForms = () => {
  enableFormFields(FORM, 'ad-form__element');
  enableFormFields(MAP_FILTERS, 'select');
  addFormHandlers();
}

export { setAddress, ADDRESS_INPUT, disableFormFields, enableForms};
