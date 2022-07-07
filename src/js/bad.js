import { ImagesApiService } from './fetch-images';
import { GalleryRenderApi } from './gallery-render';
import { refs } from './refs';

const filmsApiService = new ImagesApiService();
const galleryRenderApi = new GalleryRenderApi();

export class PaginApi {
  constructor() {
    this.screenWidth = '';
    this.isMobile = '';
    this.refs = {};
    this.currentPage = 1;
    this.isFullRender = true;
    this.totalPages = '';
  }

  deleteMarkup() {
    refs.paginationButtonsEl.innerHTML = '';
  }

  setCurrPage(newPage) {
    this.currPage = newPage;
  }

  createPaginationMarkup(totalPage) {
    const array = [];
    array.push(`
        <li class="pagination-btns__item">
        <button class="pagination-btns__btn btn-pag-previ">
        <svg
          class="svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.6666 8H3.33325"
            stroke="black"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7.99992 12.6667L3.33325 8.00004L7.99992 3.33337"
            stroke="black"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      </li>
        <li class="pagination-btns__item">
          <button class="pagination-btns__btn first__btn ">1</button>
        </li>
        <li class="pagination-btns__item">
          <button class="pagination-btns__btn dots__btn" disabled="true">...</button>
        </li>
        `);
    if (this.isFullRender) {
      for (let index = 1; index < 6; index += 1) {
        let currentP = filmsApiService.currentPage;
        let currentBtn = this.currentPage;
        array.push(`<li class="pagination-btns__item">
          <button class="pagination-btns__btn btn__static btn-page-number${
            currentP + index
          }">${currentP + index}</button>
        </li>`);
      }
    } else {
      for (let index = 1; index < 6; index += 1) {
        let currentP = filmsApiService.currentPage;
        let currentBtn = this.currentPage;
        array.push(`<li class="pagination-btns__item">
          <button class="pagination-btns__btn btn__static btn-page-number${
            currentP + index - 1
          }">${currentP + index - 1}</button>
        </li>`);
      }
    }

    array.push(`<li class="pagination-btns__item">
          <button class="pagination-btns__btn dots__btn" disabled="true">...</button>
        </li>
        <li class="pagination-btns__item">
          <button class="pagination-btns__btn last__btn">${totalPage}</button>
        </li>
        <li class="pagination-btns__item">
        <button class="pagination-btns__btn btn-pag-next">
        <svg
          class="svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.6666 8H3.33325"
            stroke="black"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7.99992 12.6667L3.33325 8.00004L7.99992 3.33337"
            stroke="black"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button></li>`);

    return array.join('');
  }

  async render(placeToRender) {}

  append(totalPage) {
    this.totalPages = totalPage;

    refs.paginationButtonsEl.insertAdjacentHTML(
      'afterbegin',
      this.createPaginationMarkup(totalPage)
    );
    this.getRefs();
    this.addEventListeners();
    if (Number(this.refs.firstBtn.textContent) === this.currentPage) {
      this.refs.firstBtn.classList.add('btn-pag--current');
    }
    if (Number(this.refs.lastBtn.textContent) === this.currentPage) {
      this.refs.lastBtn.classList.add('btn-pag--current');
    }

    if (this.currentPage <= 6) {
      this.refs.btnPrev.setAttribute('disabled', 'true');
    }
    // this.totalPages = galleryRenderApi.totalPages;
  }

  renderPagi(totalPage) {
    this.append(totalPage);
    this.getRefs();
    // this.addEventListeners(totalPage);
    // this.addEventListenersOnStaticBtns();

    this.totalPages = filmsApiService.totalPages;
  }

  addEventListeners(totalPage) {
    this.getRefs();

    this.refs.firstBtn.addEventListener('click', async event => {
      this.currentPage = Number(event.target.textContent);
      this.deleteMarkup();
      galleryRenderApi.deleteMarkup();
      await galleryRenderApi.renderStartPage(this.currentPage);
      this.append(totalPage);
      this.getRefs();
    });

    this.refs.lastBtn.addEventListener('click', async event => {
      this.currentPage = Number(event.target.textContent);
      filmsApiService.currentPage = this.currentPage;
      this.deleteMarkup();
      galleryRenderApi.deleteMarkup();
      await galleryRenderApi.renderStartPage(this.currentPage);
      this.append(totalPage);
    });

    this.refs.btnNext.addEventListener('click', async event => {
      filmsApiService.currentPage =
        Number(this.refs.staticBtns[4].textContent) + 1;
      this.isFullRender = false;
      this.currentPage = filmsApiService.currentPage;

      this.deleteMarkup();

      galleryRenderApi.deleteMarkup();
      await galleryRenderApi.renderStartPage(this.currentPage);
      this.append(totalPage);
      this.refs.currentBtn.classList.add('btn-pag--current');
    });

    this.refs.btnPrev.addEventListener('click', async event => {
      if (Number(this.refs.staticBtns[0].textContent) === 7) {
        filmsApiService.currentPage = 1;
        this.currentPage = filmsApiService.currentPage;
        this.isFullRender = true;
        // this.currentPage = filmsApiService.currentPage;
      } else {
        filmsApiService.currentPage =
          Number(this.refs.staticBtns[0].textContent) - 5;
        this.currentPage = filmsApiService.currentPage;
      }

      this.deleteMarkup();

      galleryRenderApi.deleteMarkup();
      await galleryRenderApi.renderStartPage(filmsApiService.currentPage);
      this.append(totalPage);

      if (Number(this.refs.staticBtns[0].textContent !== '2')) {
        this.refs.staticBtns[0].classList.add('btn-pag--current');
      }

      this.getRefs();
    });
  }

  addEventListenersOnStaticBtns() {
    this.refs.paginationBtns.addEventListener('click', async event => {
      if (!event.target.classList.value.includes('btn__static')) {
        return;
      }

      this.currentPage = Number(event.target.textContent);
      this.deleteMarkup();

      galleryRenderApi.deleteMarkup();
      await galleryRenderApi.renderStartPage(this.currentPage);
      this.append();
      this.getRefs();
      this.refs.currentBtn.classList.add('btn-pag--current');
    });
  }

  getScreenWidth() {
    const screen = window.innerWidth;

    if (screen < 768) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  getRefs() {
    this.refs = {
      paginationBtns: document.querySelector('.gallery__pagination'),
      btnPrev: document.querySelector('.btn-pag-previ'),
      firstBtn: document.querySelector('.first__btn'),
      staticBtns: document.querySelectorAll('.btn__static'),
      lastBtn: document.querySelector('.last__btn'),
      btnNext: document.querySelector('.btn-pag-next'),
      currentBtn: document.querySelector(`.btn-page-number${this.currentPage}`),
    };
  }
}

// ---------------------------------------------------------------------------------

if (
  event.target.classList.value.includes('btn-pag-next') ||
  event.target.classList.value.includes('svg-next') ||
  event.target.classList.value.includes('path-next')
) {
  paginationApi.isFullRender = false;
  paginationApi.numberToRender += 6;
  paginationApi._currentPage = paginationApi.numberToRender;

  paginationApi.deleteMarkup();

  galleryRenderApi.deleteMarkup();

  const data = await filmsApiService.fetchImages(paginationApi.numberToRender);
  const dataGenres = await filmsApiService.getGenres();
  galleryRenderApi.append(data, dataGenres);

  paginationApi.append(filmsApiService.totalPages, paginationApi.placeToApp);
  paginationApi.getRefs();
  // if (paginationApi.refs.) {}
  //   console.log('next');

  return;
}
if (
  event.target.classList.value.includes('btn-pag-prev') ||
  event.target.classList.value.includes('svg-prev') ||
  event.target.classList.value.includes('path-prev')
) {
  if (paginationApi.refs.changingBtns[0].textContent === '2') {
    return;
  }

  if (paginationApi.refs.changingBtns[0].textContent === '7') {
    paginationApi.isFullRender = true;
  }

  // if (paginationApi.refs.lastBtn.classList.contains('btn-pag--current')) {
  //   paginationApi.numberToRender += -6;
  //   console.log(paginationApi.numberToRender);

  //   return;
  // }

  paginationApi.numberToRender += -6;
  paginationApi._currentPage = paginationApi.numberToRender;
  //   console.log(paginationApi.numberToRender);
  //   console.log(paginationApi.isFullRender);

  paginationApi.deleteMarkup();

  galleryRenderApi.deleteMarkup();

  const data = await filmsApiService.fetchImages(paginationApi.numberToRender);
  const dataGenres = await filmsApiService.getGenres();
  galleryRenderApi.append(data, dataGenres);

  paginationApi.append(filmsApiService.totalPages, paginationApi.placeToApp);
  paginationApi.getRefs();

  return;
}
if (!event.target.classList.value.includes('btn-page')) {
  return;
}

if (event.target.classList.value.includes('last__btn')) {
  //   paginationApi.numberToRender = Number(
  //     paginationApi.refs.lastBtn.textContent
  //   );
  //   console.log(paginationApi.numberToRender);
  paginationApi.isLastPage = true;
  paginationApi.isFullRender = true;

  //   console.log(paginationApi.isLastPage);
}

// if (event.target.textContent === '1') {
//   //   console.log(paginationApi.numberToRender);
//   paginationApi.isLastPage = false;
//   paginationApi.numberToRender = 1;
// }
// paginationApi.isFullRender = true;
// console.log(paginationApi._currentPage);
paginationApi.setCurrPage(event.target.textContent);
paginationApi.deleteMarkup();

// console.log(paginationApi.numberToRender);

galleryRenderApi.deleteMarkup();
const data = await filmsApiService.fetchImages(paginationApi._currentPage);
const dataGenres = await filmsApiService.getGenres();
galleryRenderApi.append(data, dataGenres);
// console.log(paginationApi._currentPage);
paginationApi.append(filmsApiService.totalPages, paginationApi.placeToApp);
paginationApi.getRefs();
// paginationApi.refs.currentBtn.classList.add('btn-pag--current');

// if (Number(event.target.textContent) === paginationApi._currentPage) {

// Шаблони --------------

if (this.isFullRender) {
  for (let index = 1; index < 6; index += 1) {
    let currentP = this.numberToRender;
    let currentBtn = this.currentPage;
    array.push(`<li class="pagination-btns__item">
          <button class="pagination-btns__btn btn__static btn-page${
            currentP + index
          } btn-page-number${currentP + index}">${currentP + index}</button>
        </li>`);
  }
} else {
  for (let index = 1; index < 6; index += 1) {
    let currentP = this.numberToRender;
    let currentBtn = this.currentPage;
    array.push(`<li class="pagination-btns__item">
          <button class="pagination-btns__btn btn__static btn-page${
            index + currentP - 1
          } btn-page-number${index + currentP - 1}">${
      index + currentP - 1
    }</button>
        </li>`);
  }
}

// else if (this.isLastPage || paginationApi.refs.changingBtns[4].textContent ===
//   `${filmsApiService.totalPages} - 1`){}

// if (
//   paginationApi.refs.changingBtns[4].textContent ===
//   `${filmsApiService.totalPages} - 1`
// ) {
//   return;
// }
if (!this.isLastPage && !this.jus && this.jus2) {
  let currentP = this.numberToRender;
  for (let index = 6; index > 1; index -= 1) {
    array.push(`<li class="pagination-btns__item">
          <button class="pagination-btns__btn btn__static btn-page${
            currentP - index + 2
          } btn-page-number${currentP - index + 2}">${
      currentP - index + 2
    }</button>
        </li>`);
  }
} else if (this.isLastPage) {
  console.log('las pa');
  let currentP = this.numberToRender;
  for (let index = 6; index > 1; index -= 1) {
    array.push(`<li class="pagination-btns__item">
          <button class="pagination-btns__btn btn__static btn-page${
            currentP - index + 1
          } btn-page-number${currentP - index + 1}">${
      currentP - index + 1
    }</button>
        </li>`);
  }
} else {
  if (this.isFirstRender) {
    for (let index = 1; index < 6; index += 1) {
      let currentP = this.numberToRender;
      let currentBtn = this.currentPage;
      array.push(`<li class="pagination-btns__item">
          <button class="pagination-btns__btn btn__static btn-page${
            currentP + index
          } btn-page-number${currentP + index}">${currentP + index}</button>
        </li>`);
    }
  } else {
    for (let index = 1; index < 6; index += 1) {
      let currentP = this.numberToRender;
      let currentBtn = this.currentPage;
      array.push(`<li class="pagination-btns__item">
          <button class="pagination-btns__btn btn__static btn-page${
            index + currentP - 1
          } btn-page-number${index + currentP - 1}">${
        index + currentP - 1
      }</button>
        </li>`);
    }
  }
}

// ---------------------------------------

// import { PaginApi } from './pagi';
// import { ImagesApiService } from './fetch-images';
// import { GalleryRenderApi } from './gallery-render';

// const paginationApi = new PaginApi();
// const filmsApiService = new ImagesApiService();
// const galleryRenderApi = new GalleryRenderApi();

// export function pagiListeners() {
//   paginationApi.getRefs();
//   console.log(paginationApi.numberToRender);

//   const refs = {
//     ...paginationApi.refs,
//   };

//   paginationApi.refs.paginationBtns.addEventListener('click', onPaginationBtns);

//   function onPaginationBtns(event) {
//     onStaticBtns(event);
//     onFirstBtn(event);
//     onLastBtn(event);
//     onNextBtn(event);
//     onPrevBtn(event);
//   }

//   async function onStaticBtns(event) {
//     if (!event.target.classList.value.includes('btn__static')) {
//       return;
//     }
//     console.log(paginationApi.isFirstRender);
//     paginationApi.jus2 = false;
//     paginationApi.isLastPage = false;

//     if (paginationApi.refs.changingBtns[0].textContent === '2') {
//       paginationApi.isLastPage = false;
//       paginationApi.isFirstRender = true;

//       console.log(paginationApi.isFirstRender, 'static btn if 2 page on page');
//     }
//     if (paginationApi.refs.changingBtns[4].textContent === '999') {
//       paginationApi.isFirstRender = false;
//       console.log(paginationApi.isFirstRender, 'on static on last page');
//     }

//     paginationApi.setCurrPage(event.target.textContent);
//     // paginationApi.numberToRender = paginationApi._currentPage;

//     paginationApi.deleteMarkup();

//     galleryRenderApi.deleteMarkup();

//     const data = await filmsApiService.fetchImages(paginationApi._currentPage);
//     const dataGenres = await filmsApiService.getGenres();
//     galleryRenderApi.append(data, dataGenres);

//     paginationApi.append(filmsApiService.totalPages);
//     paginationApi.getRefs();
//     console.log(paginationApi.numberToRender);
//     // render(event, paginationApi._currentPage);
//   }

//   async function onFirstBtn(event) {
//     if (!event.target.classList.value.includes('first__btn')) {
//       return;
//     }
//     paginationApi.isFirstRender = true;

//     paginationApi.isLastPage = false;
//     paginationApi.jus2 = false;
//     paginationApi.numberToRender = 1;
//     paginationApi.setCurrPage(event.target.textContent);

//     paginationApi.deleteMarkup();

//     galleryRenderApi.deleteMarkup();

//     const data = await filmsApiService.fetchImages(paginationApi._currentPage);
//     const dataGenres = await filmsApiService.getGenres();
//     galleryRenderApi.append(data, dataGenres);

//     paginationApi.append(filmsApiService.totalPages);
//     paginationApi.getRefs();
//     console.log(paginationApi.numberToRender);
//   }

//   async function onLastBtn(event) {
//     if (!event.target.classList.value.includes('last__btn')) {
//       return;
//     }

//     paginationApi.isLastPage = true;
//     paginationApi.jus2 = true;
//     // paginationApi.isFirstRender = false;

//     paginationApi.setCurrPage(event.target.textContent);
//     paginationApi.numberToRender = paginationApi._currentPage;
//     paginationApi.deleteMarkup();

//     galleryRenderApi.deleteMarkup();

//     const data = await filmsApiService.fetchImages(paginationApi._currentPage);
//     const dataGenres = await filmsApiService.getGenres();
//     galleryRenderApi.append(data, dataGenres);

//     paginationApi.append(filmsApiService.totalPages);
//     paginationApi.getRefs();

//     console.log(paginationApi.isFirstRender);
//     console.log(paginationApi.numberToRender);
//     paginationApi.isLastPage = false;
//   }

//   async function onNextBtn(event) {
//     if (
//       event.target.classList.value.includes('btn-pag-next') ||
//       event.target.classList.value.includes('svg-next') ||
//       event.target.classList.value.includes('path-next')
//     ) {
//       paginationApi.jus2 = false;
//       if (paginationApi.refs.changingBtns[0].textContent === '2') {
//         paginationApi.numberToRender = 1;
//         paginationApi.isLastPage = false;
//       }
//       paginationApi.isFirstRender = false;
//       console.log(paginationApi.isFirstRender, 'next btn');
//       paginationApi.isLastPage = false;
//       paginationApi.numberToRender += 6;
//       paginationApi._currentPage = paginationApi.numberToRender;

//       paginationApi.deleteMarkup();

//       galleryRenderApi.deleteMarkup();

//       const data = await filmsApiService.fetchImages(
//         paginationApi.numberToRender
//       );
//       const dataGenres = await filmsApiService.getGenres();
//       galleryRenderApi.append(data, dataGenres);

//       paginationApi.append(filmsApiService.totalPages);
//       paginationApi.getRefs();
//     }
//     console.log(paginationApi.numberToRender);
//   }

//   async function onPrevBtn(event) {
//     if (
//       event.target.classList.value.includes('btn-pag-prev') ||
//       event.target.classList.value.includes('svg-prev') ||
//       event.target.classList.value.includes('path-prev')
//     ) {
//       console.log(paginationApi.isFirstRender);
//       if (paginationApi.refs.changingBtns[0].textContent === '2') {
//         return;
//         paginationApi.isLastPage = false;
//       }
//       paginationApi.isFirstRender = true;
//       console.log(paginationApi.isFirstRender, 'prev btn');
//       if (paginationApi.refs.changingBtns[0].textContent === '7') {
//         paginationApi.isLastPage = false;
//         paginationApi.isFirstRender = true;

//         console.log(paginationApi.isFirstRender, 'prev btn if 7 btn on page');
//       }

//       if (paginationApi.refs.changingBtns[0].textContent !== '7') {
//         paginationApi.isFirstRender = false;
//         console.log(
//           paginationApi.isFirstRender,
//           'on prev btn when there are no 7 btn on page'
//         );
//       }
//       paginationApi.isLastPage = false;
//       paginationApi.jus = false;

//       paginationApi.numberToRender += -6;
//       paginationApi._currentPage = paginationApi.numberToRender;

//       paginationApi.deleteMarkup();

//       galleryRenderApi.deleteMarkup();

//       const data = await filmsApiService.fetchImages(
//         paginationApi.numberToRender
//       );
//       const dataGenres = await filmsApiService.getGenres();
//       galleryRenderApi.append(data, dataGenres);

//       paginationApi.append(
//         filmsApiService.totalPages,
//         paginationApi.placeToApp
//       );
//       paginationApi.getRefs();
//       paginationApi.jus2 = false;

//       //   console.log(paginationApi.isFirstRender);
//     }
//     // paginationApi.isFirstRender = true;
//     console.log(paginationApi.numberToRender);
//   }
// }
