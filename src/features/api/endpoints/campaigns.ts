import { apiSlice as api } from "../api";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getWorkspacesByWidCampaigns: build.query<
      GetWorkspacesByWidCampaignsApiResponse,
      GetWorkspacesByWidCampaignsApiArg
    >({
      query: (queryArg) => ({
        url: `/workspaces/${queryArg.wid}/campaigns`,
        params: {
          limit: queryArg.limit,
          start: queryArg.start,
          order: queryArg.order,
          orderBy: queryArg.orderBy,
          filterBy: queryArg.filterBy,
        },
      }),
    }),
    getWorkspacesByWidProjectsAndPidCampaigns: build.query<
      GetWorkspacesByWidProjectsAndPidCampaignsApiResponse,
      GetWorkspacesByWidProjectsAndPidCampaignsApiArg
    >({
      query: (queryArg) => ({
        url: `/workspaces/${queryArg.wid}/projects/${queryArg.pid}/campaigns`,
        params: { limit: queryArg.limit, start: queryArg.start },
      }),
    }),
    getProjectsByPidCampaigns: build.query<
      GetProjectsByPidCampaignsApiResponse,
      GetProjectsByPidCampaignsApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/${queryArg.pid}/campaigns`,
        params: { limit: queryArg.limit, start: queryArg.start },
      }),
    }),
    postCampaigns: build.mutation<
      PostCampaignsApiResponse,
      PostCampaignsApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as unguessApi };
export type GetWorkspacesByWidCampaignsApiResponse = /** status 200 OK */ {
  items?: Campaign[];
  start?: number;
  limit?: number;
  size?: number;
  total?: number;
};
export type GetWorkspacesByWidCampaignsApiArg = {
  /** Workspace (company, customer) id */
  wid: number;
  /** Limit pagination parameter */
  limit?: number;
  /** Start pagination parameter */
  start?: number;
  /** Order value (ASC, DESC) */
  order?: string;
  /** Order by accepted field */
  orderBy?: string;
  /** filterBy[<fieldName>]=<fieldValue> */
  filterBy?: any;
};
export type GetWorkspacesByWidProjectsAndPidCampaignsApiResponse =
  /** status 200 OK */ {
    items?: Campaign[];
    start?: number;
    limit?: number;
    size?: number;
    total?: number;
  };
export type GetWorkspacesByWidProjectsAndPidCampaignsApiArg = {
  /** Workspace (company, customer) id */
  wid: number;
  /** Project id */
  pid: number;
  /** Limit pagination parameter */
  limit?: number;
  /** Start pagination parameter */
  start?: number;
};
export type GetProjectsByPidCampaignsApiResponse = /** status 200 OK */ {
  items?: Campaign[];
  start?: number;
  limit?: number;
  size?: number;
  total?: number;
};
export type GetProjectsByPidCampaignsApiArg = {
  /** Project id */
  pid: number;
  /** Limit pagination parameter */
  limit?: number;
  /** Start pagination parameter */
  start?: number;
};
export type PostCampaignsApiResponse = /** status 200 OK */ Campaign;
export type PostCampaignsApiArg = {
  body: {
    title: string;
    description?: string;
    start_date: string;
    end_date: string;
    close_date: string;
    customer_title?: string;
    status_id?: number;
    is_public?: number;
    bug_form?: number;
    campaign_type_id: number;
    test_type_id: number;
    project_id: number;
    pm_id: number;
    platforms?: PlatformObject[];
    page_preview_id?: number;
    page_manual_id?: number;
    customer_id?: number;
  };
};
export type Campaign = {
  id: number;
  start_date: string;
  end_date: string;
  close_date: string;
  title: string;
  customer_title: string;
  description: string;
  status_id: number;
  is_public: number;
  campaign_type_id: number;
  campaign_type_name: string;
  test_type_name: string;
  project_id: number;
  project_name: string;
};
export type Error = {
  message: string;
  code: number;
  error: boolean;
};
export type PlatformObject = {
  id: number;
  name: string;
  deviceType?:
    | "smartphone"
    | "tablet"
    | "computer"
    | "smartwatch"
    | "console"
    | "tv";
};
export const {
  useGetWorkspacesByWidCampaignsQuery,
  useGetWorkspacesByWidProjectsAndPidCampaignsQuery,
  useGetProjectsByPidCampaignsQuery,
  usePostCampaignsMutation,
} = injectedRtkApi;
