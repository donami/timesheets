import { dateFormat } from './calendar';

export const capitalize = (s: string) => {
  return s && s[0].toUpperCase() + s.slice(1);
};

export const parseDate = (date: string, format = 'YYYY-MM-DD') => {
  return dateFormat(date, format);
};

export const sortByRecentCreatedDates = <T extends { createdAt: string }>(
  item: T,
  other: T
) => {
  return (
    new Date(other.createdAt).getTime() - new Date(item.createdAt).getTime()
  );
};

export const sortByRecentUpdatedDates = <T extends { updatedAt: string }>(
  item: T,
  other: T
) => {
  return (
    new Date(other.updatedAt).getTime() - new Date(item.updatedAt).getTime()
  );
};

export const validateEmail = (email: string): boolean => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const fullName = (user: any) => {
  return `${user.firstName} ${user.lastName}`;
};
