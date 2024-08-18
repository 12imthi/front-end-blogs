import React from 'react'
import { useSelector } from 'react-redux'
import {Outlet,Navigate} from 'react-router-dom'
import AdminNavigation from './AdminNavigation'


function AdminLayout() {

  const {user} = useSelector(state => state.auth)

  if(!user || user.role !== 'admin') {

    return <Navigate to='/login' />

   
  }

  return (
    <div className='container mx-auto flex flex-col md:flex-row gap-4 items-start justify-start'>
      <header className='lg:w-1/5 sm:2/5 w-full'>
        <AdminNavigation/>
      </header>
      <main className='p-8 bg-white w-full mt-5 mb-5 rounded-md shadow-lg'>
    
      <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout