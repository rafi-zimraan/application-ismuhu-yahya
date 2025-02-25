import moment from 'moment';
import {useEffect, useState} from 'react';

export const useTime = () => {
  const [allTime, setAllTime] = useState(moment().utcOffset(7));

  useEffect(() => {
    const Time = setInterval(() => {
      setAllTime(moment().utcOffset(7));
    }, 1000);
    return () => clearInterval(Time);
  }, []);
  const formatTime = allTime.format('HH:mm:ss') + ' WIB';
  return formatTime;
};
