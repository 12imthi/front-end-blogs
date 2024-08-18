import React from 'react'
import Blog from '../blogs/Blog'
import Hero from './Hero'

function Home() {
  return (
    <div className='bg-white text-primary container mx-auto mt-8 p-8'>
    <div>
        <Blog/>
      </div>

    <hr />
      
      <Hero/>
    </div>
  )
}

export default Home