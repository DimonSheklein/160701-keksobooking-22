// Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandomInteger = (...args) => {
  let [min, max] = args;
  if (min < 0 || max < 0) {
    throw new Error('диапазон может быть только положительный, включая ноль!')
  }
  if (max <= min) {
    [min, max] = [max, min];
  }
  if (isNaN(min) || isNaN(max)) {
    throw new Error('в качестве параметров может быть только Number!')
  }
  if (min === max) {
    return min;
  }

  return Math.floor( Math.random() * (max - min + 1) ) + min; //за основу взял с https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
};

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно
const getRandomFloatNumber = (min, max, precision) => {
  if (precision < 0 || isNaN(precision)) {
    throw new Error('передан некорректный аргумент в качестве параметра!')
  }

  const mediator = Math.pow(10, precision);

  return getRandomInteger(min * mediator, max * mediator) / mediator;
};

// Получаем рандомный эллемент массива
const getRandomElement = (array) => {
  const index = getRandomInteger(0, array.length - 1);
  return array[index];
};

// Получаем случайный массив методом фильтрации
const getSomeArray = (array) => {
  return array.filter(() => {
    return getRandomInteger(0, 1);
  });
};


export {getRandomInteger, getRandomFloatNumber, getRandomElement, getSomeArray};
