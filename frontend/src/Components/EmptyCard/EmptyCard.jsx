import React from 'react'

function EmptyCard({ imgSrc, message }) {
  return (
    <div className='flex flex-col items-center justify-center mt-10 px-4'>
      <img
        src={imgSrc}
        alt="No Notes"
        className='w-40 sm:w-52 md:w-60 lg:w-72'
      />

      <p className='w-full sm:w-4/5 md:w-2/3 lg:w-1/2 text-center text-xs sm:text-sm md:text-base font-medium text-slate-700 leading-6 sm:leading-7 mt-4 sm:mt-5'>
        {message}
      </p>
    </div>
  )
}

export default EmptyCard
