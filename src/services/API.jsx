import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '32846684-9759f804fcaf49bb92c6f21b5';
export const PER_PAGE = 12;

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  image_type: 'photo',
  orientation: 'horisontal',
  per_page: PER_PAGE,
};

export const requestImages = async (inputValue, pageNr) => {
  const { data } = await axios.get(
    `/?q=${inputValue}&page=${pageNr}&key=${API_KEY}`
  );
  return data;
  // console.log(data);
};
// requestImages('dog', 5);
