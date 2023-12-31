import {apiSlice} from './apiSlice';

const CIRCLE_URL = '/circles';

export const circleApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        group: builder.mutation({
            query: (data) => ({
                url: `${CIRCLE_URL}/create`,
                method: 'POST',
                body: data,
            }),
        }),
        groupInfo: builder.mutation({
            query: (id) => ({
                url: `${CIRCLE_URL}/${id}`,
                method: 'GET',
            }),
        }),
        groupRequest: builder.mutation({
            query: (data) => ({
                url: `${CIRCLE_URL}/${data.id}`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const {useGroupMutation, useGroupInfoMutation, useGroupRequestMutation} = circleApiSlice;