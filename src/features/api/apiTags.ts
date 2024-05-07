import { usePostVideoByVidObservationsMutation } from 'src/features/api';
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
      invalidatesTags: ['Bugs', 'Bug'],
    },
    getCampaignsByCidTags: {
      providesTags: ['Tags'],
    },
    getCampaignsByCidBugsAndBid: {
      providesTags: ['Tags', 'Bug'],
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
    getCampaignsByCidBugsAndBidComments: {
      providesTags: ['BugComments'],
    },
    deleteCampaignsByCidBugsAndBidCommentsCmid: {
      invalidatesTags: ['BugComments'],
    },
    getUsersMePreferences: {
      providesTags: ['Preferences'],
    },
    putUsersMePreferencesByPrefid: {
      invalidatesTags: ['Preferences'],
    },
    getVideoByVidObservations: {
      providesTags: ['Observations'],
    },
    postVideoByVidObservations: {
      invalidatesTags: ['Observations'],
    },
    postCampaignsByCidBugsAndBidComments: {
      invalidatesTags: ['Bugs'],
      async onQueryStarted({ cid, bid }, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedPost } = await queryFulfilled;
          dispatch(
            unguessApi.util.updateQueryData(
              'getCampaignsByCidBugsAndBidComments',
              { cid, bid },
              (draft) => {
                draft.items.push(updatedPost);
              }
            )
          );
        } catch {
          dispatch(unguessApi.util.invalidateTags(['BugComments']));
        }
      },
    },
    getCampaignsByCidVideoTags: {
      providesTags: ['VideoTags'],
    },
    postCampaignsByCidVideoTags: {
      invalidatesTags: ['VideoTags'],
    },
    getVideoByVidObservations: {
      providesTags: ['Observations'],
    },
    postVideoByVidObservations: {
      invalidatesTags: ['Observations'],
    },
    patchVideoByVidObservationsAndOid: {
      invalidatesTags: ['Observations'],
    },
    deleteVideoByVidObservationsAndOid: {
      invalidatesTags: ['Observations'],
    },
  },
});

export { unguessApi as unguessApiSlice };
