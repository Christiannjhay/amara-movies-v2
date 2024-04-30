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
    <form onSubmit={handleSubmit}> {/* Add a form for submission */}
      <div className="w-80 h-8 rounded-4xl text-black">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={handleInputChange}
          className="w-full h-full rounded-2xl"
        />
      </div>
    </form>
  );
}

export default SearchBar;
