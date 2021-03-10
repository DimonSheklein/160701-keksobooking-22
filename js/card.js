import {pluralize} from './util.js';

const CARD_TEMPLATE = document.querySelector('#card').content.querySelector('.popup');
const CARD_ELEMENT = CARD_TEMPLATE.cloneNode(true);
const TITLE = CARD_ELEMENT.querySelector('.popup__title');
const ADDRESS = CARD_ELEMENT.querySelector('.popup__text--address');
const PRICE = CARD_ELEMENT.querySelector('.popup__text--price ')
const TYPE = CARD_ELEMENT.querySelector('.popup__type');
const CAPACITY = CARD_ELEMENT.querySelector('.popup__text--capacity');
const TIME = CARD_ELEMENT.querySelector('.popup__text--time');
const FEATURES_CONTAINER = CARD_ELEMENT.querySelector('.popup__features');
const FEATURE_ELEMENT = FEATURES_CONTAINER.querySelectorAll('.popup__feature');
const DESCRIPTION = CARD_ELEMENT.querySelector('.popup__description');
const PHOTOS_CONTAINER = CARD_ELEMENT.querySelector('.popup__photos');
const AVATAR = CARD_ELEMENT.querySelector('.popup__avatar');
const ROOMS_VARIANTS = ['комната', 'комнаты', 'комнат'];

const HOUSE_TYPES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
}

const getTypeHouse = (type) => HOUSE_TYPES[type];
const getGuestsDeclination = (count) => (count % 100 === 1) ? 'гостя' : 'гостей';
const getCapacityTemplate = (rooms, guests, variants) => {
  return `${rooms} ${pluralize(rooms, variants)} для ${guests} ${getGuestsDeclination(guests)}`
};

const createPhotos = (urls) => {
  const photoElement = PHOTOS_CONTAINER.querySelector('.popup__photo');

  if (urls.length > 0) {
    PHOTOS_CONTAINER.textContent = '';
    urls.forEach((url) => {
      const photoNode = photoElement.cloneNode();
      photoNode.setAttribute('src', url);
      PHOTOS_CONTAINER.appendChild(photoNode);
    });
  } else {
    PHOTOS_CONTAINER.remove();
  }
};

const createFeatures = (types) => {
  if (types.length > 0) {
    for (let feature of FEATURE_ELEMENT) {
      if (!types.includes(feature.className.split('--')[1])) {
        feature.remove();
      }
    }
  } else {
    FEATURES_CONTAINER.remove();
  }
};


const renderCard = (data) => {
  createPhotos(data.offer.photos);
  createFeatures(data.offer.features);
  TITLE.textContent = data.offer.title;
  ADDRESS.textContent = data.offer.address;
  PRICE.textContent = `${data.offer.price} ₽/ночь`;
  TYPE.textContent = getTypeHouse(data.offer.type);
  CAPACITY.textContent = getCapacityTemplate(data.offer.rooms, data.offer.guests, ROOMS_VARIANTS);
  TIME.textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`;
  DESCRIPTION.textContent = data.offer.description;
  AVATAR.setAttribute('src', data.author.avatar);

  return CARD_ELEMENT;
};

export {renderCard};
