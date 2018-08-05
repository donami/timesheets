import { createSelector } from 'reselect';
import { getUserEntities } from '../../users/store/selectors';
import { QuestionCategory } from './models';

const getHelpState = (state: any) => state.help;

const getCategoryState = createSelector(
  getHelpState,
  state => state.categories
);
const getArticleState = createSelector(getHelpState, state => state.articles);

const getCategoryEntities = createSelector(
  getCategoryState,
  state => state.byId
);

const getArticleEntities = createSelector(getArticleState, state => state.byId);

export const getSelectedCategoryId = createSelector(
  getCategoryState,
  state => state.selected
);

export const getSelectedArticleId = createSelector(
  getArticleState,
  state => state.selected
);

export const getArticleSearchIds = createSelector(
  getArticleState,
  state => state.searchResults
);

export const getSelectedCategory = createSelector(
  getSelectedCategoryId,
  getCategoryEntities,
  (categoryId, categories) => categories[categoryId]
);

export const getCategoriesLoaded = createSelector(
  getCategoryState,
  state => state.loaded
);

export const getCategoriesLoading = createSelector(
  getCategoryState,
  state => state.loading
);

export const getSelectedArticle = createSelector(
  getSelectedArticleId,
  getArticleEntities,
  (articleId, articles) => articles[articleId]
);

export const getSelectedArticleAuthor = createSelector(
  getSelectedArticle,
  getUserEntities,
  (article, users) => {
    if (!article) {
      return null;
    }

    return users[article.author];
  }
);

export const getCategories = createSelector(getCategoryState, categoryState => {
  return categoryState.ids.map(
    (categoryId: number) => categoryState.byId[categoryId]
  );
});

export const getArticles = createSelector(getArticleState, articleState => {
  return articleState.ids.map(
    (articleId: number) => articleState.byId[articleId]
  );
});

export const getSelectedArticleCategory = createSelector(
  getSelectedArticleId,
  getCategories,
  (articleId: any, categories: QuestionCategory[]) => {
    if (!articleId) {
      return null;
    }

    return categories.find(category => {
      return category.articles.indexOf(articleId) > -1;
    });
  }
);

export const getArticleSearchResults = createSelector(
  getArticleSearchIds,
  getArticleEntities,
  (ids: number[], articles) => {
    return ids.map(id => articles[id]);
  }
);

export const getArticleSearchQuery = createSelector(
  getArticleState,
  state => state.query
);

export const getSelectedCategoryArticles = createSelector(
  getSelectedCategory,
  getArticleEntities,
  (category, articles) => {
    if (!category) {
      return [];
    }
    return category.articles.map((articleId: any) => articles[articleId]);
  }
);
