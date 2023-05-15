import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "Balance", 
    "List", 
    "Breakdown", 
    "Fed", 
    "Net",
    "Monthly",
    "Dashboard"
  ],
  endpoints: (build) => ({
    getBalance: build.query({
      query: (id) => `general/balance/${id}`,
      providesTags: ["Balance"],
    }),
    getList: build.query({
      query: () => "general/list",
      providesTags: ["List"],
    }),
    getBreakdown: build.query({
      query: () => "general/breakdown",
      providesTags: ["Breakdown"],
    }),
    getFed: build.query({
      query: () => "general/fed",
      providesTags: ["Fed"],
    }),
    getNet: build.query({
      query: () => "general/net",
      providesTags: ["Net"],
    }),
    getMonthly: build.query({
      query: () => "general/monthly",
      providesTags: ["Monthly"],
    }),
    getDashboardStats: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
  }),
});


export const { 
  useGetBalanceQuery, 
  useGetListQuery, 
  useGetBreakdownQuery, 
  useGetFedQuery,
  useGetNetQuery,
  useGetMonthlyQuery,
  useGetDashboardStatsQuery,
} = api;
