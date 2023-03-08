export default function formatDate(date: Date) {
  let year = date.getFullYear().toString();
  let month = date.getMonth().toString();
  if (month.length < 2) {
    month = '0' + month;
  }
  let day = date.getDate().toString();
  if (day.length < 2) {
    day = '0' + day;
  }
  let hours = date.getHours().toString();
  if (hours.length < 2) {
    hours = '0' + hours;
  }
  let minutes = date.getMinutes().toString();
  if (minutes.length < 2) {
    minutes = '0' + minutes
  }

  return `${day}-${month}-${year} ${hours}:${minutes}`;
}