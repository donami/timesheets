import { combineReducers } from 'redux';

import types from './types';

interface ArticleReducer {
  ids: number[];
  byId: any;
  loaded: boolean;
  loading: boolean;
  selected: number | null;
  searchResults: number[];
  query: string;
}

interface CategoryReducer {
  ids: number[];
  byId: any;
  loaded: boolean;
  loading: boolean;
  selected: number | null;
}

const categoryInitialState: CategoryReducer = {
  ids: [],
  byId: {},
  loaded: false,
  loading: false,
  selected: null,
};

const articleInitialState: ArticleReducer = {
  ids: [],
  byId: {},
  loaded: false,
  loading: false,
  selected: null,
  searchResults: [],
  query: '',
};

const articleReducer = (state = articleInitialState, action: any) => {
  let newState = state;

  if (
    action.payload &&
    action.payload.result &&
    action.payload.entities &&
    action.payload.entities.questionArticles
  ) {
    const ids = Object.keys(action.payload.entities.questionArticles).map(
      id => +id
    );
    newState = {
      ...state,
      ids: [...new Set([...state.ids].concat(ids))],
      byId: {
        ...state.byId,
        ...action.payload.entities.questionArticles,
      },
    };
  }

  switch (action.type) {
    case types.FETCH_QUESTION_ARTICLES.REQUEST:
      return {
        ...newState,
        loading: true,
        loaded: false,
      };

    case types.FETCH_QUESTION_ARTICLES.SUCCESS:
      return {
        ...newState,
        loading: false,
        loaded: true,
      };

    case types.FETCH_QUESTION_ARTICLES.FAILURE:
      return {
        ...newState,
        loading: false,
        loaded: false,
      };

    case types.SELECT_QUESTION_ARTICLE.SUCCESS:
      return {
        ...newState,
        selected: action.payload.articleId,
      };

    case types.REMOVE_QUESTION_ARTICLE.SUCCESS:
      const index = newState.ids.indexOf(action.payload.result);

      return {
        ...newState,
        ids: [
          ...newState.ids.slice(0, index),
          ...newState.ids.slice(index + 1),
        ],
      };

    case types.SEARCH_QUESTION_ARTICLES.SUCCESS:
      return {
        ...newState,
        searchResults: action.payload.result,
        query: action.payload.query,
      };

    case types.SEARCH_QUESTION_ARTICLES_CLEAR:
      return {
        ...newState,
        searchResults: [],
        query: '',
      };

    default:
      return newState;
  }
};

const categoryReducer = (state = categoryInitialState, action: any) => {
  let newState = state;

  if (
    action.payload &&
    action.payload.result &&
    action.payload.entities &&
    action.payload.entities.questionCategories
  ) {
    const ids = Object.keys(action.payload.entities.questionCategories).map(
      id => +id
    );
    newState = {
      ...state,
      ids: [...new Set([...state.ids].concat(ids))],
      byId: {
        ...state.byId,
        ...action.payload.entities.questionCategories,
      },
    };
  }

  switch (action.type) {
    case types.FETCH_QUESTION_CATEGORIES.REQUEST:
      return {
        ...newState,
        loading: true,
        loaded: false,
      };

    case types.FETCH_QUESTION_CATEGORIES.SUCCESS:
      return {
        ...newState,
        loading: false,
        loaded: true,
      };

    case types.FETCH_QUESTION_CATEGORIES.FAILURE:
      return {
        ...newState,
        loading: false,
        loaded: false,
      };

    case types.SELECT_QUESTION_CATEGORY.SUCCESS:
      return {
        ...newState,
        selected: action.payload.categoryId,
      };

    case types.REMOVE_QUESTION_CATEGORY.SUCCESS:
      const index = newState.ids.indexOf(action.payload.result);

      return {
        ...newState,
        ids: [
          ...newState.ids.slice(0, index),
          ...newState.ids.slice(index + 1),
        ],
      };

    default:
      return newState;
  }
};

export default combineReducers({
  articles: articleReducer,
  categories: categoryReducer,
});
