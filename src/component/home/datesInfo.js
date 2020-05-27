import React, { useMemo } from "react";
import moment from "moment";
const dateValue = {
  today: moment().format("YYYY-MM-DD"),
  sevenDayAgo: moment().subtract(6, "days").format("YYYY-MM-DD"),
  thirtyDayAgo: moment().subtract(29, "days").format("YYYY-MM-DD"),
};
const {today,sevenDayAgo,thirtyDayAgo}=dateValue;
const listOptionsDates = [
  {
    dates: "Today",
    valueDateToday: today,
    valueDate: today,
  },
  {
    dates: "Last 7 days",
    valueDateToday: today,
    valueDate: sevenDayAgo,
  },
  {
    dates: "Last 30 days",
    valueDateToday: today,
    valueDate: thirtyDayAgo,
  },
];

export { listOptionsDates, dateValue };
