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
        params: {
          limit: queryArg.limit,
          start: queryArg.start,
          order: queryArg.order,
          orderBy: queryArg.orderBy,
        },
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
    patchProjectsByPid: build.mutation<
      PatchProjectsByPidApiResponse,
      PatchProjectsByPidApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/${queryArg.pid}`,
        method: 'PATCH',
        body: queryArg.body,
      }),
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
    patchCampaignsByCid: build.mutation<
      PatchCampaignsByCidApiResponse,
      PatchCampaignsByCidApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns/${queryArg.cid}`,
        method: 'PATCH',
        body: queryArg.body,
      }),
    }),
    getCampaignsByCid: build.query<
      GetCampaignsByCidApiResponse,
      GetCampaignsByCidApiArg
    >({
      query: (queryArg) => ({ url: `/campaigns/${queryArg.cid}` }),
    }),
    getCampaignsByCidReports: build.query<
      GetCampaignsByCidReportsApiResponse,
      GetCampaignsByCidReportsApiArg
    >({
      query: (queryArg) => ({ url: `/campaigns/${queryArg.cid}/reports` }),
    }),
    postProjects: build.mutation<PostProjectsApiResponse, PostProjectsApiArg>({
      query: (queryArg) => ({
        url: `/projects`,
        method: 'POST',
        body: queryArg.body,
      }),
    }),
    getWorkspacesByWidCoins: build.query<
      GetWorkspacesByWidCoinsApiResponse,
      GetWorkspacesByWidCoinsApiArg
    >({
      query: (queryArg) => ({
        url: `/workspaces/${queryArg.wid}/coins`,
        params: {
          limit: queryArg.limit,
          start: queryArg.start,
          order: queryArg.order,
          orderBy: queryArg.orderBy,
        },
      }),
    }),
    getTemplates: build.query<GetTemplatesApiResponse, GetTemplatesApiArg>({
      query: (queryArg) => ({
        url: `/templates`,
        params: {
          filterBy: queryArg.filterBy,
          order: queryArg.order,
          orderBy: queryArg.orderBy,
        },
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
  /** Order value (ASC, DESC) */
  order?: string;
  /** Order by accepted field */
  orderBy?: string;
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
export type PatchProjectsByPidApiResponse = /** status 200 OK */ Project;
export type PatchProjectsByPidApiArg = {
  /** Project id */
  pid: number;
  body: {
    display_name: string;
  };
};
export type PostCampaignsApiResponse = /** status 200 OK */ Campaign2;
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
    platforms: PlatformObject[];
    page_preview_id?: number;
    page_manual_id?: number;
    customer_id: number;
    has_bug_form?: number;
    has_bug_parade?: number;
    description?: string;
    base_bug_internal_id?: string;
    express_slug: string;
    use_cases?: UseCase[];
  };
};
export type PatchCampaignsByCidApiResponse = /** status 200 OK */ Campaign2;
export type PatchCampaignsByCidApiArg = {
  /** Campaign id */
  cid: number;
  body: {
    customer_title?: string;
  };
};
export type GetCampaignsByCidApiResponse = /** status 200 OK */ Campaign;
export type GetCampaignsByCidApiArg = {
  /** Campaign id */
  cid: number;
};
export type GetCampaignsByCidReportsApiResponse = /** status 200 OK */ Report[];
export type GetCampaignsByCidReportsApiArg = {
  /** Campaign id */
  cid: number;
};
export type PostProjectsApiResponse = /** status 200 OK */ Project;
export type PostProjectsApiArg = {
  body: {
    name: string;
    customer_id: number;
  };
};
export type GetWorkspacesByWidCoinsApiResponse = /** status 200 OK */ {
  items?: Coin[];
  start?: number;
  limit?: number;
  size?: number;
  total?: number;
};
export type GetWorkspacesByWidCoinsApiArg = {
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
};
export type GetTemplatesApiResponse = /** status 200 OK */ ({
  id?: number;
} & Template)[];
export type GetTemplatesApiArg = {
  /** filterBy[<fieldName>]=<fieldValue> */
  filterBy?: any;
  /** Order value (ASC, DESC) */
  order?: string;
  /** Order by accepted field */
  orderBy?: string;
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
export type Feature = {
  slug?: string;
  name?: string;
};
export type User = {
  id: number;
  email: string;
  role: string;
  name: string;
  profile_id: number;
  tryber_wp_user_id: number;
  unguess_wp_user_id: number;
  picture?: string;
  features?: Feature[];
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
    url?: string;
  };
  coins?: number;
};
export type Output = 'bugs' | 'media';
export type Campaign = {
  id: number;
  start_date: string;
  end_date: string;
  close_date: string;
  title: string;
  customer_title: string;
  is_public: number;
  bug_form?: number;
  type: {
    id: number;
    name: string;
  };
  family: {
    id: number;
    name: string;
  };
  status: {
    id: number;
    name: string;
  };
  project: {
    id: number;
    name: string;
  };
  description?: string;
  base_bug_internal_id?: string;
  outputs?: Output[];
};
export type Project = {
  id: number;
  name: string;
  campaigns_count: number;
  workspaceId: number;
};
export type Campaign2 = {
  id: number;
  start_date: string;
  end_date: string;
  close_date: string;
  title: string;
  customer_title: string;
  is_public: number;
  bug_form?: number;
  type: {
    id: number;
    name: string;
  };
  family: {
    id: number;
    name: string;
  };
  status: {
    id: number;
    name: string;
  };
  project: {
    id: number;
    name: string;
  };
  description?: string;
  base_bug_internal_id?: string;
};
export type PlatformObject = {
  id: number;
  deviceType: number;
};
export type TemplateCategory = {
  id?: number;
  name: string;
};
export type Template = {
  title: string;
  description?: string;
  content?: string;
  category?: TemplateCategory;
  device_type?: 'webapp' | 'mobileapp';
  locale?: 'en' | 'it';
  image?: string;
  requiresLogin?: boolean;
};
export type UseCase = {
  title: string;
  description: string;
  functionality?: {
    id?: number;
  } & Template;
  logged?: boolean;
  link?: string;
};
export type ReportExtensions =
  | 'pdf'
  | 'doc'
  | 'docx'
  | 'xls'
  | 'xlsx'
  | 'ppt'
  | 'pptx'
  | 'rar'
  | 'txt'
  | 'csv'
  | 'zip'
  | 'gzip'
  | 'gz'
  | '7z';
export type Report = {
  id?: number;
  title?: string;
  description?: string;
  url: string;
  file_type?: {
    extension?: ReportExtensions;
    type: string;
    domain_name?: string;
  };
  creation_date?: string;
  update_date?: string;
};
export type Coin = {
  id: number;
  customer_id: number;
  amount: number;
  agreement_id?: number;
  price?: number;
  created_on?: string;
  updated_on?: string;
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
  usePatchProjectsByPidMutation,
  usePostCampaignsMutation,
  usePatchCampaignsByCidMutation,
  useGetCampaignsByCidQuery,
  useGetCampaignsByCidReportsQuery,
  usePostProjectsMutation,
  useGetWorkspacesByWidCoinsQuery,
  useGetTemplatesQuery,
} = injectedRtkApi;
