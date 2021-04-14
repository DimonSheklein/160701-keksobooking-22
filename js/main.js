import {renderCard} from './card.js';
import {setAddress, enableForms} from './form.js';
import {initMap, addPins} from './map.js';
import {loadData} from './api.js';

const adaptPoint = (ad) => ({
  lat: ad.location.x,
  lng: ad.location.y,
});

const dataPromise = loadData();

const renderPins = (data) => {
  const coords = data.map(adaptPoint);
  const getPopup = (idx) => renderCard(data[idx]);

  addPins(coords, getPopup);
}

const handleDataSuccess = () => {
  const data = loadData();
  // console.log('handleDataSuccess:', data);
  renderPins(data)
}

  const handleMapLoadSuccess = () => {
  enableForms();

  dataPromise
  .then(handleDataSuccess)
  .then(console.log('hello'))
  .catch(alert('WTF???'))
  }

initMap(handleMapLoadSuccess, setAddress);
