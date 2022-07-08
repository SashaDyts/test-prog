import { PaginApi } from './pagi';
import { GalleryRenderApi } from './gallery-render';
import { ImagesApiService } from './fetch-images';
import { renderPagination } from './render-pagination';
import { refs } from './refs';
import { getFilmId } from './getFilmId';

const paginationApi = new PaginApi();
const filmsApiService = new ImagesApiService();
const galleryRenderApi = new GalleryRenderApi();

export async function renderGal(pageToRander) {
  const data = await filmsApiService.fetchImages(pageToRander);
  const dataGenres = await filmsApiService.getGenres();

  galleryRenderApi.append(data, dataGenres);
  getFilmId();

  renderPagination(filmsApiService.totalPages, refs.paginationButtonsEl);
  //   paginationApi.addEventListenersOnStaticBtns();
  //   paginationApi.addEventListeners();
}
