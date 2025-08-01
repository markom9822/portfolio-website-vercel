

export function getDurationInYearsMonths(date1: Date, date2: Date) {
  // Ensure date1 is the earlier date
  if (date1 > date2) {
    [date1, date2] = [date2, date1];
  }

  let years = date2.getFullYear() - date1.getFullYear();
  let months = date2.getMonth() - date1.getMonth();

  // add extra month to round up
  if(date1.getDate() != date2.getDate())
  {
    months++;
  }

  // Adjust if months are negative
  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months };
}

export function getDurationText(years: number, months: number) {

    const yearsText = years > 0 ? `${years}` + " yrs" : "";
    const monthsText = months > 0 ? `${months}` + " mos" : "";

    return yearsText + " " + monthsText;
}

export function getDaysBetweenDates(startDate: Date, endDate: Date) {

    // use time between dates
    const diffTime = endDate.getTime() - startDate.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}
