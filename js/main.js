import {renderCard} from './card.js';
import {setAddress, enableForms, disabledForms} from './form.js';
import {initMap, addPins} from './map.js';
import {getData} from './api.js';

const adaptPoints = (ad) => ({
  lat: ad.location.lat,
  lng: ad.location.lng,
});

const handleDataSuccess = (data) => {
  const coords = data.map(adaptPoints);
  const getPopup = (idx) => renderCard(data[idx]);

  addPins(coords, getPopup)
}

const handleDataError = (err) => {
  alert('Ошибка получения данных');
  throw new Error(err);
}

disabledForms();
initMap(enableForms, setAddress);

const dataPromise = getData();

dataPromise
  .then(handleDataSuccess)
  .catch(handleDataError);
