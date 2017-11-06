import React from 'react';

const CategoryList = ({categories, selectCategory, selectedCategory, required}) => {
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


