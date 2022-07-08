import { GalleryRenderApi } from './gallery-render';
const galleryRenderApi = new GalleryRenderApi();

export function getFilmId() {
  galleryRenderApi.getRefs();

  galleryRenderApi.refs.galleryLink[0].addEventListener('click', event => {
    if (event.target.nodeName === 'UL') {
      return;
    }
    // console.log(event.target.dataset.id);
    // console.log(event.target.nodeName);
    // console.log(galleryRenderApi.refs.galleryLink);
    galleryRenderApi.filmId = event.target.closest('.gallery__item').dataset.id;

    console.log(galleryRenderApi.filmId);
  });
}
