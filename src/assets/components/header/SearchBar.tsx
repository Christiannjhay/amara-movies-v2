import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; 

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
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
    <form onSubmit={handleSubmit}>
      <div className="w-[450px] h-10 rounded-4xl text-red-500 ">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={handleInputChange}
          className="w-full h-full rounded-2xl p-4 bg-[#292929]"
        />
      </div>
    </form>
  );
}

export default SearchBar;
