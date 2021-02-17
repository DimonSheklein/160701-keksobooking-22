import {getRandomInteger, getRandomFloatNumber, getRandomElement, getSomeArray} from './util.js'

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

// Созданием объект для массива
const getAd = function() {
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
const getAds = function() {
  let ads = [];
  let numberAds = 10;

  for (let i = 0; i < numberAds; i++) {
    ads.push(getAd());
  }

  return ads;
};

const ads = getAds();

export {ads};

