import { ImagesApiService } from './fetch-images';
import { GalleryRenderApi } from './gallery-render';
import { refs } from './refs';

const filmsApiService = new ImagesApiService();
const galleryRenderApi = new GalleryRenderApi();

export class PaginApi {
  constructor() {
    this.jus = true;
    this.jus2 = false;
    this.isLastPage = false;
    this.isLast = false;
    this.isLastForDisabled = false;
    this.numberToRender = 1;
    this.screenWidth = '';
    this.isMobile = '';
    this.refs = {};
    this._currentPage = 1;
    this.isFirstRender = true;
    this.totalPages = '';
  }

  deleteMarkup() {
    refs.paginationButtonsEl.innerHTML = '';
  }

  setCurrPage(newPage) {
    this._currentPage = Number(newPage);
  }

  createSecondPagi(totalPage) {
    const array = [];
    array.push(`
        <li class="pagination-btns__item">
        <button class="pagination-btns__btn btn-pag-previ" data-action="previ">
        <svg
          class="svg svg-prev"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            class="path-prev"
            d="M12.6666 8H3.33325"
            stroke="black"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            class="path-prev"
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
          <button class="pagination-btns__btn first__btn btn-page1">1</button>
        </li>
        <li class="pagination-btns__item">
          <button class="pagination-btns__btn dots__btn" disabled="true">...</button>
        </li>
        `);
    if (this.isLastPage) {
      for (let index = 0; index < 6; index += 1) {
        let currentP = this.numberToRender;
        array.push(`<li class="pagination-btns__item">
          <button class="pagination-btns__btn btn__static btn-page${
            currentP + index
          } btn-page-number${currentP + index}">${currentP + index}</button>
        </li>`);
      }
    }

    // this.firstAndNearFirsGroup(array);

    // for (let index = 0; index < 6; index += 1) {
    //   let currentP = this.numberToRender;
    //   array.push(`<li class="pagination-btns__item">
    //       <button class="pagination-btns__btn btn__static btn-page${
    //         currentP + index
    //       } btn-page-number${currentP + index}">${currentP + index}</button>
    //     </li>`);
    // }

    array.push(`<li class="pagination-btns__item">
          <button class="pagination-btns__btn dots__btn" disabled="true">...</button>
        </li>
        <li class="pagination-btns__item">
          <button class="pagination-btns__btn last__btn btn-page${totalPage}">${totalPage}</button>
        </li>
        <li class="pagination-btns__item">
        <button class="pagination-btns__btn btn-pag-next" data-action="next">
        <svg
          class="svg svg-next"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            class="path-next"
            d="M12.6666 8H3.33325"
            stroke="black"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            class="path-next"
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

  createFirstPaginationMarkup(totalPage) {
    const array = [];
    array.push(`
        <li class="pagination-btns__item">
        <button class="pagination-btns__btn btn-pag-previ" data-action="previ">
        <svg
          class="svg svg-prev"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            class="path-prev"
            d="M12.6666 8H3.33325"
            stroke="black"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            class="path-prev"
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
          <button class="pagination-btns__btn first__btn btn-page">1</button>
        </li>
        <li class="pagination-btns__item">
          <button class="pagination-btns__btn dots__btn" disabled="true">...</button>
        </li>
        `);
    if (!this.isLastPage) {
      for (let index = 0; index < 6; index += 1) {
        let currentP = this.numberToRender;
        array.push(`<li class="pagination-btns__item">
          <button class="pagination-btns__btn btn__static btn-page${
            currentP + index
          } btn-page-number${currentP + index}">${currentP + index}</button>
        </li>`);
      }
    } else {
      for (let index = 6; index > 0; index -= 1) {
        let currentP = this.numberToRender;
        array.push(`<li class="pagination-btns__item">
          <button class="pagination-btns__btn btn__static btn-page${
            currentP - index + 1
          } btn-page-number${currentP - index + 1}">${
          currentP - index + 1
        }</button>
        </li>`);
      }
    }
    // this.firstAndNearFirsGroup(array);

    // for (let index = 0; index < 6; index += 1) {
    //   let currentP = this.numberToRender;
    //   array.push(`<li class="pagination-btns__item">
    //       <button class="pagination-btns__btn btn__static btn-page${
    //         currentP + index
    //       } btn-page-number${currentP + index}">${currentP + index}</button>
    //     </li>`);
    // }

    array.push(`<li class="pagination-btns__item">
          <button class="pagination-btns__btn dots__btn" disabled="true">...</button>
        </li>
        <li class="pagination-btns__item">
          <button class="pagination-btns__btn last__btn btn-page${totalPage}">${totalPage}</button>
        </li>
        <li class="pagination-btns__item">
        <button class="pagination-btns__btn btn-pag-next" data-action="next">
        <svg
          class="svg svg-next"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            class="path-next"
            d="M12.6666 8H3.33325"
            stroke="black"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            class="path-next"
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

  append(totalPage) {
    refs.paginationButtonsEl.insertAdjacentHTML(
      'afterbegin',
      this.createFirstPaginationMarkup(totalPage)
    );

    this.getRefs();
    this.refs.currentBtn.classList.add('btn-pag--current');
  }

  getRefs() {
    this.refs = {
      paginationBtns: document.querySelector('.gallery__pagination'),
      btnPrev: document.querySelector('.btn-pag-previ'),
      firstBtn: document.querySelector('.first__btn'),
      changingBtns: document.querySelectorAll('.btn__static'),
      lastBtn: document.querySelector('.last__btn'),
      btnNext: document.querySelector('.btn-pag-next'),
      currentBtn: document.querySelector(`.btn-page${this._currentPage}`),
    };
  }
}
