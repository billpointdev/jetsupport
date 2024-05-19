import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../components/shared/layout/layout'

function ComingSoon() {
  return (
   <Layout>
     <div className='flex items-center  flex-col gap-4 m-auto justify-center h-[80vh]'>
      
      <h1 className=' text-4xl font-bold'>Coming Soon</h1>
      <p className="text-xl font-['Poppins']">You can check our available products</p>
      
        <Link to={'/'}> <button className='rounded px-5 py-1 bg-green-700 text-white'>Here</button></Link>
    </div>
   </Layout>
  )
}

export default ComingSoon