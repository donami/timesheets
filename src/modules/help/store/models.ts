import { User, UserRole } from '../../users/store/models';

export type QuestionArticle = {
  id: number;
  title: string;
  author: User;
  teaser?: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  access: UserRole[];
  votes: {
    negative: number;
    neutral: number;
    positive: number;
  };
};

export type QuestionCategory = {
  id: number;
  title: string;
  icon: string;
  articles: QuestionArticle[];
};
