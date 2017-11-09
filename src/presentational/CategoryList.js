import React from 'react';

/**
 * Dumb component used to render the category list
 * @param categories the category list passed to be rendered
 * @param selectCategory the method fired when the user selects a category from list
 * @param selectedCategory the selected category by default (used when the user changes the route
 * and when user is editing a post.
 * @param required just so we can know when to put the asterisk (NewPost need it, but the Header doesn't)
 * @returns {XML}
 * @constructor
 */
const CategoryList = ({categories, selectCategory, selectedCategory, required}) => {

	// we need to check if the selectedCategory is inside the categories list
	const categoryIndex = categories.findIndex((category) => selectedCategory === category.name);

	// if we don't find it, the selectedCategory is empty, so the disabled option is displayed
	selectedCategory = categoryIndex < 0 ? "" : selectedCategory;
	return (
	  <div>
		  <select value={selectedCategory}
		          onChange={(e) => selectCategory(e.target.value)}>
			  <option value="" disabled>----------- Categories -----------</option>
			  {categories.map(category => (
			    <option
				  value={category.path}
				  key={category.name}>
				    {category.name}
			    </option>
			  ))}
		  </select>
		  {required && (<span> *</span>)}
	  </div>
	)
};
export default CategoryList;


