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
    getVideosByVidObservations: {
      providesTags: ['Observations'],
    },
    postVideosByVidObservations: {
      async onQueryStarted({ vid }, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedPost } = await queryFulfilled;
          dispatch(
            unguessApi.util.updateQueryData(
              'getVideosByVidObservations',
              { vid },
              (draft) => {
                draft.push(updatedPost);
                draft.sort((a, b) => a.start - b.start);
              }
            )
          );
        } catch {
          dispatch(unguessApi.util.invalidateTags(['Observations']));
        }
      },
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
    patchVideosByVidObservationsAndOid: {
      async onQueryStarted({ vid, oid }, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedPatch } = await queryFulfilled;
          dispatch(
            unguessApi.util.updateQueryData(
              'getVideosByVidObservations',
              { vid },
              (draft) => {
                const index = draft.findIndex(
                  (observation) => observation.id === Number(oid)
                );
                if (index !== -1) {
                  draft[index] = { ...updatedPatch };
                }
              }
            )
          );
          dispatch(unguessApi.util.invalidateTags(['VideoTags', 'Insights']));
        } catch {
          dispatch(unguessApi.util.invalidateTags(['Observations']));
        }
      },
    },
    deleteVideosByVidObservationsAndOid: {
      async onQueryStarted({ vid, oid }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            unguessApi.util.updateQueryData(
              'getVideosByVidObservations',
              { vid },
              (draft) => {
                const index = draft.findIndex(
                  (observation) => observation.id === Number(oid)
                );
                if (index !== -1) {
                  draft.splice(index, 1);
                }
              }
            )
          );
          dispatch(unguessApi.util.invalidateTags(['VideoTags', 'Insights']));
        } catch {
          dispatch(unguessApi.util.invalidateTags(['Observations']));
        }
      },
    },
    postCampaignsByCidInsights: {
      invalidatesTags: ['Insights'],
    },
    getCampaignsByCidInsights: {
      providesTags: ['Insights'],
    },
    getCampaignsByCidClusters: {
      providesTags: ['Clusters'],
    },
    patchInsightsByIid: {
      invalidatesTags: ['Insights', 'Clusters'],
    },
    deleteInsightsByIid: {
      invalidatesTags: ['Insights'],
    },
  },
});

export { unguessApi as unguessApiSlice };
