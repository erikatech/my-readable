/**
 * Generate UUID so we can insert posts and comments
 * @returns {string}
 */
export function generateUUID(){
	let d = new Date().getTime();
	return 'xxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		const r = (d + Math.random()*16)%16 | 0;
		d = Math.floor(d/16);
		return r.toString(16);
	});
}

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