import { format, getTime, formatDistanceToNow } from "date-fns";

export function fDate(date) {
  return format(new Date(date), "dd MMMM yyyy");
}

export function fDateTime(date) {
  return format(new Date(date), "dd MMM yyyy HH:mm");
}

export function fTimestamp(date) {
  return getTime(new Date(date));
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), "dd/MM/yyyy hh:mm p");
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}

export function addDays(date, days) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return fDate(result);
}

export function getArrayLastDays(numberOfday, format = true, date) {
  const offset_date = date ? new Date(date) : new Date();
  const arrLast7Days = Array.from(Array(numberOfday).keys()).map(() => {
    let date = offset_date.setDate(offset_date.getDate() - 1);
    date = format ? fDate(date) : date;
    return date;
  });
  return arrLast7Days;
}

export const setDateMDY = (dteSTR) => {
  let [d, m, y] = dteSTR.split("-");
  return new Date(`${m} ${d}, ${y} 00:00:00`);
};