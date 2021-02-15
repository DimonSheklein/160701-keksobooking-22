import {getObject} from './object.js';

// Генерируем массив из 10 объектов
const getArray = function() {
  let array = [];

  for (let i = 0; i < 10; i++) {
    array.push(getObject());
  }

  return array;
};

const fillCards = getArray();

// eslint-disable-next-line no-console
console.log(fillCards)
