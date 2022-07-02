import axios from 'axios';
import { ImagesApiService } from './fetch-images';
import { append } from '../index';
const imagesApiService = new ImagesApiService();

export class PaginationService {
  constructor() {
    this.refs = {};
    this.chosenPage = 1;
  }

  getRefs(container, chosenPage) {
    this.refs = {
      galleryItem: document.querySelector('.gallery'),
      paginationContainer: document.querySelector(`${container}`),
      listEl: document.querySelector('.pagination-btns'),
      listItemEl: document.querySelector('.pagination-btns__item'),
      btnElNext: document.querySelector('.btn-pag-next'),
      btnElNumbers: document.querySelector(`.btn-pag-adap${chosenPage}`),
      btnElNumbersAll: document.querySelectorAll('.btn-pag-adap'),
      btnElPrevi: document.querySelector('.btn-pag-previ'),
      firstBtn: document.querySelector('.btn-pag-adap'),
      firstBtnStatic: document.querySelector('.first-btn'),
    };
  }

  renderMarkupPagination(numberOfPages) {
    const array = [];
    for (let index = 0; index < numberOfPages; index += 1) {
      let currentP = this.chosenPage;
      array.push(`<li class="pagination-btns__item">
          <button class="pagination-btns__btn btn-pag-adap btn-pag-adap${
            currentP + index
          }">${currentP + index}</button>
        </li>`);
    }

    return array.join('');
  }

  renderMarkupPaginationNext(numberOfPages) {
    const array = [];
    for (let index = 1; index < numberOfPages + 1; index += 1) {
      let currentP = this.chosenPage;
      array.push(`<li class="pagination-btns__item">
          <button class="pagination-btns__btn btn-pag-adap btn-pag-adap${
            currentP + index
          }">${currentP + index}</button>
        </li>`);
    }
    // this.getRefs('.gallery__pagination', this.chosenPage);
    return array.join('');
  }

  renderMarkupPaginationDec(numberOfPages) {
    const array = [];
    for (let index = numberOfPages; index > 0; index -= 1) {
      let currentP = this.chosenPage;
      console.log(index);
      array.push(`<li class="pagination-btns__item">
          <button class="pagination-btns__btn btn-pag-adap btn-pag-adap${
            currentP + 1 - index
          }">${currentP + 1 - index}</button>
        </li>`);
    }

    return array.join('');
  }

  renderMarkupPaginationDecPrev(numberOfPages) {
    const array = [];
    for (let index = numberOfPages + 1; index > 1; index -= 1) {
      let currentP = this.chosenPage;
      console.log(index);
      array.push(`<li class="pagination-btns__item">
          <button class="pagination-btns__btn btn-pag-adap btn-pag-adap${
            currentP + 1 - index
          }">${currentP + 1 - index}</button>
        </li>`);
    }

    return array.join('');
  }

  // renderMarkupPaginationBig(numberOfPages) {
  //   const array = [];
  //   for (let index = 0; index < numberOfPages; index += 1) {
  //     let currentP = this.chosenPage;
  //     array.push(`<li class="pagination-btns__item">
  //         <button class="pagination-btns__btn btn-pag-adap btn-pag-adap${
  //           currentP + index
  //         }">${currentP + index}</button>
  //       </li>`);
  //   }

  //   return array.join('');
  // }

  append(number) {
    this.getRefs('.gallery__pagination');

    this.refs.listEl.insertAdjacentHTML(
      'afterbegin',
      this.renderMarkupPagination(number)
    );

    if (this.chosenPage === 1) {
      this.refs.btnElPrevi.disabled = true;
    } else {
      this.refs.btnElPrevi.disabled = false;
    }

    this.getRefs('.gallery__pagination', this.chosenPage);

    this.refs.btnElNumbers.classList.add('btn-pag--current');

    this.refs.listEl.addEventListener('click', async event => {
      if (event.target.nodeName !== 'BUTTON') {
        return;
      }

      this.refs.btnElNumbers.classList.remove('btn-pag--current');
      // this.refs.btnElNumbers.classList.add('btn-pag--current');
      this.chosenPage = Number(event.target.textContent);
      console.log(this.chosenPage);
      if (this.chosenPage === 1) {
        this.refs.btnElPrevi.disabled = true;
      } else {
        this.refs.btnElPrevi.disabled = false;
      }

      this.getRefs('.gallery__pagination', this.chosenPage);
      this.refs.btnElNumbers.classList.add('btn-pag--current');

      this.refs.galleryItem.innerHTML = '';
      //   this.refs.paginationContainer.innerHTML = '';

      const data = await imagesApiService.fetchImages(this.chosenPage);
      const dataGenres = await imagesApiService.getGenres();
      append(data, dataGenres);

      this.getRefs('.gallery__pagination', this.chosenPage);
    });
    this.refs.btnElNext.addEventListener('click', async event => {
      this.refs.btnElPrevi.disabled = false;

      this.getRefs('.gallery__pagination', this.chosenPage);

      if (this.refs.btnElNumbersAll[4].classList[3]) {
        this.refs.listEl.innerHTML = '';
        this.refs.listEl.insertAdjacentHTML(
          'afterbegin',
          this.renderMarkupPaginationNext(5)
        );
        this.refs.btnElNumbers.classList.remove('btn-pag--current');
        this.chosenPage += 1;
        this.getRefs('.gallery__pagination', this.chosenPage);

        this.refs.btnElNumbers.classList.add('btn-pag--current');

        // this.refs.btnElNumbers.classList.add('btn-pag--current');
        this.refs.galleryItem.innerHTML = '';
        const data = await imagesApiService.fetchImages(this.chosenPage);
        const dataGenres = await imagesApiService.getGenres();
        append(data, dataGenres);

        return;
      }
      this.chosenPage += 1;

      this.refs.btnElNumbers.classList.remove('btn-pag--current');

      this.getRefs('.gallery__pagination', this.chosenPage);
      this.refs.btnElNumbers.classList.add('btn-pag--current');

      this.refs.galleryItem.innerHTML = '';

      const data = await imagesApiService.fetchImages(this.chosenPage);
      const dataGenres = await imagesApiService.getGenres();
      append(data, dataGenres);
      this.getRefs('.gallery__pagination', this.chosenPage);
    });

    this.refs.btnElPrevi.addEventListener('click', async () => {
      this.getRefs('.gallery__pagination', this.chosenPage);

      if (
        this.refs.firstBtn.classList.contains('btn-pag--current') &&
        this.refs.btnElNumbersAll[0].classList.value.includes('btn-pag-adap1')
      ) {
        this.refs.btnElPrevi.disabled = true;
      } else {
        this.refs.btnElPrevi.disabled = false;
      }

      // console.log(this.refs.btnElNumbersAll[0].classList);
      // console.log(this.refs.btnElNumbers);
      this.getRefs('.gallery__pagination', this.chosenPage);
      // console.log(this.refs.btnElNumbersAll[2].classList[3]);
      console.log(this.refs.firstBtn);
      if (
        this.refs.firstBtn.classList.contains('btn-pag--current') &&
        !this.refs.btnElNumbersAll[2].classList.value.includes('btn-pag-adap1 ')
      ) {
        this.refs.listEl.innerHTML = '';
        this.refs.listEl.insertAdjacentHTML(
          'afterbegin',
          this.renderMarkupPaginationDecPrev(5)
        );

        this.chosenPage -= 1;
        this.getRefs('.gallery__pagination', this.chosenPage);

        this.refs.btnElNumbers.classList.add('btn-pag--current');

        this.refs.galleryItem.innerHTML = '';
        const data = await imagesApiService.fetchImages(this.chosenPage);
        const dataGenres = await imagesApiService.getGenres();
        append(data, dataGenres);

        return;
      }
      this.refs.btnElNumbers.classList.remove('btn-pag--current');
      this.chosenPage -= 1;

      this.getRefs('.gallery__pagination', this.chosenPage);
      this.refs.btnElNumbers.classList.add('btn-pag--current');
      this.refs.galleryItem.innerHTML = '';

      const data = await imagesApiService.fetchImages(this.chosenPage);
      const dataGenres = await imagesApiService.getGenres();
      append(data, dataGenres);
      this.getRefs('.gallery__pagination', this.chosenPage);
    });
  }
}
