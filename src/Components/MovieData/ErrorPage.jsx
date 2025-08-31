import React from 'react'

const ErrorPage = ({cancel}) => {
  return (
    <div className='flex gap-5 my-4'>
        <h1 className='py-1'>Something went wrong.... Retrying</h1>
        <button onClick={cancel} className='border-2 border-red-500 py-1 px-2 hover:bg-red-400'>Cancel</button>
    </div>
  )
}

export default ErrorPage