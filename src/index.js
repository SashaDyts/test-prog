import { ImagesApiService } from './js/fetch-images';
const imagesApiService = new ImagesApiService();

const refs = {
  galleryItem: document.querySelector('.gallery'),
};

async function lox() {
  const data = await imagesApiService.fetchImages();

  append(data);
  console.log(data);
}

lox();

function makeGalleryCardsMarkup(data) {
  return data
    .map(data => {
      return `<li class="gallery__item">
        <a href="" class="gallery__link"><div class="card">
          <img src="https://image.tmdb.org/t/p/w500${
            data.poster_path
          }" alt="" class="card__img" width="398"/>
          <p class="card__title">${data.title || data.name}</p>
          <div class="card__info">
            <p class="card__text">Drama, Comedy | 2019<div class="card__ratting"><p class="card__rattimg-text">8.0</p></div></p>
          </div>
          
        </div></a>
      </li>`;
    })
    .join('');
}

function append(data) {
  refs.galleryItem.insertAdjacentHTML(
    'beforeend',
    makeGalleryCardsMarkup(data)
  );
}
