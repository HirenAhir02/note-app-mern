import React from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6"
import { IoCloseSharp } from "react-icons/io5"

function SearchBar({ value, onChange, handleSearch, onClearSearch }) {
  return (
    <div className='w-full sm:w-60 md:w-80 flex items-center px-4 bg-slate-100 rounded-md'>
      <input
        type="text"
        placeholder='Search Notes...'
        className='w-full text-sm bg-transparent py-[11px] outline-none'
        value={value}
        onChange={onChange}
      />

      {value && (
        <IoCloseSharp
          className='text-slate-500 text-xl cursor-pointer hover:text-black mr-2'
          onClick={onClearSearch}
        />
      )}

      <FaMagnifyingGlass
        className='text-slate-500 text-xl cursor-pointer hover:text-black'
        onClick={handleSearch}
      />
    </div>
  )
}

export default SearchBar
