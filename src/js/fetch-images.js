import axios from 'axios';
export class ImagesApiService {
  constructor() {
    this.id = [];
    this.currentPage = 1;
    this.API_KEY = '8491f0c88fa7dc1f853ccc0c4b339dca';
    this.genres = [
      { id: 28, name: 'Action' },
      { id: 12, name: 'Adventure' },
      { id: 16, name: 'Animation' },
      { id: 35, name: 'Comedy' },
      { id: 80, name: 'Crime' },
      { id: 99, name: 'Documentary' },
      { id: 18, name: 'Drama' },
      { id: 10751, name: 'Family' },
      { id: 14, name: 'Fantasy' },
      { id: 36, name: 'History' },
      { id: 27, name: 'Horror' },
      { id: 10402, name: 'Music' },
      { id: 9648, name: 'Mystery' },
      { id: 10749, name: 'Romance' },
      { id: 878, name: 'Science Fiction' },
      { id: 10770, name: 'TV Movie' },
      { id: 53, name: 'Thriller' },
      { id: 10752, name: 'War' },
      { id: 37, name: 'Western' },
    ];
  }

  async fetchImages() {
    const URL = `https://api.themoviedb.org/3/trending/all/day?api_key=${this.API_KEY}&page=${this.currentPage}`;
    const options = {};

    const response = await axios.get(URL);
    console.log(response);
    return response.data.results;
  }

  async getGenres() {
    const URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.API_KEY}&language=en-US`;

    const response = await axios.get(URL);

    return response.data.genres;
  }
}
