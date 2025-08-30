import React from 'react'

const HomePage = () => {

    const ToursArr = [
        {
            date: "JUL16",
            place: "DETROIT, MI",
            venue: "DTE ENERGY MUSIC THEATRE"
        },
        {
            date: "JUL19",
            place: "TORONTO,ON",
            venue: "BUDWEISER STAGE"
        },
        {
            date: "JUL24",
            place: "PUNE",
            venue: "HINJWADI IT SECTOR"
        },
        {
            date: "JUL26",
            place: "NAGPUR",
            venue: "XXX MALL"
        },
        {
            date: "JUL28",
            place: "BHOPAL",
            venue: "DB CITY MALL"
        },
    ]
  return (
    <div className='mx-auto'>
        <h1 className='text-3xl font-bold text-center py-3'>TOURS</h1>

        <div className='bg-slate-100 py-7 px-20 rounded-2xl'>
          <ul className='space-y-4 text-lg font-semibold '>
              {ToursArr.map((tour, index) => (
                <div className='flex justify-between gap-15 border-b-1 border-black mb-5' key={index}>
                <li  key={index}> {tour.date}</li>
                <li  key={index}> {tour.place} </li>
                <li  key={index}> {tour.venue}</li>
                <button className='bg-blue-300 text-sm px-1 rounded hover:bg-blue-100'> BUY TICKETS</button>
                </div>
                
            ))}
          </ul>
        </div>
    </div>
  )
}

export default HomePage