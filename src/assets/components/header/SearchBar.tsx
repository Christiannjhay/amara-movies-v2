import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchTerm("");
    navigate(`/search-results?query=${searchTerm}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:w-3/4 lg:w-1/2 mr-4 ml-4"
    >
      <div className="flex rounded-4xl text-red-500 h-9">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={handleInputChange}
          className="flex-grow rounded-l-2xl p-4 bg-[#292929]" // Allow input to grow
        />

        <button
          type="submit"
          className="bg-red-500 text-white rounded-r-2xl p-4 hover:bg-gray-800 flex items-center"
        >
         
            <FontAwesomeIcon icon={faMagnifyingGlass} className=""/>
          
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
