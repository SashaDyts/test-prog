import axios from 'axios';
export class ImagesApiService {
  constructor() {
    this.id = [];
  }

  async fetchImages() {
    const URL = `https://api.themoviedb.org/3/trending/all/day?api_key=8491f0c88fa7dc1f853ccc0c4b339dca`;
    const options = {};

    const response = await axios.get(URL);
    return response.data.results;
  }

  async getMovieGenres(array) {
    const results = await this.fetchImages();
    return results.map(res => res.id);
  }
}
