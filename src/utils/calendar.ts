import * as moment from 'moment';

const DEFAULT_FORMAT = 'YYYY-MM-DD';

type TimeUnits = 'minutes' | 'hours' | 'seconds';

export const asMonth = (date: string): string => moment(date).format('MMMM');

export const toDuration = (time: number, unit: TimeUnits, as: TimeUnits) => {
  const duration = moment.duration(time, unit);

  switch (as) {
    case 'minutes':
      return duration.asMinutes();
    case 'seconds':
      return duration.asSeconds();
    case 'hours':
    default:
      return duration.asHours();
  }
};

export const timeDiff = (
  time: string,
  other: string,
  inFormat: string,
  unit: TimeUnits
) => {
  const parsedTime = moment(time, inFormat);
  const parsedOther = moment(other, inFormat);

  return parsedOther.diff(parsedTime, unit, true);
};

export const isSameMonthAs = (dateString: string, otherDateString: string) => {
  const date = moment(dateString);
  const other = moment(otherDateString);

  return date.isSame(other, 'month');
};

export const dateFormat = (date: string | Date, format: string): string => {
  return moment(date).format(format);
};

export const isSameOrBeforeMonth = (date: string): boolean => {
  const today = moment();

  return moment(date).isSameOrBefore(today);
};

export const monthIsInPast = (date: string): boolean => {
  return moment(date)
    .endOf('month')
    .isBefore();
};

/**
 * Generates an array of months from current month
 * @param numberOfMonths Number of months to be generated
 * @param options Options: { future: if months should be future or past dates, includeCurrent: include current month }
 * @param format Optional: Format used for the generated months
 */
export const listOfMonthsFromToday = (
  numberOfMonths: number,
  options: { future: boolean; includeCurrent: boolean },
  format: string = DEFAULT_FORMAT
) => {
  const today = moment();
  const months = [];

  if (options.includeCurrent) {
    months.push(today.startOf('month').format(format));
  }

  if (options.future) {
    // tslint:disable-next-line:no-increment-decrement
    for (let i = 0; i < numberOfMonths; i++) {
      months.push(
        today
          .add(1, 'month')
          .startOf('month')
          .format(format)
      );
    }
  } else {
    // tslint:disable-next-line:no-increment-decrement
    for (let i = 0; i < numberOfMonths; i++) {
      months.push(
        today
          .subtract(1, 'month')
          .startOf('month')
          .format(format)
      );
    }
  }
  return months;
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

export const paddEmptyDates = (dates: any[]) => {
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

    const weekDay = current.isoWeekday();

    if (hoursDay[weekDay - 1]) {
      expectedWorkHours = hoursDay[weekDay - 1];
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

export const timeAgo = (date: string | Date) => moment(date).fromNow();

export const diff = (date: Date) => {
  const now = moment();
  const other = moment(date);

  return now.diff(other, 'days');
};
