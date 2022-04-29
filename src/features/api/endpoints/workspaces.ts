import { apiSlice as api } from "../api";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getWorkspaces: build.query<GetWorkspacesApiResponse, GetWorkspacesApiArg>({
      query: (queryArg) => ({
        url: `/workspaces`,
        params: { limit: queryArg.limit, start: queryArg.start },
      }),
    }),
    getWorkspacesByWid: build.query<
      GetWorkspacesByWidApiResponse,
      GetWorkspacesByWidApiArg
    >({
      query: (queryArg) => ({ url: `/workspaces/${queryArg.wid}` }),
    }),
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
    getWorkspacesByWidProjects: build.query<
      GetWorkspacesByWidProjectsApiResponse,
      GetWorkspacesByWidProjectsApiArg
    >({
      query: (queryArg) => ({
        url: `/workspaces/${queryArg.wid}/projects`,
        params: { limit: queryArg.limit, start: queryArg.start },
      }),
    }),
    getWorkspacesByWidProjectsAndPid: build.query<
      GetWorkspacesByWidProjectsAndPidApiResponse,
      GetWorkspacesByWidProjectsAndPidApiArg
    >({
      query: (queryArg) => ({
        url: `/workspaces/${queryArg.wid}/projects/${queryArg.pid}`,
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
  }),
  overrideExisting: false,
});
export { injectedRtkApi as unguessApi };
export type GetWorkspacesApiResponse = /** status 200 OK */ {
  items?: Workspace[];
  start?: number;
  limit?: number;
  size?: number;
  total?: number;
};
export type GetWorkspacesApiArg = {
  /** Limit pagination parameter */
  limit?: number;
  /** Start pagination parameter */
  start?: number;
};
export type GetWorkspacesByWidApiResponse = /** status 200 OK */ Workspace;
export type GetWorkspacesByWidApiArg = {
  /** Workspace (company, customer) id */
  wid: number;
};
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
export type GetWorkspacesByWidProjectsApiResponse = /** status 200 OK */ {
  items?: Project[];
  start?: number;
  limit?: number;
  size?: number;
  total?: number;
};
export type GetWorkspacesByWidProjectsApiArg = {
  /** Workspace (company, customer) id */
  wid: number;
  /** Limit pagination parameter */
  limit?: number;
  /** Start pagination parameter */
  start?: number;
};
export type GetWorkspacesByWidProjectsAndPidApiResponse =
  /** status 200 OK */ Project;
export type GetWorkspacesByWidProjectsAndPidApiArg = {
  /** Workspace (company, customer) id */
  wid: number;
  /** Project id */
  pid: number;
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
export type Workspace = {
  id: number;
  company: string;
  tokens: number;
  logo?: string;
  csm: {
    id: number;
    email: string;
    name: string;
    profile_id: number;
    tryber_wp_user_id: number;
    picture?: string;
  };
};
export type Error = {
  message: string;
  code: number;
  error: boolean;
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
export type Project = {
  id: number;
  name: string;
  campaigns_count: number;
};
export const {
  useGetWorkspacesQuery,
  useGetWorkspacesByWidQuery,
  useGetWorkspacesByWidCampaignsQuery,
  useGetWorkspacesByWidProjectsQuery,
  useGetWorkspacesByWidProjectsAndPidQuery,
  useGetWorkspacesByWidProjectsAndPidCampaignsQuery,
} = injectedRtkApi;
