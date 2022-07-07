import { GalleryRenderApi } from './js/gallery-render';
import { ImagesApiService } from './js/fetch-images';
import { renderGal } from './js/render-gallery';
// import { PaginApi } from './js/pagi';

// const paginationApi = new PaginApi();
const galleryRenderApi = new GalleryRenderApi();
const fetchApi = new ImagesApiService();

// galleryRenderApi.renderStartPage(1);
renderGal(1);
// paginationApi.append();
// paginationApi.addEventListenersOnStaticBtns();

// async function start() {
//   await galleryRenderApi.renderStartPage(1);
//   paginationApi.append();
//   paginationApi.addEventListenersOnStaticBtns();
//   // console.log(paginationApi.totalPages);
//   // console.log(paginationApi.refs);
// }

// start();
// paginationApi.append();
// console.log(paginationApi.isMobile);
// console.log(fetchApi.fetchAll(fetchApi.currentPage));
// async function lox() {
//   await galleryRenderApi.render();
//   //   modalOpen();

//   galleryRenderApi.refs.galleryLink[0].addEventListener('click', event => {
//     // if (event.target.nodeName !== 'IMG') {
//     //   return;
//     // }
//     // console.log(event.target.dataset.id);
//     console.log(event.target.closest('.gallery__item'));
//   });
// }

// function modalOpen() {
//   galleryRenderApi.refs.galleryLink.addEventListener('click', async event => {
//     // if (event.target.nodeName !== 'A') {
//     //   return;
//     // }
//   });
// }
// // modalOpen();

// lox();
