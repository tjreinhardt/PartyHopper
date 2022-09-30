import { isFuture, isPast, isEqual } from "date-fns";

export const startDateConversion = (startDate) => {
  let parts = startDate.split('-')
  let year = parts[0]
  let month = parts[1] - 1
  let day = parts[2]
  day = Number(day) + 1
  console.log(year)
  console.log(month)
  console.log(day)
  const result = isPast(new Date(year, month, day))
  return result
}

export const dateEquality = (startDate) => {
  let parts = startDate.split('-')
  let year = parts[0]
  let month = parts[1] - 1
  let day = parts[2]
  console.log(day, 'day')
  const result = isEqual(startDate, new Date(year, month, day))
  return result
}

startDateConversion()


export const getTodaysDate = () => {
  let today = new Date();
  let todays_day = new Date().getDay() + 18;
  if (todays_day < 10) todays_day = `0${todays_day}`
  let todays_month = new Date().getMonth() + 1;
  if (todays_month < 10) todays_month = `0${todays_month}`
  let todays_year = today.getFullYear();
  let todays_date = `${todays_year}-${todays_month}-${todays_day}`
  return todays_date
}
