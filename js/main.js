import {getAds, ADS_COUNT} from './data.js';
import {renderCard} from './card.js';
import './form.js';

const MAP_NODE = document.querySelector('#map-canvas')
const ads = getAds(ADS_COUNT);

const adElement = renderCard(ads[1]);
MAP_NODE.appendChild(adElement);
