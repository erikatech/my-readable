export function generateUUID(){
	let d = new Date().getTime();
	return 'xxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		const r = (d + Math.random()*16)%16 | 0;
		d = Math.floor(d/16);
		return r.toString(16);
	});
}

export function convertToStringDate(timestamp){
	const myDate = new Date(timestamp);
	const day = myDate.getDay().toString();
	const month = myDate.getMonth().toString();
	const year = myDate.getFullYear().toString();
	return day.concat("/").concat(month).concat("/").concat(year);
}