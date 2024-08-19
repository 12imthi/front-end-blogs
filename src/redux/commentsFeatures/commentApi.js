import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const commentApi = createApi({
    reducerPath: "commentApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://bloging-backend-d8fr.onrender.com/api/comments",
        credentials: "include"
    }),
    tagTypes: ['Comments'],
    endpoints: (builder) => ({
        postComment: builder.mutation({
            query: (commentData) => ({
                url: "/post-comment",
                method: "POST",
                body: commentData
            }),
            invalidatesTags: (result, error, { postId }) => [{ type: 'Comments', id: postId }],
        }),
        getComments: builder.query({
            query: (postId) => ({
                url: `/total-comment`,
                method: "GET",
            }),
            providesTags: (result, error, postId) => [{ type: 'Comments', id: postId }],
        }),
    })
});

export const { useGetCommentsQuery, usePostCommentMutation } = commentApi;
export default commentApi;
