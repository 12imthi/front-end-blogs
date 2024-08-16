// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const blogApi = createApi({
 
    reducerPath: 'blogsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/',
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        fetchBlogs : builder.query({
                query:({search='',category= '',location=''}) => 
                `/blogs?search=${search}&category=${category}&location=${location}`
        })
    })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useFetchBlogsQuery } = blogApi