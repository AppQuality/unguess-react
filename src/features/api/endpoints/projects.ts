import { apiSlice as api } from "../api";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
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
    getProjectsByPidCampaigns: build.query<
      GetProjectsByPidCampaignsApiResponse,
      GetProjectsByPidCampaignsApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/${queryArg.pid}/campaigns`,
        params: { limit: queryArg.limit, start: queryArg.start },
      }),
    }),
    getProjectsByPid: build.query<
      GetProjectsByPidApiResponse,
      GetProjectsByPidApiArg
    >({
      query: (queryArg) => ({ url: `/projects/${queryArg.pid}` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as unguessApi };
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
export type GetProjectsByPidApiResponse = /** status 200 OK */ Project;
export type GetProjectsByPidApiArg = {
  /** Project id */
  pid: number;
};
export type Project = {
  id: number;
  name: string;
  campaigns_count: number;
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
  status_name: string;
  is_public: number;
  campaign_type_id: number;
  campaign_type_name: string;
  test_type_name: string;
  project_id: number;
  project_name: string;
};
export const {
  useGetWorkspacesByWidProjectsQuery,
  useGetWorkspacesByWidProjectsAndPidQuery,
  useGetWorkspacesByWidProjectsAndPidCampaignsQuery,
  useGetProjectsByPidCampaignsQuery,
  useGetProjectsByPidQuery,
} = injectedRtkApi;
