import { GalleryRenderApi } from './js/gallery-render';
import { ImagesApiService } from './js/fetch-images';
import { renderGal } from './js/render-gallery';
// import { PaginApi } from './js/pagi';

// const paginationApi = new PaginApi();
const galleryRenderApi = new GalleryRenderApi();
const fetchApi = new ImagesApiService();

renderGal(1);
