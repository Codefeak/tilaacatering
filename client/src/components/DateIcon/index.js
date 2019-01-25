import React from 'react';
import dayjs from 'dayjs';

const DateIcon = ({
  date, size, color,
}) => (
  <div className={`dateIcon dateIcon--${size} dateIcon--color-${color}`}>
    <div className="dateIcon__month">
      <p>{dayjs(date).format('MMM').toUpperCase()}</p>
    </div>
    <div className="dateIcon__day">
      <p>{dayjs(date).format('DD')}</p>
    </div>
  </div>
);

export default DateIcon;
