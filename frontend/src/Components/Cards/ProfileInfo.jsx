import React from 'react'
import { getInitials } from '../../utils/helper'

function ProfileInfo({ onLogout, userInfo }) {
  return (
    <div className='flex items-center gap-3 flex-wrap sm:flex-nowrap'>
      <div className='w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100'>
        {getInitials(userInfo?.username)}
      </div>
      <p className='text-sm font-medium'>{userInfo?.username}</p>
      <button
        className='text-sm bg-red-500 px-2 py-1 rounded-md text-white hover:opacity-80'
        onClick={onLogout}
      >
        Logout
      </button>
    </div>
  )
}

export default ProfileInfo
