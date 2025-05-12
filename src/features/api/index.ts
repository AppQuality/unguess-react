import { apiSlice as api } from './api';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    $get: build.query<$getApiResponse, $getApiArg>({
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
    getCampaignsByCidBugTypes: build.query<
      GetCampaignsByCidBugTypesApiResponse,
      GetCampaignsByCidBugTypesApiArg
    >({
      query: (queryArg) => ({ url: `/campaigns/${queryArg.cid}/bugTypes` }),
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
    getCampaignsByCidBugsAndBidComments: build.query<
      GetCampaignsByCidBugsAndBidCommentsApiResponse,
      GetCampaignsByCidBugsAndBidCommentsApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns/${queryArg.cid}/bugs/${queryArg.bid}/comments`,
      }),
    }),
    postCampaignsByCidBugsAndBidComments: build.mutation<
      PostCampaignsByCidBugsAndBidCommentsApiResponse,
      PostCampaignsByCidBugsAndBidCommentsApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns/${queryArg.cid}/bugs/${queryArg.bid}/comments`,
        method: 'POST',
        body: queryArg.body,
      }),
    }),
    postCampaignsByCidBugsAndBidMedia: build.mutation<
      PostCampaignsByCidBugsAndBidMediaApiResponse,
      PostCampaignsByCidBugsAndBidMediaApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns/${queryArg.cid}/bugs/${queryArg.bid}/media`,
        method: 'POST',
        body: queryArg.body,
      }),
    }),
    postCampaignsByCidBugsAndBidCommentsCmid: build.mutation<
      PostCampaignsByCidBugsAndBidCommentsCmidApiResponse,
      PostCampaignsByCidBugsAndBidCommentsCmidApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns/${queryArg.cid}/bugs/${queryArg.bid}/comments/${queryArg.cmid}`,
        method: 'POST',
        body: queryArg.body,
      }),
    }),
    deleteCampaignsByCidBugsAndBidCommentsCmid: build.mutation<
      DeleteCampaignsByCidBugsAndBidCommentsCmidApiResponse,
      DeleteCampaignsByCidBugsAndBidCommentsCmidApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns/${queryArg.cid}/bugs/${queryArg.bid}/comments/${queryArg.cmid}`,
        method: 'DELETE',
        body: queryArg.body,
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
    getCampaignsByCidClusters: build.query<
      GetCampaignsByCidClustersApiResponse,
      GetCampaignsByCidClustersApiArg
    >({
      query: (queryArg) => ({ url: `/campaigns/${queryArg.cid}/clusters` }),
    }),
    getCampaignsByCidCustomStatuses: build.query<
      GetCampaignsByCidCustomStatusesApiResponse,
      GetCampaignsByCidCustomStatusesApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns/${queryArg.cid}/custom_statuses`,
      }),
    }),
    patchCampaignsByCidCustomStatuses: build.mutation<
      PatchCampaignsByCidCustomStatusesApiResponse,
      PatchCampaignsByCidCustomStatusesApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns/${queryArg.cid}/custom_statuses`,
        method: 'PATCH',
        body: queryArg.body,
      }),
    }),
    deleteCampaignsByCidCustomStatuses: build.mutation<
      DeleteCampaignsByCidCustomStatusesApiResponse,
      DeleteCampaignsByCidCustomStatusesApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns/${queryArg.cid}/custom_statuses`,
        method: 'DELETE',
        body: queryArg.body,
      }),
    }),
    getCampaignsByCidDevices: build.query<
      GetCampaignsByCidDevicesApiResponse,
      GetCampaignsByCidDevicesApiArg
    >({
      query: (queryArg) => ({ url: `/campaigns/${queryArg.cid}/devices` }),
    }),
    putCampaignsByCidFindingsAndFid: build.mutation<
      PutCampaignsByCidFindingsAndFidApiResponse,
      PutCampaignsByCidFindingsAndFidApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns/${queryArg.cid}/findings/${queryArg.fid}`,
        method: 'PUT',
        body: queryArg.body,
      }),
    }),
    postCampaignsByCidInsights: build.mutation<
      PostCampaignsByCidInsightsApiResponse,
      PostCampaignsByCidInsightsApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns/${queryArg.cid}/insights`,
        method: 'POST',
        body: queryArg.body,
      }),
    }),
    getCampaignsByCidInsights: build.query<
      GetCampaignsByCidInsightsApiResponse,
      GetCampaignsByCidInsightsApiArg
    >({
      query: (queryArg) => ({ url: `/campaigns/${queryArg.cid}/insights` }),
    }),
    getCampaignsByCidMeta: build.query<
      GetCampaignsByCidMetaApiResponse,
      GetCampaignsByCidMetaApiArg
    >({
      query: (queryArg) => ({ url: `/campaigns/${queryArg.cid}/meta` }),
    }),
    getCampaignsByCidObservations: build.query<
      GetCampaignsByCidObservationsApiResponse,
      GetCampaignsByCidObservationsApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns/${queryArg.cid}/observations`,
        params: { groupBy: queryArg.groupBy },
      }),
    }),
    getCampaignsByCidOs: build.query<
      GetCampaignsByCidOsApiResponse,
      GetCampaignsByCidOsApiArg
    >({
      query: (queryArg) => ({ url: `/campaigns/${queryArg.cid}/os` }),
    }),
    getCampaignsByCidPriorities: build.query<
      GetCampaignsByCidPrioritiesApiResponse,
      GetCampaignsByCidPrioritiesApiArg
    >({
      query: (queryArg) => ({ url: `/campaigns/${queryArg.cid}/priorities` }),
    }),
    getCampaignsByCidReplicabilities: build.query<
      GetCampaignsByCidReplicabilitiesApiResponse,
      GetCampaignsByCidReplicabilitiesApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns/${queryArg.cid}/replicabilities`,
      }),
    }),
    getCampaignsByCidReports: build.query<
      GetCampaignsByCidReportsApiResponse,
      GetCampaignsByCidReportsApiArg
    >({
      query: (queryArg) => ({ url: `/campaigns/${queryArg.cid}/reports` }),
    }),
    getCampaignsByCidSeverities: build.query<
      GetCampaignsByCidSeveritiesApiResponse,
      GetCampaignsByCidSeveritiesApiArg
    >({
      query: (queryArg) => ({ url: `/campaigns/${queryArg.cid}/severities` }),
    }),
    getCampaignsByCidSuggestions: build.query<
      GetCampaignsByCidSuggestionsApiResponse,
      GetCampaignsByCidSuggestionsApiArg
    >({
      query: (queryArg) => ({ url: `/campaigns/${queryArg.cid}/suggestions` }),
    }),
    postCampaignsByCidSuggestions: build.mutation<
      PostCampaignsByCidSuggestionsApiResponse,
      PostCampaignsByCidSuggestionsApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns/${queryArg.cid}/suggestions`,
        method: 'POST',
        body: queryArg.body,
      }),
    }),
    getCampaignsByCidTags: build.query<
      GetCampaignsByCidTagsApiResponse,
      GetCampaignsByCidTagsApiArg
    >({
      query: (queryArg) => ({ url: `/campaigns/${queryArg.cid}/tags` }),
    }),
    getCampaignsByCidUsecases: build.query<
      GetCampaignsByCidUsecasesApiResponse,
      GetCampaignsByCidUsecasesApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns/${queryArg.cid}/usecases`,
        params: { filterBy: queryArg.filterBy },
      }),
    }),
    getCampaignsByCidUsers: build.query<
      GetCampaignsByCidUsersApiResponse,
      GetCampaignsByCidUsersApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns/${queryArg.cid}/users`,
        params: {
          limit: queryArg.limit,
          start: queryArg.start,
          order: queryArg.order,
          orderBy: queryArg.orderBy,
        },
      }),
    }),
    postCampaignsByCidUsers: build.mutation<
      PostCampaignsByCidUsersApiResponse,
      PostCampaignsByCidUsersApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns/${queryArg.cid}/users`,
        method: 'POST',
        body: queryArg.body,
      }),
    }),
    deleteCampaignsByCidUsers: build.mutation<
      DeleteCampaignsByCidUsersApiResponse,
      DeleteCampaignsByCidUsersApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns/${queryArg.cid}/users`,
        method: 'DELETE',
        body: queryArg.body,
      }),
    }),
    getCampaignsByCidUx: build.query<
      GetCampaignsByCidUxApiResponse,
      GetCampaignsByCidUxApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns/${queryArg.cid}/ux`,
        params: {
          showAsCustomer: queryArg.showAsCustomer,
          filterBy: queryArg.filterBy,
        },
      }),
    }),
    getCampaignsByCidVideoTags: build.query<
      GetCampaignsByCidVideoTagsApiResponse,
      GetCampaignsByCidVideoTagsApiArg
    >({
      query: (queryArg) => ({ url: `/campaigns/${queryArg.cid}/video-tags` }),
    }),
    postCampaignsByCidVideoTags: build.mutation<
      PostCampaignsByCidVideoTagsApiResponse,
      PostCampaignsByCidVideoTagsApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns/${queryArg.cid}/video-tags`,
        method: 'POST',
        body: queryArg.body,
      }),
    }),
    getCampaignsByCidVideos: build.query<
      GetCampaignsByCidVideosApiResponse,
      GetCampaignsByCidVideosApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns/${queryArg.cid}/videos`,
        params: {
          limit: queryArg.limit,
          start: queryArg.start,
          order: queryArg.order,
          orderBy: queryArg.orderBy,
          filterBy: queryArg.filterBy,
        },
      }),
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
    getInsightsByIid: build.query<
      GetInsightsByIidApiResponse,
      GetInsightsByIidApiArg
    >({
      query: (queryArg) => ({ url: `/insights/${queryArg.iid}` }),
    }),
    deleteInsightsByIid: build.mutation<
      DeleteInsightsByIidApiResponse,
      DeleteInsightsByIidApiArg
    >({
      query: (queryArg) => ({
        url: `/insights/${queryArg.iid}`,
        method: 'DELETE',
      }),
    }),
    patchInsightsByIid: build.mutation<
      PatchInsightsByIidApiResponse,
      PatchInsightsByIidApiArg
    >({
      query: (queryArg) => ({
        url: `/insights/${queryArg.iid}`,
        method: 'PATCH',
        body: queryArg.body,
      }),
    }),
    getMediaById: build.query<GetMediaByIdApiResponse, GetMediaByIdApiArg>({
      query: (queryArg) => ({ url: `/media/${queryArg.id}` }),
    }),
    deleteMediaCommentByMcid: build.mutation<
      DeleteMediaCommentByMcidApiResponse,
      DeleteMediaCommentByMcidApiArg
    >({
      query: (queryArg) => ({
        url: `/media-comment/${queryArg.mcid}`,
        method: 'DELETE',
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
    deleteProjectsByPid: build.mutation<
      DeleteProjectsByPidApiResponse,
      DeleteProjectsByPidApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/${queryArg.pid}`,
        method: 'DELETE',
      }),
    }),
    getProjectsByPidCampaigns: build.query<
      GetProjectsByPidCampaignsApiResponse,
      GetProjectsByPidCampaignsApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/${queryArg.pid}/campaigns`,
        params: {
          limit: queryArg.limit,
          start: queryArg.start,
          order: queryArg.order,
          orderBy: queryArg.orderBy,
        },
      }),
    }),
    getProjectsByPidUsers: build.query<
      GetProjectsByPidUsersApiResponse,
      GetProjectsByPidUsersApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/${queryArg.pid}/users`,
        params: {
          limit: queryArg.limit,
          start: queryArg.start,
          order: queryArg.order,
          orderBy: queryArg.orderBy,
        },
      }),
    }),
    postProjectsByPidUsers: build.mutation<
      PostProjectsByPidUsersApiResponse,
      PostProjectsByPidUsersApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/${queryArg.pid}/users`,
        method: 'POST',
        body: queryArg.body,
      }),
    }),
    deleteProjectsByPidUsers: build.mutation<
      DeleteProjectsByPidUsersApiResponse,
      DeleteProjectsByPidUsersApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/${queryArg.pid}/users`,
        method: 'DELETE',
        body: queryArg.body,
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
    getUsersMePreferences: build.query<
      GetUsersMePreferencesApiResponse,
      GetUsersMePreferencesApiArg
    >({
      query: () => ({ url: `/users/me/preferences` }),
    }),
    putUsersMePreferencesBySlug: build.mutation<
      PutUsersMePreferencesBySlugApiResponse,
      PutUsersMePreferencesBySlugApiArg
    >({
      query: (queryArg) => ({
        url: `/users/me/preferences/${queryArg.slug}`,
        method: 'PUT',
        body: queryArg.body,
      }),
    }),
    getVideosByVid: build.query<
      GetVideosByVidApiResponse,
      GetVideosByVidApiArg
    >({
      query: (queryArg) => ({ url: `/videos/${queryArg.vid}` }),
    }),
    getVideosByVidObservations: build.query<
      GetVideosByVidObservationsApiResponse,
      GetVideosByVidObservationsApiArg
    >({
      query: (queryArg) => ({ url: `/videos/${queryArg.vid}/observations` }),
    }),
    postVideosByVidObservations: build.mutation<
      PostVideosByVidObservationsApiResponse,
      PostVideosByVidObservationsApiArg
    >({
      query: (queryArg) => ({
        url: `/videos/${queryArg.vid}/observations`,
        method: 'POST',
        body: queryArg.body,
      }),
    }),
    patchVideosByVidObservationsAndOid: build.mutation<
      PatchVideosByVidObservationsAndOidApiResponse,
      PatchVideosByVidObservationsAndOidApiArg
    >({
      query: (queryArg) => ({
        url: `/videos/${queryArg.vid}/observations/${queryArg.oid}`,
        method: 'PATCH',
        body: queryArg.body,
      }),
    }),
    deleteVideosByVidObservationsAndOid: build.mutation<
      DeleteVideosByVidObservationsAndOidApiResponse,
      DeleteVideosByVidObservationsAndOidApiArg
    >({
      query: (queryArg) => ({
        url: `/videos/${queryArg.vid}/observations/${queryArg.oid}`,
        method: 'DELETE',
      }),
    }),
    getVideosByVidTranslation: build.query<
      GetVideosByVidTranslationApiResponse,
      GetVideosByVidTranslationApiArg
    >({
      query: (queryArg) => ({
        url: `/videos/${queryArg.vid}/translation`,
        params: { lang: queryArg.lang },
      }),
    }),
    postVideosByVidTranslation: build.mutation<
      PostVideosByVidTranslationApiResponse,
      PostVideosByVidTranslationApiArg
    >({
      query: (queryArg) => ({
        url: `/videos/${queryArg.vid}/translation`,
        method: 'POST',
        body: queryArg.body,
      }),
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
    postWorkspaces: build.mutation<
      PostWorkspacesApiResponse,
      PostWorkspacesApiArg
    >({
      query: (queryArg) => ({
        url: `/workspaces`,
        method: 'POST',
        body: queryArg.body,
      }),
    }),
    getWorkspacesByWid: build.query<
      GetWorkspacesByWidApiResponse,
      GetWorkspacesByWidApiArg
    >({
      query: (queryArg) => ({ url: `/workspaces/${queryArg.wid}` }),
    }),
    getWorkspacesByWidArchive: build.query<
      GetWorkspacesByWidArchiveApiResponse,
      GetWorkspacesByWidArchiveApiArg
    >({
      query: (queryArg) => ({ url: `/workspaces/${queryArg.wid}/archive` }),
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
    postWorkspacesByWidPlans: build.mutation<
      PostWorkspacesByWidPlansApiResponse,
      PostWorkspacesByWidPlansApiArg
    >({
      query: (queryArg) => ({
        url: `/workspaces/${queryArg.wid}/plans`,
        method: 'POST',
        body: queryArg.body,
      }),
    }),
    getWorkspacesByWidPlans: build.query<
      GetWorkspacesByWidPlansApiResponse,
      GetWorkspacesByWidPlansApiArg
    >({
      query: (queryArg) => ({
        url: `/workspaces/${queryArg.wid}/plans`,
        params: {
          orderBy: queryArg.orderBy,
          order: queryArg.order,
          filterBy: queryArg.filterBy,
          limit: queryArg.limit,
        },
      }),
    }),
    deletePlansByPid: build.mutation<
      DeletePlansByPidApiResponse,
      DeletePlansByPidApiArg
    >({
      query: (queryArg) => ({
        url: `/plans/${queryArg.pid}`,
        method: 'DELETE',
      }),
    }),
    getPlansByPid: build.query<GetPlansByPidApiResponse, GetPlansByPidApiArg>({
      query: (queryArg) => ({ url: `/plans/${queryArg.pid}` }),
    }),
    patchPlansByPid: build.mutation<
      PatchPlansByPidApiResponse,
      PatchPlansByPidApiArg
    >({
      query: (queryArg) => ({
        url: `/plans/${queryArg.pid}`,
        method: 'PATCH',
        body: queryArg.body,
      }),
    }),
    patchPlansByPidStatus: build.mutation<
      PatchPlansByPidStatusApiResponse,
      PatchPlansByPidStatusApiArg
    >({
      query: (queryArg) => ({
        url: `/plans/${queryArg.pid}/status`,
        method: 'PATCH',
        body: queryArg.body,
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
    getWorkspacesByWidTemplates: build.query<
      GetWorkspacesByWidTemplatesApiResponse,
      GetWorkspacesByWidTemplatesApiArg
    >({
      query: (queryArg) => ({
        url: `/workspaces/${queryArg.wid}/templates`,
        params: {
          limit: queryArg.limit,
          start: queryArg.start,
          orderBy: queryArg.orderBy,
          order: queryArg.order,
          filterBy: queryArg.filterBy,
        },
      }),
    }),
    deleteWorkspacesByWidTemplatesAndTid: build.mutation<
      DeleteWorkspacesByWidTemplatesAndTidApiResponse,
      DeleteWorkspacesByWidTemplatesAndTidApiArg
    >({
      query: (queryArg) => ({
        url: `/workspaces/${queryArg.wid}/templates/${queryArg.tid}`,
        method: 'DELETE',
      }),
    }),
    getWorkspacesByWidTemplatesAndTid: build.query<
      GetWorkspacesByWidTemplatesAndTidApiResponse,
      GetWorkspacesByWidTemplatesAndTidApiArg
    >({
      query: (queryArg) => ({
        url: `/workspaces/${queryArg.wid}/templates/${queryArg.tid}`,
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
    getWorkspacesByWidUsers: build.query<
      GetWorkspacesByWidUsersApiResponse,
      GetWorkspacesByWidUsersApiArg
    >({
      query: (queryArg) => ({
        url: `/workspaces/${queryArg.wid}/users`,
        params: {
          limit: queryArg.limit,
          start: queryArg.start,
          order: queryArg.order,
          orderBy: queryArg.orderBy,
        },
      }),
    }),
    postWorkspacesByWidUsers: build.mutation<
      PostWorkspacesByWidUsersApiResponse,
      PostWorkspacesByWidUsersApiArg
    >({
      query: (queryArg) => ({
        url: `/workspaces/${queryArg.wid}/users`,
        method: 'POST',
        body: queryArg.body,
      }),
    }),
    deleteWorkspacesByWidUsers: build.mutation<
      DeleteWorkspacesByWidUsersApiResponse,
      DeleteWorkspacesByWidUsersApiArg
    >({
      query: (queryArg) => ({
        url: `/workspaces/${queryArg.wid}/users`,
        method: 'DELETE',
        body: queryArg.body,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as unguessApi };
export type $getApiResponse = /** status 200 OK */ {};
export type $getApiArg = void;
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
    /** Da togliere */
    page_preview_id?: number;
    /** Da togliere */
    page_manual_id?: number;
    /** Used to check available coins */
    customer_id: number;
    has_bug_form?: number;
    /** if has_bug_form is 0 this has to be 0 */
    has_bug_parade?: number;
    description?: string;
    base_bug_internal_id?: string;
    express_slug: string;
    use_cases?: UseCase[];
    productType?: number;
    productLink?: string;
    browsers?: number[];
    languages?: string[];
    outOfScope?: string;
    testerRequirements?: string;
    targetSize?: number;
    goal?: string;
    testDescription?: string;
  };
};
export type PatchCampaignsByCidApiResponse = /** status 200 OK */ Campaign;
export type PatchCampaignsByCidApiArg = {
  /** Campaign id */
  cid: string;
  body: {
    customer_title?: string;
    project_id?: number;
  };
};
export type GetCampaignsByCidApiResponse =
  /** status 200 OK */ CampaignWithOutput & {
    isArchived?: boolean;
    plan?: number;
  };
export type GetCampaignsByCidApiArg = {
  /** Campaign id */
  cid: string;
};
export type GetCampaignsByCidBugTypesApiResponse =
  /** status 200 OK */ BugType[];
export type GetCampaignsByCidBugTypesApiArg = {
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
    comments: number;
    additional_fields?: {
      slug: string;
      value: string;
    }[];
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
export type GetCampaignsByCidBugsAndBidApiResponse =
  /** status 200 OK */ Bug & {
    media: BugMedia[];
    tags: BugTag[];
    additional_fields: BugAdditionalField[];
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
  custom_status?: BugCustomStatus;
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
    custom_status_id?: number;
  };
};
export type GetCampaignsByCidBugsAndBidCommentsApiResponse =
  /** status 200 OK */ {
    items: BugComment[];
  };
export type GetCampaignsByCidBugsAndBidCommentsApiArg = {
  /** Campaign id */
  cid: string;
  /** Defines an identifier for the bug object (BUG ID) */
  bid: string;
};
export type PostCampaignsByCidBugsAndBidCommentsApiResponse =
  /** status 200 OK */ BugComment;
export type PostCampaignsByCidBugsAndBidCommentsApiArg = {
  /** Campaign id */
  cid: string;
  /** Defines an identifier for the bug object (BUG ID) */
  bid: string;
  body: {
    text: string;
    mentioned?: {
      id: number;
    }[];
    media_id?: {
      id: number;
    }[];
  };
};
export type PostCampaignsByCidBugsAndBidMediaApiResponse =
  /** status 200 OK */ {
    failed?: {
      name: string;
      errorCode: 'FILE_TOO_BIG' | 'INVALID_FILE_EXTENSION' | 'GENERIC_ERROR';
    }[];
    uploaded_ids?: {
      id: number;
    }[];
  };
export type PostCampaignsByCidBugsAndBidMediaApiArg = {
  /** Campaign id */
  cid: string;
  /** Defines an identifier for the bug object (BUG ID) */
  bid: string;
  body: {
    media: string | string[];
  };
};
export type PostCampaignsByCidBugsAndBidCommentsCmidApiResponse =
  /** status 200 OK */ {
    files?: {
      name: string;
      path: string;
    }[];
    failed?: {
      name: string;
      errorCode: 'FILE_TOO_BIG' | 'INVALID_FILE_EXTENSION' | 'GENERIC_ERROR';
    }[];
    uploaded_ids?: {
      id: number;
    }[];
  };
export type PostCampaignsByCidBugsAndBidCommentsCmidApiArg = {
  cid: string;
  bid: string;
  cmid: string;
  body: {
    media: string | string[];
  };
};
export type DeleteCampaignsByCidBugsAndBidCommentsCmidApiResponse =
  /** status 200 OK */ string;
export type DeleteCampaignsByCidBugsAndBidCommentsCmidApiArg = {
  cid: string;
  bid: string;
  cmid: string;
  body: {};
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
export type GetCampaignsByCidClustersApiResponse = /** status 200 OK */ {
  items?: Cluster[];
};
export type GetCampaignsByCidClustersApiArg = {
  cid: string;
};
export type GetCampaignsByCidCustomStatusesApiResponse =
  /** status 200 OK */ BugCustomStatus[];
export type GetCampaignsByCidCustomStatusesApiArg = {
  /** Campaign id */
  cid: string;
};
export type PatchCampaignsByCidCustomStatusesApiResponse =
  /** status 200 OK */ BugCustomStatus[];
export type PatchCampaignsByCidCustomStatusesApiArg = {
  /** Campaign id */
  cid: string;
  body: {
    /** se esiste già questo parametro viene passato nel request body\r\nse invece non esiste ed il custom status deve essere creato, non viene passato */
    custom_status_id?: number;
    name: string;
    color: string;
  }[];
};
export type DeleteCampaignsByCidCustomStatusesApiResponse =
  /** status 200 OK */ {
    status?: boolean;
  };
export type DeleteCampaignsByCidCustomStatusesApiArg = {
  /** Campaign id */
  cid: string;
  body: {
    custom_status_id: number;
    to_custom_status_id?: number;
  }[];
};
export type GetCampaignsByCidDevicesApiResponse = /** status 200 OK */ {
  device: string;
}[];
export type GetCampaignsByCidDevicesApiArg = {
  /** Campaign id */
  cid: string;
};
export type PutCampaignsByCidFindingsAndFidApiResponse = unknown;
export type PutCampaignsByCidFindingsAndFidApiArg = {
  /** Campaign id */
  cid: string;
  /** Finding id */
  fid: string;
  body: {
    comment: string;
  };
};
export type PostCampaignsByCidInsightsApiResponse =
  /** status 200 OK */ Insight;
export type PostCampaignsByCidInsightsApiArg = {
  /** Campaign id */
  cid: string;
  body: {
    title: string;
    description?: string;
    severity_id: number;
    observations_ids: number[];
    comment?: string;
    visible?: number;
  };
};
export type GetCampaignsByCidInsightsApiResponse =
  /** status 200 OK */ (Insight & {
    usecases: {
      id: number;
      name: string;
    }[];
  })[];
export type GetCampaignsByCidInsightsApiArg = {
  /** Campaign id */
  cid: string;
};
export type GetCampaignsByCidMetaApiResponse = /** status 200 OK */ Campaign & {
  selected_testers: number;
  /** Array of form factors */
  allowed_devices: string[];
};
export type GetCampaignsByCidMetaApiArg = {
  /** Campaign id */
  cid: string;
};
export type GetCampaignsByCidObservationsApiResponse =
  /** status 200 OK */
  | {
      results: {
        usecaseId: number;
        usecaseTitle: string;
        grapes: Grape[];
        ungrouped: (Observation & {
          uploaderId: number;
          mediaId: number;
          deviceType: string;
          usecaseTitle: string;
        })[];
      }[];
      kind: 'usecase-grapes';
    }
  | {
      results: (Observation & {
        uploaderId: number;
        mediaId: number;
        deviceType: string;
        usecaseTitle: string;
      })[];
      kind: 'ungrouped';
    };
export type GetCampaignsByCidObservationsApiArg = {
  cid: string;
  groupBy?: 'usecase-grapes';
};
export type GetCampaignsByCidOsApiResponse = /** status 200 OK */ {
  os: string;
}[];
export type GetCampaignsByCidOsApiArg = {
  /** Campaign id */
  cid: string;
};
export type GetCampaignsByCidPrioritiesApiResponse =
  /** status 200 OK */ BugPriority[];
export type GetCampaignsByCidPrioritiesApiArg = {
  /** Campaign id */
  cid: string;
};
export type GetCampaignsByCidReplicabilitiesApiResponse =
  /** status 200 OK */ BugReplicability[];
export type GetCampaignsByCidReplicabilitiesApiArg = {
  /** Campaign id */
  cid: string;
};
export type GetCampaignsByCidReportsApiResponse = /** status 200 OK */ Report[];
export type GetCampaignsByCidReportsApiArg = {
  /** Campaign id */
  cid: string;
};
export type GetCampaignsByCidSeveritiesApiResponse =
  /** status 200 OK */ BugSeverity[];
export type GetCampaignsByCidSeveritiesApiArg = {
  /** Campaign id */
  cid: string;
};
export type GetCampaignsByCidSuggestionsApiResponse = /** status 200 OK */ {
  suggestion?: {
    slug: BannerType;
    /** ServiceId from strapi */
    serviceId?: number;
  };
};
export type GetCampaignsByCidSuggestionsApiArg = {
  /** Campaign id */
  cid: string;
};
export type PostCampaignsByCidSuggestionsApiResponse = /** status 200 OK */ {};
export type PostCampaignsByCidSuggestionsApiArg = {
  /** Campaign id */
  cid: string;
  body: {
    slug: BannerType;
  };
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
  /** bugs, videos */
  filterBy?: string;
};
export type GetCampaignsByCidUsersApiResponse = /** status 200 OK */ {
  items: Tenant[];
  start?: number;
  limit?: number;
  size?: number;
  total?: number;
};
export type GetCampaignsByCidUsersApiArg = {
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
};
export type PostCampaignsByCidUsersApiResponse = /** status 200 OK */ {
  profile_id: number;
  tryber_wp_user_id: number;
  email: string;
};
export type PostCampaignsByCidUsersApiArg = {
  /** Campaign id */
  cid: string;
  body: {
    email: string;
    name?: string;
    surname?: string;
    locale?: string;
    event_name?: string;
    redirect_url?: string;
    message?: string;
  };
};
export type DeleteCampaignsByCidUsersApiResponse = /** status 200 OK */ {
  items: Tenant[];
};
export type DeleteCampaignsByCidUsersApiArg = {
  /** Campaign id */
  cid: string;
  body: {
    /** Tryber WP USER ID */
    user_id: number;
  };
};
export type GetCampaignsByCidUxApiResponse = /** status 200 OK */ {
  goal?: string;
  users?: number;
  findings?: {
    /** this field is the Finding ID */
    id: number;
    title: string;
    description: string;
    comment?: string;
    severity: {
      id: number;
      name: string;
      style: string;
    };
    cluster:
      | {
          id: number;
          name: string;
        }[]
      | 'all';
    video?: {
      url: string;
      streamUrl: string;
      poster?: string;
      start: number;
      end: number;
      description?: string;
    }[];
  }[];
  sentiment?: {
    cluster: {
      id: number;
      name: string;
    };
    value: number;
    comment: string;
  }[];
  methodology?: {
    type: string;
    description: string;
  };
  questions?: {
    text: string;
  }[];
};
export type GetCampaignsByCidUxApiArg = {
  /** Campaign id */
  cid: string;
  showAsCustomer?: boolean;
  /** filterBy[<fieldName>]=<fieldValue> */
  filterBy?: any;
};
export type GetCampaignsByCidVideoTagsApiResponse = /** status 200 OK */ {
  group: {
    id: number;
    name: string;
  };
  tags: {
    id: number;
    name: string;
    style: string;
    usageNumber: number;
  }[];
}[];
export type GetCampaignsByCidVideoTagsApiArg = {
  cid: string;
};
export type PostCampaignsByCidVideoTagsApiResponse =
  /** status 200 OK */ VideoTag;
export type PostCampaignsByCidVideoTagsApiArg = {
  cid: string;
  /** If there is a group, post new tag into that group; otherwise, create the group and add tag into the new group. */
  body: {
    group: {
      name: string;
    };
    tag: {
      name: string;
      style?: string;
    };
  };
};
export type GetCampaignsByCidVideosApiResponse = /** status 200 OK */ {
  items: (Video & {
    usecaseId: number;
  })[];
} & PaginationData;
export type GetCampaignsByCidVideosApiArg = {
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
};
export type GetCampaignsByCidWidgetsApiResponse =
  /** status 200 OK */
  | WidgetBugsByUseCase
  | WidgetBugsByDevice
  | WidgetCampaignProgress
  | WidgetCampaignUniqueBugs
  | WidgetBugsByDuplicates
  | WidgetCampaignUxTaggingVideoCompletionData
  | WidgetCampaignUxTotalTitlesVsRecurrentTitles
  | WidgetCampaignUxSeveritiesDistribution
  | WidgetCampaignUxMostUsedTitles;
export type GetCampaignsByCidWidgetsApiArg = {
  /** Campaign id */
  cid: string;
  /** Campaign widget slug */
  s:
    | 'bugs-by-usecase'
    | 'bugs-by-device'
    | 'cp-progress'
    | 'unique-bugs'
    | 'bugs-by-duplicates'
    | 'ux-tagging-video-completion'
    | 'ux-total-titles-vs-recurrent-titles'
    | 'ux-severities-distribution'
    | 'ux-most-used-titles';
  /** should update bug trend after request resolves? */
  updateTrend?: boolean;
};
export type GetInsightsByIidApiResponse = /** status 200 OK */ Insight;
export type GetInsightsByIidApiArg = {
  /** Insight id */
  iid: string;
};
export type DeleteInsightsByIidApiResponse = /** status 200 OK */ void;
export type DeleteInsightsByIidApiArg = {
  /** Insight id */
  iid: string;
};
export type PatchInsightsByIidApiResponse = /** status 200 OK */ Insight;
export type PatchInsightsByIidApiArg = {
  /** Insight id */
  iid: string;
  body: {
    title?: string;
    description?: string;
    severity_id?: number;
    observations_ids?: number[];
    comment?: string;
    visible?: number;
  };
};
export type GetMediaByIdApiResponse = unknown;
export type GetMediaByIdApiArg = {
  id: string;
};
export type DeleteMediaCommentByMcidApiResponse = /** status 200 OK */ object;
export type DeleteMediaCommentByMcidApiArg = {
  mcid: string;
};
export type PostProjectsApiResponse = /** status 200 OK */ Project;
export type PostProjectsApiArg = {
  body: {
    name: string;
    customer_id: number;
    description?: string;
  };
};
export type GetProjectsByPidApiResponse = /** status 200 OK */ Project;
export type GetProjectsByPidApiArg = {
  /** Project id */
  pid: string;
};
export type PatchProjectsByPidApiResponse = /** status 200 OK */ Project;
export type PatchProjectsByPidApiArg = {
  /** Project id */
  pid: string;
  body:
    | {
        display_name: string;
      }
    | {
        description: string;
      };
};
export type DeleteProjectsByPidApiResponse = /** status 200 OK */ void;
export type DeleteProjectsByPidApiArg = {
  /** Project id */
  pid: string;
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
  pid: string;
  /** Limit pagination parameter */
  limit?: number;
  /** Start pagination parameter */
  start?: number;
  /** Order value (ASC, DESC) */
  order?: string;
  /** Order by accepted field */
  orderBy?: string;
};
export type GetProjectsByPidUsersApiResponse = /** status 200 OK */ {
  items: Tenant[];
  start?: number;
  limit?: number;
  size?: number;
  total?: number;
};
export type GetProjectsByPidUsersApiArg = {
  /** Project id */
  pid: string;
  /** Limit pagination parameter */
  limit?: number;
  /** Start pagination parameter */
  start?: number;
  /** Order value (ASC, DESC) */
  order?: string;
  /** Order by accepted field */
  orderBy?: string;
};
export type PostProjectsByPidUsersApiResponse = /** status 200 OK */ {
  profile_id: number;
  tryber_wp_user_id: number;
  email: string;
};
export type PostProjectsByPidUsersApiArg = {
  /** Project id */
  pid: string;
  body: {
    email: string;
    name?: string;
    surname?: string;
    locale?: string;
    event_name?: string;
    redirect_url?: string;
    message?: string;
  };
};
export type DeleteProjectsByPidUsersApiResponse = /** status 200 OK */ {
  items: Tenant[];
};
export type DeleteProjectsByPidUsersApiArg = {
  /** Project id */
  pid: string;
  body: {
    /** Tryber WP USER ID */
    user_id: number;
    include_shared?: boolean;
  };
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
export type GetUsersMePreferencesApiResponse = /** status 200 OK */ {
  items?: UserPreference[];
};
export type GetUsersMePreferencesApiArg = void;
export type PutUsersMePreferencesBySlugApiResponse =
  /** status 200 OK */ UserPreference;
export type PutUsersMePreferencesBySlugApiArg = {
  slug: string;
  body: {
    value: string;
  };
};
export type GetVideosByVidApiResponse = /** status 200 OK */ Video & {
  usecase: {
    id: number;
    name: string;
  };
} & {
  language: string;
};
export type GetVideosByVidApiArg = {
  vid: string;
};
export type GetVideosByVidObservationsApiResponse =
  /** status 200 OK */ Observation[];
export type GetVideosByVidObservationsApiArg = {
  vid: string;
};
export type PostVideosByVidObservationsApiResponse =
  /** status 200 OK */ Observation;
export type PostVideosByVidObservationsApiArg = {
  vid: string;
  body: {
    start: number;
    end: number;
  };
};
export type PatchVideosByVidObservationsAndOidApiResponse =
  /** status 200 OK */ Observation;
export type PatchVideosByVidObservationsAndOidApiArg = {
  vid: string;
  oid: string;
  body: {
    title?: string;
    description?: string;
    start?: number;
    end?: number;
    quotes?: string;
    tags?: number[];
  };
};
export type DeleteVideosByVidObservationsAndOidApiResponse = unknown;
export type DeleteVideosByVidObservationsAndOidApiArg = {
  vid: string;
  oid: string;
};
export type GetVideosByVidTranslationApiResponse = /** status 200 OK */ {
  language: string;
  processing: number;
  sentences: {
    text: string;
    start: number;
    end: number;
  }[];
};
export type GetVideosByVidTranslationApiArg = {
  vid: string;
  /** language */
  lang?: string;
};
export type PostVideosByVidTranslationApiResponse = /** status 200 OK */ object;
export type PostVideosByVidTranslationApiArg = {
  vid: string;
  body: {
    language: string;
  };
};
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
export type PostWorkspacesApiResponse = /** status 200 OK */ {
  id: number;
  company: string;
};
export type PostWorkspacesApiArg = {
  body: {
    company: string;
    pm_id?: number;
  };
};
export type GetWorkspacesByWidApiResponse = /** status 200 OK */ Workspace;
export type GetWorkspacesByWidApiArg = {
  /** Workspace (company, customer) id */
  wid: string;
};
export type GetWorkspacesByWidArchiveApiResponse = /** status 200 OK */ {
  id: number;
  name: string;
  description: string;
  campaignsCounter: number;
};
export type GetWorkspacesByWidArchiveApiArg = {
  /** Workspace (company, customer) id */
  wid: string;
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
  wid: string;
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
  wid: string;
  /** Limit pagination parameter */
  limit?: number;
  /** Start pagination parameter */
  start?: number;
  /** Order value (ASC, DESC) */
  order?: string;
  /** Order by accepted field */
  orderBy?: string;
};
export type PostWorkspacesByWidPlansApiResponse = /** status 201 Created */ {
  id: number;
};
export type PostWorkspacesByWidPlansApiArg = {
  wid: string;
  body: {
    template_id: number;
    project_id: number;
  };
};
export type GetWorkspacesByWidPlansApiResponse = /** status 200 OK */ {
  id: number;
  title: string;
  status: 'draft' | 'pending_review' | 'approved';
  project: {
    id: number;
    title: string;
  };
  quote?: {
    id: number;
    status: 'pending' | 'proposed' | 'approved' | 'rejected';
  };
}[];
export type GetWorkspacesByWidPlansApiArg = {
  wid: string;
  /** Order by accepted field */
  orderBy?: string;
  /** Order value (ASC, DESC) */
  order?: string;
  /** filterBy[<fieldName>]=<fieldValue> */
  filterBy?: any;
  /** Limit pagination parameter */
  limit?: number;
};
export type DeletePlansByPidApiResponse = unknown;
export type DeletePlansByPidApiArg = {
  pid: string;
};
export type GetPlansByPidApiResponse = /** status 200 OK */ {
  id: number;
  config: {
    modules: Module[];
  };
  status: PlanStatus;
  project: {
    id: number;
    name: string;
  };
  quote?: {
    id: number;
    status: 'pending' | 'proposed' | 'approved' | 'rejected';
    value: string;
  };
  campaign?: {
    id: number;
    /** CustomerTitle ?? Title */
    title: string;
    startDate: string;
  };
  workspace_id: number;
};
export type GetPlansByPidApiArg = {
  pid: string;
};
export type PatchPlansByPidApiResponse = unknown;
export type PatchPlansByPidApiArg = {
  pid: string;
  body: {
    config: {
      modules: Module[];
    };
  };
};
export type PatchPlansByPidStatusApiResponse = /** status 200 OK */ {};
export type PatchPlansByPidStatusApiArg = {
  pid: string;
  body: {
    status: PlanStatus;
  };
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
  wid: string;
  /** Limit pagination parameter */
  limit?: number;
  /** Start pagination parameter */
  start?: number;
};
export type GetWorkspacesByWidTemplatesApiResponse = /** status 200 OK */ {
  items: CpReqTemplate[];
} & PaginationData;
export type GetWorkspacesByWidTemplatesApiArg = {
  /** Workspace (company, customer) id */
  wid: string;
  /** Limit pagination parameter */
  limit?: number;
  /** Start pagination parameter */
  start?: number;
  /** Orders results */
  orderBy?: 'updated_at' | 'id' | 'order';
  /** Order value (ASC, DESC) */
  order?: string;
  /** filterBy[<fieldName>]=<fieldValue> */
  filterBy?: any;
};
export type DeleteWorkspacesByWidTemplatesAndTidApiResponse =
  /** status 200 OK */ {};
export type DeleteWorkspacesByWidTemplatesAndTidApiArg = {
  wid: string;
  tid: string;
};
export type GetWorkspacesByWidTemplatesAndTidApiResponse =
  /** status 200 OK */ {
    id: number;
    name: string;
    description?: string;
    config: string;
    workspace_id?: number;
    price?: string;
    strapi?: StrapiTemplate;
  };
export type GetWorkspacesByWidTemplatesAndTidApiArg = {
  wid: string;
  tid: string;
};
export type GetWorkspacesByWidProjectsAndPidApiResponse =
  /** status 200 OK */ Project;
export type GetWorkspacesByWidProjectsAndPidApiArg = {
  /** Workspace (company, customer) id */
  wid: string;
  /** Project id */
  pid: string;
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
  wid: string;
  /** Project id */
  pid: string;
  /** Limit pagination parameter */
  limit?: number;
  /** Start pagination parameter */
  start?: number;
};
export type GetWorkspacesByWidUsersApiResponse = /** status 200 OK */ {
  items: Tenant[];
  start?: number;
  limit?: number;
  size?: number;
  total?: number;
};
export type GetWorkspacesByWidUsersApiArg = {
  /** Workspace (company, customer) id */
  wid: string;
  /** Limit pagination parameter */
  limit?: number;
  /** Start pagination parameter */
  start?: number;
  /** Order value (ASC, DESC) */
  order?: string;
  /** Order by accepted field */
  orderBy?: string;
};
export type PostWorkspacesByWidUsersApiResponse = /** status 200 OK */ {
  profile_id: number;
  tryber_wp_user_id: number;
  email: string;
};
export type PostWorkspacesByWidUsersApiArg = {
  /** Workspace (company, customer) id */
  wid: string;
  body: {
    email: string;
    name?: string;
    surname?: string;
    locale?: string;
    event_name?: string;
    redirect_url?: string;
    message?: string;
  };
};
export type DeleteWorkspacesByWidUsersApiResponse = /** status 200 OK */ {
  items: Tenant[];
};
export type DeleteWorkspacesByWidUsersApiArg = {
  /** Workspace (company, customer) id */
  wid: string;
  body: {
    /** Tryber WP USER ID */
    user_id: number;
    include_shared?: boolean;
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
export type Campaign = {
  id: number;
  start_date: string;
  end_date: string;
  close_date: string;
  title: string;
  customer_title: string;
  is_public: number;
  /** -1: no bug form;
    0: only bug form;
    1: bug form with bug parade; */
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
  workspace: {
    id: number;
    name: string;
  };
  description?: string;
  base_bug_internal_id?: string;
};
export type PlatformObject = {
  /** os */
  id: number;
  /** form_factor
    
    0 => smartphone,
    1 => tablet
    2 => pc
    3 => smartwatch
    4 => console
    5 => tv */
  deviceType: number;
};
export type TemplateCategory = {
  id?: number;
  name: string;
};
export type Template = {
  title: string;
  /** Short description used as preview of template or in templates dropdown */
  description?: string;
  /** HTML content used to pre-fill the use case editor */
  content?: string;
  category?: TemplateCategory;
  device_type?: 'webapp' | 'mobileapp';
  locale?: 'en' | 'it';
  image?: string;
  /** The use case created by this template needs a login or not? */
  requiresLogin?: boolean;
};
export type UseCase = {
  title: string;
  description: string;
  /** Optional in experiential campaigns */
  functionality?: {
    id?: number;
  } & Template;
  logged?: boolean;
  link?: string;
};
export type Output = 'bugs' | 'media' | 'insights';
export type CampaignWithOutput = Campaign & {
  outputs?: Output[];
};
export type BugType = {
  id: number;
  name: string;
};
export type BugTitle = {
  full: string;
  /** Bug title without context. */
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
export type BugReplicability = {
  id: number;
  name: string;
};
export type BugPriority = {
  id: number;
  name: string;
};
export type BugCustomStatusPhase = {
  id: number;
  name: string;
};
export type BugCustomStatus = {
  id: number;
  name: string;
  color: string;
  phase: BugCustomStatusPhase;
  is_default: number;
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
  desktop_type: string;
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
  priority: BugPriority;
  custom_status: BugCustomStatus;
  created: string;
  occurred_date: string;
  updated?: string;
  note?: string;
  device: Smartphone | Tablet | Desktop;
  application_section: {
    id?: number;
    prefix_title?: string;
    title?: string;
    simple_title?: string;
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
export type BugComment = {
  id: number;
  text: string;
  creation_date: string;
  creator: {
    id: number;
    name: string;
    isInternal: boolean;
  };
  media?: {
    url: string;
    id: number;
    type: string;
  }[];
};
export type Cluster = {
  id: number;
  name: string;
};
export type VideoTag = {
  group: {
    id: number;
    name: string;
  };
  tag: {
    id: number;
    name: string;
    style: string;
    usageNumber: number;
  };
};
export type Observation = {
  id: number;
  title: string;
  description: string;
  start: number;
  end: number;
  quotes: string;
  uxNote?: string;
  tags: VideoTag[];
};
export type Insight = {
  id: number;
  title: string;
  description: string;
  severity: {
    id: number;
    name: string;
    style: string;
  };
  visible?: number;
  comment?: string;
  observations: (Observation & {
    video: {
      id: number;
      deviceType: string;
    };
    uploaderId: number;
    usecaseTitle: string;
  })[];
};
export type Grape = {
  title: string;
  severity: string;
  usersNumber: number;
  observations: (Observation & {
    uploaderId: number;
    mediaId: number;
    deviceType: string;
    usecaseTitle: string;
  })[];
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
export type BannerType = 'banner_testing_automation' | 'banner_user_experience';
export type Tenant = {
  /** tryber wp_user_id */
  id: number;
  profile_id: number;
  name: string;
  email: string;
  invitationPending: boolean;
  permissionFrom?: {
    type?: 'workspace' | 'project';
    id?: number;
  };
};
export type Word = {
  start: number;
  end: number;
  /** Id of Speaker */
  speaker?: number;
  word: string;
};
export type Paragraph = {
  text: string;
  start: number;
  end: number;
  /** Id Of speaker */
  speaker?: number;
  words: Word[];
};
export type Transcript = {
  /** Number of spekers */
  speakers: number;
  paragraphs: Paragraph[];
};
export type MediaSentiment = {
  value: number;
  reason: string;
  paragraphs: {
    start: number;
    end: number;
    value: number;
    reason: string;
  }[];
};
export type Video = {
  id: number;
  url: string;
  streamUrl?: string;
  poster?: string;
  duration?: number;
  tester: {
    id: number;
    name: string;
    surname: string;
    device: {
      type: 'smartphone' | 'tablet' | 'desktop' | 'other';
    };
  };
  transcript?: Transcript;
  sentiment?: MediaSentiment;
};
export type PaginationData = {
  start?: number;
  size?: number;
  limit?: number;
  total?: number;
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
    /** Unique bugs */
    bugs: number;
  })[];
  kind: 'bugsByDevice';
};
export type WidgetCampaignProgress = {
  data: {
    start_date: string;
    end_date: string;
    /** Percentage fixed rate of completion */
    usecase_completion: 12.5 | 37.5 | 62.5 | 87.5 | 100;
    /** Number of hours from start_date */
    time_elapsed: number;
    /** Expected amount of hours required to complete the campaign */
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
export type WidgetCampaignUxTaggingVideoCompletionData = {
  data: {
    countMediaWithObservation: number;
    countMedia: number;
  };
  kind: 'uxTaggingVideoCompletion';
};
export type WidgetCampaignUxTotalTitlesVsRecurrentTitles = {
  data: {
    countTitleTag: number;
    countObservationNoTitle: number;
    countRecurrentTitles: number;
  };
  kind: 'uxTotalTitlesVsRecurrentTitles';
};
export type WidgetCampaignUxSeveritiesDistribution = {
  data: {
    countObservations: number;
    severitiesDistribution: {
      countPositiveFindings: number;
      countMinorIssue: number;
      countMajorIssue: number;
      countObservationSeverity: number;
    };
  };
  kind: 'uxSeveritiesDistribution';
};
export type WidgetCampaignUxMostUsedTitles = {
  data: {
    mostUsedTitles: {
      title: string;
      usage: number;
      mainSeverityAssignment: string;
    }[];
  };
  kind: 'uxMostUsedTitles';
};
export type Project = {
  id: number;
  name: string;
  campaigns_count: number;
  workspaceId: number;
  description?: string;
  is_archive?: number;
};
export type Feature = {
  slug?: string;
  name?: string;
};
export type User = {
  /** This is the main id of the user. Currently is equal to tryber_wp_user_id */
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
export type UserPreference = {
  preference_id: number;
  value: string;
  name: string;
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
  /** express coins */
  coins?: number;
  /** Do this workspace have shared items? */
  isShared?: boolean;
  /** Number of shared items */
  sharedItems?: number;
};
export type Coin = {
  id: number;
  customer_id: number;
  /** Number of available coin */
  amount: number;
  agreement_id?: number;
  /** This is the single coin price */
  price?: number;
  created_on?: string;
  /** On each coin use, the related package will be updated */
  updated_on?: string;
};
export type ModuleTitle = {
  type: 'title';
  variant: string;
  output: string;
};
export type ModuleDate = {
  type: 'dates';
  variant: string;
  output: {
    start: string;
  };
};
export type SubcomponentTaskVideo = {
  kind: 'video';
  title: string;
  description?: string;
  url?: string;
};
export type SubcomponentTaskBug = {
  kind: 'bug';
  title: string;
  description?: string;
  url?: string;
};
export type SubcomponentTaskSurvey = {
  kind: 'survey';
  title: string;
  description?: string;
  url?: string;
};
export type OutputModuleTaskModerateVideo = {
  kind: 'moderate-video';
  title: string;
  description?: string;
  url?: string;
};
export type OutputModuleTaskExplorativeBug = {
  kind: 'explorative-bug';
  title: string;
  description?: string;
  url?: string;
};
export type SubcomponentTask =
  | SubcomponentTaskVideo
  | SubcomponentTaskBug
  | SubcomponentTaskSurvey
  | OutputModuleTaskModerateVideo
  | OutputModuleTaskExplorativeBug;
export type ModuleTask = {
  type: 'tasks';
  variant: string;
  output: SubcomponentTask[];
};
export type OutputModuleAge = {
  min: number;
  max: number;
  percentage: number;
}[];
export type ModuleAge = {
  type: 'age';
  variant: string;
  output: OutputModuleAge;
};
export type ModuleLanguage = {
  type: 'language';
  variant: string;
  output: string;
};
export type OutputModuleLiteracy = {
  level: 'beginner' | 'intermediate' | 'expert';
  percentage: number;
}[];
export type ModuleLiteracy = {
  type: 'literacy';
  variant: string;
  output: OutputModuleLiteracy;
};
export type ModuleTarget = {
  type: 'target';
  variant: string;
  output: number;
};
export type ModuleGoal = {
  type: 'goal';
  variant: string;
  output: string;
};
export type OutputModuleGender = {
  gender: 'male' | 'female';
  percentage: number;
}[];
export type ModuleGender = {
  type: 'gender';
  variant: string;
  output: OutputModuleGender;
};
export type ModuleOutOfScope = {
  type: 'out_of_scope';
  variant: string;
  output: string;
};
export type OutputModuleBrowser = {
  name: 'firefox' | 'edge' | 'chrome' | 'safari';
  percentage: number;
}[];
export type ModuleBrowser = {
  type: 'browser';
  variant: string;
  output: OutputModuleBrowser;
};
export type ModuleTargetNote = {
  type: 'target_note';
  variant: string;
  output: string;
};
export type ModuleInstructionNote = {
  type: 'instruction_note';
  variant: string;
  output: string;
};
export type ModuleSetupNote = {
  type: 'setup_note';
  variant: string;
  output: string;
};
export type OutputModuleTouchpointsAppDesktop = {
  kind: 'app';
  form_factor: 'desktop';
  os: {
    linux?: string;
    macos?: string;
    windows?: string;
  };
};
export type OutputModuleTouchpointsAppTablet = {
  kind: 'app';
  form_factor: 'tablet';
  os: {
    linux?: string;
    ios?: string;
    windows?: string;
  };
};
export type OutputModuleTouchpointsAppSmartphone = {
  kind: 'app';
  form_factor: 'smartphone';
  os: {
    android?: string;
    ios?: string;
  };
};
export type OutputModuleTouchpointsWebDesktop = {
  kind: 'web';
  form_factor: 'desktop';
  os: {
    linux?: string;
    macos?: string;
    windows?: string;
  };
};
export type OutputModuleTouchpointsWebTablet = {
  kind: 'web';
  form_factor: 'tablet';
  os: {
    android?: string;
    ios?: string;
  };
};
export type OutputModuleTouchpointsWebSmartphone = {
  kind: 'web';
  form_factor: 'smartphone';
  os: {
    android?: string;
    ios?: string;
  };
};
export type SubcomponentTouchpoints =
  | OutputModuleTouchpointsAppDesktop
  | OutputModuleTouchpointsAppTablet
  | OutputModuleTouchpointsAppSmartphone
  | OutputModuleTouchpointsWebDesktop
  | OutputModuleTouchpointsWebTablet
  | OutputModuleTouchpointsWebSmartphone;
export type ModuleTouchpoints = {
  type: 'touchpoints';
  variant: string;
  output: SubcomponentTouchpoints[];
};
export type ModuleAdditionalTarget = {
  type: 'additional_target';
  variant: string;
  output: string;
};
export type Module =
  | ModuleTitle
  | ModuleDate
  | ModuleTask
  | ModuleAge
  | ModuleLanguage
  | ModuleLiteracy
  | ModuleTarget
  | ModuleGoal
  | ModuleGender
  | ModuleOutOfScope
  | ModuleBrowser
  | ModuleTargetNote
  | ModuleInstructionNote
  | ModuleSetupNote
  | ModuleTouchpoints
  | ModuleAdditionalTarget;
export type PlanStatus = 'pending_review' | 'draft' | 'approved';
export type StrapiTemplate = {
  title: string;
  description: string;
  pre_title: string;
  image?: string;
  output_image?: string;
  requirements?: {
    description: string;
    list: string[];
  };
  tags: {
    icon: string;
    text: string;
  }[];
  why?: {
    reasons: {
      icon: string;
      title: string;
      description: string;
    }[];
    advantages: string[];
  };
  what?: {
    description: string;
    goal: string;
  };
  how?: {
    icon: string;
    title: string;
    description: string;
  }[];
  price?: {
    price: string;
    previous_price?: string;
    is_strikethrough?: number;
  };
  background?: string;
};
export type CpReqTemplate = {
  id: number;
  name: string;
  description?: string;
  config: string;
  workspace_id?: number;
  price?: string;
  strapi?: StrapiTemplate;
};
export const {
  use$getQuery,
  usePostAuthenticateMutation,
  usePostAnalyticsViewsCampaignsByCidMutation,
  usePostCampaignsMutation,
  usePatchCampaignsByCidMutation,
  useGetCampaignsByCidQuery,
  useGetCampaignsByCidBugTypesQuery,
  useGetCampaignsByCidBugsQuery,
  useGetCampaignsByCidBugsAndBidQuery,
  usePatchCampaignsByCidBugsAndBidMutation,
  useGetCampaignsByCidBugsAndBidCommentsQuery,
  usePostCampaignsByCidBugsAndBidCommentsMutation,
  usePostCampaignsByCidBugsAndBidMediaMutation,
  usePostCampaignsByCidBugsAndBidCommentsCmidMutation,
  useDeleteCampaignsByCidBugsAndBidCommentsCmidMutation,
  useGetCampaignsByCidBugsAndBidSiblingsQuery,
  useGetCampaignsByCidClustersQuery,
  useGetCampaignsByCidCustomStatusesQuery,
  usePatchCampaignsByCidCustomStatusesMutation,
  useDeleteCampaignsByCidCustomStatusesMutation,
  useGetCampaignsByCidDevicesQuery,
  usePutCampaignsByCidFindingsAndFidMutation,
  usePostCampaignsByCidInsightsMutation,
  useGetCampaignsByCidInsightsQuery,
  useGetCampaignsByCidMetaQuery,
  useGetCampaignsByCidObservationsQuery,
  useGetCampaignsByCidOsQuery,
  useGetCampaignsByCidPrioritiesQuery,
  useGetCampaignsByCidReplicabilitiesQuery,
  useGetCampaignsByCidReportsQuery,
  useGetCampaignsByCidSeveritiesQuery,
  useGetCampaignsByCidSuggestionsQuery,
  usePostCampaignsByCidSuggestionsMutation,
  useGetCampaignsByCidTagsQuery,
  useGetCampaignsByCidUsecasesQuery,
  useGetCampaignsByCidUsersQuery,
  usePostCampaignsByCidUsersMutation,
  useDeleteCampaignsByCidUsersMutation,
  useGetCampaignsByCidUxQuery,
  useGetCampaignsByCidVideoTagsQuery,
  usePostCampaignsByCidVideoTagsMutation,
  useGetCampaignsByCidVideosQuery,
  useGetCampaignsByCidWidgetsQuery,
  useGetInsightsByIidQuery,
  useDeleteInsightsByIidMutation,
  usePatchInsightsByIidMutation,
  useGetMediaByIdQuery,
  useDeleteMediaCommentByMcidMutation,
  usePostProjectsMutation,
  useGetProjectsByPidQuery,
  usePatchProjectsByPidMutation,
  useDeleteProjectsByPidMutation,
  useGetProjectsByPidCampaignsQuery,
  useGetProjectsByPidUsersQuery,
  usePostProjectsByPidUsersMutation,
  useDeleteProjectsByPidUsersMutation,
  useGetTemplatesQuery,
  useGetUsersMeQuery,
  useGetUsersMePreferencesQuery,
  usePutUsersMePreferencesBySlugMutation,
  useGetVideosByVidQuery,
  useGetVideosByVidObservationsQuery,
  usePostVideosByVidObservationsMutation,
  usePatchVideosByVidObservationsAndOidMutation,
  useDeleteVideosByVidObservationsAndOidMutation,
  useGetVideosByVidTranslationQuery,
  usePostVideosByVidTranslationMutation,
  useGetWorkspacesQuery,
  usePostWorkspacesMutation,
  useGetWorkspacesByWidQuery,
  useGetWorkspacesByWidArchiveQuery,
  useGetWorkspacesByWidCampaignsQuery,
  useGetWorkspacesByWidCoinsQuery,
  usePostWorkspacesByWidPlansMutation,
  useGetWorkspacesByWidPlansQuery,
  useDeletePlansByPidMutation,
  useGetPlansByPidQuery,
  usePatchPlansByPidMutation,
  usePatchPlansByPidStatusMutation,
  useGetWorkspacesByWidProjectsQuery,
  useGetWorkspacesByWidTemplatesQuery,
  useDeleteWorkspacesByWidTemplatesAndTidMutation,
  useGetWorkspacesByWidTemplatesAndTidQuery,
  useGetWorkspacesByWidProjectsAndPidQuery,
  useGetWorkspacesByWidProjectsAndPidCampaignsQuery,
  useGetWorkspacesByWidUsersQuery,
  usePostWorkspacesByWidUsersMutation,
  useDeleteWorkspacesByWidUsersMutation,
} = injectedRtkApi;
