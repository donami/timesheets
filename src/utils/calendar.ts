import * as moment from 'moment';

const DEFAULT_FORMAT = 'YYYY-MM-DD';

export const asMonth = (date: string): string => moment(date).format('MMMM');

export const isSameMonthAs = (dateString: string, otherDateString: string) => {
  const date = moment(dateString);
  const other = moment(otherDateString);

  return date.isSame(other, 'month');
};

export const dateFormat = (date: string, format: string): string => {
  return moment(date).format(format);
};

export const isSameOrBeforeMonth = (date: string): boolean => {
  const today = moment();

  return moment(date).isSameOrBefore(today);
};

export const toStartOfMonth = (
  date: string,
  format: string = DEFAULT_FORMAT
): string => {
  return moment(date)
    .startOf('month')
    .format(format);
};

export const monthsBetween = (from: string, to: string): any => {
  const start = moment(from).startOf('month');
  const end = moment(to).startOf('month');

  const numberOfMonth = end.diff(start, 'months') + 1;

  const months = [];

  let current = moment(from).startOf('month');
  // tslint:disable-next-line:no-increment-decrement
  for (let i = 0; i < numberOfMonth; i++) {
    months.push(current.format('YYYY-MM-DD'));

    current = current.add(1, 'months');
  }

  return months;
};

const paddEmptyDates = (dates: any[]) => {
  const firstWeek: any[] = dates[0];
  const lastWeek = dates[dates.length - 1];

  const datesToAddForFirstWeek = 7 - firstWeek.length;
  const datesToAddForLastWeek = 7 - lastWeek.length;

  // tslint:disable-next-line:no-increment-decrement
  for (let i = 0; i < datesToAddForFirstWeek; i++) {
    firstWeek.unshift({
      date: null,
      hours: 0,
    });
  }

  // tslint:disable-next-line:no-increment-decrement
  for (let i = 0; i < datesToAddForLastWeek; i++) {
    lastWeek.push({
      date: null,
      hours: 0,
    });
  }

  return dates;
};

export const generateCalendarFromTemplate = (
  startDate: string,
  hoursDay: any
) => {
  const startOfMonth = moment(startDate).startOf('month');

  const format = 'YYYY-MM-DD';

  const dates: any = [];

  const daysInMonth = startOfMonth.daysInMonth();

  let current = startOfMonth;
  let weekIndex = 0;
  // tslint:disable-next-line:no-increment-decrement
  for (let i = 0; i < daysInMonth; i++) {
    // If it's the first day of the week
    if (!dates[weekIndex]) {
      dates[weekIndex] = [];
    }

    let expectedWorkHours = 0;

    const weekDay = current.format('dddd').toLowerCase();

    if (hoursDay[weekDay]) {
      expectedWorkHours = hoursDay[weekDay];
    }

    dates[weekIndex].push({
      hours: 0,
      expected: expectedWorkHours,
      date: current.format(format),
    });

    // If it's a sunday, increase week index
    if (current.isoWeekday() === 7) {
      weekIndex = weekIndex + 1;
    }

    current = current.add(1, 'day');
  }

  return paddEmptyDates(dates);
};
