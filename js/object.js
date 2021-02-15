import {getRandomInteger, getRandomFloatNumber, getRandomElement, getSomeArray} from './util.js'
import {TYPE_HOUSING, FEATURES_HOUSING, ROOMS, TIME_TYPE, PHOTOS_GALLARY, TITLES, DESCRIPTIONS, Price, AvatarId, Guests, Coordinate, CHARACTERS} from './data.js';

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

export {getObject};
