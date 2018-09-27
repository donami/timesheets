import React from 'react';
import { Icon } from 'genui';

import styled, { css, withProps } from '../../../../styled/styled-components';
import { parseDate } from '../../../../utils/helpers';
import CalendarModal from './calendar-modal';

const CalendarDay: React.SFC<{
  submitted?: boolean;
  day: any;
  isAdmin: boolean;
  editable: boolean;
  onReportDay: any;
  weekIndex: number;
  dayIndex: number;
}> = ({
  submitted,
  day,
  editable,
  isAdmin,
  onReportDay,
  weekIndex,
  dayIndex,
}) => {
  const data: {
    inTime: string;
    outTime: string;
    break: number;
    totalHours: number;
    holiday: boolean;
  } = day.reported || day.expected;

  let isHoliday = false;

  // If holiday and no reported hours, simply display string
  if (data && data.holiday && !(day.reported && day.reported.totalHours)) {
    isHoliday = true;
  }

  return (
    <Day submitted={submitted} className="calendar-day">
      <DayInner className="calendar-day-inner">
        {day.date && (
          <>
            <DayStatus className="calendar-day-status">
              {submitted && <Icon name="fas fa-check" />}
            </DayStatus>
            <DayContent className="calendar-day-content">
              <CalendarModal
                trigger={<DayDate>{parseDate(day.date, 'D')}</DayDate>}
                date={day}
                onSubmit={onReportDay}
                editable={editable}
                isAdmin={isAdmin}
                weekIndex={weekIndex}
                dayIndex={dayIndex}
              />

              <DayInfo className="calendar-day-info">
                {isHoliday ? 'Holiday' : `${data.totalHours}h` || '0h'}
              </DayInfo>
            </DayContent>
          </>
        )}
      </DayInner>
    </Day>
  );
};

export default CalendarDay;

const Day = withProps<{ submitted?: boolean }>(styled.div)`
  flex: 1;
  padding: 3px;
  border-right: #eee 1px solid;

  &:last-of-type {
    border-right: none;
  }

  ${props => {
    if (props.submitted) {
      return css`
        ${DayStatus} {
          background: #4ad8d9;
          color: #fff;
        }
        ${DayContent} {
          background: #71ecea;
          color: #fff;
        }
      `;
    }
    return null;
  }}
`;

const DayInner = styled.div`
  display: flex;
  background: #fff;
`;

const DayStatus = styled.div`
  flex: 1;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #777;
  background: #fff;
`;

const DayContent = styled.div`
  flex: 2;
  padding: 3px 5px;
  color: #777;
  background: #fff;
`;

const DayInfo = styled.div`
  text-align: right;
`;

const DayDate = styled.div`
  text-align: right;
  margin-bottom: 3px;
  font-weight: 700;
  cursor: pointer;
`;
