import axios from 'axios';

// https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12
// ' https://pixabay.com/api/?q=cat&page=1&key=32846684-9759f804fcaf49bb92c6f21b5&image_type=photo&orientation=horizontal&per_page=12';

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

  const images = data.hits.map(({ id, webformatURL, tags, largeImageUR }) => ({
    id,
    webformatURL,
    tags,
    largeImageUR,
  }));
  const totalImages = data.totalImages;
  return { totalImages, images };
};

// export const requestImages = async (inputValue, pageNr) => {
//   try {
//     const { data } = await axios.get(
//       `/?q=${inputValue}&page=${pageNr}&key=${API_KEY}`
//     );
//     console.log(data);
//   } catch (error) {
//   } finally {
//   }
// };

// requestImages('cat', 1);
