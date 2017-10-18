import { fetchCategories } from '../utils/api';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

export const getCategories = () => dispatch => (
  fetchCategories().then(res => dispatch(receiveCategories(res.categories)))
)

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories
})