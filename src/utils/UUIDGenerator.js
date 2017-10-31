export function generateUUID(){
	let d = new Date().getTime();
	return 'xxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		const r = (d + Math.random()*16)%16 | 0;
		d = Math.floor(d/16);
		return r.toString(16);
	});
}