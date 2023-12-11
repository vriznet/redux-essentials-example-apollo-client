import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { dayjsTimezone } from '../../utils';

interface ITimeAgoProps {
  timestamp: string;
}

const TimeAgo = (props: ITimeAgoProps) => {
  dayjsTimezone();
  dayjs.extend(relativeTime);
  let timeAgo = '';
  if (props.timestamp) {
    const date = dayjs(parseInt(props.timestamp, 10)).tz('Asia/Seoul').toDate();
    const timePeriod = dayjs(date).fromNow();
    timeAgo = `${timePeriod}`;
  }

  return (
    <span title={`${parseInt(props.timestamp, 10)}`}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
};

export default TimeAgo;
