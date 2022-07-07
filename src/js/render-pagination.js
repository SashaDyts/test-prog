import { PaginApi } from './pagi';
import { refs } from './refs';
import { pagiListeners } from './pagi-listeners';

const paginationApi = new PaginApi();

export function renderPagination(total, placeToAppend) {
  paginationApi.append(total, placeToAppend);
  pagiListeners();

  //   console.log(paginationApi.refs);
}
