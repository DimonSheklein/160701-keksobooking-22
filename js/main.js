'use strict';

const TYPE_HOUSING = ['palace', 'flat', 'house', 'bungalow'];
const FEATURES_HOUSING = ['wifi','dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const ROOMS = [1, 2, 3, 100];
const TIME_TYPE = ['12:00', '13:00', '14:00'];
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

const Price = {
  MIN: 0,
  MAX: 1e6,
};
const AvatarId = {
  MIN: 1,
  MAX: 8,
};
const Guests = {
  MIN: 1,
  MAX: 200,
};
const Coordinate = {
  X: {
    MIN: 35.65000,
    MAX: 35.70000,
  },
  Y: {
    MIN: 139.70000,
    MAX: 139.80000,
  },
};
const CHARACTERS = 5;

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
const getRandomFloatNumber = (min, max, precision) => {
  if (precision < 0 || isNaN(precision)) {
    throw new Error('передан некорректный аргумент в качестве параметра!')
  }

  const mediator = Math.pow(10, precision);

  return getRandomInteger(min * mediator, max * mediator) / mediator;
};

// Проверка исключений
try {
  getRandomInteger();
  getRandomFloatNumber();
} catch (err) {
  alert(err);
}

// Получаем рандомный эллемент массива
const getRandomElement = (array) => {
  const index = getRandomInteger(0, array.length - 1);
  return array[index];
};

// Получаем случайный массив методом фильтрации
const getSomeArray = (array) => {
  return array.filter(() => {
    return getRandomInteger(0, 1);
  });
};

// Созданием объект для массива
const getObject = function() {
  const registry = getRandomElement(TIME_TYPE);
  const avatarId = getRandomInteger(AvatarId.MIN, AvatarId.MAX);

  // Описание автора
  const author = {
    avatar: 'img/avatars/user0' + avatarId + '.png',
  };

  // Местоположение в виде географических координат
  const location = {
    x: getRandomFloatNumber(Coordinate.X.MIN, Coordinate.X.MAX, CHARACTERS),
    y: getRandomFloatNumber(Coordinate.Y.MIN, Coordinate.Y.MAX, CHARACTERS),
  };

  // Иинформация об объявлении
  const offer = {
    title: getRandomElement(TITLES),
    description: getRandomElement(DESCRIPTIONS),
    address: Object.values(location).join(', '),
    price: getRandomInteger(Price.MIN, Price.MAX),
    type: getRandomElement(TYPE_HOUSING),
    rooms: getRandomElement(ROOMS),
    guests: getRandomInteger(Guests.MIN, Guests.MAX),
    checkin: registry,
    checkout: registry,
    features: getSomeArray(FEATURES_HOUSING),
    photos: getSomeArray(PHOTOS_GALLARY),
  };

  return {author, offer, location};
};

// Генерируем массив из 10 объектов
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
