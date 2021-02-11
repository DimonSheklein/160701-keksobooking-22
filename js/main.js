'use strict';

// Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandomInteger = (...args) => {
  let [min, max] = args;
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

// Массивы
const TYPE_HOUSING = ['palace', 'flat', 'house', 'bungalow'];
const FEATURES_HOUSING = ['wifi','dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const ROOMS = [1, 2, 3, 100];
const TIME_CHECK_IN_OUT = ['12:00', '13:00', '14:00'];
const PHOTOS_GALLARY = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];
const TITLES = [
  'Chill-ZONE',
  'ICON',
  'Mirage Hotel',
  'Golden Rock Beach Hotel',
  'Dark Side',
];
const DESCRIPTIONS = [
  'Лучший Chill у нас на пляже',
  'Sex, Drugs, Rok`n`Roll',
  'Аквадискотека, пилатес, жаренные сосиски',
  'Молочные коктейли, сауна, тренажрный зал',
  'Ночные посидели у костра под КиШа',
];

const getRandomElement = (array) => {
  const index = getRandomInteger(0, array.length - 1);
  return array[index];
};

const getSomeArray = (array) => {
  return array.filter(() => {
    return getRandomInteger(0, 1);
  });
};

// создание объекта для массива
const getObject = function() {
  const minPrice = 0;
  const maxPrice = 1e6;
  const minGuests = 1;
  const maxGuests = 200;
  const minCoordinateX = 35.65000;
  const maxCoordinateX = 35.70000;
  const minCoordinateY = 139.70000;
  const maxCoordinateY = 139.80000;
  const characters = 5;

  const author = {
    avatar: 'img/avatars/user0' + getRandomInteger(1, 8) + '.png',
  };

  const location = {
    x: getCoordinate(minCoordinateX, maxCoordinateX, characters),
    y: getCoordinate(minCoordinateY, maxCoordinateY, characters),
  };

  const offer = {
    title: getRandomElement(TITLES),
    description: getRandomElement(DESCRIPTIONS),
    address: Object.values(location).join(', '),
    price: getRandomInteger(minPrice, maxPrice),
    type: getRandomElement(TYPE_HOUSING),
    rooms: getRandomElement(ROOMS),
    guests: getRandomInteger(minGuests, maxGuests),
    checkin: getRandomElement(TIME_CHECK_IN_OUT),
    checkout: getRandomElement(TIME_CHECK_IN_OUT),
    features: getSomeArray(FEATURES_HOUSING),
    photos: getSomeArray(PHOTOS_GALLARY),
  };

  return {author, offer, location};
};

// создание массива из 10 сгенерированных JS-объектов
const getArray = function() {
  let array = [];

  for (let i = 0; i < 10; i++) {
    array.push(getObject());
  }

  return array;
};

const fillCards = getArray();

// eslint-disable-next-line no-console
console.log(fillCards)
