import {renderCard} from './card.js';
import {getAds, ADS_COUNT} from './data.js';
import {addFormHandlers, activeStateForm, addCoords} from './form.js';
import {DEAFULT_COORDINATE, showMap, renderMainPin, addPins} from './map.js';

const ads = getAds(ADS_COUNT);

const adsData = ads.map((key, index) => {
  return {
    lat: key.location.x,
    lng: key.location.y,
    id: index,
  };
})

const activeForm = activeStateForm(DEAFULT_COORDINATE);

const pinMoveHandler = (coords) => {
  return addCoords(coords);
}

const getPopup = (index) => {
  return renderCard(ads[index])
}

showMap(activeForm);
renderMainPin(pinMoveHandler);
addPins(adsData, getPopup);
addFormHandlers();
