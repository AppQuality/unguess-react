import { unguessApi } from '.';

unguessApi.enhanceEndpoints({
  endpoints: {
    getWorkspaces: {
      providesTags: ['Workspaces'],
    },
    getWorkspacesByWid: {
      providesTags: ['Workspaces'],
    },
    getWorkspacesByWidCampaigns: {
      providesTags: ['Campaigns', 'Projects'],
    },
    getWorkspacesByWidProjects: {
      providesTags: ['Projects'],
    },
    getWorkspacesByWidProjectsAndPid: {
      providesTags: ['Projects'],
    },
    getWorkspacesByWidProjectsAndPidCampaigns: {
      providesTags: ['Campaigns', 'Projects'],
    },
    getProjectsByPidCampaigns: {
      providesTags: ['Campaigns', 'Projects'],
    },
    getProjectsByPid: {
      providesTags: ['Projects'],
    },
    patchProjectsByPid: {
      invalidatesTags: ['Projects'],
    },
    postCampaigns: {
      invalidatesTags: ['Campaigns'],
    },
    patchCampaignsByCid: {
      invalidatesTags: ['Campaigns'],
    },
    postProjects: {
      invalidatesTags: ['Projects'],
    },
    getWorkspacesByWidCoins: {
      providesTags: ['Workspaces'],
    },
    getTemplates: {
      providesTags: ['Templates'],
    },
    getCampaignsByCidReports: {
      providesTags: ['Reports'],
    },
    getCampaignsByCid: {
      providesTags: ['Campaigns'],
    },
    getCampaignsByCidBugs: {
      providesTags: ['Bugs'],
    },
    getCampaignsByCidWidgets: {
      providesTags: ['Bugs'],
    },
    patchCampaignsByCidBugsAndBid: {
      invalidatesTags: ['Bugs'],
    },
    getCampaignsByCidTags: {
      providesTags: ['Tags'],
    },
    getCampaignsByCidBugsAndBid: {
      providesTags: ['Tags', 'Bugs'],
    },
    getWorkspacesByWidUsers: {
      providesTags: ['Users'],
    },
    postWorkspacesByWidUsers: {
      invalidatesTags: ['Users'],
    },
    deleteWorkspacesByWidUsers: {
      invalidatesTags: ['Users'],
    },
    getCampaignsByCidCustomStatuses: {
      providesTags: ['CustomStatuses'],
    },
    deleteCampaignsByCidCustomStatuses: {
      invalidatesTags: ['CustomStatuses', 'Bugs', 'Tags'],
    },
    patchCampaignsByCidCustomStatuses: {
      invalidatesTags: ['CustomStatuses', 'Bugs', 'Tags'],
    },
  },
});

export { unguessApi as unguessApiSlice };
