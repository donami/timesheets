import { dateFormat } from './calendar';

export const capitalize = (s: string) => {
  return s && s[0].toUpperCase() + s.slice(1);
};

export const parseDate = (date: string, format = 'YYYY-MM-DD') => {
  return dateFormat(date, format);
};
