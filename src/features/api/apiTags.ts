import { unguessApi } from '.';

unguessApi.enhanceEndpoints({
  endpoints: {
    getUsersMe: {
      providesTags: ['User'],
    },
    getWorkspaces: {
      providesTags: ['Workspaces'],
    },
    getWorkspacesByWid: {
      providesTags: ['Workspaces'],
    },
    getWorkspacesByWidCampaigns: {
      providesTags: ['Campaigns'],
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
  },
});
