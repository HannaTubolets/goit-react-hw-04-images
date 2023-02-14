import axios from 'axios';

// API key: 18681081-442890f4222be4a8d6361e754
// URL-рядок HTTP-запиту
// https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12

axios.defaults.baseURL = `https://pixabay.com/api`;

export const fetchImages = async (inputValue, pageNr) => {
  const response = await axios.get(
    `/?q=${inputValue}&page=${pageNr}&key=18681081-442890f4222be4a8d6361e754&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data.hits.map(image => {
    return {
      id: image.id,
      webformatURL: image.webformatURL,
      largeImageURL: image.largeImageURL,
      tags: image.tags,
    };
  });
};
// console.log(fetchImages('cat', 1));

// axios
//   .get(
//     'https://pixabay.com/api/?q=cat&page=1&key=18681081-442890f4222be4a8d6361e754&image_type=photo&orientation=horizontal&per_page=12'
//   )
//   .then(response => console.log(data));
