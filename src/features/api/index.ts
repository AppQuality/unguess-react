import { apiSlice as api } from './api';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    get: build.query<GetApiResponse, GetApiArg>({
      query: () => ({ url: `/` }),
    }),
    postAuthenticate: build.mutation<
      PostAuthenticateApiResponse,
      PostAuthenticateApiArg
    >({
      query: (queryArg) => ({
        url: `/authenticate`,
        method: 'POST',
        body: queryArg.body,
      }),
    }),
    getUsersMe: build.query<GetUsersMeApiResponse, GetUsersMeApiArg>({
      query: () => ({ url: `/users/me` }),
    }),
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
    postCampaigns: build.mutation<
      PostCampaignsApiResponse,
      PostCampaignsApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns`,
        method: 'POST',
        body: queryArg.body,
      }),
    }),
    postProjects: build.mutation<PostProjectsApiResponse, PostProjectsApiArg>({
      query: (queryArg) => ({
        url: `/projects`,
        method: 'POST',
        body: queryArg.body,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as unguessApi };
export type GetApiResponse = /** status 200 OK */ {};
export type GetApiArg = void;
export type PostAuthenticateApiResponse = /** status 200 OK */ Authentication;
export type PostAuthenticateApiArg = {
  body: {
    username: string;
    password: string;
  };
};
export type GetUsersMeApiResponse = /** status 200  */ User;
export type GetUsersMeApiArg = void;
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
export type PostCampaignsApiResponse = /** status 200 OK */ Campaign;
export type PostCampaignsApiArg = {
  body: {
    title: string;
    start_date: string;
    end_date: string;
    close_date: string;
    customer_title?: string;
    status_id?: number;
    is_public?: number;
    campaign_type_id: number;
    project_id: number;
    pm_id: number;
    platforms?: PlatformObject[];
    page_preview_id?: number;
    page_manual_id?: number;
    customer_id?: number;
    has_bug_form?: number;
    has_bug_parade?: number;
  };
};
export type PostProjectsApiResponse = /** status 200 OK */ Project;
export type PostProjectsApiArg = {
  body: {
    name: string;
    customer_id: number;
  };
};
export type Error = {
  message: string;
  code: number;
  error: boolean;
};
export type Authentication = {
  id: number;
  email: string;
  role: string;
  name: string;
  picture?: string;
  token: string;
  iat?: number;
  exp?: number;
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
export type Feature = {
  slug?: string;
  name?: string;
};
export type User = {
  id: number;
  email: string;
  role: string;
  name: string;
  workspaces: Workspace[];
  profile_id: number;
  tryber_wp_user_id: number;
  unguess_wp_user_id: number;
  picture?: string;
  features?: Feature[];
};
export type Campaign = {
  id: number;
  start_date: string;
  end_date: string;
  close_date: string;
  title: string;
  customer_title: string;
  status_id: number;
  status_name: string;
  is_public: number;
  campaign_type_id: number;
  campaign_type_name: string;
  campaign_family_id?: number;
  campaign_family_name: string;
  project_id: number;
  project_name: string;
  bug_form?: number;
};
export type Project = {
  id: number;
  name: string;
  campaigns_count: number;
};
export type PlatformObject = {
  id: number;
  deviceType: number;
};
export const {
  useGetQuery,
  usePostAuthenticateMutation,
  useGetUsersMeQuery,
  useGetWorkspacesQuery,
  useGetWorkspacesByWidQuery,
  useGetWorkspacesByWidCampaignsQuery,
  useGetWorkspacesByWidProjectsQuery,
  useGetWorkspacesByWidProjectsAndPidQuery,
  useGetWorkspacesByWidProjectsAndPidCampaignsQuery,
  useGetProjectsByPidCampaignsQuery,
  useGetProjectsByPidQuery,
  usePostCampaignsMutation,
  usePostProjectsMutation,
} = injectedRtkApi;
