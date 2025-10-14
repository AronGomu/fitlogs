export function getDateFromYYYYMMDDNumber(date: number): Date {
	const dateString = String(date);
	const year = parseInt(dateString.substring(0, 4), 10);
	const month = parseInt(dateString.substring(4, 6), 10);
	const day = parseInt(dateString.substring(6, 8), 10);
	return new Date(year, month - 1, day);
}

export function formatDateToYYYYMMDDString(date: Date) {
	if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
}

export function formatDateToYYYYMMDDNumber(date: Date) {
	if (!date) return 0;
    return Number(formatDateToYYYYMMDDString(date))
}


export function getPreviousDayYYYYMMDD(yyyymmdd: number): number {
	const date = getDateFromYYYYMMDDNumber(yyyymmdd)

	// Go back one day
	date.setDate(date.getDate() - 1);

	// Format the new date back to YYYYMMDD number
	const newYear = date.getFullYear();
	// padStart is important here to ensure MM and DD are always two digits
	const newMonth = String(date.getMonth() + 1).padStart(2, '0'); 
	const newDay = String(date.getDate()).padStart(2, '0');
	
	return parseInt(`${newYear}${newMonth}${newDay}`, 10);
}

export function getYesterday(): Date {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date;
}

