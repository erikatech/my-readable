import React from 'react';

const CategoryList = ({categories, selectCategory, selectedCategory}) => {
	return (
	  <select value={selectedCategory}
		onChange={(e) => selectCategory(e.target.value)}>
		  <option value="">All</option>
		  {categories.map(category => (
			<option
			  value={category.path}
			  key={category.name}>
				{category.name}
			</option>
		  ))}
	  </select>
	)
};
export default CategoryList;


