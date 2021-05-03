const SUCCESS_POPUP_TEMPLATE = document.querySelector('#success');
const ERROR_POPUP_TEMPLATE = document.querySelector('#error');

const SUCCESS_POPUP = SUCCESS_POPUP_TEMPLATE.content.querySelector('.success');
const ERROR_POPUP = ERROR_POPUP_TEMPLATE.content.querySelector('.error');
const ERROR_BTN_CLOSE = ERROR_POPUP.querySelector('.error__button');

const MAIN_CONTAINER = document.querySelector('main');

const openSuccessPopup = () => {
  MAIN_CONTAINER.append(SUCCESS_POPUP);

  // setTimeout(() => SUCCESS_POPUP.remove(), 3000);
  window.addEventListener('click', () => SUCCESS_POPUP.remove());
};

const openErrorPopup = () => {
  MAIN_CONTAINER.append(ERROR_POPUP);
  ERROR_BTN_CLOSE.addEventListener('click', () => ERROR_POPUP.remove());
  document.addEventListener('keydown', (evt) => {
    if(evt.code === 'Escape') {
      ERROR_POPUP.remove();
    }
  })
  window.addEventListener('click', (evt) => {
    if(evt.target !== ERROR_BTN_CLOSE)
      ERROR_POPUP.remove()
  });
};

export {openSuccessPopup, openErrorPopup}
