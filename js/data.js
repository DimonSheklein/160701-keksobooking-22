import {getRandomInteger, getRandomFloatNumber, getRandomElement, getSomeArray} from './util.js'

const HOUSES = ['palace', 'flat', 'house', 'bungalow'];
const FEATURES = ['wifi','dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const ROOMS = [1, 2, 3, 100];
const ROOMS_DECLENSIONS = ['комната', 'комнаты', 'комнат'];
const TIMES = ['12:00', '13:00', '14:00'];
const PHOTOS = [
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
const CHARACTERS = 5;
const ADS_COUNT = 10;

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
const CoordinateX = {
  MIN: 35.65000,
  MAX: 35.70000,
};
const CoordinateY = {
  MIN: 139.70000,
  MAX: 139.80000,
};

// Создаем объект для массива
const getAd = () => {
  const registry = getRandomElement(TIMES);
  const avatarId = getRandomInteger(AvatarId.MIN, AvatarId.MAX);

  // Описание автора
  const author = {
    avatar: 'img/avatars/user0' + avatarId + '.png',
  };

  // Местоположение в виде географических координат
  const location = {
    x: getRandomFloatNumber(CoordinateX.MIN, CoordinateX.MAX, CHARACTERS),
    y: getRandomFloatNumber(CoordinateY.MIN, CoordinateY.MAX, CHARACTERS),
  };

  // Информация об объявлении
  const offer = {
    title: getRandomElement(TITLES),
    description: getRandomElement(DESCRIPTIONS),
    address: Object.values(location).join(', '),
    price: getRandomInteger(Price.MIN, Price.MAX),
    type: getRandomElement(HOUSES),
    rooms: getRandomElement(ROOMS),
    guests: getRandomInteger(Guests.MIN, Guests.MAX),
    checkin: registry,
    checkout: registry,
    features: getSomeArray(FEATURES),
    photos: getSomeArray(PHOTOS),
  };

  return {author, offer, location};
};

// Генерируем массив из 10 объектов
const getAds = (n) => {
  let ads = [];

  for (let i = 0; i < n; i++) {
    ads.push(getAd());
  }

  return ads;
};

// const ads = getAds();

// export {ads};

const getDeclination = (count, variants) => {
  if (count % 10 > 4 && count % 10 < 10 || count % 10 === 0) {
    return variants[2];
  } else if (count % 10 > 1 && count % 10 < 5) {
    return variants[1];
  } else {
    return variants[0];
  }
};

export {getAds, ADS_COUNT, getDeclination, ROOMS_DECLENSIONS};

