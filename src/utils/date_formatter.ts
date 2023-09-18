import moment from 'moment';

export const dateFormatter = date => {
  const format = moment(date).format('DD/MM/YYYY');
  return format;
};
