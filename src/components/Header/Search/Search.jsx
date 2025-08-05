const Search = () => (
  <form className="flex items-center border-1 border-grey rounded-none px-4 h-10 md:h-10 bg-white w-full max-w-xs md:max-w-lg md:w-[420px]">
    <input
      type="text"
      placeholder="Поиск..."
      className="outline-none bg-transparent text-sm md:text-base text-black placeholder-gray-500 w-full font-medium"
    />
    <button type="submit" className="p-1 text-black ml-2">
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
    </button>
  </form>
);

export default Search;