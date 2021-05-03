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
const COPYRIGHT_LAYER = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

/* ----------------- стандартные балуны ----------------- */
const addPins = (points, getPopup) =>  {
  const addPin = ( { lat, lng} , idx) =>{
    const marker = L.marker({lat, lng}, {STANDARD_PIN_ICON});

    marker.bindPopup(
      () => getPopup(idx),
      {keepInView: true},
    );

    marker.addTo(MAP);
  };

  points.forEach(addPin);
}

/* ----------------- Инициализация карты ---------------- */
const initMap = (onLoad, onPinMove) => {
  const showMap = () => {
    onLoad();
    onPinMove(DEAFULT_COORDINATE);
  }


  // перевод формы в активное состояние после загрузки карты
  MAP.on('load', showMap);

  // центрируем карту, указав координаты и зум
  MAP.setView(DEAFULT_COORDINATE, ZOOM);

  // создаём и добавляем слой на карту
  L.tileLayer(URL_LAYER, { attribution: COPYRIGHT_LAYER }).addTo(MAP);

  const mainPinMoveHandler = (evt) => {
    onPinMove(evt.target.getLatLng());
  }

  // добавляем пин на карту
  const mainPin = L.marker(DEAFULT_COORDINATE,
    {
      draggable: true,
      icon: MAIN_PIN_ICON,
    },
  );

  mainPin.addTo(MAP);

  // событие получения координат
  mainPin.on('move', mainPinMoveHandler);
}

/* ----------------------- exports ---------------------- */
export {DEAFULT_COORDINATE, initMap, addPins};
