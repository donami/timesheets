import { call, put, all, takeLatest, select } from 'redux-saga/effects';
import { push, goBack } from 'connected-react-router';

import types from './types';
import * as Api from '../api';
import { getCategoriesLoaded, getCategoriesLoading } from './selectors';
import { getCurrentLocation } from '../../common/store/selectors';

function* fetchCategoriesIfNeeded() {
  const loaded = yield select(getCategoriesLoaded);
  const loading = yield select(getCategoriesLoading);

  if (loaded || loading) {
    return;
  }

  yield put({ type: types.FETCH_QUESTION_CATEGORIES.REQUEST });
}

function* fetchCategories() {
  try {
    const response = yield call(Api.fetchCategories);
    yield put({
      payload: { ...response },
      type: types.FETCH_QUESTION_CATEGORIES.SUCCESS,
    });
  } catch (e) {
    yield put({
      type: types.FETCH_QUESTION_CATEGORIES.FAILURE,
      message: e.message,
    });
  }
}

function* selectCategory(action: any) {
  yield call(fetchCategoryById, action);

  yield put({
    type: types.SELECT_QUESTION_CATEGORY.SUCCESS,
    payload: {
      categoryId: action.payload.categoryId,
    },
  });
}

function* selectArticle(action: any) {
  yield call(fetchArticleById, action);

  yield put({
    type: types.SELECT_QUESTION_ARTICLE.SUCCESS,
    payload: {
      articleId: action.payload.articleId,
    },
  });
}

function* fetchCategoryById(action: any) {
  try {
    const response = yield call(
      Api.fetchCategoryById,
      action.payload.categoryId
    );
    yield put({
      payload: { ...response },
      type: types.FETCH_QUESTION_CATEGORY_BY_ID.SUCCESS,
    });
  } catch (e) {
    yield put({
      type: types.FETCH_QUESTION_CATEGORY_BY_ID.FAILURE,
      message: e.message,
    });
  }
}

function* fetchArticleById(action: any) {
  try {
    const response = yield call(Api.fetchArticleById, action.payload.articleId);
    yield put({
      payload: { ...response },
      type: types.FETCH_QUESTION_ARTICLE_BY_ID.SUCCESS,
    });
  } catch (e) {
    yield put({
      type: types.FETCH_QUESTION_ARTICLE_BY_ID.FAILURE,
      message: e.message,
    });
  }
}

function* searchArticles(action: any) {
  try {
    const currentLocation = yield select(getCurrentLocation);

    const response = yield call(Api.searchArticles, action.payload.query);
    yield put({
      payload: { ...response, query: action.payload.query },
      type: types.SEARCH_QUESTION_ARTICLES.SUCCESS,
    });

    if (currentLocation.pathname !== '/help/search') {
      yield put(push('/help/search'));
    }
  } catch (e) {
    yield put({
      type: types.SEARCH_QUESTION_ARTICLES.FAILURE,
      message: e.message,
    });
  }
}

function* searchArticlesClear(action: any) {
  yield put(goBack());
}

export default all([
  takeLatest(types.FETCH_QUESTION_CATEGORIES.REQUEST, fetchCategories),
  takeLatest(
    types.FETCH_QUESTION_CATEGORIES_IF_NEEDED,
    fetchCategoriesIfNeeded
  ),
  takeLatest(types.SELECT_QUESTION_CATEGORY.REQUEST, selectCategory),
  takeLatest(types.SELECT_QUESTION_ARTICLE.REQUEST, selectArticle),
  takeLatest(types.FETCH_QUESTION_CATEGORY_BY_ID.REQUEST, fetchCategoryById),
  takeLatest(types.SEARCH_QUESTION_ARTICLES.REQUEST, searchArticles),
  takeLatest(types.SEARCH_QUESTION_ARTICLES_CLEAR, searchArticlesClear),
]);
