
import {getDeclination, ROOMS_DECLENSIONS} from './data.js';

const CARD_TEMPLATE = document.querySelector('#card').content.querySelector('.popup');

const getTypeHouse = (type) => {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
  }};

const getGuestsDeclination = (count) => {
  if (count === 1) {
    return 'гостя';
  }
  return 'гостей';
};

const renderCard = (data) => {
  const cardElement = CARD_TEMPLATE.cloneNode(true);

  const title = cardElement.querySelector('.popup__title');
  const address = cardElement.querySelector('.popup__text--address');
  const price = cardElement.querySelector('.popup__text--price ')
  const type = cardElement.querySelector('.popup__type');
  const capacity = cardElement.querySelector('.popup__text--capacity');
  const time = cardElement.querySelector('.popup__text--time');
  const featuresContainer = cardElement.querySelector('.popup__features'); //
  const description = cardElement.querySelector('.popup__description');
  const photosContainer = cardElement.querySelector('.popup__photos');
  const avatar = cardElement.querySelector('.popup__avatar');

  const imgElement = photosContainer.querySelector('.popup__photo').cloneNode();
  photosContainer.textContent = '';

  const featureElement = featuresContainer.querySelector('.popup__feature').cloneNode(true);
  featureElement.classList.remove('popup__feature--wifi')
  featuresContainer.textContent = '';

  title.textContent = data.offer.title;
  address.textContent = data.offer.address;
  price.textContent = `${data.offer.price} ₽/ночь`;
  type.textContent = getTypeHouse(data.offer.type);
  capacity.textContent = `${data.offer.rooms} ${getDeclination(data.offer.rooms, ROOMS_DECLENSIONS)} для ${data.offer.guests} ${getGuestsDeclination(data.offer.guests)}`;
  time.textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`;
  description.textContent = data.offer.description;

  data.offer.features.forEach((feature) => {
    const featureClone = featureElement.cloneNode();
    featureClone.classList.add(`popup__feature--${feature}`);
    featuresContainer.appendChild(featureClone);
  });

  data.offer.photos.forEach((photoSrc) => {
    const imgClone = imgElement.cloneNode();
    imgClone.setAttribute('src', photoSrc);
    photosContainer.appendChild(imgClone)
  });


  avatar.setAttribute('src', data.author.avatar);
  return cardElement;
};

export {renderCard};
