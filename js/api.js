const GET_URL = 'https://22.javascript.pages.academy/keksobooking/data';
const POST_URL = 'https://22.javascript.pages.academy/keksobooking';

const getData = () => {
  return fetch(GET_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
    })
};

const postFormData = (form) => {
  return fetch(
    POST_URL,
    {
      method: 'POST',
      // type: 'multipart/form-data',
      body: form,
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`${response.status}: ${response.statusText}`);
        // console.log('ERROR')
      }
    })
}

export {getData, postFormData}
