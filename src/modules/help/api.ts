import { fetchApi, NormalizedResponse } from '../../services/api';
import { QuestionArticle, QuestionCategory } from './store/models';
import {
  questionArticleSchema,
  questionCategorySchema,
} from '../../utils/schemas';

export const removeArticle = (articleId: number): Promise<NormalizedResponse> =>
  fetchApi(`question-articles/${articleId}`, 'DELETE', questionArticleSchema);

export const fetchArticleById = (
  articleId: number
): Promise<NormalizedResponse> =>
  fetchApi(`question-articles/${articleId}`, 'GET', questionArticleSchema);

export const fetchArticles = (): Promise<NormalizedResponse> => {
  return fetchApi('question-articles', 'GET', [questionArticleSchema]);
};

export const createArticle = (
  data: QuestionArticle,
  userId: number,
  categoryId: number
): Promise<NormalizedResponse> =>
  fetchApi(`question-articles`, 'POST', questionCategorySchema, {
    ...data,
    userId,
    categoryId,
  });

export const updateArticle = (
  articleId: number,
  article: QuestionArticle,
  categoryId: number
): Promise<NormalizedResponse> =>
  fetchApi(`question-articles/${articleId}`, 'PUT', [questionCategorySchema], {
    ...article,
    categoryId,
  });

export const giveFeedback = (
  articleId: number,
  response: string
): Promise<NormalizedResponse> =>
  fetchApi(
    `question-articles/${articleId}/give-feedback`,
    'PUT',
    questionArticleSchema,
    {
      articleId,
      response,
    }
  );

export const searchArticles = (query: string): Promise<NormalizedResponse> =>
  fetchApi(`question-articles?q=${query}`, 'GET', [questionArticleSchema]);

export const removeCategory = (
  categoryId: number
): Promise<NormalizedResponse> =>
  fetchApi(
    `question-categories/${categoryId}`,
    'DELETE',
    questionCategorySchema
  );

export const fetchCategoryById = (
  categoryId: number
): Promise<NormalizedResponse> =>
  fetchApi(`question-categories/${categoryId}`, 'GET', questionCategorySchema);

export const fetchCategories = (): Promise<NormalizedResponse> => {
  return fetchApi('question-categories', 'GET', [questionCategorySchema]);
};

export const createCategory = (
  data: QuestionCategory
): Promise<NormalizedResponse> =>
  fetchApi(`question-categories`, 'POST', questionCategorySchema, {
    ...data,
  });

export const updateCategory = (
  categoryId: number,
  category: QuestionCategory
): Promise<NormalizedResponse> =>
  fetchApi(`question-categories/${categoryId}`, 'PUT', questionCategorySchema, {
    ...category,
  });
