import {fetchCategories} from "./categoryActions";

describe('Category actions', () => {

	it('should dispatch an action to request categories', () => {
		const expectedAction = {
			type: 'REQUEST_CATEGORIES'
		};
		expect(requestCategories()).toEqual(expectedAction);
	})
});