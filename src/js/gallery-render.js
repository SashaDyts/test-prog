import { ImagesApiService } from './fetch-images';
// import { PaginApi } from './pagi';
import { refs } from './refs';

const filmsApiService = new ImagesApiService();
// const paginationApi = new PaginApi();

export class GalleryRenderApi {
  constructor() {
    this.refs = {};
    this.filmId = '';
  }

  getRefs() {
    this.refs = { galleryLink: document.querySelectorAll('.gallery') };
  }

  makeGalleryCardsMarkup(data, dataGenres) {
    let result;

    result = data
      .map(data => {
        if (data.genre_ids) {
          // console.log(data.genre_ids);
          let genresArray;

          genresArray = dataGenres
            .filter(genre => data.genre_ids.includes(genre.id))
            .map(genre => genre.name);

          let date = new Date(data.release_date);
          let date2 = new Date(data.first_air_date);
          let year = date.getFullYear();
          let year2 = date2.getFullYear();
          let vote = data.vote_average.toFixed(1);
          return `<li class="gallery__item" data-id="${data.id}">
        <a href="" class="gallery__link" onclick="return false;"><div class="card">
          <img src="https://image.tmdb.org/t/p/w500${
            data.poster_path
          }" alt="" class="card__img" width="500" />
          <p class="card__title">${data.title || data.name}</p>
          <div class="card__info">
            <p class="card__text">${genresArray.splice(-3).join(', ')} | ${
            year || year2
          }<div class="card__ratting"><p class="card__rattimg-text">${vote}</p></div></p>
          </div>

        </div></a>
      </li>`;
        } else {
          // console.log(data.genre_ids);
        }
      })
      .join('');
    return result;
  }

  append(data, dataGenres) {
    refs.galleryEl.insertAdjacentHTML(
      'beforeend',
      this.makeGalleryCardsMarkup(data, dataGenres)
    );

    // this.getFilmId();
  }

  async renderStartPage(pageToRander, funcAppendPagination) {
    const data = await filmsApiService.fetchImages(pageToRander);
    const dataGenres = await filmsApiService.getGenres();
    this.append(data, dataGenres);
    this.getRefs();
    this.getFilmId();

    // paginationApi.append();
    // paginationApi.addEventListenersOnStaticBtns();
    // funcAppendPagination;
    // paginationApi.getScreenWidth();
    // funcAppendPagination;
    // paginationApi.append();
  }

  async renderBySearch(query) {
    this.deleteMarkup();

    const data = await filmsApiService.searchFetch(
      filmsApiService.currentPage,
      query
    );

    const dataGenres = await filmsApiService.getGenres();
    this.append(data, dataGenres);

    this.getRefs();
    this.getFilmId();
  }

  deleteMarkup() {
    refs.galleryEl.innerHTML = '';
  }

  getFilmId() {
    this.getRefs();

    this.refs.galleryLink[0].addEventListener('click', event => {
      if (event.target.nodeName === 'UL') {
        return;
      }
      // console.log(event.target.dataset.id);
      console.log(event.target.nodeName);
      console.log(this.refs.galleryLink);
      this.filmId = event.target.closest('.gallery__item').dataset.id;

      console.log(this.filmId);
    });
  }
}
