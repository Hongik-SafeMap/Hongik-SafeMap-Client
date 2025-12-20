export const formatDateTime = (isoStr: string, onlyDate?: boolean) => {
  const date = new Date(isoStr);

  const yearMonthDay = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Asia/Seoul',
  }).format(date);

  const hourMinute = new Intl.DateTimeFormat('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Seoul',
  }).format(date);

  if (onlyDate) return `${yearMonthDay}`;

  return `${yearMonthDay} ${hourMinute}`;
};
