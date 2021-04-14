const GET_URL = 'https://22.javascript.pages.academy/keksobooking/data';
const POST_URL = 'https://22.javascript.pages.academy/keksobooking';

const loadData = () => {
  return fetch(GET_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status}: ${response.statusText}`);
    })
};

const postFormData = () => {
  return fetch(
    POST_URL,
    {
      method: 'POST',
      type: 'multipart/form-data',
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status}: ${response.statusText}`);
    })
}

export {loadData, postFormData}
