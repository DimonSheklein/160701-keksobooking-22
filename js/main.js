import {renderCard} from './card.js';
import {getAds, ADS_COUNT} from './data.js';
import {addFormHandlers, activeStateForm, addCoords} from './form.js';
import {DEAFULT_COORDINATE, showMap, renderMainPin, addPins} from './map.js';

const ads = getAds(ADS_COUNT);

const coords = ads.map((key) => ({
  lat: key.location.x,
  lng: key.location.y,
}))

const activeForm = activeStateForm(DEAFULT_COORDINATE);

const pinMoveHandler = (coords) => {
  return addCoords(coords);
}

const getPopup = (idx) => {
  return renderCard(ads[idx])
}

showMap(activeForm);
renderMainPin(pinMoveHandler);
addPins(coords, getPopup);
addFormHandlers();
