'use strict';

// Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandomInteger = (min, max) => {
  if (min < 0 || max < 0) {
    throw new Error('диапазон может быть только положительный, включая ноль!')
  }
  if (max <= min) {
    [min, max] = [max, min];
  }
  if (isNaN(min) || isNaN(max)) {
    throw new Error('в качестве параметров может быть только Number!')
  }
  if (min === max) {
    return min;
  }

  return Math.floor( Math.random() * (max - min + 1) ) + min; //за основу взял с https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
};

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно
const getCoordinate = (min, max, precision) => {
  if (precision < 0 || isNaN(precision)) {
    throw new Error('передан некорректный аргумент в качестве параметра!')
  }

  const mediator = Math.pow(10, precision);

  return getRandomInteger(min * mediator, max * mediator) / mediator;
};

// Проверка исключений
try {
  getRandomInteger();
  getCoordinate();
} catch (err) {
  alert(err);
}

const TYPE_HOUSING = ['palace', 'flat', 'house', 'bungalow'];
const FEATURES_HOUSING = ['wifi','dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const TIME_CHECK_IN_OUT = ['12:00', '13:00', '14:00'];
const PHOTOS_GALLARY = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const getRundomElementArray = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};

// создание объекта для массива
const getObject = function() {
  const author = {
    avatar: 'img/avatars/user0' + getRandomInteger(1, 8) + '.png',
  };

  const location = {
    x: getCoordinate(35.65000, 35.70000, 5),
    y: getCoordinate(139.70000, 139.80000, 5),
  };

  const offer = {
    title: 'Chill-ZONE в центре Припяти',
    address: Object.values(location).join(', '),
    price: getRandomInteger(1, 1e6),
    type: getRundomElementArray(TYPE_HOUSING),
    rooms: getRandomInteger(1, 100),
    guests: getRandomInteger(1, 200),
    checkin: getRundomElementArray(TIME_CHECK_IN_OUT),
    checkout: getRundomElementArray(TIME_CHECK_IN_OUT),
    features: FEATURES_HOUSING.filter(() => {return getRandomInteger(0, FEATURES_HOUSING.length - 1)}),
    description: 'Самое лучшее место для чилла в кругу аномалий и фантомов',
    photos: PHOTOS_GALLARY.filter(() => {return getRandomInteger(0, PHOTOS_GALLARY.length - 1)}),
  };

  return Object.assign({}, author, offer, location);
};

// создание массива из 10 сгенерированных JS-объектов
const getArray = new Array(10).fill().map(()  => getObject());


// console.log(getArray);
