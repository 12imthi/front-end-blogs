import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints  
 // baseUrl: "http://localhost:5000/api",
 //     baseUrl: "https://bloging-backend-d8fr.onrender.com/api",
export const blogApi = createApi({
  reducerPath: "blogsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bloging-backend-d8fr.onrender.com/api",
    credentials: "include", // Sends cookies with every request
  }),
  tagTypes: ["Blogs"],
  endpoints: (builder) => ({
    // Fetch all blogs with search, category, and location filters
    fetchBlogs: builder.query({
      query: ({ search = "", category = "", location = "" }) =>
        `/blogs?search=${search}&category=${category}&location=${location}`,
      providesTags: ["Blogs"],
    }),
    
    // Fetch a single blog by its ID
    fetchBlogById: builder.query({
      query: (id) => `/blogs/${id}`,
    }),
    
    // Fetch related blogs based on the current blog
    fetchRelatedBlogs: builder.query({
      query: (id) => `/blogs/related/${id}`,
    }),
    
    // Fetch blogs for the logged-in user
    fetchUserBlogs: builder.query({
      query: () => `/blogs/user-posts`, // Endpoint to fetch only user's posts
      providesTags: ["Blogs"],
    }),
    
    // Create a new blog post
    postBlog: builder.mutation({
      query: (newBlog) => ({
        url: `/blogs/create-post`,
        method: "POST",
        body: newBlog,
      }),
      invalidatesTags: ['Blogs'],
    }),
    
    // Update an existing blog post
    updateBlog: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/blogs/update-post/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Blogs", id }],
    }),
    
    // Delete a blog post
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blogs/delete-post/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Blogs", id }],
    }),
  }),
});

// Export the hooks for the queries and mutations
export const {
  useFetchBlogsQuery,
  useFetchBlogByIdQuery,
  useFetchRelatedBlogsQuery,
  useFetchUserBlogsQuery, // Use this hook for fetching the user's own posts
  usePostBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
