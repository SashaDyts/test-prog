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
  }

  deleteMarkup() {
    refs.paginationButtonsEl.innerHTML = '';
  }

  setCurrPage(newPage) {
    this.currPage = newPage;
  }

  createPaginationMarkup() {
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
    for (let index = 1; index < 6; index += 1) {
      let currentP = filmsApiService.currentPage;
      array.push(`<li class="pagination-btns__item">
          <button class="pagination-btns__btn btn__static btn-pag-adap${
            currentP + index
          }">${currentP + index}</button>
        </li>`);
    }
    array.push(`<li class="pagination-btns__item">
          <button class="pagination-btns__btn dots__btn" disabled="true">...</button>
        </li>
        <li class="pagination-btns__item">
          <button class="pagination-btns__btn last__btn">20</button>
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

  append() {
    refs.paginationButtonsEl.insertAdjacentHTML(
      'afterbegin',
      this.createPaginationMarkup()
    );
    this.addEventListeners();
  }

  addEventListeners() {
    this.getRefs();

    this.refs.firstBtn.addEventListener('click', event => {
      this.currentPage = Number(event.target.textContent);
      this.deleteMarkup();
      galleryRenderApi.deleteMarkup();
      galleryRenderApi.renderStartPage(this.currentPage);
      this.append();
      console.log(this.currentPage);
    });

    this.refs.lastBtn.addEventListener('click', event => {
      this.currentPage = Number(event.target.textContent);
      this.deleteMarkup();
      galleryRenderApi.deleteMarkup();
      galleryRenderApi.renderStartPage(this.currentPage);
      this.append();
      console.log(this.currentPage);
    });

    this.refs.paginationBtns.addEventListener('click', event => {
      if (!event.target.classList.value.includes('btn__static')) {
        return;
      }

      this.currentPage = Number(event.target.textContent);
      this.deleteMarkup();

      galleryRenderApi.deleteMarkup();
      galleryRenderApi.renderStartPage(this.currentPage);
      this.append();
      console.log(this.currentPage);

      // event.target.classList.add('btn-pag--current');
      console.log(event.target);
    });
  }

  getScreenWidth() {
    const screen = window.innerWidth;
    console.log(screen);

    if (screen < 768) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
    console.log(this.isMobile);
  }

  getRefs() {
    this.refs = {
      paginationBtns: document.querySelector('.gallery__pagination'),
      btnPrev: document.querySelector('.btn-pag-previ'),
      firstBtn: document.querySelector('.first__btn'),
      staticBtns: document.querySelectorAll('.btn__static'),
      lastBtn: document.querySelector('.last__btn'),
      btnNext: document.querySelector('.btn-pag-next'),
    };
  }
}
