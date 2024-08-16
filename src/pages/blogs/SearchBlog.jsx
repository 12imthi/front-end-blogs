import React from "react";

function SearchBlog({search,handleSearchChange,handleSearch}) {

    const handelKeyPress = (event) => {
        if(event.key === 'Enter') {
            handleSearch()
        }
    }
  return (
    <div className="w-full flex">
      <input type="text" placeholder="search here..." 
      value={search} 
      onChange={handleSearchChange}
      onKeyPress={handelKeyPress  }
       className="py-2 px-4 mr-5 w-full bg-gray-100     focus:outline-none focus:border" />
       <button className="bg-blue-500 px-4 py-2 text-white" onClick={handleSearch}>search</button>
      
    </div>
  );
}

export default SearchBlog;
