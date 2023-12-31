import {apiSlice} from './apiSlice';

const USERS_URL = '/users';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
            login: builder.mutation({
                query: (data) => ({
                    url: `${USERS_URL}/signin`,
                    method: 'POST',
                    body: data,
                }),
            }),
            logout: builder.mutation({
                query: () => ({
                    url: `${USERS_URL}/logout`,
                    method: 'POST',
                }),
            }),
            validate: builder.mutation({
                query: (username) => ({
                    url:`${USERS_URL}/${username}`,
                    method: 'GET',
                }),
            }),
            requestMember: builder.mutation({
                query: (username) =>({
                    url: `${USERS_URL}/request`,
                    method: 'POST',
                    body:username
                })
            }),
            myCircles: builder.mutation({
                query: (userId) => ({
                    url: `${USERS_URL}/my_circles/${userId}`,
                    method: 'GET',
                }),
            }),
            userStatus: builder.mutation({
                query: ({groupId,userId}) => ({
                    url: `${USERS_URL}/group_status/?groupId=${groupId}&userId=${userId}`,
                    method: 'GET',
                }),
            }),
    }),
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useValidateMutation,
    useMyCirclesMutation,
    useUserStatusMutation,
    useRequestMemberMutation,
} = usersApiSlice;