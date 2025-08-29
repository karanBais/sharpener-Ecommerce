import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-blue-500 text-white p-4'>    
       <div className='flex justify-between items-center max-w-7xl mx-auto'>
         <ul className=' flex gap-20 justify-center '>
            <li>Home</li>
            <li>Store</li>
            <li>About</li>
        </ul>
        <p>CART - 0</p>
       </div>
    </div>
  )
}

export default Navbar