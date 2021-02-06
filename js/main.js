'use strict';


const getRandomInteger = (min, max) => {
  let minCeil = Math.ceil(min);
  let maxFloor = Math.floor(max);
  if (minCeil < 0 || maxFloor < 0) {
    throw new Error('диапазон может быть только положительный, включая ноль!')
  };
  if (isNaN(min) || isNaN(max)) {
    throw new Error('в качестве параметров может быть только Number!')
  };
  if (max <= min) {
    min = max;
    max = min;
  };

  return Math.floor( Math.random() * (maxFloor - minCeil + 1) ) + minCeil; //за основу взял с https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
};

try {
  getRandomInteger(min, max);
} catch (err) {
alert('Писец программе. Батя, спасай!');
}

const getCoordinate = (min, max, count) => {
  if (min < 0 || max < 0) {
    throw new Error('диапазон может быть только положительный, включая ноль!')
  };
  if (max <= min) {
    [min, max] = [max, min]
  };
  if (isNaN(min) || isNaN(max)) {
    throw new Error('в качестве параметров может быть только Number!')
  };
const rundomNumber = Math.random() * (max - min + 1) + min;
let fixedNum = '1e' + count;

return Math.floor(rundomNumber * fixedNum) / fixedNum;
}

try {
  getCoordinate(min, max);
} catch (err) {
alert(err);
}

// console.log(getCoordinate(10, 20, 5));

// Можно было наверно сократить количество кода следующей записью, только что-то не работает:(((
// const getCoordinate1 = (min, max, count) => {
// const fixedNum = '1e' + count;
// return getCoordinate1 = Math.floor(getRandomInteger(min, max) * fixedNum) / fixedNum;
// }

// console.log(getCoordinate1(10, 20, 5));
