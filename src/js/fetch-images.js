import axios from 'axios';
export class ImagesApiService {
  constructor() {
    this.id = [];
    this.currentPage = 1;
    this.totalPages = 1;
    this.API_KEY = '8491f0c88fa7dc1f853ccc0c4b339dca';
  }

  async fetchImages(pageNumber) {
    const URL = `https://api.themoviedb.org/3/trending/all/day?api_key=${this.API_KEY}&page=${pageNumber}`;
    const options = {};

    const response = await axios.get(URL);

    this.totalPages = await response.data.total_pages;

    return response.data.results;
  }

  async getGenres() {
    const URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.API_KEY}&language=en-US`;

    const response = await axios.get(URL);

    return response.data.genres;
  }

  async searchFetch(pageNumber, query) {
    const URL = `https://api.themoviedb.org/3/search/movie?api_key=${this.API_KEY}&language=en-US&page=${pageNumber}&include_adult=false&query="${query}`;
    const response = await axios.get(URL);
    return response.data.results;
  }

  getCurPage() {
    // console.log(this.currentPage);
  }

  getTotalPages(ne) {
    this.totalPages = ne;
  }
}
