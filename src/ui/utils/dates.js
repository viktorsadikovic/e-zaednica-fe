import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isToday from "dayjs/plugin/isToday";

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isToday);

const TIME_FORMAT = "h:mm:ss A";
const STANDARD_FORMAT = "MM/DD/YYYY";
const SHORT_MONTH_DATE_FORMAT = "MMM D";
const SHORT_ISO_FORMAT = "YYYY-MM-DD";
const MONTH_AND_YEAR = "MMMM YYYY";

export const getFormattedDate = (date, dateFormat = undefined) => {
  const dayjsDate = dayjs(date);

  if (dateFormat === "time") {
    return dayjsDate.format(TIME_FORMAT);
  }

  if (dateFormat === "shortMonth") {
    return dayjsDate.format(SHORT_MONTH_DATE_FORMAT);
  }

  if (dateFormat === "ISO") {
    return dayjsDate.format(SHORT_ISO_FORMAT);
  }

  if (dateFormat === "monthAndYear") {
    return dayjsDate.format(MONTH_AND_YEAR);
  }

  return dayjsDate.format(STANDARD_FORMAT);
};

export const getToday = () => {
  return dayjs();
};

export const getRelativeDateFormat = (isoString, compareTo = undefined) => {
  const reference = compareTo || getToday();
  const date = dayjs(isoString);

  if (date.isToday()) {
    return "Today";
  }

  if (reference.isAfter(date)) {
    return getFormattedDate(date, "shortMonth");
  }

  return date.from(reference);
};

export const getDate18YearsAgo = () => {
  return getToday().subtract(18, "year");
};

export const getISOString = (date) => {
  return dayjs(date).toISOString();
};

export const isValidDate = (date) => {
  return dayjs(date).isValid();
};

export const isOver18 = (date) => {
  return dayjs(date).isSameOrBefore(getDate18YearsAgo());
};

export const isDateInThePast = (date) => {
  const today = getToday();
  const dayjsDate = dayjs(date);
  return today.isBefore(dayjsDate);
};

export const isDateSameOrAfter = (date, compareTo = undefined) => {
  const reference = compareTo || getToday();

  return dayjs(date).isSameOrAfter(reference, "day");
};

export const isDateSameOrBefore = (date, compareTo = undefined) => {
  const reference = compareTo || getToday();

  return dayjs(date).isSameOrBefore(reference, "day");
};

export const getDayJS = (date) => dayjs(date);

export const getEndOfDay = (date) => {
  return dayjs(date).endOf("day");
};

export const handleDatePickerOnChange = function (callback) {
  return function (date) {
    if (date && isValidDate(date)) {
      callback(date.toISOString());
    }
  };
};
