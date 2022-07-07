import { PaginApi } from './pagi';
import { ImagesApiService } from './fetch-images';
import { GalleryRenderApi } from './gallery-render';

const paginationApi = new PaginApi();
const filmsApiService = new ImagesApiService();
const galleryRenderApi = new GalleryRenderApi();

export function pagiListeners() {
  paginationApi.getRefs();

  const refs = {
    ...paginationApi.refs,
  };

  paginationApi.refs.paginationBtns.addEventListener('click', onPaginationBtns);

  function onPaginationBtns(event) {
    onStaticBtns(event);
    onFirstBtn(event);
    onLastBtn(event);
    onNextBtn(event);
    onPrevBtn(event);
  }

  async function onStaticBtns(event) {
    if (!event.target.classList.value.includes('btn__static')) {
      return;
    }

    // paginationApi.isLastPage = false;

    paginationApi.setCurrPage(event.target.textContent);
    // paginationApi.numberToRender = paginationApi._currentPage;

    paginationApi.deleteMarkup();

    galleryRenderApi.deleteMarkup();

    const data = await filmsApiService.fetchImages(paginationApi._currentPage);
    const dataGenres = await filmsApiService.getGenres();
    galleryRenderApi.append(data, dataGenres);

    paginationApi.append(filmsApiService.totalPages);
    paginationApi.getRefs();
    console.log(paginationApi.isLastPage);
  }

  async function onFirstBtn(event) {
    if (!event.target.classList.value.includes('first__btn')) {
      return;
    }
    paginationApi.isLastPage = false;

    paginationApi.numberToRender = 1;
    paginationApi.setCurrPage(event.target.textContent);

    paginationApi.deleteMarkup();

    galleryRenderApi.deleteMarkup();

    const data = await filmsApiService.fetchImages(paginationApi._currentPage);
    const dataGenres = await filmsApiService.getGenres();
    galleryRenderApi.append(data, dataGenres);

    paginationApi.append(filmsApiService.totalPages);
    paginationApi.getRefs();
  }

  async function onLastBtn(event) {
    if (!event.target.classList.value.includes('last__btn')) {
      return;
    }
    // if (
    //   paginationApi.currentBtn.textContent === `${filmsApiService.totalPages}`
    // ) {
    //   console.log('lox');
    // } else 'lox';
    // console.log(paginationApi.refs.currentBtn);
    paginationApi.isLastPage = true;
    paginationApi.isLast = true;
    paginationApi.isLastForDisabled = true;
    console.log(paginationApi.isLastPage);

    paginationApi.setCurrPage(event.target.textContent);
    paginationApi.numberToRender = paginationApi._currentPage;
    paginationApi.deleteMarkup();

    galleryRenderApi.deleteMarkup();

    const data = await filmsApiService.fetchImages(paginationApi._currentPage);
    const dataGenres = await filmsApiService.getGenres();
    galleryRenderApi.append(data, dataGenres);

    paginationApi.append(filmsApiService.totalPages);
    paginationApi.getRefs();
    console.log(paginationApi.refs.currentBtn);
  }

  async function onNextBtn(event) {
    if (
      event.target.classList.value.includes('btn-pag-next') ||
      event.target.classList.value.includes('svg-next') ||
      event.target.classList.value.includes('path-next')
    ) {
      paginationApi.isLastPage = false;

      if (paginationApi.isLastForDisabled) {
        return;
      }
      if (paginationApi.refs.changingBtns[0].textContent === '2') {
        paginationApi.numberToRender = 1;
      }

      paginationApi.numberToRender += 6;
      paginationApi._currentPage = paginationApi.numberToRender;

      paginationApi.deleteMarkup();

      galleryRenderApi.deleteMarkup();

      const data = await filmsApiService.fetchImages(
        paginationApi.numberToRender
      );
      const dataGenres = await filmsApiService.getGenres();
      galleryRenderApi.append(data, dataGenres);

      paginationApi.append(filmsApiService.totalPages);
      paginationApi.getRefs();
      if (
        Number(paginationApi.refs.changingBtns[5].textContent) ===
        filmsApiService.totalPages
      ) {
        paginationApi.refs.lastBtn.setAttribute('disabled', 'true');
        paginationApi.isLastForDisabled = true;
      }
      console.log(paginationApi.refs.changingBtns[5].textContent);

      console.log(paginationApi.refs.lastBtn);
    }
  }

  async function onPrevBtn(event) {
    if (
      event.target.classList.value.includes('btn-pag-prev') ||
      event.target.classList.value.includes('svg-prev') ||
      event.target.classList.value.includes('path-prev')
    ) {
      paginationApi.isLastPage = false;

      if (paginationApi.refs.changingBtns[0].textContent === '1') {
        return;
      }

      console.log(paginationApi.isLast);
      if (paginationApi.isLast) {
        paginationApi.numberToRender += -11;
      } else {
        paginationApi.numberToRender += -6;
      }

      paginationApi.isLast = false;
      paginationApi._currentPage = paginationApi.numberToRender;

      console.log(event);

      paginationApi.deleteMarkup();

      galleryRenderApi.deleteMarkup();

      const data = await filmsApiService.fetchImages(
        paginationApi.numberToRender
      );
      const dataGenres = await filmsApiService.getGenres();
      galleryRenderApi.append(data, dataGenres);

      paginationApi.append(
        filmsApiService.totalPages,
        paginationApi.placeToApp
      );
      paginationApi.getRefs();
      if (
        Number(paginationApi.refs.currentBtn.textContent) <
        filmsApiService.totalPages - 6
      ) {
        paginationApi.isLastForDisabled = false;
      }

      // console.log(filmsApiService.totalPages - 6);
    }
    // paginationApi.isFirstRender = true;
  }
}
