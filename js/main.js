'use strict';

// Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandomInteger = (min, max) => {
  let minCeil = Math.ceil(min);
  let maxFloor = Math.floor(max);
  if (min < 0 || max < 0) {
    throw new Error('диапазон может быть только положительный, включая ноль!')
  }
  if (max <= min) {
    minCeil = Math.ceil(max);
    maxFloor = Math.floor(min);
  }
  if (isNaN(min) || isNaN(max)) {
    throw new Error('в качестве параметров может быть только Number!')
  }

  return Math.floor( Math.random() * (maxFloor - minCeil + 1) ) + minCeil; //за основу взял с https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
};

// console.log(getRandomInteger(20, 10, 5));

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно
const getCoordinate = (min, max, count) => {
  if (min < 0 || max < 0) {
    throw new Error('диапазон может быть только положительный, включая ноль!')
  }
  if (max <= min) {
    [min, max] = [max, min]
  }
  if (isNaN(min) || isNaN(max)) {
    throw new Error('в качестве параметров может быть только Number!')
  }
  const rundomNumber = Math.random() * (max - min + 1) + min; //Максимум и минимум включаются
  let fixedNum = '1e' + count;

  return Math.floor(rundomNumber * fixedNum) / fixedNum;
}

// console.log(getCoordinate(10, 20, 5));

// Проверка исключений
try {
  getRandomInteger();
  getCoordinate();
} catch (err) {
  alert(err);
}
