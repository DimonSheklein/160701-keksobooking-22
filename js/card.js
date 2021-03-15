import {pluralize} from './util.js';

const CARD_TEMPLATE = document.querySelector('#card').content.querySelector('.popup');

const CardSelectors = {
  TITLE: '.popup__title',
  ADDRESS: '.popup__text--address',
  PRICE: '.popup__text--price ',
  TYPE: '.popup__type',
  CAPACITY: '.popup__text--capacity',
  TIME: '.popup__text--time',
  FEATURES_CONTAINER: '.popup__features',
  DESCRIPTION: '.popup__description',
  PHOTOS_CONTAINER: '.popup__photos',
  AVATAR: '.popup__avatar',
}

const getNodes = (parent, selectors) => {
  const result = {};

  Object.entries(selectors).forEach(([key, selector]) => {
    result[key] = parent.querySelector(selector);
  });

  return result;
}

const ROOMS_VARIANTS = ['комната', 'комнаты', 'комнат'];
const HOUSE_TYPES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
}

const getTypeHouse = (type) => HOUSE_TYPES[type];
const getGuestsDeclination = (count) => (count % 100 === 1) ? 'гостя' : 'гостей';
const getCapacityValue = (rooms, guests, variants) => {
  return `${rooms} ${pluralize(rooms, variants)} для ${guests} ${getGuestsDeclination(guests)}`
};

const fillFragmentPhoto = (urls) => {
  const fragment = document.createDocumentFragment();

  urls.forEach((url) => {
    const photoNode = CARD_TEMPLATE.querySelector('.popup__photo').cloneNode(true);
    photoNode.setAttribute('src', url);
    fragment.appendChild(photoNode);
  });

  return fragment;
}

const renderPhotos = (photosContainer, urls) => {
  if (urls.length > 0) {
    photosContainer.textContent = '';
    photosContainer.appendChild(fillFragmentPhoto(urls))
  } else {
    photosContainer.remove();
  }
};

const fillFeatures = (featuresContainer, types) => {
  const FEATURE_ELEMENTS = featuresContainer.querySelectorAll('.popup__feature');

  if (types.length > 0) {
    for (let feature of FEATURE_ELEMENTS) {
      if (!types.includes(feature.className.split('--')[1])) {
        feature.remove();
      }
    }
  } else {
    featuresContainer.remove();
  }
};

const renderCard = (data) => {
  const CARD_ELEMENT = CARD_TEMPLATE.cloneNode(true);

  const NODES = getNodes(CARD_ELEMENT, CardSelectors);

  renderPhotos(NODES.PHOTOS_CONTAINER, data.offer.photos);
  fillFeatures(NODES.FEATURES_CONTAINER, data.offer.features);
  NODES.TITLE.textContent = data.offer.title;
  NODES.ADDRESS.textContent = data.offer.address;
  NODES.PRICE.textContent = `${data.offer.price} ₽/ночь`;
  NODES.TYPE.textContent = getTypeHouse(data.offer.type);
  NODES.CAPACITY.textContent = getCapacityValue(data.offer.rooms, data.offer.guests, ROOMS_VARIANTS);
  NODES.TIME.textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`;
  NODES.DESCRIPTION.textContent = data.offer.description;
  NODES.AVATAR.setAttribute('src', data.author.avatar);

  return CARD_ELEMENT;
};

export {renderCard};
