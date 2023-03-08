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
    postAnalyticsViewsCampaignsByCid: build.mutation<
      PostAnalyticsViewsCampaignsByCidApiResponse,
      PostAnalyticsViewsCampaignsByCidApiArg
    >({
      query: (queryArg) => ({
        url: `/analytics/views/campaigns/${queryArg.cid}`,
        method: 'POST',
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
    getCampaignsByCidBugs: build.query<
      GetCampaignsByCidBugsApiResponse,
      GetCampaignsByCidBugsApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns/${queryArg.cid}/bugs`,
        params: {
          limit: queryArg.limit,
          start: queryArg.start,
          order: queryArg.order,
          orderBy: queryArg.orderBy,
          filterBy: queryArg.filterBy,
          search: queryArg.search,
        },
      }),
    }),
    getCampaignsByCidBugTypes: build.query<
      GetCampaignsByCidBugTypesApiResponse,
      GetCampaignsByCidBugTypesApiArg
    >({
      query: (queryArg) => ({ url: `/campaigns/${queryArg.cid}/bugTypes` }),
    }),
    getCampaignsByCidBugsAndBid: build.query<
      GetCampaignsByCidBugsAndBidApiResponse,
      GetCampaignsByCidBugsAndBidApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns/${queryArg.cid}/bugs/${queryArg.bid}`,
      }),
    }),
    patchCampaignsByCidBugsAndBid: build.mutation<
      PatchCampaignsByCidBugsAndBidApiResponse,
      PatchCampaignsByCidBugsAndBidApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns/${queryArg.cid}/bugs/${queryArg.bid}`,
        method: 'PATCH',
        body: queryArg.body,
      }),
    }),
    getCampaignsByCidReplicabilities: build.query<
      GetCampaignsByCidReplicabilitiesApiResponse,
      GetCampaignsByCidReplicabilitiesApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns/${queryArg.cid}/replicabilities`,
      }),
    }),
    getCampaignsByCidBugsAndBidSiblings: build.query<
      GetCampaignsByCidBugsAndBidSiblingsApiResponse,
      GetCampaignsByCidBugsAndBidSiblingsApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns/${queryArg.cid}/bugs/${queryArg.bid}/siblings`,
      }),
    }),
    getCampaignsByCidMeta: build.query<
      GetCampaignsByCidMetaApiResponse,
      GetCampaignsByCidMetaApiArg
    >({
      query: (queryArg) => ({ url: `/campaigns/${queryArg.cid}/meta` }),
    }),
    getCampaignsByCidReports: build.query<
      GetCampaignsByCidReportsApiResponse,
      GetCampaignsByCidReportsApiArg
    >({
      query: (queryArg) => ({ url: `/campaigns/${queryArg.cid}/reports` }),
    }),
    getCampaignsByCidTags: build.query<
      GetCampaignsByCidTagsApiResponse,
      GetCampaignsByCidTagsApiArg
    >({
      query: (queryArg) => ({ url: `/campaigns/${queryArg.cid}/tags` }),
    }),
    getCampaignsByCidDevices: build.query<
      GetCampaignsByCidDevicesApiResponse,
      GetCampaignsByCidDevicesApiArg
    >({
      query: (queryArg) => ({ url: `/campaigns/${queryArg.cid}/devices` }),
    }),
    getCampaignsByCidOs: build.query<
      GetCampaignsByCidOsApiResponse,
      GetCampaignsByCidOsApiArg
    >({
      query: (queryArg) => ({ url: `/campaigns/${queryArg.cid}/os` }),
    }),
    getCampaignsByCidSeverities: build.query<
      GetCampaignsByCidSeveritiesApiResponse,
      GetCampaignsByCidSeveritiesApiArg
    >({
      query: (queryArg) => ({ url: `/campaigns/${queryArg.cid}/severities` }),
    }),
    getCampaignsByCidPriorities: build.query<
      GetCampaignsByCidPrioritiesApiResponse,
      GetCampaignsByCidPrioritiesApiArg
    >({
      query: (queryArg) => ({ url: `/campaigns/${queryArg.cid}/priorities` }),
    }),
    getCampaignsByCidUsecases: build.query<
      GetCampaignsByCidUsecasesApiResponse,
      GetCampaignsByCidUsecasesApiArg
    >({
      query: (queryArg) => ({ url: `/campaigns/${queryArg.cid}/usecases` }),
    }),
    getCampaignsByCidWidgets: build.query<
      GetCampaignsByCidWidgetsApiResponse,
      GetCampaignsByCidWidgetsApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns/${queryArg.cid}/widgets`,
        params: { s: queryArg.s, updateTrend: queryArg.updateTrend },
      }),
    }),
    postProjects: build.mutation<PostProjectsApiResponse, PostProjectsApiArg>({
      query: (queryArg) => ({
        url: `/projects`,
        method: 'POST',
        body: queryArg.body,
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
    getProjectsByPidCampaigns: build.query<
      GetProjectsByPidCampaignsApiResponse,
      GetProjectsByPidCampaignsApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/${queryArg.pid}/campaigns`,
        params: { limit: queryArg.limit, start: queryArg.start },
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
export type GetApiResponse = /** status 200 OK */ {};
export type GetApiArg = void;
export type PostAuthenticateApiResponse = /** status 200 OK */ Authentication;
export type PostAuthenticateApiArg = {
  body: {
    username: string;
    password: string;
  };
};
export type PostAnalyticsViewsCampaignsByCidApiResponse = /** status 200 OK */ {
  success?: boolean;
};
export type PostAnalyticsViewsCampaignsByCidApiArg = {
  /** Campaign id */
  cid: string;
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
export type PatchCampaignsByCidApiResponse = /** status 200 OK */ Campaign;
export type PatchCampaignsByCidApiArg = {
  /** Campaign id */
  cid: string;
  body: {
    customer_title?: string;
  };
};
export type GetCampaignsByCidApiResponse =
  /** status 200 OK */ CampaignWithOutput;
export type GetCampaignsByCidApiArg = {
  /** Campaign id */
  cid: string;
};
export type GetCampaignsByCidBugsApiResponse = /** status 200 OK */ {
  items?: (Bug & {
    tags?: {
      tag_id: number;
      tag_name: string;
    }[];
    siblings: number;
  })[];
  start?: number;
  limit?: number;
  size?: number;
  total?: number;
};
export type GetCampaignsByCidBugsApiArg = {
  /** Campaign id */
  cid: string;
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
  /** keywords to search */
  search?: string;
};
export type GetCampaignsByCidBugTypesApiResponse =
  /** status 200 OK */ BugType[];
export type GetCampaignsByCidBugTypesApiArg = {
  /** Campaign id */
  cid: string;
};
export type GetCampaignsByCidBugsAndBidApiResponse =
  /** status 200 OK */ Bug & {
    media?: BugMedia[];
    tags?: BugTag[];
    additional_fields?: BugAdditionalField[];
    reporter: {
      tester_id: number;
      name: string;
    };
  };
export type GetCampaignsByCidBugsAndBidApiArg = {
  /** Campaign id */
  cid: string;
  /** Defines an identifier for the bug object (BUG ID) */
  bid: string;
};
export type PatchCampaignsByCidBugsAndBidApiResponse = /** status 200 OK */ {
  tags?: {
    tag_id: number;
    tag_name: string;
  }[];
  priority?: BugPriority;
};
export type PatchCampaignsByCidBugsAndBidApiArg = {
  /** Campaign id */
  cid: string;
  /** Defines an identifier for the bug object (BUG ID) */
  bid: string;
  body: {
    tags?: (
      | {
          tag_id: number;
        }
      | {
          tag_name: string;
        }
    )[];
    priority_id?: number;
  };
};
export type GetCampaignsByCidReplicabilitiesApiResponse =
  /** status 200 OK */ BugReplicability[];
export type GetCampaignsByCidReplicabilitiesApiArg = {
  /** Campaign id */
  cid: string;
};
export type GetCampaignsByCidBugsAndBidSiblingsApiResponse =
  /** status 200 OK */ {
    father?: {
      id: number;
      title: {
        full: string;
        compact: string;
        context?: string[];
      };
      context?: string;
      device: string;
      os: {
        name: string;
        version: string;
      };
    };
    siblings: {
      id: number;
      title: {
        full: string;
        compact: string;
        context?: string[];
      };
      context?: string;
      device: string;
      os: {
        name: string;
        version: string;
      };
    }[];
  };
export type GetCampaignsByCidBugsAndBidSiblingsApiArg = {
  /** Campaign id */
  cid: string;
  /** Defines an identifier for the bug object (BUG ID) */
  bid: string;
};
export type GetCampaignsByCidMetaApiResponse = /** status 200 OK */ Campaign & {
  selected_testers: number;
  allowed_devices: string[];
};
export type GetCampaignsByCidMetaApiArg = {
  /** Campaign id */
  cid: string;
};
export type GetCampaignsByCidReportsApiResponse = /** status 200 OK */ Report[];
export type GetCampaignsByCidReportsApiArg = {
  /** Campaign id */
  cid: string;
};
export type GetCampaignsByCidTagsApiResponse = /** status 200 OK */ {
  tag_id: number;
  display_name: string;
  slug: string;
  is_public?: number;
}[];
export type GetCampaignsByCidTagsApiArg = {
  /** Campaign id */
  cid: string;
};
export type GetCampaignsByCidDevicesApiResponse = /** status 200 OK */ {
  device: string;
}[];
export type GetCampaignsByCidDevicesApiArg = {
  /** Campaign id */
  cid: string;
};
export type GetCampaignsByCidOsApiResponse = /** status 200 OK */ {
  os: string;
}[];
export type GetCampaignsByCidOsApiArg = {
  /** Campaign id */
  cid: string;
};
export type GetCampaignsByCidSeveritiesApiResponse =
  /** status 200 OK */ BugSeverity[];
export type GetCampaignsByCidSeveritiesApiArg = {
  /** Campaign id */
  cid: string;
};
export type GetCampaignsByCidPrioritiesApiResponse =
  /** status 200 OK */ BugPriority[];
export type GetCampaignsByCidPrioritiesApiArg = {
  /** Campaign id */
  cid: string;
};
export type GetCampaignsByCidUsecasesApiResponse = /** status 200 OK */ {
  id: number;
  title: {
    full: string;
    simple?: string;
    prefix?: string;
    info?: string;
  };
  completion: number;
}[];
export type GetCampaignsByCidUsecasesApiArg = {
  /** Campaign id */
  cid: string;
};
export type GetCampaignsByCidWidgetsApiResponse =
  /** status 200 OK */
  | WidgetBugsByUseCase
  | WidgetBugsByDevice
  | WidgetCampaignProgress
  | WidgetCampaignUniqueBugs
  | WidgetBugsByDuplicates;
export type GetCampaignsByCidWidgetsApiArg = {
  /** Campaign id */
  cid: number;
  /** Campaign widget slug */
  s:
    | 'bugs-by-usecase'
    | 'bugs-by-device'
    | 'cp-progress'
    | 'unique-bugs'
    | 'bugs-by-duplicates';
  /** should update bug trend after request resolves? */
  updateTrend?: boolean;
};
export type PostProjectsApiResponse = /** status 200 OK */ Project;
export type PostProjectsApiArg = {
  body: {
    name: string;
    customer_id: number;
  };
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
export type GetProjectsByPidCampaignsApiResponse = /** status 200 OK */ {
  items?: CampaignWithOutput[];
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
  items?: CampaignWithOutput[];
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
    items?: CampaignWithOutput[];
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
export type Output = 'bugs' | 'media';
export type CampaignWithOutput = Campaign & {
  outputs?: Output[];
};
export type BugTitle = {
  full: string;
  compact: string;
  context?: string[];
};
export type BugStatus = {
  id: number;
  name: string;
};
export type BugSeverity = {
  id: number;
  name: string;
};
export type BugType = {
  id: number;
  name: string;
};
export type BugReplicability = {
  id: number;
  name: string;
};
export type BugPriority = {
  id: number;
  name: string;
};
export type Smartphone = {
  manufacturer: string;
  model: string;
  os: string;
  os_version: string;
  type: 'smartphone';
};
export type Tablet = {
  manufacturer: string;
  model: string;
  os: string;
  os_version: string;
  type: 'tablet';
};
export type Desktop = {
  desktop_type:
    | 'Desktop'
    | 'Gaming PC'
    | 'Notebook'
    | 'Tablet PC / Hybrid'
    | 'Ultrabook';
  os: string;
  os_version: string;
  type: 'desktop';
};
export type Bug = {
  id: number;
  internal_id: string;
  campaign_id: number;
  title: BugTitle;
  step_by_step: string;
  expected_result: string;
  current_result: string;
  status: BugStatus;
  severity: BugSeverity;
  type: BugType;
  replicability: BugReplicability;
  priority?: BugPriority;
  created: string;
  occurred_date: string;
  updated?: string;
  note?: string;
  device: Smartphone | Tablet | Desktop;
  application_section: {
    id?: number;
    simple_title?: string;
    prefix_title?: string;
    title?: string;
  };
  duplicated_of_id?: number;
  is_favorite?: number;
  read?: boolean;
};
export type BugMedia = {
  mime_type: {
    type: 'video' | 'image' | 'other';
    extension: string;
  };
  url: string;
  creation_date: string;
};
export type BugTag = {
  id: number;
  tag_id: number;
  name: string;
  slug: string;
  bug_id: number;
  campaign_id: number;
  author_wp_id?: number;
  author_tid?: number;
  creation_date: string;
  is_visible_to_customer?: number;
};
export type BugAdditionalFieldRegex = {
  validation: string;
  kind: 'regex';
};
export type BugAdditionalFieldSelect = {
  options: string[];
  kind: 'select';
};
export type BugAdditionalField = {
  id: number;
  name: string;
  value: string;
} & (BugAdditionalFieldRegex | BugAdditionalFieldSelect);
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
export type WidgetBugsByUseCase = {
  data: {
    title: {
      full: string;
      simple?: string;
      prefix?: string;
      info?: string;
    };
    description: string;
    uniqueBugs?: number;
    bugs: number;
    usecase_completion?: number;
    usecase_id: number;
  }[];
  kind: 'bugsByUseCase';
};
export type WidgetBugsByDevice = {
  data: ((Smartphone | Desktop | Tablet) & {
    unique_bugs: number;
    bugs: number;
  })[];
  kind: 'bugsByDevice';
};
export type WidgetCampaignProgress = {
  data: {
    start_date: string;
    end_date: string;
    usecase_completion: 12.5 | 37.5 | 62.5 | 87.5 | 100;
    time_elapsed: number;
    expected_duration: number;
  };
  kind: 'campaignProgress';
};
export type WidgetCampaignUniqueBugs = {
  data: {
    unique: number;
    total: number;
    trend: number;
  };
  kind: 'campaignUniqueBugs';
};
export type WidgetBugsByDuplicates = {
  data: (Bug & {
    duplicates: number;
  })[];
  kind: 'bugsByDuplicates';
};
export type Project = {
  id: number;
  name: string;
  campaigns_count: number;
  workspaceId: number;
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
  usePostAnalyticsViewsCampaignsByCidMutation,
  usePostCampaignsMutation,
  usePatchCampaignsByCidMutation,
  useGetCampaignsByCidQuery,
  useGetCampaignsByCidBugsQuery,
  useGetCampaignsByCidBugTypesQuery,
  useGetCampaignsByCidBugsAndBidQuery,
  usePatchCampaignsByCidBugsAndBidMutation,
  useGetCampaignsByCidReplicabilitiesQuery,
  useGetCampaignsByCidBugsAndBidSiblingsQuery,
  useGetCampaignsByCidMetaQuery,
  useGetCampaignsByCidReportsQuery,
  useGetCampaignsByCidTagsQuery,
  useGetCampaignsByCidDevicesQuery,
  useGetCampaignsByCidOsQuery,
  useGetCampaignsByCidSeveritiesQuery,
  useGetCampaignsByCidPrioritiesQuery,
  useGetCampaignsByCidUsecasesQuery,
  useGetCampaignsByCidWidgetsQuery,
  usePostProjectsMutation,
  useGetProjectsByPidQuery,
  usePatchProjectsByPidMutation,
  useGetProjectsByPidCampaignsQuery,
  useGetTemplatesQuery,
  useGetUsersMeQuery,
  useGetWorkspacesQuery,
  useGetWorkspacesByWidQuery,
  useGetWorkspacesByWidCampaignsQuery,
  useGetWorkspacesByWidCoinsQuery,
  useGetWorkspacesByWidProjectsQuery,
  useGetWorkspacesByWidProjectsAndPidQuery,
  useGetWorkspacesByWidProjectsAndPidCampaignsQuery,
} = injectedRtkApi;
