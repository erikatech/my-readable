/**
 * Receives a timestamp and return it's corresponding date as text
 * Used by posts and comments
 * @param timestamp
 * @returns {string}
 */
export function convertToStringDate(timestamp){
	const myDate = new Date(timestamp);
	const day = myDate.getDate() < 10 ? "0".concat(myDate.getDate().toString()) : myDate.getDate().toString();
	const month = (myDate.getMonth() + 1).toString();
	const year = myDate.getFullYear().toString();
	return day.concat("-").concat(month).concat("-").concat(year);
}