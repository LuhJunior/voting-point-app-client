export const getDateString = (data) => {
  const day = data.getDate();
  const month = data.getMonth() + 1;
  return [
    data.getFullYear(),
    month < 10 ? `0${month}` : month,
    day < 10 ? `0${day}` : day,
  ].join('-');
};

export const getHourString = (data) => {
  const hour = data.getHours();
  const minutes = data.getMinutes();
  return [
    hour < 10 ? `0${hour}` : hour,
    minutes < 10 ? `0${minutes}` : minutes,
    '00'
  ].join(':');
};