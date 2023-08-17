import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface SignUpData {
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
}

export const userApi = createApi({
  reducerPath: 'user',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers) => {
      headers.set('credentials', 'include')
      return headers
    },
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation<void, SignUpData>({
      query: (data) => ({
        url: '/user',
        method: 'POST',
        body: data,
      }),
    }),
    getUserByEmail: builder.query<any, string | string[] | undefined | null>({
      query: (email) => `/user?email=${email}`,
    }),
    changePassword: builder.mutation<
      any,
      { currentPassword: string; newPassword: string; session: any }
    >({
      query: ({ currentPassword, newPassword, session }) => ({
        url: '/change-password',
        method: 'PUT',
        body: {
          currentPassword,
          newPassword,
          session,
        },
      }),
    }),
    sendTempPasswordEmail: builder.mutation<
      void,
      { email: string; receiveEmail: string }
    >({
      query: ({ email, receiveEmail }) => ({
        url: '/find-password',
        method: 'POST',
        body: {
          email,
          receiveEmail,
        },
      }),
    }),
    deleteUser: builder.mutation<void, { userId: string; adminId: string }>({
      query: ({ userId, adminId }) => ({
        url: `/user?userId=${userId}&adminId=${adminId}`,
        method: 'DELETE',
      }),
    }),
    getAllUsers: builder.query<any, void>({
      query: () => `/user`,
    }),
  }),
})

export const {
  useSignUpMutation,
  useGetUserByEmailQuery,
  useChangePasswordMutation,
  useSendTempPasswordEmailMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
} = userApi
