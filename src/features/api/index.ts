import { apiSlice as api } from './api';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    $get: build.query<$getApiResponse, $getApiArg>({
      query: () => ({ url: `/` }),
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
    postBuy: build.mutation<PostBuyApiResponse, PostBuyApiArg>({
      query: (queryArg) => ({
        url: `/buy`,
        method: 'POST',
        body: queryArg.body,
      }),
    }),
    getCampaignsByCid: build.query<
      GetCampaignsByCidApiResponse,
      GetCampaignsByCidApiArg
    >({
      query: (queryArg) => ({ url: `/campaigns/${queryArg.cid}` }),
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
        headers: { public_bug_token: queryArg.publicBugToken },
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
    getCampaignsByCidInsights: build.query<
      GetCampaignsByCidInsightsApiResponse,
      GetCampaignsByCidInsightsApiArg
    >({
      query: (queryArg) => ({ url: `/campaigns/${queryArg.cid}/insights` }),
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
    patchCampaignsByCidVideoTagsAndTagId: build.mutation<
      PatchCampaignsByCidVideoTagsAndTagIdApiResponse,
      PatchCampaignsByCidVideoTagsAndTagIdApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns/${queryArg.cid}/video-tags/${queryArg.tagId}`,
        method: 'PATCH',
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
    postCheckout: build.mutation<PostCheckoutApiResponse, PostCheckoutApiArg>({
      query: (queryArg) => ({
        url: `/checkout`,
        method: 'POST',
        body: queryArg.body,
      }),
    }),
    getCompaniesSizes: build.query<
      GetCompaniesSizesApiResponse,
      GetCompaniesSizesApiArg
    >({
      query: () => ({ url: `/companies/sizes` }),
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
    getInsightsByIid: build.query<
      GetInsightsByIidApiResponse,
      GetInsightsByIidApiArg
    >({
      query: (queryArg) => ({ url: `/insights/${queryArg.iid}` }),
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
    getInvitesByProfileAndToken: build.query<
      GetInvitesByProfileAndTokenApiResponse,
      GetInvitesByProfileAndTokenApiArg
    >({
      query: (queryArg) => ({
        url: `/invites/${queryArg.profile}/${queryArg.token}`,
      }),
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
    getMediaById: build.query<GetMediaByIdApiResponse, GetMediaByIdApiArg>({
      query: (queryArg) => ({ url: `/media/${queryArg.id}` }),
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
    getPlansByPidCheckoutItem: build.query<
      GetPlansByPidCheckoutItemApiResponse,
      GetPlansByPidCheckoutItemApiArg
    >({
      query: (queryArg) => ({ url: `/plans/${queryArg.pid}/checkoutItem` }),
    }),
    getPlansByPidRulesEvaluation: build.query<
      GetPlansByPidRulesEvaluationApiResponse,
      GetPlansByPidRulesEvaluationApiArg
    >({
      query: (queryArg) => ({ url: `/plans/${queryArg.pid}/rules-evaluation` }),
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
    postProjects: build.mutation<PostProjectsApiResponse, PostProjectsApiArg>({
      query: (queryArg) => ({
        url: `/projects`,
        method: 'POST',
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
        params: {
          limit: queryArg.limit,
          start: queryArg.start,
          order: queryArg.order,
          orderBy: queryArg.orderBy,
        },
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
    getPublicBugsByDefectIdTokensAndToken: build.query<
      GetPublicBugsByDefectIdTokensAndTokenApiResponse,
      GetPublicBugsByDefectIdTokensAndTokenApiArg
    >({
      query: (queryArg) => ({
        url: `/public/bugs/${queryArg.defectId}/tokens/${queryArg.token}`,
      }),
    }),
    getTemplatesCategories: build.query<
      GetTemplatesCategoriesApiResponse,
      GetTemplatesCategoriesApiArg
    >({
      query: () => ({ url: `/templates/categories` }),
    }),
    postUsers: build.mutation<PostUsersApiResponse, PostUsersApiArg>({
      query: (queryArg) => ({
        url: `/users`,
        method: 'POST',
        body: queryArg.body,
      }),
    }),
    headUsersByEmailByEmail: build.mutation<
      HeadUsersByEmailByEmailApiResponse,
      HeadUsersByEmailByEmailApiArg
    >({
      query: (queryArg) => ({
        url: `/users/by-email/${queryArg.email}`,
        method: 'HEAD',
      }),
    }),
    getUsersMe: build.query<GetUsersMeApiResponse, GetUsersMeApiArg>({
      query: () => ({ url: `/users/me` }),
    }),
    patchUsersMe: build.mutation<PatchUsersMeApiResponse, PatchUsersMeApiArg>({
      query: (queryArg) => ({
        url: `/users/me`,
        method: 'PATCH',
        body: queryArg.body,
      }),
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
    getUsersMeWatchedPlans: build.query<
      GetUsersMeWatchedPlansApiResponse,
      GetUsersMeWatchedPlansApiArg
    >({
      query: () => ({ url: `/users/me/watched/plans` }),
    }),
    getUsersMeWatchedCampaigns: build.query<
      GetUsersMeWatchedCampaignsApiResponse,
      GetUsersMeWatchedCampaignsApiArg
    >({
      query: () => ({ url: `/users/me/watched/campaigns` }),
    }),
    getUsersRoles: build.query<GetUsersRolesApiResponse, GetUsersRolesApiArg>({
      query: () => ({ url: `/users/roles` }),
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
    deleteVideosByVidObservationsAndOid: build.mutation<
      DeleteVideosByVidObservationsAndOidApiResponse,
      DeleteVideosByVidObservationsAndOidApiArg
    >({
      query: (queryArg) => ({
        url: `/videos/${queryArg.vid}/observations/${queryArg.oid}`,
        method: 'DELETE',
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
    getPlansByPidWatchers: build.query<
      GetPlansByPidWatchersApiResponse,
      GetPlansByPidWatchersApiArg
    >({
      query: (queryArg) => ({ url: `/plans/${queryArg.pid}/watchers` }),
    }),
    postPlansByPidWatchers: build.mutation<
      PostPlansByPidWatchersApiResponse,
      PostPlansByPidWatchersApiArg
    >({
      query: (queryArg) => ({
        url: `/plans/${queryArg.pid}/watchers`,
        method: 'POST',
        body: queryArg.body,
      }),
    }),
    putPlansByPidWatchers: build.mutation<
      PutPlansByPidWatchersApiResponse,
      PutPlansByPidWatchersApiArg
    >({
      query: (queryArg) => ({
        url: `/plans/${queryArg.pid}/watchers`,
        method: 'PUT',
        body: queryArg.body,
      }),
    }),
    getCampaignsByCidWatchers: build.query<
      GetCampaignsByCidWatchersApiResponse,
      GetCampaignsByCidWatchersApiArg
    >({
      query: (queryArg) => ({ url: `/campaigns/${queryArg.cid}/watchers` }),
    }),
    postCampaignsByCidWatchers: build.mutation<
      PostCampaignsByCidWatchersApiResponse,
      PostCampaignsByCidWatchersApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns/${queryArg.cid}/watchers`,
        method: 'POST',
        body: queryArg.body,
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
    postWorkspacesByWidTemplates: build.mutation<
      PostWorkspacesByWidTemplatesApiResponse,
      PostWorkspacesByWidTemplatesApiArg
    >({
      query: (queryArg) => ({
        url: `/workspaces/${queryArg.wid}/templates`,
        method: 'POST',
        body: queryArg.body,
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
    deletePlansByPidWatchersAndProfileId: build.mutation<
      DeletePlansByPidWatchersAndProfileIdApiResponse,
      DeletePlansByPidWatchersAndProfileIdApiArg
    >({
      query: (queryArg) => ({
        url: `/plans/${queryArg.pid}/watchers/${queryArg.profileId}`,
        method: 'DELETE',
      }),
    }),
    deleteCampaignsByCidWatchersAndProfileId: build.mutation<
      DeleteCampaignsByCidWatchersAndProfileIdApiResponse,
      DeleteCampaignsByCidWatchersAndProfileIdApiArg
    >({
      query: (queryArg) => ({
        url: `/campaigns/${queryArg.cid}/watchers/${queryArg.profileId}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as unguessApi };
export type $getApiResponse = /** status 200 OK */ {};
export type $getApiArg = void;
export type PostAnalyticsViewsCampaignsByCidApiResponse = /** status 200 OK */ {
  success?: boolean;
};
export type PostAnalyticsViewsCampaignsByCidApiArg = {
  /** Campaign id */
  cid: string;
};
export type PostAuthenticateApiResponse = /** status 200 OK */ Authentication;
export type PostAuthenticateApiArg = {
  body: {
    password: string;
    username: string;
  };
};
export type PostBuyApiResponse = /** status 200 OK */ void;
export type PostBuyApiArg = {
  body: {
    api_version?: string;
    created?: number;
    data: {
      object: {
        /** Checkout id */
        id: string;
        metadata: {
          iv: string;
          key: string;
          tag: string;
        };
        payment_status?: 'paid' | 'unpaid';
      };
    };
    type:
      | 'checkout.session.async_payment_succeeded'
      | 'checkout.session.async_payment_failed'
      | 'checkout.session.completed'
      | 'checkout.session.expired'
      | 'charge.refunded';
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
export type PatchCampaignsByCidApiResponse = /** status 200 OK */ Campaign;
export type PatchCampaignsByCidApiArg = {
  /** Campaign id */
  cid: string;
  body: {
    customer_title?: string;
    project_id?: number;
  };
};
export type GetCampaignsByCidBugTypesApiResponse =
  /** status 200 OK */ BugType[];
export type GetCampaignsByCidBugTypesApiArg = {
  /** Campaign id */
  cid: string;
};
export type GetCampaignsByCidBugsApiResponse = /** status 200 OK */ {
  items?: (Bug & {
    additional_fields?: {
      name: string;
      slug: string;
      value: string;
    }[];
    comments: number;
    siblings: number;
    tags?: {
      tag_id: number;
      tag_name: string;
    }[];
  })[];
  limit?: number;
  size?: number;
  start?: number;
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
    additional_fields: BugAdditionalField[];
    media: BugMedia[];
    reporter: {
      name: string;
      tester_id: number;
    };
    tags: BugTag[];
  };
export type GetCampaignsByCidBugsAndBidApiArg = {
  /** Campaign id */
  cid: string;
  /** Defines an identifier for the bug object (BUG ID) */
  bid: string;
  publicBugToken?: string;
};
export type PatchCampaignsByCidBugsAndBidApiResponse = /** status 200 OK */ {
  custom_status?: BugCustomStatus;
  priority?: BugPriority;
  tags?: {
    tag_id: number;
    tag_name: string;
  }[];
};
export type PatchCampaignsByCidBugsAndBidApiArg = {
  /** Campaign id */
  cid: string;
  /** Defines an identifier for the bug object (BUG ID) */
  bid: string;
  body: {
    custom_status_id?: number;
    priority_id?: number;
    tags?: (
      | {
          tag_id: number;
        }
      | {
          tag_name: string;
        }
    )[];
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
    media_id?: {
      id: number;
    }[];
    mentioned?: {
      id: number;
    }[];
    text: string;
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
export type PostCampaignsByCidBugsAndBidCommentsCmidApiResponse =
  /** status 200 OK */ {
    failed?: {
      errorCode: 'FILE_TOO_BIG' | 'INVALID_FILE_EXTENSION' | 'GENERIC_ERROR';
      name: string;
    }[];
    files?: {
      name: string;
      path: string;
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
export type PostCampaignsByCidBugsAndBidMediaApiResponse =
  /** status 200 OK */ {
    failed?: {
      errorCode: 'FILE_TOO_BIG' | 'INVALID_FILE_EXTENSION' | 'GENERIC_ERROR';
      name: string;
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
export type GetCampaignsByCidBugsAndBidSiblingsApiResponse =
  /** status 200 OK */ {
    father?: {
      context?: string;
      device: string;
      id: number;
      os: {
        name: string;
        version: string;
      };
      title: {
        compact: string;
        context?: string[];
        full: string;
      };
    };
    siblings: {
      context?: string;
      device: string;
      id: number;
      os: {
        name: string;
        version: string;
      };
      title: {
        compact: string;
        context?: string[];
        full: string;
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
    color: string;
    /** se esiste già questo parametro viene passato nel request body\r\nse invece non esiste ed il custom status deve essere creato, non viene passato */
    custom_status_id?: number;
    name: string;
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
export type PostCampaignsByCidInsightsApiResponse =
  /** status 200 OK */ Insight;
export type PostCampaignsByCidInsightsApiArg = {
  /** Campaign id */
  cid: string;
  body: {
    comment?: string;
    description?: string;
    observations_ids: number[];
    severity_id: number;
    title: string;
    visible?: number;
  };
};
export type GetCampaignsByCidMetaApiResponse = /** status 200 OK */ Campaign & {
  /** Array of form factors */
  allowed_devices: string[];
  selected_testers: number;
};
export type GetCampaignsByCidMetaApiArg = {
  /** Campaign id */
  cid: string;
};
export type GetCampaignsByCidObservationsApiResponse =
  /** status 200 OK */
  | {
      kind: 'usecase-grapes';
      results: {
        grapes: Grape[];
        ungrouped: (Observation & {
          deviceType: string;
          mediaId: number;
          uploaderId: number;
          usecaseTitle: string;
        })[];
        usecaseId: number;
        usecaseTitle: string;
      }[];
    }
  | {
      kind: 'ungrouped';
      results: (Observation & {
        deviceType: string;
        mediaId: number;
        uploaderId: number;
        usecaseTitle: string;
      })[];
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
    /** ServiceId from strapi */
    serviceId?: number;
    slug: BannerType;
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
  display_name: string;
  is_public?: number;
  slug: string;
  tag_id: number;
}[];
export type GetCampaignsByCidTagsApiArg = {
  /** Campaign id */
  cid: string;
};
export type GetCampaignsByCidUsecasesApiResponse = /** status 200 OK */ {
  completion: number;
  content?: string;
  id: number;
  title: {
    full: string;
    info?: string;
    prefix?: string;
    simple?: string;
  };
}[];
export type GetCampaignsByCidUsecasesApiArg = {
  /** Campaign id */
  cid: string;
  /** bugs, videos */
  filterBy?: string;
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
export type GetCampaignsByCidUsersApiResponse = /** status 200 OK */ {
  items: Tenant[];
  limit?: number;
  size?: number;
  start?: number;
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
  email: string;
  profile_id: number;
  tryber_wp_user_id: number;
};
export type PostCampaignsByCidUsersApiArg = {
  /** Campaign id */
  cid: string;
  body: {
    email: string;
    event_name?: string;
    locale?: string;
    message?: string;
    name?: string;
    redirect_url?: string;
    surname?: string;
  };
};
export type GetCampaignsByCidUxApiResponse = /** status 200 OK */ {
  findings?: {
    cluster:
      | {
          id: number;
          name: string;
        }[]
      | 'all';
    comment?: string;
    description: string;
    /** this field is the Finding ID */
    id: number;
    severity: {
      id: number;
      name: string;
      style: string;
    };
    title: string;
    video?: {
      description?: string;
      end: number;
      poster?: string;
      start: number;
      streamUrl: string;
      url: string;
    }[];
  }[];
  goal?: string;
  methodology?: {
    description: string;
    type: string;
  };
  questions?: {
    text: string;
  }[];
  sentiment?: {
    cluster: {
      id: number;
      name: string;
    };
    comment: string;
    value: number;
  }[];
  users?: number;
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
export type PatchCampaignsByCidVideoTagsAndTagIdApiResponse =
  /** status 200 OK */ {};
export type PatchCampaignsByCidVideoTagsAndTagIdApiArg = {
  cid: string;
  tagId: string;
  body: {
    newTagName: string;
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
export type PostCheckoutApiResponse = /** status 201 Created */ {
  id: string;
  url: string;
};
export type PostCheckoutApiArg = {
  body: {
    cancel_url?: string;
    meta?: string;
    price_id: string;
    success_url?: string;
  };
};
export type GetCompaniesSizesApiResponse = /** status 200 OK */ {
  id: number;
  name: string;
}[];
export type GetCompaniesSizesApiArg = void;
export type DeleteInsightsByIidApiResponse = /** status 200 OK */ void;
export type DeleteInsightsByIidApiArg = {
  /** Insight id */
  iid: string;
};
export type GetInsightsByIidApiResponse = /** status 200 OK */ Insight;
export type GetInsightsByIidApiArg = {
  /** Insight id */
  iid: string;
};
export type PatchInsightsByIidApiResponse = /** status 200 OK */ Insight;
export type PatchInsightsByIidApiArg = {
  /** Insight id */
  iid: string;
  body: {
    comment?: string;
    description?: string;
    observations_ids?: number[];
    severity_id?: number;
    title?: string;
    visible?: number;
  };
};
export type GetInvitesByProfileAndTokenApiResponse = /** status 200 OK */ {
  email: string;
  name: string;
  surname: string;
  workspace: string;
};
export type GetInvitesByProfileAndTokenApiArg = {
  profile: string;
  token: string;
};
export type DeleteMediaCommentByMcidApiResponse = /** status 200 OK */ object;
export type DeleteMediaCommentByMcidApiArg = {
  mcid: string;
};
export type GetMediaByIdApiResponse = unknown;
export type GetMediaByIdApiArg = {
  id: string;
};
export type DeletePlansByPidApiResponse = unknown;
export type DeletePlansByPidApiArg = {
  pid: string;
};
export type GetPlansByPidApiResponse = /** status 200 OK */ {
  campaign?: {
    id: number;
    startDate: string;
    /** CustomerTitle ?? Title */
    title: string;
  };
  config: {
    modules: Module[];
  };
  from_template?: {
    id: number;
    title: string;
  };
  id: number;
  price?: string;
  project: {
    id: number;
    name: string;
  };
  quote?: {
    id: number;
    status: 'pending' | 'proposed' | 'approved' | 'rejected';
    value: string;
  };
  status: PlanStatus;
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
export type GetPlansByPidCheckoutItemApiResponse = /** status 200 OK */ {
  metadata?: object;
  price_id: string;
  status: string;
};
export type GetPlansByPidCheckoutItemApiArg = {
  pid: string;
};
export type GetPlansByPidRulesEvaluationApiResponse = /** status 200 OK */ {
  failed: PurchasablePlanRules[];
};
export type GetPlansByPidRulesEvaluationApiArg = {
  pid: string;
};
export type PatchPlansByPidStatusApiResponse = /** status 200 OK */ {};
export type PatchPlansByPidStatusApiArg = {
  pid: string;
  body: {
    status: PlanStatus;
  };
};
export type PostProjectsApiResponse = /** status 200 OK */ Project;
export type PostProjectsApiArg = {
  body: {
    customer_id: number;
    description?: string;
    name: string;
  };
};
export type DeleteProjectsByPidApiResponse = /** status 200 OK */ void;
export type DeleteProjectsByPidApiArg = {
  /** Project id */
  pid: string;
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
export type GetProjectsByPidCampaignsApiResponse = /** status 200 OK */ {
  items?: CampaignWithOutput[];
  limit?: number;
  size?: number;
  start?: number;
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
export type DeleteProjectsByPidUsersApiResponse = /** status 200 OK */ {
  items: Tenant[];
};
export type DeleteProjectsByPidUsersApiArg = {
  /** Project id */
  pid: string;
  body: {
    include_shared?: boolean;
    /** Tryber WP USER ID */
    user_id: number;
  };
};
export type GetProjectsByPidUsersApiResponse = /** status 200 OK */ {
  items: Tenant[];
  limit?: number;
  size?: number;
  start?: number;
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
  email: string;
  profile_id: number;
  tryber_wp_user_id: number;
};
export type PostProjectsByPidUsersApiArg = {
  /** Project id */
  pid: string;
  body: {
    email: string;
    event_name?: string;
    locale?: string;
    message?: string;
    name?: string;
    redirect_url?: string;
    surname?: string;
  };
};
export type GetPublicBugsByDefectIdTokensAndTokenApiResponse =
  /** status 200 OK */ {
    bugId: number;
    campaignId: number;
    campaignTitle: string;
  };
export type GetPublicBugsByDefectIdTokensAndTokenApiArg = {
  /** Public bug link id */
  defectId: number;
  token: string;
};
export type GetTemplatesCategoriesApiResponse = /** status 200 OK */ {
  description?: string;
  id: number;
  name: string;
}[];
export type GetTemplatesCategoriesApiArg = void;
export type PostUsersApiResponse = /** status 201 Created */ {
  projectId?: number;
  workspaceId: number;
};
export type PostUsersApiArg = {
  body: {
    companySizeId: number;
    name: string;
    password: string;
    roleId: number;
    surname: string;
    templateId?: number;
  } & (
    | DataForPostUsersRequestForInvitedUser
    | DataForPostUsersRequestForNewUser
  );
};
export type HeadUsersByEmailByEmailApiResponse = unknown;
export type HeadUsersByEmailByEmailApiArg = {
  email: string;
};
export type GetUsersMeApiResponse = /** status 200  */ User;
export type GetUsersMeApiArg = void;
export type PatchUsersMeApiResponse = /** status 200 OK */ {
  companySize?: string;
  name?: string;
  role?: string;
  surname?: string;
};
export type PatchUsersMeApiArg = {
  body: {
    companySizeId?: number;
    name?: string;
    password?: {
      current: string;
      new: string;
    };
    roleId?: number;
    surname?: string;
  };
};
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
export type GetUsersMeWatchedPlansApiResponse = /** status 200  */ {
  items: {
    id?: number;
    name?: string;
    project?: {
      name?: string;
      id?: number;
    };
    isLast?: boolean;
  }[];
  allItems: number;
};
export type GetUsersMeWatchedPlansApiArg = void;
export type GetUsersMeWatchedCampaignsApiResponse = /** status 200  */ {
  items: {
    id?: number;
    name?: string;
    project?: {
      name?: string;
      id?: number;
    };
    isLast?: boolean;
  }[];
  allItems: number;
};
export type GetUsersMeWatchedCampaignsApiArg = void;
export type GetUsersRolesApiResponse = /** status 200 OK */ {
  id: number;
  name: string;
}[];
export type GetUsersRolesApiArg = void;
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
    end: number;
    start: number;
  };
};
export type DeleteVideosByVidObservationsAndOidApiResponse = unknown;
export type DeleteVideosByVidObservationsAndOidApiArg = {
  vid: string;
  oid: string;
};
export type PatchVideosByVidObservationsAndOidApiResponse =
  /** status 200 OK */ Observation;
export type PatchVideosByVidObservationsAndOidApiArg = {
  vid: string;
  oid: string;
  body: {
    description?: string;
    end?: number;
    quotes?: string;
    start?: number;
    tags?: number[];
    title?: string;
  };
};
export type GetVideosByVidTranslationApiResponse = /** status 200 OK */ {
  language: string;
  processing: number;
  sentences: {
    end: number;
    start: number;
    text: string;
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
  limit?: number;
  size?: number;
  start?: number;
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
  company: string;
  id: number;
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
  campaignsCounter: number;
  description: string;
  id: number;
  name: string;
};
export type GetWorkspacesByWidArchiveApiArg = {
  /** Workspace (company, customer) id */
  wid: string;
};
export type GetWorkspacesByWidCampaignsApiResponse = /** status 200 OK */ {
  items?: CampaignWithOutput[];
  limit?: number;
  size?: number;
  start?: number;
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
  limit?: number;
  size?: number;
  start?: number;
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
export type GetWorkspacesByWidPlansApiResponse = /** status 200 OK */ {
  id: number;
  project: {
    id: number;
    title: string;
  };
  quote?: {
    id: number;
    status: 'pending' | 'proposed' | 'approved' | 'rejected';
  };
  status: PlanStatus;
  title: string;
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
export type PostWorkspacesByWidPlansApiResponse = /** status 201 Created */ {
  id: number;
};
export type PostWorkspacesByWidPlansApiArg = {
  wid: string;
  body: {
    project_id: number;
    template_id: number;
  };
};
export type GetWorkspacesByWidProjectsApiResponse = /** status 200 OK */ {
  items?: Project[];
  limit?: number;
  size?: number;
  start?: number;
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
    limit?: number;
    size?: number;
    start?: number;
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
export type GetPlansByPidWatchersApiResponse = /** status 200 OK */ {
  items: {
    id: number;
    name: string;
    surname: string;
    email: string;
    image?: string;
    isInternal: boolean;
  }[];
};
export type GetPlansByPidWatchersApiArg = {
  pid: string;
};
export type PostPlansByPidWatchersApiResponse = /** status 200 OK */ void;
export type PostPlansByPidWatchersApiArg = {
  pid: string;
  body: {
    users: {
      id: number;
    }[];
  };
};
export type PutPlansByPidWatchersApiResponse = /** status 200 OK */ void;
export type PutPlansByPidWatchersApiArg = {
  pid: string;
  body: {
    users: {
      id: number;
    }[];
  };
};
export type GetCampaignsByCidWatchersApiResponse = /** status 200 OK */ {
  items: {
    id: number;
    name: string;
    surname: string;
    email: string;
    image?: string;
    isInternal: boolean;
  }[];
};
export type GetCampaignsByCidWatchersApiArg = {
  cid: string;
};
export type PostCampaignsByCidWatchersApiResponse = /** status 200 OK */ void;
export type PostCampaignsByCidWatchersApiArg = {
  cid: string;
  body: {
    users: {
      id: number;
    }[];
  };
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
export type PostWorkspacesByWidTemplatesApiResponse =
  /** status 201 Created */ {
    id: number;
  };
export type PostWorkspacesByWidTemplatesApiArg = {
  /** Workspace (company, customer) id */
  wid: string;
  body: {
    description?: string;
    from_plan: number;
    name: string;
  };
};
export type DeleteWorkspacesByWidTemplatesAndTidApiResponse =
  /** status 200 OK */ {};
export type DeleteWorkspacesByWidTemplatesAndTidApiArg = {
  wid: string;
  tid: string;
};
export type GetWorkspacesByWidTemplatesAndTidApiResponse =
  /** status 200 OK */ {
    config: string;
    description?: string;
    id: number;
    name: string;
    price?: string;
    strapi?: StrapiTemplate;
    workspace_id?: number;
  };
export type GetWorkspacesByWidTemplatesAndTidApiArg = {
  wid: string;
  tid: string;
};
export type DeleteWorkspacesByWidUsersApiResponse = /** status 200 OK */ {
  items: Tenant[];
};
export type DeleteWorkspacesByWidUsersApiArg = {
  /** Workspace (company, customer) id */
  wid: string;
  body: {
    include_shared?: boolean;
    /** Tryber WP USER ID */
    user_id: number;
  };
};
export type GetWorkspacesByWidUsersApiResponse = /** status 200 OK */ {
  items: Tenant[];
  limit?: number;
  size?: number;
  start?: number;
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
  email: string;
  profile_id: number;
  tryber_wp_user_id: number;
};
export type PostWorkspacesByWidUsersApiArg = {
  /** Workspace (company, customer) id */
  wid: string;
  body: {
    email: string;
    event_name?: string;
    locale?: string;
    message?: string;
    name?: string;
    redirect_url?: string;
    surname?: string;
  };
};
export type DeletePlansByPidWatchersAndProfileIdApiResponse =
  /** status 200 OK */ {
    success?: boolean;
  };
export type DeletePlansByPidWatchersAndProfileIdApiArg = {
  pid: string;
  profileId: string;
};
export type DeleteCampaignsByCidWatchersAndProfileIdApiResponse =
  /** status 200 OK */ {
    success?: boolean;
  };
export type DeleteCampaignsByCidWatchersAndProfileIdApiArg = {
  profileId: string;
  cid: string;
};
export type Error = {
  code: number;
  error: boolean;
  message: string;
};
export type Authentication = {
  email: string;
  exp?: number;
  iat?: number;
  id: number;
  name: string;
  picture?: string;
  role: string;
  token: string;
};
export type Campaign = {
  base_bug_internal_id?: string;
  /** -1: no bug form;
    0: only bug form;
    1: bug form with bug parade; */
  bug_form?: number;
  close_date: string;
  customer_title: string;
  description?: string;
  end_date: string;
  family: {
    id: number;
    name: string;
  };
  id: number;
  is_public: number;
  project: {
    id: number;
    name: string;
  };
  start_date: string;
  status: {
    id: number;
    name: string;
  };
  title: string;
  type: {
    id: number;
    name: string;
  };
  workspace: {
    id: number;
    name: string;
  };
};
export type Output = 'bugs' | 'media' | 'insights';
export type CampaignWithOutput = Campaign & {
  outputs?: Output[];
};
export type BugType = {
  id: number;
  name: string;
};
export type BugCustomStatusPhase = {
  id: number;
  name: string;
};
export type BugCustomStatus = {
  color: string;
  id: number;
  is_default: number;
  name: string;
  phase: BugCustomStatusPhase;
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
export type BugPriority = {
  id: number;
  name: string;
};
export type BugReplicability = {
  id: number;
  name: string;
};
export type BugSeverity = {
  id: number;
  name: string;
};
export type BugStatus = {
  id: number;
  name: string;
};
export type BugTitle = {
  /** Bug title without context. */
  compact: string;
  context?: string[];
  full: string;
};
export type Bug = {
  application_section: {
    id?: number;
    prefix_title?: string;
    simple_title?: string;
    title?: string;
  };
  campaign_id: number;
  created: string;
  current_result: string;
  custom_status: BugCustomStatus;
  device: Smartphone | Tablet | Desktop;
  duplicated_of_id?: number;
  expected_result: string;
  id: number;
  internal_id: string;
  is_favorite?: number;
  note?: string;
  occurred_date: string;
  priority: BugPriority;
  read?: boolean;
  replicability: BugReplicability;
  severity: BugSeverity;
  status: BugStatus;
  step_by_step: string;
  title: BugTitle;
  type: BugType;
  updated?: string;
};
export type BugAdditionalFieldRegex = {
  kind: 'regex';
  validation: string;
};
export type BugAdditionalFieldSelect = {
  kind: 'select';
  options: string[];
};
export type BugAdditionalField = {
  id: number;
  name: string;
  value: string;
} & (BugAdditionalFieldRegex | BugAdditionalFieldSelect);
export type BugMedia = {
  creation_date: string;
  mime_type: {
    extension: string;
    type: 'video' | 'image' | 'other';
  };
  url: string;
};
export type BugTag = {
  author_tid?: number;
  author_wp_id?: number;
  bug_id: number;
  campaign_id: number;
  creation_date: string;
  id: number;
  is_visible_to_customer?: number;
  name: string;
  slug: string;
  tag_id: number;
};
export type BugComment = {
  creation_date: string;
  creator: {
    id: number;
    isInternal: boolean;
    name: string;
  };
  id: number;
  media?: {
    id: number;
    type: string;
    url: string;
  }[];
  text: string;
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
  description: string;
  end: number;
  id: number;
  quotes: string;
  start: number;
  tags: VideoTag[];
  title: string;
  uxNote?: string;
};
export type Insight = {
  comment?: string;
  description: string;
  id: number;
  observations: (Observation & {
    uploaderId: number;
    usecaseTitle: string;
    video: {
      deviceType: string;
      id: number;
    };
  })[];
  severity: {
    id: number;
    name: string;
    style: string;
  };
  title: string;
  visible?: number;
};
export type Grape = {
  observations: (Observation & {
    deviceType: string;
    mediaId: number;
    uploaderId: number;
    usecaseTitle: string;
  })[];
  severity: string;
  title: string;
  usersNumber: number;
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
  creation_date?: string;
  description?: string;
  file_type?: {
    domain_name?: string;
    extension?: ReportExtensions;
    type: string;
  };
  id?: number;
  title?: string;
  update_date?: string;
  url: string;
};
export type BannerType =
  | 'banner_testing_automation'
  | 'banner_user_experience'
  | 'banner_cyber_security';
export type Tenant = {
  email: string;
  /** tryber wp_user_id */
  id: number;
  invitationPending: boolean;
  name: string;
  permissionFrom?: {
    id?: number;
    type?: 'workspace' | 'project';
  };
  profile_id: number;
};
export type MediaSentiment = {
  paragraphs: {
    end: number;
    reason: string;
    start: number;
    value: number;
  }[];
  reason: string;
  value: number;
};
export type Word = {
  end: number;
  /** Id of Speaker */
  speaker?: number;
  start: number;
  word: string;
};
export type Paragraph = {
  end: number;
  /** Id Of speaker */
  speaker?: number;
  start: number;
  text: string;
  words: Word[];
};
export type Transcript = {
  paragraphs: Paragraph[];
  /** Number of spekers */
  speakers: number;
};
export type Video = {
  duration?: number;
  id: number;
  poster?: string;
  sentiment?: MediaSentiment;
  streamUrl?: string;
  tester: {
    device: {
      type: 'smartphone' | 'tablet' | 'desktop' | 'other';
    };
    id: number;
    name: string;
    surname: string;
  };
  transcript?: Transcript;
  url: string;
};
export type PaginationData = {
  limit?: number;
  size?: number;
  start?: number;
  total?: number;
};
export type WidgetBugsByUseCase = {
  data: {
    bugs: number;
    description: string;
    title: {
      full: string;
      info?: string;
      prefix?: string;
      simple?: string;
    };
    uniqueBugs?: number;
    usecase_completion?: number;
    usecase_id: number;
  }[];
  kind: 'bugsByUseCase';
};
export type WidgetBugsByDevice = {
  data: ((Smartphone | Desktop | Tablet) & {
    /** Unique bugs */
    bugs: number;
    unique_bugs: number;
  })[];
  kind: 'bugsByDevice';
};
export type WidgetCampaignProgress = {
  data: {
    end_date: string;
    /** Expected amount of hours required to complete the campaign */
    expected_duration: number;
    start_date: string;
    /** Number of hours from start_date */
    time_elapsed: number;
    /** Percentage fixed rate of completion */
    usecase_completion: 12.5 | 37.5 | 62.5 | 87.5 | 100;
  };
  kind: 'campaignProgress';
};
export type WidgetCampaignUniqueBugs = {
  data: {
    total: number;
    trend: number;
    unique: number;
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
    countMedia: number;
    countMediaWithObservation: number;
  };
  kind: 'uxTaggingVideoCompletion';
};
export type WidgetCampaignUxTotalTitlesVsRecurrentTitles = {
  data: {
    countObservationNoTitle: number;
    countRecurrentTitles: number;
    countTitleTag: number;
  };
  kind: 'uxTotalTitlesVsRecurrentTitles';
};
export type WidgetCampaignUxSeveritiesDistribution = {
  data: {
    countObservations: number;
    severitiesDistribution: {
      countMajorIssue: number;
      countMinorIssue: number;
      countObservationSeverity: number;
      countPositiveFindings: number;
    };
  };
  kind: 'uxSeveritiesDistribution';
};
export type WidgetCampaignUxMostUsedTitles = {
  data: {
    mostUsedTitles: {
      mainSeverityAssignment: string;
      title: string;
      usage: number;
    }[];
  };
  kind: 'uxMostUsedTitles';
};
export type ModuleTitle = {
  output: string;
  type: 'title';
  variant: string;
};
export type ModuleDate = {
  output: {
    start: string;
  };
  type: 'dates';
  variant: string;
};
export type SubcomponentTaskVideo = {
  description?: string;
  id?: string;
  kind: 'video';
  title: string;
  url?: string;
};
export type SubcomponentTaskBug = {
  description?: string;
  id?: string;
  kind: 'bug';
  title: string;
  url?: string;
};
export type SubcomponentTaskSurvey = {
  description?: string;
  id?: string;
  kind: 'survey';
  title: string;
  url?: string;
};
export type OutputModuleTaskModerateVideo = {
  description?: string;
  id?: string;
  kind: 'moderate-video';
  title: string;
  url?: string;
};
export type OutputModuleTaskExplorativeBug = {
  description?: string;
  id?: string;
  kind: 'explorative-bug';
  title: string;
  url?: string;
};
export type OutputModuleTaskAccessibility = {
  description?: string;
  id?: string;
  kind: 'accessibility';
  title: string;
  url?: string;
};
export type SubcomponentTask =
  | SubcomponentTaskVideo
  | SubcomponentTaskBug
  | SubcomponentTaskSurvey
  | OutputModuleTaskModerateVideo
  | OutputModuleTaskExplorativeBug
  | OutputModuleTaskAccessibility;
export type ModuleTask = {
  output: SubcomponentTask[];
  type: 'tasks';
  variant: string;
};
export type OutputModuleAge = {
  max: number;
  min: number;
  percentage: number;
}[];
export type ModuleAge = {
  output: OutputModuleAge;
  type: 'age';
  variant: string;
};
export type ModuleLanguage = {
  output: string;
  type: 'language';
  variant: string;
};
export type OutputModuleLiteracy = {
  level: 'beginner' | 'intermediate' | 'expert';
  percentage: number;
}[];
export type ModuleLiteracy = {
  output: OutputModuleLiteracy;
  type: 'literacy';
  variant: string;
};
export type ModuleTarget = {
  output: number;
  type: 'target';
  variant: string;
};
export type ModuleGoal = {
  output: string;
  type: 'goal';
  variant: string;
};
export type OutputModuleGender = {
  gender: 'male' | 'female';
  percentage: number;
}[];
export type ModuleGender = {
  output: OutputModuleGender;
  type: 'gender';
  variant: string;
};
export type ModuleOutOfScope = {
  output: string;
  type: 'out_of_scope';
  variant: string;
};
export type OutputModuleBrowser = {
  name: 'firefox' | 'edge' | 'chrome' | 'safari';
  percentage: number;
}[];
export type ModuleBrowser = {
  output: OutputModuleBrowser;
  type: 'browser';
  variant: string;
};
export type ModuleTargetNote = {
  output: string;
  type: 'target_note';
  variant: string;
};
export type ModuleInstructionNote = {
  output: string;
  type: 'instruction_note';
  variant: string;
};
export type ModuleSetupNote = {
  output: string;
  type: 'setup_note';
  variant: string;
};
export type OutputModuleTouchpointsAppDesktop = {
  form_factor: 'desktop';
  kind: 'app';
  os: {
    linux?: string;
    macos?: string;
    windows?: string;
  };
};
export type OutputModuleTouchpointsAppTablet = {
  form_factor: 'tablet';
  kind: 'app';
  os: {
    ios?: string;
    android?: string;
  };
};
export type OutputModuleTouchpointsAppSmartphone = {
  form_factor: 'smartphone';
  kind: 'app';
  os: {
    android?: string;
    ios?: string;
  };
};
export type OutputModuleTouchpointsWebDesktop = {
  form_factor: 'desktop';
  kind: 'web';
  os: {
    linux?: string;
    macos?: string;
    windows?: string;
  };
};
export type OutputModuleTouchpointsWebTablet = {
  form_factor: 'tablet';
  kind: 'web';
  os: {
    android?: string;
    ios?: string;
  };
};
export type OutputModuleTouchpointsWebSmartphone = {
  form_factor: 'smartphone';
  kind: 'web';
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
  output: SubcomponentTouchpoints[];
  type: 'touchpoints';
  variant: string;
};
export type ModuleAdditionalTarget = {
  output: string;
  type: 'additional_target';
  variant: string;
};
export type ModuleEmployment = {
  /** cuf values of cuf employment */
  output: (
    | 'EMPLOYEE'
    | 'FREELANCER'
    | 'RETIRED'
    | 'STUDENT'
    | 'UNEMPLOYED'
    | 'HOMEMAKER'
  )[];
  type: 'employment';
  variant: string;
};
export type OutputModuleLocality = {
  type: string;
  values: string[];
}[];
export type ModuleLocality = {
  output: OutputModuleLocality;
  type: 'locality';
  variant: string;
};
export type OutputServiceProviders = {
  isOther?: number;
  name: string;
}[];
export type ModuleBank = {
  output: OutputServiceProviders;
  type: 'bank';
  variant: string;
};
export type ModuleElettricitySupply = {
  output: OutputServiceProviders;
  type: 'elettricity_supply';
  variant: string;
};
export type ModuleMobileInternet = {
  output: OutputServiceProviders;
  type: 'mobile_internet';
  variant: string;
};
export type ModuleHomeInternet = {
  output: OutputServiceProviders;
  type: 'home_internet';
  variant: string;
};
export type ModuleGasSupply = {
  output: OutputServiceProviders;
  type: 'gas_supply';
  variant: string;
};
export type OutputModuleIncomeRange = {
  max: number;
  min: number;
  percentage: number;
}[];
export type ModuleAnnualIncomeRange = {
  output: OutputModuleIncomeRange;
  type: 'annual_income_range';
  variant: string;
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
  | ModuleAdditionalTarget
  | ModuleEmployment
  | ModuleLocality
  | ModuleBank
  | ModuleElettricitySupply
  | ModuleMobileInternet
  | ModuleHomeInternet
  | ModuleGasSupply
  | ModuleAnnualIncomeRange;
export type PlanStatus = 'pending_review' | 'draft' | 'approved' | 'paying';
export type PurchasablePlanRules =
  | 'number_of_modules'
  | 'module_type'
  | 'number_of_testers'
  | 'number_of_tasks'
  | 'task_type'
  | 'duplicate_touchpoint_form_factors';
export type Project = {
  campaigns_count: number;
  description?: string;
  id: number;
  is_archive?: number;
  name: string;
  workspaceId: number;
};
export type DataForPostUsersRequestForInvitedUser = {
  profileId: number;
  token: string;
  type: 'invite';
};
export type DataForPostUsersRequestForNewUser = {
  email: string;
  type: 'new';
  workspace: string;
};
export type Feature = {
  name?: string;
  slug?: string;
};
export type User = {
  company_size: string;
  customer_role: string;
  email: string;
  features?: Feature[];
  first_name: string;
  /** This is the main id of the user. Currently is equal to tryber_wp_user_id */
  id: number;
  last_name: string;
  name: string;
  picture?: string;
  profile_id: number;
  role: string;
  tryber_wp_user_id: number;
  unguess_wp_user_id: number;
};
export type UserPreference = {
  name: string;
  preference_id: number;
  value: string;
};
export type Workspace = {
  /** express coins */
  coins?: number;
  company: string;
  csm: {
    email: string;
    id: number;
    name: string;
    picture?: string;
    profile_id: number;
    tryber_wp_user_id: number;
    url?: string;
  };
  id: number;
  /** Do this workspace have shared items? */
  isShared?: boolean;
  logo?: string;
  /** Number of shared items */
  sharedItems?: number;
  tokens: number;
};
export type Coin = {
  agreement_id?: number;
  /** Number of available coin */
  amount: number;
  created_on?: string;
  customer_id: number;
  id: number;
  /** This is the single coin price */
  price?: number;
  /** On each coin use, the related package will be updated */
  updated_on?: string;
};
export type StrapiTemplate = {
  background?: string;
  description: string;
  how?: {
    description: string;
    icon: string;
    title: string;
  }[];
  image?: string;
  output_image?: string;
  pre_title: string;
  price?: {
    is_strikethrough?: number;
    previous_price?: string;
    price: string;
  };
  requirements?: {
    description: string;
    list: string[];
  };
  tags: {
    icon: string;
    text: string;
  }[];
  title: string;
  what?: {
    description: string;
    goal: string;
  };
  why?: {
    advantages: string[];
    reasons: {
      description: string;
      icon: string;
      title: string;
    }[];
  };
};
export type CpReqTemplate = {
  category_id: number;
  config: string;
  description?: string;
  id: number;
  name: string;
  price?: string;
  strapi?: StrapiTemplate;
  workspace_id?: number;
};
export const {
  use$getQuery,
  usePostAnalyticsViewsCampaignsByCidMutation,
  usePostAuthenticateMutation,
  usePostBuyMutation,
  useGetCampaignsByCidQuery,
  usePatchCampaignsByCidMutation,
  useGetCampaignsByCidBugTypesQuery,
  useGetCampaignsByCidBugsQuery,
  useGetCampaignsByCidBugsAndBidQuery,
  usePatchCampaignsByCidBugsAndBidMutation,
  useGetCampaignsByCidBugsAndBidCommentsQuery,
  usePostCampaignsByCidBugsAndBidCommentsMutation,
  useDeleteCampaignsByCidBugsAndBidCommentsCmidMutation,
  usePostCampaignsByCidBugsAndBidCommentsCmidMutation,
  usePostCampaignsByCidBugsAndBidMediaMutation,
  useGetCampaignsByCidBugsAndBidSiblingsQuery,
  useGetCampaignsByCidClustersQuery,
  useDeleteCampaignsByCidCustomStatusesMutation,
  useGetCampaignsByCidCustomStatusesQuery,
  usePatchCampaignsByCidCustomStatusesMutation,
  useGetCampaignsByCidDevicesQuery,
  usePutCampaignsByCidFindingsAndFidMutation,
  useGetCampaignsByCidInsightsQuery,
  usePostCampaignsByCidInsightsMutation,
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
  useDeleteCampaignsByCidUsersMutation,
  useGetCampaignsByCidUsersQuery,
  usePostCampaignsByCidUsersMutation,
  useGetCampaignsByCidUxQuery,
  useGetCampaignsByCidVideoTagsQuery,
  usePostCampaignsByCidVideoTagsMutation,
  usePatchCampaignsByCidVideoTagsAndTagIdMutation,
  useGetCampaignsByCidVideosQuery,
  useGetCampaignsByCidWidgetsQuery,
  usePostCheckoutMutation,
  useGetCompaniesSizesQuery,
  useDeleteInsightsByIidMutation,
  useGetInsightsByIidQuery,
  usePatchInsightsByIidMutation,
  useGetInvitesByProfileAndTokenQuery,
  useDeleteMediaCommentByMcidMutation,
  useGetMediaByIdQuery,
  useDeletePlansByPidMutation,
  useGetPlansByPidQuery,
  usePatchPlansByPidMutation,
  useGetPlansByPidCheckoutItemQuery,
  useGetPlansByPidRulesEvaluationQuery,
  usePatchPlansByPidStatusMutation,
  usePostProjectsMutation,
  useDeleteProjectsByPidMutation,
  useGetProjectsByPidQuery,
  usePatchProjectsByPidMutation,
  useGetProjectsByPidCampaignsQuery,
  useDeleteProjectsByPidUsersMutation,
  useGetProjectsByPidUsersQuery,
  usePostProjectsByPidUsersMutation,
  useGetPublicBugsByDefectIdTokensAndTokenQuery,
  useGetTemplatesCategoriesQuery,
  usePostUsersMutation,
  useHeadUsersByEmailByEmailMutation,
  useGetUsersMeQuery,
  usePatchUsersMeMutation,
  useGetUsersMePreferencesQuery,
  usePutUsersMePreferencesBySlugMutation,
  useGetUsersMeWatchedPlansQuery,
  useGetUsersMeWatchedCampaignsQuery,
  useGetUsersRolesQuery,
  useGetVideosByVidQuery,
  useGetVideosByVidObservationsQuery,
  usePostVideosByVidObservationsMutation,
  useDeleteVideosByVidObservationsAndOidMutation,
  usePatchVideosByVidObservationsAndOidMutation,
  useGetVideosByVidTranslationQuery,
  usePostVideosByVidTranslationMutation,
  useGetWorkspacesQuery,
  usePostWorkspacesMutation,
  useGetWorkspacesByWidQuery,
  useGetWorkspacesByWidArchiveQuery,
  useGetWorkspacesByWidCampaignsQuery,
  useGetWorkspacesByWidCoinsQuery,
  useGetWorkspacesByWidPlansQuery,
  usePostWorkspacesByWidPlansMutation,
  useGetWorkspacesByWidProjectsQuery,
  useGetWorkspacesByWidProjectsAndPidQuery,
  useGetWorkspacesByWidProjectsAndPidCampaignsQuery,
  useGetPlansByPidWatchersQuery,
  usePostPlansByPidWatchersMutation,
  usePutPlansByPidWatchersMutation,
  useGetCampaignsByCidWatchersQuery,
  usePostCampaignsByCidWatchersMutation,
  useGetWorkspacesByWidTemplatesQuery,
  usePostWorkspacesByWidTemplatesMutation,
  useDeleteWorkspacesByWidTemplatesAndTidMutation,
  useGetWorkspacesByWidTemplatesAndTidQuery,
  useDeleteWorkspacesByWidUsersMutation,
  useGetWorkspacesByWidUsersQuery,
  usePostWorkspacesByWidUsersMutation,
  useDeletePlansByPidWatchersAndProfileIdMutation,
  useDeleteCampaignsByCidWatchersAndProfileIdMutation,
} = injectedRtkApi;
