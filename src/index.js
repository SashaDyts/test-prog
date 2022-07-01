import { ImagesApiService } from './js/fetch-images';
const imagesApiService = new ImagesApiService();

const refs = {
  galleryItem: document.querySelector('.gallery'),
};

async function lox() {
  const data = await imagesApiService.fetchImages();
  const dataGenres = await imagesApiService.getGenres();
  console.log(dataGenres);
  append(data, dataGenres);

  // console.log(ff);
  // imagesApiService.genres.map(res => res.id);
}

lox();

function makeGalleryCardsMarkup(data, dataGenres) {
  return data
    .map(data => {
      console.log(dataGenres);
      let genresArray = dataGenres
        .filter(genre => data.genre_ids.includes(genre.id))
        .map(genre => genre.name);
      let date = new Date(data.release_date);
      let date2 = new Date(data.first_air_date);
      let year = date.getFullYear();
      let year2 = date2.getFullYear();
      let vote = data.vote_average.toFixed(1);
      return `<li class="gallery__item">
        <a href="" class="gallery__link"><div class="card">
          <img src="https://image.tmdb.org/t/p/w500${
            data.poster_path
          }" alt="" class="card__img" width="398"/>
          <p class="card__title">${data.title || data.name}</p>
          <div class="card__info">
            <p class="card__text">${genresArray.splice(-3).join(', ')} | ${
        year || year2
      }<div class="card__ratting"><p class="card__rattimg-text">${vote}</p></div></p>
          </div>
          
        </div></a>
      </li>`;
    })
    .join('');
}

function append(data, dataGenres) {
  refs.galleryItem.insertAdjacentHTML(
    'beforeend',
    makeGalleryCardsMarkup(data, dataGenres)
  );
}

console.log(imagesApiService.getGenres());

const d = [1, 2, 3, 4, 5];

d.splice(3);
console.log(d);
