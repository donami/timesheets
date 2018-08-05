import types from './types';
import { QuestionArticle, QuestionCategory } from './models';

export const fetchArticles = () => ({
  type: types.FETCH_QUESTION_ARTICLES.REQUEST,
});

export const updateArticle = (
  articleId: number,
  article: QuestionArticle,
  categoryId: number
) => ({
  type: types.UPDATE_QUESTION_ARTICLE.REQUEST,
  payload: {
    articleId,
    article,
    categoryId,
  },
});

export const createArticle = (
  data: Partial<QuestionArticle>,
  userId: number,
  categoryId: number
) => ({
  type: types.CREATE_QUESTION_ARTICLE.REQUEST,
  payload: {
    data,
    userId,
    categoryId,
  },
});

export const removeArticle = (articleId: number) => ({
  type: types.REMOVE_QUESTION_ARTICLE.REQUEST,
  payload: {
    articleId,
  },
});

export const selectArticle = (articleId: number) => ({
  type: types.SELECT_QUESTION_ARTICLE.REQUEST,
  payload: {
    articleId,
  },
});

export const searchArticles = (query: string) => ({
  type: types.SEARCH_QUESTION_ARTICLES.REQUEST,
  payload: {
    query,
  },
});

export const searchArticlesClear = (query: string) => ({
  type: types.SEARCH_QUESTION_ARTICLES_CLEAR,
});

export const fetchCategories = () => ({
  type: types.FETCH_QUESTION_CATEGORIES.REQUEST,
});

export const fetchCategoriesIfNeeded = () => ({
  type: types.FETCH_QUESTION_CATEGORIES_IF_NEEDED,
});

export const updateCategory = (
  categoryId: number,
  category: QuestionCategory
) => ({
  type: types.UPDATE_QUESTION_CATEGORY.REQUEST,
  payload: {
    categoryId,
    category,
  },
});

export const createCategory = (data: QuestionCategory) => ({
  type: types.CREATE_QUESTION_CATEGORY.REQUEST,
  payload: {
    data,
  },
});

export const removeCategory = (categoryId: number) => ({
  type: types.REMOVE_QUESTION_CATEGORY.REQUEST,
  payload: {
    categoryId,
  },
});

export const selectCategory = (categoryId: number) => ({
  type: types.SELECT_QUESTION_CATEGORY.REQUEST,
  payload: {
    categoryId,
  },
});
