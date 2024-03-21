export default function SearchBar() {
    return (
      <div className="w-80 h-8 rounded-4xl text-black">  <input
          type="text"
          placeholder="Search movies..."
          value={'s'}
          className="w-full h-full rounded-2xl"  />
      </div>
    );
  }