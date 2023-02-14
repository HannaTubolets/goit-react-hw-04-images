import axios from 'axios';
import { Component } from 'react';
// import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    error: '',
    page: 1,
    showLoadMore: false,
  };

  fetchImages = async () => {
    try {
      const { data } = await axios.get(
        ' https://pixabay.com/api/?q=cat&page=1&key=18681081-442890f4222be4a8d6361e754&image_type=photo&orientation=horizontal&per_page=12'
      );
      // console.log('data ', data);
      this.setState({
        images: data,
      });
    } catch (error) {
    } finally {
    }
  };

  componentDidMount() {
    this.fetchImages();
  }

  render() {
    // const { images } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
        {/* <ImageGallery images={images} /> */}
      </div>
    );
  }
}
