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
  // logs
  //         .sort((log: Log, other: Log) => {
  //           return (
  //             new Date(other.createdAt).getTime() -
  //             new Date(log.createdAt).getTime()
  //           );
  //         })
};
