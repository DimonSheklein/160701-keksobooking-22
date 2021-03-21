import {
  FORM,
  FORM_ELEMENTS,
  MAP_FILTERS,
  FILTERS_SELECTS,
  FEATURES_CHECKBOXES,
  ADDRESS_INPUT
} from './form.js';
import { getNodeState } from './util.js';
import { getAds, ADS_COUNT } from './data.js';
import { renderCard } from './card.js';

// Константы
const MAP_CONTAINER = document.querySelector('#map-canvas');
const MAP = L.map(MAP_CONTAINER);

const DEAFULT_COORDINATE = {
  lat: 35.6895,
  lng: 139.69171,
};
const ZOOM = 12;

const MAIN_PIN_ICON = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const STANDARD_PIN_ICON = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const URL_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT_LAYER =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const ads = getAds(ADS_COUNT);

// const coordData = ads.map((obj, index) => {
//   return {
//     lat: obj.location.x,
//     lng: obj.location.y,
//     id: index,
//   };
// });

// eslint-disable-next-line no-console
// console.log(ads);
// console.log(renderCard())

/* ------------------------------------------------------ */
// активное состояние карты
const activeStateMap = () => {
  FORM.classList.remove('ad-form--disabled');
  MAP_FILTERS.classList.remove('map__filters--disabled');
  getNodeState(FORM_ELEMENTS, 0);
  getNodeState(FILTERS_SELECTS, 0);
  getNodeState(FEATURES_CHECKBOXES, 0);

  ADDRESS_INPUT.value = Object.values(DEAFULT_COORDINATE).join(', ');
};

// центрируем карту, указав координаты и зум
MAP.setView(DEAFULT_COORDINATE, ZOOM);
// создаём и добавляем слой на карту
L.tileLayer(URL_LAYER, { attribution: COPYRIGHT_LAYER }).addTo(MAP);

MAP.on('load', activeStateMap());

/* -------------------- главный балун ------------------- */

const mainPinmarker = L.marker(DEAFULT_COORDINATE, {
  draggable: true,
  icon: MAIN_PIN_ICON,
});

mainPinmarker.addTo(MAP);

mainPinmarker.on('move', (evt) => {
  const coordinate = evt.target.getLatLng();

  let valCoord = Object.values(coordinate).map((value) => {
    return value.toFixed(5);
  });

  ADDRESS_INPUT.value = valCoord.join(', ')
});

/* ----------------- стандартные балуны ----------------- */

// coordData.forEach(({ lat, lng, id }) => {
//   const marker = L.marker(
//     {
//       lat,
//       lng,
//     },
//     {
//       icon: STANDARD_PIN_ICON,
//       draggable: false,
//     },
//   );

//   marker.addTo(MAP);
//   marker.bindPopup(id.toString());
// });

ads.forEach((ad) => {
  const { x: lat, y: lng } = ad.location;

  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon: STANDARD_PIN_ICON,
    },
  );

  marker.addTo(MAP);
  marker.bindPopup(
    renderCard(ad),
    {
      keepInView: true,
    },
  );
});
