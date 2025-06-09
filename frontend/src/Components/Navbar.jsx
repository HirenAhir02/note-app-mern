import React, { useState } from 'react'
import SearchBar from './SearchBar/SearchBar'
import ProfileInfo from './Cards/ProfileInfo'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signoutFailure, signoutStart, signoutSuccess } from '../redux/user/userSlice'
import axios from 'axios'
import { toast } from 'react-toastify'

function Navbar({ userInfo, handleClearSearch, onSearchNote }) {
  const [searchQuery, setSearchQuery] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery)
    }
  }

  const onClearSearch = () => {
    setSearchQuery("")
    handleClearSearch()
  }

  const onLogout = async () => {
    try {
      dispatch(signoutStart())

      const res = await axios.get("http://localhost:3000/api/auth/signout", {
        withCredentials: true,
      })

      if (res.data.success === false) {
        dispatch(signoutFailure(res.data.message))
        toast.error(res.data.message)
        return
      }

      toast.success(res.data.message)
      dispatch(signoutSuccess())
      navigate("/login")

    } catch (error) {
      toast.error(error.message)
      dispatch(signoutFailure(error.message))
    }
  }

  return (
    <div className='bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 sm:px-6 drop-shadow'>
      <div className='flex justify-between items-center w-full sm:w-auto'>
        <Link to={"/"}>
          <h2 className='text-lg sm:text-xl font-medium text-black'>
            <footer>
            <h1 className="text-3xl  text-center sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse whitespace-nowrap overflow-hidden">
                    Hiren Good Notes...
                </h1>
            </footer>
          </h2>
        </Link>
      </div>

      <div className='w-full sm:w-auto'>
        <SearchBar
          value={searchQuery}
          onChange={({ target }) => setSearchQuery(target.value)}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />
      </div>

      <div className='w-full sm:w-auto flex justify-end'>
        <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
      </div>
    </div>
  )
}

export default Navbar
